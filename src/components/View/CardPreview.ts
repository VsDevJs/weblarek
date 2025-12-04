import { ICardPreview, ICardAction } from '../../types';
import { ensureElement } from '../../utils/utils';
import { Card } from './Card';
import { categoryMap } from '../../utils/constants';

type CategoryKey = keyof typeof categoryMap;

export class CardPreview extends Card<ICardPreview> {

    protected cardButton: HTMLButtonElement;
    protected cardDescription: HTMLElement;
    protected cardImage: HTMLImageElement;
    protected cardCategory: HTMLElement;

    constructor(cardElement: HTMLElement, actions?: ICardAction) {
        super(cardElement);
        this.cardButton = ensureElement<HTMLButtonElement>('.card__button', this.container);
        this.cardDescription = ensureElement<HTMLElement>('.card__text', this.container);
        this.cardImage = ensureElement<HTMLImageElement>('.card__image', this.container);
        this.cardCategory = ensureElement<HTMLElement>('.card__category', this.container);

        if (actions?.onClick) {
            this.cardButton.addEventListener('click', actions.onClick);
        }
    }
    set description(val: string) {
        if (this.cardDescription && val)
            this.cardDescription.textContent = val;
    }

    UpdateCardButton(val: boolean | null) {
        val == null ? (this.cardButton.disabled = true, this.cardButton.textContent = 'Недоступно') : val ? this.cardButton.textContent = 'Удалить из корзины' : this.cardButton.textContent = 'Добавить в корзину';
    }

    set category(val: string) {
        this.cardCategory.textContent = val;
        for (const key in categoryMap) {
            this.cardCategory.classList.toggle(categoryMap[key as CategoryKey], key === val);
        }
    }

    set image(val: string) {
        this.setImage(this.cardImage, val, this.title);
    }
}