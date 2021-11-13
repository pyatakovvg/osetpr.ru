
import { UnavailableError } from "@packages/errors";

import { models } from "@sys.packages/db";


export default async (data) => {
  const { ProductGallery } = models;

  try {
    await ProductGallery.destroy({
      where: {
        imageUuid: data,
      }
    });
  }
  catch(error) {

    throw new UnavailableError({ code: '6.6.7', message: error['message'] });
  }
}
