
export default class SagaParams {
  _orderUuid = null;
  _order = null;
  _customer = null;

  getOrderUuid() {
    return this._orderUuid;
  }

  setOrderUuid(orderUuid) {
    this._orderUuid = orderUuid;
  }

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
