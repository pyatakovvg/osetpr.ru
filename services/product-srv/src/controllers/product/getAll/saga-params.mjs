
export default class SagaParams {
  _products = [];

  getProducts() {
    return this._products;
  }

  setProducts(products) {
    this._products = products;
  }
}
