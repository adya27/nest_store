import {Column} from "typeorm";

export class ProductDto {
    title: string;
    image: string;
    price: number;
    oldPrice: number;
    credit: number;
    calculateRating: number;
    description: string;
    advantages: string[];
    disadvantages: string[];
    categories: string[];
    tags: string[];
    characteristics: {
        [key: string]: string
    }
}