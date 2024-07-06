import { Schema, Types, model } from "mongoose";
import { z } from "zod";

// Define the validation schema using zod
export const ProductSchema = z.object({
  name: z.string().min(1, { message: "Product name is required" }),
  description: z
    .string()
    .min(1, { message: "Product description is required" }),
  price: z
    .number()
    .min(1, { message: "Product price must be greater than 0" }),
  category: z.string().min(1, { message: "Product category is required" }),
  tags: z
    .array(z.string())
    .min(1, { message: "Product must have at least one tag" }),
  variants: z.array(
    z.object({
      type: z.string().min(1, { message: "Variant type is required" }),
      value: z.string().min(1, { message: "Variant value is required" }),
    })
  ),
  inventory: z.object({
    quantity: z
      .number()
      .min(0, {
        message: "Inventory quantity must be greater than or equal to 0",
      }),
    inStock: z.boolean(),
  }),
});

export const ProductOrderSchema = z.object({
  email: z.string().email({ message: "Invalid email format" }),
  productId: z.string().refine((value) => Types.ObjectId.isValid(value), {
    message: "Invalid product ID format",
  }),
  price: z
    .number()
    .min(1, { message: "Price must be greater than 0" }),
  quantity: z.number().min(1, { message: "Quantity must be greater than 0" }),
});


