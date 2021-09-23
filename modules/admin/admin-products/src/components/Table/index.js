
import { selectItems, selectInProcess } from '@modules/admin-products';

import numeral from '@packages/numeral';

import { Text, Header, Image, Actions } from '@ui.packages/admin-kit';
import { Table, Column } from '@ui.packages/table';

import React from 'react';
import { useSelector } from 'react-redux';

import styles from './default.module.scss';


function ProductList() {
  const items = useSelector(selectItems);
  const inProcess = useSelector(selectInProcess);

  function handleCopyProduct() {}

  function handleEdit() {}

  function handleRemoveProduct() {}

  return (
    <div className={styles['wrapper']}>
      <Table columns={items}>
        <Column
          title="Фото"
          alias="gallery"
          width={140}
        >
          {(items) => items[0]
            ? <Image className={styles['image']} src={`${process.env['REACT_APP_API_HOST']}/gallery/${items[0]['uuid']}.jpg`} />
            : <span className={styles['not-image']}><i className="far fa-images" /></span>
          }
        </Column>
        <Column
          title={'Описание'}
          align={'left'}
        >
          {(value) => (
            <div className={styles['row']}>
              <div className={styles['title']}>
                <Header level={4}>{ value['title'] }</Header>
              </div>
              <div className={styles['description']}>
                <Text>{ value['description'] }</Text>
              </div>
            </div>
          )}
        </Column>
        <Column
          title={'Модификация'}
          alias={'mode'}
          align={'left'}
        >{(value) => value.map((mode) => {
          return (
            <div key={mode['uuid']} className={styles['mode']}>
              <div className={styles['vendor']}>
                <Text>{ mode['vendor'] }</Text>
              </div>
              <div className={styles['value']}>
                <Text>{ mode['value'] }</Text>
              </div>
              <div className={styles['price']}>
                <Text type={Text.TYPE_BODY}>{ numeral(Number(mode['price'])).format() } { mode['currency']['value'] }</Text>
              </div>
            </div>
          );
        })}</Column>
        <Column
          align="right"
          width="70"
        >
          {({ uuid }) => (
            <Actions
              disabled={inProcess}
              onCopy={() => handleCopyProduct(uuid)}
              onEdit={() => handleEdit(uuid)}
              onDelete={() => handleRemoveProduct(uuid)}
            />
          )}
        </Column>
      </Table>
    </div>
  );
}

ProductList.propTypes = {};

ProductList.defaultProps = {};

export default ProductList;
