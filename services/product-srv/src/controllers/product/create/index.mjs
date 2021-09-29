
import { BadRequestError } from '@packages/errors';

import Ajv from 'ajv';

import CreateSaga from "./create-saga.mjs";
import CreateSagaParams from "./create-saga-params.mjs";

import productScheme from '../../../_schemes/product.json';


export default () => async (ctx) => {
  const body = ctx['request']['body'];

  const ajv = new Ajv();
  const validation = ajv.compile(productScheme);

  if ( ! validation(body)) {
    throw new BadRequestError('Неверный формат запроса');
  }

  const sagaParams = new CreateSagaParams();
  const saga = new CreateSaga(ctx);

  const params = await saga.execute(sagaParams);

  ctx.body = {
    success: true,
    data: params.getProduct(),
  };
};
