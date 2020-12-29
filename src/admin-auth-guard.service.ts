import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './app/auth.service';
import { map, switchMap } from 'rxjs/operators';
import { UserService } from './app/user.service';
import { Observable } from 'rxjs';
import { AppUser } from './app/models/app-user';
// import "rxjs/add/observable/of";
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(private auth: AuthService, private userService: UserService) { }
  canActivate(route, state: RouterStateSnapshot) {

    return this.auth.appuser$.pipe(
      map(appUser => appUser.isAdmin)
    )



    // below commnetned works fine
    // return this.auth.user$.pipe(switchMap(user => {
    //   return this.userService.get(user.uid).pipe(map(appUser => appUser?.isAdmin))
    // }))


    // return this.auth.user$.pipe(switchMap(user => {
    //   if (user) {
    //     return this.userService.get(user.uid)
    //   }
    //   else {
    //     Observable.of(false);
    //   }
    // })
    // )
    // return
    // return JSON.parse(localStorage.getItem('isAdmin'))

    // return true

  }
}
