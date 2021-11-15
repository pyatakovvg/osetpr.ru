
import request from '@sys.packages/request';


export default async (data) => {
  try {

    await request({
      url: process.env['HOST'],
      method: 'post',
      params: {
        token: process.env['TOKEN'],
        device: process.env['DEVICE'],
        phone: data['phone'],
        msg: data['message'],
      },
    });
  }
  catch(error) {
    console.log(error)
  }
}
