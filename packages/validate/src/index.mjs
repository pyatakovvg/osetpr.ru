'use strict';

import valid from 'validator';
import { isNumber, isString, isObject, isFunction } from 'lodash';


export default class Validate {

  constructor() {

    this._value = null;
  }

  check(value) {

    this._value = value;

    return this;
  }

  isEmail(data) {
    if ( ! valid.isEmail(this._value)) {
      throw data || 'Неверный e-mail';
    }
    return this;
  }

  isEmpty(data) {

    switch (this._value) {
      case undefined:
      case null:
      case '': throw data || 'Пустое значение';
      default: return this;
    }
  }

  isNumber(data) {
    if ( ! isNumber(this._value)) {
      throw data || 'Не число';
    }
    return this;
  }

  isString(data) {
    if ( ! isString(this._value)) {
      throw data || 'Не строка';
    }
    return this;
  }

  isObject(data) {
    if ( ! isObject(this._value)) {
      throw data || 'Не объект';
    }
    return this;
  }

  isFunction(data) {
    if ( ! isFunction(this._value)) {
      throw data || 'Не функция';
    }
    return this;
  }

  in(values, data) {
    if (values.indexOf(this._value) === -1) {
      throw data || 'Значение не входит в ряд';
    }
    return this;
  }
}