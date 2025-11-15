
import { IBuyer } from '../../../types';

export class Buyer {
  // + 
  constructor(
    private payment: IBuyer['payment'] = '',
    private email: string = '',
    private phone: string = '',
    private address: string = ''
  ) {}

// + Нам поступить ничего не может кроме нашего шаблона  IBuyer;

  saveData(form:Partial<IBuyer>){ // Поступают данные формы (объект)
    for(const el in form) {
      if((this as any)[el] !== form[el as keyof IBuyer]) { // Убираем key из нашего, 
        (this as any)[el] = form[el as keyof IBuyer];
      }
    }
  }

  // +  Вернуть объект всех данных покупателя
  buyerData(){
    return { 
      payment:this.payment, 
      email:this.email, 
      phone:this.phone, 
      address:this.address 
    }
  }
  // +
  validate() {
    const objectValues: IBuyer = this.buyerData();

    const validationRules = {
      email: (val: string) => val.trim().length > 0 ? true : (validationRules.status = false,'Емейл поле должно быть не пустым!'),
      phone: (val: string) => val.trim().length > 0 ? true : (validationRules.status = false,'Поле с номером телефона должно быть не пустым!'),
      address: (val: string) => val.trim().length > 0 ? true : (validationRules.status = false,'Заполните поле с адресом'),
      payment: (val: string) => val.trim().length > 0 ? true : (validationRules.status = false,'Выбирите способ оплаты'),
      status:true,
    };

    const fieldErrors  = Object.fromEntries(Object.keys(objectValues).map((el) => {
      return [el, (validationRules as any)[el](objectValues[el as keyof IBuyer])];
    }));
    return validationRules.status ? 'Валидация полностью корректна' : fieldErrors;
  }
  // +
  clear(): void {
    this.payment = '';
    this.email = '';
    this.phone = '';
    this.address = '';
  }
}

