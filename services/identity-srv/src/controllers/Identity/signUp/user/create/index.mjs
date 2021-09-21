
import { models } from "@sys.packages/db";
import { genHash256, UUID } from "@sys.packages/utils";


export default async (data) => {
  const { User } = models;

  const hasUser = await User.findOne({
    raw: true,
    where: {
      login: data['login'],
    },
  });

  if ( !! hasUser) {
    throw Error('Пользователь "' + data['login'] + '" уже зарегистрирован');
  }

  const hashPassword = genHash256(data['password'], process.env['PASSWORD_SALT']);

  const user = await User.create({
    uuid: UUID(),
    login: data['login'],
    password: hashPassword,
    type: data['type'],
  });

  return user['uuid'];
};