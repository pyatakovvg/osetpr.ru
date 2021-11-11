
import axios from "@sys.packages/request";


export default () => async (ctx) => {

  const { data } = await axios({
    method: 'get',
    url: process.env['COMMENT_API_SRV'] + '/comments',
  });

  ctx.body = {
    success: true,
    data,
  };
}
