import { Component, OnInit, ViewEncapsulation,ViewChild } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router'
import { BackendService} from '../../backend.service'
import { PictureInterface } from '../../interface.enum'
import { DragScroll } from 'ngx-drag-scroll'

@Component({
  selector: 'app-pictures',
  templateUrl: './pictures.component.html',
  styleUrls: ['./pictures.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PicturesComponent implements OnInit {

  constructor(private backendService : BackendService,private _router: ActivatedRoute, private router: Router) { }
  @ViewChild('scrollDrag',{read: DragScroll}) scroll_container;
  private pictures : PictureInterface[] = []
  ngOnInit() {
    console.log('pictures init()')
    this._router.params.subscribe(param=>{
      this.backendService.getGalleryPictures(param['gallery-id'])
                         .subscribe((pictures:PictureInterface[])=>{
                          this.pictures = pictures
                          console.log(pictures)
                        })
    })
  }

}
