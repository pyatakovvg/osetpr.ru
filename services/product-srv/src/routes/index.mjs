
import { getAllProducts, updateProduct, createProduct } from "../controllers/product";
import { getAllProductModes } from "../controllers/mode";
import { getAllCategories } from "../controllers/category";
import { getAllCurrencies } from "../controllers/currency";


export default (router) => {

  router.get('/api/v1/currencies', getAllCurrencies());

  router.get('/api/v1/categories', getAllCategories());

  router.get('/api/v1/products/modes', getAllProductModes());

  router.get('/api/v1/products', getAllProducts());
  router.post('/api/v1/products', createProduct());
  router.put('/api/v1/products/:uuid', updateProduct());
  // router.delete('/api/v1/products', deleteOrders());
};
