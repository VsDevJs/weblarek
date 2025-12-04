import { FormBase } from './FormBase';
import { ensureElement } from '../../utils/utils';
import { IEvents } from '../base/Events';

export class FormOrder extends FormBase {

  protected inputCard: HTMLButtonElement;
  protected inputCash: HTMLButtonElement;
  protected addressOrder: HTMLInputElement;

  constructor(events: IEvents, element: HTMLElement) {

    super(events, element);

    this.inputCard = ensureElement<HTMLButtonElement>("button[name='card']", this.container);
    this.inputCash = ensureElement<HTMLButtonElement>('button[name="cash"]', this.container);
    this.addressOrder = ensureElement<HTMLInputElement>('input[name="address"]', this.container);

    this.inputCard.addEventListener('click', (event) => {
      const target = event.target;
      if (target)
        events.emit('formOrder:listener', { target, element: this.container });
    })

    this.inputCash.addEventListener('click', (event) => {
      const target = event.target as HTMLButtonElement;
      if (target)
        events.emit('formOrder:listener', { target, element: this.container });
    })

    this.addressOrder.addEventListener('input', (event) => {
      const target = event.target as HTMLButtonElement;
      if (target)
        events.emit('formOrder:listener', { target, element: this.container });
    })
  }

  orderButtonStatus(button: HTMLElement) {
    this.inputCash.classList.remove('button_alt-active');
    this.inputCard.classList.remove('button_alt-active')
    button.classList.add('button_alt-active');
  }
}