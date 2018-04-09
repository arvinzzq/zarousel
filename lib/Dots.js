'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Dots = function (_ref) {
  _inherits(Dots, _ref);

  function Dots() {
    var _ref2;

    var _temp, _this, _ret;

    _classCallCheck(this, Dots);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref2 = Dots.__proto__ || Object.getPrototypeOf(Dots)).call.apply(_ref2, [this].concat(args))), _this), _this.getStyleDot = function (index) {
      var _this$props = _this.props,
          indexActive = _this$props.indexActive,
          colorDot = _this$props.colorDot,
          sizeDot = _this$props.sizeDot;

      return {
        width: sizeDot.width,
        height: sizeDot.height,
        marginLeft: 5,
        backgroundColor: index === indexActive ? colorDot : '#e5e5e5'
      };
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Dots, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          items = _props.items,
          indexActive = _props.indexActive,
          handleDotClick = _props.handleDotClick;

      return _react2.default.createElement(
        'ul',
        {
          className: 'zarousel-dot-list'
        },
        items.map(function (item, index) {
          return _react2.default.createElement('li', {
            className: (0, _classnames2.default)('zarousel-dot', {
              'zarousel-dot--active': index === indexActive
            }),
            key: index,
            style: _this2.getStyleDot(index),
            onClick: handleDotClick(index)
          });
        })
      );
    }
  }]);

  return Dots;
}(_react.PureComponent || _react.Component);

exports.default = Dots;