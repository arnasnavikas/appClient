import { Component } from '@angular/core';
import { BackendService } from '../../backend.service'
import { Location } from '@angular/common'
import { MatDialog } from '@angular/material'
import { SendMailComponent} from '../../modals/send-mail/send-mail.component'
import { fadeInAnimation } from '../../animations/site.animation'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: fadeInAnimation,
  host: {'[@fadeInAnimation]':''}
})
export class AppComponent  {
  panelOpenState1 = false
  panelOpenState = false
  constructor(private dialog : MatDialog,public location:Location,public backendService :BackendService){}
 sendMail(){
   this.dialog.open(SendMailComponent,{
   })
 }
}
