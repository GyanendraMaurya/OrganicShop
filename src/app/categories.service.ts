import { Injectable } from '@angular/core';
import { AngularFireDatabase, } from '@angular/fire/database';
import firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { AppUser } from './models/app-user';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  categories$;
  constructor(private db: AngularFireDatabase) {

  }

  getCategories() {
    debugger
    return this.db.list('/categories/').snapshotChanges()
    // .subscribe((res) => {
    //   console.log(res)
    // })
  }
}
