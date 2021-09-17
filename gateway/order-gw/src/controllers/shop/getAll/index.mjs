
import { NotfoundError } from '@packages/errors';

import axios from "@sys.packages/request";
import request from "@sys.packages/request";


export default () => async (ctx) => {
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

  const { data } = await request({
    url: process.env['SHOP_API_SRV'] + '/shops',
    method: 'get',
    params: {
      sellerUuid: seller[0]['uuid'],
    },
  });

  ctx.body = {
    success: true,
    data,
  };
};
