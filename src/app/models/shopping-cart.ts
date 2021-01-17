import { shoppingCartItem } from "./shopping-cart-item";

export class ShoppingCart {
  items: shoppingCartItem[] = []
  // constructor(public itemsMap: { [productId: string]: shoppingCartItem }) {
  constructor(public itemsMap: shoppingCartItem[]) {
    this.itemsMap = itemsMap || []

    for (let productId in itemsMap) {

      let item = itemsMap[productId]
      this.items.push(new shoppingCartItem({ ...item, key: productId }))
    }
  }

  // get productIds() {
  //   console.log(Object.keys(this.items))
  //   return Object.keys(this.items)
  // }

  get totalPrice() {
    let sum = 0
    for (let productId in this.items)
      sum += this.items[productId].totalPrice
    return sum
  }

  get totalItemsCount() {
    let count = 0
    for (let productId in this.items) {
      count += this.items[productId].quantity
    }
    return count
  }

  getQuantity(product) {
    let item = this.itemsMap[product.key]
    return item ? item.quantity : 0;
  }
}
