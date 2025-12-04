import { IOrderSuccess } from '../../types';
import { ensureElement } from '../../utils/utils';
import { Component } from '../base/Component';
import { IEvents } from '../base/Events';

export class OrderSuccess extends Component<IOrderSuccess> {
  protected _orderDescription: HTMLElement;
  protected orderButton: HTMLButtonElement;

  constructor(protected events: IEvents, orderElement: HTMLElement) {

    super(orderElement)

    this._orderDescription = ensureElement<HTMLElement>('.order-success__description', this.container);
    this.orderButton = ensureElement<HTMLButtonElement>('.order-success__close', this.container);

    this.orderButton.addEventListener('click', () => {
      this.events.emit('order-success:close');
    });
  }

  set orderDescription(val: number) {
    if (val && this._orderDescription)
      this._orderDescription.textContent = `Списано ${val} синапсов`;
  }
}