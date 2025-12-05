import './scss/styles.scss';
import { Buyer } from './components/models/Buyer.ts';
import { BasketProduct } from './components/models/BasketProduct.ts';
import { MainCatalog } from './components/models/MainCatalog.ts';
import { ShopApi } from './components/models/ShopApi.ts';
import { Api } from './components/base/Api.ts';
import { API_URL, CDN_URL } from './utils/constants.ts';
import { ensureElement, cloneTemplate } from './utils/utils.ts';

import { Modal } from './components/View/Modal.ts';
import { EventEmitter } from './components/base/Events.ts';
import { CardByCatalog } from './components/View/CardByCatalog.ts';
import { Header } from './components/View/Header.ts';
import { Gallery } from './components/View/Gallery.ts';
import { CardPreview } from './components/View/CardPreview.ts';
import { CardBasket } from './components/View/CardBasket.ts';
import { Basket } from './components/View/Basket.ts';
import { IProduct, FormEventPayload } from './types';
import { FormOrder } from './components/View/FormOrder.ts';
import { FormContacts } from './components/View/FormContacts.ts';
import { OrderSuccess } from './components/View/OrderSuccess.ts';

// ____________________________________API_______________________________________________

const api = new Api(API_URL);
const shopApi = new ShopApi(api);

// ______________________________Брокер событий__________________________________________

const events = new EventEmitter();

// _________Инициализация_________
const buyer = new Buyer(events);
const basketProduct = new BasketProduct(events);
const mainCatalog = new MainCatalog(events);

// ______________________________Модальное окно__________________________________________

const modalTemplate = ensureElement('#modal-container');
const modal = new Modal(modalTemplate);


// ______________________________Сама корзина + карточка__________________________________

const basketTemplate = cloneTemplate('#basket');
const basket = new Basket(basketTemplate, events);

// ____________________________________formOrder__________________________________________


const formOrderTemplate = cloneTemplate('#order');
const formOrder = new FormOrder(events, formOrderTemplate);

//__________________________________form Success__________________________________________

const formSuccessTemplate = cloneTemplate('#success');
const formSuccess = new OrderSuccess(events, formSuccessTemplate);

// _______________________________form Contacts___________________________________________

const formContactsTemplate = cloneTemplate('#contacts');
const formContacts = new FormContacts(events, formContactsTemplate);

// ___________________________________Header______________________________________________

const headerTemplate = ensureElement('.header');
const header = new Header(events, headerTemplate);

// ________________________________Галерея-catalog _______________________________________

const gallery = new Gallery(ensureElement('.page__wrapper'));

// _________________________ Получение данных по api______________________________________

(async () => {
  try {
    const response = await shopApi.getProduct();
    mainCatalog.setListProduct(response.items.map(el => ({ ...el, image: `${CDN_URL + el.image}` })));
    console.log('Выыгруженные товары через с сервера', mainCatalog.getListProduct());
  } catch (err) {
    console.log('Произошла ошибка при выгрузке товаров', err);
  }
})();

// ________________________________Галерея-catalog ________________________________________ 

events.on('catalog:changed', () => {
  const itemCards = mainCatalog.getListProduct().map((item) => {
    const card = new CardByCatalog(cloneTemplate('#card-catalog'), {
      onClick: () => events.emit('card:select', item),
    });
    return card.render(item);
  });
  gallery.render({ catalog: itemCards });
  header.render({ counter: basketProduct.countProduct() });
});

// ____________________________Карточка просмотра Preview ____________________________________

events.on('card:select', (item: IProduct) => {

  const cardPreview = new CardPreview(cloneTemplate('#card-preview'), {
    onClick: () => events.emit('card:AddBasket', item),
  });
  const status = item.price == null ? null : basketProduct.existenceProduct(item.id);
  cardPreview.updateCardButton(status);
  modal.modalContent = cardPreview.render(item);
  modal.modelOpen();
});

// _____________________Функция добавления карточки и закрытия модалки_________________________

events.on('card:AddBasket', (item: IProduct) => {
  if (basketProduct.existenceProduct(item.id)) {
    basketProduct.deleteProduct(item);
  }
  else if (item.price != null) {
    basketProduct.addProduct(item);
  }
  else {
    console.log('Товар невозможно добавить');
  }
  modal.closeModale();
  header.counter = basketProduct.countProduct();
});

//____________ Функция render баскета, вынесена отдельно, т.к переиспользуется_________________

events.on('basket:updated', () => {
  const itemCards = basketProduct.getlistProduct().map((item, idx) => {
    const card = new CardBasket(cloneTemplate('#card-basket'), {
      onClick: () => events.emit('cardBasket:delete', item),
    });

    return card.render({
      index: (idx + 1).toString(),
      title: item.title,
      price: item.price,
    });
  });

  itemCards.length == 0 ? basket.updateButton(true) : basket.updateButton(false);
  header.render({ counter: basketProduct.countProduct() });

  const content = basket.render({ catalog: itemCards, price: basketProduct.calculatePrice() });
  modal.render({ modalContent: content });
});

// ________________________________________Событие для открытия basket___________________________________

events.on('basket:open', () => {
  modal.modalContent = basket.render();
  modal.modelOpen();
});

// ___________________________________Событие удаления продукта из корзины________________________________
events.on('cardBasket:delete', (item: IProduct) => {
  basketProduct.deleteProduct(item);
});

// ___________________________________Общее событие проверки ошибок форм__________________________________

events.on('formOrder:listener', (payload: FormEventPayload) => {

  if (!payload) return;
  const { formName, buttonName, value } = payload;

  if ('order' === formName) {
    if (buttonName == 'cash' || buttonName == 'card') {
      buyer.setBuyerData({ payment: buttonName });
    }
    else if (buttonName == 'address') {
      buyer.setBuyerData({ [buttonName]: value });
    }
    const errors = buyer.validate();
    formOrder.setError([errors.payment, errors.address]);
  }

  else if ('contacts' == formName) {
    if (buttonName == 'email' || buttonName == 'phone') {
      buyer.setBuyerData({ [buttonName]: value });
    }
    const errors = buyer.validate();
    formContacts.setError([errors.phone, errors.email]);
  }
});

// _________________________________________Кнопка basket, открывает Order__________________________________________________ 

events.on('formOrder:open', () => {
  modal.modalContent = formOrder.render();
})
// _________________________________Общее событие кнопки форм formContacts и formOrder________________________________________

events.on('form:next', (payload: FormEventPayload) => {

  const { formName } = payload;

  if (formName == 'contacts') {
    formSuccess.render({ orderDescription: basketProduct.calculatePrice() });

    (async () => {
      try {
        await shopApi.createOrder( // Сюда промис возвращается;
          {
            ...buyer.getBuyerData(),
            total: basketProduct.calculatePrice(),
            items: basketProduct.getlistProduct().map(el => el.id),
          });
        basketProduct.clearBasket();
        modal.modalContent = formSuccess.render();
      }
      catch (err) {
        console.log('Что-то пошло не так', err)
      }
    })();
  }

  else if (formName == 'order') {
    modal.modalContent = formContacts.render();
  }
})

// _____________________________Действие кнопки order success___________________________

events.on('order-success:close', () => {
  basketProduct.clearBasket();
  modal.closeModale();
})