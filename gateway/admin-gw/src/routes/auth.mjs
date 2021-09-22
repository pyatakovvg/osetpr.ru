
import { getByOrderId, getAllOrders, updateByOrderId, createOrder } from '../controllers/order';
import { getAllCustomers } from '../controllers/customers';

import { getProfile } from '../controllers/profile';
import { signIn } from '../controllers/identity';


export default (router) => {

  router.get('/orders', getAllOrders());
  router.get('/orders/:uuid', getByOrderId());
  router.post('/orders', createOrder());
  router.put('/orders/:uuid', updateByOrderId());

  router.get('/customers', getAllCustomers());

  router.get('/profile', getProfile());

  router.post('/sign-in', signIn());
};
