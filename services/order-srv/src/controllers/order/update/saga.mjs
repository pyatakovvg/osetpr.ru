
import numeral from "@packages/numeral";
import { NetworkError } from "@packages/errors";

import logger from '@sys.packages/logger';
import { sendEvent, sendCommand } from '@sys.packages/rabbit';

import Sagas from 'node-sagas';

import getCustomer from './customer/get';
import createCustomer from './customer/create';
import updateCustomer from './customer/update';

import createGallery from './gallery/create';
import removeGallery from './gallery/remove';

import createAddress from './address/create';

import getOrder from './order/get';
import updateOrder from './order/update';

import getProducts from './product/get';
import updateProducts from './product/update';


export default class Saga {
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

      .step('Remove gallery')
      .invoke(async () => {
        if ( ! body['products']) {
          return void 0;
        }
        logger.info('Remove gallery');
        await removeGallery(body['products']);
      })

      .step('Update address')
      .invoke(async () => {
        if ( ! body['address']) {
          return void 0;
        }
        logger.info('Update address');
        await createAddress(uuid, body['address']);
      })
      .withCompensation(async (params) => {
        logger.info('Restore update address');
        const order = params.getOrder();
        await createAddress(uuid, order['address']);
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
        const order = params.getOrder();
        await updateProducts(uuid, order['products']);
      })

      .step('Get order')
      .invoke(async (params) => {
        logger.info('Get order');
        const order = await getOrder(uuid);
        params.setOrder(order);
      })

      .step('Update gallery')
      .invoke(async (params) => {
        logger.info('Update gallery');
        const order = params.getOrder();
        if ( ! body['products']) {
          return void 0;
        }
        const products = body['products'].map((product) => {
          const orderProduct = order['products'].find((item) => item['modeUuid'] === product['modeUuid']);
          return {
            ...product,
            uuid: orderProduct['uuid'],
          }
        });
        await createGallery(uuid, products);
      })

      .step('Update customer')
      .invoke(async (params) => {
        logger.info('Update customer');
        const order = params.getOrder();
        const customer = await getCustomer(order['userUuid']);
        if (customer) {
          const result = await updateCustomer(customer['uuid'], {
            ...body['customer'],
          });
          params.setCustomer(result);
        }
        else {
          const result = await createCustomer(order['userUuid'], body['customer']);
          params.setCustomer(result);
        }
      })

      .step('Update order')
      .invoke(async () => {
        logger.info('Update order');
        const products = await getProducts(uuid);
        const total = !! products.length
          ? products.reduce((prev, next) => prev + next['total'], 0)
          : 0;

        await updateOrder(uuid, {
          total,
          currencyCode: 'RUB',
        });
      })

      .step('Get updated order')
      .invoke(async (params) => {
        logger.info('Get updated order');
        const order = await getOrder(uuid);
        params.setOrder(order);
      })

      .step('Send event')
      .invoke(async (params) => {
        const order = params.getOrder();
        const customer = params.getCustomer();
        if (customer) {
          order['customer'] = {};
          order['customer']['name'] = customer['name'];
          order['customer']['phone'] = customer['phone'];
        }
        else {
          order['customer'] = null;
        }
        await sendEvent(process.env['EXCHANGE_ORDER_UPDATE'], JSON.stringify(order));
      })

      .step('Send to mail')
      .invoke(async (params) => {
        const order = params.getOrder();

        if (order['status']['code'] === 'basket') {
          return void 0;
        }

        const customer = params.getCustomer();
        if (customer) {
          order['customer'] = {};
          order['customer']['name'] = customer['name'];
          order['customer']['phone'] = customer['phone'];
        }
        else {
          order['customer'] = null;
        }
        await sendCommand(process.env['QUEUE_MAIL_ORDER_UPDATE'], JSON.stringify(order));
      })

      .step('Send to push')
      .invoke(async (params) => {
        const order = params.getOrder();

        if (order['status']['code'] === 'basket') {
          return void 0;
        }

        const externalId = order['externalId'].toUpperCase().replace(/(\w{3})(\w{3})(\w{3})/, '$1-$2-$3');

        let message = '';
        if (order['status']['code'] === 'new') {
          message = 'Оформлен заказ #' + externalId + ' на сумму ' + numeral(order['total']).format() + order['currency']['displayName'];
        }
        else if (order['status']['code'] === 'confirmed') {
          message = 'Заказ #' + externalId + ' на сумма ' + numeral(order['total']).format() + order['currency']['displayName'] + ' подтвержден';
        }
        else if (order['status']['code'] === 'canceled') {
          message = 'Заказ #' + externalId + ' отменен';
        }
        else if (order['status']['code'] === 'process') {
          message = 'Заказ #' + externalId + ' готовится';
        }
        else if (order['status']['code'] === 'done') {
          message = 'Заказ #' + externalId + ' готов';
        }
        else if (order['status']['code'] === 'finished') {
          message = 'Заказ #' + externalId + ' выполнен. Приятного аппетита!';
        }

        await sendCommand(process.env['QUEUE_PUSH_SEND'], JSON.stringify({
          title: 'Пекарня "Осетинские прироги"',
          message: message,
          userUuid: order['userUuid'],
        }));
      })

      .build();
  }
}
