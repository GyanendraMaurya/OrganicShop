import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ShoppingCartService } from './shopping-cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private shoppingCartService: ShoppingCartService, private db: AngularFireDatabase) { }

  async placeOrder(order) {
    let result = await this.db.list('/orders').push(order);
    this.shoppingCartService.clearCart();
    return result
  }
}
