import { TProductOrder } from './product.interface';
import { Request, Response } from "express";
import { ProductService } from "./product.service";
import { ProductOrderSchema, ProductSchema } from "./product.zod.validation";

const createProduct = async (req: Request, res: Response) => {
    try {
        const productData = req.body;
        const validatedProduct = ProductSchema.parse(productData);
        const result = await ProductService.creatProductIntoDB(
          validatedProduct
        );
        res.status(200).json({
          success: true,
          message: "Product created succesfully",
          data: result,
        });
    }catch(err: any){
        res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    });
  
    }

}

const getSingleProduct = async (req: Request, res: Response) => {
    const productId = req.params.productId;
    try {
        const result = await ProductService.getSingleProductFromDB(productId);
        res.status(200).json({
          success: true,
          message: "Product fetched succesfully",
          data: result,
        });
    }catch(err: any){
        res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    });
  
    }

}

/* const getAllProducts = async (req: Request, res: Response) => {
    try {
        const result = await ProductService.getAllProductsFromDB();
        res.status(200).json({
          success: true,
          message: "Products fetched succesfully",
          data: result,
        });
    }catch(err: any){
        res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    });
  
    }


} */
export const getAllOrSearchProducts = async (req: Request, res: Response) => {
  const searchTerm = req.query.searchTerm as string | undefined;

  try {
    let result;
    if (searchTerm) {
      result = await ProductService.searchProductFromDB(searchTerm);
      res.status(200).json({
        success: true,
        message: `Products matching search term '${searchTerm}' fetched successfully!`,
        data: result,
      });
    } else {
      result = await ProductService.getAllProductsFromDB();
      res.status(200).json({
        success: true,
        message: "All products retrieved successfully",
        data: result,
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "Something went wrong",
      error: err,
    });
  }
};


const updateProduct = async (req: Request, res: Response) => {
    const productId = req.params.productId;
    try {
        const productData = req.body;
        const validatedProduct = ProductSchema.parse(productData);
        const result = await ProductService.updateProductIntoDB(
          productId,
          validatedProduct
        );
        console.log(result);
        res.status(200).json({
          success: true,
          message: "Product updated succesfully",
          data: result,
        });
    }catch(err: any){
        res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    });
  
    }
}

const deleteProduct = async (req: Request, res: Response) => {
    const productId = req.params.productId;
    try {
        const result = await ProductService.deleteProductFromDB(productId);
        res.status(200).json({
          success: true,
          message: "Product deleted succesfully",
          data: result,
        });
    }catch(err: any){
        res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    });
  
    }

}

/* const searchProduct = async (req: Request, res: Response) => {
    const searchQuery = req.query.searchTerm as string;
    try {
        const result = await ProductService.searchProductFromDB(searchQuery);

        if(result.length === 0){
            res.status(404).json({
                success: false,
                message: "No product found",
                data: result,
              });
        }
        res.status(200).json({
          success: true,
          message: "Product searched succesfully",
          data: result,
        });
    }catch(err: any){
        res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    });
  
    } 


}*/

// create order for product
const createProductOrder = async (req: Request, res: Response) => {
    const productId = req.body.productId;
    try {
        const validatedProductOrder = ProductOrderSchema.parse(req.body);
        const result = await ProductService.createProductOrderIntoDB(productId,validatedProductOrder)
        res.status(200).json({
          success: true,
          message: "Order created succesfully",
          data: result,
        });
    }catch(err: any){
        res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
    });
  
    }



}

//get all product orders from DB
const getAllProductOrders = async (req: Request, res: Response) => {
    try {
        const result = await ProductService.getAllProductOrdersFromDB();
        res.status(200).json({
          success: true,
          message: "Orders fetched succesfully",
          data: result,
        });
    }catch(err: any){
        res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    });
  
    }

}

// find product order by email
const getProductOrderByEmail = async (req: Request, res: Response) => {
    const email = req.query.email as string;
    try {
        const result = await ProductService.getProductOrderByEmailFromDB(email);
        res.status(200).json({
          success: true,
          message: "Orders fetched succesfully for user email",
          data: result,
        });
    }catch(err: any){
        res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    });
  
    }

}

export const ProductController = {
  createProduct,
  updateProduct,
  getSingleProduct,
  /* getAllProducts,
 searchProduct, */
  deleteProduct, 
  createProductOrder,
  getAllProductOrders,
  getProductOrderByEmail,
  getAllOrSearchProducts
};

