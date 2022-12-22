import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { AuthorizedComponent } from './components/authorized/authorized.component';
import { enviroment } from 'src/enviroments/enviroment';
import { Interceptor } from './security/interceptor';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RestaurantesComponent } from './components/restaurantes/restaurantes.component';
import { RestauranteBuscarComponent } from './components/restaurantes/restaurante-buscar/restaurante-buscar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProdutoListarComponent } from './components/produtos/produto-listar/produto-listar.component';
import { FormsModule } from '@angular/forms';

export function tokenGetter(): string {
  return localStorage.getItem('token')!;
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AuthorizedComponent,
    UsuariosComponent,
    NavbarComponent,
    RestaurantesComponent,
    RestauranteBuscarComponent,
    ProdutoListarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        allowedDomains: enviroment.tokenAllowedDomains,
        disallowedRoutes: enviroment.tokenDisallowedRoutes
      }
    }),
    BrowserAnimationsModule,
  ],
  providers: [
    JwtHelperService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
