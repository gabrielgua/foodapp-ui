import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Restaurante } from 'src/app/models/models';
import { enviroment } from 'src/enviroments/enviroment';
import { firstValueFrom } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RestaurantesService {

  constructor(
    private http: HttpClient
  ) { }

  getRestaurantes(): Promise<any[]> {
    const headers = new HttpHeaders()
      .append('Athorization', 'Basic YWxnYWZvb2Qtd2ViOndlYjEyMw==');

    return firstValueFrom(this.http.get<any[]>(`${enviroment.apiUrl}/v1/restaurantes`, {headers}));
  }

  getRestauranteById(id: number): Promise<Restaurante> {
    const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWxnYWZvb2Qtd2ViOndlYjEyMw==');

    return firstValueFrom(this.http.get<Restaurante>(`${enviroment.apiUrl}/v1/restaurantes/${id}`, {headers}));
  }

  ativarOuDesativar(restauranteId: number): Promise<any> {
    const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWxnYWZvb2Qtd2ViOndlYjEyMw==');

    return firstValueFrom(this.http.put<any>(`${enviroment.apiUrl}/v1/restaurantes/${restauranteId}/ativo-ou-inativo`, {headers}));
  }

  abrirOuFechar(restauranteId: number): Promise<any> {
    const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWxnYWZvb2Qtd2ViOndlYjEyMw==');

    return firstValueFrom(this.http.put<any>(`${enviroment.apiUrl}/v1/restaurantes/${restauranteId}/abertura-ou-fechamento`, {headers}));
  }
}
