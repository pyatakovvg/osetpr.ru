
import modeBuilder from './mode.mjs';


export default function(data) {
  console.log(data)
  return {
    externalId: data['externalId'],
    uuid: data['uuid'],
    isUse: data['isUse'],
    isAvailable: data['isAvailable'],
    title: data['title'],
    categoryId: data['category']['id'],
    description: data['description'],
    gallery: data['gallery'],
    modes: data['modes'].map((data) => modeBuilder(data)),
    updatedAt: data['updatedAt'],
  };
}
