import { Component, OnChanges,ViewEncapsulation,Input,OnInit,ViewChild } from '@angular/core';
import { BackendService } from '../../backend.service'
import { GroupInterface,GalerijaInterface,TeamMemberInterfase} from '../../interface.enum'
import { DragScroll } from 'ngx-drag-scroll'
import { ApearAnimation } from '../../animations/site.animation'
import { Router,ActivatedRoute,NavigationEnd } from '@angular/router'
@Component({
  selector: 'app-gallerys',
  templateUrl: './gallerys.component.html',
  styleUrls: ['./gallerys.component.css'],
  encapsulation: ViewEncapsulation.None,
  animations : ApearAnimation
})
export class GallerysComponent  {
  constructor(private backendService : BackendService,private _router: ActivatedRoute, private router: Router) { }
  private groups : GroupInterface[] = []
  private show = 'inactive' // animation triger

  animationDone(e){
    this.show = 'active'
  }

    // inserts user_id in <app-job-price> component
    loadData(user:TeamMemberInterfase){
      this.show  ='inactive'
      this.backendService.getGroups(user._id).subscribe((groups:GroupInterface[])=>{
        this.groups = groups
      });
  }

}
