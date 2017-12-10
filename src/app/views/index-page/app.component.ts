import { Component,OnInit } from '@angular/core';
import { BackendService } from '../../backend.service'
import { TeamMemberInterfase, GroupInterface } from '../../interface.enum'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(public backendService :BackendService){}
  private groups : GroupInterface[] = []
  private user_id
  ngOnInit(){
  }
  // inserts user_id in <app-job-price> component
  loadData(user:TeamMemberInterfase){
      this.user_id = user._id
      this.backendService.getGroups(user._id).subscribe((groups:GroupInterface[])=>{
        this.backendService.groups = groups
      });
  }

}
