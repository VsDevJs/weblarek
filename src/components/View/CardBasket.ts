
import { ICardBasket, ICardAction } from '../../types';
import { ensureElement } from '../../utils/utils';
import { Card } from './Card';

export class CardBasket extends Card<ICardBasket> {

  private itemIndex: HTMLButtonElement;
  private buttonDelete: HTMLButtonElement;

  constructor(cardElement: HTMLElement, actions?: ICardAction) {
    super(cardElement);
    this.itemIndex = ensureElement<HTMLButtonElement>('.basket__item-index', this.container);
    this.buttonDelete = ensureElement<HTMLButtonElement>('.basket__item-delete', this.container);

    if (actions?.onClick) {
      this.buttonDelete.addEventListener('click', actions.onClick);
    }
  }

  set index(val: number) {
    if (val && this.itemIndex) {
      this.itemIndex.textContent = val.toString();
    }
  }
}