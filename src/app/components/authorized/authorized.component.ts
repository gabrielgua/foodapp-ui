import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/security/auth.service';

@Component({
  selector: 'app-authorized',
  templateUrl: './authorized.component.html',
  styleUrls: ['./authorized.component.css']
})
export class AuthorizedComponent implements OnInit{
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private authService: AuthService 
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params:any) => {
      if (params.code) {
        this.authService.obterNovoAccessTokenComCode(params.code, params.state)
          .then(() => {
            this.route.navigate(['/'])
              .then(() => {
                window.location.reload();
              });
          })
          .catch((e:any) => {
            console.error('Erro no Callback');
          })
      } else {
        this.route.navigate(['/']);
      }
    })
  }
}
