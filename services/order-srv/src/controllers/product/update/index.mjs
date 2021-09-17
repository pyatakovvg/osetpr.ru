
import { BadRequestError } from "@packages/errors";

import Ajv from "ajv";

import UpdateSaga from './update-saga.mjs';
import UpdateSagaParams from './update-saga-params.mjs';

import productScheme from "../../../_schemes/product.json";


export default () => async (ctx) => {
  const body = ctx['request']['body'];

  const saga = new UpdateSaga(ctx);
  const sagaParams = new UpdateSagaParams();

  const ajv = new Ajv();
  const validation = ajv.compile(productScheme);

  if ( ! validation(body)) {
    throw new BadRequestError('Неверный формат запроса');
  }
  const params = await saga.execute(sagaParams);

  ctx.body = {
    success: true,
    data: params.getProduct(),
  };
};
