
import request from '@sys.packages/request';

import productBuilder from "../_bilders/productBuilder.mjs";
import axios from "@sys.packages/request";
import {NotfoundError} from "@packages/errors";


export default () => async (ctx) => {
  const { page = 0, ...params } = ctx['request']['query'];

  const { data: types } = await request({
    url: process.env['PRODUCT_API_SRV'] + '/products/types',
    method: 'get',
    params,
  });
  const { data: categories } = await request({
    url: process.env['PRODUCT_API_SRV'] + '/products/categories',
    method: 'get',
    params,
  });
  const { data: brands } = await request({
    url: process.env['PRODUCT_API_SRV'] + '/products/brands',
    method: 'get',
    params,
  });
  // const { data: attributes } = await request({
  //   url: process.env['PRODUCT_API_SRV'] + '/products/attributes',
  //   method: 'get',
  //   params,
  // });

  const { uuid } = ctx['user'] || {};

  const { data: seller } = await axios({
    url: process.env['SELLER_API_SRV'] + '/sellers',
    method: 'get',
    params: {
      userUuid: uuid,
    }
  });

  if ( ! seller.length) {
    throw new NotfoundError('Seller не найден');
  }

  const { data: shops } = await request({
    url: process.env['SHOP_API_SRV'] + '/shops',
    method: 'get',
    params: {
      sellerUuid: seller[0]['uuid'],
    },
  });

  const { data, meta } = await request({
    method: 'get',
    url: process.env['PRODUCT_API_SRV'] + '/products',
    params: {
      take: Number(process.env['TAKE']),
      skip: (page > 0 ? page - 1 : 0) * Number(process.env['TAKE']),
      shopUuid: shops.map((shop) => shop['uuid']),
      ...params,
    },
  });

  ctx.body = {
    success: true,
    data: data.map((product) => productBuilder(product)),
    filter: {
      shops: shops,
      types: types,
      brands: brands,
      categories: categories,
      attributes: [],
    },
    meta: {
      total: meta['total'],
    },
  };
}
