
import { getAllPlans, createPlan, updatePlan, deletePlans } from "../controllers/plan";


export default (router) => {

  router.get('/api/v1/plans', getAllPlans());
  router.post('/api/v1/plans', createPlan());
  router.put('/api/v1/plans/:uuid', updatePlan());
  router.delete('/api/v1/plans', deletePlans());
};
