import { ICategory } from "./ICategory";

export interface IProduct {
  id:number,
  name:string,
  description:string,
  costPrice:number,
  salePrice:number,
  currentQuantity:number,
  image:string,
  category:ICategory
}
