
import Saga from './saga.mjs';
import SagaParams from './saga-params.mjs';


export default () => async (ctx) => {
  const saga = new Saga(ctx);
  const sagaParams = new SagaParams();

  const params = await saga.execute(sagaParams);
  const result = params.getProducts();

  ctx.body = {
    success: true,
    data: result['data'],
    meta: result['meta'],
  };
};
