
import DeleteSagaParams from "./delete-saga-params.mjs";
import DeleteSaga from "./delete-saga.mjs";


export default () => async (ctx) => {
  const sagaParams = new DeleteSagaParams();
  const saga = new DeleteSaga(ctx);

  const { uuid } = ctx['request']['body'];

  await saga.execute(sagaParams);

  ctx.body = {
    success: true,
    data: uuid,
  };
};
