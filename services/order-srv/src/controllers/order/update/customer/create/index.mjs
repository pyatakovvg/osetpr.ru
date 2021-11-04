
import request from "@sys.packages/request";


export default async function(userUuid, customer) {
  if ( ! customer) {
    return null;
  }

  const { data } = await request({
    url: process.env['CUSTOMER_API_SRV'] + '/customers',
    method: 'post',
    data: {
      userUuid,
      type: 'individual',
      ...customer,
    },
  });

  return {
    uuid: data['uuid'],
    name: data[data['type']]['name'],
    phone: data[data['type']]['phone'],
  };
};