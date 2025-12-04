import { Component } from "../base/Component";
import { ensureElement } from '../../utils/utils';
import { IEvents } from '../base/Events';

export class FormBase extends Component<void> {

  protected buttonForm: HTMLButtonElement;
  protected formErrors: HTMLSpanElement;

  constructor(protected events: IEvents, element: HTMLElement) {
    super(element);
    this.events = events;
    this.buttonForm = ensureElement<HTMLButtonElement>('button[type="submit"]', this.container);
    this.formErrors = ensureElement<HTMLSpanElement>('.form__errors', this.container);

    this.buttonForm.addEventListener('click', (event) => {
      event.preventDefault();
      const target = event.target as HTMLButtonElement;
      if (target)
        events.emit('form:next', { target, element: this.container });

    })
  }

  setError(val: string[]) {
    if (val.join('').trim() == '')
      this.buttonFormStatus(false);
    else
      this.buttonFormStatus(true);
    this.formErrors.textContent = val.join(' ');
  }

  buttonFormStatus(val: boolean) {
    this.buttonForm.disabled = val;
  }
}