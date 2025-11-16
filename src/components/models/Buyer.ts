
import { IBuyer } from '../../types';

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

  getBuyerData() {
    return {
      payment: this.payment,
      email: this.email,
      phone: this.phone,
      address: this.address
    }
  }

  validate() {
    const objectValues: IBuyer = this.getBuyerData();

    const validationRules = {
      email: (val: string) => val.trim().length > 0 ? true : (validationRules.status = false, 'Емейл поле должно быть не пустым!'),
      phone: (val: string) => val.trim().length > 0 ? true : (validationRules.status = false, 'Поле с номером телефона должно быть не пустым!'),
      address: (val: string) => val.trim().length > 0 ? true : (validationRules.status = false, 'Заполните поле с адресом'),
      payment: (val: string) => val.trim().length > 0 ? true : (validationRules.status = false, 'Выбирите способ оплаты'),
      status: true,
    };

    const fieldErrors = Object.fromEntries(Object.keys(objectValues).map((el) => {
      return [el, (validationRules as any)[el](objectValues[el as keyof IBuyer])];
    }));
    
    return validationRules.status ? 'Валидация полностью корректна' : fieldErrors;
  }

  clear(): void {
    this.payment = '';
    this.email = '';
    this.phone = '';
    this.address = '';
  }
}

