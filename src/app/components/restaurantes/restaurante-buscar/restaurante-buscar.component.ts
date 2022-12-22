import { Component, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Restaurante } from 'src/app/models/models';
import { AuthService } from 'src/app/security/auth.service';
import { RestaurantesService } from '../restaurantes.service';

@Component({
  selector: 'app-restaurante-buscar',
  templateUrl: './restaurante-buscar.component.html',
  styleUrls: ['./restaurante-buscar.component.css']
})
export class RestauranteBuscarComponent implements OnInit, OnChanges {

  restauranteId: any;
  restaurante: Restaurante = new Restaurante();
  jwtPayload: any;

  constructor(
    private restauranteService: RestaurantesService,
    public authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {};

  ngOnInit(): void {
    this.buscarRestaurantePorId();
    this.jwtPayload = this.authService.jwtPayload;
  }

  ngOnChanges(): void {
    this.buscarRestaurantePorId();
  }


  buscarRestaurantePorId() {
    const restauranteId = this.route.snapshot.params['id'];
    this.restauranteService.getRestauranteById(restauranteId)
      .then((response: Restaurante) => {
        this.restaurante = response;
      }).catch((error: any) => {
        console.log('Erro ao buscar restaurante por id');
      });
  }

  isAberto(aberto: boolean): string {
    return aberto ? 'Sim' : 'Não';
  }

  getTextAbertura(aberto: boolean) {
    return aberto ? 'Fechar' : 'Abrir';
  }

  getTextAtivacao(ativo: boolean) {
    return ativo ? 'Inativar': 'Ativar';
  }

  ativarOuInativar(restauranteId: number) {
    this.restauranteService.ativarOuDesativar(restauranteId)
      .then(() => {
        this.ngOnInit();
      }).catch((error: any) => {
        console.log('Erro ao ativar ou inativar restaurante: ' + restauranteId);
        
      });
  }

  abrirOuFechar(restauranteId: number) {
    this.restauranteService.abrirOuFechar(restauranteId)
      .then(() => {
        this.ngOnInit();
      }).catch((error: any) => {
        console.log('Erro ao abrir ou fechar restaurante: ' + restauranteId);
      });
  }

  
}
