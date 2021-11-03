
import request from "@sys.packages/request";


export default async function(userUuid) {

  const result = await request({
    url: process.env['CUSTOMER_API_SRV'] + '/customers',
    method: 'get',
    params: {
      userUuid,
    },
  });

  return result['data'];
};