
import { getImages, getImage, createImage, updateImage, deleteImages } from '../controllers/gallery';
import { getAllProducts, createProduct, deleteProducts, updateProduct } from '../controllers/product';
import { getByOrderId, getAllOrders, updateByOrderId, createOrder } from '../controllers/order';
import { getAllCustomers } from '../controllers/customers';

import { getProfile } from '../controllers/profile';
import { signIn } from '../controllers/identity';


export default (router) => {

  router.get('/gallery', getImages());
  router.get('/gallery/:id', getImage());
  router.post('/gallery', createImage());
  router.put('/gallery/:uuid', updateImage());
  router.delete('/gallery', deleteImages());

  router.get('/orders', getAllOrders());
  router.get('/orders/:uuid', getByOrderId());
  router.post('/orders', createOrder());
  router.put('/orders/:uuid', updateByOrderId());

  router.get('/products', getAllProducts());
  router.delete('/products', deleteProducts());
  router.post('/products', createProduct());
  router.put('/products/:uuid', updateProduct());

  router.get('/customers', getAllCustomers());

  router.get('/profile', getProfile());

  router.post('/sign-in', signIn());
};
