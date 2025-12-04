import { ICard } from '../../types';
import { ensureElement } from '../../utils/utils';
import { Component } from '../base/Component';

export class Card<T> extends Component<T & ICard> {

  protected cardTitle: HTMLElement;
  protected cardPrice: HTMLSpanElement;

  constructor(cardElement: HTMLElement) {
    super(cardElement);
    this.cardPrice = ensureElement<HTMLElement>('.card__price', this.container);
    this.cardTitle = ensureElement<HTMLSpanElement>('.card__title', this.container);
  }

  set title(val: string) {
    if (this.cardTitle)
      this.cardTitle.textContent = val;
    // 
  }

  set price(val: number | null) {
    if (val != null)
      this.cardPrice.textContent = `${val} синапсов`;
    else
      this.cardPrice.textContent = 'Бесценно';
  }
}