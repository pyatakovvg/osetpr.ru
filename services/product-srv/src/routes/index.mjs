
import { getAllProducts } from "../controllers/product";


export default (router) => {

  router.get('/api/v1/products', getAllProducts());
  // router.post('/api/v1/products', createOrder());
  // router.put('/api/v1/products/:uuid', updateOrder());
  // router.delete('/api/v1/products', deleteOrders());
};
