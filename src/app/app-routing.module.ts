import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { FavoritosComponent } from './favoritos/favoritos.component';

const routes: Routes = [
  {
    path:'inicio',
    component:  InicioComponent
  },
  {
    path:'favoritos',
    component:  FavoritosComponent
  },
  {
    path:'**',
    component:  InicioComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
