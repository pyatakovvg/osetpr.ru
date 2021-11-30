
import modeBuilder from './mode.mjs';


export default function(data) {
  return {
    externalId: data['externalId'],
    uuid: data['uuid'],
    isAvailable: data['isAvailable'],
    title: data['title'],
    originalName: data['originalName'],
    categoryUuid: data['category'] ? data['category']['uuid'] : null,
    description: data['description'],
    gallery: data['gallery'],
    modes: data['modes'].map((data) => modeBuilder(data)),
    updatedAt: data['updatedAt'],
  };
}
