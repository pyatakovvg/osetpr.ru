
import numeral from "@packages/numeral";
import { Gallery, Header, Text, Count } from "@ui.packages/admin-kit";
import {
  selectUuid,
  selectInProcess,
  plusQuantityAction,
  minusQuantityAction,
  closeCartAction,
  selectAmount
} from '@ui.packages/cart-widget';

import React from 'react';
import types from "prop-types";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import cn from "classnames";
import styles from "./defaults.module.scss";


function Product({ externalId, gallery, brand, name, option, onRemove }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const uuids = useSelector(selectUuid);
  const amounts = useSelector(selectAmount);
  const inProcess = useSelector(selectInProcess);
  const classNameRemoveProduct = cn(styles['remove'], 'far fa-trash-alt');

  const product = uuids.find(item => item[0] === externalId && item[2]['vendor'] === option['vendor']);

  if ( ! product) {
    return null;
  }

  function handleTo() {
    navigate(process.env['PUBLIC_URL'] + `/products/${externalId}`);
    dispatch(closeCartAction());
  }

  function handleRemove(event) {
    event.stopPropagation();
    onRemove({ uuid: externalId, options: option });
  }

  function handlePlus() {
    console.log(123)
    dispatch(plusQuantityAction({ uuid: externalId, options: option }));
  }

  function handleMinus() {
    console.log(567)
    dispatch(minusQuantityAction({ uuid: externalId, options: option }));
  }

  return (
    <div className={styles['wrapper']}>
      <div className={styles['product']} onClick={() => handleTo()}>
        <div className={styles['promo']}>
          <Gallery items={gallery} isList={false} size="small" path={`${process.env['REACT_APP_API_HOST']}/gallery`} />
        </div>
        <div className={styles['description']}>
          <span className={styles['brand']}>
            <Header level={4}>{ name }</Header>
          </span>
          <div className={styles['name']}>
            <Text type={Text.TYPE_COMMENT}>{ brand }</Text>
          </div>
          <div className={styles['uuid']}>
            <Text type={Text.TYPE_UUID}>Комплектация: { option['value'] }</Text>
          </div>
          <div className={styles['uuid']}>
            <Text type={Text.TYPE_UUID}>Артикул: { option['vendor'] }</Text>
          </div>
        </div>
      </div>
      <div className={styles['controls']}>
        <div className={styles['quantity']}>
          <div className={styles['price']}>
            <span className={styles['count']}>
              <Count number={product[1]} disabled={inProcess} onPlus={handlePlus} onMinus={handleMinus} />
            </span>
            <span className={styles['number']}>
              <Text>x { numeral(option['price']).format() } { amounts.map((amount) => amount[2]) }</Text>
            </span>
          </div>
          <div className={styles['full-price']}>
            <Text type={Text.TYPE_COMMENT}>= { numeral(option['price'] * product[1]).format() } { amounts.map((amount) => amount[2]) }</Text>
          </div>
        </div>
        <div className={styles['control']}>
          <span className={classNameRemoveProduct} onClick={(event) => handleRemove(event)} />
        </div>
      </div>
    </div>
  );
}

Product.propTypes = {
  uuid: types.string,
  gallery: types.array,
  brand: types.string,
  name: types.string,
  price: types.number,
  onRemove: types.func,
  closeCart: types.func,
  removeProduct: types.func,
};

Product.defaultProps = {
  uuid: null,
  gallery: [],
  brand: '',
  name: '',
  amount: 0.00,
};

export default Product;
