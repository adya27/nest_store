export class ProductDto {
  // noinspection JSUnusedGlobalSymbols
  title: string;
  // noinspection JSUnusedGlobalSymbols
  image: string;
  // noinspection JSUnusedGlobalSymbols
  price: number;
  // noinspection JSUnusedGlobalSymbols
  oldPrice: number;
  // noinspection JSUnusedGlobalSymbols
  credit: number;
  // noinspection JSUnusedGlobalSymbols
  calculateRating: number;
  // noinspection JSUnusedGlobalSymbols
  description: string;
  // noinspection JSUnusedGlobalSymbols
  advantages: string[];
  // noinspection JSUnusedGlobalSymbols
  disadvantages: string[];
  // noinspection JSUnusedGlobalSymbols
  categories: string[];
  // noinspection JSUnusedGlobalSymbols
  tags: string[];
  // noinspection JSUnusedGlobalSymbols
  characteristics: {
    [key: string]: string;
  };
}
