
import { useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';


export function useMount(cb) {
  useEffect(() => {
    cb();
  }, []);
}

export function useUpdate(cb) {
  const location = useLocation();
  const [isRendered, setRendered] = useState(false);

  useEffect(() => {
    if (isRendered) {
      cb();
    }
    else {
      setRendered(true);
    }
  }, [location]);
}

export function useUnmount(cb) {
  useEffect(() => {
    return () => {
      cb();
    };
  }, []);
}
