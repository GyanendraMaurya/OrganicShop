
export class shoppingCartItem {

  key: string;
  title: string;
  imageUrl: string;
  price: number;
  quantity: number

  constructor(init?: Partial<shoppingCartItem>) {
    Object.assign(this, init)
  }

  get totalPrice() {
    return this.price * this.quantity
  }
}
