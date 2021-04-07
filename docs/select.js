"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Select = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }

var getTemplate = function getTemplate() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var placeholder = arguments.length > 1 ? arguments[1] : undefined;
  var selectedId = arguments.length > 2 ? arguments[2] : undefined;
  var text = placeholder !== null && placeholder !== void 0 ? placeholder : 'Placeholder default';
  var items = data.map(function (item) {
    var cls = '';

    if (item.id === selectedId) {
      text = item.value;
      cls = 'selected';
    }

    return "\n            <li class=\"select__item ".concat(cls, "\" data-type=\"item\" data-id=\"").concat(item.id, "\">").concat(item.value, "</li>\n        ");
  }); //.join('') - приводим массив к строке

  return "\n        <div class=\"select__backdrop\" data-type=\"backdrop\"></div>        \n        <div class=\"select__input\" data-type=\"input\">\n            <span data-type=\"value\">".concat(text, "</span>\n            <i class=\"fas fa-caret-down\" data-type=\"arrow\"></i>\n        </div>\n        <div class=\"select__dropdown\">\n            <ul class=\"select__list\">\n                ").concat(items.join(''), "\n            </ul>\n        </div>\n    ");
};

var _render = new WeakSet();

var _setup = new WeakSet();

var Select = /*#__PURE__*/function () {
  function Select(selector, options) {
    _classCallCheck(this, Select);

    _setup.add(this);

    _render.add(this);

    this.$el = document.querySelector(selector);
    this.options = options;
    this.selectedId = options.selectedId;

    _classPrivateMethodGet(this, _render, _render2).call(this);

    _classPrivateMethodGet(this, _setup, _setup2).call(this);
  }

  _createClass(Select, [{
    key: "clickHandler",
    value: function clickHandler(event) {
      var type = event.target.dataset.type;

      if (type === 'input' || type === 'arrow') {
        this.toggle();
      } else if (type === 'item') {
        var id = event.target.dataset.id;
        this.select(id);
      } else if (type === 'backdrop') {
        this.close();
      }
    }
  }, {
    key: "isOpen",
    get: function get() {
      return this.$el.classList.contains('open');
    }
  }, {
    key: "current",
    get: function get() {
      var _this = this;

      return this.options.data.find(function (item) {
        return item.id === _this.selectedId;
      });
    }
  }, {
    key: "toggle",
    value: function toggle() {
      this.isOpen ? this.close() : this.open();
    }
  }, {
    key: "select",
    value: function select(id) {
      this.selectedId = id;
      this.$value.textContent = this.current.value;
      this.$el.querySelectorAll('[data-type="item"]').forEach(function (element) {
        element.classList.remove('selected');
      });
      this.$el.querySelector("[data-id=\"".concat(id, "\"]")).classList.add('selected');
      this.options.onSelect ? this.options.onSelect(this.current) : null;
      this.close();
    }
  }, {
    key: "open",
    value: function open() {
      this.$el.classList.add('open');
      this.$arrow.classList.remove('fa-caret-down');
      this.$arrow.classList.add('fa-caret-up');
    }
  }, {
    key: "close",
    value: function close() {
      this.$el.classList.remove('open');
      this.$arrow.classList.remove('fa-caret-up');
      this.$arrow.classList.add('fa-caret-down');
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.$el.removeEventListener('click', this.clickHandler);
      this.$el.innerHTML = '';
    }
  }]);

  return Select;
}();

exports.Select = Select;

function _render2() {
  var _this$options = this.options,
      placeholder = _this$options.placeholder,
      data = _this$options.data;
  this.$el.classList.add('select');
  this.$el.innerHTML = getTemplate(data, placeholder, this.selectedId);
}

function _setup2() {
  this.clickHandler = this.clickHandler.bind(this);
  this.$el.addEventListener('click', this.clickHandler);
  this.$arrow = this.$el.querySelector('[data-type="arrow"]');
  this.$value = this.$el.querySelector('[data-type="value"]');
}