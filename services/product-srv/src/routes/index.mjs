
import { getAllProducts, updateProduct, createProduct, deleteOrders } from "../controllers/product";
import { getAllProductModes } from "../controllers/mode";
import { getAllCategories, updateCategories } from "../controllers/category";
import { getAllGroups, updateGroups } from "../controllers/group";
import { getAllCurrencies } from "../controllers/currency";


export default (router) => {

  router.get('/api/v1/currencies', getAllCurrencies());

  router.get('/api/v1/categories', getAllCategories());
  router.post('/api/v1/categories', updateCategories());

  router.get('/api/v1/groups', getAllGroups());
  router.post('/api/v1/groups', updateGroups());

  router.get('/api/v1/products/modes', getAllProductModes());

  router.get('/api/v1/products', getAllProducts());
  router.post('/api/v1/products', createProduct());
  router.put('/api/v1/products/:uuid', updateProduct());
  router.delete('/api/v1/products', deleteOrders());
};
