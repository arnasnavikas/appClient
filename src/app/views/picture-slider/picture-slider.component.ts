import { Component, OnInit,Input,EventEmitter,Output, ViewEncapsulation } from '@angular/core';
import { PictureInterface} from '../../interface.enum'
import { SliderAnimation} from '../../animations/site.animation'
@Component({
  selector: 'app-picture-slider',
  templateUrl: './picture-slider.component.html',
  styleUrls: ['./picture-slider.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
  animations: SliderAnimation
})
export class PictureSliderComponent implements OnInit {

  constructor() { }
  @Input('picture') pictures : PictureInterface[] = [];
  @Input('index') index : number;
   gallery_name;
  @Output() close  = new EventEmitter();
  private image_description;
  private imgIndex;
  private _source;
  private right;
  private left;
  public gallery_animation
  private infoShowed = 'close' // for mobile phones click on image is turning on image info
  /**###############################################
   * CHECK IF IMAGES NOT EMPTY, AND SETS FIRST
   * IMAGE IN SLIDER
   */
  ngOnInit() {
    // this.gallery_animation = 'open'
    this.index = this.index ? this.index : 0;
    this.imgIndex = this.index;
    if(this.pictures.length > 0){
      this._source = this.pictures[this.index].imgURL;
      this.image_description = this.pictures[this.index].description;
      this.gallery_name = this.pictures[this.index].gallery_name
    }
  } 
  closeGallery =(event)=>{
    if(event.toState == 'close'){
      console.log('animation complete, closing gallery')
      this.close.emit(false);
    }
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
      let realPicturesLength = this.pictures.length - 1;
      if (this.imgIndex == realPicturesLength)
        this.imgIndex = 0;
      else
        this.imgIndex += 1;
      this.image_description = this.pictures[this.imgIndex].description;
      this._source = this.pictures[this.imgIndex].imgURL;
      this.right = 'fly-in';
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
    if (this.imgIndex == 0)
      this.imgIndex = this.pictures.length - 1;
    else
      this.imgIndex -= 1;
    this.image_description = this.pictures[this.imgIndex].description;
    this._source = this.pictures[this.imgIndex].imgURL;
    this.left = 'fly-in'
  }
  /**################################################################# */
    // shows info abaout image on mobile phones when clicked on image
    infoToggle = false
    showInfo(e){
      e.stopPropagation()
      this.infoShowed = this.infoShowed == 'open'? 'close': 'open'
      console.log(this.infoShowed)
      //   if(!this.infoShowed){
      //     domElem.style.visibility = 'visible'
      //     console.log('setting visible')
      //   }
      //   else{
      //     this.infoShowed = false
      //     domElem.style.visibility = 'hidden'
      //     console.log('setting hidden')
      //     return;
      //   }
      //   this.infoShowed = true
    }
    swipe(e){
      console.log(e)
      if(e.type == 'swiperight'){
        // this.nextImg(e)
        this.right = 'fly-out'
        console.log(e.type)
        console.log(e)
      }
      else if (e.type == 'swipeleft'){
        console.log(e.type)
        console.log(e)
        // this.prevImg(e)
        this.left = 'fly-out'
      }
    }
}
