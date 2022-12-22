import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Usuario } from 'src/app/models/models';
import { UsuarioRequest } from 'src/app/models/modelsRequest';
import { enviroment } from 'src/enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(
    private http: HttpClient
  ) {};

  buscarPorId(usuarioId: number): Promise<Usuario> {
    const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWxnYWZvb2Qtd2ViOndlYjEyMw==');

    return firstValueFrom(this.http.get<Usuario>(`${enviroment.apiUrl}/v1/usuarios/${usuarioId}`, {headers}));
  }

  editarUsuario(usuario: Usuario): Promise<any> {
    const usuarioRequest = this.toUsuarioRequest(usuario);
    const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWxnYWZvb2Qtd2ViOndlYjEyMw==');

    return firstValueFrom(this.http.put<UsuarioRequest>(`${enviroment.apiUrl}/v1/usuarios/${usuario.id}`, usuarioRequest, {headers}));
  }

  private toUsuarioRequest(usuario: Usuario) {
    const usuarioRequest = new UsuarioRequest();
    usuarioRequest.nome = usuario.nome;
    usuarioRequest.email = usuario.email;

    return usuarioRequest;
  }
}
