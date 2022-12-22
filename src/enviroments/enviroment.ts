export const enviroment = {
    apiUrl: 'http://127.0.0.1:8080',
    oAuthCallBackUrl: 'http://127.0.0.1:4200/authorized',
    logoutRedirectToUrl: 'http://127.0.0.1:4200',
    tokenAllowedDomains: [ /127.0.0.1:8080/ ],
    tokenDisallowedRoutes: [/\/oauth2\/token/],
    
}