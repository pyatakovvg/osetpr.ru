
import { Image, Text } from "@ui.packages/admin-kit";

import React from 'react';
import { useSelector } from 'react-redux';
import { getFormValues } from 'redux-form';

import cn from 'classnames';
import styles from './default.module.scss';

import { selectGallery } from '../../../ducks/slice';


function ImagesForm({ onSelect, onChange }) {
  const gallery = useSelector(selectGallery);
  const formValues = useSelector(getFormValues('gallery'));

  function getComposeArray(newImage) {
    let images = [...(formValues['gallery'] || [])];
    const index = images.findIndex((image) => image['uuid'] === newImage['uuid'])
    if (index > -1) {
      images = [
        ...images.slice(0, index),
        ...images.slice(index + 1),
      ];
    }
    else {
      images.push({
        uuid: newImage['uuid'],
        new: true,
      });
    }
    return images;
  }

  function handleSelectImage(newImage) {
    onSelect(getComposeArray(newImage));
  }

  function handleChangeImage(newImage) {
    onChange(getComposeArray(newImage));
  }

  return (
    <div className={styles['wrapper']}>
      {gallery.map((img) => (
        <div className={styles['section']} key={img['uuid']} onDoubleClick={() => handleChangeImage(img)} onClick={() => handleSelectImage(img)}>
          <div className={cn(styles['image'], {
            [styles['image--selected']]: (formValues['gallery'] || []).some((image) => image['uuid'] === img['uuid'])
          })}>
            <Image src={`${process.env['REACT_APP_API_HOST']}/gallery/${img['uuid']}?size=small`} />
          </div>
          <div className={styles['name']}>
            <Text type={Text.TYPE_COMMENT}>{ img['name'] }</Text>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ImagesForm;
