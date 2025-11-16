import './scss/styles.scss';
import { Buyer } from './components/models/Buyer.ts';
import { BasketProduct } from './components/models/BasketProduct.ts';
import { MainCatalog } from './components/models/MainCatalog.ts';
import { apiProducts } from './utils/data.ts';
import { ShopApi } from './components/models/ShopApi.ts';
import { Api } from './components/base/Api.ts'; 
import { API_URL } from './utils/constants.ts';

// _________Инициализация_________
const buyer = new Buyer();
const basketProduct = new BasketProduct();
const mainCatalog = new MainCatalog();

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

// Проверка записи полей методом setBuyerData
buyer.setBuyerData({payment:'card'});
console.log('Проверка записи полей методом saveData', buyer);

// Проверка метода по получению 
console.log('Получаем данные: ',buyer.getBuyerData());

// Очистка полей с помощью метода clear
buyer.clear();
console.log('Проверка, что метод очистки полей сработал:', buyer.getBuyerData());

// Метод проверки валидации полей, возварт объекта с ошибками
buyer.setBuyerData({payment:'card', email:'', phone:'акуа',address:"аукау"})
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

// _____Тест API_____
console.group('__Тестим Api__');

const api = new Api(API_URL);
const shopApi = new ShopApi(api);

try {
  // Запись товаров в Модель данных
  let response  = await shopApi.getProduct();
  mainCatalog.setListProduct(response.items);
  console.log('Выыгруженные товары через с сервера', mainCatalog.getListProduct());
}
catch(err){
  console.log('Произошла ошибка при выгрузке товаров', err);
}