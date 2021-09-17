
import { connect, check, getAll, update, refresh } from '../controllers/Identity';


export default (router) => {

  router
    .get('/v1/api/users', getAll())
    .put('/v1/api/users/:id', update())

    .post('/v1/api/check', check())
    .post('/v1/api/refresh', refresh())
    .post('/v1/api/connect', connect());
}
