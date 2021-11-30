
import { getImages, getImage, createImage, updateImage, deleteImages } from '../controllers/gallery';
import { getAllProducts, createProduct, deleteProducts, updateProduct, getProductById } from '../controllers/product';
import { getByOrderId, getAllOrders, updateByOrderId, createOrder, updateOrderStatus } from '../controllers/order';
import { getAllUsers } from '../controllers/users';
import { getAllCustomers, getCustomerByUuid, updateCustomer } from '../controllers/customers';
import { getAllGroups, updateGroups } from '../controllers/group';
import { getAllCategories, updateCategories } from '../controllers/category';
import { getAllCurrencies } from '../controllers/currency';
import { getAllPlans, createPlan, updatePlan, getByIdPlan } from '../controllers/plan';

import { getProfile } from '../controllers/profile';
import { createComment, getAllComments, deleteComment } from "../controllers/comment";
import { registerWorker, unregisterWorker } from "../controllers/push";


export default (router) => {

  router.get('/comments', getAllComments());
  router.post('/comments', createComment());
  router.delete('/comments', deleteComment());

  router.post('/push/subscribe', registerWorker());
  router.post('/push/unsubscribe', unregisterWorker());

  router.get('/gallery', getImages());
  router.get('/gallery/:id', getImage());
  router.post('/gallery', createImage());
  router.put('/gallery/:uuid', updateImage());
  router.delete('/gallery', deleteImages());

  router.put('/orders/:uuid/status', updateOrderStatus());

  router.get('/plans', getAllPlans());
  router.post('/plans', createPlan());
  router.put('/plans/:uuid', updatePlan());
  router.get('/plans/:uuid', getByIdPlan());

  router.get('/orders', getAllOrders());
  router.get('/orders/:uuid', getByOrderId());
  router.post('/orders', createOrder());
  router.put('/orders/:uuid', updateByOrderId());

  router.get('/products', getAllProducts());
  router.get('/products/:uuid', getProductById());
  router.delete('/products', deleteProducts());
  router.post('/products', createProduct());
  router.put('/products/:uuid', updateProduct());

  router.get('/users', getAllUsers());

  router.get('/customers', getAllCustomers());
  router.get('/customers/:uuid', getCustomerByUuid());
  router.put('/customers/:uuid', updateCustomer());

  router.get('/categories', getAllCategories());
  router.post('/categories', updateCategories());

  router.get('/groups', getAllGroups());
  router.post('/groups', updateGroups());

  router.get('/currencies', getAllCurrencies());

  router.get('/profile', getProfile());
};
