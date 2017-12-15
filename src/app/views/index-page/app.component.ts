import { Component,OnInit } from '@angular/core';
import { BackendService } from '../../backend.service'
import { Location } from '@angular/common'
import { MatDialog } from '@angular/material'
import { Router,ActivatedRoute,NavigationEnd } from '@angular/router'
import { SendMailComponent} from '../../modals/send-mail/send-mail.component'
import { ApearAnimation } from '../../animations/site.animation'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: ApearAnimation
})
export class AppComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute,private router:Router,private dialog : MatDialog,private location:Location,public backendService :BackendService){
    router.events
    .filter(event => event instanceof NavigationEnd)
    .subscribe((event:NavigationEnd) => {
      let params = event.url.split('/')
      console.log(params)
      this.backendService.router_params = params.shift()
      // if(event.id > 1)
      // this.backendService.animationTriger = 'router-change'
      // You only receive NavigationEnd events
    });
  }
ngOnInit(){
  console.log('init fired')
}
 sendMail(){
   this.dialog.open(SendMailComponent,{
   })
 }
 animationDone(e){
   if(e.toState == 'invisible'){
       this.router.navigate(this.backendService.router_params)
       this.backendService.animationTriger = 'visible'
   }
 }

}
