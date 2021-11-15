
import modeBuilder from './mode.mjs';


export default function(data, products) {
  return {
    externalId: data['externalId'],
    uuid: data['uuid'],
    isUse: data['isUse'],
    isAvailable: data['isAvailable'],
    title: data['title'],
    originalName: data['originalName'],
    category: data['category'],
    description: data['description'],
    gallery: data['gallery'],
    modes: data['modes'].map((data) => modeBuilder(data, products)),
    updatedAt: data['updatedAt'],
  };
}
