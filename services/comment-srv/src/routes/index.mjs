
import { getComments, createComment, deleteComments } from '../controllers/comment';


export default (router) => {

  router.get('/api/v1/comments', getComments());
  router.post('/api/v1/comments', createComment());
  router.delete('/api/v1/comments', deleteComments());
};
