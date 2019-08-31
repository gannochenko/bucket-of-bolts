'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true,
});
exports.Buttons = exports.Question = exports.Cross = exports.PanelOffset = exports.Panel = exports.Overlay = exports.defaultTheme = void 0;

var _styledComponents = _interopRequireWildcard(require('styled-components'));

var _scCompanion = require('sc-companion');

function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
        return obj;
    } else {
        var newObj = {};
        if (obj != null) {
            for (var key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) {
                    var desc =
                        Object.defineProperty && Object.getOwnPropertyDescriptor
                            ? Object.getOwnPropertyDescriptor(obj, key)
                            : {};
                    if (desc.get || desc.set) {
                        Object.defineProperty(newObj, key, desc);
                    } else {
                        newObj[key] = obj[key];
                    }
                }
            }
        }
        newObj.default = obj;
        return newObj;
    }
}

var defaultTheme = {
    grid: {
        resolution: 12,
        breakpoints: {
            xs: [null, 767],
            // max-width: 767
            sm: [768, 991],
            // min-width: 768 and max-width: 991
            md: [992, 1199],
            // min-width: 992 and max-width: 1199
            lg: [1200, null], // min-width: 1200
        },
    },
    cross: {
        color: {
            hover: '#000',
            hout: '#000',
        },
        overlay: {
            zIndex: 0,
        },
    },
};
exports.defaultTheme = defaultTheme;
var appear = (0, _styledComponents.keyframes)([
    'from{transform:translateY(-40px);opacity:0;}to{transform:translate(0);opacity:1;}',
]);

var Overlay = _styledComponents.default.div.withConfig({
    displayName: 'style__Overlay',
    componentId: 'pk5ms6-0',
})(
    ['', ' ', ' overflow-y:auto;background-color:#1b273333;z-index:', ';', ''],
    function(props) {
        return (0, _scCompanion.align)(
            props.central ? 'center' : 'top',
            'center',
        );
    },
    (0, _scCompanion.fixedCover)(),
    function(props) {
        return props.theme.overlay.zIndex;
    },
    function(props) {
        return (0, _scCompanion.media)(
            {
                all: 'padding: 2rem 0;',
                xs: 'padding: 0;',
            },
            props.theme.grid,
        );
    },
);

exports.Overlay = Overlay;

var Panel = _styledComponents.default.div.withConfig({
    displayName: 'style__Panel',
    componentId: 'pk5ms6-1',
})(
    [
        'max-height:none;background-color:white;border-radius:2px;border:1px solid #868b9940;box-shadow:0 8px 10px 0 #0000000d;position:relative;min-width:10rem;',
        ' animation:',
        ' 200ms ease;',
        '',
    ],
    function(props) {
        return (0, _scCompanion.media)(
            {
                all: 'max-width: 50rem;',
                xs: 'max-width: none; width: 100%;',
            },
            props.theme.grid,
        );
    },
    appear,
    function(props) {
        return (0, _scCompanion.media)(
            {
                xs: 'animation: none;',
            },
            props.theme.grid,
        );
    },
);

exports.Panel = Panel;

var PanelOffset = _styledComponents.default.div.withConfig({
    displayName: 'style__PanelOffset',
    componentId: 'pk5ms6-2',
})(['padding:1.5rem;']);

exports.PanelOffset = PanelOffset;

var Cross = _styledComponents.default.div.withConfig({
    displayName: 'style__Cross',
    componentId: 'pk5ms6-3',
})(
    ['', ' position:absolute;top:0;right:0;cursor:pointer;', ''],
    (0, _scCompanion.icon)('close', '1rem', '0.5rem'),
    function(props) {
        return (0, _scCompanion.fgColor)(
            props.theme.cross.color.hout,
            props.theme.cross.color.hover,
            '200ms',
        );
    },
);

exports.Cross = Cross;

var Question = _styledComponents.default.div.withConfig({
    displayName: 'style__Question',
    componentId: 'pk5ms6-4',
})(['font-size:1rem;padding-bottom:1rem;']);

exports.Question = Question;

var Buttons = _styledComponents.default.div.withConfig({
    displayName: 'style__Buttons',
    componentId: 'pk5ms6-5',
})(['', ''], (0, _scCompanion.group)(null, '0.5rem'));

exports.Buttons = Buttons;
