
export default class SagaParams {
  _plan = null;

  getPlan() {
    return this._plan;
  }

  setPlan(plan) {
    this._plan = plan;
  }
}
