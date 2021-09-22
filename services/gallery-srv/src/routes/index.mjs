
import { getImages, getImage, deleteImages, createImage, updateImage } from '../controllers/Gallery';


export default (router) => {

  router.get('/v1/api/images', getImages());
  router.get('/v1/api/images/:id', getImage());
  router.post('/v1/api/images', createImage());
  router.put('/v1/api/images/:uuid', updateImage());
  router.delete('/v1/api/images', deleteImages());
};
