
export default class SagaParams {
  _planUuid = null;
  _plan = null;

  getPlanUuid() {
    return this._planUuid;
  }

  setPlanUuid(planUuid) {
    this._planUuid = planUuid;
  }

  getPlan() {
    return this._plan;
  }

  setPlan(plan) {
    this._plan = plan;
  }
}
