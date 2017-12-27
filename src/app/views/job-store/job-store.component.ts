import { Component, OnInit, ViewEncapsulation,ViewChild,ElementRef,ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { BackendService} from '../../backend.service'
import { GroupInterface, TableRow } from '../../interface.enum';
import { Observable} from 'rxjs/Observable'
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/debounceTime'
import { FormControl} from '@angular/forms'
import { MatDialog } from '@angular/material'
import { SendMailComponent } from '../../modals/send-mail/send-mail.component'
import { fadeInAnimation } from '../../animations/site.animation'
@Component({
  selector: 'app-job-store',
  templateUrl: './job-store.component.html',
  styleUrls: ['./job-store.component.css'],
  encapsulation: ViewEncapsulation.None,
  animations: fadeInAnimation,
  host: {'[@fadeInAnimation]':''}
})
export class JobStoreComponent implements OnInit {

  constructor(private dialog: MatDialog,private router : ActivatedRoute, private backendService:BackendService) { }
  @ViewChild('search') search_input : ElementRef
  // @ViewChild('searchMobile') searchMobile : ElementRef
  @ViewChildren('rowName') row_name // dom element reference
 public rows : TableRow[] = [] //displayed rows
 public filtered_rows : TableRow[] = [] //constRows filtered by groups_id
 public constRows : TableRow[] = [] // all user rows 
 public groups : GroupInterface[] = []
 public samata = [] // selected rows 
 public samataWorkPrice = 0
 public samataMaterialPrice = 0
 public groupList = new FormControl();
 public group_index
 public previous_rows : TableRow[] = []
 public view_samata = false
 public nextPage // animation trigger
 user_id
 ngOnDestroy(){
  this.nextPage = 'invisible'
 }
  ngOnInit() {
    this.router.params.subscribe(params=>{
      this.group_index = params['group-index'];
      let user_id = params['user-id']
      this.user_id = user_id
      this.backendService.getGroups(user_id)
                         .subscribe((groups:GroupInterface[])=>{
                           this.groups = groups
                           this.backendService.groups = groups
                           this.groupList.setValue([groups[this.group_index]])
                           this.backendService.getTable(user_id)
                                              .subscribe((rows:TableRow[])=>{
                                                this.constRows = rows
                                                this.rows = this.constRows.filter(row => row.group_id == this.groups[this.group_index]._id)
                                                this.filtered_rows = this.rows
                                              });
                         })
    })
  }
  addToList(row: TableRow){
    row['added'] = true
    row.job_total_price = row.input*row.price
    row.material_total_price = row.input*row.material_price*row.iseiga
    this.samata.push(row)
    this.samataWorkPrice = this.calculatePrice(this.samata)[0]
    this.samataMaterialPrice = this.calculatePrice(this.samata)[1]
    this.backendService.showSuccessMessage(row.name+" įtrauktas į samatą",'gerai',4000)
  }
  calculatePrice(rows:TableRow[]){
    let work_price = 0
    let material_price = 0
    for(let row of rows){
      work_price += row.job_total_price
      material_price += row.material_total_price
    }
    return [work_price,material_price]
  }
  updateSamata(row){
    row.job_total_price = row.input*row.price
    row.material_total_price = row.input*row.material_price*row.iseiga
    this.samataWorkPrice = this.calculatePrice(this.samata)[0]
    this.samataMaterialPrice = this.calculatePrice(this.samata)[1]
  }
  removeRow(row:TableRow){
    this.samata = this.samata.filter(_row =>_row._id != row._id )
    this.previous_rows.map(_row=>{
      if(_row._id == row._id){
        _row['added']=false
        _row.input = 0;
        _row.material_total_price = 0;
        _row.job_total_price = 0
      }
      return row
    })
    this.rows = this.samata
    this.samataWorkPrice = this.calculatePrice(this.samata)[0]
    this.samataMaterialPrice = this.calculatePrice(this.samata)[1]
  }
  deleteSamata(){
    if(this.samata.length > 0){
      this.samata = []
      this.view_samata = false
      this.samataWorkPrice = 0
      this.samataMaterialPrice = 0
      this.rows.map(_row=>{
        _row['added']=false
        _row.input = 0;
        _row.material_total_price = 0;
        _row.job_total_price = 0
        return _row
      });
        this.rows = this.previous_rows.length ? this.previous_rows: this.rows
    }
  }
  viewList(){
    if(this.samata.length > 0){
      this.previous_rows = this.rows
      this.view_samata = true
      this.rows = this.samata
    }
  }
  // show all rows 
  selectAll(e){
    this.rows = e.checked ? this.constRows : []
    if(e.checked){
      this.groupList.setValue(this.groups) 
      this.filtered_rows = this.constRows
    }
    else{
      this.groupList.setValue([])
      this.filtered_rows = []
    }
  }

 //show selected groups rows
 filterRows(e){
   let groups : GroupInterface[] = e.value
   this.filtered_rows = []
   let rows = []
   for(let group of groups){
    rows = this.constRows.filter(row =>row.group_id == group._id);
     for(let row of rows)
      this.filtered_rows.push(row)
    }
    this.rows = this.filtered_rows
 }
//  sends samata
sendSamata(){
  this.dialog.open(SendMailComponent,{
    data: this.samata
  })
}
    ngAfterViewInit(){
      /****************************** FILTER ROWS BY NAME FROM INUT ****************************** */
      Observable.fromEvent(this.search_input.nativeElement,"keydown")
                            .debounceTime(300)
                            .map((input:any)=>{return input.target.value.trim().toLowerCase().replace(/\W/gi,'')})
                            .subscribe(search_word=>{
                              console.log('keyword replaced '+search_word)
                              let expr = new RegExp(search_word,'gi')
                              //filter samata rows
                              if(this.view_samata){
                                this.rows = this.samata.filter(function(row){ 
                                  return row.name.toLowerCase().includes(search_word) == true;
                                });
                              //filter displayed rows
                              }else{
                                  this.rows = this.filtered_rows.filter(function(row){ 
                                    return row.name.toLowerCase().includes(search_word) == true;
                                  });
                              }
                            });
      /****************************** HIGHLIGHT MATCHED SEARCH VALUE  ****************************** */
      Observable.fromEvent(this.search_input.nativeElement,"input")
                            .debounceTime(400)
                            .map((input:any)=>{return input.target.value.trim().toLowerCase().replace(/\W/gi,'')})
                            .subscribe(search_word=>{
                              this.mark_word(search_word)
                            });
    }
    public mark_word = (word)=>{
      console.log('go')
      let expr = new RegExp(word,'gi')
      if(this.rows.length >0){
           for(let span_el of this.row_name._results){
             let row_name = span_el.nativeElement.innerText
             let highlight= row_name.match(expr) // <= finds all parts of matched text and return it in array
             if(highlight){
               for(let i of highlight){
                 span_el.nativeElement.innerHTML =row_name.replace(i,'<span style="background: yellow">'+i+'</span>')
               }
             }
           }
        }
    }
    private resetSearch(target){
      target.value = ''
      this.rows = this.constRows
      this.mark_word('')
    }
    /** ********* LIMITS INPUT UP TO 5 NUMBER ************* */
    limitValue(row:TableRow,type){
      
      switch (type) {
        case 'input':
        if(row.input && row.input.toString().length > 5){
          row.input = Number(row.input.toString().slice(0,-1))
          console.log('input changed')
          return
        }
          break;
        case 'iseiga':
        if(row.iseiga && row.iseiga.toString().length > 5){
          row.iseiga = Number(row.iseiga.toString().slice(0,-1))
          console.log('value changed')
          return
        }
          break;
        case 'material_price':
        if(row.material_price && row.material_price.toString().length > 5){
          row.material_price = Number(row.material_price.toString().slice(0,-1))
          console.log('value changed')
          return
        }
          break;
      
        default:
        console.log('error from limitValue() function')
          break;
      }
      
  
    }
}
