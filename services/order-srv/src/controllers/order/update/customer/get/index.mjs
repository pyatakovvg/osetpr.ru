
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
    return {
      uuid: data[0]['uuid'],
      name: data[0][data[0]['type']]['name'],
      phone: data[0][data[0]['type']]['phone'],
    };
  }
  return null;
};