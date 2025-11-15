import { IProduct } from '../../../types';
// Опять же берём наш IProduct
// Мы берём значение от IProduct

export class BasketProduct<T extends IProduct> {

  // Массив товаров выбраных покупателем

  private listProduct:T[] = [];
  
  // + получение массива товаров, которые находятся в корзине;

  getlistProduct():T[] {
    return [...this.listProduct];
  }

  // + добавление товара, который был получен в параметре, в массив корзины;

  addProduct(product:T):void {

    // Если товар отсутствует и также должен иметь прайс!

    if(product.price && !this.existenceProduct(product.id)){ //
      this.listProduct.push(product);
    }
    else {
      console.log('Товар невозможно добавить');
    }
  }
  // + 
  deleteProduct(product:T):void {
    // Проверяем, что в массиве нету элемента
    if (!this.existenceProduct(product.id)) {
      console.log('Удаление не произошло');
      return;
    }
    // Иначе фильтруем и перезаписываем _listProduct
    this.listProduct = this.listProduct.filter(el=> el.id != product.id);
  }

  // + Полная очистка корзины. Ничего не принимает и просто чистит под 0 массив
  clearBasket(){
    this.listProduct = [];
  }

  // + Получение стоимости всех товаров в корзине

  calculatePrice() {
    if(this.listProduct.length > 0)
      return this.listProduct.reduce((ac, el)=> ac + Number(el.price),0);
  }

  // +

  countProduct() {
    return this.listProduct.length;
  }

  // +

  existenceProduct(id:string):boolean {
    return this.listProduct.some(product => id === product.id);
  }
}