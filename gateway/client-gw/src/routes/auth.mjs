
import { signOut } from '../controllers/identity';
import { getProfile } from '../controllers/profile';


export default (router) => {

  router.get('/profile', getProfile());

  router.post('/sign-out', signOut());
};
