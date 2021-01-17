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

  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCardId();
    return (this.db.object('/shopping-carts/' + cartId).valueChanges() as Observable<ShoppingCart>).pipe(map(x =>
      new ShoppingCart(x?.items)
    ))
  }

  async addToCart(product) {
    this.updateItem(product, 1)
  }

  async removeFromCart(product) {
    this.updateItem(product, -1)
  }

  async clearCart() {
    let cartId = await this.getOrCreateCardId()
    this.db.object('/shopping-carts/' + cartId + '/items').remove();
  }
  create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
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

  private async updateItem(product, change: number) {
    let cartId = await this.getOrCreateCardId();
    let items$ = this.getItem(cartId, product.key)
    items$.pipe(take(1)).subscribe((item: shoppingCartItem) => {
      let quantity = (item?.quantity || 0) + change
      if (quantity == 0) {
        this.db.object('/shopping-carts/' + cartId + '/items/' + product.key).remove()
      }
      else {
        this.db.object('/shopping-carts/' + cartId + '/items/' + product.key).update({
          title: item?.title || product.payload.val().title,
          imageUrl: item?.imageUrl || product.payload.val().imageUrl,
          price: item?.price || product.payload.val().price,
          quantity: quantity
          // product: product.payload.val(), quantity: (item?.quantity || 0) + change
        })
      }

    })
  }
}
