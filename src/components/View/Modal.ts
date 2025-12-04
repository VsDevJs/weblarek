import { IModal } from '../../types';
import { ensureElement } from '../../utils/utils';
import { Component } from '../base/Component';

export class Modal extends Component<IModal> {

  protected modalClose: HTMLButtonElement;
  protected _modalContent: HTMLElement;

  constructor(modalElement: HTMLElement) {

    super(modalElement);

    this.modalClose = ensureElement<HTMLButtonElement>('.modal__close', this.container);
    this._modalContent = ensureElement<HTMLElement>('.modal__content', this.container);

    this.container.addEventListener('click', (target) => {
      // Если 
      if (target.target == target.currentTarget || target.target == this.modalClose)
        this.closeModale();
    })
  }

  set modalContent(val: HTMLElement) {
    this._modalContent.replaceChildren(val);
  }

  closeModale() {
    this.container.classList.remove('modal_active');
  }

  modelOpen() {
    this.container.classList.add('modal_active');
  }
}