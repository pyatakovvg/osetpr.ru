
import { models } from "@sys.packages/db";


export default async function(products) {
  const { ProductGallery } = models;

  await ProductGallery.destroy({
    where: {
      productUuid: products.map((item) => item['uuid']),
    }
  });
};