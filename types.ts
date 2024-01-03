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

export interface FormInfoData {
  type: string;
  address: {
    apartmentNumber?: string;
    street: string;
    city: string;
    postalCode: string;
  };
  rooms: number;
  bathrooms: number;
  date: Date;
  time: string;
  insideFridge: boolean;
  insideOven: boolean;
  insideCabinet: boolean;
  insideMicrowave: boolean;
  laundry: boolean;
  deepCleaning: boolean;
  carpetCleaning: boolean;
  movingOut: boolean;
  interiorWindows: boolean;
  officeSquareFootage: string;
  washroomStalls: number;
  businessType: string;
  footTraffic: number;
  floorType: string;
}
