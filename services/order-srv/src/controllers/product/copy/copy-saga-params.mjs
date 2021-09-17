
export default class CopySagaParams {
  _imageIDs = null;
  _productUUID = null;
  _product = null;

  getImageIDs() {
    return this._imageIDs;
  }

  setImageIDs(ids) {
    this._imageIDs = ids;
  }

  getProductUUID() {
    return this._productUUID;
  }

  setProductUUID(uuid) {
    this._productUUID = uuid;
  }

  getProduct() {
    return this._product;
  }

  setProduct(product) {
    this._product = product;
  }
}
