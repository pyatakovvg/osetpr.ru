
import request from "@sys.packages/request";


export default async function(userUuid, customer) {
  if ( ! customer) {
    return null;
  }

  const result = await request({
    url: process.env['CUSTOMER_API_SRV'] + '/customers',
    method: 'post',
    data: {
      userUuid,
      ...customer,
    },
  });

  return result['data'];
};