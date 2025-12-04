import { FormBase } from './FormBase';
import { ensureElement } from '../../utils/utils';
import { IEvents } from '../base/Events';


export class FormContacts extends FormBase {

  protected inputEmail: HTMLInputElement;
  protected inputPhone: HTMLInputElement;

  constructor(events: IEvents, element: HTMLElement) {
    super(events, element);
    this.events = events;
    this.inputEmail = ensureElement<HTMLInputElement>('input[name="email"]', this.container);
    this.inputPhone = ensureElement<HTMLInputElement>('input[name="phone"]', this.container);

    this.inputEmail.addEventListener('input', (event) => {
      const target = event.target as HTMLButtonElement;
      if (target)
        events.emit('formOrder:listener', { target, element: this.container });
    })

    this.inputPhone.addEventListener('input', (event) => {
      const target = event.target as HTMLButtonElement;
      if (target)
        events.emit('formOrder:listener', { target, element: this.container });
    })
  }
}