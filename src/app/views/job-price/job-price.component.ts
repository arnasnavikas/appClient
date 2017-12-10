import { Component, OnInit, ViewEncapsulation,Input,OnChanges,ViewChild } from '@angular/core';
import { BackendService } from '../../backend.service'
import { GroupInterface} from '../../interface.enum'
import { DragScroll } from 'ngx-drag-scroll'
import { ApearAnimation } from '../../animations/site.animation'
@Component({
  selector: 'app-job-price',
  templateUrl: './job-price.component.html',
  styleUrls: ['./job-price.component.css'],
  encapsulation: ViewEncapsulation.None,
  animations: ApearAnimation
})
export class JobPriceComponent implements OnChanges {
  @Input('groups') groups : GroupInterface[] = []; // dummy var for animation trigger onChange
  @ViewChild('scrollDrag',{read: DragScroll}) scroll_container;
  private show = 'inactive'
  constructor(private backendService : BackendService) { }
 
  ngOnChanges(){
    this.show = 'inactive'
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
