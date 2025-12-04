import { ICardByCatalog, ICardAction } from '../../types';
import { ensureElement } from '../../utils/utils';
import { Card } from './Card';
import { categoryMap } from '../../utils/constants';

type CategoryKey = keyof typeof categoryMap;

export class CardByCatalog extends Card<ICardByCatalog> {

  protected cardImg: HTMLImageElement;
  protected cardCategory: HTMLElement;

  constructor(cardElement: HTMLElement, actions?: ICardAction) {
    super(cardElement);
    this.cardImg = ensureElement<HTMLImageElement>('.card__image', this.container);
    this.cardCategory = ensureElement<HTMLElement>('.card__category', this.container);
    if (actions?.onClick) {
      this.container.addEventListener('click', actions.onClick);
    }
  }

  set category(val: string) {
    this.cardCategory.textContent = val;
    for (const key in categoryMap) {
      this.cardCategory.classList.toggle(categoryMap[key as CategoryKey], key === val);
    }
  }

  set image(val: string) {
    this.setImage(this.cardImg, val, this.title);
  }
}