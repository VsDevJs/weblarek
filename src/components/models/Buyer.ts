
import { IBuyer, TFormErrors } from '../../types';

export class Buyer {

  constructor(
    private payment: IBuyer['payment'] = '',
    private email: string = '',
    private phone: string = '',
    private address: string = ''
  ) { }

  setBuyerData(data: Partial<IBuyer>) {
    for (const el in data) {
      if ((this as any)[el] !== data[el as keyof IBuyer]) {
        (this as any)[el] = data[el as keyof IBuyer];
      }
    }
  }

  getBuyerData():IBuyer {
    return {
      payment: this.payment,
      email: this.email,
      phone: this.phone,
      address: this.address
    }
  }

  validate():IBuyer | string {
    
    const objectValues: IBuyer = this.getBuyerData();
    let status:boolean = true;

    //
    const validationRules:TFormErrors = {
      email: (val: string) => val.trim().length > 0 ? '' : (status = false, 'Емейл поле должно быть не пустым!'),
      phone: (val: string) => val.trim().length > 0 ? '' : (status = false, 'Поле с номером телефона должно быть не пустым!'),
      address: (val: string) => val.trim().length > 0 ? '' : (status = false, 'Заполните поле с адресом'),
      payment: (val: string) => val.trim().length > 0 ? '' : (status = false, 'Выбирите способ оплаты'),
    };

    const fieldErrors = Object.fromEntries(Object.keys(objectValues).map((el) => {
      return [el, (validationRules as any)[el](objectValues[el as keyof IBuyer])];
    }));

    return status ? 'Валидация полностью корректна' : fieldErrors as IBuyer;
  }

  clear(): void {
    this.payment = '';
    this.email = '';
    this.phone = '';
    this.address = '';
  }
}