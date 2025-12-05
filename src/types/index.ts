export type TPayment = 'cash' | 'card' | '';

export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export interface IApi {
    get<T extends object>(uri: string): Promise<T>;
    post<T extends object>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}

export interface IBuyer {
    payment: TPayment;
    email: string;
    phone: string;
    address: string;
};
export interface IProduct {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number | null;
};

// Получение данных Get 
export interface IProductResponse {
    total: number,
    items: IProduct[],
};

// Получение ответа от Post
export interface IOrderResponse {
    id: string,
    total: number,
}

// Отправка POST
export interface IRequestOrder extends IBuyer {
    total:number,
    items: string[],
}

// Тип header. Counter это сеттер
export interface IHeaderData {
    counter:number;
}

// Тип для окна подтверждения
export interface IOrderSuccess {
    orderDescription:number;
}

// Тип модального окна
export interface IModal {
    modalContent:HTMLElement;
}

// Тип Gallery
export interface IGalleryData {
    catalog:HTMLElement[];
}

export interface IBasket {
    catalog:HTMLElement[];
    price:number;
}

//Тип данных для объекта с ошибками. Ключи полностью соответствуют IBuyer, а значения валидирующим функциям
export type TFormErrors = Record<keyof IBuyer, (val: string) => string>;

// Тип для корневого Card
export type ICard = Pick<IProduct, 'title' | 'price'>;

// Тип для CardByCatalog
export type ICardByCatalog = Pick<IProduct, 'image' | 'category'>;
export interface ICardAction {
    onClick?: () => void;
}

//Типизация для ICardBasket

export type ICardBasket = Pick<IProduct & { index: string }, 'index'> 

// Типизация для CardPreview
export type ICardPreview = Pick<IProduct, 'description' | 'category' | 'image'>

// Типизация для формы
export type FormEventPayload = {    
    formName?: string;
    buttonName?: string;
    value?:string;
};