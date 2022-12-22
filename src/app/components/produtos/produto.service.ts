import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { firstValueFrom } from 'rxjs';
import { enviroment } from 'src/enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(
    private http: HttpClient,
    private dom: DomSanitizer
  ) { }

  getProdutos(restauranteId: number): Promise<any> {
    const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWxnYWZvb2Qtd2ViOndlYjEyMw==');

    return firstValueFrom(this.http.get<any>(`${enviroment.apiUrl}/v1/restaurantes/${restauranteId}/produtos`, {headers}))
  }

  getFotoProduto(produto: any): Promise<any> {
    const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWxnYWZvb2Qtd2ViOndlYjEyMw==')

    return firstValueFrom(this.http.get<any>(`${produto._links.foto.href}`, {headers}));
  }
}
