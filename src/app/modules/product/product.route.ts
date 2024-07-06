import express from 'express';
import { ProductController } from "./product.controller";

const router = express.Router();

//getAllProducts
router.get("/products", ProductController.getAllOrSearchProducts);  

//getProductOrderByEmail
router.get("/orders", ProductController.getAllOrSearchOrders);
//searchProduct
/* router.get("/products", ProductController.searchProduct); */

//getSingleProduct
router.get("/products/:productId", ProductController.getSingleProduct);
router.post("/products", ProductController.createProduct);
//updateProduct
router.put("/products/:productId", ProductController.updateProduct);

//deleteProduct
router.delete("/products/:productId", ProductController.deleteProduct);
//orderProduct
router.post("/orders", ProductController.createProductOrder);
//getAllProductOrders
router.get("/orders", ProductController.getAllOrSearchOrders);


export const productRouter = router;