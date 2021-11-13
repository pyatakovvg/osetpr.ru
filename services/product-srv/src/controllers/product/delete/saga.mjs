
import { NetworkError } from '@packages/errors';

import logger from '@sys.packages/logger';
import { sendEvent } from '@sys.packages/rabbit';

import Sagas from 'node-sagas';

import createGallery from './gallery/create';
import removeGallery from './gallery/remove';

import createOption from './option/create';
import removeOption from './option/remove';

import getProduct from './product/get';
import createProduct from './product/create';
import removeProduct from './product/remove';


export default class CopySaga {
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

  async getSagaDefinition() {
    const sagaBuilder = new Sagas.SagaBuilder();
    const body = this.ctx['request']['body'];

    return sagaBuilder
      .step('Get product')
      .invoke(async (params) => {
        logger.info('Get product');
        const product = await getProduct(body['uuid']);
        params.setProduct(product);
      })

      .step('Destroy gallery')
      .invoke(async (params) => {
        logger.info('Destroy gallery');
        const product = params.getProduct();
        await removeGallery(product['uuid']);
      })
      .withCompensation(async (params) => {
        logger.info('Restore gallery');
        const product = params.getProduct();
        await createGallery(product['uuid'], product['gallery']);
      })

      .step('Destroy modes')
      .invoke(async (params) => {
        logger.info('Destroy modes');
        const product = params.getProduct();
        await removeOption(product['uuid']);
      })
      .withCompensation(async (params) => {
        logger.info('Restore modes');
        const product = params.getProduct();
        await createOption(product['uuid'], product['modes']);
      })

      .step('Destroy product')
      .invoke(async (params) => {
        logger.info('Destroy product');
        const product = params.getProduct();
        await removeProduct(product['uuid']);
      })
      .withCompensation(async (params) => {
        const product = params.getProduct();
        await createProduct(product);
      })

      .step('Send event')
      .invoke(async (params) => {
        const product = params.getProduct();
        await sendEvent(process.env['EXCHANGE_PRODUCT_DELETE'], JSON.stringify(product['uuid']));
      })

      .build();
  }
}
