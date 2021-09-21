
import { signIn, signUp } from '../controllers/identity';


export default (router) => {

  router.post('/sign-in', signIn());
  router.post('/sign-up', signUp());
};
