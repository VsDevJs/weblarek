import { IApi, getData, Post, postGet } from '../../../types';

export class TApi {

  // Сохраняем объект класса /
  private objTApi:IApi;

  constructor(object:IApi) {
    this.objTApi = object;
  }

  get():Promise<getData> {
    return this.objTApi.get('/product/');
  }

  post(data:Post):Promise<postGet> {
    return this.objTApi.post('/order/', data);
  }
}


