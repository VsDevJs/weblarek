import { IProduct } from '../../types';
import { IEvents } from '../base/Events';
export class MainCatalog {

    private detailedProduct: IProduct | null = null;
    private listProduct: IProduct[] = [];
    
    constructor(protected events: IEvents) {}

    setListProduct(newList: IProduct[]) {
        this.listProduct = newList;
        this.events.emit('catalog:changed');
    }

    getListProduct(): IProduct[] {
        return [...this.listProduct];
    }

    setDetailedProduct(id: string) {
        const check = this.getProductById(id);
        if (check) {
            this.detailedProduct = check;
            this.events.emit('card:select');
        }
        else {
            console.log('Продукт отсутствует в списке')
            return;
        }
    }

    getDetailedProduct(): IProduct | null {
        return this.detailedProduct
            ? this.detailedProduct
            : null;
    }

    getProductById(id: string): IProduct | undefined {
        return this.listProduct.length
            ? this.listProduct.find(product => product.id === id)
            : undefined;
    }
}