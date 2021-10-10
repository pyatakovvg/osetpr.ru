
import { NetworkError } from "@packages/errors";

import logger from '@sys.packages/logger';
// import { sendEvent, sendCommand } from '@sys.packages/rabbit';

import Sagas from 'node-sagas';

import getPlan from './plan/get';
import updatePlan from './plan/update';

import updateProducts from './product/update';


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

    const { uuid } = ctx['params'];
    const body = ctx['request']['body'];

    return sagaBuilder
      .step('Get plan')
      .invoke(async (params) => {
        logger.info('Get plan');
        const plan = await getPlan(uuid);
        params.setPlan(plan);
      })

      .step('Update plan')
      .invoke(async () => {
        logger.info('Update plan');
        await updatePlan(uuid, body);
      })
      .withCompensation(async (params) => {
        logger.info('Restore update plan');
        const plan = params.getPlan();
        await updatePlan(uuid, plan);
      })

      .step('Update products')
      .invoke(async () => {
        if ( ! body['products']) {
          return void 0;
        }
        logger.info('Update products');
        await updateProducts(uuid, body['products']);
      })
      .withCompensation(async (params) => {
        logger.info('Restore update products');
        const plan = params.getPlan();
        await updateProducts(uuid, plan['products']);
      })

      .step('Get updated order')
      .invoke(async (params) => {
        logger.info('Get updated order');
        const plan = await getPlan(uuid);
        params.setPlan(plan);
      })

      .build();
  }
}
