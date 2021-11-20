
import { models } from "@sys.packages/db";


export default async function(gallery) {
  const { ProductGallery } = models;

  await ProductGallery.destroy({
    where: {
      productUuid: gallery.map((item) => item['productUuid']),
    },
  });

  if (gallery && !! gallery.length) {

    await ProductGallery.bulkCreate(gallery);
  }
};