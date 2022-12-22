import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { firstValueFrom } from 'rxjs';
import { enviroment } from 'src/enviroments/enviroment';
import * as CryptoJS from 'crypto-js';
import { Usuario } from '../models/models';
 
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  oauthTokenUrl = enviroment.apiUrl + '/oauth2/token';
  oauthAuthorizeUrl = enviroment.apiUrl + '/oauth2/authorize';
  jwtPayload: any;


  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService
  ) {
    this.carregarToken();
   }

  login() {
    const state = this.gerarStringAleatoria(40);
    const codeVerifier = this.gerarStringAleatoria(128);

    localStorage.setItem('state', state);
    localStorage.setItem('codeVerifier', codeVerifier);

    const challengeMethod = 'S256';
    const codeChallenge = CryptoJS.SHA256(codeVerifier)
      .toString(CryptoJS.enc.Base64)
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');

    localStorage.setItem('codeChallenge', codeChallenge);

    const redirectUri = encodeURIComponent(enviroment.oAuthCallBackUrl);
    const clientId = 'algafood-web';
    const scope = 'READ WRITE';
    const responseType = 'code';


    const params = [
      'response_type=' + responseType,
      'client_id=' + clientId,
      'state=' + state,
      'scope=' + scope,
      'redirect_uri=' + redirectUri,
      'code_challenge=' + codeChallenge,
      'code_challenge_method=' + challengeMethod
    ];

    window.location.href = this.oauthAuthorizeUrl + '?' + params.join('&');

  }

  obterNovoAccessTokenComCode(code: string, state: string): Promise<any> {
    const stateSalvo = localStorage.getItem('state');
        
    if (stateSalvo !== state) {
      return Promise.reject(null);
    }

    const codeVerifier = localStorage.getItem('codeVerifier')!;

    const payload = new HttpParams()
      .append('grant_type', 'authorization_code')
      .append('code', code)
      .append('redirect_uri', enviroment.oAuthCallBackUrl)
      .append('code_verifier', codeVerifier);

    const headers = new HttpHeaders()
      .append('Content-Type', 'application/x-www-form-urlencoded')
      .append('Authorization', 'Basic YWxnYWZvb2Qtd2ViOndlYjEyMw==');

    return firstValueFrom(this.http.post<any>(this.oauthTokenUrl, payload, {headers}))
      .then((response:any) => {
        this.armazenarToken(response['access_token']);
        this.armazenarRefreshToken(response['refresh_token']);
        console.log('Novo access token criado!');
        return Promise.resolve(null);
      })
      .catch((response:any) => {
        console.error('Erro ao gerar o token com o code', response);
        return Promise.resolve(null);
      });
  }

  obterAccessTokenComRefreshToken(): Promise<void> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/x-www-form-urlencoded')
      .append('Authorization', 'Basic YWxnYWZvb2Qtd2ViOndlYjEyMw==');

    const payload = new HttpParams()
      .append('grant_type', 'refresh_token')
      .append('refresh_token', localStorage.getItem('refreshToken')!);

    return firstValueFrom(this.http.post<any>(this.oauthTokenUrl, payload, {headers}))
      .then((response:any) => {
        this.armazenarToken(response['access_token']);
        this.armazenarRefreshToken(response['refresh_token']);
        console.log('Novo access token criado pelo refresh token');

        return Promise.resolve();
      })
      .catch((response:any) => {
        console.error('Erro ao tentar criar token com refresh token', response);
        return Promise.resolve(); 
      })
  }

  isAccessTokenInvalido() {
    const token = localStorage.getItem('token');
    return !token || this.jwtHelper.isTokenExpired(token);
  }

  temPermissao(permissao: string) {
    return this.jwtPayload && this.jwtPayload.authorities.includes(permissao);
  }

  temQualquerPermissao(roles: any) {
    for (const role of roles) {
      if (this.temPermissao(role)) {
        return true;
      }
    }

    return false;
  }

  armazenarToken(token: string): void {
    this.jwtPayload = this.jwtHelper.decodeToken(token);

    localStorage.setItem('token', token);
  }

  public carregarToken() {
    const token = localStorage.getItem('token');
    if (token) {
      this.armazenarToken(token);
    }
  }

  limparAccessToken() {
    localStorage.removeItem('token');
    this.jwtPayload = null;
  }

  private armazenarRefreshToken(refreshToken: string) {
    localStorage.setItem('refreshToken', refreshToken);
  }

  private gerarStringAleatoria(tamanho: number): string {
    let resultado = '';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < tamanho; i++) {
      resultado += chars.charAt(Math.floor(Math.random() * chars.length));
      
    }
    return resultado;
  }

  logout() {
    this.limparAccessToken();
    localStorage.clear();
    window.location.href = enviroment.apiUrl + '/logout?returnTo=' + enviroment.logoutRedirectToUrl;
  }

  getDadosUsuarioLogado(): Promise<Usuario> {
    const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWxnYWZvb2Qtd2ViOndlYjEyMw==');

    const id = this.jwtPayload.usuario_id;
    return firstValueFrom(this.http.get<Usuario>(`${enviroment.apiUrl}/v1/usuarios/${id}`));
  }
}
