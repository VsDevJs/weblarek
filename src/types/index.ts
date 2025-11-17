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

//Тип данных для объекта с ошибками. Ключи полностью соответствуют IBuyer, а значения валидирующим функциям
export type TFormErrors = Record<keyof IBuyer, (val: string) => boolean | string>;
