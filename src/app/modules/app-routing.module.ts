import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PicturesComponent } from '../views/pictures/pictures.component'
import { AppComponent } from '../views/index-page/app.component'
import { PageNotFoundComponent } from '../views/page-not-found/page-not-found.component'
import { GallerysComponent } from '../views/gallerys/gallerys.component';
import { JobPriceComponent } from '../views/job-price/job-price.component';
import { JobStoreComponent } from '../views/job-store/job-store.component';
const routes = [ 
                {path: '',component: JobPriceComponent},
                {path:':user-id/:group-index',component:JobStoreComponent},
                {path:'galerijos/:user-id/:group-index',component:GallerysComponent},
                {path:'paveiksleliai/:user-id/:gallery-id',component:PicturesComponent},
                {path: '**', component:PageNotFoundComponent}]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes,{useHash:true})
  ],
  declarations: [],
  exports: [RouterModule]
  
})
export class AppRoutingModule { }
