
import modeBuilder from './mode.mjs';


export default function(data, products) {
  return {
    externalId: data['externalId'],
    uuid: data['uuid'],
    isUse: data['isUse'],
    title: data['title'],
    categoryUuid: data['category'] ? data['category']['uuid'] : null,
    description: data['description'],
    gallery: data['gallery'],
    modes: data['modes'].map((data) => modeBuilder(data, products)),
  };
}
