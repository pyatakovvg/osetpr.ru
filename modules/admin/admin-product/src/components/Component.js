
import { selectProduct, selectInProcess } from '@modules/admin-product';
import { updateProductsById, createProduct } from '@modules/admin-product';

import { uniqName } from '@ui.packages/utils';
import { Dialog, closeDialog } from '@ui.packages/dialog';
import { Button, Header, Page, PageContent, PageControls } from '@ui.packages/admin-kit';

import React from 'react';
import { change } from 'redux-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { submit, reset, getFormValues, isPristine, isValid } from 'redux-form';

import ModifyForm from './ModifyForm';
import ImagesForm from "./ImagesForm";

import styles from './default.module.scss';


const FORM_NAME = 'product-modify';


const defaultProduct = {
  isUse: true,
  gallery: [],
  externalId: uniqName(),
};


function ProductModify() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const product = useSelector(selectProduct);
  const inProcess = useSelector(selectInProcess);

  const values = useSelector(getFormValues(FORM_NAME));
  const valid = useSelector(isValid(FORM_NAME));
  const pristine = useSelector(isPristine(FORM_NAME));

  async function handleSubmitProduct(formData) {
    if (formData['uuid']) {
      await dispatch(updateProductsById(formData));
    } else {
      const uuid = await dispatch(createProduct(formData));
      if (uuid) {
        navigate(process.env['PUBLIC_URL'] + '/products');
      }
    }
  }

  function handleSubmit() {
    dispatch(submit(FORM_NAME));
  }

  function handleReset() {
    dispatch(reset(FORM_NAME));
  }

  async function handleSubmitImages(data) {
    await dispatch(change('product-modify', 'gallery', data['gallery']));
    await dispatch(closeDialog());
  }

  return (
    <Page className={styles['wrapper']} inProcess={inProcess}>
      <PageControls>
        <div className={styles['controls']}>
          <Button
            form={Button.FORM_CONTEXT}
            mode={Button.MODE_PRIMARY}
            disabled={pristine || inProcess}
            onClick={handleReset}
          >Отмена</Button>
          <Button
            type={Button.TYPE_BUTTON}
            disabled={ ! valid || pristine || inProcess}
            mode="success"
            onClick={handleSubmit}
          >Сохранить</Button>
        </div>
      </PageControls>
      <PageContent>
        <header className={styles['header']}>
          <Header level={1}>{ product['uuid'] ? 'Редактировать товар' : 'Новый товар' }</Header>
        </header>
        <article className={styles['content']}>
          <ModifyForm
            initialValues={{
              ...defaultProduct,
              ...product,
            }}
            onSubmit={handleSubmitProduct}
          />
        </article>
      </PageContent>

      <Dialog name="add-images" title="Добавить изображения">
        <ImagesForm
          initialValues={{ gallery: values ? values['gallery'] : [] }}
          onSubmit={(data) => handleSubmitImages(data)}
        />
      </Dialog>

    </Page>
  );
}

export default ProductModify;
