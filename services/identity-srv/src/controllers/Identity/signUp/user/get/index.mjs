
import { models } from '@sys.packages/db';


export default async function (userUUid) {
  const { User, Role } = models;

  const result = await User.findOne({
    attributes: ['uuid', 'login', 'createdAt', 'updatedAt'],
    where: {
      uuid: userUUid,
    },
    include: [
      {
        model: Role,
        required: true,
        attributes: ['code', 'displayName'],
        as: 'role',
      }
    ]
  });

  console.log(result)

  return result.toJSON();
};
