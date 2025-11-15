import './scss/styles.scss';
import { Buyer } from './components/base/models/Buyer.ts';
import { BasketProduct } from './components/base/models/BasketProduct.ts';
import { MainCatalog } from './components/base/models/MainCatalog.ts';
import { apiProducts } from './utils/data.ts';
import { TApi } from './components/base/models/TApi.ts';
import { Api } from './components/base/Api.ts'; 
import {API_URL} from './utils/constants.ts';

// _________Инициализация_________

const buyer = new Buyer();
const basketProduct = new BasketProduct();
const mainCatalog = new MainCatalog();

const api = new Api(API_URL);
const tapi = new TApi(api);
console.log(tapi);

// _______Модель MainCatalog_______

console.group('Модель каталог');

// сохранение массива
mainCatalog.setListProduct(apiProducts.items);

// Вывод в консоль массива
console.log('Вывод в консоль массива',mainCatalog.getListProduct());

// Сохранение и отображение товара для подробного отображения. В лошике сеттера detaileProduct также задействован метод getProductById
mainCatalog.setDetailedProduct('854cef69-976d-4c2a-a18c-2aa45046c390');
console.log(mainCatalog.getDetailedProduct() ? `Товар существует  ${mainCatalog.getDetailedProduct()?.id}` : 'Товар отсутствует' );

console.groupEnd();

// ____________Модель Buyer_________________
console.group('Модель ___Buyer___');

// Проверка конструктора 
console.log('Проверка конструктора: ',buyer);

// Проверка записи полей методом saveData
buyer.saveData({payment:'card', email:'fwef@cfwef', phone:'43f34f34',address:"fwreferf"})
console.log('Проверка записи полей методом saveData', buyer);

// Проверка метода по получению 
console.log('Получаем данные: ',buyer.buyerData());

// Очистка полей с помощью метода clear
buyer.clear();
console.log('Проверка, что метод очистки полей сработал:', buyer.buyerData());

// Метод проверки валидации полей, возварт объекта с ошибками
buyer.saveData({payment:'card', email:'', phone:'акуа',address:"аукау"})
console.log('Объект с ошибками после валидации полей:', buyer.validate());

console.groupEnd();


// ______________Проверка модели BasketProduct________________
console.group('_____________BasketProduct________________')

// Проверка добавления товаров в корзину методов addProduct и получения товаров методом  
basketProduct.addProduct(apiProducts.items[1]);
basketProduct.addProduct(apiProducts.items[3]);

console.log(`Проверка добавления товаров методом addProduct`,basketProduct.getlistProduct());

// Проверка удаления товара из корзины deleteProduct

basketProduct.deleteProduct(apiProducts.items[3]);
console.log(`Удалили товар ${apiProducts.items[3].id}`, basketProduct.getlistProduct());

// Проверка на наличие товара в корзине методом existenceProduct

console.log(basketProduct.existenceProduct(apiProducts.items[1].id) ? `Товар ${apiProducts.items[1].id} есть в корзине` : 'Товар отсутствует');

// Подсчет количества товаров в корзине методом countProduct

console.log(`В корзие: ${basketProduct.countProduct()} позиции`);

// Проверка метода calculatePrice для подсчета общей стоимости товаров
console.log('Сейчас в корзине товаров на сумму: ', basketProduct.calculatePrice());

// Проверка метода clearBasket для очистки корзины
basketProduct.clearBasket();
console.log('Результат после очистки корзины методом clearBasket: ', basketProduct.getlistProduct());

