
import { sign } from '@sys.packages/jwt';
import {genHash256, token} from '@sys.packages/utils';
import { models, Sequelize } from '@sys.packages/db';

const { UniqueConstraintError } = Sequelize;


export default () => async (ctx) => {
  const { User } = models;

  try {
    const formData = ctx.request['body'];

    const hashPassword = genHash256(formData['password'], process.env['PASSWORD_SALT']);

    const user = await User.create({
      login: formData['login'],
      password: hashPassword,
    }, { transaction });

    const today = new Date();
    const expirationTime = parseInt((today.getTime() / 1000) + Number(process.env['JWT_EXP']), 10);
    const refreshToken = token(process.env['JWT_SECRET']).digest('hex');

    // организуем авторизационный объект
    const payload = {
      id: user['id'],
      exp: expirationTime,
    };

    const identityToken = sign(payload, process.env['JWT_SECRET']);

    ctx.body = {
      success: true,
      data: {
        token: identityToken,
        refreshToken: refreshToken,
      },
    };
  }
  catch (error) {

    if (error instanceof UniqueConstraintError) {
      ctx.status = 400;
      return ctx.body = {
        success: false,
        error: {
          code: 400,
          message: 'Пользователь с таким E-Mail уже зарегистрирован',
        }
      };
    }

    ctx.status = 500;
    ctx.body = {
      success: false,
      error: {
        code: 500,
        message: error['message'],
      }
    };
  }
};
