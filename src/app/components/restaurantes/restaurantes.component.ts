import { Component, OnInit } from '@angular/core';
import { RestaurantesService } from './restaurantes.service';

@Component({
  selector: 'app-restaurantes',
  templateUrl: './restaurantes.component.html',
  styleUrls: ['./restaurantes.component.css']
})
export class RestaurantesComponent implements OnInit{

  restaurantes: any[] = [];

  constructor(
    private restauranteService: RestaurantesService,
  ) {};

  ngOnInit(): void {
    this.listarRestaurantes();
  }

  listarRestaurantes() {
    this.restauranteService.getRestaurantes()
     .then((response: any) => {
        this.restaurantes = response._embedded.restaurantes;
     }).catch((error:any) => {
      console.log('Erro ao tentar consultar restaurantes');
     });
  }
}
