import { Component, OnInit, ViewEncapsulation,Input,OnChanges } from '@angular/core';
import { BackendService } from '../../backend.service'
import { GroupInterface} from '../../interface.enum'
import { SliderAnimation } from '../../animations/slider.animation'

@Component({
  selector: 'app-gallerys',
  templateUrl: './gallerys.component.html',
  styleUrls: ['./gallerys.component.css'],
  encapsulation: ViewEncapsulation.None,
  animations: SliderAnimation
  
})
export class GallerysComponent implements OnInit,OnChanges {
  @Input('userId') user_id : string;
  private gallerys : GroupInterface[] = []
  private displayed_gallerys =[]
  private gallery_index = 0
  private pages : number
  private gallerys_length;
  //animation trigers 
  private right;
  private left;
  constructor(private backendService : BackendService) { }

  loadGallerys(){
    this.backendService.getGroups(this.user_id).subscribe((gallerys:GroupInterface[])=>{
      this.gallerys = gallerys
      this.pages = Math.ceil(gallerys.length / 6)
      console.log('pages - '+this.pages)
      this.gallerys_length = gallerys.length
      this.updateView()
    });

  }
  private updateView = ()=>{
    this.displayed_gallerys = []
    let start_index = this.gallery_index * 6
    console.log('pages - '+this.pages)
    console.log('gallery index page -'+this.gallery_index)
    console.log('gallerys - ')
    console.log(this.gallerys)
    console.log('start index - '+start_index)
      for(let i=0; i <= 5 ; i++){
        let index = start_index+i 
        console.log('gallery pushed at index - '+index)
        if(index < this.gallerys_length)
          this.displayed_gallerys.push(this.gallerys[index])
      }
    console.log('this is displayed gallerys')
    console.log(this.displayed_gallerys)
    
  }
  ngOnInit() {
  }
  ngOnChanges(){
    this.loadGallerys()
    console.log(this.user_id)
    this.gallery_index = 0
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
    if (this.gallery_index == this.pages-1)
      this.gallery_index = 0;
    else
      this.gallery_index += 1;
    // this.user = this.users[this.gallery_index];
    this.right = 'fly-in';
    this.updateView()
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
    if (this.gallery_index == 0)
    this.gallery_index = this.pages-1;
    else
      this.gallery_index -= 1;
    // this.user = this.users[this.gallery_index];
    this.left = 'fly-in'
    this.updateView()
  }
/**#################### swipe gestures ################### */

  swipe(e){
    if(e.type == 'swiperight')
      this.right = 'fly-out'
    if (e.type == 'swipeleft')
      this.left = 'fly-out'
  }
}
