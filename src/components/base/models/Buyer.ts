
import {TPayment} from '../../../types';

class Buyer<T> {
  
  constructor(
    private payment: TPayment = '',
    private email: string = '',
    private phone: string = '',
    private address: string = ''
  ) {}

  private saveData(form:Partial<T>){ // Поступают данные формы (объект)
    for(const el in form) {
      if((this as any)[el] !== form[el as keyof T]) { // Убираем key из нашего, 
        (this as any)[el] = form[el];
      }
    }
  }

  private saveDatas(form: Partial<T>) {
  for (const key in form) {
      if ((this as any)[key] !== form[key as keyof T]) {
        (this as any)[key] = form[key as keyof T];
    }
  }
}

  // Вернуть объект всех данных покупателя;
  get buyerData(){
    return { payment:this.payment, email:this.email, phone:this.phone, address:this.address }
  }

  validateRules(){

  }
}

