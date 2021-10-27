
import {getImage} from "../controllers/gallery";
import { signIn } from '../controllers/identity';
import { getByOrderId } from "../controllers/order";
import { getAllProducts, getProductById } from "../controllers/product";


export default (router) => {

  router.get('/gallery/:uuid', getImage());

  router.get('/orders/:uuid', getByOrderId());

  router.get('/products', getAllProducts());
  router.get('/products/:uuid', getProductById());

  router.post('/sign-in', signIn());
};
