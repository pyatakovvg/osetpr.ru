
import { NetworkError } from "@packages/errors";

import logger from '@sys.packages/logger';
// import { sendEvent, sendCommand } from '@sys.packages/rabbit';

import Sagas from 'node-sagas';

import getPlan from './plan/get';
import createPlan from './plan/create';
import restorePlan from './plan/restore';

import createProducts from './product/create';
import restoreProducts from './product/restore';


export default class Saga {
  ctx = null;

  constructor(ctx) {
    this.ctx = ctx;
  }

  async execute(params) {
    const saga = await this.sagaDefinition(this.ctx);
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

  async sagaDefinition(ctx) {
    const sagaBuilder = new Sagas.SagaBuilder();

    const body = ctx['request']['body'];

    return sagaBuilder
      .step('Create plan')
      .invoke(async (params) => {
        logger.info('Create plan');
        const planUuid = await createPlan(body);
        params.setPlanUuid(planUuid);
      })
      .withCompensation(async (params) => {
        logger.info('Restore created plan');
        const planUuid = params.getPlanUuid();
        await restorePlan(planUuid);
      })

      .step('Create products')
      .invoke(async (params) => {
        logger.info('Create products');
        const planUuid = params.getPlanUuid();
        await createProducts(planUuid, body['products']);
      })
      .withCompensation(async (params) => {
        logger.info('Restore created products');
        const planUuid = params.getPlanUuid();
        await restoreProducts(planUuid);
      })

      .step('Get created plan')
      .invoke(async (params) => {
        logger.info('Get created plan');
        const planUuid = params.getPlanUuid();
        const plan = await getPlan(planUuid);
        params.setPlan(plan);
      })

      .build();
  }
}
