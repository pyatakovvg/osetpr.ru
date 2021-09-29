
import { createGallery } from '@modules/admin-product';

import { Dialog, openDialog } from '@ui.packages/dialog';
import { Image, Draggable, Button, Header, Text, arrayMoveImmutable } from '@ui.packages/admin-kit';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Field, getFormValues, change } from "redux-form";

import LoadingForm from './LoadFofm';

import cn from 'classnames';
import styles from './default.module.scss';


function AddImageForm({ input, disabled }) {
  const dispatch = useDispatch();

  function handleDelete(index) {
    input.onChange([
      ...input['value'].slice(0, index),
      ...input['value'].slice(index + 1),
    ]);
  }

  function handleOrderChange(from, to) {
    input.onChange(arrayMoveImmutable(input['value'], from, to));
  }

  function handleAddImages() {
    dispatch(openDialog('add-images'));
  }

  function handleLoadingImages() {
    dispatch(openDialog('create-gallery'));
  }

  return (
    <div className={styles['wrapper']}>
      <div className={styles['controls']}>
        <Button
          form={Button.FORM_UPLOAD}
          mode={Button.MODE_SUCCESS}
          onClick={() => handleLoadingImages()}
        >Загрузить</Button>
        <Button
          form={Button.FORM_CREATE}
          mode={Button.MODE_PRIMARY}
          size={Button.SIZE_SMALL}
          disabled={disabled}
          onClick={() => handleAddImages()}
        >Добавить из галлереи</Button>
      </div>
      <div className={styles['images']}>
        { !! input['value'].length
          ? (
            <Draggable type={Draggable.TYPE_GRID} onChange={handleOrderChange}>
              {input['value'].map((image, index) => {
                return (
                  <div className={styles['section']} key={index}>
                    { ! disabled && <span className={cn(styles['remove-image'], 'fas fa-times')} onClick={() => handleDelete(index)} />}
                    <div className={cn(styles['image'], {
                      [styles['new']]: !! image['new'],
                    })}>
                      <Image src={`${process.env['REACT_APP_API_HOST']}/gallery/${image['uuid']}?size=small`} />
                    </div>
                  </div>
                );
              })}
            </Draggable>
          )
          : (
            <Text type={Text.TYPE_BODY}>Нет изображений</Text>
          )}
      </div>
    </div>
  );
}

function Gallery() {
  const dispatch = useDispatch();
  const formData = useSelector(getFormValues('product-modify'));

  async function handleCreate({ files }) {
    const result = await dispatch(createGallery(files));

    if (result) {
      dispatch(change('product-modify', 'gallery', [...(formData['gallery'] || []), ...result.map(item => ({
        uuid: item['uuid'],
        new: true,
      }))]));
    }
  }

  return (
    <div className={styles['block']}>
      <div className={styles['header']}>
        <Header level={3}>Изображения</Header>
      </div>
      <div className={styles['content']}>
        <Field name="gallery" component={AddImageForm} />
      </div>

      <Dialog name={'create-gallery'}>
        <LoadingForm onSubmit={(data) => handleCreate(data)}/>
      </Dialog>
    </div>
  );
}

export default Gallery;
