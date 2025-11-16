import { IApi, IProductResponse, IRequestOrder, IOrderResponse } from '../../types';

export class ShopApi {

  private httpClient: IApi;

  constructor(api: IApi) {
    this.httpClient = api;
  }

  getProduct(): Promise<IProductResponse> {
    return this.httpClient.get('/product/');
  }

  createOrder(data: IRequestOrder): Promise<IOrderResponse> {
    return this.httpClient.post('/order/', data);
  }
}