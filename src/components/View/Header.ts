import { IHeaderData } from '../../types';
import { ensureElement } from '../../utils/utils';
import { Component } from '../base/Component';
import { IEvents } from '../base/Events';

export class Header extends Component<IHeaderData> {

  protected basketButton: HTMLButtonElement;
  protected basketCounter: HTMLElement;

  constructor(protected events: IEvents, elementHeader: HTMLElement) {
    super(elementHeader);
    this.basketCounter = ensureElement<HTMLElement>('.header__basket-counter', this.container);
    this.basketButton = ensureElement<HTMLButtonElement>('.header__basket', this.container);

    this.basketButton.addEventListener('click', () => {
      this.events.emit('basket:open');
    })
  }

  set counter(val: number) {
    this.basketCounter.textContent = val.toString();
  }
}