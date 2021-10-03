
export default class CreateSagaParams {
  _user = null;
  _userUuid = null;
  _customerUuid = null;
  _auth = null;

  setUser(user) {
    this._user = user;
  }

  getUser() {
    return this._user;
  }

  setUserUuid(uuid) {
    this._userUuid = uuid;
  }

  getUserUuid() {
    return this._userUuid;
  }

  setCustomerUuid(uuid) {
    this._customerUuid = uuid;
  }

  getCustomerUuid() {
    return this._customerUuid;
  }

  setAuthData(data) {
    this._auth = data;
  }

  getAuthData() {
    return this._auth;
  }
}
