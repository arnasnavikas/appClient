import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PicturesComponent } from '../views/pictures/pictures.component'
import { AppComponent } from '../views/index-page/app.component'
import { PageNotFoundComponent } from '../views/page-not-found/page-not-found.component'
import { GallerysComponent } from '../views/gallerys/gallerys.component';
const routes = [ 
                {path: ':user-id',component: GallerysComponent},
                {path:':user-id/:gallery-id',component:PicturesComponent},
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
