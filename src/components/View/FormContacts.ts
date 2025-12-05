import { FormBase } from './FormBase';
import { ensureElement } from '../../utils/utils';
import { IEvents } from '../base/Events';


export class FormContacts extends FormBase {

  protected inputEmail: HTMLInputElement;
  protected inputPhone: HTMLInputElement;

  constructor(events: IEvents, element: HTMLElement) {
    super(events, element);
    this.events = events;
    const form = element as HTMLFormElement;

    this.inputEmail = ensureElement<HTMLInputElement>('input[name="email"]', this.container);
    this.inputPhone = ensureElement<HTMLInputElement>('input[name="phone"]', this.container);

    this.inputEmail.addEventListener('input', (event) => {
      const target = event.target as HTMLInputElement;
      if (target.name)
        events.emit('formOrder:listener', { formName:form.name, buttonName: target.name, value:target.value });
    })

    this.inputPhone.addEventListener('input', (event) => {
      const target = event.target as HTMLInputElement;
      if (target.name)
        events.emit('formOrder:listener', { formName:form.name, buttonName: target.name, value:target.value });
    })
  }
}