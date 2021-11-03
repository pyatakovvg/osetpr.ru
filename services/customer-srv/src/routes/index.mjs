
import { getAllCustomers, createCustomer, updateCustomer, deleteCustomers } from '../controllers/Customer';


export default (router) => {

  router.get('/api/v1/customers', getAllCustomers());
  router.post('/api/v1/customers', createCustomer());
  router.put('/api/v1/customers/:uuid', updateCustomer());
  router.delete('/api/v1/customers', deleteCustomers());
};
