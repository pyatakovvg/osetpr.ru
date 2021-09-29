
import { Mode } from '@ui.packages/types';
import { Button } from '@ui.packages/admin-kit';

import { submit } from 'redux-form';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Gallery from './Gallery';

import styles from './default.module.scss';

import { getGallery } from '../../ducks/commands';


function ImagesForm({ handleSubmit, change, valid, pristine }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGallery());
    return () => {};
  }, []);


  function handleSelectImage(array) {
    change('gallery', array);
  }

  async function handleChangeImages(array) {
    await change('gallery', array);
    await dispatch(submit('gallery'));
  }

  return (
    <div className={styles['wrapper']}>
      <form onSubmit={handleSubmit}>
        <div className={styles['content']}>
          <Gallery
            onChange={(array) => handleChangeImages(array)}
            onSelect={(array) => handleSelectImage(array)}
          />
        </div>
        <div className={styles['controls']}>
          <Button
            type="submit"
            mode={Mode.SUCCESS}
            disabled={ ! valid || pristine}
          >Добавить</Button>
        </div>
      </form>
    </div>
  );
}

export default ImagesForm;
