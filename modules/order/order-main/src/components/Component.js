
import { selectProfile } from "@ui.packages/application";
import { Header, Page, PageControls, PageContent, Button } from '@ui.packages/admin-kit';

import React from 'react';
import { useSelector } from 'react-redux';

import Cards from './Cards';

import styles from './default.module.scss';

import { selectInProcess } from '../ducks/slice';


function Attributes() {
  const profile = useSelector(selectProfile);
  const inProcess = useSelector(selectInProcess);

  function handleCreate() {

  }

  return (
    <Page inProcess={inProcess}>
      {(profile['role']['code'] !== 'performer') && (
        <PageControls>
          <div className={styles['controls']}>
            <Button
              form={Button.FORM_CREATE}
              mode={Button.MODE_SUCCESS}
              disabled={inProcess}
              onClick={() => handleCreate()}
            >Добавиьт заказ</Button>
          </div>
        </PageControls>
      )}
      <PageContent>
        <section className={styles['wrapper']}>
          <div className={styles['header']}>
            <Header level={1}>Заказы</Header>
          </div>
          <article className={styles['content']}>
            <Cards />
          </article>
        </section>
      </PageContent>
    </Page>
  );
}



Attributes.propTypes = {};

Attributes.defaultProps = {};

export default Attributes;
