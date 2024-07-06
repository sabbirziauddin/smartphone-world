import exp from "constants";
import { TProduct, TProductOrder } from "./product.interface";
import { Product, ProductOrderModel } from "./product.model";
import mongoose, { ObjectId } from "mongoose";

const creatProductIntoDB = async (productData: TProduct) => {
  const result = await Product.create(productData);
  return result;
};

//get single product
const getSingleProductFromDB = async (id: string) => {
  try {
    // Validate the ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid product ID format");
    }

    const result = await Product.findById(id).select(
      "-_id -__v -inventory._id -variants._id"
    );
    if (!result) {
      throw new Error("Product not found");
    }

    return result;
  } catch (error) {
    throw error;
  }
};

//get all products
const getAllProductsFromDB = async () => {
  try {
    const result = await Product.find().select("-_id -__v -inventory._id -variants._id");
    return result;
  } catch (error) {
    throw error;
  }
};
//updateProductIntoDB

const updateProductIntoDB = async (
  id: string,
  productData: Partial<TProduct>
) => {
  try {
    // Validate the ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid product ID format");
    }

    // Ensure the product exists before updating
    const productExists = await Product.findById(id);
    if (!productExists) {
      throw new Error("Product not found");
    }

    // Perform the update
    const result = await Product.findByIdAndUpdate(
      id,
      { $set: productData },
      { new: true, runValidators: true }
    ).select("-_id");

    if (!result) {
      throw new Error("Product update failed");
    }

    return result;
  } catch (error) {
   
    throw error;
  }
};


// deleteProductFromDB
const deleteProductFromDB = async (id: string) => {
  try {
    // Validate the ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid product ID format");
    }

    // Ensure the product exists before deleting
    const productExists = await Product.findOneAndDelete({ _id: id });
    if(!productExists){
        throw new Error("Product not found");
    }
  } catch(error){
      throw error;
  }
}

//searchProductFromDB
const searchProductFromDB = async (searchQuery: string) => {
  try {
    const result = await Product.find({
      $or: [
        { name: { $regex: searchQuery, $options: "i" } },
        { description: { $regex: searchQuery, $options: "i" } },
        { category: { $regex: searchQuery, $options: "i" } },
        { tags: { $in: [searchQuery] } },
      ],
    }).select("-_id -__v -inventory._id -variants._id");
    if (result.length === 0) {
      throw new Error("Product not found!");
    }
    return result;
  } catch (error) {
    throw error;
  }
};

//create product order  in DB
/* const createProductOrderIntoDB = async (id:string,productOrderData:TProductOrder) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid product ID format");
    }

    // Ensure the product exists before updating
    const productExists = await Product.findById(id);

    if (!productExists) {
      throw new Error("Product not found");
    }
  const result = await ProductOrderModel.create(productOrderData);
  return result;
}; */

//create product order  in DB
const createProductOrderIntoDB = async (
  id: string,
  productOrderData: TProductOrder
) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid product ID format");
  }

  try {
    // Retrieve the product
    const product = await Product.findById(id);

    if (!product) {
      throw new Error("Order not found");
    }

    // Deduct quantity from inventory
    if (product.inventory.inStock == true && product.inventory.quantity >0) {
      product.inventory.quantity -= productOrderData.quantity;
      if (product.inventory.quantity <= 0) {
        product.inventory.inStock = false;
      }
    }
    // Update inStock status
     if(product.inventory.inStock==false){
        throw new Error("Insufficient quantity available in inventory");
     }
    // Save the updated product document
    await product.save();

    // Create the product order
    const createdProductOrder = await ProductOrderModel.create(
      productOrderData
    );

    return createdProductOrder;
  } catch (error) {
    console.error("Error creating product order:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
};

//get all product orders
const getAllProductOrdersFromDB = async () => {
  try {
    const result = await ProductOrderModel.find().select("-_id -__v");
    return result;
  } catch (error) {
    throw error;
  }
};

// getProductOrder by user email
const getProductOrderByEmailFromDB = async (email: string) => {
   
    const result = await ProductOrderModel.find({ email}).select("-_id -__v");
    if (result.length === 0) {
      throw new Error("No order found for this email");
    }
    return result;
}




export const ProductService = {
  creatProductIntoDB,
  updateProductIntoDB,
  getSingleProductFromDB,
  getAllProductsFromDB,
  deleteProductFromDB,
  searchProductFromDB,
createProductOrderIntoDB,
getAllProductOrdersFromDB,
getProductOrderByEmailFromDB
};

