
import { CheckBox, Image, Header, Text } from '@ui.packages/admin-kit';

import numeral from "@packages/numeral";

import React from "react";

import styles from './default.module.scss';


function Product({ items, uuid, title, gallery, modes, onChange }) {
  function handleChange(mode) {
    onChange({ productUuid: uuid, title, ...mode });
  }

  return (
    <div className={styles['wrapper']}>
      <div className={styles['image']}>
        {gallery.length
          ? <Image className={styles['image']} src={`${process.env['REACT_APP_API_HOST']}/gallery/${gallery[0]['uuid']}?size=small`} />
          : <span className={styles['not-image']}><i className="far fa-images" /></span>
        }
      </div>
      <div className={styles['content']}>
        <div className={styles['common']}>
          <Header level={4}>{ title }</Header>
        </div>
        <div className={styles['modes']}>
          {modes.map((mode) => {
            const isSelect = items.some((item) => item['vendor'] === mode['vendor']);
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
                <div className={styles['control']}>
                  <CheckBox onChange={(value) => handleChange(mode, value)} value={isSelect} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

Product.defaultProps = {
  items: [],
};

export default Product;
