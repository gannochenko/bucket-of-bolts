"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filterStructure = exports.getValidator = void 0;

var yup = _interopRequireWildcard(require("yup"));

var _vault = require("./vault");

var _util = require("./util");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var cache = new Map();

var getValidator = function getValidator(dto) {
  var depth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

  if (depth > 30) {
    return null;
  }

  var vault = (0, _vault.getVaultFor)(dto);

  if (!vault || !vault.isDTO) {
    return null;
  }

  if (depth === 1 && cache.has(dto)) {
    return cache.get(dto);
  }

  var result = yup.object();
  var attributes = vault.attributes;

  if (!(0, _util.isObjectNotEmpty)(attributes)) {
    return result;
  }

  Object.keys(attributes).forEach(function (attributeName) {
    var _attributes$attribute = attributes[attributeName].params,
        required = _attributes$attribute.required,
        type = _attributes$attribute.type;
    var shape = {};
    var subType = null;
    var fieldType;
    var isArr = false;

    if ((0, _util.isArray)(type)) {
      var _ref = type;

      var _ref2 = _slicedToArray(_ref, 1);

      fieldType = _ref2[0];
      isArr = true;
    } else {
      fieldType = type;
    }

    if (typeof fieldType === 'function') {
      subType = getValidator(fieldType, depth + 1);
    } else {
      // only basic stuff so far
      if (fieldType === 'string') {
        subType = yup.string();
      } else if (fieldType === 'number') {
        subType = yup.number();
      } else if (fieldType === 'boolean') {
        subType = yup.boolean();
      } else {
        subType = yup.string();
      }
    }

    if (subType === null) {
      throw new Error("No DTO found for \"".concat(attributeName, "\" attribute"));
    }

    if (isArr) {
      subType = yup.array().of(subType);
    }

    if (required) {
      subType = subType.required();
    } // todo: show "path" here


    subType = subType.typeError("Member \"".concat(attributeName, "\" should be of type \"").concat(type, "\""));
    shape[attributeName] = subType;
    result = result.shape(shape);
  });

  if (depth === 1) {
    cache.set(dto, result);
  }

  return result;
};

exports.getValidator = getValidator;

var filterStructure = function filterStructure(structure, dto) {
  var depth = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

  if (depth > 30) {
    return {};
  }

  var vault = (0, _vault.getVaultFor)(dto);

  if (!vault || !vault.isDTO) {
    return {};
  }

  var attributes = vault.attributes;

  if (!(0, _util.isObjectNotEmpty)(attributes)) {
    return {};
  }

  var legalKeys = (0, _util.intersection)(Object.keys(structure), Object.keys(attributes));
  var result = {};
  legalKeys.forEach(function (key) {
    var attribute = attributes[key];
    var type = attribute.params.type;
    var structureValue = structure[key];

    if ((0, _util.isArray)(type)) {
      var _type = _slicedToArray(type, 1),
          subType = _type[0];

      if ((0, _util.isArray)(structure[key])) {
        // check each subitem
        if (typeof subType === 'function') {
          result[key] = structureValue.map(function (subValue) {
            return filterStructure(subValue, subType, depth + 1);
          });
        } else {
          result[key] = structureValue;
        }
      } else {
        result[key] = [];
      }
    } else {
      if (typeof type === 'function') {
        result[key] = filterStructure(structureValue, type, depth + 1);
      } else {
        result[key] = structureValue;
      }
    }
  });
  return result;
};

exports.filterStructure = filterStructure;