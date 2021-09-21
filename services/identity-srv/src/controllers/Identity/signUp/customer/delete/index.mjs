
import request from '@sys.packages/request';


export default async (uuid) => {

  await request({
    url: process.env['CUSTOMER_API_SRV'] + '/customers',
    method: 'delete',
    data: {
      uuid,
    }
  });
};
