
import modeBuilder from './mode.mjs';


export default function(data, products) {
  return {
    externalId: data['externalId'],
    uuid: data['uuid'],
    isAvailable: data['isAvailable'],
    title: data['title'],
    categoryId: data['category']['id'],
    description: data['description'],
    gallery: data['gallery'],
    modes: data['modes'].map((data) => modeBuilder(data, products)),
  };
}
