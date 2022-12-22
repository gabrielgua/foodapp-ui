import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/security/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  usuarioLogado: string = '';
  restaurantes: any;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {};

  ngOnInit(): void {
    this.usuarioLogado = this.authService.jwtPayload?.sub;
    if (this.usuarioLogado) {
      this.router.navigate(['restaurantes']);
    }
  }
}
