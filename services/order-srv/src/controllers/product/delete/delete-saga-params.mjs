
export default class UpdateSagaParams {
  _characteristics = {};
  _type = null;
  _brand = null;
  _category = null;
  _comments = [];
  _gallery = [];
  _options = [];
  _product = null;
  _shops = [];

  getCharacteristics() { return this._characteristics; }
  setCharacteristics(data) { this._characteristics = data; }

  getBrand() { return this._brand; }
  setBrand(data) { this._brand = data; }

  getType() { return this._type; }
  setType(data) { this._type = data; }

  getCategory() { return this._category; }
  setCategory(data) { this._category = data; }

  getComments() { return this._comments; }
  setComments(data) { this._comments = data; }

  getGallery() { return this._gallery; }
  setGallery(data) { this._gallery = data; }

  getOptions() { return this._options; }
  setOptions(data) { this._options = data; }

  getProduct() { return this._product; }
  setProduct(data) { this._product = data; }

  getShops() { return this._shops; }
  setShops(data) { this._shops = data; }
}
