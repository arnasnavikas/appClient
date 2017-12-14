import { Component, ViewEncapsulation } from '@angular/core';
import { BackendService } from '../../backend.service'
import { GroupInterface} from '../../interface.enum'
import { ApearAnimation } from '../../animations/site.animation'
import { Router } from '@angular/router'
@Component({
  selector: 'app-job-price',
  templateUrl: './job-price.component.html',
  styleUrls: ['./job-price.component.css'],
  encapsulation: ViewEncapsulation.None,
  animations: ApearAnimation
})
export class JobPriceComponent {
  constructor(private router: Router,private backendService : BackendService) { }
}
