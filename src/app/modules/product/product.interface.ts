import { Model, ObjectId } from "mongoose";

export type TVariant = {
  type: string;
  value: string;
};

export type TInventory = {
  quantity: number;
  inStock: boolean;
};

export type TProduct = {
  id?: ObjectId;
  name: string;
  description: string;
  price: number;
  category: string;
  tags: string[];
  variants: TVariant[];
  inventory: TInventory;
};



export type TProductOrder = {
  email: any | string;
  productId: ObjectId | string;
  price: number;
  quantity: number;
};



export interface ProductModel extends Model<TProduct> {
  isProductExistsBy_id(id: string): Promise<TProduct | null>;
}
