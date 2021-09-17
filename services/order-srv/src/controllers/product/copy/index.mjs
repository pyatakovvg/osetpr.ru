
import CopySagaParams from "./copy-saga-params.mjs";
import CopySaga from "./copy-saga.mjs";


export default () => async (ctx) => {
  const sagaParams = new CopySagaParams();
  const saga = new CopySaga(ctx);

  const params = await saga.execute(sagaParams);

  ctx.body = {
    success: true,
    data: params.getProduct(),
  };
};
