import {Component, OnInit, Input, Output,
  EventEmitter,ViewEncapsulation} from '@angular/core';
import { TeamMemberInterfase } from '../../interface.enum'
import {BackendService} from '../../backend.service'
import { SliderAnimation } from '../../animations/site.animation'
import {Router } from '@angular/router'

@Component({
  selector: 'app-my-team',
  templateUrl: './my-team.component.html',
  styleUrls: ['./my-team.component.css'],
  encapsulation: ViewEncapsulation.None,
  animations: SliderAnimation
})
export class MyTeamComponent implements OnInit {

  constructor(private backendService : BackendService,private router :Router) { }
private users : TeamMemberInterfase[] = [];
@Output() selectUser  = new EventEmitter();
private user_index = 0;
private user :TeamMemberInterfase;
// animation trigers
private right;
private left;

ngOnInit() {
  this.backendService.getTeamMembers().subscribe((members:TeamMemberInterfase[])=>{
    this.users = members
    this.user = this.users[this.user_index];
    this.selectUser.emit(this.user);
  })
} 
/**#################### shows next picture ################### */
nextImg(e) {
    e.stopPropagation()
    this.right = 'fly-out'
  }
right_animation_done(e) {
    if(e.toState == 'fly-out')
      this.right = 'ready'
    if(e.toState == 'ready')
      this.insert_next_image();
  }
private insert_next_image = ()=>{
    let realPicturesLength = this.users.length - 1;
    if (this.user_index == realPicturesLength)
      this.user_index = 0;
    else
      this.user_index += 1;
    this.user = this.users[this.user_index];
    this.right = 'fly-in';
    this.selectUser.emit(this.user);
  }
/**#################### shows previous picture ################### */
prevImg(e) {
  e.stopPropagation()
  this.left = 'fly-out'
}
left_animation_done(e){
  if(e.toState == 'fly-out')
    this.left = 'ready'
  if(e.toState == 'ready')
    this.insert_Previous_Image()
}
private insert_Previous_Image = ()=>{
  if (this.user_index == 0)
    this.user_index = this.users.length - 1;
  else
    this.user_index -= 1;
  this.user = this.users[this.user_index];
  this.left = 'fly-in'
  this.selectUser.emit(this.user);
}
/**#################### swipe gestures ################### */

  swipe(e){
    if(e.type == 'swiperight')
      this.right = 'fly-out'
    if (e.type == 'swipeleft')
      this.left = 'fly-out'
  }
}
