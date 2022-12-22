import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { from, mergeMap, Observable } from "rxjs";
import { AuthService } from "./auth.service";

export class NotAuthenticatedError {};

@Injectable()
export class Interceptor implements HttpInterceptor {
    constructor(private authService: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!req.url.includes('/oauth2/token') && this.authService.isAccessTokenInvalido()) {
            return from(this.authService.obterAccessTokenComRefreshToken())
                .pipe(
                    mergeMap(() => {
                        if (this.authService.isAccessTokenInvalido()) {
                            throw new NotAuthenticatedError();
                        }

                        req = req.clone({
                            setHeaders: {
                                Authorization: `Bearer ${localStorage.getItem('token')}`
                            }
                        });

                        return next.handle(req);
                    })
                )
        }

        return next.handle(req);
    }
}