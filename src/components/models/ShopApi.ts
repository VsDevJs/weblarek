import { IApi, IProductResponse, IRequestOrder, IOrderResponse } from '../../types';

// Такой апи необходим для расширения функционала не затрагивая корневой. Можно создать другой например и также использовать корневой
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