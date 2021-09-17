
import { signIn } from '../controllers/identity';


export default (router) => {

  router.post('/sign-in', signIn());
};
