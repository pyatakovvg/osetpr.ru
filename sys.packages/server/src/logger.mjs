
import logger from "@sys.packages/logger";


export default async (ctx, next) => {
  logger['info'](`[REQUEST] ---> [${ctx.request.method}] "${ctx.request.url}" (${ctx.request.body ? JSON.stringify(ctx.request.body) : 'null'})`);

  await next();

  let response = null;
  const body = ctx.response.body;

  if (body) {
    if (body['req']) {
      response = ctx.response.message;
    }
    else {
      if (body instanceof Object) {
        response = JSON.stringify(body);
      }
      else if (Array.isArray(body)) {
        response = JSON.stringify(body);
      }
    }
  }

  logger['info'](`[RESPONSE] <--- [${ctx.request.method}] "${ctx.request.url}" [${ctx.response.status}] (${response})`);
}