export interface Billboard {
  id: string;
  name: string;
  imageUrl: string;
}

export interface Category {
  id: string;
  name: string;
  billboard: Billboard;
}

export interface Service {
  id: string;
  name: string;
  category: Category;
  price: string;
  time: string;
}
