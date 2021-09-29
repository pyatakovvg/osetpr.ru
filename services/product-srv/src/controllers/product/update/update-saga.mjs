
import { NetworkError } from "@packages/errors";

import logger from '@sys.packages/logger';
import { sendEvent } from '@sys.packages/rabbit';

import Sagas from 'node-sagas';

import updateGallery from './gallery/update';
import restoreGallery from './gallery/restore';

import updateOption from './option/update';
import restoreOption from './option/restore';

import getProduct from './product/get';
import updateProduct from './product/update';
import restoreProduct from './product/restore';


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
console.log(body)
    return sagaBuilder
      .step('Update gallery')
      .invoke(async (params) => {
        logger.info('Update gallery');
        const gallery = await updateGallery(uuid, body['gallery']);
        params.setGallery(gallery);
      })
      .withCompensation(async (params) => {
        logger.info('Restore update gallery');
        const gallery = params.getGallery();
        await restoreGallery(uuid, gallery);
      })

      .step('Update modes')
      .invoke(async (params) => {
        logger.info('Update options');
        const options = await updateOption(uuid, body['modes']);
        params.setOptions(options);
      })
      .withCompensation(async (params) => {
        logger.info('Restore update options');
        const options = params.getOptions();
        await restoreOption(uuid, options);
      })

      .step('Get product')
      .invoke(async (params) => {
        logger.info('Get product');
        const product = await getProduct(uuid);
        params.setProduct(product);
      })

      .step('Update product')
      .invoke(async (params) => {
        logger.info('Update product');
        const product = await updateProduct(uuid, body);
        params.setProduct(product);
      })
      .withCompensation(async (params) => {
        logger.info('Restore update product');
        const product = params.getProduct();
        await restoreProduct(uuid, product);
      })

      .step('Get updated product')
      .invoke(async (params) => {
        logger.info('Get product');
        const product = await getProduct(uuid);
        params.setProduct(product)
      })

      .step('Send event')
      .invoke(async (params) => {
        const product = params.getProduct();
        await sendEvent(process.env['EXCHANGE_PRODUCT_UPDATE'], JSON.stringify(product));
      })

      .build();
  }
}
