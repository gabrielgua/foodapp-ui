import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/models/models';
import { UsuariosService } from '../usuarios.service';
import { NgForm, FormControl } from '@angular/forms';

@Component({
  selector: 'app-usuario-buscar',
  templateUrl: './usuario-buscar.component.html',
  styleUrls: ['./usuario-buscar.component.css']
})
export class UsuarioBuscarComponent implements OnInit {

  usuario = new Usuario();
  sucesso: boolean = false;
  erro: boolean = false;
  mostrarInput: boolean = false;
  editando: boolean = false;
  usuarioNome: string = '';

  constructor(
    private usuarioService: UsuariosService,
    private route: ActivatedRoute,
    private router: Router
  ) {};

  ngOnInit(): void {
    const usuarioId = this.route.snapshot.params['usuarioId'];
    this.buscarUsuarioPorId(usuarioId);
  }

  buscarUsuarioPorId(usuarioId: number) {
    this.usuarioService.buscarPorId(usuarioId)
      .then((usuario: Usuario) => {
        this.usuario = usuario;
        this.usuarioNome = usuario.nome!;

      }).catch((error: any) => {
        console.log('Erro ao consultar usuario com id: ' + usuarioId);
      });
  }

  editarUsuario(form: NgForm) {
    this.usuarioService.editarUsuario(this.usuario)
      .then((usuario: Usuario) => {
        this.router.navigate(['/usuarios', usuario.id]);
        this.sucesso = !this.sucesso;
        this.editando = !this.editando;
        this.usuarioNome = usuario.nome!;
      }).catch((error: any) => {
        console.log('Erro ao atualizar usuario de id: ' + this.usuario.id);
        this.erro = !this.erro;
      });
  }
    


}
