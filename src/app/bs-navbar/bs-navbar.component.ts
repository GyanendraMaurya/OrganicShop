import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { AppUser } from '../models/app-user';
import { ShoppingCart } from '../models/shopping-cart';
// import { shoppingCart } from '../models/shopping-cart';
import { ShoppingCartService } from '../shopping-cart.service';
import { UserService } from '../user.service';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  appUser: AppUser
  shoppingCartItemCount: number
  cart$: any
  constructor(public auth: AuthService, public userService: UserService, private shoppingCartService: ShoppingCartService) {
    this.auth.appuser$.subscribe(appUser => {
      this.appUser = appUser
    })
  }
  logout() {
    this.auth.logout();
  }
  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();
    // cart$.subscribe(cart => {
    //   console.log(cart)
    // this.shoppingCartItemCount = 0
    // for (let productId in cart.items) {
    //   this.shoppingCartItemCount += cart.items[productId].quantity
    // }
    // })
  }

}
