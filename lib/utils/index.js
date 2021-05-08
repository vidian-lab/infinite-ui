'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// 时间格式化
var dateFormat = exports.dateFormat = function dateFormat(dateTime, valueFormat) {
  var WEEKS = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
  var newDate = new Date(dateTime);
  valueFormat = valueFormat || 'yyyy-MM-dd';
  var date = {
    'yy': newDate.getFullYear(),
    'MM': newDate.getMonth() + 1,
    'dd': newDate.getDate(),
    'hh': newDate.getHours(),
    'mm': newDate.getMinutes(),
    'ss': newDate.getSeconds(),
    'D': WEEKS[newDate.getDay()]
    // 输出年 y+:匹配1个到多个y,i:忽略大小写
  };if (/(y+)/i.test(valueFormat)) {
    valueFormat = valueFormat.replace(RegExp.$1, (newDate.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  // 输出月、日、时、分、秒、星期
  Object.keys(date).forEach(function (i) {
    // 只有写成`(${i})`形式，才能在正则表达式中捕获子匹配，进而才能用到RegExp.$1的值
    if (new RegExp('(' + i + ')').test(valueFormat)) {
      // 判断，如果时间为一位数，则在前面加'0'
      if (RegExp.$1.length === 2) {
        if (date[i] < 10) {
          date[i] = '0' + date[i];
        }
      }
      // 替换初始化函数时候传入yyyy-mm-dd hh:mm:ss D
      valueFormat = valueFormat.replace(RegExp.$1, date[i]);
    }
  });
  return valueFormat;
};

// 处理百分比
var percentFormat = exports.percentFormat = function percentFormat(value) {
  if (!value) return '0%';
  value = value * 100;
  return String(value).indexOf('.') > 0 ? value.toFixed(1) + '%' : parseInt(value) + '%';
};

// 处理千位分隔
var numFormat = exports.numFormat = function numFormat(value) {
  if (!value) return 0;
  var reg = /\d{1,3}(?=(\d{3})+$)/g;
  if (String(value).indexOf('.') > 0) {
    var list = value.toFixed(1).split('.');
    list[0] = String(list[0]).replace(reg, '$&,');
    return list.join('.');
  } else {
    return String(value).replace(reg, '$&,');
  }
};

// 驼峰转中划线
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = exports.hyphenate = function hyphenate(str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase();
};

// 处理浮点数或整数(浮点数取一位/整数不做处理)  问题: floatIntFormat(0.58*100) 返回 58.0
var floatIntFormat = exports.floatIntFormat = function floatIntFormat(value) {
  if (!value) return 0;
  if (String(value).indexOf('.') > 0) {
    return value.toFixed(1);
  } else {
    return value;
  }
};

// 颜色组
var color = exports.color = ['#1890FF', '#2FC25B', '#FACC14', '#223273', '#8543E0', '#13C2C2', '#3436C7', '#F04864'];

// axis配置类

var AxisOption = exports.AxisOption = function AxisOption(type, axisColor, showGrid) {
  _classCallCheck(this, AxisOption);

  var axisOption = { label: { textStyle: { fill: axisColor.labelColor } }, line: {} };
  if (type === 'x' || type === 'name') {
    axisOption['line']['stroke'] = axisColor.lineColor;
    return axisOption;
  } else {
    if (showGrid === false) {
      axisOption['grid'] = null;
    }
    return axisOption;
  }
};

// json数据平铺
/**
 * @param {Array} json 数据源
 * @param {Object} props 传入的配置，目前值提供children
 * @param {Boolean} beforeInsert 是否提前插入
 * @param {Number} hierarchy 遍历层级，默认所有级别
 * 
*/


var jsonFlat = exports.jsonFlat = function jsonFlat(json) {
  var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { children: 'children' };
  var beforeInsert = arguments[2];
  var hierarchy = arguments[3];
  var children = props.children;

  var result = [];
  var jsonFlatting = function jsonFlatting(data) {
    var cpdHierarchy = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

    data.forEach(function (item) {
      // 相同级别移除children
      if (hierarchy === cpdHierarchy) {
        delete item[children];
      }
      beforeInsert && result.push(item);
      if (item[children] && item[children].length && (!hierarchy || hierarchy >= cpdHierarchy)) {
        jsonFlatting(item[children], cpdHierarchy + 1);
      }
      !beforeInsert && result.push(item);
    });
  };
  jsonFlatting(json);
  return result;
};
var uuidv4 = exports.uuidv4 = function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0;var v = c === 'x' ? r : r & 0x3 | 0x8;
    return v.toString(16);
  });
};
exports.default = {
  dateFormat: dateFormat,
  percentFormat: percentFormat,
  numFormat: numFormat,
  floatIntFormat: floatIntFormat,
  color: color,
  AxisOption: AxisOption,
  jsonFlat: jsonFlat,
  uuidv4: uuidv4,
  hyphenate: hyphenate
};