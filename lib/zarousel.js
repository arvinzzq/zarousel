'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Dots = require('./Dots');

var _Dots2 = _interopRequireDefault(_Dots);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function setStyle(target, styles) {
  var style = target.style;

  Object.keys(styles).forEach(function (attri) {
    style[attri] = styles[attri];
  });
}

var Zarousel = function (_ref) {
  _inherits(Zarousel, _ref);

  function Zarousel() {
    var _ref2;

    var _temp, _this, _ret;

    _classCallCheck(this, Zarousel);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref2 = Zarousel.__proto__ || Object.getPrototypeOf(Zarousel)).call.apply(_ref2, [this].concat(args))), _this), _this.state = {
      indexActive: 0
    }, _this.startAutoPlay = function () {
      var autoPlayInterval = _this.props.autoPlayInterval;

      _this.autoPlayTimer = setInterval(_this.goNext, autoPlayInterval);
    }, _this.clearAutoPlay = function () {
      clearInterval(_this.autoPlayTimer);
    }, _this.handleDotClick = function (index) {
      return function () {
        _this.setState({
          indexActive: index
        });
        _this.swipeTo(index);
      };
    }, _this.handleMouseEnter = function () {
      var autoPlay = _this.props.autoPlay;

      autoPlay && _this.clearAutoPlay();
    }, _this.handleMouseLeave = function () {
      var autoPlay = _this.props.autoPlay;

      autoPlay && _this.startAutoPlay();
    }, _this.calcRealIndex = function (index) {
      var children = _this.props.children;

      var len = children.length;
      var realIndex = index;
      if (index < 0) {
        realIndex = len - 1;
      } else if (index > len - 1) {
        realIndex = 0;
      }
      return realIndex;
    }, _this.goNext = function () {
      var indexActive = _this.state.indexActive;

      _this.swipeTo(indexActive + 1);
    }, _this.goPrev = function () {
      var indexActive = _this.state.indexActive;

      _this.swipeTo(indexActive - 1);
    }, _this.resetPosition = function (index) {
      var _this$props = _this.props,
          transitionDuration = _this$props.transitionDuration,
          children = _this$props.children;

      var len = children.length;
      var translateDistance = index < 0 ? (len - 1) * _this.zarouselContainerWidth : 0;
      setTimeout(function () {
        setStyle(_this.zarouselList, {
          transform: 'translateX(-' + translateDistance + 'px)',
          'transitionDuration': '0ms'
        });
        _this.isSwiping = false;
      }, transitionDuration);
    }, _this.swipeTo = function (index) {
      var _this$props2 = _this.props,
          children = _this$props2.children,
          transitionDuration = _this$props2.transitionDuration;

      var len = children.length;
      if (_this.isSwiping) {
        return;
      }
      _this.isSwiping = true;
      if (index < 0 || index > len - 1) {
        // 复制的元素的情况
        _this.setState({
          indexActive: _this.calcRealIndex(index)
        }, function () {
          _this.translate(index);
          _this.resetPosition(index);
        });
      } else {
        // 正常情况下的切换
        _this.setState({
          indexActive: _this.calcRealIndex(index)
        }, function () {
          _this.translate(index);
          setTimeout(function () {
            _this.isSwiping = false;
          }, transitionDuration);
        });
      }
    }, _this.translate = function (index) {
      var transitionDuration = _this.props.transitionDuration;

      var translateDistance = -(_this.zarouselContainerWidth * index);
      setStyle(_this.zarouselList, {
        transform: 'translateX(' + translateDistance + 'px)',
        'transitionDuration': transitionDuration + 'ms'
      });
    }, _this.getZarouselContainer = function (zarousel) {
      _this.zarouselContainer = zarousel;
    }, _this.getZarouselList = function (list) {
      _this.zarouselList = list;
    }, _this.getZarouselContainerWidth = function () {
      _this.zarouselContainerWidth = _this.zarouselContainer.getBoundingClientRect().width;
    }, _this.setZarouselListWidth = function (countElements) {
      setStyle(_this.zarouselList, {
        width: _this.zarouselContainerWidth * countElements + 'px'
      });
    }, _this.setChildrenWidth = function (childrenList) {
      var len = childrenList.length;
      for (var i = 0; i < len; i++) {
        setStyle(childrenList[i], {
          width: 100 / len + '%'
        });
      }
    }, _this.setInitPosition = function () {
      setStyle(_this.zarouselList, {
        marginLeft: '-' + _this.zarouselContainerWidth + 'px'
      });
    }, _this.createChildren = function (children) {
      var len = _react.Children.count(children);
      if (len <= 1) {
        return children;
      }
      var createdChildren = new Array(len + 2);
      createdChildren[0] = children[len - 1];
      createdChildren[len + 1] = children[0];
      _react.Children.forEach(children, function (child, index) {
        createdChildren[index + 1] = child;
      });
      return _react.Children.map(createdChildren, function (child, index) {
        return (0, _react.cloneElement)(child, {
          key: index,
          style: {
            float: 'left',
            height: '100%',
            width: _this.zarouselContainerWidth
          }
        });
      });
    }, _this.getStyleArrow = function (type) {
      var sizeArrow = _this.props.sizeArrow;

      return _defineProperty({
        display: 'inline-block',
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        width: sizeArrow.width,
        height: sizeArrow.height,
        borderRadius: '50%',
        backgroundColor: '#eee'
      }, type, 10);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Zarousel, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.init();
    }
  }, {
    key: 'init',
    value: function init() {
      var autoPlay = this.props.autoPlay;

      var childrenList = this.zarouselList.children;
      this.getZarouselContainerWidth();
      this.setZarouselListWidth(childrenList.length);
      this.setChildrenWidth(childrenList);
      this.setInitPosition();
      autoPlay && this.startAutoPlay();
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          children = _props.children,
          className = _props.className,
          showArrow = _props.showArrow,
          colorDot = _props.colorDot,
          sizeDot = _props.sizeDot;
      var indexActive = this.state.indexActive;

      return _react2.default.createElement(
        'div',
        {
          ref: this.getZarouselContainer,
          className: (0, _classnames2.default)('zarousel-container', className),
          onMouseEnter: this.handleMouseEnter,
          onMouseLeave: this.handleMouseLeave
        },
        _react2.default.createElement(
          'div',
          {
            ref: this.getZarouselList,
            className: 'zarousel-list' },
          this.createChildren(children)
        ),
        showArrow && _react2.default.createElement('div', {
          className: 'zarousel-icon--arrow arrow--next',
          style: this.getStyleArrow('right'),
          onClick: this.goNext
        }),
        showArrow && _react2.default.createElement('div', {
          className: 'zarousel-icon--arrow arrow--prev',
          style: this.getStyleArrow('left'),
          onClick: this.goPrev
        }),
        _react2.default.createElement(_Dots2.default, {
          items: children,
          indexActive: indexActive,
          colorDot: colorDot,
          sizeDot: sizeDot,
          handleDotClick: this.handleDotClick
        })
      );
    }
  }]);

  return Zarousel;
}(_react.PureComponent || _react.Component);

Zarousel.propTypes = {
  autoPlay: _propTypes2.default.bool,
  autoPlayInterval: _propTypes2.default.number,
  transitionDuration: _propTypes2.default.number,
  showArrow: _propTypes2.default.bool,
  sizeArrow: _propTypes2.default.object,
  colorDot: _propTypes2.default.string,
  sizeDot: _propTypes2.default.object
};
Zarousel.defaultProps = {
  autoPlay: false,
  autoPlayInterval: 3000,
  transitionDuration: 300,
  showArrow: false,
  sizeArrow: {
    width: 30,
    height: 30
  },
  colorDot: '#333',
  sizeDot: {
    width: 10,
    height: 10
  }
};
exports.default = Zarousel;
