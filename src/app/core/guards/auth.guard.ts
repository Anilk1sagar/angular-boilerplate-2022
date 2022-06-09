import { Injectable } from "@angular/core";
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from "@angular/router";
// import { AuthService } from "../services";
// import { StorageService } from '../services/storage.service';


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    // private authServ: AuthService,
    private router: Router,
    // private storageServ: StorageService,
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // const userToken = this.authServ.getToken();
    // if (!userToken) {
    //   this.storageServ.removeItem(StorageService.STORAGE_KEYS.currentUser);
    //   this.router.navigate(['/auth/login'], { queryParams: { next: state.url } });
    //   return false;
    // }

    return true;
  }
}