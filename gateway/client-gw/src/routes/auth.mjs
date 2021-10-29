
import { getImage } from '../controllers/gallery';
import { getByOrderId } from '../controllers/order';
import { getProfile } from '../controllers/profile';
import { signOut } from '../controllers/identity';


export default (router) => {

  router.get('/gallery/:uuid', getImage());

  router.get('/orders/:uuid', getByOrderId());

  router.get('/profile', getProfile());

  router.post('/sign-out', signOut());
};
