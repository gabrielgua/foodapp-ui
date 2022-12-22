import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/security/auth.guard';
import { ProdutoListarComponent } from '../produtos/produto-listar/produto-listar.component';
import { RestauranteBuscarComponent } from './restaurante-buscar/restaurante-buscar.component';
import { RestaurantesComponent } from './restaurantes.component';

const routes: Routes = [

  { 
    path: '',
    component: RestaurantesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: ':id',
    component: RestauranteBuscarComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: ProdutoListarComponent, canActivate: [AuthGuard] }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RestaurantesRoutingModule { }
