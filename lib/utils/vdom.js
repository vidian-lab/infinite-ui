'use strict';

var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.__esModule = true;

var _typeof = typeof Symbol === 'function' && _typeof2(Symbol.iterator) === 'symbol' ? function (obj) {
  return typeof obj === 'undefined' ? 'undefined' : _typeof2(obj);
} : function (obj) {
  return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' : typeof obj === 'undefined' ? 'undefined' : _typeof2(obj);
};

exports.isVNode = isVNode;

var _util = require('element-ui/lib/utils/util');

function isVNode(node) {
  return node !== null && (typeof node === 'undefined' ? 'undefined' : _typeof(node)) === 'object' && (0, _util.hasOwn)(node, 'componentOptions');
};