
import { NetworkError } from "@packages/errors";

import logger from '@sys.packages/logger';
import { sendEvent } from '@sys.packages/rabbit';

import Sagas from 'node-sagas';

import getOrder from './order/get';
import updateOrder from './order/update';

import updateProducts from './product/update';


export default class UpdateSaga {
  ctx = null;

  constructor(ctx) {
    this.ctx = ctx;
  }

  async execute(params) {
    const saga = await this.getUpdateProductSagaDefinition(this.ctx);
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

  async getUpdateProductSagaDefinition(ctx) {
    const sagaBuilder = new Sagas.SagaBuilder();

    const { uuid } = ctx['params'];
    const body = ctx['request']['body'];

    return sagaBuilder
      .step('Get order')
      .invoke(async (params) => {
        logger.info('Get order');
        const order = await getOrder(uuid);
        params.setOrder(order);
      })

      .step('Update order')
      .invoke(async () => {
        logger.info('Update order');
        await updateOrder(uuid, body);
      })
      .withCompensation(async (params) => {
        logger.info('Restore update order');
        const order = params.getOrder();
        await updateOrder(uuid, order);
      })

      .step('Update products')
      .invoke(async (params) => {
        logger.info('Update products');
        const options = await updateProducts(uuid, body['products']);
        params.setOrder(options);
      })
      .withCompensation(async (params) => {
        logger.info('Restore update products');
        const order = params.getOrder();
        await updateProducts(uuid, order['products']);
      })

      .step('Get updated order')
      .invoke(async (params) => {
        logger.info('Get updated order');
        const order = await getOrder(uuid);
        params.setOrder(order);
      })

      .step('Send event')
      .invoke(async (params) => {
        const product = params.getOrder();
        await sendEvent(process.env['EXCHANGE_PRODUCT_UPDATE'], JSON.stringify(product));
      })

      .build();
  }
}
