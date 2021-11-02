
import { getAllStatuses } from "../controllers/status";
import { getAllPayments } from "../controllers/payment";
import { getAllOrders, createOrder, deleteOrders, updateOrder } from "../controllers/order";


export default (router) => {

  router.get('/api/v1/statuses', getAllStatuses());

  router.get('/api/v1/payments', getAllPayments());

  router.get('/api/v1/orders', getAllOrders());
  router.post('/api/v1/orders', createOrder());
  router.put('/api/v1/orders/:uuid', updateOrder());
  router.delete('/api/v1/orders', deleteOrders());
};
