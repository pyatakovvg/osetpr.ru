
import { UnauthorizedError } from '@packages/errors';

import { Mode } from '@ui.packages/types';
import { UUID } from '@ui.packages/utils';
import request from '@ui.packages/request';
import { closeDialog } from "@ui.packages/dialog";
import { pushNotification } from '@ui.packages/notifications';

import {
  getCategoriesRequestAction,
  getCategoriesRequestFailAction,
  getCategoriesRequestSuccessAction,

  getCurrenciesRequestAction,
  getCurrenciesRequestFailAction,
  getCurrenciesRequestSuccessAction,

  getProductRequestAction,
  getProductRequestFailAction,
  getProductRequestSuccessAction,

  updateProductRequestAction,
  updateProductRequestFailAction,
  updateProductRequestSuccessAction,

  createProductRequestAction,
  createProductRequestFailAction,
  createProductRequestSuccessAction,

  deleteImageRequestAction,
  deleteImageRequestFailAction,
  deleteImageRequestSuccessAction,

  getGalleryRequestAction,
  getGalleryRequestFailAction,
  getGalleryRequestSuccessAction,

  createGalleryRequestAction,
  createGalleryRequestFailAction,
  createGalleryRequestSuccessAction,
} from './slice';


export const getCategories = () => async (dispatch) => {
  try {
    dispatch(getCategoriesRequestAction());

    const { data } = await request({
      method: 'get',
      url: '/categories',
    });

    dispatch(getCategoriesRequestSuccessAction(data));

    return true;
  }
  catch(error) {
    dispatch(getCategoriesRequestFailAction(error));

    if (error instanceof UnauthorizedError) {
      return void 0;
    }
    dispatch(pushNotification({
      mode: Mode.DANGER,
      title: 'Ошибка при получании данный Categories',
      content: `${error['data']['message']} (${error['data']['code']})`,
      autoClose: false,
    }));

    return false;
  }
};

export const getCurrencies = () => async (dispatch) => {
  try {
    dispatch(getCurrenciesRequestAction());

    const result = await request({
      method: 'get',
      url: '/currencies'
    });

    dispatch(getCurrenciesRequestSuccessAction(result['data']));

    return true;
  }
  catch(error) {
    dispatch(getCurrenciesRequestFailAction(error));

    if (error instanceof UnauthorizedError) {
      return void 0;
    }
    dispatch(pushNotification({
      mode: Mode.DANGER,
      title: 'Ошибка при получании данный Currencies',
      content: `${error['data']['message']} (${error['data']['code']})`,
      autoClose: false,
    }));

    return false;
  }
};

export const getProductById = (uuid) => async (dispatch) => {
  try {
    if ( ! uuid) {
      return;
    }

    dispatch(getProductRequestAction());

    const result = await request({
      method: 'get',
      url: `/products/${uuid}`
    });

    dispatch(getProductRequestSuccessAction(result['data']));

    return true;
  }
  catch(error) {
    dispatch(getProductRequestFailAction(error));

    if (error instanceof UnauthorizedError) {
      return void 0;
    }
    dispatch(pushNotification({
      mode: Mode.DANGER,
      title: 'Ошибка при получании данный продукта',
      content: `${error['data']['message']} (${error['data']['code']})`,
      autoClose: false,
    }));

    return false;
  }
};

export const updateProductsById = (data) => async (dispatch) => {
  try {
    dispatch(updateProductRequestAction());

    const result = await request({
      method: 'put',
      url: `/products/${data['uuid']}`,
      data: {
        isUse: data['isUse'],
        externalId: data['externalId'],
        categoryId: Number(data['categoryId']),
        title: data['title'],
        originalName: data['originalName'],
        description: data['description'],
        gallery: data['gallery'].map((image) => image['uuid']),
        modes: data['modes'].map((option) => ({
          uuid: option['uuid'],
          currencyCode: option['currencyCode'],
          isUse: option['isUse'],
          isTarget: option['isTarget'],
          price: Number(option['price']),
          value: option['value'],
          vendor: option['vendor'],
        })),
        updatedAt: data['updatedAt'],
      },
    });

    dispatch(updateProductRequestSuccessAction(result['data']));
    dispatch(pushNotification({
      title: 'Товар успешно обновлен',
      mode: Mode.SUCCESS,
    }));
  }
  catch(error) {
    dispatch(updateProductRequestFailAction());

    if (error instanceof UnauthorizedError) {
      return void 0;
    }

    dispatch(pushNotification({
      mode: Mode.DANGER,
      title: 'Ошибка при сохранении данных',
      content: `${error['data']['message']} (${error['data']['code']})`,
      autoClose: false,
    }));
  }
};

