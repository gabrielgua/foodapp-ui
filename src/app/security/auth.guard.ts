import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(
        private authService: AuthService,
        private router: Router
    ) {}


    canActivate(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        
        if (this.authService.isAccessTokenInvalido()) {
            console.log('Token Inválido, obtendo novo token...');

            return this.authService.obterAccessTokenComRefreshToken()
                .then(() => {
                    if (this.authService.isAccessTokenInvalido()) {
                        this.authService.login();
                        return false;
                    }

                    return true;
                });   
        } else if (route.data["roles"] && !this.authService.temQualquerPermissao(route.data["roles"])) {
            this.router.navigate(['/nao-autorizado']);
            return false;
        }

        return true;
    }
}