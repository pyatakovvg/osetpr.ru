
import {getImage} from "../controllers/gallery";
import { signIn } from '../controllers/identity';
import { getByOrderId, updateOrder, createOrder } from "../controllers/order";
import { getAllProducts, getProductById } from "../controllers/product";


export default (router) => {

  router.get('/gallery/:uuid', getImage());

  router.get('/orders', getByOrderId());
  router.put('/orders', updateOrder());
  router.post('/orders', createOrder());

  router.get('/products', getAllProducts());
  router.get('/products/:uuid', getProductById());

  router.post('/sign-in', signIn());
};
