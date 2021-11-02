
import axios from "@sys.packages/request";


export default () => async (ctx) => {

  const { data } = await axios({
    method: 'get',
    url: process.env['ORDER_API_SRV'] + '/payments',
  });

  ctx.body = {
    success: true,
    data,
  };
}
