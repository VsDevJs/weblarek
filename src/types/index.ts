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
export interface getData {
    total: number,
    items: IProduct[],
};

// Получение ответа от Post
export interface postGet {
    id: string,
    total: number,
}

// Отправка POST
export interface Post extends IBuyer {
    payment: TPayment,
    items: postGet['id'][],
}