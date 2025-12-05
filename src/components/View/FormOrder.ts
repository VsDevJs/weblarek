import { FormBase } from './FormBase';
import { ensureElement } from '../../utils/utils';
import { IEvents } from '../base/Events';

export class FormOrder extends FormBase {

  protected inputCard: HTMLButtonElement;
  protected inputCash: HTMLButtonElement;
  protected addressOrder: HTMLInputElement;

  constructor(events: IEvents, element: HTMLElement) {

    super(events, element);
    const form = element as HTMLFormElement;
    this.inputCard = ensureElement<HTMLButtonElement>("button[name='card']", this.container);
    this.inputCash = ensureElement<HTMLButtonElement>('button[name="cash"]', this.container);
    this.addressOrder = ensureElement<HTMLInputElement>('input[name="address"]', this.container);

    this.inputCard.addEventListener('click', (event) => {
        const target = event.target as HTMLButtonElement;
        this.orderButtonStatus(target.name)
        if(target.name)
          events.emit('formOrder:listener', { formName:form.name, buttonName: target.name });
        // events.emit('formOrder:listener', { target, element: this.container });
    
    })

    this.inputCash.addEventListener('click', (event) => {
      const target = event.target as HTMLButtonElement;
      this.orderButtonStatus(target.name)
      if (target.name)
        events.emit('formOrder:listener', { formName:form.name, buttonName: target.name, value:target.value });
    })

    this.addressOrder.addEventListener('input', (event) => {
      const target = event.target as HTMLInputElement;
      if (target.name)
        events.emit('formOrder:listener', { formName:form.name, buttonName: target.name, value:target.value });
    })
  }

  orderButtonStatus(name:string) {
    [this.inputCash, this.inputCard].forEach(el => {
      if(name == el.name)
        el.classList.add('button_alt-active')
      else 
        el.classList.remove('button_alt-active')
    })
  }
}