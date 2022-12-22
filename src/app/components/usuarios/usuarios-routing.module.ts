import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/security/auth.guard';
import { UsuarioBuscarComponent } from './usuario-buscar/usuario-buscar.component';
import { UsuariosComponent } from './usuarios.component';

const routes: Routes = [

  { 
    path: '', 
    component: UsuariosComponent, 
    canActivate: [AuthGuard], 
    data: { roles: ['CONSULTAR_USUARIOS_GRUPOS_PERMISSOES'] }  
  },
  {
    path: ':usuarioId',
    component: UsuarioBuscarComponent,
    canActivate: [AuthGuard],
    data: { roles: ['CONSULTAR_USUARIOS_GRUPOS_PERMISSOES'] }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