export const createProduct = (data) => async (dispatch) => {
  try {
    dispatch(createProductRequestAction());

    await request({
      url: '/products',
      method: 'post',
      data: {
        uuid: UUID(),
        isUse: data['isUse'],
        externalId: data['externalId'],
        categoryId: Number(data['categoryId']),
        title: data['title'],
        originalName: data['originalName'],
        description: data['description'],
        gallery: data['gallery'].map((image) => image['uuid']),
        modes: data['modes'].map((option) => ({
          uuid: option['uuid'],
          currencyCode: option['currencyCode'],
          isUse: option['isUse'],
          isTarget: option['isTarget'],
          price: Number(option['price']),
          value: option['value'],
          vendor: option['vendor'],
        })),
      },
    });

    dispatch(createProductRequestSuccessAction());
    dispatch(pushNotification({
      title: 'Товар успешно добавлен',
      mode: Mode.SUCCESS,
    }));

    return true;
  }
  catch(error) {
    dispatch(createProductRequestFailAction(error));

    if (error instanceof UnauthorizedError) {
      return void 0;
    }
    dispatch(pushNotification({
      title: 'Ошибка при добавлении товара',
      content: error['message'],
      mode: Mode.DANGER,
    }));

    return false;
  }
};

export const deleteImages = (uuid) => async (dispatch) => {
  try {
    dispatch(deleteImageRequestAction());

    const { data } = await request({
      url: `/gallery`,
      method: 'delete',
      data: { uuid },
    });

    dispatch(deleteImageRequestSuccessAction(data));
    dispatch(pushNotification({
      title: 'Изображения успешно удалено',
      type: Mode.SUCCESS,
    }));
  }
  catch(error) {
    dispatch(deleteImageRequestFailAction(error));

    if (error instanceof UnauthorizedError) {
      return void 0;
    }
    dispatch(pushNotification({
      title: 'Ошибка удаления изображения',
      content: error['message'],
      type: Mode.DANGER,
    }));
  }
};

export const getGallery = () => async (dispatch) => {
  try {
    dispatch(getGalleryRequestAction());

    const { data } = await request({
      url: `/gallery`,
      method: 'get',
    });

    dispatch(getGalleryRequestSuccessAction(data));

    return true;
  }
  catch(error) {
    dispatch(getGalleryRequestFailAction(error));

    if (error instanceof UnauthorizedError) {
      return void 0;
    }
    dispatch(pushNotification({
      title: 'Ошибка загрузки изображения',
      content: error['message'],
      type: Mode.DANGER,
    }));

    return false;
  }
};

export const createGallery = (files) => async (dispatch) => {
  try {
    dispatch(createGalleryRequestAction());

    const formData = new FormData();

    files.forEach((file, index) => formData.append('file-' + index, file));

    const { data } = await request({
      url: process.env['PUBLIC_URL'] + '/gallery',
      method: 'post',
      data: formData,
    });

    dispatch(closeDialog('create-gallery'));
    dispatch(createGalleryRequestSuccessAction(data));

    return data;
  }
  catch(error) {

    dispatch(createGalleryRequestFailAction(error));

    if (error instanceof UnauthorizedError) {
      return void 0;
    }
    dispatch(pushNotification({
      mode: 'danger',
      content: 'Ошибка при выполнении операции'
    }));

    return null;
  }
}
