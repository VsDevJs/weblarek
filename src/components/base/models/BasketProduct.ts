import { IProduct } from '../../../types';
export class BasketProduct<T extends IProduct> {

  private listProduct: T[] = [];

  getlistProduct(): T[] {
    return [...this.listProduct];
  }

  addProduct(product: T): void {
    if (product.price && !this.existenceProduct(product.id)) {
      this.listProduct.push(product);
    }
    else {
      console.log('Товар невозможно добавить');
    }
  }

  deleteProduct(product: T): void {
    if (!this.existenceProduct(product.id)) {
      console.log('Удаление не произошло');
      return;
    }
    this.listProduct = this.listProduct.filter(el => el.id != product.id);
  }

  clearBasket() {
    this.listProduct = [];
  }

  calculatePrice() {
    if (this.listProduct.length > 0)
      return this.listProduct.reduce((ac, el) => ac + Number(el.price), 0);
  }

  countProduct() {
    return this.listProduct.length;
  }

  existenceProduct(id: string): boolean {
    return this.listProduct.some(product => id === product.id);
  }
}