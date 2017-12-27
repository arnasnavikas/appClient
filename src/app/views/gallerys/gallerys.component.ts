import { Component, OnChanges,ViewEncapsulation,Input,OnInit,ViewChild, group } from '@angular/core';
import { BackendService } from '../../backend.service'
import { GroupInterface,GalerijaInterface,TeamMemberInterfase} from '../../interface.enum'
import { fadeInAnimation } from '../../animations/site.animation'
import { Router,ActivatedRoute,NavigationEnd } from '@angular/router'
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-gallerys',
  templateUrl: './gallerys.component.html',
  styleUrls: ['./gallerys.component.css'],
  encapsulation: ViewEncapsulation.None,
  animations : fadeInAnimation,
  host: { '[@fadeInAnimation]': '' }
})
export class GallerysComponent implements OnInit  {
  constructor(private backendService : BackendService,private _router: ActivatedRoute, private router: Router) { }
  public groupList = new FormControl()
  public groups : GroupInterface[] = []
  public gallerys : GalerijaInterface[] = []
  public const_gallerys : GalerijaInterface[] = []
  public show = 'inactive' // animation triger

  animationDone(e){
    this.show = 'active'
  }
ngOnInit(){
  this._router.params.subscribe(params=>{
    let user_id = params['user-id'];
    let group_index = params['group-index'];
    this.loadGroups(user_id,group_index)
  })
}
    // loads group and gallerys 
    loadGroups(user_id,group_index){
      // this.show  ='inactive'
      this.backendService.getGroups(user_id).subscribe((groups:GroupInterface[])=>{
        this.backendService.groups = groups;
        this.groups = groups;
        this.groupList.setValue([groups[group_index]])
        this.loadGallerys(user_id,groups[group_index]._id)
      });
    }
      loadGallerys(user_id,group_id){
        this.backendService.getGallerys(user_id).subscribe((gallerys:GalerijaInterface[])=>{
          //shows only gallerys from group that specified in route path
          this.gallerys  = gallerys.filter(gallery => gallery.group_id == group_id)
          this.const_gallerys = gallerys;
        });
      }
      filterGallerys(e){
        let groups : GroupInterface[] = e.value
        console.log(groups)
        let filtered_gallerys :GalerijaInterface[] = []
        let gallerys :GalerijaInterface[] = []
        for(let group of groups){
         gallerys = this.const_gallerys.filter(gallery =>gallery.group_id == group._id);
          for(let gallery of gallerys)
           filtered_gallerys.push(gallery)
         }
         this.gallerys = filtered_gallerys
      }
      selectAll(e){
        this.gallerys = e.checked ? this.const_gallerys : []
        if(e.checked){
          this.groupList.setValue(this.groups) 
          this.gallerys = this.const_gallerys
        }
        else{
          this.groupList.setValue([])
          this.gallerys = []
        }
      }
}
