
import React, { useEffect } from 'react';

import cn from 'classnames';
import styles from './defaults.module.scss';

import Field from './Field';


const yandexMapAPI = window['ymaps'];


export default function Suggest({ label, name, change, ...props }) {
  const { postalCode, country, province, locality, street, house, entrance, floor, flat } = props[name];

  useEffect(function() {
    if ( ! yandexMapAPI) {
      return void 0;
    }

    let suggestView = null;

    yandexMapAPI.ready(function() {
      suggestView = new yandexMapAPI.SuggestView('input', { offset: [0, 10] });
      suggestView.events.add('select', (event) => checkSuggest(event['originalEvent']['item']['value']));
    });

    return function() {
      if ( ! suggestView) {
        return void 0;
      }
      suggestView.destroy();
    };
  }, []);

  function handleChange(value) {
    change(postalCode['meta']['form'], name, value);
  }

  async function checkSuggest(data) {
    if ( ! yandexMapAPI) {
      return void 0;
    }

    const geocode = await yandexMapAPI.geocode(data);
    const geoObject = geocode.geoObjects.get(0);

    if ( ! geoObject) {
      return void 0;
    }

    const address = geoObject.properties.get('metaDataProperty.GeocoderMetaData.Address');

    const country = address['Components'].find((item) => item['kind'] === 'country');
    const province = address['Components'].filter((item) => item['kind'] === 'province');
    const locality = address['Components'].find((item) => item['kind'] === 'locality');
    const street = address['Components'].find((item) => item['kind'] === 'street');
    const house = address['Components'].find((item) => item['kind'] === 'house');

    handleChange({
      postalCode: address['postal_code'],
      country: country ? country['name'] : null,
      province: !! province.length ? (province[1] || province[0])['name'] : null,
      locality: locality ? locality['name'] : null,
      street: street ? street['name'] : null,
      house: house ? house['name'] : null,
    });
  }

  return (
    <div className={styles['wrapper']}>
      <div className={styles['search']}>
        <input id="input" className={styles['input']} />
        <span className={cn(styles['icon'], 'fas fa-search-location')} />
      </div>
      <div className={styles['row']}>
        <div className={styles['col']}>
          <Field require label="Индекс" {...postalCode} />
        </div>
        <div className={styles['col']}>
          <Field require label="Страна" {...country} />
        </div>
      </div>
      <div className={styles['row']}>
        <div className={styles['col']}>
          <Field require label="Область" {...province} />
        </div>
        <div className={styles['col']}>
          <Field require label="Населенный пункт" {...locality} />
        </div>
      </div>
      <div className={styles['row']}>
        <div className={styles['col']}>
          <Field require label="Улица" {...street} />
        </div>
        <div className={styles['col']}>
          <Field require label="Дом" {...house} />
        </div>
      </div>
      <div className={styles['row']}>
        <div className={styles['col']}>
          <Field label="Подъезд" {...entrance} />
        </div>
        <div className={styles['col']}>
          <Field label="Этаж" {...floor} />
        </div>
        <div className={styles['col']}>
          <Field label="Квартира" {...flat} />
        </div>
        <div className={styles['col']} />
      </div>
    </div>
  );
}
