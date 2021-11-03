
export default class SagaParams {
  _order = null;
  _customer = null;

  getOrder() {
    return this._order;
  }

  setOrder(order) {
    this._order = order;
  }

  getCustomer() {
    return this._customer;
  }

  setCustomer(customer) {
    this._customer = customer;
  }
}
