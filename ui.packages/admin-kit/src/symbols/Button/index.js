
import { Mode, Size } from '@ui.packages/types';

import React from 'react';
import types from 'prop-types';

import Bay from './Bay';
import Cart from './Cart';
import Link from './Link';
import Create from './Create';
import Upload from './Upload';
import Default from './Default';
import Context from "./Context";
import Outline from './Outline';


function ButtonFactory({ form, children, ...props }) {
  switch(form) {
    case ButtonFactory.FORM_DEFAULT: return <Default {...props}>{ children }</Default>;
    case ButtonFactory.FORM_CONTEXT: return <Context {...props}>{ children }</Context>;
    case ButtonFactory.FORM_OUTLINE: return <Outline {...props}>{ children }</Outline>;
    case ButtonFactory.FORM_CREATE: return <Create {...props}>{ children }</Create>;
    case ButtonFactory.FORM_UPLOAD: return <Upload {...props}>{ children }</Upload>;
    case ButtonFactory.FORM_CART: return <Cart {...props}>{ children }</Cart>;
    case ButtonFactory.FORM_LINK: return <Link {...props}>{ children }</Link>;
    case ButtonFactory.FORM_BAY: return <Bay {...props}>{ children }</Bay>;
    default: return <Default {...props}>{ children }</Default>;
  }
}

ButtonFactory.TYPE_BUTTON = 'button';
ButtonFactory.TYPE_SUBMIT = 'submit';

ButtonFactory.SIZE_LARGE = Size.LARGE;
ButtonFactory.SIZE_SMALL = Size.SMALL;

ButtonFactory.MODE_DEFAULT = Mode.DEFAULT;
ButtonFactory.MODE_SUCCESS = Mode.SUCCESS;
ButtonFactory.MODE_PRIMARY = Mode.PRIMARY;
ButtonFactory.MODE_INFO = Mode.INFO;
ButtonFactory.MODE_WARNING = Mode.WARNING;
ButtonFactory.MODE_DANGER = Mode.DANGER;

ButtonFactory.FORM_BAY = 'bay';
ButtonFactory.FORM_CART = 'cart';
ButtonFactory.FORM_LINK = 'link';
ButtonFactory.FORM_CREATE = 'create';
ButtonFactory.FORM_UPLOAD = 'upload';
ButtonFactory.FORM_DEFAULT = 'default';
ButtonFactory.FORM_CONTEXT = 'context';
ButtonFactory.FORM_OUTLINE = 'outline';


ButtonFactory.propTypes = {
  className: types.string,
  type: types.oneOf([ButtonFactory.TYPE_BUTTON, ButtonFactory.TYPE_SUBMIT]),
  form: types.oneOf([
    ButtonFactory.FORM_DEFAULT,
    ButtonFactory.FORM_CONTEXT,
    ButtonFactory.FORM_CREATE,
    ButtonFactory.FORM_OUTLINE,
    ButtonFactory.FORM_CART,
    ButtonFactory.FORM_BAY,
    ButtonFactory.FORM_LINK,
    ButtonFactory.FORM_UPLOAD,
  ]),
  mode: types.oneOf([Mode.DEFAULT, Mode.INFO, Mode.PRIMARY, Mode.DANGER, Mode.WARNING, Mode.SUCCESS]),
  size: types.oneOf([Size.SMALL, Size.MEDIUM, Size.LARGE]),
  children: types.any,
  disabled: types.bool,
  onClick: types.func,
};

ButtonFactory.defaultProps = {
  className: null,
  form: ButtonFactory.FORM_DEFAULT,
  type: ButtonFactory.TYPE_BUTTON,
  mode: Mode.DEFAULT,
  size: Size.MEDIUM,
  disabled: false,
  children: 'Button',
  onClick: null,
};

export default ButtonFactory;
