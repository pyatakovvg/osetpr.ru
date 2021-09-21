
import CreateSaga from "./create-saga.mjs";
import CreateSagaParams from "./create-saga-params.mjs";


export default () => async (ctx) => {
  const saga = new CreateSaga(ctx);
  const sagaParams = new CreateSagaParams();

  const params = await saga.execute(sagaParams);

  ctx.body = {
    success: true,
    data: params.getAuthData(),
  };
};
