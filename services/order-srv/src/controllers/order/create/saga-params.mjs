
export default class SagaParams {
  _orderUuid = null;
  _order = null;

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
}
