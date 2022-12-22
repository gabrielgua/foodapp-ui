import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProdutoService } from '../produto.service';

@Component({
  selector: 'app-produto-listar',
  templateUrl: './produto-listar.component.html',
  styleUrls: ['./produto-listar.component.css']
})
export class ProdutoListarComponent implements OnInit{

  restauranteId: any;
  produtos: any[] = [];
 
  constructor(
    private produtoService: ProdutoService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.restauranteId = this.route.snapshot.params['id'];
    this.listarProdutos(this.restauranteId);
  }

  listarProdutos(restauranteId: any) {
    this.produtoService.getProdutos(restauranteId)
      .then((response: any) => {
        this.produtos = response._embedded.produtos;

        this.produtos.forEach(produto => {
          this.produtoService.getFotoProduto(produto)
          .then((response: any) => {
            produto.foto = response.caminho;
          }).catch((error: any) => {
            console.log('Produto não possui foto');
          });
        })
      }).catch((error: any) => {
        console.log('Erro ao consultar produtos');
      })
  }

}
