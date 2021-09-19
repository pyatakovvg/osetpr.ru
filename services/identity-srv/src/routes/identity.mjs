
import { connect, check, getAll, update, refresh } from '../controllers/Identity';


export default (router) => {

  router
    .get('/api/v1/users', getAll())
    .put('/api/v1/users/:id', update())

    .post('/api/v1/check', check())
    .post('/api/v1/refresh', refresh())
    .post('/api/v1/connect', connect());
}
