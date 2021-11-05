
import { NetworkError } from "@packages/errors";

import logger from '@sys.packages/logger';
import { sendEvent, sendCommand } from '@sys.packages/rabbit';

import Sagas from 'node-sagas';

import getCustomer from "./customer/get";
import createCustomer from "./customer/create";

import createGallery from "./gallery/create";

import createAddress from "./address/create";

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
      console.log(e)
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

      .step('Create address')
      .invoke(async (params) => {
        logger.info('Create address');
        const orderUuid = params.getOrderUuid();
        await createAddress(orderUuid, body['address']);
      })
      .withCompensation(async (params) => {
        logger.info('Restore address');
        const orderUuid = params.getOrderUuid();
        await createAddress(orderUuid, null);
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

      .step('Create customer')
      .invoke(async (params) => {
        logger.info('Create customer');
        if ( ! body['customer']) {
          return void 0;
        }
        const customer = await getCustomer(body['userUuid']);
        if ( ! customer) {
          const newCustomer = await createCustomer(body['userUuid'], body['customer']);
          params.setCustomer(newCustomer);
        }
        else {
          params.setCustomer(customer);
        }
      })
      .withCompensation(async () => {
        logger.info('Restore customer');
        // const orderUuid = params.getOrderUuid();
        // await createAddress(orderUuid, null);
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
        const customer = params.getCustomer();
        if (customer) {
          order['customer']['name'] = customer['name'];
          order['customer']['phone'] = customer['phone'];
        }
        else {
          order['customer'] = null;
        }
        await sendEvent(process.env['EXCHANGE_ORDER_CREATE'], JSON.stringify(order));
      })

      .step('Send to mail')
      .invoke(async (params) => {
        const order = params.getOrder();

        if (order['statusCode'] === 'basket') {
          return void 0;
        }

        const customer = params.getCustomer();
        if (customer) {
          order['customer']['name'] = customer['name'];
          order['customer']['phone'] = customer['phone'];
        }
        else {
          order['customer'] = null;
        }
        await sendCommand(process.env['QUEUE_MAIL_ORDER_CREATE'], JSON.stringify(order));
      })

      .build();
  }
}
