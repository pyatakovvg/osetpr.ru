
import logger from "@sys.packages/logger";
import { NetworkError } from '@packages/errors';
import { sendEvent } from '@sys.packages/rabbit';
import { uniqName, UUID } from '@sys.packages/utils';

import Sagas from 'node-sagas';

import createGallery from './gallery/create';
import restoreGallery from './gallery/restore';

import createAttribute from './attribute/create';
import restoreAttributes from './attribute/restore';

import createOption from './option/create';
import restoreOption from './option/restore';

import createBrand from './brand/create';
import restoreBrand from './brand/restore';

import createTypes from './types/create';
import restoreTypes from './types/restore';

import createCategory from './category/create';
import restoreCategory from './category/restore';

import getProduct from './product/get';
import createProduct from './product/create';
import restoreProduct from './product/restore';

import createShops from './shops/create';
import restoreShops from './shops/restore';


export default class CopySaga {
  ctx = null;

  constructor(ctx) {
    this.ctx = ctx;
  }

  async execute(params) {
    const saga = await this.getCopyProductSagaDefinition(this.ctx);
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

  async getCopyProductSagaDefinition(ctx) {
    const { uuid } = ctx['params'];

    const sagaBuilder = new Sagas.SagaBuilder();

    const newUuid = UUID();
    const newExternalId = uniqName();

    return sagaBuilder
      .step('Get product')
      .invoke(async (params) => {
        logger.info('Get product');
        const product = await getProduct(uuid);
        params.setProduct(product);
      })

      .step('Copy product')
      .invoke(async (params) => {
        logger.info('Copy product');
        const product = params.getProduct();
        console.log(product)
        await createProduct({ ...product, uuid: newUuid, externalId: newExternalId });
      })
      .withCompensation(async () => {
        logger.info('Destroy product');
        await restoreProduct(newUuid);
      })

      .step('Copy gallery')
      .invoke(async (params) => {
        logger.info('Copy gallery');
        const product = params.getProduct();
        await createGallery(newUuid, product['gallery']);
      })
      .withCompensation(async () => {
        logger.info('Destroy gallery');
        await restoreGallery(newUuid);
      })

      .step('Copy attribute')
      .invoke(async (params) => {
        logger.info('Copy attributes');
        const product = params.getProduct();
        await createAttribute(newUuid, product['characteristics']);
      })
      .withCompensation(async () => {
        logger.info('Destroy attributes');
        await restoreAttributes(newUuid);
      })

      .step('Copy shops')
      .invoke(async (params) => {
        logger.info('Copy shops');
        const product = params.getProduct();
        await createShops(newUuid, product['shops']);
      })
      .withCompensation(async () => {
        logger.info('Destroy shops');
        await restoreShops(newUuid);
      })

      .step('Copy options')
      .invoke(async (params) => {
        logger.info('Copy options');
        const product = params.getProduct();
        await createOption(newUuid, product['options']);
      })
      .withCompensation(async () => {
        logger.info('Destroy options');
        await restoreOption(newUuid);
      })

      .step('Copy brand')
      .invoke(async (params) => {
        logger.info('Copy brand');
        const product = params.getProduct();
        await createBrand(newUuid, product['brand'][0]['id']);
      })
      .withCompensation(async () => {
        logger.info('Destroy brand');
        await restoreBrand(newUuid);
      })

      .step('Copy type')
      .invoke(async (params) => {
        logger.info('Update type');
        const product = params.getProduct();
        await createTypes(newUuid, product['type'][0]['id']);
      })
      .withCompensation(async () => {
        logger.info('Destroy type');
        await restoreTypes(newUuid);
      })

      .step('Copy category')
      .invoke(async (params) => {
        logger.info('Copy categories');
        const product = params.getProduct();
        await createCategory(newUuid, product['category'][0]['id']);
      })
      .withCompensation(async () => {
        logger.info('Destroy category');
        await restoreCategory(newUuid);
      })

      .step('Get product')
      .invoke(async (params) => {
        logger.info('Get product');
        const product = await getProduct(newUuid);
        params.setProduct(product)
      })

      .step('Send event')
      .invoke(async (params) => {
        const product = params.getProduct();
        await sendEvent(process.env['EXCHANGE_PRODUCT_CREATE'], JSON.stringify(product));
      })

      .build();
  }
}
