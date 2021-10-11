
import { NetworkError } from "@packages/errors";

import logger from '@sys.packages/logger';

import Sagas from 'node-sagas';

import getProduct from './product/get';


export default class Saga {
  ctx = null;

  constructor(ctx) {
    this.ctx = ctx;
  }

  async execute(params) {
    const saga = await this.getSagaDefinition(this.ctx);
    try {
      return await saga.execute(params);
    }
    catch (e) {
      console.log(e)
      if (e instanceof Sagas.SagaExecutionFailed) {
        throw new NetworkError({ code: '2.0.0', message: e['message'] });
      }
      if (e instanceof Sagas.SagaCompensationFailed) {
        throw new NetworkError({ code: '2.0.1', message: e['message'] });
      }
    }
  }

  async getSagaDefinition(ctx) {
    const sagaBuilder = new Sagas.SagaBuilder();

    const query = ctx['query'];

    return sagaBuilder
      .step('Get products')
      .invoke(async (params) => {
        logger.info('Get products');
        const products = await getProduct(query);
        params.setProducts(products);
      })

      .build();
  }
}
