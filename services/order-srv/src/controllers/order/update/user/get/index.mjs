
import request from "@sys.packages/request";


export default async function() {
  const {data} = await request({
    url: process.env['IDENTITY_API_SRV'] + '/users',
    params: {
      roleCode: 'admin',
    },
  });

  return data;
};