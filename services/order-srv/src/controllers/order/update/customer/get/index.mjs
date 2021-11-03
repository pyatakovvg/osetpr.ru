
import request from "@sys.packages/request";


export default async function(userUuid) {

  const { data } = await request({
    url: process.env['CUSTOMER_API_SRV'] + '/customers',
    method: 'get',
    params: {
      userUuid,
    },
  });

  if (data[0]) {
    return data[0];
  }
  return null;
};