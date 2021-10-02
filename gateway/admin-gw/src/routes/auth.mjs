
import { getImages, getImage, createImage, updateImage, deleteImages } from '../controllers/gallery';
import { getAllProducts, createProduct, deleteProducts, updateProduct, getProductById } from '../controllers/product';
import { getByOrderId, getAllOrders, updateByOrderId, createOrder, updateOrderStatus } from '../controllers/order';
import { getAllCustomers } from '../controllers/customers';
import { getAllCategories } from '../controllers/category';
import { getAllCurrencies } from '../controllers/currency';

import { getProfile } from '../controllers/profile';


export default (router) => {

  router.get('/gallery', getImages());
  router.get('/gallery/:id', getImage());
  router.post('/gallery', createImage());
  router.put('/gallery/:uuid', updateImage());
  router.delete('/gallery', deleteImages());

  router.put('/orders/:uuid/status', updateOrderStatus());

  router.get('/orders', getAllOrders());
  router.get('/orders/:uuid', getByOrderId());
  router.post('/orders', createOrder());
  router.put('/orders/:uuid', updateByOrderId());

  router.get('/products', getAllProducts());
  router.get('/products/:uuid', getProductById());
  router.delete('/products', deleteProducts());
  router.post('/products', createProduct());
  router.put('/products/:uuid', updateProduct());

  router.get('/customers', getAllCustomers());

  router.get('/categories', getAllCategories());

  router.get('/currencies', getAllCurrencies());

  router.get('/profile', getProfile());
};
