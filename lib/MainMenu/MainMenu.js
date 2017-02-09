'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(['\n  0% {\n    transform: translateX(0%);\n  }\n  100% {\n    transform: translateX(100%);\n  }\n'], ['\n  0% {\n    transform: translateX(0%);\n  }\n  100% {\n    transform: translateX(100%);\n  }\n']),
    _templateObject2 = _taggedTemplateLiteral(['\nposition: absolute;\nheight: 100%;\nwidth: 10em;\ntransition: ', ' 0.3s ease-in-ease-out 0;\n'], ['\nposition: absolute;\nheight: 100%;\nwidth: 10em;\ntransition: ', ' 0.3s ease-in-ease-out 0;\n']),
    _templateObject3 = _taggedTemplateLiteral(['\n  display: flex;\n  flex-direction: row;\n  list-style-type: none;\n  @media(max-width: ', ') {\n    flex-direction:column;\n  }\n'], ['\n  display: flex;\n  flex-direction: row;\n  list-style-type: none;\n  @media(max-width: ', ') {\n    flex-direction:column;\n  }\n']);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _NavItem = require('./NavItem/NavItem');

var _NavItem2 = _interopRequireDefault(_NavItem);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var moveX = (0, _styledComponents.keyframes)(_templateObject);

var Drawer = _styledComponents2.default.div(_templateObject2, moveX);

var StyledList = _styledComponents2.default.ul(_templateObject3, function (props) {
  return props.theme.md;
});

var MainMenu = function (_React$Component) {
  _inherits(MainMenu, _React$Component);

  function MainMenu(props) {
    _classCallCheck(this, MainMenu);

    var _this = _possibleConstructorReturn(this, (MainMenu.__proto__ || Object.getPrototypeOf(MainMenu)).call(this, props));

    _this.state = {
      open: false
    };
    return _this;
  }

  _createClass(MainMenu, [{
    key: 'handleToggle',
    value: function handleToggle() {
      this.setState({
        open: !this.state.open
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          onItemClick = _props.onItemClick,
          items = _props.items;

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement('div', { onClick: this.handleToggle }),
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            StyledList,
            null,
            items.map(function (item) {
              return _react2.default.createElement(
                'li',
                { key: item.name },
                _react2.default.createElement(_NavItem2.default, { name: item.name, onClick: onItemClick })
              );
            })
          )
        )
      );
    }
  }]);

  return MainMenu;
}(_react2.default.Component);

exports.default = MainMenu;