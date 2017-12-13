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
      let gallery_id = param['gallery-id'];
      let user_id = param['user-id']
      console.log(user_id)
      this.backendService.getGroups(user_id)
                         .subscribe(groups=>{
                           console.log(groups)
                           this.backendService.groups = groups
                         })
      this.backendService.getGalleryPictures(gallery_id)
                         .subscribe((pictures:PictureInterface[])=>{
                          this.pictures = pictures
                          console.log(pictures)
                        })
    })
  }

}
