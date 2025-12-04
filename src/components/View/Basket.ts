import { IBasket } from '../../types';
import { ensureElement } from '../../utils/utils';
import { Component } from '../base/Component';
import { IEvents } from '../base/Events';

// Нужно ли тут писать метод для кнопки ? Чтобы button нажался

export class Basket extends Component<IBasket> {

  protected catalogBasket: HTMLElement;
  protected basketPrice: HTMLElement;
  protected buttonBasket: HTMLButtonElement;

  constructor(basketElement: HTMLElement, protected events: IEvents) {

    super(basketElement);
    this.catalogBasket = ensureElement<HTMLElement>('.basket__list', this.container);
    this.basketPrice = ensureElement<HTMLElement>('.basket__price', this.container);
    this.buttonBasket = ensureElement<HTMLButtonElement>('.basket__button', this.container);

    this.buttonBasket.addEventListener('click', () => {
      this.events.emit('formOrder:open');
    });
  }

  set catalog(val: HTMLElement[]) {
    console.log(val);
    this.catalogBasket.replaceChildren(...val);
  }

  set price(val: number) {
    this.basketPrice.textContent = `${val} синапсов`;
  }

  updateButton(val: boolean) {
    this.buttonBasket.disabled = val;
  }
}