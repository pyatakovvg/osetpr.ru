
import request from "@sys.packages/request";


export default async function(userUuid, customer) {

  const result = await request({
    url: process.env['CUSTOMER_API_SRV'] + '/customers/' + userUuid,
    method: 'put',
    data: {
      ...customer,
    },
  });

  return result['data'];
};