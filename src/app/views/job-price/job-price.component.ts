import { Component, ViewEncapsulation } from '@angular/core';
import { BackendService } from '../../backend.service'
import { fadeInAnimation } from '../../animations/site.animation'
@Component({
  selector: 'app-job-price',
  templateUrl: './job-price.component.html',
  styleUrls: ['./job-price.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
  animations: fadeInAnimation,
  host: {'[@fadeInAnimation]':''}
})
export class JobPriceComponent {
  constructor(public backendService : BackendService) { }
}
