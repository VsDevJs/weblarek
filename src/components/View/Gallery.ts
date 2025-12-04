import { IGalleryData } from '../../types';
import { ensureElement } from '../../utils/utils';
import { Component } from '../base/Component';

export class Gallery extends Component<IGalleryData> {

  protected catalogElement: HTMLElement;

  constructor(catalogElement: HTMLElement) {
    super(catalogElement);
    this.catalogElement = ensureElement<HTMLElement>('.gallery', this.container);
  }

  set catalog(items: HTMLElement[]) {
    this.catalogElement.replaceChildren(...items);
  }
}