
import { NetworkError } from "@packages/errors";

import logger from '@sys.packages/logger';
import { sendEvent, sendCommand } from '@sys.packages/rabbit';

import Sagas from 'node-sagas';

import createGallery from "./gallery/create";

import getOrder from './order/get';
import updateOrder from './order/update';
import createOrder from './order/create';
import restoreOrder from './order/restore';

import getProducts from './product/get';
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
      .step('Create order')
      .invoke(async (params) => {
        logger.info('Create order');
        const orderUuid = await createOrder(body);
        params.setOrderUuid(orderUuid);
      })
      .withCompensation(async (params) => {
        logger.info('Restore created order');
        const orderUuid = params.getOrderUuid();
        await restoreOrder(orderUuid);
      })

      .step('Create products')
      .invoke(async (params) => {
        logger.info('Create products');
        const orderUuid = params.getOrderUuid();
        await createProducts(orderUuid, body['products']);
      })
      .withCompensation(async (params) => {
        logger.info('Restore update products');
        const orderUuid = params.getOrderUuid();
        await restoreProducts(orderUuid);
      })

      .step('Get order')
      .invoke(async (params) => {
        logger.info('Get order');
        const orderUuid = params.getOrderUuid();
        const order = await getOrder(orderUuid);
        params.setOrder(order);
      })

      .step('Update gallery')
      .invoke(async (params) => {
        logger.info('Update gallery');
        const order = params.getOrder();

        const products = body['products'].map((product) => {
          const orderProduct = order['products'].find((item) => item['modeUuid'] === product['modeUuid']);
          return {
            ...product,
            uuid: orderProduct['uuid'],
          }
        });
        await createGallery(order['uuid'], products);
      })

      .step('Update order')
      .invoke(async (params) => {
        logger.info('Update order');
        const orderUuid = params.getOrderUuid();
        const products = await getProducts(orderUuid);

        if (products.length) {
          const total = products.reduce((prev, next) => prev + next['total'], 0);
          await updateOrder(orderUuid, {
            total,
            currencyCode: products[0]['currencyCode'],
          });
        }
      })

      .step('Get created order')
      .invoke(async (params) => {
        logger.info('Get updated order');
        const orderUuid = params.getOrderUuid();
        const order = await getOrder(orderUuid);
        params.setOrder(order);
      })

      .step('Send event')
      .invoke(async (params) => {
        const order = params.getOrder();
        await sendEvent(process.env['EXCHANGE_ORDER_CREATE'], JSON.stringify(order));
      })

      .step('Send to mail')
      .invoke(async (params) => {
        const order = params.getOrder();
        await sendCommand(process.env['QUEUE_MAIL_ORDER_CREATE'], JSON.stringify(order));
      })

      .build();
  }
}
