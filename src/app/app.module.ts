import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule} from '@angular/http';
//customs  modules
import { MaterialModule } from './modules/material.module';
import { FlexLayoutModule} from '@angular/flex-layout';
import { CarouselModule} from "angular2-carousel";
import { AppRoutingModule } from './modules/app-routing.module'
// components
import { AppComponent } from './views/index-page/app.component';
import { KontaktaiComponent } from './views/kontaktai/kontaktai.component'
import { GallerysComponent } from './views/gallerys/gallerys.component';
import { JobPriceComponent } from './views/job-price/job-price.component'
import { MyTeamComponent } from './views/my-team/my-team.component';
// services
import { BackendService } from "./backend.service";
import { SelectPageComponent } from './views/select-page/select-page.component'
@NgModule({
  declarations: [
    AppComponent,
    KontaktaiComponent,
    GallerysComponent,
    JobPriceComponent,
    MyTeamComponent,
    SelectPageComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [BackendService],
  bootstrap: [AppComponent]
})
export class AppModule { }
