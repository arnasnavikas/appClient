import { Component, Inject,OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA,MatDialogRef} from "@angular/material"
import { TeamMemberInterfase,PictureInterface} from '../../interface.enum'
import { SliderAnimation} from '../../animations/site.animation'
@Component({
  selector: 'app-my-info',
  templateUrl: './my-info.component.html',
  styleUrls: ['./my-info.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
  animations: SliderAnimation
})
export class MyInfoComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<MyInfoComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }
  pictures : PictureInterface[] = []
   picture_taken;
  private image_description;
  private imgIndex;
  private _source;
  private right;
  private left;
  private gallery_animation
  private infoShowed = 'close' // for mobile phones click on image is turning on image info
  /**###############################################
   * CHECK IF IMAGES NOT EMPTY, AND SETS FIRST
   * IMAGE IN SLIDER
   */
  ngOnInit() {
    this.pictures = this.data.images
    this.imgIndex = 0;
    if(this.pictures.length > 0){
      this._source = this.pictures[this.imgIndex].imgURL;
      this.image_description = this.pictures[this.imgIndex].description;
      this.picture_taken = this.pictures[this.imgIndex].created
    }
  } 
  closeGallery =(event)=>{
    if(event.toState == 'close'){
      console.log('animation complete, closing gallery')
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
      this.picture_taken = this.pictures[this.imgIndex].created
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
    this.picture_taken = this.pictures[this.imgIndex].created
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
