
import modeBuilder from './mode.mjs';


export default function(data) {
  return {
    externalId: data['externalId'],
    uuid: data['uuid'],
    isUse: data['isUse'],
    isAvailable: data['isAvailable'],
    title: data['title'],
    originalName: data['originalName'],
    groupUuid: data['group'] ? data['group']['uuid'] : null,
    categoryUuid: data['category'] ? data['category']['uuid'] : null,
    description: data['description'],
    gallery: data['gallery'],
    modes: data['modes'].map((data) => modeBuilder(data)),
    updatedAt: data['updatedAt'],
  };
}
