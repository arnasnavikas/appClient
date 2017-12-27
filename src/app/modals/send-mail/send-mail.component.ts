import { Component, OnInit,ViewEncapsulation,Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormGroup,FormBuilder,Validators,FormControl,FormGroupDirective,NgForm } from "@angular/forms"
import {ErrorStateMatcher} from '@angular/material/core';
import { BackendService } from '../../backend.service';
import { Http } from '@angular/http'
import { Observable } from 'rxjs/Observable'
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';
/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-send-mail',
  templateUrl: './send-mail.component.html',
  styleUrls: ['./send-mail.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SendMailComponent implements OnInit {

  constructor(private http:Http,private fb: FormBuilder,public dialogRef: MatDialogRef<SendMailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private backendService:BackendService) { }
    matcher = new MyErrorStateMatcher();
    private address_result: Observable<Object[]>
    sendingMail = false;
    options 
    private mailForm : FormGroup = this.fb.group({ name:this.fb.control('',[Validators.required]),
                                                 email: this.fb.control('',[Validators.required,Validators.pattern(new RegExp(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/))]),
                                                 user_id: this.fb.control(this.backendService.selected_user._id),
                                                 message: this.fb.control('',[Validators.required]),
                                                 address: this.fb.control('',[Validators.required])
                                                })

  ngOnInit() {
    if(this.data){
      this.mailForm.addControl('samata',this.fb.control(this.data))
    }
    this.backendService.searchAdress()
                       .subscribe(data=>{
                        console.log(data)
                        this.options = data
                        this.add_filter()
                      });
  }
  // filter addres list
  add_filter = ()=>{
    this.address_result  = this.mailForm.controls['address'].valueChanges.pipe(startWith(''),
    map(val => this.filter_by_name(val)))
  }
  filter_by_name = (search_word)=> {
    return  this.options.filter(option =>
      option.value.includes(search_word))
}

  sendMail(){
    console.log(this.mailForm.value)
    this.mailForm.updateValueAndValidity()
    if(!this.mailForm.valid){
      Object.keys(this.mailForm.controls).forEach(key => {
        console.log(key)
        this.mailForm.controls[key].markAsDirty();
        this.mailForm.controls[key].markAsTouched();
      });
      return;
    }
    if(this.mailForm.valid){
      this.sendingMail = true
      console.log(this.mailForm.value)
      this.backendService.sendMail(this.mailForm.value)
                          .subscribe(data=>{
                            console.log(data)
                          },
                          err=>{console.log(err)},
                          ()=>{
                            this.backendService.showSuccessMessage('Jūsų žinutė išsiūsta!','Gerai',4000)
                            this.dialogRef.close()
                          })
    }
  }
}
