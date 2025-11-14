import { IProduct } from '../../../types';

// Extends id требуется поскольку могут создать экземпляр класса и передать другую типизацию;
// Поэтому для this._listProduct.find(product => id === product.id); требуется extends {id:string}
class mainCatalog<T extends {id:string}> {

    // Выбранная карточка

    private detailedProduct:T | null = null;
    private _listProduct:T[] = [];

    // Сохранение массива товаров полученного в параметрах метода;

    set listProduct(newList:T[]){
        this._listProduct = newList;
    }

    // Получение массива товаров из модели

    get listProduct():T[]{
    
        // Возвращаем копию, а не ссылку на _listProduct
        return [...this._listProduct];
    }

    set detaileProduct(product:T) { //сохранение товара для подробного отображения;
        this.detailedProduct  = product;
    }

    get detaileProduct():T | null { // получение товара для подробного отображения.
        return this.detailedProduct  ? this.detailedProduct  : null;
    }

    // Получение одного товара по его id;

    private getProductById(id:string):T | undefined {
        
        // Если является массивом, то мы ищём по id, наш товар
        if(this._listProduct.length > 0 && Array.isArray(this._listProduct)) {
            return this._listProduct.find(product => id === product.id);  // Как бы вернуть null;
        }
        else {
            return undefined;
        }
    }
}

// let obj1:IProduct = {id:'',description:'',image:'',title:'',category:'',price:30}; 
// let obj = new mainCatalog<IProduct>([]);
