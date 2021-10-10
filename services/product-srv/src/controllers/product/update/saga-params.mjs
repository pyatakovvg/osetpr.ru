
export default class SagaParams {
  _product = null;
  _gallery = null;
  _attributes = null;
  _brandId = null;
  _types = null;
  _categories = null;
  _promotions = null;
  _options = null;
  _shops = null;

  setOptions(promotions) {
    this._options = promotions;
  }

  getOptions() {
    return this._options;
  }

  setPromotions(promotions) {
    this._promotions = promotions;
  }

  getPromotions() {
    return this._promotions;
  }

  setCategories(categories) {
    this._categories = categories;
  }

  getCategories() {
    return this._categories;
  }

  setTypes(types) {
    this._types = types;
  }

  getTypes() {
    return this._types;
  }

  setBrand(brandId) {
    this._brandId = brandId;
  }

  getBrand() {
    return this._brandId;
  }

  setAttributes(attrs) {
    this._attributes = attrs;
  }

  getAttributes() {
    return this._attributes;
  }

  setGallery(gallery) {
    this._gallery = gallery;
  }

  getGallery() {
    return this._gallery;
  }

  getProduct() {
    return this._product;
  }

  setProduct(product) {
    this._product = product;
  }

  getShops() {
    return this._shops;
  }

  setShops(product) {
    this._shops = product;
  }
}
