/**
 * Forces a number observable to be wrapped around the specified inclusive range [min, max].
 * Optionally, options.onWrap will be called back when 'wrap' occur
 * (i.e. any write attempt of the value out of the range).
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
  if (options.max < options.min) {
    throw new Error("expected options.min < options.max");
  }
 
  var wrapped = ko.computed({
    read: target,
    write: function(value) {
      if (value < options.min) {
        setTimeout(function() {
          target((value - options.min) % (options.max - options.min + 1) + options.max + 1);
        }, 0);
        if (options.onWrap) {
          options.onWrap.call(options.onWrapOwner, false);
        }
      } else if (options.max < value) {
        setTimeout(function() {
          target((value - options.min) % (options.max - options.min + 1) + options.min);
        }, 0);
        if (options.onWrap) {
          options.onWrap.call(options.onWrapOwner, true);
        }
      } else {
        setTimeout(function() { target(value); }, 0);
      }
    }
  });
  
  wrapped(target());
  
  return wrapped;
};
