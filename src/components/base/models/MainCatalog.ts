import { IProduct } from '../../../types';

export class MainCatalog<T extends IProduct> {

    private detailedProduct: T | null = null;
    private listProduct: T[] = [];

    setListProduct(newList: T[]) {
        this.listProduct = newList;
    }

    getListProduct(): T[] {
        return [...this.listProduct];
    }

    setDetailedProduct(id: string) {
        const check = this.getProductById(id);
        if (check)
            this.detailedProduct = check;
        else
            console.log('Продукт отсутствует в списке')
    }

    getDetailedProduct(): T | null {
        return this.detailedProduct
            ? this.detailedProduct
            : null;
    }

    getProductById(id: string): T | undefined {
        return this.listProduct.length
            ? this.listProduct.find(product => product.id === id)
            : undefined;
    }
}
