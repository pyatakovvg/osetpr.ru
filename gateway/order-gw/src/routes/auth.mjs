
import { getByOrderId, getAllOrders, updateByOrderId, createOrder } from '../controllers/order';
import { getAllProducts } from '../controllers/product';

import { getProfile } from '../controllers/profile';
import { signOut } from '../controllers/identity';
import { getImage } from '../controllers/gallery';


export default (router) => {

  router.get('/gallery/:uuid', getImage());

  router.get('/products', getAllProducts());

  router.get('/orders', getAllOrders());
  router.get('/orders/:uuid', getByOrderId());
  router.post('/orders', createOrder());
  router.put('/orders/:uuid', updateByOrderId());

  router.get('/profile', getProfile());

  router.post('/sign-out', signOut());
};
