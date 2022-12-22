import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizedComponent } from './components/authorized/authorized.component';

const routes: Routes = [
  { path: 'home', loadChildren: () => import('../app/components/home/home.module').then(m => m.HomeModule) },
  { path: 'usuarios', loadChildren: () => import('../app/components/usuarios/usuarios.module').then(m => m.UsuariosModule) },
  { path: 'restaurantes', loadChildren: () => import('../app/components/restaurantes/restaurantes.module').then(m => m.RestaurantesModule)},

  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'authorized', component: AuthorizedComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
