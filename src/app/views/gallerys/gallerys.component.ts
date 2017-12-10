import { Component, OnChanges,ViewEncapsulation,Input,OnInit,ViewChild } from '@angular/core';
import { BackendService } from '../../backend.service'
import { GroupInterface,GalerijaInterface} from '../../interface.enum'
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
export class GallerysComponent implements OnChanges,OnInit {
  @ViewChild('scrollDrag',{read: DragScroll}) scroll_container;
  constructor(private backendService : BackendService,private _router: ActivatedRoute, private router: Router) { }
  private gallerys : GalerijaInterface[] = []
  private show = 'inactive' // animation triger
  private user_id :string = '';
  ngOnChanges(){
    
  }
  ngOnInit(){
    this._router.params.subscribe(param=>{
      console.log(param)
      this.show = 'inactive'
      this.user_id = param['user-id']
      this.backendService.getGalleries(this.user_id)
      .subscribe((gallerys:GalerijaInterface[])=>{
        this.gallerys = gallerys
        this.show = 'active'
        console.log(gallerys)
      })

   })
 }
  animationDone(e){
    this.show = 'active'
  }
  moveLeft() {
    this.scroll_container.moveLeft();
  }
  moveRight() {
    this.scroll_container.moveRight();
  }
}
