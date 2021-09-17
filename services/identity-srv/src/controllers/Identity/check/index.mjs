
import { NetworkError, BadRequestError, ExpiredError } from '@packages/errors';

import { verify, TokenExpiredError, JsonWebTokenError } from '@sys.packages/jwt';


export default () => async (ctx) => {
  try {
    const { accessToken } = ctx['request']['body'];

    await verify(accessToken, process.env['JWT_SECRET']);

    ctx.body = {
      success: true,
      data: null,
    };
  }
  catch (error) {

    if (error instanceof TokenExpiredError) {
      throw new ExpiredError({ code: '20.0.100', message: 'Время жизни токена истекло 1' });
    }
    else if (error instanceof JsonWebTokenError) {
      throw new BadRequestError({ code: '20.0.150', message: 'Невалидный токен' });
    }

    throw new NetworkError({ code: '20.0.200', message: error['message'] });
  }
};
