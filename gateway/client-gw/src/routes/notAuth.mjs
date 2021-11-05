
import { getOrder } from "../controllers/order";
import { signIn } from '../controllers/identity';
import { getImage } from "../controllers/gallery";
import { getAllPayments } from '../controllers/payment';
import { getBasket, updateBasket } from "../controllers/basket";
import { getAllProducts, getProductById } from "../controllers/product";


export default (router) => {

  router.get('/gallery/:uuid', getImage());

  router.get('/payments', getAllPayments());

  router.get('/orders/:uuid', getOrder());

  router.get('/basket', getBasket());
  router.post('/basket', updateBasket());

  router.get('/products', getAllProducts());
  router.get('/products/:uuid', getProductById());

  router.post('/sign-in', signIn());
};
