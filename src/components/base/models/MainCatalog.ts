import { IProduct } from '../../../types';

export class MainCatalog<T extends IProduct> {

    // Выбранная карточка

    private detailedProduct:T | null = null;
    private listProduct:T[] = [];

    // + Сохранение массива товаров полученного в параметрах метода;

    setListProduct(newList:T[]){
        this.listProduct = newList;
    }

    // + Получение массива товаров из модели

    getListProduct():T[]{
    
        // Возвращаем копию, а не ссылку на _listProduct
        return [...this.listProduct];
    }

    // + Cохранение товара для подробного отображения;

    setDetailedProduct(id:string) {
        const check = this.getProductById(id); // Если находим продукт по списку
        if(check)
            this.detailedProduct = check;
        else
            console.log('Продукт отсутствует в списке')
    }

    // +  получение товара для подробного отображения.

    getDetailedProduct():T | null { // получение товара для подробного отображения.
        return this.detailedProduct  
        ? this.detailedProduct  
        : null;
    }

    // Получение одного товара по его id;

    getProductById(id:string):T | undefined {
        return this.listProduct.length 
        ? this.listProduct.find(product => product.id === id)
        : undefined;
    }
}
