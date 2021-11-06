
import types from 'prop-types';
import React, { useRef, useState, useEffect } from 'react';

import Error from "./Error";
import NotSrc from "./NotSrc";
import Loading from "./Loading";

import styles from './default.module.scss';


export default function Image({ src }) {
  const imageRef = useRef(null);

  const [isError, setError] = useState(false);
  const [isNotSrc, setNotSrc] = useState(false);
  const [isLoading, setLoading] = useState(false);

  function handleLoaded() {
    setLoading(false);
  }

  function handleError() {
    setError(true);
    setLoading(false);
  }

  useEffect(async function() {
    const imageElement = imageRef['current'];

    if ( ! src) {
      return setNotSrc(true);
    }

    if ( ! imageElement) {
      return void 0;
    }

    setLoading(true);

    imageElement.addEventListener('load', handleLoaded);
    imageElement.addEventListener('error', handleError);
  }, [src]);

  useEffect(() => {
    const imageElement = imageRef['current'];
    return () => {
      if ( ! imageElement) {
        return void 0;
      }

      imageElement.removeEventListener('load', handleLoaded);
      imageElement.removeEventListener('error', handleError);
    };
  }, []);

  return (
    <div className={styles['wrapper']}>
      {isNotSrc && <NotSrc />}
      {isLoading && ! isNotSrc && <Loading />}
      {isError && ! isNotSrc && <Error />}
      <span className={styles['image']}>
        <img src={src} ref={imageRef} alt={""} loading={'lazy'} />
      </span>
    </div>
  );
}

Image.propTypes = {
  src: types.string,
};

Image.defaultType = {
  src: null,
};
