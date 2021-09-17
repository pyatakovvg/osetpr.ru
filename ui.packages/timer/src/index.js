
window.requestAnimFrame = (function () {
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 60);
    };
})();

window.cancelAnimationFrame = (instance => {
  return window.cancelAnimationFrame  ||
    window.webkitCancelAnimationFrame ||
    window.mozCancelAnimationFrame  ||
    function () {
      window.clearInterval(instance);
    };
})();


export function Timeout() {

  this._stop = false;
  this._start = 0;
  this._stopTime = 0;
  this._requestId = null;
}

Timeout.prototype._loop = function(callback) {

  if (this._stop) {
    return;
  }

  const currentTime = Math.round(Date.now() / 1000);

  if (currentTime >= this._stopTime) {
    callback();
    this.reset();
  }

  this._requestId = window.requestAnimationFrame(this._loop.bind(this, callback));
};

Timeout.prototype.start = function(callback, timestamp) {
  if ( ! this._requestId) {
    this._stop = false;
    this._stopTime = Math.round(Date.now() / 1000) + timestamp;
    this._requestId = this._loop.call(this, callback, timestamp);
  }
};

Timeout.prototype.reset = function() {
  if (this._requestId) {
    window.cancelAnimationFrame(this._requestId);
    this._requestId = null;
    this._stop = true;
  }
};
