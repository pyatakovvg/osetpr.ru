
import { BadRequestError } from "@packages/errors";

import Ajv from "ajv";

import UpdateSaga from './update-saga.mjs';
import UpdateSagaParams from './update-saga-params.mjs';

import productScheme from "../../../_schemes/product.json";


export default () => async (ctx) => {
  const body = ctx['request']['body'];

  const ajv = new Ajv();
  const validation = ajv.compile(productScheme);

  if ( ! validation(body)) {
    console.log(validation.errors)
    throw new BadRequestError({ code: '9.9.9', message: 'Неверный формат запроса' });
  }

  const sagaParams = new UpdateSagaParams();
  const saga = new UpdateSaga(ctx);

  const params = await saga.execute(sagaParams);

  ctx.body = {
    success: true,
    data: params.getProduct(),
  };
};
