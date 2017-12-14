import { Component, OnInit, ViewEncapsulation,Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormGroup,FormBuilder,Validators,FormControl,FormGroupDirective,NgForm } from "@angular/forms"
import {ErrorStateMatcher} from '@angular/material/core';
import { BackendService } from '../../backend.service';
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

  constructor(private fb: FormBuilder,public dialogRef: MatDialogRef<SendMailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private backendService:BackendService) { }
    matcher = new MyErrorStateMatcher();
    private mailForm : FormGroup = this.fb.group({ name:this.fb.control('',[Validators.required]),
                                                 email: this.fb.control('',[Validators.required,Validators.pattern(new RegExp(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/))]),
                                                 message: this.fb.control('',[Validators.required])
                                                })

  ngOnInit() {
    if(this.data){
      this.mailForm.addControl('smata',this.fb.control(this.data))
    }
  }
  sendMail(){
    if(this.mailForm.valid){
      console.log(this.mailForm.value)
      this.backendService.showSuccessMessage('Jūsų žinutė išsiūsta!','Gerai',4000)
      this.dialogRef.close()
    }
  }
}
