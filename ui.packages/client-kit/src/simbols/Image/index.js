
import request from '@ui.packages/request';

import types from 'prop-types';
import React, { useRef, useMemo, useState, useEffect } from 'react';

import Error from "./Error";
import NotSrc from "./NotSrc";
import Loading from "./Loading";

import cn from 'classnames';
import styles from './default.module.scss';


export default function Image({ className, src }) {
  const wrapperClassName = useMemo(() => cn(styles['wrapper'], className), [className]);

  const imageRef = useRef(null);

  const [isError, setError] = useState(false);
  const [isNotSrc, setNotSrc] = useState(false);
  const [isLoading, setLoading] = useState(false);

  function createImage(root) {
    if ( ! createImage.instance) {
      createImage.instance = document.createElement("img");
      if (root) {
        root.appendChild(createImage.instance);
      }
      return createImage.instance;
    }
    return createImage.instance;
  }

  useEffect(async function() {
    if ( ! src) {
      return setNotSrc(true);
    }

    try {
      setLoading(true);

      const result = await request({
        url: src,
        method: 'get',
        responseType: 'blob',
        headers: {
          'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
        }
      });

      if (result.size === 0) {
        setLoading(false);
        return setError(true);
      }

      const reader = new FileReader();

      reader.onload = function(event) {
        const image = createImage(imageRef['current']);
        image.src =  event['target']['result'];

        setLoading(false);
      };

      reader.onerror = function(event){
        setLoading(false);
        setError(true);
        console.log("File could not be read: " + event.target.error.code);
      };

      reader.readAsDataURL(result);
    }
    catch(error) {
      setLoading(false);
      setError(true);
    }
  }, [src]);

  return (
    <div className={wrapperClassName}>
      {isNotSrc && <NotSrc />}
      {isLoading && ! isNotSrc && <Loading />}
      {isError && ! isNotSrc && <Error />}
      <span ref={imageRef} className={styles['image']} />
    </div>
  );
}

Image.propTypes = {
  src: types.string,
};

Image.defaultType = {
  src: null,
};
