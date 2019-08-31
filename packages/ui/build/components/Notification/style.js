"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Close = exports.Text = exports.MessageGap = exports.MessageWrap = exports.Message = exports.NotificationContainer = exports.defaultTheme = void 0;

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _scCompanion = require("sc-companion");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

var defaultTheme = {
  message: {
    border: {
      color: 'lightgray'
    }
  },
  zIndex: 0
};
exports.defaultTheme = defaultTheme;
var mapType2Icon = {
  info: 'info_outline',
  error: 'new_releases',
  offline: 'sync_disabled',
  confirm: 'check_circle'
};

var getMessageIcon = function getMessageIcon(_ref) {
  var type = _ref.type,
      iconCode = _ref.icon;

  if (iconCode) {
    return iconCode;
  }

  if (type && mapType2Icon[type]) {
    return mapType2Icon[type];
  }

  return 'info_outline';
};

var appear = (0, _styledComponents.keyframes)(["from{transform:translate(100%);}to{transform:translate(0);}"]);
var disappear = (0, _styledComponents.keyframes)(["from{opacity:1;transform:translate(0,0);}to{opacity:0;height:0;transform:translate(0,-20px);}"]);

var NotificationContainer = _styledComponents.default.div.withConfig({
  displayName: "style__NotificationContainer",
  componentId: "sc-1otqkd-0"
})(["position:fixed;top:5rem;right:0;z-index:", ";"], function (props) {
  return props.theme.zIndex;
});

exports.NotificationContainer = NotificationContainer;

var Message = _styledComponents.default.div.withConfig({
  displayName: "style__Message",
  componentId: "sc-1otqkd-1"
})(["margin-right:0.5rem;background-color:white;animation:", " 0.25s ease;", " border:1px solid ", ";border-radius:2px;position:relative;box-shadow:4px 6px 15px -4px rgba(0,0,0,0.21);overflow-x:hidden;padding:0.5rem 2.5rem 0.5rem 0;width:20rem;"], appear, function (props) {
  return props.closable ? 'padding-right: 3rem;' : '';
}, function (props) {
  return props.theme.message.border.color;
});

exports.Message = Message;

var MessageWrap = _styledComponents.default.div.withConfig({
  displayName: "style__MessageWrap",
  componentId: "sc-1otqkd-2"
})(["", ""], function (props) {
  return props.closing ? (0, _styledComponents.css)(["animation:", " 0.5s ease;animation-fill-mode:forwards;overflow:hidden;"], disappear) : '';
});

exports.MessageWrap = MessageWrap;

var MessageGap = _styledComponents.default.div.withConfig({
  displayName: "style__MessageGap",
  componentId: "sc-1otqkd-3"
})(["padding-bottom:1rem;"]);

exports.MessageGap = MessageGap;

var Text = _styledComponents.default.div.withConfig({
  displayName: "style__Text",
  componentId: "sc-1otqkd-4"
})(["", " &:before{line-height:100%;}"], function (props) {
  return (0, _scCompanion.iconLabel)(getMessageIcon(props), '1.3rem', '0', 'baseline', '2.5rem');
});

exports.Text = Text;

var Close = _styledComponents.default.div.withConfig({
  displayName: "style__Close",
  componentId: "sc-1otqkd-5"
})(["position:absolute;top:0;right:0;", " cursor:pointer;"], (0, _scCompanion.icon)('close', '1rem', '0.7rem'));

exports.Close = Close;