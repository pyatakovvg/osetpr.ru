
import React from 'react';
import types from 'prop-types';

import DAttribute from './Dark/Attribute';
import DDefault from './Dark/Default';
import DComment from './Dark/Comment';
import DAmount from './Dark/Amount';
import DBody from './Dark/Body';
import DUUID from './Dark/UUID';

import LDefault from './Light/Default';
import LComment from './Light/Comment';
import LAmount from './Light/Amount';
import LBody from './Light/Body';
import LUUID from './Light/UUID';


function TextFactory({ theme, className, children, type }) {
  if (theme === 'dark') {
    switch(type) {
      case TextFactory.TYPE_ATTRIBUTE: return <DAttribute className={className}>{ children }</DAttribute>;
      case TextFactory.TYPE_DEFAULT: return <DDefault className={className}>{ children }</DDefault>;
      case TextFactory.TYPE_COMMENT: return <DComment className={className}>{ children }</DComment>;
      case TextFactory.TYPE_AMOUNT: return <DAmount className={className}>{ children }</DAmount>;
      case TextFactory.TYPE_BODY: return <DBody className={className}>{ children }</DBody>;
      case TextFactory.TYPE_UUID: return <DUUID className={className}>{ children }</DUUID>;
      default: return <DDefault className={className}>{ children }</DDefault>;
    }
  }
  if (theme === 'light') {
    switch(type) {
      case TextFactory.TYPE_DEFAULT: return <LDefault className={className}>{ children }</LDefault>;
      case TextFactory.TYPE_COMMENT: return <LComment className={className}>{ children }</LComment>;
      case TextFactory.TYPE_AMOUNT: return <LAmount className={className}>{ children }</LAmount>;
      case TextFactory.TYPE_BODY: return <LBody className={className}>{ children }</LBody>;
      case TextFactory.TYPE_UUID: return <LUUID className={className}>{ children }</LUUID>;
      default: return <LDefault className={className}>{ children }</LDefault>;
    }
  }
}

TextFactory.TYPE_UUID = 'uuid';
TextFactory.TYPE_BODY = 'body';
TextFactory.TYPE_AMOUNT = 'amount';
TextFactory.TYPE_DEFAULT = 'default';
TextFactory.TYPE_COMMENT = 'comment';
TextFactory.TYPE_ATTRIBUTE = 'attribute';

TextFactory.propTypes = {
  theme: types.oneOf(['light', 'dark']),
  type: types.oneOf([TextFactory.TYPE_DEFAULT, TextFactory.TYPE_ATTRIBUTE, TextFactory.TYPE_COMMENT, TextFactory.TYPE_AMOUNT, TextFactory.TYPE_BODY, TextFactory.TYPE_UUID]),
  className: types.string,
  children: types.any,
};

TextFactory.defaultProps = {
  theme: 'dark',
  type: TextFactory.TYPE_DEFAULT,
  className: '',
  children: null,
};

export default TextFactory;
