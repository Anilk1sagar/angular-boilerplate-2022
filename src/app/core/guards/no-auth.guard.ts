import { Injectable } from "@angular/core";
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from "@angular/router";
// import { AuthService } from "../services";


@Injectable()
export class NoAuthGuard implements CanActivate {

  constructor(
    // private authServ: AuthService, 
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // let userToken = this.authServ.getToken();
    // if (userToken) {
    //   this.router.navigate(['/']);
    //   return false;
    // }
    this.router.navigate(['/']);
    return true;
  }
}