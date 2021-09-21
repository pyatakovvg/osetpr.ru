
import request from '@sys.packages/request';


export default async (userUuid, data) => {

  const result = await request({
    url: process.env['CUSTOMER_API_SRV'] + '/customers',
    method: 'post',
    data: {
      userUuid,
      ...data,
    },
  });

  return result['uuid'];
};
