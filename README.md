ko.extenders.wrap_number.js
===========================

ko.extenders.wrapNumber is a knockout.js extender that forces an number observable to be wrapped around the specified inclusive range.

Usage
-----

```html
<input type="text" data-bind="value: four"/>
<button data-bind="click: function() { four(four() + 1) }">+1</button>
<button data-bind="click: function() { four(four() - 1) }">-1</button>
```

```javascript
ko.applyBindings({
  four: ko.observable(1).extend({
    wrapNumber: {
      min: 1,
      max: 4,
      onWrap: function(isOverflow) { console.log(isOverflow ? "four -> one" : "one -> four") }
    }
  })
})
```
