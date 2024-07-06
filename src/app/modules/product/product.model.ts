import { Schema, Types, model } from "mongoose";
import {
  TProduct,
  TVariant,
  TInventory,
  ProductModel,
  TProductOrder,
} from "./product.interface";

const variantSchema = new Schema<TVariant>({
  type: {
    type: String,
    required: [true, "Variant type is required"],
  },
  value: {
    type: String,
    required: [true, "Variant value is required"],
  },
});

const inventorySchema = new Schema<TInventory>({
  quantity: {
    type: Number,
    required: [true, "Inventory quantity is required"],
  },
  inStock: {
    type: Boolean,
    required: [true, "In stock status is required"],
  },
});

const productSchema = new Schema<TProduct>({
  name: {
    type: String,
    required: [true, "Product name is required"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Product description is required"],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, "Product price is required"],
  },
  category: {
    type: String,
    required: [true, "Product category is required"],
    trim: true,
  },
  tags: {
    type: [String],
    required: [true, "Product tags are required"],
  },
  variants: {
    type: [variantSchema],
    required: [true, "Product variants are required"],
  },
  inventory: {
    type: inventorySchema,
    required: [true, "Product inventory is required"],
  },
});

const productOrderSchema = new Schema<TProductOrder>({
  email: {
    type: String,
    required: true,
  },
  productId: {
    type: Schema.Types.ObjectId,
    ref: "Product", // Reference to your Product model
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
});

productSchema.statics.isProductExistsBy_id = async function (id: string) {
  const product = await this.findById(id);
  return product;
};

export const Product = model<TProduct, ProductModel>("Product", productSchema);

export const ProductOrderModel = model<TProductOrder>("ProductOrder", productOrderSchema);

