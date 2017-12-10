import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule} from '@angular/http';
//customs  modules
import { MaterialModule } from './modules/material.module';
import { FlexLayoutModule} from '@angular/flex-layout';
import { AppRoutingModule } from './modules/app-routing.module'
import { DragScrollModule } from 'ngx-drag-scroll'
// components
import { AppComponent } from './views/index-page/app.component';
import { GallerysComponent } from './views/gallerys/gallerys.component';
import { JobPriceComponent } from './views/job-price/job-price.component'
import { MyTeamComponent } from './views/my-team/my-team.component';
// services
import { BackendService } from "./backend.service";
import { SelectPageComponent } from './views/select-page/select-page.component';
import { PicturesComponent } from './views/pictures/pictures.component';
import { PageNotFoundComponent } from './views/page-not-found/page-not-found.component'
@NgModule({
  declarations: [
    AppComponent,
    GallerysComponent,
    JobPriceComponent,
    MyTeamComponent,
    SelectPageComponent,
    PicturesComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    HttpModule,
    AppRoutingModule,
    DragScrollModule  
  ],
  providers: [BackendService],
  bootstrap: [AppComponent]
})
export class AppModule { }
