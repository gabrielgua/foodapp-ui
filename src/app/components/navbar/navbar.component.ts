import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AuthService } from 'src/app/security/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  usuarioEmail: string = '';
  usuarioNome: string = '';
  usuarioId: String = '';
  showDropdown: boolean = false;

  constructor(
    public authService: AuthService
  ) {};

  ngOnInit(): void {
    this.usuarioEmail = this.authService.jwtPayload?.sub;
    this.usuarioId = this.authService.jwtPayload?.usuario_id;
    this.usuarioNome = this.usuarioEmail.substring(0, this.usuarioEmail.indexOf('@'));
  }

  logout() {
    this.authService.logout();
  }

  loginPage() {
    this.authService.login();
  }

}
