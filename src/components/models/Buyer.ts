
import { IBuyer, TFormErrors } from '../../types';
import { IEvents } from '../base/Events';
export class Buyer {
  private payment: IBuyer['payment'] = '';
  private email: string = '';
  private phone: string = '';
  private address: string = '';

  constructor(
    private events:IEvents,
  ) {}

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

  validate():IBuyer {
    
    const objectValues: IBuyer = this.getBuyerData();
    //let status:boolean = true;

    const validationRules:TFormErrors = {
      email: (val: string) => val.trim().length > 0 ? '' :  'Емейл поле должно быть не пустым!',
      phone: (val: string) => val.trim().length > 0 ? '' : 'Поле с номером телефона должно быть не пустым!',
      address: (val: string) => val.trim().length > 0 ? '' :  'Заполните поле с адресом',
      payment: (val: string) => val.trim().length > 0 ? '' : 'Выбирите способ оплаты',
    };

    const fieldErrors = Object.fromEntries(Object.keys(objectValues).map((el) => {
      return [el, (validationRules as any)[el](objectValues[el as keyof IBuyer])];
    }));

    return fieldErrors as IBuyer;;
    //return status ? 'Валидация полностью корректна' : fieldErrors as IBuyer;
  }

  clear(): void {
    this.payment = '';
    this.email = '';
    this.phone = '';
    this.address = '';
    this.events.emit('buyer:clear');
  }
}