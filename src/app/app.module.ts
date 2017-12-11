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
import { PageNotFoundComponent } from './views/page-not-found/page-not-found.component'
// services
import { BackendService } from "./backend.service";
import { PicturesComponent } from './views/pictures/pictures.component';
import { JobStoreComponent } from './views/job-store/job-store.component';
@NgModule({
  declarations: [
    AppComponent,
    JobStoreComponent,
    GallerysComponent,
    JobPriceComponent,
    MyTeamComponent,
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
