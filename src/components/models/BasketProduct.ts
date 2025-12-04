import { IProduct } from '../../types';
import { IEvents } from '../base/Events';
export class BasketProduct {

  private listProduct: IProduct[] = [];

  constructor(protected events: IEvents) {}

  getlistProduct(): IProduct[] {
    return [...this.listProduct];
  }

  addProduct(product: IProduct): void {
    if (product.price && !this.existenceProduct(product.id)) {
      this.listProduct.push(product);
      this.events.emit('basket:updated'); 
    }
    else {
      console.log('Товар невозможно добавить');
    }
  }

  deleteProduct(product: IProduct): void {
    if (!this.existenceProduct(product.id)) {
      console.log('Удаление не произошло');
      return;
    }
    this.listProduct = this.listProduct.filter(el => el.id != product.id);
    this.events.emit('basket:updated'); // Если здесь что-то поменяется, то произоёдт также render корзины ! И продукты поменяются
  }

  clearBasket() {
    this.listProduct = [];
    this.events.emit('basket:updated'); // При закрытии подтверждения, всё удаляет из корзины (render функция происходит);
  }

  calculatePrice() {
    if (this.listProduct.length > 0)
      return this.listProduct.reduce((ac, el) => ac + Number(el.price), 0);
    else
      return 0;
  }

  countProduct() {
    return this.listProduct.length;
  }

  // Если продукт есть в листПродукт, то будем видимо блочить добавление и менять кнопку; 
  existenceProduct(id: string): boolean {
    return this.listProduct.some(product => id === product.id);
  }
}