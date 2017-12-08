import { Component,OnInit } from '@angular/core';
import { BackendService } from '../../backend.service'
import { TeamMemberInterfase } from '../../interface.enum'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(public backendService :BackendService){}
  title = 'app';
  private user_id 
  ngOnInit(){
    this.backendService.getTeamMembers()
                       .subscribe((member:TeamMemberInterfase[])=>{this.user_id = member[0]._id})
  }

  loadData(user:TeamMemberInterfase){
    console.log(user)
    this.user_id = user._id
  }
}
