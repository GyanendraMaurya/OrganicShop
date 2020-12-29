import { Injectable } from '@angular/core';
import { AngularFireDatabase, } from '@angular/fire/database';
import firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { AppUser } from './models/app-user';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  isAdmin: boolean
  constructor(private db: AngularFireDatabase) { }
  save(user: firebase.User) {
    debugger;
    this.db.object('/user/' + user.uid).update({
      name: user.displayName,
      email: user.email
    }).then(res => {
      // this.setAdminValue(user.uid);
      console.log(res);
    }).catch(e => {
      debugger;
      console.log(e);
    })
  }

  get(uid: string) {
    let abx = this.db.object('/user/' + uid).valueChanges() as Observable<AppUser>;
    return abx
  }
  // .pipe(map(user => {
  //     user.isAdmin
  //   }))

  // abs.valueChanges().subscribe(res => {
  //   console.log(res);
  // })
  // }
  setAdminValue(uid: string) {
    (this.db.object('/user/' + uid).valueChanges() as Observable<AppUser>)
      .subscribe(user => {
        this.isAdmin = user.isAdmin
        if (this.isAdmin) {
          localStorage.setItem('returnUrl', 'true');

        }
        else {
          localStorage.setItem('returnUrl', 'false');
        }
      })
  }
}
