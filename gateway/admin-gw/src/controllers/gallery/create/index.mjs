
import request from "@sys.packages/request";
import { getBuffer } from "@sys.packages/utils";


const getBufferFromRequest = (req) => {
  const buffer = [];

  return new Promise((resolve, reject) => {
    req.on('data', (data) => {
      buffer.push(data);
    });

    req.on('error', reject);

    req.on('end', () => {
      resolve(Buffer.concat(buffer));
    });
  });
};

export default () => async (ctx) => {
  const buffer = await getBuffer(ctx['req']);

  const result = await request({
    method: 'post',
    url: process.env['GALLERY_API_SRV'] + '/images',
    headers: {
      'content-type': ctx['req']['headers']['content-type']
    },
    responseType: 'stream',
    data: buffer,
  });

  const resultBuffer = await getBufferFromRequest(result);
  const resultObject = JSON.parse(resultBuffer.toString());

  ctx.body = {
    success: true,
    data: resultObject['data'],
  };
}
