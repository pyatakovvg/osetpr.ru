
import request from "@sys.packages/request";


export default async function(userUuid, customer) {

  const { data } = await request({
    url: process.env['CUSTOMER_API_SRV'] + '/customers/' + userUuid,
    method: 'put',
    data: {
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