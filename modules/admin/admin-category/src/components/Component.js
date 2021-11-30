
import { updateCategories, selectInProcess, selectItems } from '@modules/admin-category';

import { Header, Page, PageContent, PageControls, Draggable, arrayMoveImmutable, Button } from '@ui.packages/admin-kit';

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Item from './Item';

import styles from './default.module.scss';


function Category() {
  const dispatch = useDispatch();

  const items = useSelector(selectItems);
  const inProcess = useSelector(selectInProcess);


  function handleOrderChange(from, to) {
    dispatch(updateCategories(arrayMoveImmutable(items, from, to)));
  }

  return (
    <Page inProcess={inProcess}>
      <PageControls>
        <div className={styles['controls']}>
          <Button mode={Button.MODE_PRIMARY}>Добавить</Button>
        </div>
      </PageControls>
      <PageContent>
        <section className={styles['wrapper']}>
          <div className={styles['header']}>
            <Header level={1}>Категория</Header>
          </div>
          <article className={styles['content']}>
            <div className={styles['items']}>
              <Draggable type={Draggable.TYPE_LIST} onChange={handleOrderChange}>
                {items.map((item) => {
                  return (
                    <Item
                      key={item['uuid']}
                      {...item}
                      onEdit={() => console.log(item['uuid'])}
                      onRemove={() => console.log(item['uuid'])}
                    />
                  );
                })}
              </Draggable>
            </div>
            <div className={styles['controls']}>

            </div>
          </article>
        </section>
      </PageContent>
    </Page>
  );
}

export default Category;
