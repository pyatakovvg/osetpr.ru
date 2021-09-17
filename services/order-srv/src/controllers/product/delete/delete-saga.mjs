
import { NetworkError } from "@packages/errors";
import { sendEvent } from '@sys.packages/rabbit';

import Sagas from 'node-sagas';

import destroyGallery from './gallery/destroy';
import restoreGallery from './gallery/restore';

import destroyAttribute from './attribute/destroy';
import restoreAttributes from './attribute/restore';

import destroyOptions from './option/destroy';
import restoreOptions from './option/restore';

import destroyBrand from './brand/destroy';
import restoreBrand from './brand/restore';

import destroyType from './types/destroy';
import restoreType from './types/restore';

import destroyCategory from './category/destroy';
import restoreCategory from './category/restore';

import destroyProduct from './product/destroy';
import restoreProduct from './product/restore';

import destroyPromotion from './promotion/destroy';
// import restorePromotion from './promotion/restore';

import destroyComments from './comments/destroy';
import restoreComments from './comments/restore';

import destroyShops from './shops/destroy';
import restoreShops from './shops/restore';


export default class DeleteSaga {
  ctx = null;

  constructor(ctx) {
    this.ctx = ctx;
  }

  async execute(params) {
    const saga = await this.getDeleteProductSagaDefinition(this.ctx);
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

  async getDeleteProductSagaDefinition(ctx) {
    const sagaBuilder = new Sagas.SagaBuilder();

    const { uuid } = ctx['request']['body'];

    return sagaBuilder
      .step('Destroy gallery')
      .invoke(async (params) => {
        const gallery = await destroyGallery(uuid);
        params.setGallery(gallery);
      })
      .withCompensation(async (params) => {
        const gallery = params.getGallery();
        await restoreGallery(gallery);
      })

      .step('Destroy shops')
      .invoke(async (params) => {
        const shops = await destroyShops(uuid);
        params.setShops(shops);
      })
      .withCompensation(async (params) => {
        const shops = params.getShops();
        await restoreShops(shops);
      })

      .step('Destroy comments')
      .invoke(async (params) => {
        const comments = await destroyComments(uuid);
        params.setComments(comments);
      })
      .withCompensation(async (params) => {
        const comments = params.getComments();
        await restoreComments(comments);
      })

      .step('Destroy attributes')
      .invoke(async (params) => {
        const characteristics = await destroyAttribute(uuid);
        params.setCharacteristics(characteristics);
      })
      .withCompensation(async (params) => {
        const characteristics = params.getCharacteristics();
        await restoreAttributes(characteristics);
      })

      .step('Destroy brand')
      .invoke(async (params) => {
        const brand = await destroyBrand(uuid);
        params.setBrand(brand);
      })
      .withCompensation(async (params) => {
        const brand = params.getBrand();
        await restoreBrand(brand);
      })

      .step('Destroy category')
      .invoke(async (params) => {
        const category = await destroyCategory(uuid);
        params.setCategory(category);
      })
      .withCompensation(async (params) => {
        const category = params.getCategory();
        await restoreCategory(category);
      })

      .step('Destroy option')
      .invoke(async (params) => {
        const options = await destroyOptions(uuid);
        params.setOptions(options);
      })
      .withCompensation(async (params) => {
        const options = params.getOptions();
        await restoreOptions(options);
      })

      .step('Destroy types')
      .invoke(async (params) => {
        const type = await destroyType(uuid);
        params.setType(type);
      })
      .withCompensation(async (params) => {
        const type = params.getType();
        await restoreType(type);
      })

      .step('Destroy product')
      .invoke(async (params) => {
        const product = await destroyProduct(uuid);
        params.setProduct(product);
      })
      .withCompensation(async (params) => {
        const product = params.getProduct();
        await restoreProduct(product);
      })

      .step('Send event')
      .invoke(async () => {
        await sendEvent(process.env['EXCHANGE_PRODUCT_DELETE'], JSON.stringify(uuid));
      })

      .build();
  }
}
