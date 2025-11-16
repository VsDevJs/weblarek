import { IProduct } from '../../types';

export class MainCatalog {

    private detailedProduct: IProduct | null = null;
    private listProduct: IProduct[] = [];

    setListProduct(newList: IProduct[]) {
        this.listProduct = newList;
    }

    getListProduct(): IProduct[] {
        return [...this.listProduct];
    }

    setDetailedProduct(id: string) {
        const check = this.getProductById(id);
        if (check)
            this.detailedProduct = check;
        else
            console.log('Продукт отсутствует в списке')
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