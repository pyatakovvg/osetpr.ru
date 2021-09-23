
import { Dialog, openDialog } from "@ui.packages/dialog";
import { Button, Header, Page, PageContent, PageControls } from '@ui.packages/admin-kit';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Table from './Table';
import FormCreate from './FormCreate';
import FormModify from './FormModify';

import styles from './default.module.scss';

import { selectInProcess } from '../ducks/slice';
import { createGallery, updateGallery } from '../ducks/commands';


function Gallery() {
  const dispatch = useDispatch();
  const inProcess = useSelector(selectInProcess);

  function handleCreate() {
    dispatch(openDialog('create'));
  }

  function handleSubmit(formData) {
    dispatch(createGallery(formData['files']));
  }

  function handleUpdateSubmit(formData) {
    dispatch(updateGallery(formData));
  }

  return (
    <Page inProcess={inProcess}>
      <PageControls>
        <div className={styles['controls']}>
          <Button
            form={Button.FORM_CREATE}
            mode={Button.MODE_SUCCESS}
            disabled={inProcess}
            onClick={() => handleCreate()}
          >Загрузить</Button>
        </div>
      </PageControls>
      <PageContent>
        <section className={styles['wrapper']}>
          <div className={styles['header']}>
            <Header level={1}>Галерея</Header>
          </div>
          <article className={styles['content']}>
            <Table />
          </article>
        </section>
      </PageContent>

      <Dialog name="modify" title="Изменить название">
        <FormModify onSubmit={(data) => handleUpdateSubmit(data)} />
      </Dialog>

      <Dialog name="create" title="Загрузить изображение">
        <FormCreate onSubmit={(data) => handleSubmit(data)} />
      </Dialog>
    </Page>
  );
}

export default Gallery;
