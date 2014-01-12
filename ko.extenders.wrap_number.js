/**
 * Forces an number observable to be wrapped around the specified inclusive range [min, max].
 * If specified, options.onWrap will be called back when the 'wrapping' occurs
 * (i.e. the write attempt of the value out of the range).
 * options.onWrap will be called with an argument false on underflow, or true on overflow.
 *
 * @param {ko.observable} target
 * @param {{min: number, max: number, onWrap: ?function(boolean), onWrapOwner: ?*}} options
 * @return {ko.computed} wrapped target
 */
ko.extenders.wrapNumber = function(target, options) {
  if (typeof options.max !== "number") {
    throw new Error("expected a number for options.max, but got " + typeof options.max);
  }
  if (typeof options.min !== "number") {
    throw new Error("expected a number for options.min, but got " + typeof options.min);
  }
 
  return ko.computed({
    read: target,
    write: function(value) {
      if (value < options.min) {
        setTimeout(function() { target(options.max); }, 0);
        if (options.onWrap) {
          options.onWrap.call(options.onWrapOwner, false);
        }
      } else if (options.max < value) {
        setTimeout(function() { target(options.min); }, 0);
        if (options.onWrap) {
          options.onWrap.call(options.onWrapOwner, true);
        }
      } else {
        setTimeout(function() { target(value); }, 0);
      }
    }
  })(target());
};
