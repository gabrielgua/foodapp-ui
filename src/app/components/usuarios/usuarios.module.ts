import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsuarioBuscarComponent } from './usuario-buscar/usuario-buscar.component';


@NgModule({
  declarations: [
    UsuarioBuscarComponent
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    FormsModule
  ]
})
export class UsuariosModule { }
