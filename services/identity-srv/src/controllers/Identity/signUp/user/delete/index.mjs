
import { models } from "@sys.packages/db";


export default async (userUuid) => {
  const { User } = models;

  await User.destroy({
    where: {
      uuid: userUuid,
    },
  });
};
