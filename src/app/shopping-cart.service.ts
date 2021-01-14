import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { observable, Observable } from 'rxjs';
import { take } from 'rxjs/internal/operators/take';
import { map } from 'rxjs/operators';
import { itemType, Product } from './models/product';
import { ShoppingCart } from './models/shopping-cart';
import { shoppingCartItem } from './models/shopping-cart-item';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  constructor(private db: AngularFireDatabase) { }
  create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCardId();
    return (this.db.object('/shopping-carts/' + cartId).valueChanges() as Observable<ShoppingCart>).pipe(map(x =>
      new ShoppingCart(x.items)
    ))
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId).valueChanges()
  }

  private async getOrCreateCardId(): Promise<string> {
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;

    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key
  }
  async addToCart(product) {
    this.updateItemQuantity(product, 1)
  }

  async removeFromCart(product) {
    this.updateItemQuantity(product, -1)
  }

  private async updateItemQuantity(product, change: number) {
    let cartId = await this.getOrCreateCardId();
    let items$ = this.getItem(cartId, product.key)
    items$.pipe(take(1)).subscribe((item: itemType) => {
      this.db.object('/shopping-carts/' + cartId + '/items/' + product.key).update({
        product: product.payload.val(), quantity: (item?.quantity || 0) + change
      })
    })
  }
}
