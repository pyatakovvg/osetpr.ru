
import { getAllComments, createComment } from "../controllers/comment";
import { getOrder, getAllOrder } from "../controllers/order";
import { registerWorker, unregisterWorker } from "../controllers/worker";
import { signIn } from '../controllers/identity';
import { getImage } from "../controllers/gallery";
import { getAllPayments } from '../controllers/payment';
import { getBasket, updateBasket } from "../controllers/basket";
import { getAllProducts, getProductById } from "../controllers/product";


export default (router) => {

  router.get('/comments', getAllComments());
  router.post('/comments', createComment());

  router.post('/push/subscribe', registerWorker());
  router.post('/push/unsubscribe', unregisterWorker());

  router.get('/gallery/:uuid', getImage());

  router.get('/payments', getAllPayments());

  router.get('/orders', getAllOrder());
  router.get('/orders/:externalId', getOrder());

  router.get('/basket', getBasket());
  router.post('/basket', updateBasket());

  router.get('/products', getAllProducts());
  router.get('/products/:uuid', getProductById());

  router.post('/sign-in', signIn());
};
