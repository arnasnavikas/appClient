import { Component, OnInit, ViewEncapsulation,Input,OnChanges,ViewChild } from '@angular/core';
import { BackendService } from '../../backend.service'
import { GroupInterface,TeamMemberInterfase} from '../../interface.enum'
import { DragScroll } from 'ngx-drag-scroll'
import { ApearAnimation } from '../../animations/site.animation'
import { Router } from '@angular/router'
@Component({
  selector: 'app-job-price',
  templateUrl: './job-price.component.html',
  styleUrls: ['./job-price.component.css'],
  encapsulation: ViewEncapsulation.None,
  animations: ApearAnimation
})
export class JobPriceComponent  {
  constructor(private router: Router,private backendService : BackendService) { }
  private groups : GroupInterface[] = []
  private show  // animation triger
  private nextPage = 'visible' // animation triger
  private user_id;
  private index
  animationDone(e){
    this.show = 'active'
  }
  animation2Done(e){
    // console.log(e)
    if(e.toState == 'invisible')
    this.router.navigate([this.user_id,this.index])
  }
    // inserts user_id in <app-job-price> component
    loadData(user:TeamMemberInterfase){
      this.backendService.getGroups(user._id).subscribe((groups:GroupInterface[])=>{
        this.groups = groups
        this.show  ='inactive'
      });
  }
  navigateTo(group:GroupInterface,index){
    this.nextPage = 'invisible'
    this.user_id = group.user_id
    this.index = index
  }
}
