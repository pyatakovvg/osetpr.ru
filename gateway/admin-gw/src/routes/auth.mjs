
import { getByOrderId, getAllOrders, updateByOrderId, createOrder } from '../controllers/order';

import { getProfile } from '../controllers/profile';
import { signOut } from '../controllers/identity';


export default (router) => {

  router.get('/orders', getAllOrders());
  router.get('/orders/:uuid', getByOrderId());
  router.post('/orders', createOrder());
  router.put('/orders/:uuid', updateByOrderId());

  router.get('/profile', getProfile());

  router.post('/sign-out', signOut());
};
