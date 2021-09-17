
import React from 'react';
import types from 'prop-types';

import LLevel1 from './Light/Level1';
import LLevel2 from './Light/Level2';
import LLevel3 from './Light/Level3';
import LLevel4 from './Light/Level4';
import LLevel5 from './Light/Level5';

import DLevel1 from './Dark/Level1';
import DLevel2 from './Dark/Level2';
import DLevel3 from './Dark/Level3';
import DLevel4 from './Dark/Level4';


export default function HeaderFactory({ theme, className, children, level, bold }) {
  if (theme === 'light') {
    switch(level) {
      case 1: return <LLevel1 className={className} bold={bold}>{ children }</LLevel1>;
      case 2: return <LLevel2 className={className} bold={bold}>{ children }</LLevel2>;
      case 3: return <LLevel3 className={className} bold={bold}>{ children }</LLevel3>;
      case 4: return <LLevel4 className={className} bold={bold}>{ children }</LLevel4>;
      case 5: return <LLevel5 className={className} bold={bold}>{ children }</LLevel5>;

      default: return <LLevel1 className={className} bold={bold}>{ children }</LLevel1>;
    }
  }
  if (theme === 'dark') {
    switch(level) {
      case 1: return <DLevel1 className={className} bold={bold}>{ children }</DLevel1>;
      case 2: return <DLevel2 className={className} bold={bold}>{ children }</DLevel2>;
      case 3: return <DLevel3 className={className} bold={bold}>{ children }</DLevel3>;
      case 4: return <DLevel4 className={className} bold={bold}>{ children }</DLevel4>;

      default: return <DLevel1 className={className} bold={bold}>{ children }</DLevel1>;
    }
  }
}

HeaderFactory.propTypes = {
  theme: types.oneOf(['light', 'dark']),
  level: types.number,
  className: types.string,
  children: types.any,
  bold: types.bool,
};

HeaderFactory.defaultProps = {
  theme: 'dark',
  level: 1,
  className: '',
  children: null,
  bold: true,
};
