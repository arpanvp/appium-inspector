<<<<<<< HEAD
process.env.HMR_PORT=41911;process.env.HMR_HOSTNAME="localhost";// modules are defined as an array
=======
<<<<<<< HEAD
<<<<<<< HEAD
process.env.HMR_PORT=45287;process.env.HMR_HOSTNAME="localhost";// modules are defined as an array
=======
process.env.HMR_PORT=36581;process.env.HMR_HOSTNAME="localhost";// modules are defined as an array
>>>>>>> 05af0dcf070fcba08d3613ff99927cd8628cbe34
>>>>>>> 9e3ada82945d0b52eead1284feb019b01a0ef302
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"polyfills/browser.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.shell = exports.settings = exports.remote = exports.log = exports.ipcRenderer = exports.i18NextBackendOptions = exports.i18NextBackend = exports.clipboard = void 0;
const browser = {
  clipboard: {
    writeText: text => navigator.clipboard.writeText(text)
  },
  shell: {
    openExternal: url => window.open(url, '')
  },
  remote: {
    getCurrentWindow: () => ({
      getSize: () => [window.innerWidth, window.innerHeight]
    })
  },
  ipcRenderer: {
    on: evt => {
      console.warn(`Cannot listen for IPC event ${evt} in browser context`); // eslint-disable-line no-console
    }
  },

  fs: null,
  util: null
};
class BrowserSettings {
  has(key) {
    return this.get(key) !== null;
  }
  set(key, val) {
    return localStorage.setItem(key, JSON.stringify(val));
  }
  get(key) {
    return JSON.parse(localStorage.getItem(key));
  }
  getSync(key) {
    return this.get(key);
  }
}
const log = console;
exports.log = log;
const settings = new BrowserSettings();
exports.settings = settings;
const {
  clipboard,
  shell,
  remote,
  ipcRenderer
} = browser;
exports.ipcRenderer = ipcRenderer;
exports.remote = remote;
exports.shell = shell;
exports.clipboard = clipboard;
const i18NextBackend = require('i18next-chained-backend').default;
exports.i18NextBackend = i18NextBackend;
const i18NextBackendOptions = {
  backends: [require('i18next-localstorage-backend').default, require('i18next-http-backend').default],
  backendOptions: [{}, {
    loadPath: './locales/{{lng}}/{{ns}}.json'
  }]
};
exports.i18NextBackendOptions = i18NextBackendOptions;
},{}],"polyfills/electron.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "clipboard", {
  enumerable: true,
  get: function () {
    return _electron.clipboard;
  }
});
Object.defineProperty(exports, "fs", {
  enumerable: true,
  get: function () {
    return _fs.default;
  }
});
Object.defineProperty(exports, "i18NextBackend", {
  enumerable: true,
  get: function () {
    return _i18nextFsBackend.default;
  }
});
exports.i18NextBackendOptions = void 0;
Object.defineProperty(exports, "ipcRenderer", {
  enumerable: true,
  get: function () {
    return _electron.ipcRenderer;
  }
});
Object.defineProperty(exports, "log", {
  enumerable: true,
  get: function () {
    return _electronLog.default;
  }
});
Object.defineProperty(exports, "remote", {
  enumerable: true,
  get: function () {
    return _electron.remote;
  }
});
Object.defineProperty(exports, "settings", {
  enumerable: true,
  get: function () {
    return _electronSettings.default;
  }
});
Object.defineProperty(exports, "shell", {
  enumerable: true,
  get: function () {
    return _electron.shell;
  }
});
Object.defineProperty(exports, "util", {
  enumerable: true,
  get: function () {
    return _util.default;
  }
});
var _path = _interopRequireDefault(require("path"));
var _electron = require("electron");
var _electronLog = _interopRequireDefault(require("electron-log"));
var _electronSettings = _interopRequireDefault(require("electron-settings"));
var _i18nextFsBackend = _interopRequireDefault(require("i18next-fs-backend"));
var _fs = _interopRequireDefault(require("fs"));
var _util = _interopRequireDefault(require("util"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const i18NextBackendOptions = {
  loadPath: _path.default.join(__dirname, 'locales/{{lng}}/{{ns}}.json'),
  addPath: _path.default.join(__dirname, 'locales/{{lng}}/{{ns}}.json'),
  jsonIndent: 2
};
exports.i18NextBackendOptions = i18NextBackendOptions;
},{}],"polyfills/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.util = exports.shell = exports.settings = exports.remote = exports.log = exports.ipcRenderer = exports.i18NextBackendOptions = exports.i18NextBackend = exports.fs = exports.clipboard = void 0;
let log, settings, clipboard, shell, remote, ipcRenderer, i18NextBackend, i18NextBackendOptions, fs, util;
exports.util = util;
exports.fs = fs;
exports.i18NextBackendOptions = i18NextBackendOptions;
exports.i18NextBackend = i18NextBackend;
exports.ipcRenderer = ipcRenderer;
exports.remote = remote;
exports.shell = shell;
exports.clipboard = clipboard;
exports.settings = settings;
exports.log = log;
function buildForBrowser() {
  if (process.env.BUILD_BROWSER) {
    return true;
  }
  if (typeof navigator !== 'undefined' && !/electron/i.test(navigator.userAgent)) {
    return true;
  }
  return false;
}
if (buildForBrowser()) {
  ({
    log,
    settings,
    clipboard,
    shell,
    remote,
    ipcRenderer,
    i18NextBackend,
    i18NextBackendOptions,
    fs,
    util
  } = require('./browser'));
  exports.log = log, exports.settings = settings, exports.clipboard = clipboard, exports.shell = shell, exports.remote = remote, exports.ipcRenderer = ipcRenderer, exports.i18NextBackend = i18NextBackend, exports.i18NextBackendOptions = i18NextBackendOptions, exports.fs = fs, exports.util = util;
} else {
  ({
    log,
    settings,
    clipboard,
    shell,
    remote,
    ipcRenderer,
    i18NextBackend,
    i18NextBackendOptions,
    fs,
    util
  } = require('./electron'));
  exports.log = log, exports.settings = settings, exports.clipboard = clipboard, exports.shell = shell, exports.remote = remote, exports.ipcRenderer = ipcRenderer, exports.i18NextBackend = i18NextBackend, exports.i18NextBackendOptions = i18NextBackendOptions, exports.fs = fs, exports.util = util;
}
},{"./browser":"polyfills/browser.js","./electron":"polyfills/electron.js"}],"../shared/settings.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.SET_SAVED_GESTURES = exports.SESSION_SERVER_TYPE = exports.SESSION_SERVER_PARAMS = exports.SERVER_ARGS = exports.SAVED_SESSIONS = exports.SAVED_FRAMEWORK = void 0;
exports.getSetting = getSetting;
exports.setSetting = setSetting;
var _polyfills = require("../renderer/polyfills");
const SAVED_SESSIONS = 'SAVED_SESSIONS';
exports.SAVED_SESSIONS = SAVED_SESSIONS;
const SET_SAVED_GESTURES = 'SET_SAVED_GESTURES';
exports.SET_SAVED_GESTURES = SET_SAVED_GESTURES;
const SERVER_ARGS = 'SERVER_ARGS';
exports.SERVER_ARGS = SERVER_ARGS;
const SESSION_SERVER_PARAMS = 'SESSION_SERVER_PARAMS';
exports.SESSION_SERVER_PARAMS = SESSION_SERVER_PARAMS;
const SESSION_SERVER_TYPE = 'SESSION_SERVER_TYPE';
exports.SESSION_SERVER_TYPE = SESSION_SERVER_TYPE;
const SAVED_FRAMEWORK = 'SAVED_FRAMEWORK';
exports.SAVED_FRAMEWORK = SAVED_FRAMEWORK;
const DEFAULT_SETTINGS = {
  [SAVED_SESSIONS]: [],
  [SET_SAVED_GESTURES]: [],
  [SERVER_ARGS]: null,
  [SESSION_SERVER_PARAMS]: null,
  [SESSION_SERVER_TYPE]: null,
  [SAVED_FRAMEWORK]: 'java'
};
async function getSetting(setting) {
  if (await _polyfills.settings.has(setting)) {
    return await _polyfills.settings.get(setting);
  }
  return DEFAULT_SETTINGS[setting];
}
async function setSetting(setting, value) {
  await _polyfills.settings.set(setting, value);
}
var _default = _polyfills.settings;
exports.default = _default;
},{"../renderer/polyfills":"polyfills/index.js"}],"../configs/app.config.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.getI18NextOptions = getI18NextOptions;
var _settings = _interopRequireDefault(require("../shared/settings"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const config = {
  platform: process.platform,
  languages: ['de', 'en', 'es-ES', 'fa', 'hi', 'it', 'ja', 'ko', 'kn', 'ml-IN', 'pa-IN', 'pl', 'pt-BR', 'pt-PT', 'ru', 'te', 'uk', 'zh-CN'],
  fallbackLng: 'en',
  namespace: 'translation'
};
function getI18NextOptions(backend) {
  return {
    backend,
    // debug: true,
    // saveMissing: true,
    interpolation: {
      escapeValue: false
    },
    lng: _settings.default && _settings.default.getSync('PREFERRED_LANGUAGE') || 'en',
    fallbackLng: config.fallbackLng,
    whitelist: config.languages
  };
}
var _default = config;
exports.default = _default;
},{"../shared/settings":"../shared/settings.js"}],"util.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addVendorPrefixes = addVendorPrefixes;
exports.getOptimalXPath = getOptimalXPath;
exports.withTranslation = withTranslation;
exports.xmlToJSON = xmlToJSON;
var _xpath = _interopRequireDefault(require("xpath"));
var _reactI18next = require("react-i18next");
var _lodash = _interopRequireDefault(require("lodash"));
var _polyfills = require("./polyfills");
var _app = _interopRequireDefault(require("../configs/app.config"));
var _xmldom = require("@xmldom/xmldom");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const VALID_W3C_CAPS = ['platformName', 'browserName', 'browserVersion', 'acceptInsecureCerts', 'pageLoadStrategy', 'proxy', 'setWindowRect', 'timeouts', 'unhandledPromptBehavior'];

// Attributes on nodes that we know are unique to the node
const UNIQUE_XPATH_ATTRIBUTES = ['name', 'content-desc', 'id', 'accessibility-id'];
const UNIQUE_CLASS_CHAIN_ATTRIBUTES = ['label', 'name', 'value'];
const UNIQUE_PREDICATE_ATTRIBUTES = ['label', 'name', 'value', 'type'];

/**
 * Translates sourceXML to JSON
 *
 * @param {string} source
 * @returns {Object}
 */
function xmlToJSON(source) {
  const childNodesOf = xmlNode => {
    if (!xmlNode || !xmlNode.hasChildNodes()) {
      return [];
    }
    const result = [];
    for (let childIdx = 0; childIdx < xmlNode.childNodes.length; ++childIdx) {
      const childNode = xmlNode.childNodes.item(childIdx);
      if (childNode.nodeType === 1) {
        result.push(childNode);
      }
    }
    return result;
  };
  const translateRecursively = (xmlNode, parentPath = '', index = null) => {
    const attributes = {};
    for (let attrIdx = 0; attrIdx < xmlNode.attributes.length; ++attrIdx) {
      const attr = xmlNode.attributes.item(attrIdx);
      attributes[attr.name] = attr.value;
    }

    // Dot Separated path of indices
    const path = _lodash.default.isNil(index) ? '' : `${!parentPath ? '' : parentPath + '.'}${index}`;
    const classChainSelector = isIOS ? getOptimalClassChain(xmlDoc, xmlNode, UNIQUE_CLASS_CHAIN_ATTRIBUTES) : '';
    const predicateStringSelector = isIOS ? getOptimalPredicateString(xmlDoc, xmlNode, UNIQUE_PREDICATE_ATTRIBUTES) : '';
    return {
      children: childNodesOf(xmlNode).map((childNode, childIndex) => translateRecursively(childNode, path, childIndex)),
      tagName: xmlNode.tagName,
      attributes,
      xpath: getOptimalXPath(xmlDoc, xmlNode, UNIQUE_XPATH_ATTRIBUTES),
      ...(isIOS ? {
        classChain: classChainSelector ? `**${classChainSelector}` : ''
      } : {}),
      ...(isIOS ? {
        predicateString: predicateStringSelector ? predicateStringSelector : ''
      } : {}),
      path
    };
  };
  const isIOS = source.includes('XCUIElement');
  const xmlDoc = new _xmldom.DOMParser().parseFromString(source);
  // get the first child element node in the doc. some drivers write their xml differently so we
  // first try to find an element as a direct descendend of the doc, then look for one in
  // documentElement
  const firstChild = childNodesOf(xmlDoc)[0] || childNodesOf(xmlDoc.documentElement)[0];
  return firstChild ? translateRecursively(firstChild) : {};
}

/**
 * Get an optimal XPath for a DOMNode
 *
 * @param {DOMDocument} doc
 * @param {DOMNode} domNode
 * @param {Array<String>} uniqueAttributes Attributes we know are unique (defaults to just 'id')
 * @returns {string|null}
 */
function getOptimalXPath(doc, domNode, uniqueAttributes = ['id']) {
  try {
    // BASE CASE #1: If this isn't an element, we're above the root, return empty string
    if (!domNode.tagName || domNode.nodeType !== 1) {
      return '';
    }

    // BASE CASE #2: If this node has a unique attribute, return an absolute XPath with that attribute
    for (let attrName of uniqueAttributes) {
      const attrValue = domNode.getAttribute(attrName);
      if (attrValue) {
        let xpath = `//${domNode.tagName || '*'}[@${attrName}="${attrValue}"]`;
        let othersWithAttr;

        // If the XPath does not parse, move to the next unique attribute
        try {
          othersWithAttr = _xpath.default.select(xpath, doc);
        } catch (ign) {
          continue;
        }

        // If the attribute isn't actually unique, get it's index too
        if (othersWithAttr.length > 1) {
          let index = othersWithAttr.indexOf(domNode);
          xpath = `(${xpath})[${index + 1}]`;
        }
        return xpath;
      }
    }

    // Get the relative xpath of this node using tagName
    let xpath = `/${domNode.tagName}`;

    // If this node has siblings of the same tagName, get the index of this node
    if (domNode.parentNode) {
      // Get the siblings
      const childNodes = Array.prototype.slice.call(domNode.parentNode.childNodes, 0).filter(childNode => childNode.nodeType === 1 && childNode.tagName === domNode.tagName);

      // If there's more than one sibling, append the index
      if (childNodes.length > 1) {
        let index = childNodes.indexOf(domNode);
        xpath += `[${index + 1}]`;
      }
    }

    // Make a recursive call to this nodes parents and prepend it to this xpath
    return getOptimalXPath(doc, domNode.parentNode, uniqueAttributes) + xpath;
  } catch (error) {
    // If there's an unexpected exception, abort and don't get an XPath
    _polyfills.log.error(`The most optimal XPATH could not be determined because an error was thrown: '${JSON.stringify(error, null, 2)}'`);
    return null;
  }
}

/**
 * Get an optimal Class Chain for a DOMNode based on the getOptimalXPath method
 *
 * @param {DOMDocument} doc
 * @param {DOMNode} domNode
 * @param {Array<String>} uniqueAttributes Attributes we know are unique
 * @returns {string|null}
 */
function getOptimalClassChain(doc, domNode, uniqueAttributes) {
  try {
    // BASE CASE #1: If this isn't an element, we're above the root, or this is `XCUIElementTypeApplication`,
    // which is not an official XCUITest element, return empty string
    if (!domNode.tagName || domNode.nodeType !== 1 || domNode.tagName === 'XCUIElementTypeApplication') {
      return '';
    }

    // BASE CASE #2: If this node has a unique class chain based on attributes then return it
    for (let attrName of uniqueAttributes) {
      const attrValue = domNode.getAttribute(attrName);
      if (attrValue) {
        let xpath = `//${domNode.tagName || '*'}[@${attrName}="${attrValue}"]`;
        let classChain = `/${domNode.tagName || '*'}[\`${attrName} == "${attrValue}"\`]`;
        let othersWithAttr;

        // If the XPath does not parse, move to the next unique attribute
        try {
          othersWithAttr = _xpath.default.select(xpath, doc);
        } catch (ign) {
          continue;
        }

        // If the attribute isn't actually unique, get it's index too
        if (othersWithAttr.length > 1) {
          let index = othersWithAttr.indexOf(domNode);
          classChain = `${classChain}[${index + 1}]`;
        }
        return classChain;
      }
    }

    // Get the relative xpath of this node using tagName
    let classChain = `/${domNode.tagName}`;

    // If this node has siblings of the same tagName, get the index of this node
    if (domNode.parentNode) {
      // Get the siblings
      const childNodes = Array.prototype.slice.call(domNode.parentNode.childNodes, 0).filter(childNode => childNode.nodeType === 1 && childNode.tagName === domNode.tagName);

      // If there's more than one sibling, append the index
      if (childNodes.length > 1) {
        let index = childNodes.indexOf(domNode);
        classChain += `[${index + 1}]`;
      }
    }

    // Make a recursive call to this nodes parents and prepend it to this xpath
    return getOptimalClassChain(doc, domNode.parentNode, uniqueAttributes) + classChain;
  } catch (error) {
    // If there's an unexpected exception, abort and don't get an XPath
    _polyfills.log.error(`The most optimal '-ios class chain' could not be determined because an error was thrown: '${JSON.stringify(error, null, 2)}'`);
    return null;
  }
}

/**
 * Get an optimal Predicate String for a DOMNode based on the getOptimalXPath method
 * The `ios predicate string` can only search a single element, no parent child scope
 *
 * @param {DOMDocument} doc
 * @param {DOMNode} domNode
 * @param {Array<String>} uniqueAttributes Attributes we know are unique
 * @returns {string|null}
 */
function getOptimalPredicateString(doc, domNode, uniqueAttributes) {
  try {
    // BASE CASE #1: If this isn't an element, we're above the root, or this is `XCUIElementTypeApplication`,
    // which is not an official XCUITest element, return empty string
    if (!domNode.tagName || domNode.nodeType !== 1 || domNode.tagName === 'XCUIElementTypeApplication') {
      return '';
    }

    // BASE CASE #2: Check all attributes and try to find the best way
    let xpathAttributes = [];
    let predicateString = [];
    for (let attrName of uniqueAttributes) {
      const attrValue = domNode.getAttribute(attrName);
      if (_lodash.default.isNil(attrValue) || _lodash.default.isString(attrValue) && attrValue.length === 0) {
        continue;
      }
      xpathAttributes.push(`@${attrName}="${attrValue}"`);
      const xpath = `//*[${xpathAttributes.join(' and ')}]`;
      predicateString.push(`${attrName} == "${attrValue}"`);
      let othersWithAttr;

      // If the XPath does not parse, move to the next unique attribute
      try {
        othersWithAttr = _xpath.default.select(xpath, doc);
      } catch (ign) {
        continue;
      }

      // If the attribute isn't actually unique, get it's index too
      if (othersWithAttr.length === 1) {
        return predicateString.join(' AND ');
      }
    }
  } catch (error) {
    // If there's an unexpected exception, abort and don't get an XPath
    _polyfills.log.error(`The most optimal '-ios predicate string' could not be determined because an error was thrown: '${JSON.stringify(error, null, 2)}'`);
    return null;
  }
}
function withTranslation(componentCls, ...hocs) {
  return _lodash.default.flow(...hocs, (0, _reactI18next.withTranslation)(_app.default.namespace))(componentCls);
}
function addVendorPrefixes(caps) {
  return caps.map(cap => {
    // if we don't have a valid unprefixed cap or a cap with an existing prefix, update it
    if (!VALID_W3C_CAPS.includes(cap.name) && !_lodash.default.includes(cap.name, ':')) {
      cap.name = `appium:${cap.name}`;
    }
    return cap;
  });
}
},{"./polyfills":"polyfills/index.js","../configs/app.config":"../configs/app.config.js"}],"containers/App.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _util = require("../util");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class App extends _react.default.Component {
  render() {
    const {
      children
    } = this.props;
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, children);
  }
}
App.propTypes = {
  children: _propTypes.default.element.isRequired
};
var _default = (0, _util.withTranslation)(App);
exports.default = _default;
},{"../util":"util.js"}],"components/Inspector/shared.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SCREENSHOT_INTERACTION_MODE = exports.RENDER_CENTROID_AS = exports.POINTER_TYPES = exports.INTERACTION_MODE = exports.DEFAULT_ZOOM = exports.DEFAULT_TAP = exports.DEFAULT_SWIPE = exports.DEFAULT_LONGPRESS = exports.DEFAULT_DRAG_AND_DROP = exports.COMMAND_DEFINITIONS = exports.COMMAND_ARG_TYPES = exports.APP_MODE = void 0;
exports.getLocators = getLocators;
exports.isUnique = isUnique;
exports.parseCoordinates = parseCoordinates;
exports.percentageToPixels = percentageToPixels;
exports.pixelsToPercentage = pixelsToPercentage;
var _xmldom = require("@xmldom/xmldom");
var _xpath = _interopRequireDefault(require("xpath"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function pixelsToPercentage(px, maxPixels) {
  if (!isNaN(px)) {
    return parseFloat((px / maxPixels * 100).toFixed(1), 10);
  }
}
function percentageToPixels(pct, maxPixels) {
  if (!isNaN(pct)) {
    return Math.round(maxPixels * (pct / 100));
  }
}
function parseCoordinates(element) {
  let {
    bounds,
    x,
    y,
    width,
    height
  } = element.attributes || {};
  if (bounds) {
    let boundsArray = bounds.split(/\[|\]|,/).filter(str => str !== '');
    const x1 = parseInt(boundsArray[0], 10);
    const x2 = parseInt(boundsArray[2], 10);
    const y1 = parseInt(boundsArray[1], 10);
    const y2 = parseInt(boundsArray[3], 10);
    return {
      x1,
      y1,
      x2,
      y2
    };
  } else if (x) {
    x = parseInt(x, 10);
    y = parseInt(y, 10);
    width = parseInt(width, 10);
    height = parseInt(height, 10);
    return {
      x1: x,
      y1: y,
      x2: x + width,
      y2: y + height
    };
  } else {
    return {};
  }
}
function isUnique(attrName, attrValue, sourceXML) {
  // If no sourceXML provided, assume it's unique
  if (!sourceXML) {
    return true;
  }
  const doc = new _xmldom.DOMParser().parseFromString(sourceXML);
  return _xpath.default.select(`//*[@${attrName}="${attrValue.replace(/"/g, '')}"]`, doc).length < 2;
}

// Map of the optimal strategies.
const STRATEGY_MAPPINGS = [['name', 'accessibility id'], ['content-desc', 'accessibility id'], ['id', 'id'], ['rntestid', 'id'], ['resource-id', 'id'], ['class', 'class name'], ['type', 'class name']];
function getLocators(attributes, sourceXML) {
  const res = {};
  for (let [strategyAlias, strategy] of STRATEGY_MAPPINGS) {
    const value = attributes[strategyAlias];
    if (value && isUnique(strategyAlias, value, sourceXML)) {
      res[strategy] = attributes[strategyAlias];
    }
  }
  return res;
}
const POINTER_TYPES = {
  POINTER_UP: 'pointerUp',
  POINTER_DOWN: 'pointerDown',
  PAUSE: 'pause',
  POINTER_MOVE: 'pointerMove'
};
exports.POINTER_TYPES = POINTER_TYPES;
const DEFAULT_SWIPE = {
  POINTER_NAME: 'finger1',
  DURATION_1: 0,
  DURATION_2: 750,
  BUTTON: 0,
  ORIGIN: 'viewport'
};
exports.DEFAULT_SWIPE = DEFAULT_SWIPE;
const DEFAULT_ZOOM = {
  POINTER_NAME1: 'finger1',
  POINTER_NAME2: 'finger2',
  DURATION_1: 0,
  DURATION_2: 750,
  BUTTON: 0,
  ORIGIN: 'viewport'
};
exports.DEFAULT_ZOOM = DEFAULT_ZOOM;
const DEFAULT_TAP = {
  POINTER_NAME: 'finger1',
  DURATION_1: 0,
  DURATION_2: 100,
  BUTTON: 0
};
exports.DEFAULT_TAP = DEFAULT_TAP;
const DEFAULT_LONGPRESS = {
  LONGPRESS_POINTER_NAME: 'finger1',
  LONGPRESS_DURATION_1: 0,
  LONGPRESS_DURATION_2: 1000,
  LONGPRESS_BUTTON: 0
};
exports.DEFAULT_LONGPRESS = DEFAULT_LONGPRESS;
const DEFAULT_DRAG_AND_DROP = {
  POINTER_NAME: 'finger1',
  DURATION_1: 0,
  DURATION_2: 750,
  BUTTON: 0,
  ORIGIN: 'viewport'
};

// 3 Types of Centroids:
// CENTROID is the circle/square displayed on the screen
// EXPAND is the +/- circle displayed on the screen
// OVERLAP is the same as CENTROID but is only visible when clicked on +/- circle
exports.DEFAULT_DRAG_AND_DROP = DEFAULT_DRAG_AND_DROP;
const RENDER_CENTROID_AS = {
  CENTROID: 'centroid',
  EXPAND: 'expand',
  OVERLAP: 'overlap'
};
exports.RENDER_CENTROID_AS = RENDER_CENTROID_AS;
const SCREENSHOT_INTERACTION_MODE = {
  SELECT: 'select',
  SWIPE: 'swipe',
  TAP: 'tap',
  LONGPRESS: 'longpress',
  DRAG_AND_DROP: 'drag_and_drop',
  DOUBLE_TAP: 'double tap',
  GESTURE: 'gesture',
  ZOOMIN: 'zoomin',
  // ZOOMOUT: 'zoomout',
  SLIDE: 'slide'
};
exports.SCREENSHOT_INTERACTION_MODE = SCREENSHOT_INTERACTION_MODE;
const APP_MODE = {
  NATIVE: 'native',
  WEB_HYBRID: 'web_hybrid'
};
exports.APP_MODE = APP_MODE;
const COMMAND_ARG_TYPES = {
  STRING: 'string',
  NUMBER: 'number',
  BOOLEAN: 'boolean'
};
exports.COMMAND_ARG_TYPES = COMMAND_ARG_TYPES;
const {
  STRING,
  NUMBER,
  BOOLEAN
} = COMMAND_ARG_TYPES;

// Note: When adding or removing COMMAND_DEFINITIONS, update `en/translation.json`
const COMMAND_DEFINITIONS = {
  'Device': {
    'Execute Script': {
      'Execute': {
        methodName: 'executeScript',
        args: [['executeScriptCommand', STRING], ['jsonArgument', STRING]]
      }
    },
    'Android Activity': {
      'Start Activity': {
        methodName: 'startActivity',
        args: [['appPackage', STRING], ['appActivity', STRING], ['appWaitPackage', STRING], ['intentAction', STRING], ['intentCategory', STRING], ['intentFlags', STRING], ['optionalIntentArguments', STRING], ['dontStopAppOnReset', STRING]],
        refresh: true
      },
      'Current Activity': {
        methodName: 'getCurrentActivity'
      },
      'Current Package': {
        methodName: 'getCurrentPackage'
      }
    },
    'App': {
      'Install App': {
        methodName: 'installApp',
        args: [['appPathOrUrl', STRING]]
      },
      'Is App Installed': {
        methodName: 'isAppInstalled',
        args: [['appId', STRING]]
      },
      'Background App': {
        methodName: 'background',
        args: [['timeout', NUMBER]],
        refresh: true
      },
      'Activate App': {
        methodName: 'activateApp',
        args: [['appId', STRING]],
        refresh: true
      },
      'Terminate App': {
        methodName: 'terminateApp',
        args: [['appId', STRING]],
        refresh: true
      },
      'Remove App': {
        methodName: 'removeApp',
        args: [['appId', STRING]]
      },
      'Get App Strings': {
        methodName: 'getStrings',
        args: [['language', STRING], ['stringFile', STRING]],
        refresh: true
      }
    },
    'Clipboard': {
      'Get Clipboard': {
        methodName: 'getClipboard'
      },
      'Set Clipboard': {
        methodName: 'setClipboard',
        args: [['clipboardText', STRING], ['contentType', STRING], ['contentLabel', STRING]]
      }
    },
    'File': {
      'Push File': {
        methodName: 'pushFile',
        args: [['pathToInstallTo', STRING], ['fileContentString', STRING]]
      },
      'Pull File': {
        methodName: 'pullFile',
        args: [['pathToPullFrom', STRING]]
      },
      'Pull Folder': {
        methodName: 'pullFolder',
        args: [['folderToPullFrom', STRING]]
      }
    },
    'Interaction': {
      'Shake': {
        methodName: 'shake'
      },
      'Lock': {
        methodName: 'lock',
        args: [['seconds', NUMBER]],
        refresh: true
      },
      'Unlock': {
        methodName: 'unlock',
        refresh: true
      },
      'Is Device Locked': {
        methodName: 'isLocked'
      },
      'Rotate Device': {
        methodName: 'rotateDevice',
        args: [['x', NUMBER], ['y', NUMBER], ['radius', NUMBER], ['rotatation', NUMBER], ['touchCount', NUMBER], ['duration', NUMBER]],
        refresh: true
      }
    },
    'Keys': {
      'Press Key': {
        methodName: 'pressKeyCode',
        args: [['keyCode', NUMBER], ['metaState', NUMBER], ['flags', NUMBER]],
        refresh: true
      },
      'Long Press Key': {
        methodName: 'longPressKeyCode',
        args: [['keyCode', NUMBER], ['metaState', NUMBER], ['flags', NUMBER]],
        refresh: true
      },
      'Hide Keyboard': {
        methodName: 'hideKeyboard',
        refresh: true
      },
      'Is Keyboard Shown': {
        methodName: 'isKeyboardShown'
      }
    },
    'Network': {
      'Toggle Airplane Mode': {
        methodName: 'toggleAirplaneMode'
      },
      'Toggle Data': {
        methodName: 'toggleData'
      },
      'Toggle WiFi': {
        methodName: 'toggleWiFi'
      },
      'Toggle Location Services': {
        methodName: 'toggleLocationServices'
      },
      'Send SMS': {
        methodName: 'sendSMS',
        args: [['phoneNumber', STRING], ['text', STRING]]
      },
      'GSM Call': {
        methodName: 'gsmCall',
        args: [['phoneNumber', STRING], ['action', STRING]]
      },
      'GSM Signal': {
        methodName: 'gsmSignal',
        args: [['signalStrengh', NUMBER]]
      },
      'GSM Voice': {
        methodName: 'gsmVoice',
        args: [['state', STRING]]
      }
    },
    'Performance Data': {
      'Get Data': {
        methodName: 'getPerformanceData',
        args: [['packageName', STRING], ['dataType', STRING], ['dataReadTimeout', NUMBER]]
      },
      'Get Data Types': {
        methodName: 'getPerformanceDataTypes'
      }
    },
    'iOS Simulator': {
      'Perform Touch Id': {
        methodName: 'touchId',
        args: [['shouldMatch', BOOLEAN]],
        refresh: true
      },
      'Toggle Touch Id Enrollment': {
        methodName: 'toggleEnrollTouchId',
        args: [['shouldEnroll', BOOLEAN]]
      }
    },
    'System': {
      'Open Notifications': {
        methodName: 'openNotifications',
        refresh: true
      },
      'Get System Time': {
        methodName: 'getDeviceTime'
      },
      'Fingerprint (Android)': {
        methodName: 'fingerPrint',
        args: [['fingerPrintId', NUMBER]],
        refresh: true
      }
    }
  },
  'Session': {
    'Session Capabilities': {
      'Get Session Capabilities': {
        methodName: 'getSession'
      }
    },
    'Timeouts': {
      'Set Timeouts': {
        methodName: 'setTimeouts',
        args: [['implicitTimeout', NUMBER], ['pageLoadTimeout', NUMBER], ['scriptTimeout', NUMBER]]
      }
    },
    'Orientation': {
      'Get Orientation': {
        methodName: 'getOrientation'
      },
      'Set Orientation': {
        methodName: 'setOrientation',
        args: [['orientation', STRING]],
        refresh: true
      }
    },
    'Geolocation': {
      'Get Geolocation': {
        methodName: 'getGeoLocation'
      },
      'Set Geolocation': {
        methodName: 'setGeoLocation',
        args: [['latitude', NUMBER], ['longitude', NUMBER], ['altitude', NUMBER]]
      }
    },
    'Logs': {
      'Get Log Types': {
        methodName: 'getLogTypes'
      },
      'Get Logs': {
        methodName: 'getLogs',
        args: [['logType', STRING]]
      }
    },
    'Settings': {
      'Update Settings': {
        methodName: 'updateSettings',
        args: [['settingsJson', STRING]]
      },
      'Get Device Settings': {
        methodName: 'getSettings'
      }
    }
  },
  'Web': {
    'Navigation': {
      'Go to URL': {
        methodName: 'navigateTo',
        args: [['url', STRING]],
        refresh: true
      },
      'Get URL': {
        methodName: 'getUrl'
      },
      'Back': {
        methodName: 'back',
        refresh: true
      },
      'Forward': {
        methodName: 'forward',
        refresh: true
      },
      'Refresh': {
        methodName: 'refresh',
        refresh: true
      }
    }
  },
  'Context': {
    'Context': {
      'Get Current Context': {
        methodName: 'getContext'
      },
      'Get Context List': {
        methodName: 'getContexts'
      },
      'Set Context': {
        methodName: 'switchContext',
        args: [['name', STRING]],
        refresh: true
      }
    },
    'Window (W3C)': {
      'Get Window Handle': {
        methodName: 'getWindowHandle'
      },
      'Close Window': {
        methodName: 'closeWindow',
        refresh: true
      },
      'Switch To Window': {
        methodName: 'switchToWindow',
        args: [['handle', STRING]],
        refresh: true
      },
      'Get Window Handles': {
        methodName: 'getWindowHandles'
      },
      'New Window': {
        methodName: 'createWindow',
        args: [['type', STRING]],
        refresh: true
      }
    }
  }
};
exports.COMMAND_DEFINITIONS = COMMAND_DEFINITIONS;
const INTERACTION_MODE = {
  SOURCE: 'source',
  COMMANDS: 'commands',
  GESTURES: 'gestures',
  SESSION_INFO: 'sessionInfo'
};
exports.INTERACTION_MODE = INTERACTION_MODE;
},{}],"lib/client-frameworks/framework.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _shared = require("../../components/Inspector/shared");
class Framework {
  constructor(host, port, path, https, caps) {
    this.host = host || 'localhost';
    this.port = port || 4723;
    this.path = path || '/wd/hub';
    this.caps = caps || {};
    this.https = !!https;
    this.scheme = https ? 'https' : 'http';
    this.actions = [];
    this.localVarCount = 0;
    this.localVarCache = {};
    this.lastAssignedVar = null;
  }
  getTapCoordinatesFromPointerActions(pointerActions) {
    const pointerMoveAction = pointerActions[_shared.DEFAULT_TAP.POINTER_NAME][0];
    return {
      x: pointerMoveAction.x,
      y: pointerMoveAction.y
    };
  }
  getSwipeCoordinatesFromPointerActions(pointerActions) {
    let pointerMoveActionStart;
    let pointerMoveActionEnd;
    if (_shared.SCREENSHOT_INTERACTION_MODE.SWIPE) {
      pointerMoveActionStart = pointerActions[_shared.DEFAULT_SWIPE.POINTER_NAME][0];
      pointerMoveActionEnd = pointerActions[_shared.DEFAULT_SWIPE.POINTER_NAME][2];
    }
    if (_shared.SCREENSHOT_INTERACTION_MODE.ZOOMIN) {
      pointerMoveActionStart = pointerActions[_shared.DEFAULT_ZOOM.POINTER_NAME1][0];
      pointerMoveActionEnd = pointerActions[_shared.DEFAULT_ZOOM.POINTER_NAME2][2];
    }
    return {
      x1: pointerMoveActionStart.x,
      y1: pointerMoveActionStart.y,
      x2: pointerMoveActionEnd.x,
      y2: pointerMoveActionEnd.y
    };
  }
  get serverUrl() {
    return `${this.scheme}://${this.host}:${this.port}${this.path === '/' ? '' : this.path}`;
  }
  get name() {
    throw new Error('Must implement name getter');
  }
  get language() {
    throw new Error('Must implement language getter');
  }
  addAction(action, params) {
    this.actions.push({
      action,
      params
    });
  }
  wrapWithBoilerplate() {
    throw new Error('Must implement wrapWithBoilerplate');
  }
  indent(str, spaces) {
    let lines = str.split('\n');
    let spaceStr = '';
    for (let i = 0; i < spaces; i++) {
      spaceStr += ' ';
    }
    return lines.filter(l => !!l.trim()).map(l => `${spaceStr}${l}`).join('\n');
  }
  getCodeString(includeBoilerplate = false) {
    let str = '';
    for (let {
      action,
      params
    } of this.actions) {
      const genCodeFn = `codeFor_${action}`;
      if (!this[genCodeFn]) {
        throw new Error(`Need to implement '${genCodeFn}()': ${this[genCodeFn]}`);
      }
      let code = this[genCodeFn](...params);
      if (code) {
        str += `${code}\n`;
      }
    }
    if (includeBoilerplate) {
      return this.wrapWithBoilerplate(str);
    }
    return str;
  }
  getNewLocalVar() {
    this.localVarCount++;
    return `el${this.localVarCount}`;
  }
  getVarForFind(strategy, locator) {
    const key = `${strategy}-${locator}`;
    let wasNew = false;
    if (!this.localVarCache[key]) {
      this.localVarCache[key] = this.getNewLocalVar();
      wasNew = true;
    }
    this.lastAssignedVar = this.localVarCache[key];
    return [this.localVarCache[key], wasNew];
  }
  getVarName(varName, varIndex) {
    if (varIndex || varIndex === 0) {
      return `${varName}[${varIndex}]`;
    }
    return varName;
  }
  codeFor_findAndAssign() {
    throw new Error('Need to implement codeFor_findAndAssign');
  }
  codeFor_findElement(strategy, locator) {
    let [localVar, wasNew] = this.getVarForFind(strategy, locator);
    if (!wasNew) {
      // if we've already found this element, don't print out
      // finding it again
      return '';
    }
    return this.codeFor_findAndAssign(strategy, locator, localVar);
  }
  codeFor_tap() {
    throw new Error('Need to implement codeFor_tap');
  }
  codeFor_swipe() {
    throw new Error('Need to implement codeFor_tap');
  }
}
exports.default = Framework;
},{"../../components/Inspector/shared":"components/Inspector/shared.js"}],"lib/client-frameworks/js-wd.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _framework = _interopRequireDefault(require("./framework"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class JsWdFramework extends _framework.default {
  get language() {
    return 'js';
  }
  wrapWithBoilerplate(code) {
    let caps = JSON.stringify(this.caps);
    return `// Requires the admc/wd client library
// (npm install wd)
// Then paste this into a .js file and run with Node 7.6+

const wd = require('wd');
const driver = wd.promiseChainRemote("${this.serverUrl}");
const caps = ${caps};

async function main () {
  await driver.init(caps);
  await driver.setImplicitWaitTimeout(5000);
${this.indent(code, 2)}
  await driver.quit();
}

main().catch(console.log);
`;
  }
  codeFor_executeScript( /*varNameIgnore, varIndexIgnore, args*/
  ) {
    return `/* TODO implement executeScript */`;
  }
  codeFor_findAndAssign(strategy, locator, localVar, isArray) {
    let suffixMap = {
      xpath: 'XPath',
      'accessibility id': 'AccessibilityId',
      'id': 'Id',
      'name': 'Name',
      'class name': 'ClassName',
      '-android uiautomator': 'AndroidUIAutomator',
      '-android datamatcher': 'AndroidDataMatcher',
      '-android viewtag': 'unsupported',
      '-ios predicate string': 'IosUIAutomation',
      '-ios class chain': 'IosClassChain'
    };
    if (!suffixMap[strategy]) {
      throw new Error(`Strategy ${strategy} can't be code-gened`);
    }
    if (isArray) {
      return `let ${localVar} = await driver.elementsBy${suffixMap[strategy]}(${JSON.stringify(locator)});`;
    } else {
      return `let ${localVar} = await driver.elementBy${suffixMap[strategy]}(${JSON.stringify(locator)});`;
    }
  }
  codeFor_click(varName, varIndex) {
    return `await ${this.getVarName(varName, varIndex)}.click();`;
  }
  codeFor_clear(varName, varIndex) {
    return `await ${this.getVarName(varName, varIndex)}.clear();`;
  }
  codeFor_sendKeys(varName, varIndex, text) {
    return `await ${this.getVarName(varName, varIndex)}.sendKeys(${JSON.stringify(text)});`;
  }
  codeFor_back() {
    return `await driver.back();`;
  }
  codeFor_tap(varNameIgnore, varIndexIgnore, pointerActions) {
    const {
      x,
      y
    } = this.getTapCoordinatesFromPointerActions(pointerActions);
    return `await (new wd.TouchAction(driver))
  .tap({x: ${x}, y: ${y}})
  .perform()
    `;
  }
  codeFor_swipe(varNameIgnore, varIndexIgnore, pointerActions) {
    const {
      x1,
      y1,
      x2,
      y2
    } = this.getSwipeCoordinatesFromPointerActions(pointerActions);
    return `await (new wd.TouchAction(driver))
  .press({x: ${x1}, y: ${y1}})
  .moveTo({x: ${x2}, y: ${y2}})
  .release()
  .perform()
    `;
  }
  codeFor_getCurrentActivity() {
    return `let activityName = await driver.getCurrentActivity()`;
  }
  codeFor_getCurrentPackage() {
    return `let packageName = await driver.getCurrentPackage()`;
  }
  codeFor_installApp(varNameIgnore, varIndexIgnore, app) {
    return `let isAppInstalled = await driver.installApp('${app}');`;
  }
  codeFor_isAppInstalled(varNameIgnore, varIndexIgnore, app) {
    return `driver.isAppInstalled("${app}");`;
  }
  codeFor_launchApp() {
    return `await driver.launchApp();`;
  }
  codeFor_background(varNameIgnore, varIndexIgnore, timeout) {
    return `await driver.background(${timeout});`;
  }
  codeFor_closeApp() {
    return `await driver.closeApp();`;
  }
  codeFor_reset() {
    return `await driver.reset();`;
  }
  codeFor_removeApp(varNameIgnore, varIndexIgnore, app) {
    return `await driver.removeApp('${app}');`;
  }
  codeFor_getStrings(varNameIgnore, varIndexIgnore, language, stringFile) {
    return `let appStrings = await driver.getStrings(${language ? `${language}, ` : ''}${stringFile ? `"${stringFile}` : ''});`;
  }
  codeFor_getClipboard() {
    return `let clipboardText = await driver.getClipboard();`;
  }
  codeFor_setClipboard(varNameIgnore, varIndexIgnore, clipboardText) {
    return `await driver.setClipboard('${clipboardText}')`;
  }
  codeFor_pressKeyCode(varNameIgnore, varIndexIgnore, keyCode, metaState, flags) {
    return `await driver.longPressKeyCode(${keyCode}, ${metaState}, ${flags});`;
  }
  codeFor_longPressKeyCode(varNameIgnore, varIndexIgnore, keyCode, metaState, flags) {
    return `await driver.longPressKeyCode(${keyCode}, ${metaState}, ${flags});`;
  }
  codeFor_hideKeyboard() {
    return `await driver.hideKeyboard();`;
  }
  codeFor_isKeyboardShown() {
    return `await driver.isKeyboardShown();`;
  }
  codeFor_pushFile(varNameIgnore, varIndexIgnore, pathToInstallTo, fileContentString) {
    return `await driver.pushFile('${pathToInstallTo}', '${fileContentString}');`;
  }
  codeFor_pullFile(varNameIgnore, varIndexIgnore, pathToPullFrom) {
    return `let fileBase64 = await driver.pullFile('${pathToPullFrom}');`;
  }
  codeFor_pullFolder(varNameIgnore, varIndexIgnore, folderToPullFrom) {
    return `let fileBase64 = await driver.pullFolder('${folderToPullFrom}');`;
  }
  codeFor_toggleAirplaneMode() {
    return `await driver.toggleAirplaneMode();`;
  }
  codeFor_toggleData() {
    return `await driver.toggleData();`;
  }
  codeFor_toggleWiFi() {
    return `await driver.toggleWiFi();`;
  }
  codeFor_toggleLocationServices() {
    return `await driver.toggleLocationServices();`;
  }
  codeFor_sendSMS(varNameIgnore, varIndexIgnore, phoneNumber, text) {
    return `await driver.sendSms('${phoneNumber}', '${text}');`;
  }
  codeFor_gsmCall(varNameIgnore, varIndexIgnore, phoneNumber, action) {
    return `await driver.gsmCall('${phoneNumber}', '${action}');`;
  }
  codeFor_gsmSignal(varNameIgnore, varIndexIgnore, signalStrength) {
    return `await driver.gsmSignal(${signalStrength});`;
  }
  codeFor_gsmVoice(varNameIgnore, varIndexIgnore, state) {
    return `await driver.gsmVoice('${state}');`;
  }
  codeFor_shake() {
    return `await driver.shake();`;
  }
  codeFor_lock(varNameIgnore, varIndexIgnore, seconds) {
    return `await driver.lock(${seconds})`;
  }
  codeFor_unlock() {
    return `await driver.unlock()`;
  }
  codeFor_isLocked() {
    return `let isLocked = await driver.isLocked();`;
  }
  codeFor_rotateDevice(varNameIgnore, varIndexIgnore, x, y, radius, rotation, touchCount, duration) {
    return `driver.rotateDevice({x: ${x}, y: ${y}, duration: ${duration}, radius: ${radius}, rotation: ${rotation}, touchCount: ${touchCount}});`;
  }
  codeFor_getPerformanceData(varNameIgnore, varIndexIgnore, packageName, dataType, dataReadTimeout) {
    return `let performanceData = await driver.getPerformanceData('${packageName}', '${dataType}', ${dataReadTimeout});`;
  }
  codeFor_getPerformanceDataTypes() {
    return `let supportedPerformanceDataTypes = await driver.getPerformanceDataTypes();`;
  }
  codeFor_touchId(varNameIgnore, varIndexIgnore, match) {
    return `await driver.touchId(${match});`;
  }
  codeFor_toggleEnrollTouchId(varNameIgnore, varIndexIgnore, enroll) {
    return `await driver.toggleEnrollTouchId(${enroll});`;
  }
  codeFor_openNotifications() {
    return `await driver.openNotifications();`;
  }
  codeFor_getDeviceTime() {
    return `let time = await driver.getDeviceTime();`;
  }
  codeFor_fingerprint(varNameIgnore, varIndexIgnore, fingerprintId) {
    return `await driver.fingerprint(${fingerprintId});`;
  }
  codeFor_getSession() {
    return `let caps = await driver.getSession();`;
  }
  codeFor_setTimeouts( /*varNameIgnore, varIndexIgnore, timeoutsJson*/
  ) {
    return '/* TODO implement setTimeouts */';
  }
  codeFor_getOrientation() {
    return `let orientation = await driver.getOrientation();`;
  }
  codeFor_setOrientation(varNameIgnore, varIndexIgnore, orientation) {
    return `await driver.setOrientation('${orientation}');`;
  }
  codeFor_getGeoLocation() {
    return `let location = await driver.getGeoLocation();`;
  }
  codeFor_setGeoLocation(varNameIgnore, varIndexIgnore, latitude, longitude, altitude) {
    return `await driver.setGeoLocation(${latitude}, ${longitude}, ${altitude});`;
  }
  codeFor_getLogTypes() {
    return `let getLogTypes = await driver.getLogTypes();`;
  }
  codeFor_getLogs(varNameIgnore, varIndexIgnore, logType) {
    return `let logs = await driver.log('${logType}');`;
  }
  codeFor_updateSettings(varNameIgnore, varIndexIgnore, settingsJson) {
    return `await driver.updateSettings(${settingsJson});`;
  }
  codeFor_getSettings() {
    return `let settings = await driver.settings();`;
  }

  // Web

  codeFor_navigateTo(url) {
    return `driver.get('${url}');`;
  }
  codeFor_getUrl() {
    return `let current_url = driver.url();`;
  }
  codeFor_forward() {
    return `driver.forward();`;
  }
  codeFor_refresh() {
    return `driver.refresh();`;
  }

  // Context

  codeFor_getContext() {
    return `driver.currentContext();`;
  }
  codeFor_getContexts() {
    return `driver.contexts();`;
  }
  codeFor_switchContext(name) {
    return `driver.context('${name}');`;
  }
}
JsWdFramework.readableName = 'JS - WD (Promise)';
var _default = JsWdFramework;
exports.default = _default;
},{"./framework":"lib/client-frameworks/framework.js"}],"lib/client-frameworks/js-wdio.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _framework = _interopRequireDefault(require("./framework"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class JsWdIoFramework extends _framework.default {
  get language() {
    return 'js';
  }
  chainifyCode(code) {
    return code.replace(/let .+ = /g, '').replace(/(\n|^)(driver|el[0-9]+)\./g, '\n.').replace(/;\n/g, '\n');
  }
  wrapWithBoilerplate(code) {
    let host = JSON.stringify(this.host);
    let caps = JSON.stringify(this.caps);
    let proto = JSON.stringify(this.scheme);
    let path = JSON.stringify(this.path);
    return `// Requires the webdriverio client library
// (npm install webdriverio)
// Then paste this into a .js file and run with Node:
// node <file>.js

const wdio = require('webdriverio');
async function main () {
  const caps = ${caps}
  const driver = await wdio.remote({
    protocol: ${proto},
    hostname: ${host},
    port: ${this.port},
    path: ${path},
    capabilities: caps
  });
${this.indent(code, 2)}
  await driver.deleteSession();
}

main().catch(console.log);`;
  }
  codeFor_executeScript( /*varNameIgnore, varIndexIgnore, args*/
  ) {
    return `/* TODO implement executeScript */`;
  }
  codeFor_findAndAssign(strategy, locator, localVar, isArray) {
    // wdio has its own way of indicating the strategy in the locator string
    switch (strategy) {
      case 'xpath':
        break;
      // xpath does not need to be updated
      case 'accessibility id':
        locator = `~${locator}`;
        break;
      case 'id':
        locator = `${locator}`;
        break;
      case 'name':
        locator = `name=${locator}`;
        break;
      case 'class name':
        locator = `${locator}`;
        break;
      case '-android uiautomator':
        locator = `android=${locator}`;
        break;
      case '-android datamatcher':
        locator = `android=${locator}`;
        break;
      case '-android viewtag':
        locator = `android=unsupported`;
        break;
      case '-ios predicate string':
        locator = `ios=${locator}`;
        break;
      case '-ios class chain':
        locator = `ios=${locator}`;
        break;
      // TODO: Handle IOS class chain properly. Not all libs support it. Or take it out
      default:
        throw new Error(`Can't handle strategy ${strategy}`);
    }
    if (isArray) {
      return `let ${localVar} = await driver.$$(${JSON.stringify(locator)});`;
    } else {
      return `let ${localVar} = await driver.$(${JSON.stringify(locator)});`;
    }
  }
  codeFor_click(varName, varIndex) {
    return `await ${this.getVarName(varName, varIndex)}.click();`;
  }
  codeFor_clear(varName, varIndex) {
    return `await ${this.getVarName(varName, varIndex)}.clearValue();`;
  }
  codeFor_sendKeys(varName, varIndex, text) {
    return `await ${this.getVarName(varName, varIndex)}.setValue(${JSON.stringify(text)});`;
  }
  codeFor_back() {
    return `await driver.back();`;
  }
  codeFor_tap(varNameIgnore, varIndexIgnore, pointerActions) {
    const {
      x,
      y
    } = this.getTapCoordinatesFromPointerActions(pointerActions);
    return `await driver.touchAction({actions: 'tap', x: ${x}, y: ${y}})`;
  }
  codeFor_swipe(varNameIgnore, varIndexIgnore, pointerActions) {
    const {
      x1,
      y1,
      x2,
      y2
    } = this.getSwipeCoordinatesFromPointerActions(pointerActions);
    return `await driver.touchAction([
  {action: 'press', x: ${x1}, y: ${y1}},
  {action: 'moveTo', x: ${x2}, y: ${y2}},
  'release'
]);`;
  }
  codeFor_getCurrentActivity() {
    return `let activityName = await driver.getCurrentActivity();`;
  }
  codeFor_getCurrentPackage() {
    return `let packageName = await driver.getCurrentPackage();`;
  }
  codeFor_installApp(varNameIgnore, varIndexIgnore, app) {
    return `await driver.installApp('${app}');`;
  }
  codeFor_isAppInstalled(varNameIgnore, varIndexIgnore, app) {
    return `let isAppInstalled = await driver.isAppInstalled("${app}");`;
  }
  codeFor_launchApp() {
    return `await driver.launchApp();`;
  }
  codeFor_background(varNameIgnore, varIndexIgnore, timeout) {
    return `await driver.background(${timeout});`;
  }
  codeFor_closeApp() {
    return `await driver.closeApp();`;
  }
  codeFor_reset() {
    return `await driver.reset();`;
  }
  codeFor_removeApp(varNameIgnore, varIndexIgnore, app) {
    return `await driver.removeApp('${app}')`;
  }
  codeFor_getStrings(varNameIgnore, varIndexIgnore, language, stringFile) {
    return `let appStrings = await driver.getStrings(${language ? `${language}, ` : ''}${stringFile ? `"${stringFile}` : ''});`;
  }
  codeFor_getClipboard(varNameIgnore, varIndexIgnore, contentType) {
    return `let clipboardText = await driver.getClipboard(${contentType ? `${contentType}, ` : ''});`;
  }
  codeFor_setClipboard(varNameIgnore, varIndexIgnore, clipboardText) {
    return `await driver.setClipboard('${clipboardText}')`;
  }
  codeFor_pressKeyCode(varNameIgnore, varIndexIgnore, keyCode, metaState, flags) {
    return `await driver.longPressKeyCode(${keyCode}, ${metaState}, ${flags});`;
  }
  codeFor_longPressKeyCode(varNameIgnore, varIndexIgnore, keyCode, metaState, flags) {
    return `await driver.longPressKeyCode(${keyCode}, ${metaState}, ${flags});`;
  }
  codeFor_hideKeyboard() {
    return `await driver.hideKeyboard();`;
  }
  codeFor_isKeyboardShown() {
    return `let isKeyboardShown = await driver.isKeyboardShown();`;
  }
  codeFor_pushFile(varNameIgnore, varIndexIgnore, pathToInstallTo, fileContentString) {
    return `await driver.pushFile('${pathToInstallTo}', '${fileContentString}');`;
  }
  codeFor_pullFile(varNameIgnore, varIndexIgnore, pathToPullFrom) {
    return `let data = await driver.pullFile('${pathToPullFrom}');`;
  }
  codeFor_pullFolder(varNameIgnore, varIndexIgnore, folderToPullFrom) {
    return `let data = await driver.pullFolder('${folderToPullFrom}');`;
  }
  codeFor_toggleAirplaneMode() {
    return `await driver.toggleAirplaneMode();`;
  }
  codeFor_toggleData() {
    return `await driver.toggleData();`;
  }
  codeFor_toggleWiFi() {
    return `await driver.toggleWiFi();`;
  }
  codeFor_toggleLocationServices() {
    return `await driver.toggleLocationServices();`;
  }
  codeFor_sendSMS(varNameIgnore, varIndexIgnore, phoneNumber, text) {
    return `await driver.sendSms("${phoneNumber}", "${text}");`;
  }
  codeFor_gsmCall(varNameIgnore, varIndexIgnore, phoneNumber, action) {
    return `await driver.gsmCall("${phoneNumber}", "${action}");`;
  }
  codeFor_gsmSignal(varNameIgnore, varIndexIgnore, signalStrength) {
    return `await driver.gsmSignal("${signalStrength}");`;
  }
  codeFor_gsmVoice(varNameIgnore, varIndexIgnore, state) {
    return `await driver.gsmVoice("${state}");`;
  }
  codeFor_shake() {
    return `await driver.shake();`;
  }
  codeFor_lock(varNameIgnore, varIndexIgnore, seconds) {
    return `await driver.lock(${seconds});`;
  }
  codeFor_unlock() {
    return `await driver.unlock();`;
  }
  codeFor_isLocked() {
    return `let isLocked = await driver.isLocked();`;
  }
  codeFor_rotateDevice(varNameIgnore, varIndexIgnore, x, y, radius, rotation, touchCount, duration) {
    return `await driver.rotateDevice(${x}, ${y}, ${radius}, ${rotation}, ${touchCount}, ${duration});`;
  }
  codeFor_getPerformanceData(varNameIgnore, varIndexIgnore, packageName, dataType, dataReadTimeout) {
    return `let performanceData = driver.getPerformanceData("${packageName}", "${dataType}", ${dataReadTimeout});`;
  }
  codeFor_getPerformanceDataTypes() {
    return `let performanceDataTypes = await driver.getPerformanceDataTypes()`;
  }
  codeFor_touchId(varNameIgnore, varIndexIgnore, match) {
    return `await driver.touchId(${match});`;
  }
  codeFor_toggleEnrollTouchId(varNameIgnore, varIndexIgnore, enroll) {
    return `await driver.toggleEnrollTouchId(${enroll});`;
  }
  codeFor_openNotifications() {
    return `await driver.openNotifications();`;
  }
  codeFor_getDeviceTime() {
    return `let time = await driver.getDeviceTime();`;
  }
  codeFor_fingerprint(varNameIgnore, varIndexIgnore, fingerprintId) {
    return `await driver.fingerprint(${fingerprintId});`;
  }
  codeFor_getSession() {
    return `let caps = await driver.getSession();`;
  }
  codeFor_setTimeouts( /*varNameIgnore, varIndexIgnore, timeoutsJson*/
  ) {
    return '/* TODO implement setTimeouts */';
  }
  codeFor_setCommandTimeout( /*varNameIgnore, varIndexIgnore, ms*/
  ) {
    return `// Not supported: setCommandTimeout`;
  }
  codeFor_getOrientation() {
    return `let orientation = await driver.getOrientation();`;
  }
  codeFor_setOrientation(varNameIgnore, varIndexIgnore, orientation) {
    return `await driver.setOrientation("${orientation}");`;
  }
  codeFor_getGeoLocation() {
    return `let location = await driver.getGeoLocation();`;
  }
  codeFor_setGeoLocation(varNameIgnore, varIndexIgnore, latitude, longitude, altitude) {
    return `await driver.setGeoLocation({latitude: ${latitude}, longitude: ${longitude}, altitude: ${altitude}});`;
  }
  codeFor_getLogTypes() {
    return `let getLogTypes = await driver.getLogTypes();`;
  }
  codeFor_getLogs(varNameIgnore, varIndexIgnore, logType) {
    return `let logs = await driver.getLogs('${logType}');`;
  }
  codeFor_updateSettings(varNameIgnore, varIndexIgnore, settingsJson) {
    return `await driver.updateSettings(${settingsJson});`;
  }
  codeFor_getSettings() {
    return `let settings = await driver.getSettings();`;
  }

  // Web

  codeFor_navigateTo(varNameIgnore, varIndexIgnore, url) {
    return `await driver.navigateTo('${url}');`;
  }
  codeFor_getUrl() {
    return `let current_url = await driver.getUrl();`;
  }
  codeFor_forward() {
    return `await driver.forward();`;
  }
  codeFor_refresh() {
    return `await driver.refresh();`;
  }

  // Context

  codeFor_getContext() {
    return `let context = await driver.getContext();`;
  }
  codeFor_getContexts() {
    return `let contexts = await driver.getContexts();`;
  }
  codeFor_switchContext(varNameIgnore, varIndexIgnore, name) {
    return `await driver.switchContext('${name}');`;
  }
}
JsWdIoFramework.readableName = 'JS - Webdriver.io';
var _default = JsWdIoFramework;
exports.default = _default;
},{"./framework":"lib/client-frameworks/framework.js"}],"lib/client-frameworks/js-oxygen.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _framework = _interopRequireDefault(require("./framework"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class JsOxygenFramework extends _framework.default {
  get language() {
    return 'js';
  }
  get type() {
    if (this.caps && this.caps.platformName) {
      const platformName = this.caps.platformName.toLowerCase();
      if (platformName === 'windows') {
        return 'win';
      }
      if (['android', 'androiddriver'].includes(platformName)) {
        return 'mob';
      }
      if (['ios', 'iosdriver'].includes(platformName)) {
        return 'mob';
      }
    }
    return 'mob';
  }
  wrapWithBoilerplate(code) {
    if (code && code.includes('mob.open')) {
      this.caps.browserName = '__chrome_or_safari__';
    } else {
      this.caps.app = '__application_path_or_name__';
    }
    let caps = JSON.stringify(this.caps, null, 2);
    let url = JSON.stringify(`${this.scheme}://${this.host}:${this.port}${this.path}`);
    return `// Requires the Oxygen HQ client library
// (npm install oxygen-cli -g)
// Then paste this into a .js file and run with:
// oxygen <file>.js
const capabilities = ${caps};
const appiumUrl = ${url};
${this.type}.init(capabilities, appiumUrl);

${code}

`;
  }
  codeFor_executeScript(varNameIgnore, varIndexIgnore, args) {
    return `${this.type}.execute(${args})`;
  }
  codeFor_findAndAssign(strategy, locator, localVar, isArray) {
    // wdio has its own way of indicating the strategy in the locator string
    switch (strategy) {
      case 'xpath':
        break;
      // xpath does not need to be updated
      case 'accessibility id':
        locator = `~${locator}`;
        break;
      case 'id':
        locator = `id=${locator}`;
        break;
      case 'name':
        locator = `name=${locator}`;
        break;
      case 'class name':
        locator = `css=${locator}`;
        break;
      case '-android uiautomator':
        locator = `android=${locator}`;
        break;
      case '-android datamatcher':
        locator = `android=${locator}`;
        break;
      case '-ios predicate string':
        locator = `ios=${locator}`;
        break;
      case '-ios class chain':
        locator = `ios=${locator}`;
        break;
      // TODO: Handle IOS class chain properly. Not all libs support it. Or take it out
      default:
        throw new Error(`Can't handle strategy ${strategy}`);
    }
    if (isArray) {
      return `let ${localVar} = mob.findElements(${JSON.stringify(locator)});`;
    } else {
      return `let ${localVar} = mob.findElement(${JSON.stringify(locator)});`;
    }
  }
  codeFor_click(varName, varIndex) {
    return `${this.type}.click(${this.getVarName(varName, varIndex)});`;
  }
  codeFor_clear(varName, varIndex) {
    return `${this.type}.clear(${this.getVarName(varName, varIndex)});`;
  }
  codeFor_sendKeys(varName, varIndex, text) {
    return `${this.type}.type(${this.getVarName(varName, varIndex)}, ${JSON.stringify(text)});`;
  }
  codeFor_back() {
    return `${this.type}.back();`;
  }
  codeFor_tap(varNameIgnore, varIndexIgnore, pointerActions) {
    const {
      x,
      y
    } = this.getTapCoordinatesFromPointerActions(pointerActions);
    return `${this.type}.tap(${x}, ${y});`;
  }
  codeFor_swipe(varNameIgnore, varIndexIgnore, pointerActions) {
    const {
      x1,
      y1,
      x2,
      y2
    } = this.getSwipeCoordinatesFromPointerActions(pointerActions);
    return `${this.type}.swipeScreen(${x1}, ${y1}, ${x2}, ${y2});`;
  }
  codeFor_getCurrentActivity() {
    return `let activityName = ${this.type}.getCurrentActivity();`;
  }
  codeFor_getCurrentPackage() {
    return `let packageName = ${this.type}.getCurrentPackage();`;
  }
  codeFor_installApp(varNameIgnore, varIndexIgnore, app) {
    return `${this.type}.installApp('${app}');`;
  }
  codeFor_isAppInstalled(varNameIgnore, varIndexIgnore, app) {
    return `let isAppInstalled = ${this.type}.isAppInstalled("${app}");`;
  }
  codeFor_launchApp() {
    return `${this.type}.launchApp();`;
  }
  codeFor_background(varNameIgnore, varIndexIgnore, timeout) {
    return `${this.type}.getDriver().background(${timeout});`;
  }
  codeFor_closeApp() {
    return `${this.type}.closeApp();`;
  }
  codeFor_reset() {
    return `${this.type}.resetApp();`;
  }
  codeFor_removeApp(varNameIgnore, varIndexIgnore, app) {
    return `${this.type}.removeApp('${app}')`;
  }
  codeFor_getStrings(varNameIgnore, varIndexIgnore, language, stringFile) {
    return `let appStrings = ${this.type}.getDriver().getStrings(${language ? `${language}, ` : ''}${stringFile ? `"${stringFile}` : ''});`;
  }
  codeFor_getClipboard() {
    return `let clipboardText = ${this.type}.getDriver().getClipboard();`;
  }
  codeFor_setClipboard(varNameIgnore, varIndexIgnore, clipboardText) {
    return `${this.type}.getDriver().setClipboard('${clipboardText}')`;
  }
  codeFor_pressKeyCode(varNameIgnore, varIndexIgnore, keyCode) {
    return `${this.type}.pressKeyCode(${keyCode});`;
  }
  codeFor_longPressKeyCode(varNameIgnore, varIndexIgnore, keyCode) {
    return `${this.type}.longPressKeyCode(${keyCode});`;
  }
  codeFor_hideKeyboard() {
    return `${this.type}.hideKeyboard();`;
  }
  codeFor_isKeyboardShown() {
    return `let isKeyboardShown = ${this.type}.getDriver().isKeyboardShown();`;
  }
  codeFor_pushFile(varNameIgnore, varIndexIgnore, pathToInstallTo, fileContentString) {
    return `${this.type}.getDriver().pushFile('${pathToInstallTo}', '${fileContentString}');`;
  }
  codeFor_pullFile(varNameIgnore, varIndexIgnore, pathToPullFrom) {
    return `let fileBase64 = ${this.type}.getDriver().pullFile('${pathToPullFrom}');`;
  }
  codeFor_pullFolder(varNameIgnore, varIndexIgnore, folderToPullFrom) {
    return `let fileBase64 = ${this.type}.getDriver().pullFolder('${folderToPullFrom}');`;
  }
  codeFor_toggleAirplaneMode() {
    return `${this.type}.getDriver().toggleAirplaneMode();`;
  }
  codeFor_toggleData() {
    return `${this.type}.getDriver().toggleData();`;
  }
  codeFor_toggleWiFi() {
    return `${this.type}.getDriver().toggleWiFi();`;
  }
  codeFor_toggleLocationServices() {
    return `${this.type}.getDriver().toggleLocationServices();`;
  }
  codeFor_sendSMS(varNameIgnore, varIndexIgnore, phoneNumber, text) {
    return `${this.type}.getDriver().sendSms('${phoneNumber}', '${text}');`;
  }
  codeFor_gsmCall(varNameIgnore, varIndexIgnore, phoneNumber, action) {
    return `${this.type}.getDriver().gsmCall('${phoneNumber}', '${action}');`;
  }
  codeFor_gsmSignal(varNameIgnore, varIndexIgnore, signalStrength) {
    return `${this.type}.getDriver().gsmSignal(${signalStrength});`;
  }
  codeFor_gsmVoice(varNameIgnore, varIndexIgnore, state) {
    return `${this.type}.getDriver().gsmVoice('${state}');`;
  }
  codeFor_shake() {
    return `${this.type}.shake();`;
  }
  codeFor_lock(varNameIgnore, varIndexIgnore, seconds) {
    return `${this.type}.getDriver().lock(${seconds});`;
  }
  codeFor_unlock() {
    return `${this.type}.getDriver().unlock();`;
  }
  codeFor_isLocked() {
    return `let isLocked = ${this.type}.getDriver().isLocked();`;
  }
  codeFor_rotateDevice(varNameIgnore, varIndexIgnore, x, y, radius, rotation, touchCount, duration) {
    return `${this.type}.getDriver().rotateDevice({x: ${x}, y: ${y}, duration: ${duration}, radius: ${radius}, rotation: ${rotation}, touchCount: ${touchCount}});`;
  }
  codeFor_getPerformanceData(varNameIgnore, varIndexIgnore, packageName, dataType, dataReadTimeout) {
    return `let performanceData = ${this.type}.getDriver().getPerformanceData('${packageName}', '${dataType}', ${dataReadTimeout});`;
  }
  codeFor_getPerformanceDataTypes() {
    return `let supportedPerformanceDataTypes = ${this.type}.getDriver().getPerformanceDataTypes();`;
  }
  codeFor_touchId(varNameIgnore, varIndexIgnore, match) {
    return `${this.type}.getDriver().touchId(${match});`;
  }
  codeFor_toggleEnrollTouchId(varNameIgnore, varIndexIgnore, enroll) {
    return `${this.type}.getDriver().toggleEnrollTouchId(${enroll});`;
  }
  codeFor_openNotifications() {
    return `${this.type}.getDriver().openNotifications();`;
  }
  codeFor_getDeviceTime() {
    return `let time = ${this.type}.getDeviceTime();`;
  }
  codeFor_fingerprint(varNameIgnore, varIndexIgnore, fingerprintId) {
    return `${this.type}.getDriver().fingerPrint(${fingerprintId});`;
  }
  codeFor_getSession() {
    return `let caps = ${this.type}.getDriver().capabilities;`;
  }
  codeFor_setTimeouts( /*varNameIgnore, varIndexIgnore, timeoutsJson*/
  ) {
    return '/* TODO implement setTimeouts */';
  }
  codeFor_setCommandTimeout() {
    return `// Not supported: setCommandTimeout`;
  }
  codeFor_getOrientation() {
    return `let orientation = ${this.type}.getDriver().getOrientation();`;
  }
  codeFor_setOrientation(varNameIgnore, varIndexIgnore, orientation) {
    return `${this.type}.getDriver().setOrientation("${orientation}");`;
  }
  codeFor_getGeoLocation() {
    return `let location = ${this.type}.getDriver().getGeoLocation();`;
  }
  codeFor_setGeoLocation(varNameIgnore, varIndexIgnore, latitude, longitude, altitude) {
    return `${this.type}.getDriver().setGeoLocation({latitude: ${latitude}, longitude: ${longitude}, altitude: ${altitude}});`;
  }
  codeFor_getLogTypes() {
    return `let getLogTypes = ${this.type}.getDriver().getLogTypes();`;
  }
  codeFor_getLogs(varNameIgnore, varIndexIgnore, logType) {
    return `let logs = ${this.type}.getDriver().getLogs('${logType}');`;
  }
  codeFor_updateSettings(varNameIgnore, varIndexIgnore, settingsJson) {
    return `${this.type}.getDriver().updateSettings(${settingsJson});`;
  }
  codeFor_getSettings() {
    return `let settings = ${this.type}.getDriver().getSettings();`;
  }
}
JsOxygenFramework.readableName = 'JS - Oxygen HQ';
var _default = JsOxygenFramework;
exports.default = _default;
},{"./framework":"lib/client-frameworks/framework.js"}],"lib/client-frameworks/java.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _framework = _interopRequireDefault(require("./framework"));
var _lodash = _interopRequireDefault(require("lodash"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class JavaFramework extends _framework.default {
  get language() {
    return 'java';
  }
  wrapWithBoilerplate(code) {
    let [pkg, cls] = (() => {
      if (this.caps.platformName) {
        switch (this.caps.platformName.toLowerCase()) {
          case 'ios':
            return ['ios', 'IOSDriver'];
          case 'android':
            return ['android', 'AndroidDriver'];
          default:
            return ['unknownPlatform', 'UnknownDriver'];
        }
      } else {
        return ['unknownPlatform', 'UnknownDriver'];
      }
    })();
    let capStr = this.indent(Object.keys(this.caps).map(k => `desiredCapabilities.setCapability(${JSON.stringify(k)}, ${JSON.stringify(this.caps[k])});`).join('\n'), 4);
    return `import io.appium.java_client.MobileElement;
import io.appium.java_client.${pkg}.${cls};
import junit.framework.TestCase;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import java.net.MalformedURLException;
import java.net.URL;
import org.openqa.selenium.remote.DesiredCapabilities;

public class SampleTest {

  private ${cls} driver;

  @Before
  public void setUp() throws MalformedURLException {
    DesiredCapabilities desiredCapabilities = new DesiredCapabilities();
${capStr}

    URL remoteUrl = new URL("${this.serverUrl}");

    driver = new ${cls}(remoteUrl, desiredCapabilities);
  }

  @Test
  public void sampleTest() {
${this.indent(code, 4)}
  }

  @After
  public void tearDown() {
    driver.quit();
  }
}
`;
  }
  codeFor_executeScript( /*varNameIgnore, varIndexIgnore, args*/
  ) {
    return `/* TODO implement executeScript */`;
  }
  codeFor_findAndAssign(strategy, locator, localVar, isArray) {
    let suffixMap = {
      xpath: 'XPath',
      'accessibility id': 'AccessibilityId',
      'id': 'Id',
      'class name': 'ClassName',
      'name': 'Name',
      '-android uiautomator': 'AndroidUIAutomator',
      '-android datamatcher': 'AndroidDataMatcher',
      '-android viewtag': 'AndroidViewTag',
      '-ios predicate string': 'IosNsPredicate',
      '-ios class chain': 'IosClassChain'
    };
    if (!suffixMap[strategy]) {
      throw new Error(`Strategy ${strategy} can't be code-gened`);
    }
    if (isArray) {
      return `List<MobileElement> ${localVar} = (MobileElement) driver.findElementsBy${suffixMap[strategy]}(${JSON.stringify(locator)});`;
    } else {
      return `MobileElement ${localVar} = (MobileElement) driver.findElementBy${suffixMap[strategy]}(${JSON.stringify(locator)});`;
    }
  }
  getVarName(varName, varIndex) {
    if (varIndex || varIndex === 0) {
      return `${varName}.get(${varIndex})`;
    }
    return varName;
  }
  codeFor_click(varName, varIndex) {
    return `${this.getVarName(varName, varIndex)}.click();`;
  }
  codeFor_clear(varName, varIndex) {
    return `${this.getVarName(varName, varIndex)}.clear();`;
  }
  codeFor_sendKeys(varName, varIndex, text) {
    return `${this.getVarName(varName, varIndex)}.sendKeys(${JSON.stringify(text)});`;
  }
  codeFor_back() {
    return `driver.navigate().back();`;
  }
  codeFor_tap(varNameIgnore, varIndexIgnore, pointerActions) {
    const {
      x,
      y
    } = this.getTapCoordinatesFromPointerActions(pointerActions);
    return `(new TouchAction(driver)).tap(${x}, ${y}).perform()`;
  }
  codeFor_swipe(varNameIgnore, varIndexIgnore, pointerActions) {
    const {
      x1,
      y1,
      x2,
      y2
    } = this.getSwipeCoordinatesFromPointerActions(pointerActions);
    return `(new TouchAction(driver))
  .press(PointOption.point(${x1}, ${y1}}))
  .moveTo(PointOption.point(${x2}, ${y2}}))
  .release()
  .perform();
  `;
  }
  codeFor_getCurrentActivity() {
    return `String activityName = driver.currentActivity()`;
  }
  codeFor_getCurrentPackage() {
    return `String packageName = driver.currentPackage()`;
  }
  codeFor_startActivity() {
    return `driver.`;
  }
  codeFor_installApp(varNameIgnore, varIndexIgnore, app) {
    return `driver.installApp("${app}");`;
  }
  codeFor_isAppInstalled(varNameIgnore, varIndexIgnore, app) {
    return `boolean isAppInstalled = driver.isAppInstalled("${app}");`;
  }
  codeFor_launchApp() {
    return `driver.launchApp();`;
  }
  codeFor_background(varNameIgnore, varIndexIgnore, timeout) {
    return `driver.runAppInBackground(Duration.ofSeconds(${timeout}));`;
  }
  codeFor_closeApp() {
    return `driver.closeApp();`;
  }
  codeFor_reset() {
    return `driver.reset();`;
  }
  codeFor_removeApp(varNameIgnore, varIndexIgnore, app) {
    return `driver.removeApp("${app}");`;
  }
  codeFor_getStrings(varNameIgnore, varIndexIgnore, language, stringFile) {
    return `Map<String, String> appStrings = driver.getAppStringMap(${language ? `${language}, ` : ''}${stringFile ? `"${stringFile}` : ''});`;
  }
  codeFor_getClipboard() {
    return `String clipboardText = driver.getClipboardText();`;
  }
  codeFor_setClipboard(varNameIgnore, varIndexIgnore, clipboardText) {
    return `driver.setClipboardText("${clipboardText}");`;
  }
  codeFor_pressKeyCode(varNameIgnore, varIndexIgnore, keyCode, metaState, flags) {
    return `driver.pressKeyCode(${keyCode}, ${metaState}, ${flags});`;
  }
  codeFor_longPressKeyCode(varNameIgnore, varIndexIgnore, keyCode, metaState, flags) {
    return `driver.longPressKeyCode(${keyCode}, ${metaState}, ${flags});`;
  }
  codeFor_hideKeyboard() {
    return `driver.hideKeyboard();`;
  }
  codeFor_isKeyboardShown() {
    return `boolean isKeyboardShown = driver.isKeyboardShown();`;
  }
  codeFor_pushFile(varNameIgnore, varIndexIgnore, pathToInstallTo, fileContentString) {
    return `driver.pushFile("${pathToInstallTo}", ${fileContentString})`;
  }
  codeFor_pullFile(varNameIgnore, varIndexIgnore, pathToPullFrom) {
    return `byte[] fileBase64 = driver.pullFile("${pathToPullFrom}");`;
  }
  codeFor_pullFolder(varNameIgnore, varIndexIgnore, folderToPullFrom) {
    return `byte[] fileBase64 = driver.pullFolder("${folderToPullFrom}");`;
  }
  codeFor_toggleAirplaneMode() {
    return `driver.toggleAirplaneMode();`;
  }
  codeFor_toggleData() {
    return `driver.toggleData();`;
  }
  codeFor_toggleWiFi() {
    return `driver.toggleWifi();`;
  }
  codeFor_toggleLocationServices() {
    return `driver.toggleLocationServices();`;
  }
  codeFor_sendSMS(varNameIgnore, varIndexIgnore, phoneNumber, text) {
    return `driver.sendSMS("${phoneNumber}", "${text}");`;
  }
  codeFor_gsmCall(varNameIgnore, varIndexIgnore, phoneNumber, action) {
    return `driver.makeGsmCall("${phoneNumber}", "${action}");`;
  }
  codeFor_gsmSignal(varNameIgnore, varIndexIgnore, signalStrength) {
    return `driver.setGsmSignalStrength("${signalStrength}");`;
  }
  codeFor_gsmVoice(varNameIgnore, varIndexIgnore, state) {
    return `driver.setGsmVoice("${state}");`;
  }
  codeFor_shake() {
    return `driver.shake();`;
  }
  codeFor_lock(varNameIgnore, varIndexIgnore, seconds) {
    return `driver.lockDevice(${seconds});`;
  }
  codeFor_unlock() {
    return `driver.unlockDevice()`;
  }
  codeFor_isLocked() {
    return `boolean isLocked = driver.isDeviceLocked();`;
  }
  codeFor_rotateDevice(varNameIgnore, varIndexIgnore, x, y, radius, rotation, touchCount, duration) {
    return `driver.rotate(new DeviceRotation(${x}, ${y}, ${radius}, ${rotation}, ${touchCount}, ${duration}));`;
  }
  codeFor_getPerformanceData(varNameIgnore, varIndexIgnore, packageName, dataType, dataReadTimeout) {
    return `List<List<Object>> performanceData = driver.getPerformanceData("${packageName}", "${dataType}", ${dataReadTimeout});`;
  }
  codeFor_getPerformanceDataTypes() {
    return `List<String> performanceTypes = driver.getPerformanceDataTypes();`;
  }
  codeFor_touchId(varNameIgnore, varIndexIgnore, match) {
    return `driver.performTouchID(${match});`;
  }
  codeFor_toggleEnrollTouchId(varNameIgnore, varIndexIgnore, enroll) {
    return `driver.toggleTouchIDEnrollment(${enroll});`;
  }
  codeFor_openNotifications() {
    return `driver.openNotifications();`;
  }
  codeFor_getDeviceTime() {
    return `String time = driver.getDeviceTime();`;
  }
  codeFor_fingerprint(varNameIgnore, varIndexIgnore, fingerprintId) {
    return `driver.fingerPrint(${fingerprintId});`;
  }
  codeFor_getSession() {
    return `Map<String, Object> caps = driver.getSessionDetails();`;
  }
  codeFor_setTimeouts( /*varNameIgnore, varIndexIgnore, timeoutsJson*/
  ) {
    return '/* TODO implement setTimeouts */';
  }
  codeFor_getOrientation() {
    return `ScreenOrientation orientation = driver.getOrientation();`;
  }
  codeFor_setOrientation(varNameIgnore, varIndexIgnore, orientation) {
    return `driver.rotate("${orientation}");`;
  }
  codeFor_getGeoLocation() {
    return `Location location = driver.location();`;
  }
  codeFor_setGeoLocation(varNameIgnore, varIndexIgnore, latitude, longitude, altitude) {
    return `driver.setLocation(new Location(${latitude}, ${longitude}, ${altitude}));`;
  }
  codeFor_getLogTypes() {
    return `Set<String> getLogTypes = driver.manage().logs().getAvailableLogTypes();`;
  }
  codeFor_getLogs(varNameIgnore, varIndexIgnore, logType) {
    return `LogEntries logEntries = driver.manage().logs().get("${logType}");`;
  }
  codeFor_updateSettings(varNameIgnore, varIndexIgnore, settingsJson) {
    try {
      let settings = '';
      for (let [settingName, settingValue] of _lodash.default.toPairs(JSON.parse(settingsJson))) {
        settings += `driver.setSetting("${settingName}", "${settingValue}");\n`;
      }
      return settings;
    } catch (e) {
      return `// Could not parse: ${settingsJson}`;
    }
  }
  codeFor_getSettings() {
    return `Map<String, Object> settings = driver.getSettings();`;
  }

  /*
   codeFor_ REPLACE_ME (varNameIgnore, varIndexIgnore) {
    return `REPLACE_ME`;
  }
   */

  // Web

  codeFor_navigateTo(varNameIgnore, varIndexIgnore, url) {
    return `driver.get("${url}");`;
  }
  codeFor_getUrl() {
    return `String current_url = driver.getCurrentUrl();`;
  }
  codeFor_forward() {
    return `driver.navigate().forward();`;
  }
  codeFor_refresh() {
    return `driver.navigate().refresh();`;
  }

  // Context

  codeFor_getContext() {
    return `driver.getContext()`;
  }
  codeFor_getContexts() {
    return `driver.getContextHandles();`;
  }
  codeFor_switchContext(varNameIgnore, varIndexIgnore, name) {
    return `driver.context("${name}");`;
  }
}
JavaFramework.readableName = 'Java - JUnit';
var _default = JavaFramework;
exports.default = _default;
},{"./framework":"lib/client-frameworks/framework.js"}],"lib/client-frameworks/python.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _framework = _interopRequireDefault(require("./framework"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class PythonFramework extends _framework.default {
  get language() {
    return 'python';
  }
  getPythonVal(jsonVal) {
    if (typeof jsonVal === 'boolean') {
      return jsonVal ? 'True' : 'False';
    }
    return JSON.stringify(jsonVal);
  }
  wrapWithBoilerplate(code) {
    let capStr = Object.keys(this.caps).map(k => `caps[${JSON.stringify(k)}] = ${this.getPythonVal(this.caps[k])}`).join('\n');
    return `# This sample code uses the Appium python client v2
# pip install Appium-Python-Client
# Then you can paste this into a file and simply run with Python

from appium import webdriver
from appium.webdriver.common.appiumby import AppiumBy

# For W3C actions
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.actions import interaction
from selenium.webdriver.common.actions.action_builder import ActionBuilder
from selenium.webdriver.common.actions.pointer_input import PointerInput

caps = {}
${capStr}

driver = webdriver.Remote("${this.serverUrl}", caps)

${code}
driver.quit()`;
  }
  codeFor_executeScript(varNameIgnore, varIndexIgnore, args) {
    return `driver.execute_script('${args}')`;
  }
  codeFor_findAndAssign(strategy, locator, localVar, isArray) {
    let suffixMap = {
      xpath: 'AppiumBy.XPATH',
      'accessibility id': 'AppiumBy.ACCESSIBILITY_ID',
      'id': 'AppiumBy.ID',
      'name': 'AppiumBy.NAME',
      'class name': 'AppiumBy.CLASS_NAME',
      '-android uiautomator': 'AppiumBy.ANDROID_UIAUTOMATOR',
      '-android datamatcher': 'AppiumBy.ANDROID_DATA_MATCHER',
      '-android viewtag': 'AppiumBy.ANDROID_VIEWTAG',
      '-ios predicate string': 'AppiumBy.IOS_PREDICATE',
      '-ios class chain': 'AppiumBy.IOS_CLASS_CHAIN'
    };
    if (!suffixMap[strategy]) {
      throw new Error(`Strategy ${strategy} can't be code-gened`);
    }
    if (isArray) {
      return `${localVar} = driver.find_elements(by=${suffixMap[strategy]}, value=${JSON.stringify(locator)})`;
    } else {
      return `${localVar} = driver.find_element(by=${suffixMap[strategy]}, value=${JSON.stringify(locator)})`;
    }
  }
  codeFor_click(varName, varIndex) {
    return `${this.getVarName(varName, varIndex)}.click()`;
  }
  codeFor_clear(varName, varIndex) {
    return `${this.getVarName(varName, varIndex)}.clear()`;
  }
  codeFor_sendKeys(varName, varIndex, text) {
    return `${this.getVarName(varName, varIndex)}.send_keys(${JSON.stringify(text)})`;
  }
  codeFor_back() {
    return `driver.back()`;
  }
  codeFor_tap(varNameIgnore, varIndexIgnore, pointerActions) {
    const {
      x,
      y
    } = this.getTapCoordinatesFromPointerActions(pointerActions);
    return `actions = ActionChains(driver)
actions.w3c_actions = ActionBuilder(driver, mouse=PointerInput(interaction.POINTER_TOUCH, "touch"))
actions.w3c_actions.pointer_action.move_to_location(${x}, ${y})
actions.w3c_actions.pointer_action.pointer_down()
actions.w3c_actions.pointer_action.pause(0.1)
actions.w3c_actions.pointer_action.release()
actions.perform()
    `;
  }
  codeFor_swipe(varNameIgnore, varIndexIgnore, pointerActions) {
    const {
      x1,
      y1,
      x2,
      y2
    } = this.getSwipeCoordinatesFromPointerActions(pointerActions);
    return `actions = ActionChains(driver)
actions.w3c_actions = ActionBuilder(driver, mouse=PointerInput(interaction.POINTER_TOUCH, "touch"))
actions.w3c_actions.pointer_action.move_to_location(${x1}, ${y1})
actions.w3c_actions.pointer_action.pointer_down()
actions.w3c_actions.pointer_action.move_to_location(${x2}, ${y2})
actions.w3c_actions.pointer_action.release()
actions.perform()
    `;
  }
  codeFor_getCurrentActivity() {
    return `activity_name = driver.current_activity`;
  }
  codeFor_getCurrentPackage() {
    return `package_name = driver.current_package`;
  }
  codeFor_installApp(varNameIgnore, varIndexIgnore, app) {
    return `driver.install_app('${app}');`;
  }
  codeFor_isAppInstalled(varNameIgnore, varIndexIgnore, app) {
    return `is_app_installed = driver.is_app_installed('${app}');`;
  }
  codeFor_launchApp() {
    return `driver.launch_app()`;
  }
  codeFor_background(varNameIgnore, varIndexIgnore, timeout) {
    return `driver.background_app(${timeout})`;
  }
  codeFor_closeApp() {
    return `driver.close_app()`;
  }
  codeFor_reset() {
    return `driver.reset()`;
  }
  codeFor_removeApp(varNameIgnore, varIndexIgnore, app) {
    return `driver.remove_app('${app}');`;
  }
  codeFor_getStrings(varNameIgnore, varIndexIgnore, language, stringFile) {
    return `appStrings = driver.app_strings(${language ? `${language}, ` : ''}${stringFile ? `"${stringFile}` : ''})`;
  }
  codeFor_getClipboard() {
    return `clipboard_text = driver.get_clipboard_text()`;
  }
  codeFor_setClipboard(varNameIgnore, varIndexIgnore, clipboardText) {
    return `driver.set_clipboard_text('${clipboardText}')`;
  }
  codeFor_pressKeyCode(varNameIgnore, varIndexIgnore, keyCode, metaState, flags) {
    return `driver.press_keycode(${keyCode}, ${metaState}, ${flags});`;
  }
  codeFor_longPressKeyCode(varNameIgnore, varIndexIgnore, keyCode, metaState, flags) {
    return `driver.long_press_keycode(${keyCode}, ${metaState}, ${flags});`;
  }
  codeFor_hideKeyboard() {
    return `driver.hide_keyboard()`;
  }
  codeFor_isKeyboardShown() {
    return `driver.is_keyboard_shown()`;
  }
  codeFor_pushFile(varNameIgnore, varIndexIgnore, pathToInstallTo, fileContentString) {
    return `driver.push_file('${pathToInstallTo}', '${fileContentString}');`;
  }
  codeFor_pullFile(varNameIgnore, varIndexIgnore, pathToPullFrom) {
    return `file_base64 = self.driver.pull_file('${pathToPullFrom}');`;
  }
  codeFor_pullFolder(varNameIgnore, varIndexIgnore, folderToPullFrom) {
    return `file_base64 = self.driver.pull_folder('${folderToPullFrom}');`;
  }
  codeFor_toggleAirplaneMode() {
    return `# Not supported: toggleAirplaneMode`;
  }
  codeFor_toggleData() {
    return `# Not supported: toggleData`;
  }
  codeFor_toggleWiFi() {
    return `driver.toggle_wifi()`;
  }
  codeFor_toggleLocationServices() {
    return `driver.toggle_location_services();`;
  }
  codeFor_sendSMS() {
    return `# Not supported: sendSMS`;
  }
  codeFor_gsmCall(varNameIgnore, varIndexIgnore, phoneNumber, action) {
    return `driver.make_gsm_call(${phoneNumber}, ${action})`;
  }
  codeFor_gsmSignal(varNameIgnore, varIndexIgnore, signalStrength) {
    return `driver.set_gsm_signal(${signalStrength})`;
  }
  codeFor_gsmVoice(varNameIgnore, varIndexIgnore, state) {
    return `driver.set_gsm_voice(${state})`;
  }
  codeFor_shake() {
    return `driver.shake();`;
  }
  codeFor_lock(varNameIgnore, varIndexIgnore, seconds) {
    return `driver.lock(${seconds});`;
  }
  codeFor_unlock() {
    return `driver.unlock();`;
  }
  codeFor_isLocked() {
    return `driver.is_locked()`;
  }
  codeFor_rotateDevice() {
    return `# Not supported: rotate device`;
  }
  codeFor_getPerformanceData(varNameIgnore, varIndexIgnore, packageName, dataType, dataReadTimeout) {
    return `driver.get_performance_data('${packageName}', '${dataType}', ${dataReadTimeout})`;
  }
  codeFor_getPerformanceDataTypes() {
    return `driver.get_performance_data_types()`;
  }
  codeFor_touchId(varNameIgnore, varIndexIgnore, match) {
    return `driver.touch_id(${match})`;
  }
  codeFor_toggleEnrollTouchId(varNameIgnore, varIndexIgnore, enroll) {
    return `driver.toggle_touch_id_enrollment(${enroll})`;
  }
  codeFor_openNotifications() {
    return `driver.open_notifications();`;
  }
  codeFor_getDeviceTime() {
    return `time = self.driver.device_time()`;
  }
  codeFor_fingerprint(varNameIgnore, varIndexIgnore, fingerprintId) {
    return `driver.finger_print(${fingerprintId})`;
  }
  codeFor_getSession() {
    return `desired_caps = self.driver.desired_capabilities()`;
  }
  codeFor_setTimeouts( /*varNameIgnore, varIndexIgnore, timeoutsJson*/
  ) {
    return '# TODO implement setTimeouts';
  }
  codeFor_getOrientation() {
    return `orientation = self.driver.orientation()`;
  }
  codeFor_setOrientation(varNameIgnore, varIndexIgnore, orientation) {
    return `driver.orientation = "${orientation}"`;
  }
  codeFor_getGeoLocation() {
    return `location = self.driver.location()`;
  }
  codeFor_setGeoLocation(varNameIgnore, varIndexIgnore, latitude, longitude, altitude) {
    return `driver.set_location(${latitude}, ${longitude}, ${altitude})`;
  }
  codeFor_getLogTypes() {
    return `log_types = driver.log_types();`;
  }
  codeFor_getLogs(varNameIgnore, varIndexIgnore, logType) {
    return `logs = driver.get_log('${logType}');`;
  }
  codeFor_updateSettings(varNameIgnore, varIndexIgnore, settingsJson) {
    return `driver.update_settings(${settingsJson}))`;
  }
  codeFor_getSettings() {
    return `settings = driver.get_settings`;
  }

  // Web

  codeFor_navigateTo(varNameIgnore, varIndexIgnore, url) {
    return `driver.get('${url}')`;
  }
  codeFor_getUrl() {
    return `current_url = driver.current_url`;
  }
  codeFor_forward() {
    return `driver.forward()`;
  }
  codeFor_refresh() {
    return `driver.refresh()`;
  }

  // Context

  codeFor_getContext() {
    return `driver.current_context`;
  }
  codeFor_getContexts() {
    return `driver.contexts()`;
  }
  codeFor_switchContext(varNameIgnore, varIndexIgnore, name) {
    return `driver.switch_to.context('${name}')`;
  }
}
PythonFramework.readableName = 'Python';
var _default = PythonFramework;
exports.default = _default;
},{"./framework":"lib/client-frameworks/framework.js"}],"lib/client-frameworks/ruby.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _framework = _interopRequireDefault(require("./framework"));
var _lodash = _interopRequireDefault(require("lodash"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class RubyFramework extends _framework.default {
  get language() {
    return 'ruby';
  }
  wrapWithBoilerplate(code) {
    let capStr = Object.keys(this.caps).map(k => `caps[${JSON.stringify(k)}] = ${JSON.stringify(this.caps[k])}`).join('\n');
    return `# This sample code uses the Appium ruby lib core client v5
# gem install appium_lib_core
# Then you can paste this into a file and simply run with Ruby

require 'appium_lib_core'

caps = {}
${capStr}
opts = {
    server_url: "${this.serverUrl}"
}
driver = Appium::Core.for({caps: caps, appium_lib: opts}).start_driver

${code}
driver.quit`;
  }
  codeFor_executeScript(varNameIgnore, varIndexIgnore, args) {
    return `driver.execute_script '${args}'`;
  }
  codeFor_findAndAssign(strategy, locator, localVar, isArray) {
    let suffixMap = {
      'xpath': ':xpath',
      'accessibility id': ':accessibility_id',
      'id': ':id',
      'name': ':name',
      'class name': ':class_name',
      '-android uiautomator': ':uiautomation',
      '-android datamatcher': ':datamatcher',
      '-android viewtag': ':viewtag',
      '-ios predicate string': ':predicate',
      '-ios class chain': ':class_chain'
    };
    if (!suffixMap[strategy]) {
      throw new Error(`Strategy ${strategy} can't be code-gened`);
    }
    if (isArray) {
      return `${localVar} = driver.find_elements ${suffixMap[strategy]}, ${JSON.stringify(locator)}`;
    } else {
      return `${localVar} = driver.find_element ${suffixMap[strategy]}, ${JSON.stringify(locator)}`;
    }
  }
  codeFor_click(varName, varIndex) {
    return `${this.getVarName(varName, varIndex)}.click`;
  }
  codeFor_clear(varName, varIndex) {
    return `${this.getVarName(varName, varIndex)}.clear`;
  }
  codeFor_sendKeys(varName, varIndex, text) {
    return `${this.getVarName(varName, varIndex)}.send_keys ${JSON.stringify(text)}`;
  }
  codeFor_back() {
    return `driver.back`;
  }
  codeFor_tap(varNameIgnore, varIndexIgnore, pointerActions) {
    const {
      x,
      y
    } = this.getTapCoordinatesFromPointerActions(pointerActions);
    return `driver
  .action
  .move_to_location(${x}, ${y})
  .pointer_down(:left)
  .release
  .perform
  `;
  }
  codeFor_swipe(varNameIgnore, varIndexIgnore, pointerActions) {
    const {
      x1,
      y1,
      x2,
      y2
    } = this.getSwipeCoordinatesFromPointerActions(pointerActions);
    return `driver
  .action
  .move_to_location(${x1}, ${y1})
  .pointer_down(:left)
  .move_to_location(${x2}, ${y2})
  .release
  .perform
    `;
  }
  codeFor_getCurrentActivity() {
    return `current_activity = driver.current_activity`;
  }
  codeFor_getCurrentPackage() {
    return `current_package = driver.current_package`;
  }
  codeFor_installApp(varNameIgnore, varIndexIgnore, app) {
    return `driver.app_installed? '${app}'`;
  }
  codeFor_isAppInstalled(varNameIgnore, varIndexIgnore, app) {
    return `is_app_installed = driver.app_installed? '${app}'`;
  }
  codeFor_launchApp() {
    return `driver.launch_app`;
  }
  codeFor_background(varNameIgnore, varIndexIgnore, timeout) {
    return `driver.background_app ${timeout}`;
  }
  codeFor_closeApp() {
    return `driver.close_app`;
  }
  codeFor_reset() {
    return `driver.reset`;
  }
  codeFor_removeApp(varNameIgnore, varIndexIgnore, app) {
    return `driver.remove_app '${app}'`;
  }
  codeFor_getStrings(varNameIgnore, varIndexIgnore, language, stringFile) {
    return `driver.app_strings ${language ? `${language}, ` : ''}${stringFile ? `"${stringFile}` : ''}`;
  }
  codeFor_getClipboard() {
    return `clipboard_text = driver.get_clipboard`;
  }
  codeFor_setClipboard(varNameIgnore, varIndexIgnore, clipboardText) {
    return `driver.set_clipboard content: '${clipboardText}'`;
  }
  codeFor_pressKeyCode(varNameIgnore, varIndexIgnore, keyCode, metaState, flags) {
    return `driver.press_keycode ${keyCode}, ${metaState}, ${flags}`;
  }
  codeFor_longPressKeyCode(varNameIgnore, varIndexIgnore, keyCode, metaState, flags) {
    return `driver.long_press_keycode ${keyCode}, ${metaState}, ${flags}`;
  }
  codeFor_hideKeyboard() {
    return `driver.hide_keyboard`;
  }
  codeFor_isKeyboardShown() {
    return `is_keyboard_shown = driver.is_keyboard_shown`;
  }
  codeFor_pushFile(varNameIgnore, varIndexIgnore, pathToInstallTo, fileContentString) {
    return `driver.push_file '${pathToInstallTo}', '${fileContentString}'`;
  }
  codeFor_pullFile(varNameIgnore, varIndexIgnore, pathToPullFrom) {
    return `driver.pull_file '${pathToPullFrom}'`;
  }
  codeFor_pullFolder(varNameIgnore, varIndexIgnore, folderToPullFrom) {
    return `driver.pull_folder '${folderToPullFrom}'`;
  }
  codeFor_toggleAirplaneMode() {
    return `driver.toggle_flight_mode`;
  }
  codeFor_toggleData() {
    return `driver.toggle_data`;
  }
  codeFor_toggleWiFi() {
    return `driver.toggle_wifi`;
  }
  codeFor_toggleLocationServices() {
    return `driver.toggle_location_services`;
  }
  codeFor_sendSMS(varNameIgnore, varIndexIgnore, phoneNumber, text) {
    return `driver.send_sms phone_number: '${phoneNumber}', message: '${text}'`;
  }
  codeFor_gsmCall(varNameIgnore, varIndexIgnore, phoneNumber, action) {
    return `driver.gsm_call phone_number: '${phoneNumber}', action: :${action}`;
  }
  codeFor_gsmSignal(varNameIgnore, varIndexIgnore, signalStrength) {
    return `driver.gsm_signal :${signalStrength}`;
  }
  codeFor_gsmVoice(varNameIgnore, varIndexIgnore, state) {
    return `driver.gsm_voice :${state}`;
  }
  codeFor_shake() {
    return `driver.shake`;
  }
  codeFor_lock(varNameIgnore, varIndexIgnore, seconds) {
    return `driver.lock ${seconds}`;
  }
  codeFor_unlock() {
    return `driver.unlock`;
  }
  codeFor_isLocked() {
    return `is_device_locked = driver.device_locked?`;
  }
  codeFor_rotateDevice() {
    return `# Not supported: rotateDevice`;
  }
  codeFor_getPerformanceData(varNameIgnore, varIndexIgnore, packageName, dataType, dataReadTimeout) {
    return `performance_data = driver.get_performance_data package_name: '${packageName}', data_type: '${dataType}', data_read_timeout: ${dataReadTimeout}`;
  }
  codeFor_getPerformanceDataTypes() {
    return `performance_data = driver.get_performance_data_types`;
  }
  codeFor_touchId(varNameIgnore, varIndexIgnore, match) {
    return `driver.touch_id ${match}`;
  }
  codeFor_toggleEnrollTouchId(varNameIgnore, varIndexIgnore, enroll) {
    return `driver.toggle_touch_id_enrollment ${enroll}`;
  }
  codeFor_openNotifications() {
    return `driver.open_notifications`;
  }
  codeFor_getDeviceTime() {
    return `device_time = driver.device_time`;
  }
  codeFor_fingerprint(varNameIgnore, varIndexIgnore, fingerprintId) {
    return `driver.finger_print ${fingerprintId}`;
  }
  codeFor_getSession() {
    return `session_capabilities = driver.session_capabilities`;
  }
  codeFor_setTimeouts( /*varNameIgnore, varIndexIgnore, timeoutsJson*/
  ) {
    return '# TODO implement setTimeouts';
  }
  codeFor_getOrientation() {
    return `orientation = driver.orientation`;
  }
  codeFor_setOrientation(varNameIgnore, varIndexIgnore, orientation) {
    return `driver.rotation = :${_lodash.default.lowerCase(orientation)}`;
  }
  codeFor_getGeoLocation() {
    return `geo_location = driver.location`;
  }
  codeFor_setGeoLocation(varNameIgnore, varIndexIgnore, latitude, longitude, altitude) {
    return `driver.set_location ${latitude}, ${longitude}, ${altitude}`;
  }
  codeFor_getLogTypes() {
    return `log_types = driver.logs.available_types`;
  }
  codeFor_getLogs(varNameIgnore, varIndexIgnore, logType) {
    return `driver.logs.get '${logType}'`;
  }
  codeFor_updateSettings(varNameIgnore, varIndexIgnore, settingsJson) {
    try {
      let settings = '';
      for (let [settingName, settingValue] of _lodash.default.toPairs(JSON.parse(settingsJson))) {
        settings += `driver.settings.update ${settingName}: '${settingValue}'\n`;
      }
      return settings;
    } catch (e) {
      return `// Could not parse: ${settingsJson}`;
    }
  }
  codeFor_getSettings() {
    return `settings = driver.settings.get`;
  }

  // Web

  codeFor_navigateTo(varNameIgnore, varIndexIgnore, url) {
    return `driver.get '${url}'`;
  }
  codeFor_getUrl() {
    return `current_url = driver.current_url`;
  }
  codeFor_forward() {
    return `driver.navigate().forward`;
  }
  codeFor_refresh() {
    return `driver.navigate().refresh`;
  }

  // Context

  codeFor_getContext() {
    return `driver.current_context`;
  }
  codeFor_getContexts() {
    return `driver.available_contexts`;
  }
  codeFor_switchContext(varNameIgnore, varIndexIgnore, name) {
    return `driver.context = '${name}'`;
  }
}
RubyFramework.readableName = 'Ruby';
var _default = RubyFramework;
exports.default = _default;
},{"./framework":"lib/client-frameworks/framework.js"}],"lib/client-frameworks/robot.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _framework = _interopRequireDefault(require("./framework"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/* eslint no-useless-escape: 0 */

class RobotFramework extends _framework.default {
  get language() {
    //TODO: Make https://highlightjs.org/ use robot syntax
    return 'python';
  }
  get getCapsVariables() {
    return Object.keys(this.caps).map(k => `\$\{${k}\}    ${this.getPythonVal(this.caps[k])}`).join('\n');
  }
  getPythonVal(jsonVal) {
    if (typeof jsonVal === 'boolean') {
      return jsonVal ? 'true' : 'false';
    }
    return jsonVal;
  }
  wrapWithBoilerplate(code) {
    return `# This sample code uses the Appium robot client
# pip install robotframework-appiumlibrary
# Then you can paste this into a file and simply run with robot
#
#  more keywords on: http://serhatbolsu.github.io/robotframework-appiumlibrary/AppiumLibrary.html
#
# if your tests fails saying 'did not match any elements' consider use 'wait activity' or 
# 'wait until page contains element' before a click command 

*** Settings ***
Library           AppiumLibrary
Test Teardown     Quit Application
Suite Teardown    Close Application

*** Variables ***
$\{REMOTE_URL\}   ${this.serverUrl}
${this.getCapsVariables}

*** Test Cases ***
Test case name
${this.indent(this.getApplicationInitialization(), 4)}
${this.indent(code, 4)}
`;
  }
  codeFor_findAndAssign(strategy, locator /*, localVar, isArray*/) {
    let suffixMap = {
      xpath: 'xpath',
      'accessibility id': 'accessibility_id',
      'id': 'id',
      'name': 'name',
      // TODO: How does Python use name selector
      'class name': 'class_name',
      '-android uiautomator': 'unsupported',
      '-android datamatcher': 'unsupported',
      '-android viewtag': 'unsupported',
      '-ios predicate string': 'ios_predicate',
      '-ios class chain': 'ios_uiautomation' // TODO: Could not find iOS UIAutomation
    };

    if (!suffixMap[strategy]) {
      throw new Error(`Strategy ${strategy} can't be code-gened`);
    }
    //TODO: in the robot case, we need the ID on the codeFor_ for execution
    this.lastID = `${strategy}=${locator}`;
    if (this.lastID.includes('accessibility id')) {
      this.lastID = this.lastID.replace('accessibility id', 'accessibility_id');
    }
    return `# ${this.lastID}`;
  }
  getApplicationInitialization() {
    let varString = Object.keys(this.caps).map(k => `${k}=\$\{${k}\}`).join('  ');
    return `    Open Application    \$\{REMOTE_URL\}   ${varString}`;
  }
  codeFor_executeScript( /*varNameIgnore, varIndexIgnore, args*/
  ) {
    return `    Execute Script    TODO implement executeScript`;
  }
  codeFor_click( /*varName, varIndex*/
  ) {
    return `    Click Element    ${this.lastID}`;
  }
  codeFor_clear( /*varName, varIndex*/
  ) {
    return `    Clear Text    ${this.lastID}`;
  }
  codeFor_sendKeys(varName, varIndex, text) {
    return `    Input Text    ${this.lastID}    ${text}`;
  }
  codeFor_back() {
    return `    Go Back`;
  }
  codeFor_tap(varNameIgnore, varIndexIgnore, pointerActions) {
    const {
      x,
      y
    } = this.getTapCoordinatesFromPointerActions(pointerActions);
    return `    Tap With Positions    100    \$\{${x}, ${y}\}`;
  }
  codeFor_swipe(varNameIgnore, varIndexIgnore, pointerActions) {
    const {
      x1,
      y1,
      x2,
      y2
    } = this.getSwipeCoordinatesFromPointerActions(pointerActions);
    return `    Swipe    ${x1}    ${y1}    ${x2}    ${y2}`;
  }

  // TODO: Add these robot framework commands
  codeFor_getCurrentActivity() {
    return '';
  }
  codeFor_getCurrentPackage() {
    return '';
  }
  codeFor_installApp() {
    return ``;
  }
  codeFor_isAppInstalled() {
    return ``;
  }
  codeFor_launchApp() {
    return ``;
  }
  codeFor_background() {
    return ``;
  }
  codeFor_closeApp() {
    return ``;
  }
  codeFor_reset() {
    return ``;
  }
  codeFor_removeApp() {
    return ``;
  }
  codeFor_getStrings() {
    return ``;
  }
  codeFor_getClipboard() {
    return ``;
  }
  codeFor_setClipboard() {
    return ``;
  }
  codeFor_pressKeyCode() {
    return ``;
  }
  codeFor_longPressKeyCode() {
    return ``;
  }
  codeFor_hideKeyboard() {
    return ``;
  }
  codeFor_isKeyboardShown() {
    return ``;
  }
  codeFor_pushFile() {
    return ``;
  }
  codeFor_pullFile() {
    return ``;
  }
  codeFor_pullFolder() {
    return ``;
  }
  codeFor_toggleAirplaneMode() {
    return ``;
  }
  codeFor_toggleData() {
    return ``;
  }
  codeFor_toggleWiFi() {
    return ``;
  }
  codeFor_toggleLocationServices() {
    return ``;
  }
  codeFor_sendSMS() {
    return ``;
  }
  codeFor_gsmCall() {
    return ``;
  }
  codeFor_gsmSignal() {
    return ``;
  }
  codeFor_gsmVoice() {
    return ``;
  }
  codeFor_shake() {
    return ``;
  }
  codeFor_lock() {
    return ``;
  }
  codeFor_unlock() {
    return ``;
  }
  codeFor_isLocked() {
    return ``;
  }
  codeFor_rotateDevice() {
    return ``;
  }
  codeFor_getPerformanceData() {
    return ``;
  }
  codeFor_getPerformanceDataTypes() {
    return ``;
  }
  codeFor_touchId() {
    return ``;
  }
  codeFor_toggleEnrollTouchId() {
    return ``;
  }
  codeFor_openNotifications() {
    return ``;
  }
  codeFor_getDeviceTime() {
    return ``;
  }
  codeFor_fingerprint() {
    return ``;
  }
  codeFor_getSession() {
    return ``;
  }
  codeFor_setTimeouts() {
    return ``;
  }
  codeFor_getOrientation() {
    return ``;
  }
  codeFor_setOrientation() {
    return ``;
  }
  codeFor_getGeoLocation() {
    return ``;
  }
  codeFor_setGeoLocation() {
    return ``;
  }
  codeFor_getLogTypes() {
    return ``;
  }
  codeFor_getLogs() {
    return ``;
  }
  codeFor_updateSettings() {
    return ``;
  }
  codeFor_getSettings() {
    return ``;
  }

  // Web

  codeFor_navigateTo() {
    return ``;
  }
  codeFor_getUrl() {
    return ``;
  }
  codeFor_forward() {
    return ``;
  }
  codeFor_refresh() {
    return ``;
  }

  // Context

  codeFor_getContext() {
    return ``;
  }
  codeFor_getContexts() {
    return ``;
  }
  codeFor_switchContext() {
    return ``;
  }
}
RobotFramework.readableName = 'Robot Framework';
var _default = RobotFramework;
exports.default = _default;
},{"./framework":"lib/client-frameworks/framework.js"}],"lib/client-frameworks/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _jsWd = _interopRequireDefault(require("./js-wd"));
var _jsWdio = _interopRequireDefault(require("./js-wdio"));
var _jsOxygen = _interopRequireDefault(require("./js-oxygen"));
var _java = _interopRequireDefault(require("./java"));
var _python = _interopRequireDefault(require("./python"));
var _ruby = _interopRequireDefault(require("./ruby"));
var _robot = _interopRequireDefault(require("./robot"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const frameworks = {
  jsWd: _jsWd.default,
  jsWdIo: _jsWdio.default,
  jsOxygen: _jsOxygen.default,
  java: _java.default,
  python: _python.default,
  ruby: _ruby.default,
  robot: _robot.default
};
var _default = frameworks;
exports.default = _default;
},{"./js-wd":"lib/client-frameworks/js-wd.js","./js-wdio":"lib/client-frameworks/js-wdio.js","./js-oxygen":"lib/client-frameworks/js-oxygen.js","./java":"lib/client-frameworks/java.js","./python":"lib/client-frameworks/python.js","./ruby":"lib/client-frameworks/ruby.js","./robot":"lib/client-frameworks/robot.js"}],"../configs/i18next.config.renderer.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _i18next = _interopRequireDefault(require("i18next"));
var _reactI18next = require("react-i18next");
var _app = require("./app.config");
var _polyfills = require("../renderer/polyfills");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const i18nextOptions = (0, _app.getI18NextOptions)(_polyfills.i18NextBackendOptions);
if (!_i18next.default.isInitialized) {
  _i18next.default.use(_reactI18next.initReactI18next).use(_polyfills.i18NextBackend).init(i18nextOptions);
}
var _default = _i18next.default;
exports.default = _default;
},{"./app.config":"../configs/app.config.js","../renderer/polyfills":"polyfills/index.js"}],"lib/webview-helpers.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getWebviewStatusAddressBarHeight = getWebviewStatusAddressBarHeight;
exports.parseSource = parseSource;
exports.setHtmlElementAttributes = setHtmlElementAttributes;
var _cheerio = require("cheerio");
var _htmlparser = require("htmlparser2");
/**
 * JS code that is executed in the webview to determine the status+address bar height
 *
 * NOTE:
 * object destructuring the arguments resulted in this error with iOS (not with Android)
 *
 * `Duplicate parameter 'e' not allowed in function with destructuring parameters.`
 *
 * That's why the object destructuring is done in the method itself
 */
function getWebviewStatusAddressBarHeight(obj) {
  // Calculate the status + address bar height
  // Address bar height for iOS 11+ is 50, for lower it is 44,
  // but we take 50 as a default here
  // For Chrome it is 56 for Android 6 to 10
  const {
    platformName,
    statBarHeight
  } = obj;
  const isAndroid = platformName.toLowerCase() === 'android';
  // iOS uses CSS sizes for elements and screenshots, Android sizes times DRP
  const dpr = isAndroid ? window.devicePixelRatio : 1;
  const screenHeight = window.screen.height;
  const viewportHeight = window.innerHeight;
  // Need to determine this later for Chrome
  const osAddressBarDefaultHeight = isAndroid ? 56 : 50;
  const addressToolBarHeight = screenHeight - viewportHeight - statBarHeight;
  // When a manual scroll has been executed for iOS and Android
  // the address bar becomes smaller
  const addressBarHeight = addressToolBarHeight >= 0 && addressToolBarHeight - osAddressBarDefaultHeight < 0 ? addressToolBarHeight : osAddressBarDefaultHeight;
  return statBarHeight + addressBarHeight * dpr;
}

/**
 * JS code that is executed in the webview to set the needed attributes on the DOM so the source can be used for the
 * native inspector window.
 *
 * NOTE:
 * object destructuring the arguments resulted in this error with iOS (not with Android)
 *
 * `Duplicate parameter 'e' not allowed in function with destructuring parameters.`
 *
 * That's why the object destructuring is done in the method itself
 */
function setHtmlElementAttributes(obj) {
  const {
    platformName,
    webviewStatusAddressBarHeight
  } = obj;
  const htmlElements = document.body.getElementsByTagName('*');
  const isAndroid = platformName.toLowerCase() === 'android';
  // iOS uses CSS sizes for elements and screenshots, Android sizes times DRP
  const dpr = isAndroid ? window.devicePixelRatio : 1;
  Array.from(htmlElements).forEach(el => {
    const rect = el.getBoundingClientRect();
    el.setAttribute('data-appium-inspector-width', Math.round(rect.width * dpr));
    el.setAttribute('data-appium-inspector-height', Math.round(rect.height * dpr));
    el.setAttribute('data-appium-inspector-x', Math.round(rect.left * dpr));
    el.setAttribute('data-appium-inspector-y', Math.round(webviewStatusAddressBarHeight + rect.top * dpr));
  });
}

/**
 * Parse the source if it's HTML:
 * - head and scripts need to be removed to clean the HTML tree
 * - all custom attributes need to be transformed to normal width/height/x/y
 */
function parseSource(source) {
  // TODO this check is a bit brittle, figure out a better way to check whether we have a web
  // source vs something else. Just checking for <html in the source doesn't work because fake
  // driver app sources can include embedded <html elements even though the overall source is not
  // html. So for now just look for fake-drivery things like <app> or <mock...> and ensure we don't
  // parse that as html
  if (!source.includes('<html') || source.includes('<app ') || source.includes('<mock')) {
    return source;
  }
  const dom = (0, _htmlparser.parseDocument)(source);
  const $ = (0, _cheerio.load)(dom);

  // Remove the head and the scripts
  const head = $('head');
  head.remove();
  const scripts = $('script');
  scripts.remove();

  // Clean the source
  $('*')
  // remove all existing width height or x/y attributes
  .removeAttr('width').removeAttr('height').removeAttr('x').removeAttr('y')
  // remove all `data-appium-inspector-` prefixes so only the width|height|x|y are there
  .each(function () {
    const $el = $(this);
    ['width', 'height', 'x', 'y'].forEach(rectAttr => {
      if ($el.attr(`data-appium-inspector-${rectAttr}`)) {
        $el.attr(rectAttr, $el.attr(`data-appium-inspector-${rectAttr}`));

        /* remove the old attribute */
        $el.removeAttr(`data-appium-inspector-${rectAttr}`);
      }
    });
  });
  return $.xml();
}
},{}],"lib/appium-client.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.NATIVE_APP = void 0;
var _lodash = _interopRequireDefault(require("lodash"));
var _bluebird = _interopRequireDefault(require("bluebird"));
var _webviewHelpers = require("./webview-helpers");
var _shared = require("../components/Inspector/shared");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const {
  TAP,
  SWIPE,
  GESTURE
} = _shared.SCREENSHOT_INTERACTION_MODE;
const NATIVE_APP = 'NATIVE_APP';
exports.NATIVE_APP = NATIVE_APP;
let _instance = null;
class AppiumClient {
  constructor(driver) {
    this.driver = driver;
    this.elementCache = {};
    this.elVarCount = 0;
    this.elArrayVarCount = 0;
  }
  async run(params) {
    const {
      methodName,
      // Optional. Name of method being provided
      strategy,
      // Optional. Element locator strategy
      selector,
      // Optional. Element fetch selector
      fetchArray = false,
      // Optional. Are we fetching an array of elements or just one?
      elementId,
      // Optional. Element being operated on
      args = [],
      // Optional. Arguments passed to method
      skipRefresh = false,
      // Optional. Do we want the updated source and screenshot?
      skipScreenshot = false,
      // Optional. Do we want to skip getting screenshot alone?
      appMode = _shared.APP_MODE.NATIVE // Optional. Whether we're in a native or hybrid mode
    } = params;
    if (methodName === 'quit') {
      try {
        await this.driver.quit();
      } catch (ign) {}
      _instance = null;

      // when we've quit the session, there's no source/screenshot to send
      // back
      return {
        source: null,
        screenshot: null,
        windowSize: null,
        result: null
      };
    }
    let res = {};
    if (methodName) {
      if (elementId) {
        console.log(`Handling client method request with method '${methodName}', args ${JSON.stringify(args)} and elementId ${elementId}`); // eslint-disable-line no-console
        res = await this.executeMethod({
          elementId,
          methodName,
          args,
          skipRefresh,
          skipScreenshot,
          appMode
        });
      } else {
        console.log(`Handling client method request with method '${methodName}' and args ${JSON.stringify(args)}`); // eslint-disable-line no-console
        res = await this.executeMethod({
          methodName,
          args,
          skipRefresh,
          skipScreenshot,
          appMode
        });
      }
    } else if (strategy && selector) {
      if (fetchArray) {
        console.log(`Fetching elements with selector '${selector}' and strategy ${strategy}`); // eslint-disable-line no-console
        res = await this.fetchElements({
          strategy,
          selector
        });
      } else {
        console.log(`Fetching an element with selector '${selector}' and strategy ${strategy}`); // eslint-disable-line no-console
        res = await this.fetchElement({
          strategy,
          selector
        });
      }
    }
    return res;
  }
  async executeMethod({
    elementId,
    methodName,
    args,
    skipRefresh,
    skipScreenshot,
    appMode
  }) {
    let cachedEl;
    let res = {};
    if (!_lodash.default.isArray(args) && !_lodash.default.isUndefined(args)) {
      args = [args];
    }
    if (elementId) {
      // Give the cached element a variable name (el1, el2, el3,...) the first time it's used
      cachedEl = this.elementCache[elementId];
      if (!cachedEl.variableName) {
        // now that we are actually going to use this element, let's assign it a variable name
        // if it doesn't already have one
        this.elVarCount += 1;
        cachedEl.variableName = `el${this.elVarCount}`;
      }

      // and then execute whatever method we requested on the actual element
      res = await cachedEl.el[methodName].apply(cachedEl.el, args);
    } else {
      // Specially handle the tap and swipe method
      if ([TAP, SWIPE, GESTURE].includes(methodName)) {
        const actions = Object.keys(args[0]).map(key => ({
          type: 'pointer',
          id: key,
          parameters: {
            pointerType: 'touch'
          },
          actions: args[0][key]
        }));
        res = await this.driver.performActions(actions);
      } else if (methodName !== 'getPageSource' && methodName !== 'takeScreenshot') {
        res = await this.driver[methodName].apply(this.driver, args);
      }
    }
    let contextUpdate = {},
      sourceUpdate = {},
      screenshotUpdate = {},
      windowSizeUpdate = {};
    if (!skipRefresh) {
      // Give the source/screenshot time to change before taking the screenshot
      await _bluebird.default.delay(500);
      if (!skipScreenshot) {
        screenshotUpdate = await this.getScreenshotUpdate();
      }
      windowSizeUpdate = await this.getWindowUpdate();
      // only do context updates if user has selected web/hybrid mode (takes forever)
      if (appMode === _shared.APP_MODE.WEB_HYBRID) {
        contextUpdate = await this.getContextUpdate();
      }
      sourceUpdate = await this.getSourceUpdate();
    }
    return {
      ...cachedEl,
      ...contextUpdate,
      ...sourceUpdate,
      ...screenshotUpdate,
      ...windowSizeUpdate,
      commandRes: res
    };
  }
  async fetchElements({
    strategy,
    selector
  }) {
    const start = Date.now();
    const els = await this.driver.findElements(strategy, selector);
    const executionTime = Date.now() - start;
    this.elArrayVarCount += 1;
    const variableName = `els${this.elArrayVarCount}`;
    const variableType = 'array';
    const elements = {};
    // Cache the elements that we find
    const elementList = els.map((el, index) => {
      const res = {
        el,
        variableName,
        variableIndex: index,
        variableType: 'string',
        id: el.elementId,
        strategy,
        selector
      };
      elements[el.elementId] = res;
      return res;
    });
    this.elementCache = {
      ...this.elementCache,
      ...elements
    };
    return {
      variableName,
      variableType,
      strategy,
      selector,
      elements: elementList,
      executionTime
    };
  }
  async fetchElement({
    strategy,
    selector
  }) {
    const start = Date.now();
    let element = null;
    try {
      element = await this.driver.findElement(strategy, selector);
    } catch (err) {
      return {};
    }
    const executionTime = Date.now() - start;
    const id = element.elementId;

    // Cache this ID along with its variable name, variable type and strategy/selector
    const elementData = {
      el: element,
      variableType: 'string',
      strategy,
      selector,
      id
    };
    this.elementCache[id] = elementData;
    return {
      ...elementData,
      executionTime
    };
  }
  async getWindowUpdate() {
    let windowSize, windowSizeError;
    const {
      client: {
        capabilities: {
          deviceScreenSize,
          platformName,
          automationName
        }
      }
    } = this.driver;
    try {
      // The call doesn't need to be made for Android for two reasons
      // - when appMode is hybrid Chrome driver doesn't know this command
      // - the data is already on the driver
      if (_lodash.default.toLower(platformName) === 'android' && _lodash.default.toLower(automationName) === 'uiautomator2') {
        const [width, height] = deviceScreenSize.split('x');
        windowSize = {
          width,
          height,
          x: 0,
          y: 0
        };
      } else {
        windowSize = await this.driver.getWindowRect();
      }
    } catch (e) {
      windowSizeError = e;
    }
    return {
      windowSize,
      windowSizeError
    };
  }
  async getContextUpdate() {
    let contexts, contextsError, currentContext, currentContextError, pixelRatio, platformName, statBarHeight, viewportRect, webViewPosition;
    if (!(await this.hasContextsCommand())) {
      return {
        currentContext: null,
        contexts: []
      };
    }
    try {
      currentContext = await this.driver.getContext();
    } catch (e) {
      currentContextError = e;
    }

    // Note: These methods need to be executed in the native context because ChromeDriver behaves differently
    if (currentContext !== NATIVE_APP) {
      await this.driver.switchContext(NATIVE_APP);
    }
    ({
      platformName,
      pixelRatio,
      statBarHeight,
      viewportRect
    } = await this.driver.getSession());
    const isAndroid = _lodash.default.toLower(platformName) === 'android';
    try {
      contexts = await this.driver.executeScript('mobile:getContexts', []);
      contexts = isAndroid ? this.parseAndroidContexts(contexts) : contexts;
    } catch (e) {
      contextsError = e;
    }
    if (currentContext !== NATIVE_APP) {
      try {
        // Get the webview offset
        if (viewportRect) {
          // The viewport rectangles are based on the screen density,
          // iOS needs CSS pixels
          webViewPosition = {
            x: isAndroid ? viewportRect.left : Math.round(viewportRect.left / pixelRatio),
            y: isAndroid ? viewportRect.top : Math.round(viewportRect.top / pixelRatio)
          };
        } else {
          // Fallback
          const el = await this.driver.findElement(isAndroid ? 'xpath' : '-ios class chain', isAndroid ? '//android.webkit.WebView' : '**/XCUIElementTypeWebView');
          if (el) {
            webViewPosition = await el.getRect();
          }
        }
      } catch (ign) {}
      await this.driver.switchContext(currentContext);
    }

    /**
     * If its a webview then update the HTML with the element location
     * so the source can be used in the native inspector
     */
    try {
      if (currentContext !== NATIVE_APP) {
        // Fallback if the webview position can't be determined,
        // then do it based on the web context
        if (!webViewPosition) {
          webViewPosition = {
            x: 0,
            y: await this.driver.executeScript(`return (${_webviewHelpers.getWebviewStatusAddressBarHeight}).apply(null, arguments)`, [{
              platformName,
              statBarHeight
            }])
          };
        }
        await this.driver.executeScript(`return (${_webviewHelpers.setHtmlElementAttributes}).apply(null, arguments)`, [{
          platformName,
          webviewStatusAddressBarHeight: webViewPosition.y
        }]);
      }
    } catch (ign) {}
    return {
      contexts,
      contextsError,
      currentContext,
      currentContextError
    };
  }
  async getSourceUpdate() {
    try {
      const source = (0, _webviewHelpers.parseSource)(await this.driver.getPageSource());
      return {
        source
      };
    } catch (err) {
      return {
        sourceError: err
      };
    }
  }
  async getScreenshotUpdate() {
    try {
      const screenshot = await this.driver.takeScreenshot();
      return {
        screenshot
      };
    } catch (err) {
      return {
        screenshotError: err
      };
    }
  }

  /**
   * If the app under test can return contexts command.
   *
   * @returns {boolean} True if the app under test supports contexts command.
   *
   */
  async hasContextsCommand() {
    try {
      await this.driver.getContexts();
      return true;
    } catch (ign) {}

    // If the app under test returns non JSON format response
    return false;
  }

  /**
   * Parse the Android contexts webview data
   *
   * Returns
   * {
   *   id: string;             // NATIVE_APP or the webview name
   *   title?: string;         // the name of the page
   *   url?: string;           // the url
   *   bundleId?: string;      // for iOS
   *   packageName?: string;   // for Android
   *   handle?: string;        // the id of the active page in the webview of Android
   * }[];
   */
  parseAndroidContexts(contexts) {
    const parsedWebviews = [];

    // Walk over every context and add all webviews into the parsedWebviews array
    contexts
    // Filter out all contexts that have a webviewName
    .filter(webview => _lodash.default.has(webview, 'webviewName'))
    // Now construct a new array with data
    .map(({
      info,
      pages,
      webviewName
    }) => {
      // The context result can have:
      // - no pages => this might be Chrome running in the background
      // - pages => this can be:
      //   - Chrome with one or multiple tabs open
      //   - A webview with one or multiple webviews
      if (!pages) {
        return;
      }
      pages.filter(page => {
        // The description is a string and:
        // 1. can contain a JSON string for webviews which can contain
        //    an `attached`-value telling if the webview is active
        // 2. can be an empty string, this is most of the times for tabs
        //    in Chrome
        const description = _lodash.default.has(page, 'description') ? page.description : '';
        let descriptionJSON = {
          attached: false
        };
        try {
          descriptionJSON = JSON.parse(page.description);
        } catch (ign) {}

        // You can have multiple `type` of pages, like service workers
        // We need to have pages with or 1. an attached view or 2. with an empty description
        return page.type === 'page' && (description === '' || descriptionJSON.attached);
      }).map(page => {
        parsedWebviews.push({
          id: webviewName,
          ...(page && _lodash.default.has(page, 'title') ? {
            title: page.title
          } : {}),
          ...(page && _lodash.default.has(page, 'url') ? {
            url: page.url
          } : {}),
          ...(page && _lodash.default.has(info, 'Android-Package') ? {
            packageName: info['Android-Package']
          } : {}),
          ...(page && _lodash.default.has(page, 'id') ? {
            handle: page.id
          } : {})
        });
      });
      return parsedWebviews;
    });
    return [
    // The Android contexts dont have the `NATIVE_APP` context so add it here
    {
      id: 'NATIVE_APP'
    },
    // Add the parsedWebviews, but make sure to filter out all undefined webviews
    ...parsedWebviews.filter(Boolean)];
  }
}
exports.default = AppiumClient;
AppiumClient.instance = driver => {
  if (_instance === null) {
    _instance = new AppiumClient(driver);
  }
  return _instance;
};
},{"./webview-helpers":"lib/webview-helpers.js","../components/Inspector/shared":"components/Inspector/shared.js"}],"actions/Inspector.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UNSELECT_TICK_ELEMENT = exports.UNSELECT_HOVERED_ELEMENT = exports.UNSELECT_HOVERED_CENTROID = exports.UNSELECT_ELEMENT = exports.UNSELECT_CENTROID = exports.TOGGLE_SHOW_ATTRIBUTES = exports.TOGGLE_REFRESHING_STATE = exports.START_RECORDING = exports.SHOW_SIRI_COMMAND_MODAL = exports.SHOW_LOCATOR_TEST_MODAL = exports.SHOW_GESTURE_EDITOR = exports.SHOW_GESTURE_ACTION = exports.SET_VISIBLE_COMMAND_RESULT = exports.SET_USER_WAIT_TIMEOUT = exports.SET_SWIPE_START1 = exports.SET_SWIPE_START = exports.SET_SWIPE_END1 = exports.SET_SWIPE_END = exports.SET_SOURCE_AND_SCREENSHOT = exports.SET_SIRI_COMMAND_VALUE = exports.SET_SHOW_CENTROIDS = exports.SET_SHOW_BOILERPLATE = exports.SET_SESSION_TIME = exports.SET_SESSION_DETAILS = exports.SET_SERVER_STATUS = exports.SET_SELECTED_ELEMENT_ID = exports.SET_SEARCHED_FOR_ELEMENT_BOUNDS = exports.SET_SCREENSHOT_INTERACTION_MODE = exports.SET_LOCATOR_TEST_VALUE = exports.SET_LOCATOR_TEST_STRATEGY = exports.SET_LOCATOR_TEST_ELEMENT = exports.SET_LOADED_GESTURE = exports.SET_LAST_ACTIVE_MOMENT = exports.SET_KEEP_ALIVE_INTERVAL = exports.SET_INTERACTIONS_NOT_AVAILABLE = exports.SET_GESTURE_TAP_COORDS_MODE = exports.SET_EXPANDED_PATHS = exports.SET_CONTEXT = exports.SET_COMMAND_ARG = exports.SET_AWAITING_MJPEG_STREAM = exports.SET_APP_MODE = exports.SET_APP_ID = exports.SET_ACTION_FRAMEWORK = exports.SESSION_DONE = exports.SELECT_TICK_ELEMENT = exports.SELECT_INTERACTION_MODE = exports.SELECT_HOVERED_ELEMENT = exports.SELECT_HOVERED_CENTROID = exports.SELECT_ELEMENT = exports.SELECT_COMMAND_SUB_GROUP = exports.SELECT_COMMAND_GROUP = exports.SELECT_CENTROID = exports.SEARCHING_FOR_ELEMENTS_COMPLETED = exports.SEARCHING_FOR_ELEMENTS = exports.REMOVE_LOADED_GESTURE = exports.RECORD_ACTION = exports.QUIT_SESSION_REQUESTED = exports.QUIT_SESSION_DONE = exports.PROMPT_KEEP_ALIVE = exports.PAUSE_RECORDING = exports.METHOD_CALL_REQUESTED = exports.METHOD_CALL_DONE = exports.HIDE_SIRI_COMMAND_MODAL = exports.HIDE_PROMPT_KEEP_ALIVE = exports.HIDE_LOCATOR_TEST_MODAL = exports.HIDE_GESTURE_EDITOR = exports.HIDE_GESTURE_ACTION = exports.GET_SAVED_GESTURES_REQUESTED = exports.GET_SAVED_GESTURES_DONE = exports.GET_FIND_ELEMENTS_TIMES_COMPLETED = exports.GET_FIND_ELEMENTS_TIMES = exports.FINDING_ELEMENT_IN_SOURCE_COMPLETED = exports.FINDING_ELEMENT_IN_SOURCE = exports.ENTERING_COMMAND_ARGS = exports.DELETE_SAVED_GESTURES_REQUESTED = exports.DELETE_SAVED_GESTURES_DONE = exports.CLOSE_RECORDER = exports.CLEAR_TAP_COORDINATES = exports.CLEAR_SWIPE_ACTION = exports.CLEAR_SEARCH_RESULTS = exports.CLEAR_SEARCHED_FOR_ELEMENT_BOUNDS = exports.CLEAR_RECORDING = exports.CLEAR_ASSIGNED_VAR_CACHE = exports.CANCEL_PENDING_COMMAND = exports.ADD_ASSIGNED_VAR_CACHE = void 0;
exports.addAssignedVarCache = addAssignedVarCache;
exports.applyClientMethod = applyClientMethod;
exports.callClientMethod = callClientMethod;
exports.cancelPendingCommand = cancelPendingCommand;
exports.clearRecording = clearRecording;
exports.clearSearchResults = clearSearchResults;
exports.clearSwipeAction = clearSwipeAction;
exports.closeRecorder = closeRecorder;
exports.deleteSavedGesture = deleteSavedGesture;
exports.displayGesture = displayGesture;
exports.findAndAssign = findAndAssign;
exports.getActiveAppId = getActiveAppId;
exports.getFindElementsTimes = getFindElementsTimes;
exports.getSavedActionFramework = getSavedActionFramework;
exports.getSavedGestures = getSavedGestures;
exports.getServerStatus = getServerStatus;
exports.hideGestureEditor = hideGestureEditor;
exports.hideKeepAlivePrompt = hideKeepAlivePrompt;
exports.hideLocatorTestModal = hideLocatorTestModal;
exports.hideSiriCommandModal = hideSiriCommandModal;
exports.keepSessionAlive = keepSessionAlive;
exports.killKeepAliveLoop = killKeepAliveLoop;
exports.pauseRecording = pauseRecording;
exports.promptKeepAlive = promptKeepAlive;
exports.quitSession = quitSession;
exports.recordAction = recordAction;
exports.removeGestureDisplay = removeGestureDisplay;
exports.removeLoadedGesture = removeLoadedGesture;
exports.runKeepAliveLoop = runKeepAliveLoop;
exports.saveGesture = saveGesture;
exports.searchForElement = searchForElement;
exports.selectAppMode = selectAppMode;
exports.selectCentroid = selectCentroid;
exports.selectCommandGroup = selectCommandGroup;
exports.selectCommandSubGroup = selectCommandSubGroup;
exports.selectElement = selectElement;
exports.selectHoveredCentroid = selectHoveredCentroid;
exports.selectHoveredElement = selectHoveredElement;
exports.selectInteractionMode = selectInteractionMode;
exports.selectLocatedElement = selectLocatedElement;
exports.selectScreenshotInteractionMode = selectScreenshotInteractionMode;
exports.selectTick = selectTick;
exports.setActionFramework = setActionFramework;
exports.setAwaitingMjpegStream = setAwaitingMjpegStream;
exports.setCommandArg = setCommandArg;
exports.setContext = setContext;
exports.setExpandedPaths = setExpandedPaths;
exports.setLoadedGesture = setLoadedGesture;
exports.setLocatorTestElement = setLocatorTestElement;
exports.setLocatorTestStrategy = setLocatorTestStrategy;
exports.setLocatorTestValue = setLocatorTestValue;
exports.setSessionDetails = setSessionDetails;
exports.setSessionTime = setSessionTime;
exports.setSiriCommandValue = setSiriCommandValue;
exports.setSwipeEnd = setSwipeEnd;
exports.setSwipeEnd1 = setSwipeEnd1;
exports.setSwipeStart = setSwipeStart;
exports.setSwipeStart1 = setSwipeStart1;
exports.setVisibleCommandResult = setVisibleCommandResult;
exports.showGestureEditor = showGestureEditor;
exports.showLocatorTestModal = showLocatorTestModal;
exports.showSiriCommandModal = showSiriCommandModal;
exports.startEnteringCommandArgs = startEnteringCommandArgs;
exports.startRecording = startRecording;
exports.tapTickCoordinates = tapTickCoordinates;
exports.toggleRefreshingState = toggleRefreshingState;
exports.toggleShowAttributes = toggleShowAttributes;
exports.toggleShowBoilerplate = toggleShowBoilerplate;
exports.toggleShowCentroids = toggleShowCentroids;
exports.unselectCentroid = unselectCentroid;
exports.unselectElement = unselectElement;
exports.unselectHoveredCentroid = unselectHoveredCentroid;
exports.unselectHoveredElement = unselectHoveredElement;
exports.unselectTick = unselectTick;
var _lodash = _interopRequireWildcard(require("lodash"));
var _reduxFirstHistory = require("redux-first-history");
var _shared = require("../components/Inspector/shared");
var _Session = require("./Session");
var _util = require("../util");
var _uuid = require("uuid");
var _clientFrameworks = _interopRequireDefault(require("../lib/client-frameworks"));
var _settings = require("../../shared/settings");
var _i18nextConfig = _interopRequireDefault(require("../../configs/i18next.config.renderer"));
var _appiumClient = _interopRequireWildcard(require("../lib/appium-client"));
var _antd = require("antd");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/* eslint-disable indent */
/* eslint-disable space-in-parens */
/* eslint-disable no-console */
/* eslint-disable quotes */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-unused-vars */

const SET_SESSION_DETAILS = 'SET_SESSION_DETAILS';
exports.SET_SESSION_DETAILS = SET_SESSION_DETAILS;
const SET_SOURCE_AND_SCREENSHOT = 'SET_SOURCE_AND_SCREENSHOT';
exports.SET_SOURCE_AND_SCREENSHOT = SET_SOURCE_AND_SCREENSHOT;
const SESSION_DONE = 'SESSION_DONE';
exports.SESSION_DONE = SESSION_DONE;
const SELECT_ELEMENT = 'SELECT_ELEMENT';
exports.SELECT_ELEMENT = SELECT_ELEMENT;
const UNSELECT_ELEMENT = 'UNSELECT_ELEMENT';
exports.UNSELECT_ELEMENT = UNSELECT_ELEMENT;
const SET_SELECTED_ELEMENT_ID = 'SET_SELECTED_ELEMENT_ID';
exports.SET_SELECTED_ELEMENT_ID = SET_SELECTED_ELEMENT_ID;
const SET_INTERACTIONS_NOT_AVAILABLE = 'SET_INTERACTIONS_NOT_AVAILABLE';
exports.SET_INTERACTIONS_NOT_AVAILABLE = SET_INTERACTIONS_NOT_AVAILABLE;
const METHOD_CALL_REQUESTED = 'METHOD_CALL_REQUESTED';
exports.METHOD_CALL_REQUESTED = METHOD_CALL_REQUESTED;
const METHOD_CALL_DONE = 'METHOD_CALL_DONE';
exports.METHOD_CALL_DONE = METHOD_CALL_DONE;
const SET_EXPANDED_PATHS = 'SET_EXPANDED_PATHS';
exports.SET_EXPANDED_PATHS = SET_EXPANDED_PATHS;
const SELECT_HOVERED_ELEMENT = 'SELECT_HOVERED_ELEMENT';
exports.SELECT_HOVERED_ELEMENT = SELECT_HOVERED_ELEMENT;
const UNSELECT_HOVERED_ELEMENT = 'UNSELECT_HOVERED_ELEMENT';
exports.UNSELECT_HOVERED_ELEMENT = UNSELECT_HOVERED_ELEMENT;
const SELECT_HOVERED_CENTROID = 'SELECT_HOVERED_CENTROID';
exports.SELECT_HOVERED_CENTROID = SELECT_HOVERED_CENTROID;
const UNSELECT_HOVERED_CENTROID = 'UNSELECT_HOVERED_CENTROID';
exports.UNSELECT_HOVERED_CENTROID = UNSELECT_HOVERED_CENTROID;
const SELECT_CENTROID = 'SELECT_CENTROID';
exports.SELECT_CENTROID = SELECT_CENTROID;
const UNSELECT_CENTROID = 'UNSELECT_CENTROID';
exports.UNSELECT_CENTROID = UNSELECT_CENTROID;
const SET_SHOW_CENTROIDS = 'SET_SHOW_CENTROIDS';
exports.SET_SHOW_CENTROIDS = SET_SHOW_CENTROIDS;
const QUIT_SESSION_REQUESTED = 'QUIT_SESSION_REQUESTED';
exports.QUIT_SESSION_REQUESTED = QUIT_SESSION_REQUESTED;
const QUIT_SESSION_DONE = 'QUIT_SESSION_DONE';
exports.QUIT_SESSION_DONE = QUIT_SESSION_DONE;
const SET_SESSION_TIME = 'SET_SESSION_TIME';
exports.SET_SESSION_TIME = SET_SESSION_TIME;
const START_RECORDING = 'START_RECORDING';
exports.START_RECORDING = START_RECORDING;
const PAUSE_RECORDING = 'PAUSE_RECORDING';
exports.PAUSE_RECORDING = PAUSE_RECORDING;
const CLEAR_RECORDING = 'CLEAR_RECORDING';
exports.CLEAR_RECORDING = CLEAR_RECORDING;
const CLOSE_RECORDER = 'CLOSE_RECORDER';
exports.CLOSE_RECORDER = CLOSE_RECORDER;
const SET_ACTION_FRAMEWORK = 'SET_ACTION_FRAMEWORK';
exports.SET_ACTION_FRAMEWORK = SET_ACTION_FRAMEWORK;
const RECORD_ACTION = 'RECORD_ACTION';
exports.RECORD_ACTION = RECORD_ACTION;
const SET_SHOW_BOILERPLATE = 'SET_SHOW_BOILERPLATE';
exports.SET_SHOW_BOILERPLATE = SET_SHOW_BOILERPLATE;
const SHOW_LOCATOR_TEST_MODAL = 'SHOW_LOCATOR_TEST_MODAL';
exports.SHOW_LOCATOR_TEST_MODAL = SHOW_LOCATOR_TEST_MODAL;
const HIDE_LOCATOR_TEST_MODAL = 'HIDE_LOCATOR_TEST_MODAL';
exports.HIDE_LOCATOR_TEST_MODAL = HIDE_LOCATOR_TEST_MODAL;
const SHOW_SIRI_COMMAND_MODAL = 'SHOW_SIRI_COMMAND_MODAL';
exports.SHOW_SIRI_COMMAND_MODAL = SHOW_SIRI_COMMAND_MODAL;
const HIDE_SIRI_COMMAND_MODAL = 'HIDE_SIRI_COMMAND_MODAL';
exports.HIDE_SIRI_COMMAND_MODAL = HIDE_SIRI_COMMAND_MODAL;
const SET_SIRI_COMMAND_VALUE = 'SET_SIRI_COMMAND_VALUE';
exports.SET_SIRI_COMMAND_VALUE = SET_SIRI_COMMAND_VALUE;
const SET_LOCATOR_TEST_STRATEGY = 'SET_LOCATOR_TEST_STRATEGY';
exports.SET_LOCATOR_TEST_STRATEGY = SET_LOCATOR_TEST_STRATEGY;
const SET_LOCATOR_TEST_VALUE = 'SET_LOCATOR_TEST_VALUE';
exports.SET_LOCATOR_TEST_VALUE = SET_LOCATOR_TEST_VALUE;
const SEARCHING_FOR_ELEMENTS = 'SEARCHING_FOR_ELEMENTS';
exports.SEARCHING_FOR_ELEMENTS = SEARCHING_FOR_ELEMENTS;
const SEARCHING_FOR_ELEMENTS_COMPLETED = 'SEARCHING_FOR_ELEMENTS_COMPLETED';
exports.SEARCHING_FOR_ELEMENTS_COMPLETED = SEARCHING_FOR_ELEMENTS_COMPLETED;
const GET_FIND_ELEMENTS_TIMES = 'GET_FIND_ELEMENTS_TIMES';
exports.GET_FIND_ELEMENTS_TIMES = GET_FIND_ELEMENTS_TIMES;
const GET_FIND_ELEMENTS_TIMES_COMPLETED = 'GET_FIND_ELEMENTS_TIMES_COMPLETED';
exports.GET_FIND_ELEMENTS_TIMES_COMPLETED = GET_FIND_ELEMENTS_TIMES_COMPLETED;
const SET_LOCATOR_TEST_ELEMENT = 'SET_LOCATOR_TEST_ELEMENT';
exports.SET_LOCATOR_TEST_ELEMENT = SET_LOCATOR_TEST_ELEMENT;
const FINDING_ELEMENT_IN_SOURCE = 'FINDING_ELEMENT_IN_SOURCE';
exports.FINDING_ELEMENT_IN_SOURCE = FINDING_ELEMENT_IN_SOURCE;
const FINDING_ELEMENT_IN_SOURCE_COMPLETED = 'FINDING_ELEMENT_IN_SOURCE_COMPLETED';
exports.FINDING_ELEMENT_IN_SOURCE_COMPLETED = FINDING_ELEMENT_IN_SOURCE_COMPLETED;
const CLEAR_SEARCH_RESULTS = 'CLEAR_SEARCH_RESULTS';
exports.CLEAR_SEARCH_RESULTS = CLEAR_SEARCH_RESULTS;
const ADD_ASSIGNED_VAR_CACHE = 'ADD_ASSIGNED_VAR_CACHE';
exports.ADD_ASSIGNED_VAR_CACHE = ADD_ASSIGNED_VAR_CACHE;
const CLEAR_ASSIGNED_VAR_CACHE = 'CLEAR_ASSIGNED_VAR_CACHE';
exports.CLEAR_ASSIGNED_VAR_CACHE = CLEAR_ASSIGNED_VAR_CACHE;
const SET_SCREENSHOT_INTERACTION_MODE = 'SET_SCREENSHOT_INTERACTION_MODE';
exports.SET_SCREENSHOT_INTERACTION_MODE = SET_SCREENSHOT_INTERACTION_MODE;
const SET_APP_MODE = 'SET_APP_MODE';
exports.SET_APP_MODE = SET_APP_MODE;
const SET_SEARCHED_FOR_ELEMENT_BOUNDS = 'SET_SEARCHED_FOR_ELEMENT_BOUNDS';
exports.SET_SEARCHED_FOR_ELEMENT_BOUNDS = SET_SEARCHED_FOR_ELEMENT_BOUNDS;
const CLEAR_SEARCHED_FOR_ELEMENT_BOUNDS = 'CLEAR_SEARCHED_FOR_ELEMENT_BOUNDS';
exports.CLEAR_SEARCHED_FOR_ELEMENT_BOUNDS = CLEAR_SEARCHED_FOR_ELEMENT_BOUNDS;
const SET_SWIPE_START = 'SET_SWIPE_START';
exports.SET_SWIPE_START = SET_SWIPE_START;
const SET_SWIPE_END = 'SET_SWIPE_END';
exports.SET_SWIPE_END = SET_SWIPE_END;
const SET_SWIPE_START1 = 'SET_SWIPE_START1';
exports.SET_SWIPE_START1 = SET_SWIPE_START1;
const SET_SWIPE_END1 = 'SET_SWIPE_END1';
exports.SET_SWIPE_END1 = SET_SWIPE_END1;
const CLEAR_SWIPE_ACTION = 'CLEAR_SWIPE_ACTION';
exports.CLEAR_SWIPE_ACTION = CLEAR_SWIPE_ACTION;
const PROMPT_KEEP_ALIVE = 'PROMPT_KEEP_ALIVE';
exports.PROMPT_KEEP_ALIVE = PROMPT_KEEP_ALIVE;
const HIDE_PROMPT_KEEP_ALIVE = 'HIDE_PROMPT_KEEP_ALIVE';
exports.HIDE_PROMPT_KEEP_ALIVE = HIDE_PROMPT_KEEP_ALIVE;
const SELECT_INTERACTION_MODE = 'SELECT_INTERACTION_MODE';
exports.SELECT_INTERACTION_MODE = SELECT_INTERACTION_MODE;
const SELECT_COMMAND_GROUP = 'SELECT_COMMAND_GROUP';
exports.SELECT_COMMAND_GROUP = SELECT_COMMAND_GROUP;
const SELECT_COMMAND_SUB_GROUP = 'SELECT_COMMAND_SUB_GROUP';
exports.SELECT_COMMAND_SUB_GROUP = SELECT_COMMAND_SUB_GROUP;
const ENTERING_COMMAND_ARGS = 'ENTERING_COMMAND_ARGS';
exports.ENTERING_COMMAND_ARGS = ENTERING_COMMAND_ARGS;
const CANCEL_PENDING_COMMAND = 'CANCEL_PENDING_COMMAND';
exports.CANCEL_PENDING_COMMAND = CANCEL_PENDING_COMMAND;
const SET_COMMAND_ARG = 'SET_COMMAND_ARG';
exports.SET_COMMAND_ARG = SET_COMMAND_ARG;
const SET_CONTEXT = 'SET_CONTEXT';
exports.SET_CONTEXT = SET_CONTEXT;
const SET_APP_ID = 'SET_APP_ID';
exports.SET_APP_ID = SET_APP_ID;
const SET_SERVER_STATUS = 'SET_SERVER_STATUS';
exports.SET_SERVER_STATUS = SET_SERVER_STATUS;
const SET_KEEP_ALIVE_INTERVAL = 'SET_KEEP_ALIVE_INTERVAL';
exports.SET_KEEP_ALIVE_INTERVAL = SET_KEEP_ALIVE_INTERVAL;
const SET_USER_WAIT_TIMEOUT = 'SET_USER_WAIT_TIMEOUT';
exports.SET_USER_WAIT_TIMEOUT = SET_USER_WAIT_TIMEOUT;
const SET_LAST_ACTIVE_MOMENT = 'SET_LAST_ACTIVE_MOMENT';
exports.SET_LAST_ACTIVE_MOMENT = SET_LAST_ACTIVE_MOMENT;
const SET_VISIBLE_COMMAND_RESULT = 'SET_VISIBLE_COMMAND_RESULT';
exports.SET_VISIBLE_COMMAND_RESULT = SET_VISIBLE_COMMAND_RESULT;
const SET_AWAITING_MJPEG_STREAM = 'SET_AWAITING_MJPEG_STREAM';
exports.SET_AWAITING_MJPEG_STREAM = SET_AWAITING_MJPEG_STREAM;
const SHOW_GESTURE_EDITOR = 'SHOW_GESTURE_EDITOR';
exports.SHOW_GESTURE_EDITOR = SHOW_GESTURE_EDITOR;
const HIDE_GESTURE_EDITOR = 'HIDE_GESTURE_EDITOR';
exports.HIDE_GESTURE_EDITOR = HIDE_GESTURE_EDITOR;
const GET_SAVED_GESTURES_REQUESTED = 'GET_SAVED_GESTURES_REQUESTED';
exports.GET_SAVED_GESTURES_REQUESTED = GET_SAVED_GESTURES_REQUESTED;
const GET_SAVED_GESTURES_DONE = 'GET_SAVED_GESTURES_DONE';
exports.GET_SAVED_GESTURES_DONE = GET_SAVED_GESTURES_DONE;
const DELETE_SAVED_GESTURES_REQUESTED = 'DELETE_SAVED_GESTURES_REQUESTED';
exports.DELETE_SAVED_GESTURES_REQUESTED = DELETE_SAVED_GESTURES_REQUESTED;
const DELETE_SAVED_GESTURES_DONE = 'DELETE_SAVED_GESTURES_DONE';
exports.DELETE_SAVED_GESTURES_DONE = DELETE_SAVED_GESTURES_DONE;
const SET_LOADED_GESTURE = 'SET_LOADED_GESTURE';
exports.SET_LOADED_GESTURE = SET_LOADED_GESTURE;
const REMOVE_LOADED_GESTURE = 'REMOVE_LOADED_GESTURE';
exports.REMOVE_LOADED_GESTURE = REMOVE_LOADED_GESTURE;
const SHOW_GESTURE_ACTION = 'SHOW_GESTURE_ACTION';
exports.SHOW_GESTURE_ACTION = SHOW_GESTURE_ACTION;
const HIDE_GESTURE_ACTION = 'HIDE_GESTURE_ACTION';
exports.HIDE_GESTURE_ACTION = HIDE_GESTURE_ACTION;
const SELECT_TICK_ELEMENT = 'SELECT_TICK_ELEMENT';
exports.SELECT_TICK_ELEMENT = SELECT_TICK_ELEMENT;
const UNSELECT_TICK_ELEMENT = 'UNSELECT_TICK_ELEMENT';
exports.UNSELECT_TICK_ELEMENT = UNSELECT_TICK_ELEMENT;
const SET_GESTURE_TAP_COORDS_MODE = 'SET_GESTURE_TAP_COORDS_MODE';
exports.SET_GESTURE_TAP_COORDS_MODE = SET_GESTURE_TAP_COORDS_MODE;
const CLEAR_TAP_COORDINATES = 'CLEAR_TAP_COORDINATES';
exports.CLEAR_TAP_COORDINATES = CLEAR_TAP_COORDINATES;
const TOGGLE_SHOW_ATTRIBUTES = 'TOGGLE_SHOW_ATTRIBUTES';
exports.TOGGLE_SHOW_ATTRIBUTES = TOGGLE_SHOW_ATTRIBUTES;
const TOGGLE_REFRESHING_STATE = 'TOGGLE_REFRESHING_STATE';
exports.TOGGLE_REFRESHING_STATE = TOGGLE_REFRESHING_STATE;
const KEEP_ALIVE_PING_INTERVAL = 20 * 1000;
const NO_NEW_COMMAND_LIMIT = 24 * 60 * 60 * 1000; // Set timeout to 24 hours
const WAIT_FOR_USER_KEEP_ALIVE = 60 * 60 * 1000; // Give user 1 hour to reply

// A debounced function that calls findElement and gets info about the element
const findElement = _lodash.default.debounce(async function (strategyMap, dispatch, getState, path) {
  for (let [strategy, selector] of strategyMap) {
    // Get the information about the element
    const action = callClientMethod({
      strategy,
      selector
    });
    let {
      elementId,
      variableName,
      variableType
    } = await action(dispatch, getState);

    // Set the elementId, variableName and variableType for the selected element
    // (check first that the selectedElementPath didn't change, to avoid race conditions)
    if (elementId && getState().inspector.selectedElementPath === path) {
      return dispatch({
        type: SET_SELECTED_ELEMENT_ID,
        elementId,
        variableName,
        variableType
      });
    }
  }
  return dispatch({
    type: SET_INTERACTIONS_NOT_AVAILABLE
  });
}, 1000);
function selectElement(path) {
  return async (dispatch, getState) => {
    // Set the selected element in the source tree
    dispatch({
      type: SELECT_ELEMENT,
      path
    });
    const {
      selectedElement,
      sourceXML,
      expandedPaths
    } = getState().inspector;

    // Expand all of this element's ancestors so that it's visible in the source tree
    // Make a copy of the array to avoid state mutation
    const copiedExpandedPaths = [...expandedPaths];
    let pathArr = path.split('.').slice(0, path.length - 1);
    while (pathArr.length > 1) {
      pathArr.splice(pathArr.length - 1);
      let path = pathArr.join('.');
      if (!copiedExpandedPaths.includes(path)) {
        copiedExpandedPaths.push(path);
      }
    }
    dispatch({
      type: SET_EXPANDED_PATHS,
      paths: copiedExpandedPaths
    });

    // Find the optimal selection strategy. If none found, fall back to XPath.
    const strategyMap = _lodash.default.toPairs((0, _shared.getLocators)(selectedElement.attributes, sourceXML));
    strategyMap.push(['xpath', selectedElement.xpath]);

    // Debounce find element so that if another element is selected shortly after, cancel the previous search
    await findElement(strategyMap, dispatch, getState, path);
  };
}
function unselectElement() {
  return dispatch => {
    dispatch({
      type: UNSELECT_ELEMENT
    });
  };
}
function selectCentroid(path) {
  return dispatch => {
    dispatch({
      type: SELECT_CENTROID,
      path
    });
  };
}
function unselectCentroid() {
  return dispatch => {
    dispatch({
      type: UNSELECT_CENTROID
    });
  };
}
function selectHoveredCentroid(path) {
  return dispatch => {
    dispatch({
      type: SELECT_HOVERED_CENTROID,
      path
    });
  };
}
function unselectHoveredCentroid() {
  return dispatch => {
    dispatch({
      type: UNSELECT_HOVERED_CENTROID
    });
  };
}
function selectHoveredElement(path) {
  return dispatch => {
    dispatch({
      type: SELECT_HOVERED_ELEMENT,
      path
    });
  };
}
function unselectHoveredElement(path) {
  return dispatch => {
    dispatch({
      type: UNSELECT_HOVERED_ELEMENT,
      path
    });
  };
}

/**
 * Requests a method call on appium
 */
function applyClientMethod(params) {
  return async (dispatch, getState) => {
    const isRecording = params.methodName !== 'quit' && params.methodName !== 'getPageSource' && params.methodName !== 'gesture' && params.methodName !== 'status' && getState().inspector.isRecording;
    try {
      dispatch({
        type: METHOD_CALL_REQUESTED
      });
      const callAction = callClientMethod(params);
      const {
        contexts,
        contextsError,
        commandRes,
        currentContext,
        currentContextError,
        source,
        screenshot,
        windowSize,
        sourceError,
        screenshotError,
        windowSizeError,
        variableName,
        variableIndex,
        strategy,
        selector
      } = await callAction(dispatch, getState);

      // TODO: Implement recorder code for gestures
      if (isRecording) {
        // Add 'findAndAssign' line of code. Don't do it for arrays though. Arrays already have 'find' expression
        if (strategy && selector && !variableIndex && variableIndex !== 0) {
          const findAction = findAndAssign(strategy, selector, variableName, false);
          findAction(dispatch, getState);
        }

        // now record the actual action
        let args = [variableName, variableIndex];
        args = args.concat(params.args || []);
        dispatch({
          type: RECORD_ACTION,
          action: params.methodName,
          params: args
        });
      }
      dispatch({
        type: METHOD_CALL_DONE
      });
      if (source) {
        dispatch({
          type: SET_SOURCE_AND_SCREENSHOT,
          contexts,
          currentContext,
          source: source && (0, _util.xmlToJSON)(source),
          sourceXML: source,
          screenshot,
          windowSize,
          contextsError,
          currentContextError,
          sourceError,
          screenshotError,
          windowSizeError
        });
      }
      window.dispatchEvent(new Event('resize'));
      return commandRes;
    } catch (error) {
      console.log(error); // eslint-disable-line no-console
      let methodName = params.methodName === 'click' ? 'tap' : params.methodName;
      (0, _Session.showError)(error, methodName, 10);
      dispatch({
        type: METHOD_CALL_DONE
      });
    }
  };
}
function addAssignedVarCache(varName) {
  return dispatch => {
    dispatch({
      type: ADD_ASSIGNED_VAR_CACHE,
      varName
    });
  };
}
function setExpandedPaths(paths) {
  return dispatch => {
    dispatch({
      type: SET_EXPANDED_PATHS,
      paths
    });
  };
}

/**
 * Quit the session and go back to the new session window
 */
function quitSession(reason, killedByUser = true) {
  return async (dispatch, getState) => {
    const killAction = killKeepAliveLoop();
    killAction(dispatch, getState);
    const applyAction = applyClientMethod({
      methodName: 'quit'
    });
    await applyAction(dispatch, getState);
    dispatch({
      type: QUIT_SESSION_DONE
    });
    dispatch((0, _reduxFirstHistory.push)('/session'));
    if (!killedByUser) {
      _antd.notification.error({
        message: 'Error',
        description: reason || _i18nextConfig.default.t('Session has been terminated'),
        duration: 0
      });
    }
  };
}
function startRecording() {
  return dispatch => {
    dispatch({
      type: START_RECORDING
    });
  };
}
function pauseRecording() {
  return dispatch => {
    dispatch({
      type: PAUSE_RECORDING
    });
  };
}
function clearRecording() {
  return dispatch => {
    dispatch({
      type: CLEAR_RECORDING
    });
    dispatch({
      type: CLEAR_ASSIGNED_VAR_CACHE
    }); // Get rid of the variable cache
  };
}

function getSavedActionFramework() {
  return async dispatch => {
    let framework = await (0, _settings.getSetting)(_settings.SAVED_FRAMEWORK);
    dispatch({
      type: SET_ACTION_FRAMEWORK,
      framework
    });
  };
}
function setActionFramework(framework) {
  return async dispatch => {
    if (!_clientFrameworks.default[framework]) {
      throw new Error(_i18nextConfig.default.t('frameworkNotSupported', {
        framework
      }));
    }
    await (0, _settings.setSetting)(_settings.SAVED_FRAMEWORK, framework);
    dispatch({
      type: SET_ACTION_FRAMEWORK,
      framework
    });
  };
}
function recordAction(action, params) {
  return dispatch => {
    dispatch({
      type: RECORD_ACTION,
      action,
      params
    });
  };
}
function closeRecorder() {
  return dispatch => {
    dispatch({
      type: CLOSE_RECORDER
    });
  };
}
function toggleShowBoilerplate() {
  return (dispatch, getState) => {
    const show = !getState().inspector.showBoilerplate;
    dispatch({
      type: SET_SHOW_BOILERPLATE,
      show
    });
  };
}
function setSessionDetails({
  driver,
  sessionDetails,
  mode,
  mjpegScreenshotUrl
}) {
  return dispatch => {
    dispatch({
      type: SET_SESSION_DETAILS,
      driver,
      sessionDetails,
      mode,
      mjpegScreenshotUrl
    });
  };
}
function showLocatorTestModal() {
  return dispatch => {
    dispatch({
      type: SHOW_LOCATOR_TEST_MODAL
    });
  };
}
function hideLocatorTestModal() {
  return dispatch => {
    dispatch({
      type: HIDE_LOCATOR_TEST_MODAL
    });
  };
}
function showSiriCommandModal() {
  return dispatch => {
    dispatch({
      type: SHOW_SIRI_COMMAND_MODAL
    });
  };
}
function hideSiriCommandModal() {
  return dispatch => {
    dispatch({
      type: HIDE_SIRI_COMMAND_MODAL
    });
  };
}
function setSiriCommandValue(siriCommandValue) {
  return dispatch => {
    dispatch({
      type: SET_SIRI_COMMAND_VALUE,
      siriCommandValue
    });
  };
}
function setLocatorTestValue(locatorTestValue) {
  return dispatch => {
    dispatch({
      type: SET_LOCATOR_TEST_VALUE,
      locatorTestValue
    });
  };
}
function setLocatorTestStrategy(locatorTestStrategy) {
  return dispatch => {
    dispatch({
      type: SET_LOCATOR_TEST_STRATEGY,
      locatorTestStrategy
    });
  };
}
function setContext(context) {
  return dispatch => {
    dispatch({
      type: SET_CONTEXT,
      context
    });
  };
}
function searchForElement(strategy, selector) {
  return async (dispatch, getState) => {
    dispatch({
      type: SEARCHING_FOR_ELEMENTS
    });
    try {
      const callAction = callClientMethod({
        strategy,
        selector,
        fetchArray: true
      });
      let {
        elements,
        variableName,
        executionTime
      } = await callAction(dispatch, getState);
      const findAction = findAndAssign(strategy, selector, variableName, true);
      findAction(dispatch, getState);
      elements = elements.map(el => el.id);
      dispatch({
        type: SEARCHING_FOR_ELEMENTS_COMPLETED,
        elements,
        executionTime
      });
    } catch (error) {
      dispatch({
        type: SEARCHING_FOR_ELEMENTS_COMPLETED
      });
      (0, _Session.showError)(error, 10);
    }
  };
}

/**
 * Get all the find element times based on the find data source
 */
function getFindElementsTimes(findDataSource) {
  return async (dispatch, getState) => {
    dispatch({
      type: GET_FIND_ELEMENTS_TIMES
    });
    try {
      const findElementsExecutionTimes = [];
      for (const element of findDataSource) {
        const {
          find,
          key,
          selector
        } = element;
        const action = callClientMethod({
          strategy: key,
          selector
        });
        const {
          executionTime
        } = await action(dispatch, getState);
        findElementsExecutionTimes.push({
          find,
          key,
          selector,
          time: executionTime
        });
      }
      dispatch({
        type: GET_FIND_ELEMENTS_TIMES_COMPLETED,
        findElementsExecutionTimes: _lodash.default.sortBy(findElementsExecutionTimes, ['time'])
      });
    } catch (error) {
      dispatch({
        type: GET_FIND_ELEMENTS_TIMES_COMPLETED
      });
      (0, _Session.showError)(error, 10);
    }
  };
}
function findAndAssign(strategy, selector, variableName, isArray) {
  return (dispatch, getState) => {
    const {
      assignedVarCache
    } = getState().inspector;

    // If this call to 'findAndAssign' for this variable wasn't done already, do it now
    if (!assignedVarCache[variableName]) {
      dispatch({
        type: RECORD_ACTION,
        action: 'findAndAssign',
        params: [strategy, selector, variableName, isArray]
      });
      dispatch({
        type: ADD_ASSIGNED_VAR_CACHE,
        varName: variableName
      });
    }
  };
}
function setLocatorTestElement(elementId) {
  return async (dispatch, getState) => {
    dispatch({
      type: SET_LOCATOR_TEST_ELEMENT,
      elementId
    });
    dispatch({
      type: CLEAR_SEARCHED_FOR_ELEMENT_BOUNDS
    });
    if (elementId) {
      try {
        const action = callClientMethod({
          elementId,
          methodName: 'getRect',
          skipRefresh: true,
          skipRecord: true,
          ignoreResult: true
        });
        const {
          commandRes
        } = await action(dispatch, getState);
        dispatch({
          type: SET_SEARCHED_FOR_ELEMENT_BOUNDS,
          location: {
            x: commandRes.x,
            y: commandRes.y
          },
          size: {
            width: commandRes.width,
            height: commandRes.height
          }
        });
      } catch (ign) {}
    }
  };
}

/**
 * Given an element ID found through search, and its bounds,
 * attempt to find and select this element in the source tree
 */
function selectLocatedElement(source, bounds, id) {
  const UPPER_FILTER_LIMIT = 10;

  // Parse the source tree and find all nodes whose bounds match the expected bounds
  // Return the path + xpath of each node
  function findPathsMatchingBounds() {
    if (!bounds || !source.children || !source.children[0].attributes) {
      return null;
    }
    if (source.children[0].attributes.bounds) {
      const [endX, endY] = [bounds.location.x + bounds.size.width, bounds.location.y + bounds.size.height];
      const coords = `[${bounds.location.x},${bounds.location.y}][${endX},${endY}]`;
      return findPathsFromCoords(source.children, coords);
    } else if (source.children[0].attributes.x) {
      const combinedBounds = {
        x: String(bounds.location.x),
        y: String(bounds.location.y),
        height: String(bounds.size.height),
        width: String(bounds.size.width)
      };
      return findPathsFromBounds(source.children, combinedBounds);
    }
    return null;
  }

  // Recursive function for parsing source tree when elements have 'bounds' property
  function findPathsFromCoords(trees, coords) {
    let collectedPaths = [];
    for (const tree of trees) {
      if (tree.attributes.bounds === coords) {
        collectedPaths.push([tree.path, tree.xpath]);
      }
      if (tree.children.length) {
        collectedPaths.push(...findPathsFromCoords(tree.children, coords));
      }
    }
    return collectedPaths;
  }

  // Recursive function for parsing source tree when elements have 'x/y/height/width' properties
  function findPathsFromBounds(trees, bounds) {
    let collectedPaths = [];
    for (const tree of trees) {
      if (tree.attributes.x === bounds.x && tree.attributes.y === bounds.y && tree.attributes.height === bounds.height && tree.attributes.width === bounds.width) {
        collectedPaths.push([tree.path, tree.xpath]);
      }
      if (tree.children.length) {
        collectedPaths.push(...findPathsFromBounds(tree.children, bounds));
      }
    }
    return collectedPaths;
  }

  // If findPathsMatchingBounds found multiple items,
  // use Appium findElement to filter further by element ID
  async function filterFoundPaths(foundPaths, dispatch, getState) {
    if (!foundPaths) {
      return null;
    }
    if (foundPaths.length === 1) {
      return foundPaths[0][0];
    } else if (foundPaths.length !== 0 && foundPaths.length <= UPPER_FILTER_LIMIT) {
      return await findElementWithMatchingId(foundPaths, dispatch, getState);
    }
    return null;
  }

  // Calls Appium findElement for each provided xpath, and returns the path
  // of the element whose ID matches the expected ID
  async function findElementWithMatchingId(foundPaths, dispatch, getState) {
    for (const path of foundPaths) {
      const action = callClientMethod({
        strategy: 'xpath',
        selector: path[1]
      });
      const {
        el
      } = await action(dispatch, getState);
      if (el && el.elementId === id) {
        return path[0];
      }
    }
    return null;
  }
  return async (dispatch, getState) => {
    dispatch({
      type: FINDING_ELEMENT_IN_SOURCE
    });
    const foundPaths = findPathsMatchingBounds();
    const foundPath = await filterFoundPaths(foundPaths, dispatch, getState);
    if (foundPath) {
      const action = selectElement(foundPath);
      await action(dispatch, getState);
    } else {
      _antd.notification.error({
        message: _i18nextConfig.default.t('Error'),
        description: _i18nextConfig.default.t('findingElementInSourceFailed'),
        duration: 8
      });
    }
    dispatch({
      type: FINDING_ELEMENT_IN_SOURCE_COMPLETED
    });
  };
}
function clearSearchResults() {
  return dispatch => {
    dispatch({
      type: CLEAR_SEARCH_RESULTS
    });
    dispatch({
      type: CLEAR_SEARCHED_FOR_ELEMENT_BOUNDS
    });
  };
}
function selectScreenshotInteractionMode(screenshotInteractionMode) {
  return dispatch => {
    dispatch({
      type: SET_SCREENSHOT_INTERACTION_MODE,
      screenshotInteractionMode
    });
  };
}
function toggleRefreshingState() {
  return dispatch => {
    dispatch({
      type: TOGGLE_REFRESHING_STATE
    });
  };
}
function selectAppMode(mode) {
  return async (dispatch, getState) => {
    const {
      appMode
    } = getState().inspector;
    dispatch({
      type: SET_APP_MODE,
      mode
    });
    // if we're transitioning to hybrid mode, do a pre-emptive search for contexts
    if (appMode !== mode && mode === _shared.APP_MODE.WEB_HYBRID) {
      const action = applyClientMethod({
        methodName: 'getPageSource'
      });
      await action(dispatch, getState);
    }
    if (appMode !== mode && mode === _shared.APP_MODE.NATIVE) {
      const action = applyClientMethod({
        methodName: 'switchContext',
        args: [_appiumClient.NATIVE_APP]
      });
      await action(dispatch, getState);
    }
  };
}
function toggleShowCentroids() {
  return (dispatch, getState) => {
    const {
      showCentroids
    } = getState().inspector;
    const show = !showCentroids;
    dispatch({
      type: SET_SHOW_CENTROIDS,
      show
    });
  };
}
function getActiveAppId(isIOS, isAndroid) {
  return async (dispatch, getState) => {
    try {
      if (isIOS) {
        const action = applyClientMethod({
          methodName: 'executeScript',
          args: ['mobile:activeAppInfo', []]
        });
        const {
          bundleId
        } = await action(dispatch, getState);
        dispatch({
          type: SET_APP_ID,
          appId: bundleId
        });
      }
      if (isAndroid) {
        const action = applyClientMethod({
          methodName: 'getCurrentPackage'
        });
        const appPackage = await action(dispatch, getState);
        dispatch({
          type: SET_APP_ID,
          appId: appPackage
        });
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(`Could not Retrieve Active App ID: ${err}`);
    }
  };
}
function getServerStatus() {
  return async (dispatch, getState) => {
    const status = applyClientMethod({
      methodName: 'status'
    });
    const {
      build
    } = await status(dispatch, getState);
    dispatch({
      type: SET_SERVER_STATUS,
      status: build
    });
  };
}

// Start the session timer once session starts
function setSessionTime(time) {
  return dispatch => {
    dispatch({
      type: SET_SESSION_TIME,
      sessionStartTime: time
    });
  };
}
function setSwipeStart(swipeStartX, swipeStartY) {
  return dispatch => {
    dispatch({
      type: SET_SWIPE_START,
      swipeStartX,
      swipeStartY
    });
  };
}
function setSwipeStart1(swipeStartX, swipeStartY) {
  return dispatch => {
    dispatch({
      type: SET_SWIPE_START1,
      swipeStartX,
      swipeStartY
    });
  };
}
function setSwipeEnd(swipeEndX, swipeEndY) {
  return dispatch => {
    dispatch({
      type: SET_SWIPE_END,
      swipeEndX,
      swipeEndY
    });
  };
}
function setSwipeEnd1(swipeEndX, swipeEndY) {
  return dispatch => {
    dispatch({
      type: SET_SWIPE_END1,
      swipeEndX,
      swipeEndY
    });
  };
}
function clearSwipeAction() {
  return dispatch => {
    dispatch({
      type: CLEAR_SWIPE_ACTION
    });
  };
}
function promptKeepAlive() {
  return dispatch => {
    dispatch({
      type: PROMPT_KEEP_ALIVE
    });
  };
}
function hideKeepAlivePrompt() {
  return dispatch => {
    dispatch({
      type: HIDE_PROMPT_KEEP_ALIVE
    });
  };
}
function selectCommandGroup(group) {
  return dispatch => {
    dispatch({
      type: SELECT_COMMAND_GROUP,
      group
    });
  };
}
function selectCommandSubGroup(group) {
  return dispatch => {
    dispatch({
      type: SELECT_COMMAND_SUB_GROUP,
      group
    });
  };
}
function selectInteractionMode(interaction) {
  return dispatch => {
    dispatch({
      type: SELECT_INTERACTION_MODE,
      interaction
    });
  };
}
function startEnteringCommandArgs(commandName, command) {
  return dispatch => {
    dispatch({
      type: ENTERING_COMMAND_ARGS,
      commandName,
      command
    });
  };
}
function cancelPendingCommand() {
  return dispatch => {
    dispatch({
      type: CANCEL_PENDING_COMMAND
    });
  };
}
function setCommandArg(index, value) {
  return dispatch => {
    dispatch({
      type: SET_COMMAND_ARG,
      index,
      value
    });
  };
}

/**
 * Ping server every 30 seconds to prevent `newCommandTimeout` from killing session
 */
function runKeepAliveLoop() {
  return (dispatch, getState) => {
    dispatch({
      type: SET_LAST_ACTIVE_MOMENT,
      lastActiveMoment: Date.now()
    });
    const {
      driver
    } = getState().inspector;
    const keepAliveInterval = setInterval(async () => {
      const {
        lastActiveMoment
      } = getState().inspector;
      console.log('Pinging Appium server to keep session active'); // eslint-disable-line no-console
      try {
        await driver.getTimeouts(); // Pings the Appium server to keep it alive
      } catch (ign) {}
      const now = Date.now();

      // If the new command limit has been surpassed, prompt user if they want to keep session going
      // Give them WAIT_FOR_USER_KEEP_ALIVE ms to respond
      if (now - lastActiveMoment > NO_NEW_COMMAND_LIMIT) {
        const action = promptKeepAlive();
        action(dispatch);

        // After the time limit kill the session (this timeout will be killed if they keep it alive)
        const userWaitTimeout = setTimeout(() => {
          const action = quitSession(_i18nextConfig.default.t('Session closed due to inactivity'), false);
          action(dispatch, getState);
        }, WAIT_FOR_USER_KEEP_ALIVE);
        dispatch({
          type: SET_USER_WAIT_TIMEOUT,
          userWaitTimeout
        });
      }
    }, KEEP_ALIVE_PING_INTERVAL);
    dispatch({
      type: SET_KEEP_ALIVE_INTERVAL,
      keepAliveInterval
    });
  };
}

/**
 * Get rid of the intervals to keep the session alive
 */
function killKeepAliveLoop() {
  return (dispatch, getState) => {
    const {
      keepAliveInterval,
      userWaitTimeout
    } = getState().inspector;
    clearInterval(keepAliveInterval);
    if (userWaitTimeout) {
      clearTimeout(userWaitTimeout);
    }
    dispatch({
      type: SET_KEEP_ALIVE_INTERVAL,
      keepAliveInterval: null
    });
    dispatch({
      type: SET_USER_WAIT_TIMEOUT,
      userWaitTimeout: null
    });
  };
}

/**
 * Reset the new command clock and kill the wait for user timeout
 */
function keepSessionAlive() {
  return (dispatch, getState) => {
    const {
      userWaitTimeout
    } = getState().inspector;
    const action = hideKeepAlivePrompt();
    action(dispatch);
    dispatch({
      type: SET_LAST_ACTIVE_MOMENT,
      lastActiveMoment: +new Date()
    });
    if (userWaitTimeout) {
      clearTimeout(userWaitTimeout);
      dispatch({
        type: SET_USER_WAIT_TIMEOUT,
        userWaitTimeout: null
      });
    }
  };
}
function callClientMethod(params) {
  return async (dispatch, getState) => {
    console.log("🚀 ~ file: Inspector.js:803 ~ return ~ params:", params);
    console.log("🚀 ~ file: Inspector.js:804 ~ return ~ getState", getState());
    const {
      driver,
      appMode,
      mjpegScreenshotUrl,
      isSourceRefreshOn,
      selectedElement,
      screenshotInteractionMode
    } = getState().inspector;
    console.log("🚀 ~ file: Inspector.js:811 ~ return ~ selectedElement:", selectedElement);
    const {
      methodName,
      ignoreResult = true
    } = params;
    params.appMode = appMode;

    // don't retrieve screenshot if we're already using the mjpeg stream
    if (mjpegScreenshotUrl) {
      params.skipScreenshot = true;
    }
    if (!isSourceRefreshOn) {
      params.skipRefresh = true;
    }
    console.log('Calling client method with params:', params);
    const action = keepSessionAlive();
    action(dispatch, getState);
    console.log("driver session id", driver.sessionId);
    const client = _appiumClient.default.instance(driver);
    const res = await client.run(params);
    console.log("🚀 ~ file: Inspector.js:821 ~ return ~ res:", res);
    let {
      commandRes
    } = res;
    let postdata = {
      "session_id": driver.sessionId,
      params,
      selectedElement,
      'step-name': screenshotInteractionMode
    };
    if (postdata.params.methodName === "click") {
      console.log("🚀 ~ file: Inspector.js:825 ~ return ~ postdata:", postdata);
      await fetch("https://apprecord.testing24x7.ai/appAction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(postdata)
      }).then(response => {
        console.log("API response:", response);
      }).catch(error => {
        console.error("API error:", error);
      });
    } else if (postdata.params.methodName === "swipe") {
      // Exclude selectedElement from postdata
      delete postdata.selectedElement;
      console.log("🚀 ~ file: Inspector.js:825 ~ return ~ postdata:", postdata);
      await fetch("https://apprecord.testing24x7.ai/appAction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(postdata)
      }).then(response => {
        console.log("API response:", response);
      }).catch(error => {
        console.error("API error:", error);
      });

      //check the if the tap then it would be longpress , double tap, tap and drag and drop
    } else if (postdata.params.methodName === "tap") {
      delete postdata.selectedElement;
      console.log("🚀 ~ file: Inspector.js:825 ~ return ~ postdata:", postdata);
      await fetch("https://apprecord.testing24x7.ai/appAction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(postdata)
      }).then(response => {
        console.log("API response:", response);
      }).catch(error => {
        console.error("API error:", error);
      });
    } else if (postdata.params.methodName === "sendKeys") {
      console.log("🚀 ~ file: Inspector.js:825 ~ return ~ postdata:", postdata);
      await fetch("https://apprecord.testing24x7.ai/appAction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(postdata)
      }).then(response => {
        console.log("API response:", response);
      }).catch(error => {
        console.error("API error:", error);
      });
    }

    // Ignore empty objects
    if (_lodash.default.isObject(res) && _lodash.default.isEmpty(res)) {
      commandRes = null;
    }
    if (!ignoreResult) {
      // if the user is running actions manually, we want to show the full response with the
      // ability to scroll etc...
      const result = JSON.stringify(commandRes, null, '  ');
      const truncatedResult = _lodash.default.truncate(result, {
        length: 2000
      });
      console.log(`Got result from client method: ${truncatedResult}`);
      setVisibleCommandResult(result, methodName)(dispatch);
    }
    res.elementId = res.id;
    return res;
  };
}
function setVisibleCommandResult(result, methodName) {
  return dispatch => {
    dispatch({
      type: SET_VISIBLE_COMMAND_RESULT,
      result,
      methodName
    });
  };
}
function setAwaitingMjpegStream(isAwaiting) {
  return dispatch => {
    dispatch({
      type: SET_AWAITING_MJPEG_STREAM,
      isAwaiting
    });
  };
}
function saveGesture(params) {
  return async dispatch => {
    let savedGestures = (await (0, _settings.getSetting)(_settings.SET_SAVED_GESTURES)) || [];
    if (!params.id) {
      params.id = (0, _uuid.v4)();
      params.date = Date.now();
      savedGestures.push(params);
    } else {
      for (const gesture of savedGestures) {
        if (gesture.id === params.id) {
          gesture.name = params.name;
          gesture.description = params.description;
          gesture.actions = params.actions;
        }
      }
    }
    await (0, _settings.setSetting)(_settings.SET_SAVED_GESTURES, savedGestures);
    const action = getSavedGestures();
    await action(dispatch);
  };
}
function getSavedGestures() {
  return async dispatch => {
    dispatch({
      type: GET_SAVED_GESTURES_REQUESTED
    });
    const savedGestures = await (0, _settings.getSetting)(_settings.SET_SAVED_GESTURES);
    dispatch({
      type: GET_SAVED_GESTURES_DONE,
      savedGestures
    });
  };
}
function deleteSavedGesture(id) {
  return async dispatch => {
    dispatch({
      type: DELETE_SAVED_GESTURES_REQUESTED,
      deleteGesture: id
    });
    const gestures = await (0, _settings.getSetting)(_settings.SET_SAVED_GESTURES);
    const newGestures = gestures.filter(gesture => gesture.id !== id);
    await (0, _settings.setSetting)(_settings.SET_SAVED_GESTURES, newGestures);
    dispatch({
      type: DELETE_SAVED_GESTURES_DONE
    });
    dispatch({
      type: GET_SAVED_GESTURES_DONE,
      savedGestures: newGestures
    });
  };
}
function showGestureEditor() {
  return dispatch => {
    dispatch({
      type: SHOW_GESTURE_EDITOR
    });
    dispatch({
      type: SET_SCREENSHOT_INTERACTION_MODE,
      screenshotInteractionMode: 'gesture'
    });
  };
}
function hideGestureEditor() {
  return dispatch => {
    dispatch({
      type: HIDE_GESTURE_EDITOR
    });
    dispatch({
      type: SET_SCREENSHOT_INTERACTION_MODE,
      screenshotInteractionMode: 'select'
    });
  };
}
function setLoadedGesture(loadedGesture) {
  return dispatch => {
    dispatch({
      type: SET_LOADED_GESTURE,
      loadedGesture
    });
  };
}
function removeLoadedGesture() {
  return dispatch => {
    dispatch({
      type: REMOVE_LOADED_GESTURE
    });
  };
}
function displayGesture(showGesture) {
  return dispatch => {
    dispatch({
      type: SHOW_GESTURE_ACTION,
      showGesture
    });
  };
}
function removeGestureDisplay() {
  return dispatch => {
    dispatch({
      type: HIDE_GESTURE_ACTION
    });
  };
}
function selectTick(tick) {
  return (dispatch, getState) => {
    const {
      tickCoordinates
    } = getState().inspector;
    if (tickCoordinates) {
      dispatch({
        type: SET_GESTURE_TAP_COORDS_MODE,
        x: undefined,
        y: undefined
      });
    }
    dispatch({
      type: SELECT_TICK_ELEMENT,
      selectedTick: tick
    });
  };
}
function unselectTick() {
  return dispatch => {
    dispatch({
      type: CLEAR_TAP_COORDINATES
    });
    dispatch({
      type: UNSELECT_TICK_ELEMENT
    });
  };
}
function tapTickCoordinates(x, y) {
  return dispatch => {
    dispatch({
      type: SET_GESTURE_TAP_COORDS_MODE,
      x,
      y
    });
  };
}
function toggleShowAttributes() {
  return dispatch => {
    dispatch({
      type: TOGGLE_SHOW_ATTRIBUTES
    });
  };
}
},{"../components/Inspector/shared":"components/Inspector/shared.js","./Session":"actions/Session.js","../util":"util.js","../lib/client-frameworks":"lib/client-frameworks/index.js","../../shared/settings":"../shared/settings.js","../../configs/i18next.config.renderer":"../configs/i18next.config.renderer.js","../lib/appium-client":"lib/appium-client.js"}],"../../node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;
function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error;
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);
    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)?\/[^/]+(?:\?.*)?$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;

},{}],"../../node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();
  newLink.onload = function () {
    link.remove();
  };
  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;
function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');
    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;

},{"./bundle-url":"../../node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"components/Session/Session.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');
module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
module.exports = {
  "active-session": "_active-session_46061",
  "sessionContainer": "_sessionContainer_46061",
  "cloudProviderModal": "_cloudProviderModal_46061",
  "sessionFooter": "_sessionFooter_46061",
  "desiredCapsLink": "_desiredCapsLink_46061",
  "tabText": "_tabText_46061",
  "serverTabs": "_serverTabs_46061",
  "scrollingTabCont": "_scrollingTabCont_46061",
  "scrollingTab": "_scrollingTab_46061",
  "savedSessions": "_savedSessions_46061",
  "newSessionForm": "_newSessionForm_46061",
  "capsFormattedCol": "_capsFormattedCol_46061",
  "formattedCaps": "_formattedCaps_46061",
  "formattedCapsBody": "_formattedCapsBody_46061",
  "start-session-button": "_start-session-button_46061",
  "filepath-button": "_filepath-button_46061",
  "capsFormCol": "_capsFormCol_46061",
  "capsFormRow": "_capsFormRow_46061",
  "capsBoxFont": "_capsBoxFont_46061",
  "capsValueControl": "_capsValueControl_46061",
  "fileControlWrapper": "_fileControlWrapper_46061",
  "localDesc": "_localDesc_46061",
  "selected": "_selected_46061",
  "capsNameEditorButton": "_capsNameEditorButton_46061",
  "capsEditorControls": "_capsEditorControls_46061",
  "capsEditorButton": "_capsEditorButton_46061",
  "capsEditor": "_capsEditor_46061",
  "capsEditorTitle": "_capsEditorTitle_46061",
  "capsEditorBody": "_capsEditorBody_46061",
  "capsEditorBodyFull": "_capsEditorBodyFull_46061",
  "capsEditorBodyResized": "_capsEditorBodyResized_46061",
  "advancedSettingsContainerCol": "_advancedSettingsContainerCol_46061",
  "advancedSettingsContainer": "_advancedSettingsContainer_46061",
  "add-desired-capability-button": "_add-desired-capability-button_46061",
  "editSession": "_editSession_46061",
  "btnReload": "_btnReload_46061",
  "btnDeleteCap": "_btnDeleteCap_46061",
  "inputDataCenter": "_inputDataCenter_46061",
  "addonDataCenter": "_addonDataCenter_46061",
  "addonDataCenterRadioContainer": "_addonDataCenterRadioContainer_46061"
};
},{"_css_loader":"../../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"components/Session/ServerTabHeadspin.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _antd = require("antd");
var _Session = _interopRequireDefault(require("./Session.css"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const headspinUrl = 'https://xxxx.headspin.io:4723/v0/your-api-token/wd/hub';
const ServerTabHeadspin = ({
  server,
  setServerParam,
  t
}) => /*#__PURE__*/_react.default.createElement(_antd.Form, null, /*#__PURE__*/_react.default.createElement(_antd.Row, {
  gutter: 8
}, /*#__PURE__*/_react.default.createElement(_antd.Col, {
  span: 24
}, /*#__PURE__*/_react.default.createElement(_antd.Form.Item, null, /*#__PURE__*/_react.default.createElement(_antd.Input, {
  className: _Session.default.customServerInputLeft,
  id: "headspinServerHost",
  placeholder: headspinUrl,
  addonBefore: t('serverTabHeasdpinWebDriverURL'),
  value: server.headspin.webDriverUrl,
  onChange: e => setServerParam('webDriverUrl', e.target.value)
}), /*#__PURE__*/_react.default.createElement("p", {
  className: _Session.default.localDesc
}, t('sessionHeadspinWebDriverURLDescription'))))));
var _default = ServerTabHeadspin;
exports.default = _default;
},{"./Session.css":"components/Session/Session.css"}],"components/AntdTypes.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ROW = exports.INPUT = exports.BUTTON = exports.ALERT = void 0;
const BUTTON = {
  DEFAULT: 'default',
  PRIMARY: 'primary',
  DISABLED: 'disabled',
  DANGER: 'danger'
};
exports.BUTTON = BUTTON;
const ALERT = {
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info'
};
exports.ALERT = ALERT;
const INPUT = {
  NUMBER: 'number',
  TEXT: 'text',
  TEXTAREA: 'textarea',
  PASSWORD: 'password',
  SUBMIT: 'submit'
};
exports.INPUT = INPUT;
const ROW = {
  FLEX: 'flex'
};
exports.ROW = ROW;
},{}],"components/Session/ServerTabBrowserstack.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _antd = require("antd");
var _AntdTypes = require("../AntdTypes");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const browserstackUsernamePlaceholder = t => {
  if (process.env.BROWSERSTACK_USERNAME) {
    return t('usingDataFoundIn', {
      environmentVariable: 'BROWSERSTACK_USERNAME'
    });
  }
  return t('yourUsername');
};
const browserstackAccessKeyPlaceholder = t => {
  if (process.env.BROWSERSTACK_ACCESS_KEY) {
    return t('usingDataFoundIn', {
      environmentVariable: 'BROWSERSTACK_ACCESS_KEY'
    });
  }
  return t('yourAccessKey');
};
const ServerTabBrowserstack = ({
  server,
  setServerParam,
  t
}) => /*#__PURE__*/_react.default.createElement(_antd.Form, null, /*#__PURE__*/_react.default.createElement(_antd.Row, {
  gutter: 8
}, /*#__PURE__*/_react.default.createElement(_antd.Col, {
  span: 12
}, /*#__PURE__*/_react.default.createElement(_antd.Form.Item, null, /*#__PURE__*/_react.default.createElement(_antd.Input, {
  id: "browserstackUsername",
  placeholder: browserstackUsernamePlaceholder(t),
  addonBefore: t('BrowserStack Username'),
  value: server.browserstack.username,
  onChange: e => setServerParam('username', e.target.value)
}))), /*#__PURE__*/_react.default.createElement(_antd.Col, {
  span: 12
}, /*#__PURE__*/_react.default.createElement(_antd.Form.Item, null, /*#__PURE__*/_react.default.createElement(_antd.Input, {
  id: "browserstackPassword",
  type: _AntdTypes.INPUT.PASSWORD,
  placeholder: browserstackAccessKeyPlaceholder(t),
  addonBefore: t('BrowserStack Access Key'),
  value: server.browserstack.accessKey,
  onChange: e => setServerParam('accessKey', e.target.value)
})))));
var _default = ServerTabBrowserstack;
exports.default = _default;
},{"../AntdTypes":"components/AntdTypes.js"}],"components/Session/ServerTabLambdatest.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _antd = require("antd");
var _AntdTypes = require("../AntdTypes");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const lambdatestUsernamePlaceholder = t => {
  if (process.env.LAMBDATEST_USERNAME) {
    return t('usingDataFoundIn', {
      environmentVariable: 'LAMBDATEST_USERNAME'
    });
  }
  return t('yourUsername');
};
const lambdatestAccessKeyPlaceholder = t => {
  if (process.env.LAMBDATEST_ACCESS_KEY) {
    return t('usingDataFoundIn', {
      environmentVariable: 'LAMBDATEST_ACCESS_KEY'
    });
  }
  return t('yourAccessKey');
};
const ServerTabLambdatest = ({
  server,
  setServerParam,
  t
}) => /*#__PURE__*/_react.default.createElement(_antd.Form, null, /*#__PURE__*/_react.default.createElement(_antd.Row, {
  gutter: 8
}, /*#__PURE__*/_react.default.createElement(_antd.Col, {
  span: 12
}, /*#__PURE__*/_react.default.createElement(_antd.Form.Item, null, /*#__PURE__*/_react.default.createElement(_antd.Input, {
  id: "lambdatestUsername",
  placeholder: lambdatestUsernamePlaceholder(t),
  addonBefore: t('LambdaTest Username'),
  value: server.lambdatest.username,
  onChange: e => setServerParam('username', e.target.value)
}))), /*#__PURE__*/_react.default.createElement(_antd.Col, {
  span: 12
}, /*#__PURE__*/_react.default.createElement(_antd.Form.Item, null, /*#__PURE__*/_react.default.createElement(_antd.Input, {
  id: "lambdatestPassword",
  type: _AntdTypes.INPUT.PASSWORD,
  placeholder: lambdatestAccessKeyPlaceholder(t),
  addonBefore: t('LambdaTest Access Key'),
  value: server.lambdatest.accessKey,
  onChange: e => setServerParam('accessKey', e.target.value)
})))));
var _default = ServerTabLambdatest;
exports.default = _default;
},{"../AntdTypes":"components/AntdTypes.js"}],"components/Session/ServerTabBitbar.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _antd = require("antd");
var _AntdTypes = require("../AntdTypes");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const bitbarApiKeyPlaceholder = t => {
  if (process.env.BITBAR_API_KEY) {
    return t('usingDataFoundIn', {
      environmentVariable: 'BITBAR_API_KEY'
    });
  }
  return t('yourApiKey');
};
const ServerTabBitbar = ({
  server,
  setServerParam,
  t
}) => /*#__PURE__*/_react.default.createElement(_antd.Form, null, /*#__PURE__*/_react.default.createElement(_antd.Row, {
  gutter: 8
}, /*#__PURE__*/_react.default.createElement(_antd.Col, {
  span: 24
}, /*#__PURE__*/_react.default.createElement(_antd.Form.Item, null, /*#__PURE__*/_react.default.createElement(_antd.Input, {
  id: "bitbarApiKey",
  type: _AntdTypes.INPUT.PASSWORD,
  placeholder: bitbarApiKeyPlaceholder(t),
  addonBefore: t('Bitbar API Key'),
  value: server.bitbar.apiKey,
  onChange: e => setServerParam('apiKey', e.target.value)
})))));
var _default = ServerTabBitbar;
exports.default = _default;
},{"../AntdTypes":"components/AntdTypes.js"}],"components/Session/ServerTabKobiton.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _antd = require("antd");
var _AntdTypes = require("../AntdTypes");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const kobitonUsernamePlaceholder = t => {
  if (process.env.KOBITON_USERNAME) {
    return t('usingDataFoundIn', {
      environmentVariable: 'KOBITON_USERNAME'
    });
  }
  return t('yourUsername');
};
const kobitonAccessKeyPlaceholder = t => {
  if (process.env.KOBITON_ACCESS_KEY) {
    return t('usingDataFoundIn', {
      environmentVariable: 'KOBITON_ACCESS_KEY'
    });
  }
  return t('yourAccessKey');
};
const ServerTabKobiton = ({
  server,
  setServerParam,
  t
}) => /*#__PURE__*/_react.default.createElement(_antd.Form, null, /*#__PURE__*/_react.default.createElement(_antd.Row, {
  gutter: 8
}, /*#__PURE__*/_react.default.createElement(_antd.Col, {
  span: 12
}, /*#__PURE__*/_react.default.createElement(_antd.Form.Item, null, /*#__PURE__*/_react.default.createElement(_antd.Input, {
  id: "kobitonUsername",
  placeholder: kobitonUsernamePlaceholder(t),
  addonBefore: t('Your Kobiton Username'),
  value: server.kobiton.username,
  onChange: e => setServerParam('username', e.target.value)
}))), /*#__PURE__*/_react.default.createElement(_antd.Col, {
  span: 12
}, /*#__PURE__*/_react.default.createElement(_antd.Form.Item, null, /*#__PURE__*/_react.default.createElement(_antd.Input, {
  id: "kobitonAccessKey",
  type: _AntdTypes.INPUT.PASSWORD,
  placeholder: kobitonAccessKeyPlaceholder(t),
  addonBefore: t('Kobiton Access Key'),
  value: server.kobiton.accessKey,
  onChange: e => setServerParam('accessKey', e.target.value)
})))));
var _default = ServerTabKobiton;
exports.default = _default;
},{"../AntdTypes":"components/AntdTypes.js"}],"components/Session/ServerTabPerfecto.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _antd = require("antd");
var _Session = _interopRequireDefault(require("./Session.css"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const cloudPerfectoUrl = 'cloud.Perfectomobile.com';
const portPlaceholder = server => server.perfecto.ssl ? '443' : '80';
const perfectoTokenPlaceholder = t => {
  if (process.env.PERFECTO_TOKEN) {
    return t('usingDataFoundIn', {
      environmentVariable: 'PERFECTO_TOKEN'
    });
  }
  return t('Add your token');
};
const ServerTabPerfecto = ({
  server,
  setServerParam,
  t
}) => /*#__PURE__*/_react.default.createElement(_antd.Form, null, /*#__PURE__*/_react.default.createElement(_antd.Row, {
  gutter: 8
}, /*#__PURE__*/_react.default.createElement(_antd.Col, {
  span: 9
}, /*#__PURE__*/_react.default.createElement(_antd.Form.Item, null, /*#__PURE__*/_react.default.createElement(_antd.Input, {
  className: _Session.default.customServerInputLeft,
  id: "PerfectoServerHost",
  placeholder: cloudPerfectoUrl,
  addonBefore: t('Perfecto Host'),
  value: server.perfecto.hostname,
  onChange: e => setServerParam('hostname', e.target.value)
}))), /*#__PURE__*/_react.default.createElement(_antd.Col, {
  span: 4
}, /*#__PURE__*/_react.default.createElement(_antd.Form.Item, null, /*#__PURE__*/_react.default.createElement(_antd.Input, {
  id: "PerfectoPort",
  placeholder: portPlaceholder(server),
  addonBefore: t('Perfecto Port'),
  value: server.perfecto.port,
  onChange: e => setServerParam('port', e.target.value)
}))), /*#__PURE__*/_react.default.createElement(_antd.Col, {
  span: 9
}, /*#__PURE__*/_react.default.createElement(_antd.Form.Item, null, /*#__PURE__*/_react.default.createElement(_antd.Input, {
  id: "token",
  placeholder: perfectoTokenPlaceholder(t),
  addonBefore: t('Perfecto Token'),
  value: server.perfecto.token,
  onChange: e => setServerParam('token', e.target.value)
}))), /*#__PURE__*/_react.default.createElement(_antd.Col, {
  span: 2
}, /*#__PURE__*/_react.default.createElement(_antd.Form.Item, null, /*#__PURE__*/_react.default.createElement(_antd.Checkbox, {
  checked: !!server.perfecto.ssl,
  onChange: e => setServerParam('ssl', e.target.checked)
}, " ", 'SSL')))));
var _default = ServerTabPerfecto;
exports.default = _default;
},{"./Session.css":"components/Session/Session.css"}],"components/Session/ServerTabPcloudy.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _antd = require("antd");
var _Session = _interopRequireDefault(require("./Session.css"));
var _AntdTypes = require("../AntdTypes");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const pcloudyUsernamePlaceholder = 'username@pcloudy.com';
const pcloudyHostPlaceholder = 'cloud.pcloudy.com';
const pcloudyAccessKeyExample = 'kjdgtdwn65fdasd78uy6y';
const ServerTabPcloudy = ({
  server,
  setServerParam,
  t
}) => /*#__PURE__*/_react.default.createElement(_antd.Form, null, /*#__PURE__*/_react.default.createElement(_antd.Row, {
  gutter: 8
}, /*#__PURE__*/_react.default.createElement(_antd.Col, {
  span: 8
}, /*#__PURE__*/_react.default.createElement(_antd.Form.Item, null, /*#__PURE__*/_react.default.createElement(_antd.Input, {
  className: _Session.default.customServerInputLeft,
  id: "PcloudyServerHost",
  placeholder: pcloudyHostPlaceholder,
  addonBefore: t('Pcloudy Host'),
  value: server.pcloudy.hostname,
  onChange: e => setServerParam('hostname', e.target.value)
}))), /*#__PURE__*/_react.default.createElement(_antd.Col, {
  span: 8
}, /*#__PURE__*/_react.default.createElement(_antd.Form.Item, null, /*#__PURE__*/_react.default.createElement(_antd.Input, {
  id: "username",
  type: _AntdTypes.INPUT.TEXT,
  placeholder: pcloudyUsernamePlaceholder,
  addonBefore: t('Pcloudy User Name'),
  value: server.pcloudy.username,
  onChange: e => setServerParam('username', e.target.value)
}))), /*#__PURE__*/_react.default.createElement(_antd.Col, {
  span: 8
}, /*#__PURE__*/_react.default.createElement(_antd.Form.Item, null, /*#__PURE__*/_react.default.createElement(_antd.Input, {
  id: "accessKey",
  type: _AntdTypes.INPUT.PASSWORD,
  placeholder: pcloudyAccessKeyExample,
  addonBefore: t('Pcloudy API Key'),
  value: server.pcloudy.accessKey,
  onChange: e => setServerParam('accessKey', e.target.value)
})))));
var _default = ServerTabPcloudy;
exports.default = _default;
},{"./Session.css":"components/Session/Session.css","../AntdTypes":"components/AntdTypes.js"}],"components/Session/ServerTabSauce.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _antd = require("antd");
var _Session = _interopRequireDefault(require("./Session.css"));
var _AntdTypes = require("../AntdTypes");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const sauceUsernamePlaceholder = t => {
  if (process.env.SAUCE_USERNAME) {
    return t('usingDataFoundIn', {
      environmentVariable: 'SAUCE_USERNAME'
    });
  }
  return t('yourUsername');
};
const sauceAccessKeyPlaceholder = t => {
  if (process.env.SAUCE_ACCESS_KEY) {
    return t('usingDataFoundIn', {
      environmentVariable: 'SAUCE_ACCESS_KEY'
    });
  }
  return t('yourAccessKey');
};
const ServerTabSauce = ({
  server,
  setServerParam,
  t
}) => /*#__PURE__*/_react.default.createElement(_antd.Form, null, /*#__PURE__*/_react.default.createElement(_antd.Row, {
  gutter: 8
}, /*#__PURE__*/_react.default.createElement(_antd.Col, {
  span: 12
}, /*#__PURE__*/_react.default.createElement(_antd.Form.Item, null, /*#__PURE__*/_react.default.createElement(_antd.Input, {
  id: "sauceUsername",
  placeholder: sauceUsernamePlaceholder(t),
  addonBefore: t('Sauce Username'),
  value: server.sauce.username,
  onChange: e => setServerParam('username', e.target.value)
}))), /*#__PURE__*/_react.default.createElement(_antd.Col, {
  span: 12
}, /*#__PURE__*/_react.default.createElement(_antd.Form.Item, null, /*#__PURE__*/_react.default.createElement(_antd.Input, {
  id: "saucePassword",
  type: _AntdTypes.INPUT.PASSWORD,
  placeholder: sauceAccessKeyPlaceholder(t),
  addonBefore: t('Sauce Access Key'),
  value: server.sauce.accessKey,
  onChange: e => setServerParam('accessKey', e.target.value)
})))), /*#__PURE__*/_react.default.createElement(_antd.Row, {
  gutter: 8
}, /*#__PURE__*/_react.default.createElement(_antd.Col, {
  span: 8
}, /*#__PURE__*/_react.default.createElement(_antd.Form.Item, null, /*#__PURE__*/_react.default.createElement("div", {
  className: ['ant-input-group-addon', _Session.default.addonDataCenter].join(' ')
}, t('SauceLabs Data Center')), /*#__PURE__*/_react.default.createElement(_antd.Radio.Group, {
  className: [_Session.default.inputDataCenter, _Session.default.addonDataCenterRadioContainer].join(' '),
  buttonStyle: "solid",
  defaultValue: "us-west-1",
  id: "sauceObjectDataCenter",
  value: server.sauce.dataCenter,
  onChange: e => setServerParam('dataCenter', e.target.value)
}, /*#__PURE__*/_react.default.createElement(_antd.Tooltip, {
  placement: "top",
  title: t('UP')
}, /*#__PURE__*/_react.default.createElement(_antd.Radio, {
  value: "us-west-1"
}, t('US'))), /*#__PURE__*/_react.default.createElement(_antd.Radio, {
  value: "eu-central-1"
}, t('EU'))))), /*#__PURE__*/_react.default.createElement(_antd.Col, {
  span: 8,
  align: "right"
}, /*#__PURE__*/_react.default.createElement(_antd.Form.Item, null, /*#__PURE__*/_react.default.createElement(_antd.Checkbox, {
  checked: !!server.sauce.useSCProxy,
  onChange: e => setServerParam('useSCProxy', e.target.checked)
}, " ", t('proxyThroughSC')))), /*#__PURE__*/_react.default.createElement(_antd.Col, {
  span: 5
}, /*#__PURE__*/_react.default.createElement(_antd.Form.Item, null, /*#__PURE__*/_react.default.createElement(_antd.Input, {
  addonBefore: t('Host'),
  placeholder: t('localhost'),
  disabled: !server.sauce.useSCProxy,
  value: server.sauce.scHost,
  onChange: e => setServerParam('scHost', e.target.value)
}))), /*#__PURE__*/_react.default.createElement(_antd.Col, {
  span: 3
}, /*#__PURE__*/_react.default.createElement(_antd.Form.Item, null, /*#__PURE__*/_react.default.createElement(_antd.Input, {
  addonBefore: t('Port'),
  placeholder: 4445,
  disabled: !server.sauce.useSCProxy,
  value: server.sauce.scPort,
  onChange: e => setServerParam('scPort', e.target.value)
})))));
var _default = ServerTabSauce;
exports.default = _default;
},{"./Session.css":"components/Session/Session.css","../AntdTypes":"components/AntdTypes.js"}],"components/Session/ServerTabTestingbot.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _antd = require("antd");
var _AntdTypes = require("../AntdTypes");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const testingbotKeyPlaceholder = t => {
  if (process.env.TB_KEY) {
    return t('usingDataFoundIn', {
      environmentVariable: 'TB_KEY'
    });
  }
  return t('yourUsername');
};
const testingbotSecretPlaceholder = t => {
  if (process.env.TB_SECRET) {
    return t('usingDataFoundIn', {
      environmentVariable: 'TB_SECRET'
    });
  }
  return t('yourAccessKey');
};
const ServerTabTestingbot = ({
  server,
  setServerParam,
  t
}) => /*#__PURE__*/_react.default.createElement(_antd.Form, null, /*#__PURE__*/_react.default.createElement(_antd.Row, {
  gutter: 8
}, /*#__PURE__*/_react.default.createElement(_antd.Col, {
  span: 12
}, /*#__PURE__*/_react.default.createElement(_antd.Form.Item, null, /*#__PURE__*/_react.default.createElement(_antd.Input, {
  id: "testingbotKey",
  placeholder: testingbotKeyPlaceholder(t),
  addonBefore: t('TestingBot Key'),
  value: server.testingbot.key,
  onChange: e => setServerParam('key', e.target.value)
}))), /*#__PURE__*/_react.default.createElement(_antd.Col, {
  span: 12
}, /*#__PURE__*/_react.default.createElement(_antd.Form.Item, null, /*#__PURE__*/_react.default.createElement(_antd.Input, {
  id: "testingbotSecret",
  type: _AntdTypes.INPUT.PASSWORD,
  placeholder: testingbotSecretPlaceholder(t),
  addonBefore: t('TestingBot Secret'),
  value: server.testingbot.secret,
  onChange: e => setServerParam('secret', e.target.value)
})))));
var _default = ServerTabTestingbot;
exports.default = _default;
},{"../AntdTypes":"components/AntdTypes.js"}],"components/Session/ServerTabExperitest.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _antd = require("antd");
var _Session = _interopRequireDefault(require("./Session.css"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const accessKeyPlaceholder = 'accessKey';
const placeholderUrl = 'https://example.experitest.com';
const ServerTabExperitest = ({
  server,
  setServerParam,
  t
}) => /*#__PURE__*/_react.default.createElement(_antd.Form, null, /*#__PURE__*/_react.default.createElement(_antd.Row, {
  gutter: 8
}, /*#__PURE__*/_react.default.createElement(_antd.Col, {
  span: 12
}, /*#__PURE__*/_react.default.createElement(_antd.Form.Item, null, /*#__PURE__*/_react.default.createElement(_antd.Input, {
  className: _Session.default.customServerInputLeft,
  id: "ExperitestServerUrl",
  placeholder: placeholderUrl,
  addonBefore: t('experitestUrl'),
  value: server.experitest.url,
  onChange: evt => setServerParam('url', evt.target.value)
}))), /*#__PURE__*/_react.default.createElement(_antd.Col, {
  span: 12
}, /*#__PURE__*/_react.default.createElement(_antd.Form.Item, null, /*#__PURE__*/_react.default.createElement(_antd.Input, {
  className: _Session.default.customServerInputLeft,
  id: "ExperitestServerAccessKey",
  placeholder: accessKeyPlaceholder,
  addonBefore: t('experitestAccessKey'),
  value: server.experitest.accessKey,
  onChange: evt => setServerParam('accessKey', evt.target.value)
})))));
var _default = ServerTabExperitest;
exports.default = _default;
},{"./Session.css":"components/Session/Session.css"}],"components/Session/ServerTabRobotQA.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _antd = require("antd");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const robotQATokenPlaceholder = t => {
  if (process.env.ROBOTQA_TOKEN) {
    return t('usingDataFoundIn', {
      environmentVariable: 'ROBOTQA_TOKEN'
    });
  }
  return t('Add your token');
};
const ServerTabRobotQA = ({
  server,
  setServerParam,
  t
}) => /*#__PURE__*/_react.default.createElement(_antd.Form, null, /*#__PURE__*/_react.default.createElement(_antd.Row, {
  gutter: 8
}, /*#__PURE__*/_react.default.createElement(_antd.Col, {
  span: 24
}, /*#__PURE__*/_react.default.createElement(_antd.Form.Item, null, /*#__PURE__*/_react.default.createElement(_antd.Input, {
  id: "robotQAToken",
  placeholder: robotQATokenPlaceholder(t),
  addonBefore: t('RobotQA Token'),
  value: server.roboticmobi.token,
  onChange: e => setServerParam('token', e.target.value)
})))));
var _default = ServerTabRobotQA;
exports.default = _default;
},{}],"components/Session/ServerTabRemoteTestKit.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _antd = require("antd");
var _AntdTypes = require("../AntdTypes");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const ServerTabRemoteTestkit = ({
  server,
  setServerParam,
  t
}) => /*#__PURE__*/_react.default.createElement(_antd.Form, null, /*#__PURE__*/_react.default.createElement(_antd.Row, {
  gutter: 8
}, /*#__PURE__*/_react.default.createElement(_antd.Col, {
  span: 24
}, /*#__PURE__*/_react.default.createElement(_antd.Form.Item, null, /*#__PURE__*/_react.default.createElement(_antd.Input, {
  id: "remoteTestKitAccessToken",
  type: _AntdTypes.INPUT.PASSWORD,
  addonBefore: t('RemoteTestKit AccessToken'),
  value: server.remotetestkit.token,
  onChange: e => setServerParam('token', e.target.value)
})))));
var _default = ServerTabRemoteTestkit;
exports.default = _default;
},{"../AntdTypes":"components/AntdTypes.js"}],"images/sauce_logo.svg":[function(require,module,exports) {
module.exports = "sauce_logo.7b689af7.svg";
},{}],"images/headspin_logo.svg":[function(require,module,exports) {
module.exports = "headspin_logo.557fb4f4.svg";
},{}],"images/browserstack_logo.svg":[function(require,module,exports) {
module.exports = "browserstack_logo.738dfe32.svg";
},{}],"images/lambdatest_logo.svg":[function(require,module,exports) {
module.exports = "lambdatest_logo.c2fa0064.svg";
},{}],"images/bitbar_logo.svg":[function(require,module,exports) {
module.exports = "bitbar_logo.192f8b19.svg";
},{}],"images/kobiton_logo.svg":[function(require,module,exports) {
module.exports = "kobiton_logo.53ea17ad.svg";
},{}],"images/perfecto_logo.svg":[function(require,module,exports) {
module.exports = "perfecto_logo.db858a29.svg";
},{}],"images/pcloudy_logo.svg":[function(require,module,exports) {
module.exports = "pcloudy_logo.1d5301b4.svg";
},{}],"images/testingbot_logo.svg":[function(require,module,exports) {
module.exports = "testingbot_logo.d0430f78.svg";
},{}],"images/experitest_logo.svg":[function(require,module,exports) {
module.exports = "experitest_logo.698fdbd5.svg";
},{}],"images/robotqa_logo.svg":[function(require,module,exports) {
module.exports = "robotqa_logo.7d16ed03.svg";
},{}],"images/remotetestkit_logo.svg":[function(require,module,exports) {
module.exports = "remotetestkit_logo.8802f193.svg";
},{}],"components/Session/CloudProviders.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _ServerTabHeadspin = _interopRequireDefault(require("./ServerTabHeadspin"));
var _ServerTabBrowserstack = _interopRequireDefault(require("./ServerTabBrowserstack"));
var _ServerTabLambdatest = _interopRequireDefault(require("./ServerTabLambdatest"));
var _ServerTabBitbar = _interopRequireDefault(require("./ServerTabBitbar"));
var _ServerTabKobiton = _interopRequireDefault(require("./ServerTabKobiton"));
var _ServerTabPerfecto = _interopRequireDefault(require("./ServerTabPerfecto"));
var _ServerTabPcloudy = _interopRequireDefault(require("./ServerTabPcloudy"));
var _ServerTabSauce = _interopRequireDefault(require("./ServerTabSauce"));
var _ServerTabTestingbot = _interopRequireDefault(require("./ServerTabTestingbot"));
var _ServerTabExperitest = _interopRequireDefault(require("./ServerTabExperitest"));
var _ServerTabRobotQA = _interopRequireDefault(require("./ServerTabRobotQA"));
var _ServerTabRemoteTestKit = _interopRequireDefault(require("./ServerTabRemoteTestKit"));
var _Session = _interopRequireDefault(require("./Session.css"));
var _sauce_logo = _interopRequireDefault(require("../../images/sauce_logo.svg"));
var _headspin_logo = _interopRequireDefault(require("../../images/headspin_logo.svg"));
var _browserstack_logo = _interopRequireDefault(require("../../images/browserstack_logo.svg"));
var _lambdatest_logo = _interopRequireDefault(require("../../images/lambdatest_logo.svg"));
var _bitbar_logo = _interopRequireDefault(require("../../images/bitbar_logo.svg"));
var _kobiton_logo = _interopRequireDefault(require("../../images/kobiton_logo.svg"));
var _perfecto_logo = _interopRequireDefault(require("../../images/perfecto_logo.svg"));
var _pcloudy_logo = _interopRequireDefault(require("../../images/pcloudy_logo.svg"));
var _testingbot_logo = _interopRequireDefault(require("../../images/testingbot_logo.svg"));
var _experitest_logo = _interopRequireDefault(require("../../images/experitest_logo.svg"));
var _robotqa_logo = _interopRequireDefault(require("../../images/robotqa_logo.svg"));
var _remotetestkit_logo = _interopRequireDefault(require("../../images/remotetestkit_logo.svg"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// ParcelJS handles image loading by exporting a path to the image

const CloudProviders = {
  sauce: {
    tabhead: () => /*#__PURE__*/_react.default.createElement("span", {
      className: _Session.default.tabText
    }, /*#__PURE__*/_react.default.createElement("img", {
      src: _sauce_logo.default
    })),
    tab: props => /*#__PURE__*/_react.default.createElement(_ServerTabSauce.default, props),
    logo: _sauce_logo.default
  },
  headspin: {
    tabhead: () => /*#__PURE__*/_react.default.createElement("span", {
      className: _Session.default.tabText
    }, /*#__PURE__*/_react.default.createElement("img", {
      src: _headspin_logo.default
    })),
    tab: props => /*#__PURE__*/_react.default.createElement(_ServerTabHeadspin.default, props),
    logo: _headspin_logo.default
  },
  browserstack: {
    tabhead: () => /*#__PURE__*/_react.default.createElement("span", {
      className: _Session.default.tabText
    }, /*#__PURE__*/_react.default.createElement("img", {
      src: _browserstack_logo.default
    })),
    tab: props => /*#__PURE__*/_react.default.createElement(_ServerTabBrowserstack.default, props),
    logo: _browserstack_logo.default
  },
  lambdatest: {
    tabhead: () => /*#__PURE__*/_react.default.createElement("span", {
      className: _Session.default.tabText
    }, /*#__PURE__*/_react.default.createElement("img", {
      src: _lambdatest_logo.default
    })),
    tab: props => /*#__PURE__*/_react.default.createElement(_ServerTabLambdatest.default, props),
    logo: _lambdatest_logo.default
  },
  bitbar: {
    tabhead: () => /*#__PURE__*/_react.default.createElement("span", {
      className: _Session.default.tabText
    }, /*#__PURE__*/_react.default.createElement("img", {
      src: _bitbar_logo.default
    })),
    tab: props => /*#__PURE__*/_react.default.createElement(_ServerTabBitbar.default, props),
    logo: _bitbar_logo.default
  },
  kobiton: {
    tabhead: () => /*#__PURE__*/_react.default.createElement("span", {
      className: _Session.default.tabText
    }, /*#__PURE__*/_react.default.createElement("img", {
      src: _kobiton_logo.default
    })),
    tab: props => /*#__PURE__*/_react.default.createElement(_ServerTabKobiton.default, props),
    logo: _kobiton_logo.default
  },
  perfecto: {
    tabhead: () => /*#__PURE__*/_react.default.createElement("span", {
      className: _Session.default.tabText
    }, /*#__PURE__*/_react.default.createElement("img", {
      src: _perfecto_logo.default
    })),
    tab: props => /*#__PURE__*/_react.default.createElement(_ServerTabPerfecto.default, props),
    logo: _perfecto_logo.default
  },
  pcloudy: {
    tabhead: () => /*#__PURE__*/_react.default.createElement("span", {
      className: _Session.default.tabText
    }, /*#__PURE__*/_react.default.createElement("img", {
      src: _pcloudy_logo.default
    })),
    tab: props => /*#__PURE__*/_react.default.createElement(_ServerTabPcloudy.default, props),
    logo: _pcloudy_logo.default
  },
  testingbot: {
    tabhead: () => /*#__PURE__*/_react.default.createElement("span", {
      className: _Session.default.tabText
    }, /*#__PURE__*/_react.default.createElement("img", {
      src: _testingbot_logo.default
    })),
    tab: props => /*#__PURE__*/_react.default.createElement(_ServerTabTestingbot.default, props),
    logo: _testingbot_logo.default
  },
  experitest: {
    tabhead: () => /*#__PURE__*/_react.default.createElement("span", {
      className: _Session.default.tabText
    }, /*#__PURE__*/_react.default.createElement("img", {
      src: _experitest_logo.default
    })),
    tab: props => /*#__PURE__*/_react.default.createElement(_ServerTabExperitest.default, props),
    logo: _experitest_logo.default
  },
  roboticmobi: {
    tabhead: () => /*#__PURE__*/_react.default.createElement("span", {
      className: _Session.default.tabText
    }, /*#__PURE__*/_react.default.createElement("img", {
      src: _robotqa_logo.default
    })),
    tab: props => /*#__PURE__*/_react.default.createElement(_ServerTabRobotQA.default, props),
    logo: _robotqa_logo.default
  },
  remotetestkit: {
    tabhead: () => /*#__PURE__*/_react.default.createElement("span", {
      className: _Session.default.tabText
    }, /*#__PURE__*/_react.default.createElement("img", {
      src: _remotetestkit_logo.default
    })),
    tab: props => /*#__PURE__*/_react.default.createElement(_ServerTabRemoteTestKit.default, props),
    logo: _remotetestkit_logo.default
  }
};
var _default = CloudProviders;
exports.default = _default;
},{"./ServerTabHeadspin":"components/Session/ServerTabHeadspin.js","./ServerTabBrowserstack":"components/Session/ServerTabBrowserstack.js","./ServerTabLambdatest":"components/Session/ServerTabLambdatest.js","./ServerTabBitbar":"components/Session/ServerTabBitbar.js","./ServerTabKobiton":"components/Session/ServerTabKobiton.js","./ServerTabPerfecto":"components/Session/ServerTabPerfecto.js","./ServerTabPcloudy":"components/Session/ServerTabPcloudy.js","./ServerTabSauce":"components/Session/ServerTabSauce.js","./ServerTabTestingbot":"components/Session/ServerTabTestingbot.js","./ServerTabExperitest":"components/Session/ServerTabExperitest.js","./ServerTabRobotQA":"components/Session/ServerTabRobotQA.js","./ServerTabRemoteTestKit":"components/Session/ServerTabRemoteTestKit.js","./Session.css":"components/Session/Session.css","../../images/sauce_logo.svg":"images/sauce_logo.svg","../../images/headspin_logo.svg":"images/headspin_logo.svg","../../images/browserstack_logo.svg":"images/browserstack_logo.svg","../../images/lambdatest_logo.svg":"images/lambdatest_logo.svg","../../images/bitbar_logo.svg":"images/bitbar_logo.svg","../../images/kobiton_logo.svg":"images/kobiton_logo.svg","../../images/perfecto_logo.svg":"images/perfecto_logo.svg","../../images/pcloudy_logo.svg":"images/pcloudy_logo.svg","../../images/testingbot_logo.svg":"images/testingbot_logo.svg","../../images/experitest_logo.svg":"images/experitest_logo.svg","../../images/robotqa_logo.svg":"images/robotqa_logo.svg","../../images/remotetestkit_logo.svg":"images/remotetestkit_logo.svg"}],"../main/helpers.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.APPIUM_SESSION_EXTENSION = void 0;
exports.getAppiumSessionFilePath = getAppiumSessionFilePath;
exports.getSaveableState = getSaveableState;
const APPIUM_SESSION_FILE_VERSION = '1.0';
function getAppiumSessionFilePath(argv, isPackaged, isDev) {
  if (isDev) {
    // do not use file launcher in dev mode because argv is different
    // then it is in production
    return false;
  }
  if (process.platform === 'darwin' && !isDev) {
    // packaged macOS apps do not receive args from process.argv, they
    // receive the filepath argument from the `electron.app.on('open-file', cb)` event
    return false;
  }
  const argvIndex = isPackaged ? 1 : 2;
  return argv[argvIndex];
}

// get the slice of the redux state that's needed for the .appiumsession files
function getSaveableState(reduxState) {
  return {
    version: APPIUM_SESSION_FILE_VERSION,
    caps: reduxState.caps,
    server: reduxState.server,
    serverType: reduxState.serverType,
    visibleProviders: reduxState.visibleProviders
  };
}
const APPIUM_SESSION_EXTENSION = 'appiumsession';
exports.APPIUM_SESSION_EXTENSION = APPIUM_SESSION_EXTENSION;
},{}],"actions/Session.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VISIBLE_PROVIDERS = exports.ServerTypes = exports.SWITCHED_TABS = exports.SHOW_DESIRED_CAPS_JSON_ERROR = exports.SET_STATE_FROM_URL = exports.SET_STATE_FROM_SAVED = exports.SET_SERVER_PARAM = exports.SET_SERVER = exports.SET_SAVE_AS_TEXT = exports.SET_RAW_DESIRED_CAPS = exports.SET_PROVIDERS = exports.SET_DESIRED_CAPS_NAME = exports.SET_CAPS_AND_SERVER = exports.SET_CAPABILITY_PARAM = exports.SET_ATTACH_SESS_ID = exports.SET_ADD_VENDOR_PREFIXES = exports.SAVE_SESSION_REQUESTED = exports.SAVE_SESSION_DONE = exports.SAVE_RAW_DESIRED_CAPS = exports.SAVE_DESIRED_CAPS_NAME = exports.SAVE_AS_MODAL_REQUESTED = exports.REMOVE_CAPABILITY = exports.NEW_SESSION_REQUESTED = exports.NEW_SESSION_LOADING = exports.NEW_SESSION_DONE = exports.IS_ADDING_CLOUD_PROVIDER = exports.HIDE_SAVE_AS_MODAL_REQUESTED = exports.GET_SESSIONS_REQUESTED = exports.GET_SESSIONS_DONE = exports.GET_SAVED_SESSIONS_REQUESTED = exports.GET_SAVED_SESSIONS_DONE = exports.ENABLE_DESIRED_CAPS_NAME_EDITOR = exports.ENABLE_DESIRED_CAPS_EDITOR = exports.DELETE_SAVED_SESSION_REQUESTED = exports.DELETE_SAVED_SESSION_DONE = exports.DEFAULT_SERVER_PORT = exports.DEFAULT_SERVER_PATH = exports.DEFAULT_SERVER_HOST = exports.CONN_RETRIES = exports.CHANGE_SERVER_TYPE = exports.CHANGE_CAPABILITY = exports.ADD_CAPABILITY = exports.ABORT_DESIRED_CAPS_NAME_EDITOR = exports.ABORT_DESIRED_CAPS_EDITOR = void 0;
exports.abortDesiredCapsEditor = abortDesiredCapsEditor;
exports.abortDesiredCapsNameEditor = abortDesiredCapsNameEditor;
exports.addCapability = addCapability;
exports.addCloudProvider = addCloudProvider;
exports.addVisibleProvider = addVisibleProvider;
exports.bindWindowClose = bindWindowClose;
exports.changeCapability = changeCapability;
exports.changeServerType = changeServerType;
exports.deleteSavedSession = deleteSavedSession;
exports.getCapsObject = getCapsObject;
exports.getRunningSessions = getRunningSessions;
exports.getSavedSessions = getSavedSessions;
exports.hideSaveAsModal = hideSaveAsModal;
exports.initFromQueryString = initFromQueryString;
exports.newSession = newSession;
exports.removeCapability = removeCapability;
exports.removeVisibleProvider = removeVisibleProvider;
exports.requestSaveAsModal = requestSaveAsModal;
exports.saveDesiredCapsName = saveDesiredCapsName;
exports.saveFile = saveFile;
exports.saveRawDesiredCaps = saveRawDesiredCaps;
exports.saveSession = saveSession;
exports.setAddVendorPrefixes = setAddVendorPrefixes;
exports.setAttachSessId = setAttachSessId;
exports.setCapabilityParam = setCapabilityParam;
exports.setCapsAndServer = setCapsAndServer;
exports.setDesiredCapsName = setDesiredCapsName;
exports.setLocalServerParams = setLocalServerParams;
exports.setRawDesiredCaps = setRawDesiredCaps;
exports.setSaveAsText = setSaveAsText;
exports.setSavedServerParams = setSavedServerParams;
exports.setServerParam = setServerParam;
exports.setStateFromAppiumFile = setStateFromAppiumFile;
exports.setVisibleProviders = setVisibleProviders;
exports.showError = showError;
exports.startDesiredCapsEditor = startDesiredCapsEditor;
exports.startDesiredCapsNameEditor = startDesiredCapsNameEditor;
exports.stopAddCloudProvider = stopAddCloudProvider;
exports.switchTabs = switchTabs;
var _settings = require("../../shared/settings");
var _uuid = require("uuid");
var _reduxFirstHistory = require("redux-first-history");
var _antd = require("antd");
var _lodash = require("lodash");
var _Inspector = require("./Inspector");
var _i18nextConfig = _interopRequireDefault(require("../../configs/i18next.config.renderer"));
var _CloudProviders = _interopRequireDefault(require("../components/Session/CloudProviders"));
var _web2driver = require("web2driver");
var _util = require("../util");
var _umd = _interopRequireDefault(require("ky/umd"));
var _moment = _interopRequireDefault(require("moment"));
var _shared = require("../components/Inspector/shared");
var _polyfills = require("../polyfills");
var _helpers = require("../../main/helpers");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const NEW_SESSION_REQUESTED = 'NEW_SESSION_REQUESTED';
exports.NEW_SESSION_REQUESTED = NEW_SESSION_REQUESTED;
const NEW_SESSION_LOADING = 'NEW_SESSION_LOADING';
exports.NEW_SESSION_LOADING = NEW_SESSION_LOADING;
const NEW_SESSION_DONE = 'NEW_SESSION_DONE';
exports.NEW_SESSION_DONE = NEW_SESSION_DONE;
const CHANGE_CAPABILITY = 'CHANGE_CAPABILITY';
exports.CHANGE_CAPABILITY = CHANGE_CAPABILITY;
const SAVE_SESSION_REQUESTED = 'SAVE_SESSION_REQUESTED';
exports.SAVE_SESSION_REQUESTED = SAVE_SESSION_REQUESTED;
const SAVE_SESSION_DONE = 'SAVE_SESSION_DONE';
exports.SAVE_SESSION_DONE = SAVE_SESSION_DONE;
const GET_SAVED_SESSIONS_REQUESTED = 'GET_SAVED_SESSIONS_REQUESTED';
exports.GET_SAVED_SESSIONS_REQUESTED = GET_SAVED_SESSIONS_REQUESTED;
const GET_SAVED_SESSIONS_DONE = 'GET_SAVED_SESSIONS_DONE';
exports.GET_SAVED_SESSIONS_DONE = GET_SAVED_SESSIONS_DONE;
const SET_CAPABILITY_PARAM = 'SET_CAPABILITY_PARAM';
exports.SET_CAPABILITY_PARAM = SET_CAPABILITY_PARAM;
const ADD_CAPABILITY = 'ADD_CAPABILITY';
exports.ADD_CAPABILITY = ADD_CAPABILITY;
const REMOVE_CAPABILITY = 'REMOVE_CAPABILITY';
exports.REMOVE_CAPABILITY = REMOVE_CAPABILITY;
const SWITCHED_TABS = 'SWITCHED_TABS';
exports.SWITCHED_TABS = SWITCHED_TABS;
const SET_CAPS_AND_SERVER = 'SET_CAPS_AND_SERVER';
exports.SET_CAPS_AND_SERVER = SET_CAPS_AND_SERVER;
const SAVE_AS_MODAL_REQUESTED = 'SAVE_AS_MODAL_REQUESTED';
exports.SAVE_AS_MODAL_REQUESTED = SAVE_AS_MODAL_REQUESTED;
const HIDE_SAVE_AS_MODAL_REQUESTED = 'HIDE_SAVE_AS_MODAL_REQUESTED';
exports.HIDE_SAVE_AS_MODAL_REQUESTED = HIDE_SAVE_AS_MODAL_REQUESTED;
const SET_SAVE_AS_TEXT = 'SET_SAVE_AS_TEXT';
exports.SET_SAVE_AS_TEXT = SET_SAVE_AS_TEXT;
const DELETE_SAVED_SESSION_REQUESTED = 'DELETE_SAVED_SESSION_REQUESTED';
exports.DELETE_SAVED_SESSION_REQUESTED = DELETE_SAVED_SESSION_REQUESTED;
const DELETE_SAVED_SESSION_DONE = 'DELETE_SAVED_SESSION_DONE';
exports.DELETE_SAVED_SESSION_DONE = DELETE_SAVED_SESSION_DONE;
const CHANGE_SERVER_TYPE = 'CHANGE_SERVER_TYPE';
exports.CHANGE_SERVER_TYPE = CHANGE_SERVER_TYPE;
const SET_SERVER_PARAM = 'SET_SERVER_PARAM';
exports.SET_SERVER_PARAM = SET_SERVER_PARAM;
const SET_SERVER = 'SET_SERVER';
exports.SET_SERVER = SET_SERVER;
const VISIBLE_PROVIDERS = 'VISIBLE_PROVIDERS';
exports.VISIBLE_PROVIDERS = VISIBLE_PROVIDERS;
const SET_ATTACH_SESS_ID = 'SET_ATTACH_SESS_ID';
exports.SET_ATTACH_SESS_ID = SET_ATTACH_SESS_ID;
const GET_SESSIONS_REQUESTED = 'GET_SESSIONS_REQUESTED';
exports.GET_SESSIONS_REQUESTED = GET_SESSIONS_REQUESTED;
const GET_SESSIONS_DONE = 'GET_SESSIONS_DONE';
exports.GET_SESSIONS_DONE = GET_SESSIONS_DONE;
const ENABLE_DESIRED_CAPS_NAME_EDITOR = 'ENABLE_DESIRED_CAPS_NAME_EDITOR';
exports.ENABLE_DESIRED_CAPS_NAME_EDITOR = ENABLE_DESIRED_CAPS_NAME_EDITOR;
const ABORT_DESIRED_CAPS_NAME_EDITOR = 'ABORT_DESIRED_CAPS_NAME_EDITOR';
exports.ABORT_DESIRED_CAPS_NAME_EDITOR = ABORT_DESIRED_CAPS_NAME_EDITOR;
const SAVE_DESIRED_CAPS_NAME = 'SAVE_DESIRED_CAPS_NAME';
exports.SAVE_DESIRED_CAPS_NAME = SAVE_DESIRED_CAPS_NAME;
const SET_DESIRED_CAPS_NAME = 'SET_DESIRED_CAPS_NAME';
exports.SET_DESIRED_CAPS_NAME = SET_DESIRED_CAPS_NAME;
const ENABLE_DESIRED_CAPS_EDITOR = 'ENABLE_DESIRED_CAPS_EDITOR';
exports.ENABLE_DESIRED_CAPS_EDITOR = ENABLE_DESIRED_CAPS_EDITOR;
const ABORT_DESIRED_CAPS_EDITOR = 'ABORT_DESIRED_CAPS_EDITOR';
exports.ABORT_DESIRED_CAPS_EDITOR = ABORT_DESIRED_CAPS_EDITOR;
const SAVE_RAW_DESIRED_CAPS = 'SAVE_RAW_DESIRED_CAPS';
exports.SAVE_RAW_DESIRED_CAPS = SAVE_RAW_DESIRED_CAPS;
const SET_RAW_DESIRED_CAPS = 'SET_RAW_DESIRED_CAPS';
exports.SET_RAW_DESIRED_CAPS = SET_RAW_DESIRED_CAPS;
const SHOW_DESIRED_CAPS_JSON_ERROR = 'SHOW_DESIRED_CAPS_JSON_ERROR';
exports.SHOW_DESIRED_CAPS_JSON_ERROR = SHOW_DESIRED_CAPS_JSON_ERROR;
const IS_ADDING_CLOUD_PROVIDER = 'IS_ADDING_CLOUD_PROVIDER';
exports.IS_ADDING_CLOUD_PROVIDER = IS_ADDING_CLOUD_PROVIDER;
const SET_PROVIDERS = 'SET_PROVIDERS';
exports.SET_PROVIDERS = SET_PROVIDERS;
const SET_ADD_VENDOR_PREFIXES = 'SET_ADD_VENDOR_PREFIXES';
exports.SET_ADD_VENDOR_PREFIXES = SET_ADD_VENDOR_PREFIXES;
const SET_STATE_FROM_URL = 'SET_STATE_FROM_URL';
exports.SET_STATE_FROM_URL = SET_STATE_FROM_URL;
const SET_STATE_FROM_SAVED = 'SET_STATE_FROM_SAVED';
exports.SET_STATE_FROM_SAVED = SET_STATE_FROM_SAVED;
const CAPS_NEW_COMMAND = 'appium:newCommandTimeout';
const CAPS_CONNECT_HARDWARE_KEYBOARD = 'appium:connectHardwareKeyboard';
const CAPS_NATIVE_WEB_SCREENSHOT = 'appium:nativeWebScreenshot';
const CAPS_ENSURE_WEBVIEW_HAVE_PAGES = 'appium:ensureWebviewsHavePages';
const CAPS_INCLUDE_SAFARI_IN_WEBVIEWS = 'appium:includeSafariInWebviews';
const FILE_PATH_STORAGE_KEY = 'last_opened_file';
const AUTO_START_URL_PARAM = '1'; // what should be passed in to ?autoStart= to turn it on

const MJPEG_CAP = 'mjpegScreenshotUrl';
const MJPEG_PORT_CAP = 'mjpegServerPort';

// Multiple requests sometimes send a new session request
// after establishing a session.
// This situation could happen easier on cloud vendors,
// so let's set zero so far.
// TODO: increase this retry when we get issues
const CONN_RETRIES = 0;
exports.CONN_RETRIES = CONN_RETRIES;
const CONN_TIMEOUT = 5 * 60 * 1000;
const HEADERS_CONTENT = 'application/json; charset=utf-8';

// 1 hour default newCommandTimeout
const NEW_COMMAND_TIMEOUT_SEC = 3600;
let isFirstRun = true; // we only want to auto start a session on a first run

const serverTypes = {};
for (const key of (0, _lodash.keys)(_CloudProviders.default)) {
  serverTypes[key] = key;
}
serverTypes.local = 'local';
serverTypes.remote = 'remote';
const ServerTypes = serverTypes;
exports.ServerTypes = ServerTypes;
const DEFAULT_SERVER_PATH = '/';
exports.DEFAULT_SERVER_PATH = DEFAULT_SERVER_PATH;
const DEFAULT_SERVER_HOST = '127.0.0.1';
exports.DEFAULT_SERVER_HOST = DEFAULT_SERVER_HOST;
const DEFAULT_SERVER_PORT = 4723;
exports.DEFAULT_SERVER_PORT = DEFAULT_SERVER_PORT;
const SAUCE_OPTIONS_CAP = 'sauce:options';
const JSON_TYPES = ['object', 'number', 'boolean'];
function getCapsObject(caps) {
  return Object.assign({}, ...caps.map(cap => {
    if (JSON_TYPES.indexOf(cap.type) !== -1) {
      try {
        let obj = JSON.parse(cap.value);
        return {
          [cap.name]: obj
        };
      } catch (ign) {}
    }
    return {
      [cap.name]: cap.value
    };
  }));
}
function showError(e, methodName, secs = 5) {
  let errMessage;
  if (e['jsonwire-error'] && e['jsonwire-error'].status === 7) {
    // FIXME: we probably should set 'findElement' as the method name
    // if it is also number.
    if (methodName === 10) {
      methodName = 'findElements';
    }
    errMessage = _i18nextConfig.default.t('findElementFailure', {
      methodName
    });
    if (e.message) {
      errMessage += ` Original error: '${e.message}'`;
    }
  } else if (e.data) {
    try {
      e.data = JSON.parse(e.data);
    } catch (ign) {}
    if (e.data.value && e.data.value.message) {
      errMessage = e.data.value.message;
    } else {
      errMessage = e.data;
    }
  } else if (e.message) {
    errMessage = e.message;
  } else if (e.code) {
    errMessage = e.code;
  } else {
    errMessage = _i18nextConfig.default.t('Could not start session');
  }
  if (errMessage === 'ECONNREFUSED' || (0, _lodash.includes)(errMessage, 'Failed to fetch')) {
    errMessage = _i18nextConfig.default.t('couldNotConnect');
  }
  _antd.notification.error({
    message: methodName ? _i18nextConfig.default.t('callToMethodFailed', {
      methodName
    }) : _i18nextConfig.default.t('Error'),
    description: errMessage,
    duration: secs
  });
}

/**
 * Change the caps object, along with the server details and then go back to the new session tab
 */
function setCapsAndServer(server, serverType, caps, uuid, name) {
  return dispatch => {
    dispatch({
      type: SET_CAPS_AND_SERVER,
      server,
      serverType,
      caps,
      uuid,
      name
    });
  };
}

/**
 * Change a single desired capability
 */
function changeCapability(key, value) {
  return dispatch => {
    dispatch({
      type: CHANGE_CAPABILITY,
      key,
      value
    });
  };
}

/**
 * Push a capability to the list
 */
function addCapability() {
  return dispatch => {
    dispatch({
      type: ADD_CAPABILITY
    });
  };
}

/**
 * Update value of a capability parameter
 */
function setCapabilityParam(index, name, value) {
  return dispatch => {
    dispatch({
      type: SET_CAPABILITY_PARAM,
      index,
      name,
      value
    });
  };
}

/**
 * Delete a capability from the list
 */
function removeCapability(index) {
  return dispatch => {
    dispatch({
      type: REMOVE_CAPABILITY,
      index
    });
  };
}
function _addVendorPrefixes(caps, dispatch, getState) {
  const {
    server,
    serverType,
    capsUUID,
    capsName
  } = getState().session;
  const prefixedCaps = (0, _util.addVendorPrefixes)(caps);
  setCapsAndServer(server, serverType, prefixedCaps, capsUUID, capsName)(dispatch);
  return prefixedCaps;
}

/**
 * Start a new appium session with the given caps
 */
function newSession(caps, attachSessId = null) {
  return async (dispatch, getState) => {
    let session = getState().session;

    // first add vendor prefixes to caps if requested
    if (!attachSessId && session.addVendorPrefixes) {
      caps = _addVendorPrefixes(caps, dispatch, getState);
    }
    dispatch({
      type: NEW_SESSION_REQUESTED,
      caps
    });
    let desiredCapabilities = caps ? getCapsObject(caps) : {};
    let host, port, username, accessKey, https, path, token;
    desiredCapabilities = addCustomCaps(desiredCapabilities);
    switch (session.serverType) {
      case ServerTypes.local:
        host = session.server.local.hostname;
        if (host === '0.0.0.0') {
          // if we're on windows, we won't be able to connect directly to '0.0.0.0'
          // so just connect to localhost; if we're listening on all interfaces,
          // that will of course include 127.0.0.1 on all platforms
          host = 'localhost';
        }
        port = session.server.local.port;
        break;
      case ServerTypes.remote:
        host = session.server.remote.hostname;
        port = session.server.remote.port;
        path = session.server.remote.path;
        https = session.server.remote.ssl;
        break;
      case ServerTypes.sauce:
        path = '/wd/hub';
        host = `ondemand.${session.server.sauce.dataCenter}.saucelabs.com`;
        port = 80;
        if (session.server.sauce.useSCProxy) {
          host = session.server.sauce.scHost || 'localhost';
          port = parseInt(session.server.sauce.scPort, 10) || 4445;
        }
        username = session.server.sauce.username || process.env.SAUCE_USERNAME;
        accessKey = session.server.sauce.accessKey || process.env.SAUCE_ACCESS_KEY;
        if (!username || !accessKey) {
          _antd.notification.error({
            message: _i18nextConfig.default.t('Error'),
            description: _i18nextConfig.default.t('sauceCredentialsRequired'),
            duration: 4
          });
          return;
        }
        https = false;
        if (!(0, _lodash.isPlainObject)(desiredCapabilities[SAUCE_OPTIONS_CAP])) {
          desiredCapabilities[SAUCE_OPTIONS_CAP] = {};
        }
        if (!desiredCapabilities[SAUCE_OPTIONS_CAP].name) {
          const dateTime = (0, _moment.default)().format('lll');
          desiredCapabilities[SAUCE_OPTIONS_CAP].name = `Appium Desktop Session -- ${dateTime}`;
        }
        break;
      case ServerTypes.headspin:
        {
          let headspinUrl;
          try {
            headspinUrl = new URL(session.server.headspin.webDriverUrl);
          } catch (ign) {
            showError(new Error(`${session.server.headspin.webDriverUrl} is invalid url`), null, 0);
            return;
          }
          host = session.server.headspin.hostname = headspinUrl.hostname;
          path = session.server.headspin.path = headspinUrl.pathname;
          https = session.server.headspin.ssl = headspinUrl.protocol === 'https:';
          // new URL() does not have the port of 443 when `https` and 80 when `http`
          port = session.server.headspin.port = headspinUrl.port === '' ? https ? 443 : 80 : headspinUrl.port;
          break;
        }
      case ServerTypes.perfecto:
        host = session.server.perfecto.hostname;
        port = session.server.perfecto.port || (session.server.perfecto.ssl ? 443 : 80);
        token = session.server.perfecto.token || process.env.PERFECTO_TOKEN;
        path = session.server.perfecto.path = '/nexperience/perfectomobile/wd/hub';
        if (!token) {
          _antd.notification.error({
            message: _i18nextConfig.default.t('Error'),
            description: _i18nextConfig.default.t('Perfecto SecurityToken is required'),
            duration: 4
          });
          return;
        }
        desiredCapabilities['perfecto:options'] = {
          securityToken: token
        };
        https = session.server.perfecto.ssl;
        break;
      case ServerTypes.browserstack:
        host = session.server.browserstack.hostname = process.env.BROWSERSTACK_HOST || 'hub-cloud.browserstack.com';
        port = session.server.browserstack.port = process.env.BROWSERSTACK_PORT || 443;
        path = session.server.browserstack.path = '/wd/hub';
        username = session.server.browserstack.username || process.env.BROWSERSTACK_USERNAME;
        if (!desiredCapabilities['bstack:options']) {
          desiredCapabilities['bstack:options'] = {};
        }
        desiredCapabilities['bstack:options'].source = 'appiumdesktop';
        accessKey = session.server.browserstack.accessKey || process.env.BROWSERSTACK_ACCESS_KEY;
        if (!username || !accessKey) {
          _antd.notification.error({
            message: _i18nextConfig.default.t('Error'),
            description: _i18nextConfig.default.t('browserstackCredentialsRequired'),
            duration: 4
          });
          return;
        }
        https = session.server.browserstack.ssl = parseInt(port, 10) === 443;
        break;
      case ServerTypes.lambdatest:
        host = session.server.lambdatest.hostname = process.env.LAMBDATEST_HOST || 'mobile-hub.lambdatest.com';
        port = session.server.lambdatest.port = process.env.LAMBDATEST_PORT || 443;
        path = session.server.lambdatest.path = '/wd/hub';
        username = session.server.lambdatest.username || process.env.LAMBDATEST_USERNAME;
        if (desiredCapabilities.hasOwnProperty.call(desiredCapabilities, 'lt:options')) {
          desiredCapabilities['lt:options'].source = 'appiumdesktop';
          desiredCapabilities['lt:options'].isRealMobile = true;
          if (session.server.advanced.useProxy) {
            desiredCapabilities['lt:options'].proxyUrl = (0, _lodash.isUndefined)(session.server.advanced.proxy) ? '' : session.server.advanced.proxy;
          }
        } else {
          desiredCapabilities['lambdatest:source'] = 'appiumdesktop';
          desiredCapabilities['lambdatest:isRealMobile'] = true;
          if (session.server.advanced.useProxy) {
            desiredCapabilities['lambdatest:proxyUrl'] = (0, _lodash.isUndefined)(session.server.advanced.proxy) ? '' : session.server.advanced.proxy;
          }
        }
        accessKey = session.server.lambdatest.accessKey || process.env.LAMBDATEST_ACCESS_KEY;
        if (!username || !accessKey) {
          _antd.notification.error({
            message: _i18nextConfig.default.t('Error'),
            description: _i18nextConfig.default.t('lambdatestCredentialsRequired'),
            duration: 4
          });
          return;
        }
        https = session.server.lambdatest.ssl = parseInt(port, 10) === 443;
        break;
      case ServerTypes.bitbar:
        host = process.env.BITBAR_HOST || 'appium.bitbar.com';
        port = session.server.bitbar.port = 443;
        path = session.server.bitbar.path = '/wd/hub';
        accessKey = session.server.bitbar.apiKey || process.env.BITBAR_API_KEY;
        if (!accessKey) {
          _antd.notification.error({
            message: _i18nextConfig.default.t('Error'),
            description: _i18nextConfig.default.t('bitbarCredentialsRequired'),
            duration: 4
          });
          return;
        }
        desiredCapabilities['bitbar:options'] = {
          source: 'appiumdesktop',
          apiKey: accessKey
        };
        https = session.server.bitbar.ssl = true;
        break;
      case ServerTypes.kobiton:
        host = process.env.KOBITON_HOST || 'api.kobiton.com';
        port = session.server.kobiton.port = 443;
        path = session.server.kobiton.path = '/wd/hub';
        username = session.server.kobiton.username || process.env.KOBITON_USERNAME;
        accessKey = session.server.kobiton.accessKey || process.env.KOBITON_ACCESS_KEY;
        desiredCapabilities['kobiton:options'] = {};
        desiredCapabilities['kobiton:options'].source = 'appiumdesktop';
        if (!username || !accessKey) {
          _antd.notification.error({
            message: _i18nextConfig.default.t('Error'),
            description: _i18nextConfig.default.t('kobitonCredentialsRequired'),
            duration: 4
          });
          return;
        }
        https = session.server.kobiton.ssl = true;
        break;
      case ServerTypes.pcloudy:
        host = session.server.pcloudy.hostname;
        port = session.server.pcloudy.port = 443;
        path = session.server.pcloudy.path = '/objectspy/wd/hub';
        desiredCapabilities.pCloudy_Username = session.server.pcloudy.username || process.env.PCLOUDY_USERNAME;
        desiredCapabilities.pCloudy_ApiKey = session.server.pcloudy.accessKey || process.env.PCLOUDY_ACCESS_KEY;
        if (!(session.server.pcloudy.username || process.env.PCLOUDY_USERNAME) || !(session.server.pcloudy.accessKey || process.env.PCLOUDY_ACCESS_KEY)) {
          _antd.notification.error({
            message: 'Error',
            description: 'PCLOUDY username and api key are required!',
            duration: 4
          });
          return;
        }
        https = session.server.pcloudy.ssl = true;
        break;
      case ServerTypes.testingbot:
        host = session.server.testingbot.hostname = process.env.TB_HOST || 'hub.testingbot.com';
        port = session.server.testingbot.port = 443;
        path = session.server.testingbot.path = '/wd/hub';
        if (!desiredCapabilities['tb:options']) {
          desiredCapabilities['tb:options'] = {};
        }
        desiredCapabilities['tb:options'].key = session.server.testingbot.key || process.env.TB_KEY;
        desiredCapabilities['tb:options'].secret = session.server.testingbot.secret || process.env.TB_SECRET;
        if (!(session.server.testingbot.key || process.env.TB_KEY) || !(session.server.testingbot.secret || process.env.TB_SECRET)) {
          _antd.notification.error({
            message: 'Error',
            description: _i18nextConfig.default.t('testingbotCredentialsRequired'),
            duration: 4
          });
          return;
        }
        https = session.server.testingbot.ssl = true;
        break;
      case ServerTypes.experitest:
        {
          if (!session.server.experitest.url || !session.server.experitest.accessKey) {
            _antd.notification.error({
              message: _i18nextConfig.default.t('Error'),
              description: _i18nextConfig.default.t('experitestAccessKeyURLRequired'),
              duration: 4
            });
            return;
          }
          desiredCapabilities['experitest:accessKey'] = session.server.experitest.accessKey;
          let experitestUrl;
          try {
            experitestUrl = new URL(session.server.experitest.url);
          } catch (ign) {
            showError(new Error(`${session.server.experitest.url} is invalid url`), null, 0);
            return;
          }
          host = session.server.experitest.hostname = experitestUrl.hostname;
          path = session.server.experitest.path = '/wd/hub';
          https = session.server.experitest.ssl = experitestUrl.protocol === 'https:';
          port = session.server.experitest.port = experitestUrl.port === '' ? https ? 443 : 80 : experitestUrl.port;
          break;
        }
      case ServerTypes.roboticmobi:
        {
          host = 'remote.robotqa.com';
          path = '/wd/hub';
          port = 443;
          https = session.server.roboticmobi.ssl = true;
          if (caps) {
            desiredCapabilities['robotqa:options'] = {};
            desiredCapabilities['robotqa:options'].robotqa_token = session.server.roboticmobi.token || process.env.ROBOTQA_TOKEN;
          }
          break;
        }
      case ServerTypes.remotetestkit:
        {
          host = 'gwjp.appkitbox.com';
          path = '/wd/hub';
          port = 443;
          https = true;
          desiredCapabilities['remotetestkit:options'] = {};
          desiredCapabilities['remotetestkit:options'].accessToken = session.server.remotetestkit.token;
          break;
        }
      default:
        break;
    }

    // if the server path is '' (or any other kind of falsy) set it to default
    path = path || DEFAULT_SERVER_PATH;
    host = host || DEFAULT_SERVER_HOST;
    port = port || DEFAULT_SERVER_PORT;

    // TODO W2D handle proxy and rejectUnauthorized cases
    //let rejectUnauthorized = !session.server.advanced.allowUnauthorized;
    //let proxy;
    //if (session.server.advanced.useProxy && session.server.advanced.proxy) {
    //  proxy = session.server.advanced.proxy;
    //}

    dispatch({
      type: NEW_SESSION_LOADING
    });
    const serverOpts = {
      hostname: host,
      port: parseInt(port, 10),
      protocol: https ? 'https' : 'http',
      path,
      connectionRetryCount: CONN_RETRIES,
      connectionRetryTimeout: CONN_TIMEOUT
    };
    if (username && accessKey) {
      serverOpts.user = username;
      serverOpts.key = accessKey;
    }

    // If a newCommandTimeout wasn't provided, set it to 60 * 60 so that sessions don't close on users in short term.
    // I saw sometimes infinit session timeout was not so good for cloud providers.
    // So, let me define this value as NEW_COMMAND_TIMEOUT_SEC by default.
    if ((0, _lodash.isUndefined)(desiredCapabilities[CAPS_NEW_COMMAND])) {
      desiredCapabilities[CAPS_NEW_COMMAND] = NEW_COMMAND_TIMEOUT_SEC;
    }

    // If someone didn't specify connectHardwareKeyboard, set it to true by
    // default
    if ((0, _lodash.isUndefined)(desiredCapabilities[CAPS_CONNECT_HARDWARE_KEYBOARD])) {
      desiredCapabilities[CAPS_CONNECT_HARDWARE_KEYBOARD] = true;
    }
    serverOpts.logLevel = process.env.NODE_ENV === 'development' ? 'info' : 'warn';
    let driver = null;
    try {
      if (attachSessId) {
        // When attaching to a session id, webdriver does not fully populate
        // client information, so we should supplement by attaching session
        // capabilities that we are attaching to.
        const attachedSessionCaps = session.runningAppiumSessions.find(session => session.id === attachSessId).capabilities;
        serverOpts.isMobile = true;
        serverOpts.isIOS = Boolean(attachedSessionCaps.platformName.match(/iOS/i));
        serverOpts.isAndroid = Boolean(attachedSessionCaps.platformName.match(/Android/i));
        driver = await _web2driver.Web2Driver.attachToSession(attachSessId, serverOpts, attachedSessionCaps);
        driver._isAttachedSession = true;
      } else {
        driver = await _web2driver.Web2Driver.remote(serverOpts, desiredCapabilities);
      }
    } catch (err) {
      showError(err, null, 0);
      return;
    } finally {
      dispatch({
        type: NEW_SESSION_DONE
      });
      // Save the current server settings
      await (0, _settings.setSetting)(_settings.SESSION_SERVER_PARAMS, session.server);
    }

    // The homepage arg in ChromeDriver is not working with Appium. iOS can have a default url, but
    // we want to keep the process equal to prevent complexity so we launch a default url here to make
    // sure we don't start with an empty page which will not show proper HTML in the inspector
    const {
      browserName = ''
    } = desiredCapabilities;
    let mode = _shared.APP_MODE.NATIVE;
    if (browserName.trim() !== '') {
      try {
        mode = _shared.APP_MODE.WEB_HYBRID;
        await driver.navigateTo('https://appium.io');
      } catch (ign) {}
    }
    let mjpegScreenshotUrl = driver.capabilities[`appium:${MJPEG_CAP}`] || driver.capabilities[MJPEG_CAP] || null;
    const mjpegScreenshotPort = driver.capabilities[`appium:${MJPEG_PORT_CAP}`] || driver.capabilities[MJPEG_PORT_CAP] || null;

    // Build mjpegScreenshotUrl if mjpegServerPort in session capabilities
    if (!mjpegScreenshotUrl && mjpegScreenshotPort) {
      mjpegScreenshotUrl = `${https ? 'https' : 'http'}://${host}:${mjpegScreenshotPort}`;
    }

    // pass some state to the inspector that it needs to build recorder
    // code boilerplate
    const action = (0, _Inspector.setSessionDetails)({
      driver,
      sessionDetails: {
        desiredCapabilities,
        host,
        port,
        path,
        username,
        accessKey,
        https
      },
      mode,
      mjpegScreenshotUrl
    });
    action(dispatch);
    dispatch((0, _reduxFirstHistory.push)('/inspector'));
  };
}

/**
 * Saves the caps and server details
 */
function saveSession(server, serverType, caps, params) {
  return async dispatch => {
    let {
      name,
      uuid
    } = params;
    dispatch({
      type: SAVE_SESSION_REQUESTED
    });
    let savedSessions = (await (0, _settings.getSetting)(_settings.SAVED_SESSIONS)) || [];
    if (!uuid) {
      // If it's a new session, add it to the list
      uuid = (0, _uuid.v4)();
      let newSavedSession = {
        date: Date.now(),
        name,
        uuid,
        caps,
        server,
        serverType
      };
      savedSessions.push(newSavedSession);
    } else {
      // If it's an existing session, overwrite it
      for (let session of savedSessions) {
        if (session.uuid === uuid) {
          session.name = name;
          session.caps = caps;
          session.server = server;
          session.serverType = serverType;
        }
      }
    }
    await (0, _settings.setSetting)(_settings.SAVED_SESSIONS, savedSessions);
    const action = getSavedSessions();
    await action(dispatch);
    dispatch({
      type: SET_CAPS_AND_SERVER,
      server,
      serverType,
      caps,
      uuid,
      name
    });
    dispatch({
      type: SAVE_SESSION_DONE
    });
  };
}

/**
 * Get the sessions saved by the user
 */
function getSavedSessions() {
  return async dispatch => {
    dispatch({
      type: GET_SAVED_SESSIONS_REQUESTED
    });
    let savedSessions = await (0, _settings.getSetting)(_settings.SAVED_SESSIONS);
    dispatch({
      type: GET_SAVED_SESSIONS_DONE,
      savedSessions
    });
  };
}

/**
 * Switch to a different tab
 */
function switchTabs(key) {
  return dispatch => {
    dispatch({
      type: SWITCHED_TABS,
      key
    });
  };
}

/**
 * Open a 'Save As' modal
 */
function requestSaveAsModal() {
  return dispatch => {
    dispatch({
      type: SAVE_AS_MODAL_REQUESTED
    });
  };
}

/**
 * Hide the 'Save As' modal
 */
function hideSaveAsModal() {
  return dispatch => {
    dispatch({
      type: HIDE_SAVE_AS_MODAL_REQUESTED
    });
  };
}

/**
 * Set the text to save capabilities as
 */
function setSaveAsText(saveAsText) {
  return dispatch => {
    dispatch({
      type: SET_SAVE_AS_TEXT,
      saveAsText
    });
  };
}

/**
 * Delete a saved session
 */
function deleteSavedSession(uuid) {
  return async dispatch => {
    dispatch({
      type: DELETE_SAVED_SESSION_REQUESTED,
      uuid
    });
    let savedSessions = await (0, _settings.getSetting)(_settings.SAVED_SESSIONS);
    let newSessions = savedSessions.filter(session => session.uuid !== uuid);
    await (0, _settings.setSetting)(_settings.SAVED_SESSIONS, newSessions);
    dispatch({
      type: DELETE_SAVED_SESSION_DONE
    });
    dispatch({
      type: GET_SAVED_SESSIONS_DONE,
      savedSessions: newSessions
    });
  };
}

/**
 * Set the session id to attach to
 */
function setAttachSessId(attachSessId) {
  return dispatch => {
    dispatch({
      type: SET_ATTACH_SESS_ID,
      attachSessId
    });
  };
}

/**
 * Change the server type
 */
function changeServerType(serverType) {
  return async (dispatch, getState) => {
    await (0, _settings.setSetting)(_settings.SESSION_SERVER_TYPE, serverType);
    dispatch({
      type: CHANGE_SERVER_TYPE,
      serverType
    });
    const action = getRunningSessions();
    action(dispatch, getState);
  };
}

/**
 * Set a server parameter (host, port, etc...)
 */
function setServerParam(name, value, serverType) {
  const debounceGetRunningSessions = (0, _lodash.debounce)(getRunningSessions(), 5000);
  return async (dispatch, getState) => {
    serverType = serverType || getState().session.serverType;
    await (0, _settings.setSetting)(_settings.SESSION_SERVER_TYPE, serverType);
    dispatch({
      type: SET_SERVER_PARAM,
      serverType,
      name,
      value
    });
    debounceGetRunningSessions(dispatch, getState);
  };
}

/**
 * Set the local server hostname and port to whatever was saved in 'actions/StartServer.js' so that it
 * defaults to what the currently running appium server is
 */
function setLocalServerParams() {
  return async (dispatch, getState) => {
    let serverArgs = await (0, _settings.getSetting)(_settings.SERVER_ARGS);
    // Get saved server args from settings and set local server settings to it. If there are no saved args, set local
    // host and port to undefined
    if (serverArgs) {
      dispatch({
        type: SET_SERVER_PARAM,
        serverType: ServerTypes.local,
        name: 'port',
        value: serverArgs.port
      });
      dispatch({
        type: SET_SERVER_PARAM,
        serverType: ServerTypes.local,
        name: 'hostname',
        value: 'localhost'
      });
    } else {
      dispatch({
        type: SET_SERVER_PARAM,
        serverType: ServerTypes.local,
        name: 'port',
        value: undefined
      });
      dispatch({
        type: SET_SERVER_PARAM,
        serverType: ServerTypes.local,
        name: 'hostname',
        value: undefined
      });
      if (getState().session.serverType === 'local') {
        const action = changeServerType('remote');
        await action(dispatch, getState);
      }
    }
  };
}

/**
 * Set the server parameters to whatever they were last saved as.
 * Params are saved whenever there's a new session
 */
function setSavedServerParams() {
  return async (dispatch, getState) => {
    let server = await (0, _settings.getSetting)(_settings.SESSION_SERVER_PARAMS);
    let serverType = await (0, _settings.getSetting)(_settings.SESSION_SERVER_TYPE);
    let currentProviders = getState().session.visibleProviders;
    if (server) {
      // if we have a cloud provider as a saved server, but for some reason the
      // cloud provider is no longer in the list, revert server type to remote
      if ((0, _lodash.keys)(_CloudProviders.default).includes(serverType) && !currentProviders.includes(serverType)) {
        serverType = ServerTypes.remote;
      }
      dispatch({
        type: SET_SERVER,
        server,
        serverType
      });
    }
  };
}
function setStateFromAppiumFile(newFilepath = null) {
  return async dispatch => {
    // no "fs" means we're not in an Electron renderer so do nothing
    if (!_polyfills.fs) {
      return;
    }
    try {
      let filePath = newFilepath;
      if (!newFilepath) {
        const lastArg = process.argv[process.argv.length - 1];
        if (!lastArg.startsWith('filename=')) {
          return;
        }
        filePath = lastArg.split('=')[1];
      }
      if (sessionStorage.getItem(FILE_PATH_STORAGE_KEY) === filePath) {
        // file was opened already, do nothing
        return;
      }
      const appiumJson = JSON.parse(await _polyfills.util.promisify(_polyfills.fs.readFile)(filePath, 'utf8'));
      sessionStorage.setItem(FILE_PATH_STORAGE_KEY, filePath);
      dispatch({
        type: SET_STATE_FROM_SAVED,
        state: appiumJson,
        filePath
      });
    } catch (e) {
      _antd.notification.error({
        message: `Cannot open file '${newFilepath}'.\n ${e.message}\n ${e.stack}`
      });
    }
  };
}
function saveFile(filepath) {
  return async (dispatch, getState) => {
    const state = getState().session;
    const filePath = filepath || state.filePath;
    if (filePath) {
      const appiumFileInfo = (0, _helpers.getSaveableState)(state);
      await _polyfills.util.promisify(_polyfills.fs.writeFile)(filePath, JSON.stringify(appiumFileInfo, null, 2), 'utf8');
      sessionStorage.setItem(FILE_PATH_STORAGE_KEY, filePath);
    } else {
      // no filepath provided, tell the main renderer to open the save file dialog and
      // ask the user to save file to a provided path
      _polyfills.ipcRenderer.send('save-file-as');
    }
  };
}
function getRunningSessions() {
  return async (dispatch, getState) => {
    const avoidServerTypes = ['sauce'];
    // Get currently running sessions for this server
    const state = getState().session;
    const {
      server,
      serverType
    } = state;
    const serverInfo = server[serverType];
    let {
      hostname,
      port,
      path,
      ssl,
      username,
      accessKey
    } = serverInfo;

    // if we have a standard remote server, fill out connection info based on placeholder defaults
    // in case the user hasn't adjusted those fields
    if (serverType === ServerTypes.remote) {
      hostname = hostname || DEFAULT_SERVER_HOST;
      port = port || DEFAULT_SERVER_PORT;
      path = path || DEFAULT_SERVER_PATH;
    }
    if (!hostname || !port || !path) {
      // no need to get sessions if we don't have complete server info
      return;
    }
    dispatch({
      type: GET_SESSIONS_REQUESTED
    });
    if (avoidServerTypes.includes(serverType)) {
      dispatch({
        type: GET_SESSIONS_DONE
      });
      return;
    }
    try {
      const adjPath = path.endsWith('/') ? path : `${path}/`;
      const res = username && accessKey ? await (0, _umd.default)(`http${ssl ? 's' : ''}://${hostname}:${port}${adjPath}sessions`, {
        headers: {
          'Authorization': `Basic ${btoa(`${username}:${accessKey}`)}`,
          'content-type': HEADERS_CONTENT
        }
      }).json() : await (0, _umd.default)(`http${ssl ? 's' : ''}://${hostname}:${port}${adjPath}sessions`, {
        headers: {
          'content-type': HEADERS_CONTENT
        }
      }).json();
      dispatch({
        type: GET_SESSIONS_DONE,
        sessions: res.value
      });
    } catch (err) {
      console.warn(`Ignoring error in getting list of active sessions: ${err}`); // eslint-disable-line no-console
      dispatch({
        type: GET_SESSIONS_DONE
      });
    }
  };
}
function startDesiredCapsNameEditor() {
  return dispatch => {
    dispatch({
      type: ENABLE_DESIRED_CAPS_NAME_EDITOR
    });
  };
}
function abortDesiredCapsNameEditor() {
  return dispatch => {
    dispatch({
      type: ABORT_DESIRED_CAPS_NAME_EDITOR
    });
  };
}
function saveDesiredCapsName() {
  return (dispatch, getState) => {
    const {
      server,
      serverType,
      caps,
      capsUUID,
      desiredCapsName
    } = getState().session;
    dispatch({
      type: SAVE_DESIRED_CAPS_NAME,
      name: desiredCapsName
    });
    saveSession(server, serverType, caps, {
      name: desiredCapsName,
      uuid: capsUUID
    })(dispatch);
  };
}
function setDesiredCapsName(desiredCapsName) {
  return dispatch => {
    dispatch({
      type: SET_DESIRED_CAPS_NAME,
      desiredCapsName
    });
  };
}
function startDesiredCapsEditor() {
  return dispatch => {
    dispatch({
      type: ENABLE_DESIRED_CAPS_EDITOR
    });
  };
}
function abortDesiredCapsEditor() {
  return dispatch => {
    dispatch({
      type: ABORT_DESIRED_CAPS_EDITOR
    });
  };
}
function saveRawDesiredCaps() {
  return (dispatch, getState) => {
    const state = getState().session;
    const {
      rawDesiredCaps,
      caps: capsArray
    } = state;
    try {
      const newCaps = JSON.parse(rawDesiredCaps);

      // Transform the current caps array to an object
      let caps = {};
      for (let {
        type,
        name,
        value
      } of capsArray) {
        caps[name] = {
          type,
          value
        };
      }

      // Translate the caps JSON to array format
      let newCapsArray = (0, _lodash.toPairs)(newCaps).map(([name, value]) => ({
        type: (() => {
          let type = typeof value;

          // If we already have this cap and it's file type, keep the type the same
          if (caps[name] && caps[name].type === 'file' && type === 'string') {
            return 'file';
          } else if (type === 'string') {
            return 'text';
          } else {
            return type;
          }
        })(),
        name,
        value
      }));
      dispatch({
        type: SAVE_RAW_DESIRED_CAPS,
        caps: newCapsArray
      });
    } catch (e) {
      dispatch({
        type: SHOW_DESIRED_CAPS_JSON_ERROR,
        message: e.message
      });
    }
  };
}
function setRawDesiredCaps(rawDesiredCaps) {
  return (dispatch, getState) => {
    const state = getState().session;
    let isValidCapsJson = true;
    let invalidCapsJsonReason;
    if (state.isValidatingCapsJson) {
      try {
        JSON.parse(rawDesiredCaps);
      } catch (e) {
        isValidCapsJson = false;
        invalidCapsJsonReason = e.message;
      }
    }
    dispatch({
      type: SET_RAW_DESIRED_CAPS,
      rawDesiredCaps,
      isValidCapsJson,
      invalidCapsJsonReason
    });
  };
}
function addCloudProvider() {
  return dispatch => {
    dispatch({
      type: IS_ADDING_CLOUD_PROVIDER,
      isAddingProvider: true
    });
  };
}
function stopAddCloudProvider() {
  return dispatch => {
    dispatch({
      type: IS_ADDING_CLOUD_PROVIDER,
      isAddingProvider: false
    });
  };
}
function addVisibleProvider(provider) {
  return async (dispatch, getState) => {
    let currentProviders = getState().session.visibleProviders;
    const providers = (0, _lodash.union)(currentProviders, [provider]);
    await (0, _settings.setSetting)(VISIBLE_PROVIDERS, providers);
    dispatch({
      type: SET_PROVIDERS,
      providers
    });
  };
}
function removeVisibleProvider(provider) {
  return async (dispatch, getState) => {
    let currentProviders = getState().session.visibleProviders;
    const providers = (0, _lodash.without)(currentProviders, provider);
    await (0, _settings.setSetting)(VISIBLE_PROVIDERS, providers);
    dispatch({
      type: SET_PROVIDERS,
      providers
    });
  };
}
function setVisibleProviders() {
  return async dispatch => {
    const providers = await (0, _settings.getSetting)(VISIBLE_PROVIDERS);
    dispatch({
      type: SET_PROVIDERS,
      providers
    });
  };
}

/**
 * Add custom capabilities
 *
 * @param {object} caps
 */
function addCustomCaps(caps) {
  const {
    platformName = ''
  } = caps;
  const androidCustomCaps = {};
  // @TODO: remove when this is defaulted in the newest Appium 1.8.x release
  androidCustomCaps[CAPS_ENSURE_WEBVIEW_HAVE_PAGES] = true;
  // Make sure the screenshot is taken of the whole screen when the ChromeDriver is used
  androidCustomCaps[CAPS_NATIVE_WEB_SCREENSHOT] = true;
  const iosCustomCaps = {};
  // Always add the includeSafariInWebviews for future HTML detection
  // This will ensure that if you use AD to switch between App and browser
  // that it can detect Safari as a webview
  iosCustomCaps[CAPS_INCLUDE_SAFARI_IN_WEBVIEWS] = true;
  return {
    ...caps,
    ...(platformName.toLowerCase() === 'android' ? androidCustomCaps : {}),
    ...(platformName.toLowerCase() === 'ios' ? iosCustomCaps : {})
  };
}
function bindWindowClose() {
  return (dispatch, getState) => {
    window.addEventListener('beforeunload', async evt => {
      let {
        driver
      } = getState().inspector;
      if (driver) {
        try {
          const action = (0, _Inspector.quitSession)('Window closed');
          await action(dispatch, getState);
        } finally {
          driver = null;
        }
      }

      // to allow the window close to continue, the thing we must do is make sure the event no
      // longer has any 'returnValue' property
      delete evt.returnValue;
    });
  };
}
function setAddVendorPrefixes(addVendorPrefixes) {
  return dispatch => {
    dispatch({
      type: SET_ADD_VENDOR_PREFIXES,
      addVendorPrefixes
    });
  };
}
function initFromQueryString() {
  return async (dispatch, getState) => {
    if (!isFirstRun) {
      return;
    }
    isFirstRun = false;
    const url = new URL(window.location.href);
    const initialState = url.searchParams.get('state');
    const autoStartSession = url.searchParams.get('autoStart');
    if (initialState) {
      try {
        const state = JSON.parse(initialState);
        dispatch({
          type: SET_STATE_FROM_URL,
          state
        });
      } catch (e) {
        showError(new Error('Could not parse initial state from URL'), null, 0);
      }
    }
    if (autoStartSession === AUTO_START_URL_PARAM) {
      const {
        attachSessId,
        caps
      } = getState().session;
      if (attachSessId) {
        return await newSession(null, attachSessId)(dispatch, getState);
      }
      await newSession(caps)(dispatch, getState);
    }
  };
}
},{"../../shared/settings":"../shared/settings.js","./Inspector":"actions/Inspector.js","../../configs/i18next.config.renderer":"../configs/i18next.config.renderer.js","../components/Session/CloudProviders":"components/Session/CloudProviders.js","../util":"util.js","../components/Inspector/shared":"components/Inspector/shared.js","../polyfills":"polyfills/index.js","../../main/helpers":"../main/helpers.js"}],"components/Session/FormattedCaps.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _formatJson = _interopRequireDefault(require("format-json"));
var _Session = _interopRequireDefault(require("./Session.css"));
var _antd = require("antd");
var _Session2 = require("../../actions/Session.js");
var _icons = require("@ant-design/icons");
var _AntdTypes = require("../AntdTypes");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const FormattedCaps = props => {
  const {
    caps,
    title,
    desiredCapsName,
    isEditingDesiredCapsName,
    isEditingDesiredCaps,
    startDesiredCapsEditor,
    abortDesiredCapsEditor,
    saveRawDesiredCaps,
    setRawDesiredCaps,
    rawDesiredCaps,
    isValidCapsJson,
    invalidCapsJsonReason,
    t
  } = props;
  const setCapsTitle = () => {
    const {
      setDesiredCapsName
    } = props;
    if (!title) {
      return 'JSON Representation';
    } else if (!isEditingDesiredCapsName) {
      return title;
    } else {
      return /*#__PURE__*/_react.default.createElement("input", {
        onChange: e => setDesiredCapsName(e.target.value),
        value: desiredCapsName,
        className: _Session.default.capsEditorTitle
      });
    }
  };
  const setCapsTitleButtons = () => {
    const {
      startDesiredCapsNameEditor,
      abortDesiredCapsNameEditor,
      saveDesiredCapsName
    } = props;
    if (!title) {
      return null;
    } else if (!isEditingDesiredCapsName) {
      return /*#__PURE__*/_react.default.createElement(_antd.Tooltip, {
        title: t('Edit')
      }, /*#__PURE__*/_react.default.createElement(_antd.Button, {
        size: "small",
        onClick: startDesiredCapsNameEditor,
        icon: /*#__PURE__*/_react.default.createElement(_icons.EditOutlined, null),
        className: _Session.default.capsNameEditorButton
      }));
    } else {
      return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_antd.Tooltip, {
        title: t('Cancel')
      }, /*#__PURE__*/_react.default.createElement(_antd.Button, {
        size: "small",
        onClick: abortDesiredCapsNameEditor,
        icon: /*#__PURE__*/_react.default.createElement(_icons.CloseOutlined, null),
        className: _Session.default.capsNameEditorButton
      })), /*#__PURE__*/_react.default.createElement(_antd.Tooltip, {
        title: t('Save')
      }, /*#__PURE__*/_react.default.createElement(_antd.Button, {
        size: "small",
        onClick: saveDesiredCapsName,
        icon: /*#__PURE__*/_react.default.createElement(_icons.SaveOutlined, null),
        className: _Session.default.capsNameEditorButton
      })));
    }
  };
  return caps && /*#__PURE__*/_react.default.createElement(_antd.Card, {
    className: _Session.default.formattedCaps,
    title: setCapsTitle(),
    extra: setCapsTitleButtons()
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: _Session.default.capsEditorControls
  }, isEditingDesiredCaps && /*#__PURE__*/_react.default.createElement(_antd.Tooltip, {
    title: t('Cancel')
  }, /*#__PURE__*/_react.default.createElement(_antd.Button, {
    onClick: abortDesiredCapsEditor,
    icon: /*#__PURE__*/_react.default.createElement(_icons.CloseOutlined, null),
    className: _Session.default.capsEditorButton
  })), isEditingDesiredCaps && /*#__PURE__*/_react.default.createElement(_antd.Tooltip, {
    title: t('Save')
  }, /*#__PURE__*/_react.default.createElement(_antd.Button, {
    onClick: saveRawDesiredCaps,
    icon: /*#__PURE__*/_react.default.createElement(_icons.SaveOutlined, null),
    className: _Session.default.capsEditorButton
  })), !isEditingDesiredCaps && /*#__PURE__*/_react.default.createElement(_antd.Tooltip, {
    title: t('Edit Raw JSON'),
    placement: "topRight"
  }, /*#__PURE__*/_react.default.createElement(_antd.Button, {
    onClick: startDesiredCapsEditor,
    icon: /*#__PURE__*/_react.default.createElement(_icons.EditOutlined, null)
  }))), isEditingDesiredCaps && /*#__PURE__*/_react.default.createElement("div", {
    className: _Session.default.capsEditor
  }, /*#__PURE__*/_react.default.createElement("textarea", {
    onChange: e => setRawDesiredCaps(e.target.value),
    value: rawDesiredCaps,
    className: `${_Session.default.capsEditorBody} ${isValidCapsJson ? _Session.default.capsEditorBodyFull : _Session.default.capsEditorBodyResized}`
  }), !isValidCapsJson && /*#__PURE__*/_react.default.createElement(_antd.Alert, {
    message: invalidCapsJsonReason,
    type: _AntdTypes.ALERT.ERROR
  })), !isEditingDesiredCaps && /*#__PURE__*/_react.default.createElement("div", {
    className: _Session.default.formattedCapsBody
  }, /*#__PURE__*/_react.default.createElement("pre", null, _formatJson.default.plain((0, _Session2.getCapsObject)(caps)))));
};
var _default = FormattedCaps;
exports.default = _default;
},{"./Session.css":"components/Session/Session.css","../../actions/Session.js":"actions/Session.js","../AntdTypes":"components/AntdTypes.js"}],"components/Session/CapabilityControl.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _antd = require("antd");
var _Session = _interopRequireDefault(require("./Session.css"));
var _polyfills = require("../../polyfills");
var _icons = require("@ant-design/icons");
var _AntdTypes = require("../AntdTypes");
var _lodash = _interopRequireDefault(require("lodash"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const getLocalFilePath = async () => {
  try {
    const {
      canceled,
      filePaths
    } = await _polyfills.remote.dialog.showOpenDialog({
      properties: ['openFile']
    });
    if (!canceled && !_lodash.default.isEmpty(filePaths)) {
      return filePaths[0];
    }
  } catch (e) {
    _polyfills.log.error(e);
  }
};
const CapabilityControl = ({
  cap,
  onSetCapabilityParam,
  onPressEnter,
  isEditingDesiredCaps,
  id,
  t
}) => {
  switch (cap.type) {
    case 'text':
      return /*#__PURE__*/_react.default.createElement(_antd.Input, {
        disabled: isEditingDesiredCaps,
        id: id,
        placeholder: t('Value'),
        value: cap.value,
        onChange: e => onSetCapabilityParam(e.target.value),
        onPressEnter: onPressEnter,
        className: _Session.default.capsBoxFont
      });
    case 'boolean':
      return /*#__PURE__*/_react.default.createElement(_antd.Switch, {
        disabled: isEditingDesiredCaps,
        id: id,
        checkedChildren: 'true',
        unCheckedChildren: 'false',
        placeholder: t('Value'),
        checked: cap.value,
        onChange: value => onSetCapabilityParam(value)
      });
    case 'number':
      return /*#__PURE__*/_react.default.createElement(_antd.Input, {
        disabled: isEditingDesiredCaps,
        id: id,
        placeholder: t('Value'),
        value: cap.value,
        onChange: e => !isNaN(parseInt(e.target.value, 10)) ? onSetCapabilityParam(parseInt(e.target.value, 10)) : onSetCapabilityParam(undefined),
        onPressEnter: onPressEnter,
        className: _Session.default.capsBoxFont
      });
    case 'object':
    case 'json_object':
      return /*#__PURE__*/_react.default.createElement(_antd.Input, {
        disabled: isEditingDesiredCaps,
        id: id,
        type: _AntdTypes.INPUT.TEXTAREA,
        rows: 4,
        placeholder: t('Value'),
        value: cap.value,
        onChange: e => onSetCapabilityParam(e.target.value),
        className: _Session.default.capsBoxFont
      });
    case 'file':
      return /*#__PURE__*/_react.default.createElement("div", {
        className: _Session.default.fileControlWrapper
      }, /*#__PURE__*/_react.default.createElement(_antd.Input, {
        disabled: isEditingDesiredCaps,
        id: id,
        placeholder: t('Value'),
        value: cap.value,
        onChange: e => onSetCapabilityParam(e.target.value),
        onPressEnter: onPressEnter,
        className: _Session.default.capsBoxFont,
        addonAfter: /*#__PURE__*/_react.default.createElement(_icons.FileOutlined, {
          className: _Session.default['filepath-button'],
          onClick: async () => onSetCapabilityParam((await getLocalFilePath()) || cap.value)
        })
      }));
    default:
      throw `Invalid cap type: ${cap.type}`;
  }
};
var _default = CapabilityControl;
exports.default = _default;
},{"./Session.css":"components/Session/Session.css","../../polyfills":"polyfills/index.js","../AntdTypes":"components/AntdTypes.js"}],"components/Session/CapabilityEditor.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _antd = require("antd");
var _FormattedCaps = _interopRequireDefault(require("./FormattedCaps"));
var _CapabilityControl = _interopRequireDefault(require("./CapabilityControl"));
var _Session = _interopRequireDefault(require("./Session.css"));
var _icons = require("@ant-design/icons");
var _AntdTypes = require("../AntdTypes");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const whitespaces = /^\s|\s$/;
const whitespaceMsg = value => {
  const leadingSpace = /^\s/.test(value);
  const trailingSpace = /\s$/.test(value);
  if (leadingSpace && trailingSpace) {
    return 'Contains Leading & Trailing Whitespace';
  }
  if (leadingSpace) {
    return 'Contains Leading Whitespace';
  }
  if (trailingSpace) {
    return 'Contains Trailing Whitespace';
  }
};

// Callback when the type of a capability is changed
const handleSetType = (setCapabilityParam, caps, index, type) => {
  setCapabilityParam(index, 'type', type);

  // Translate the current value to the new type
  let translatedValue = caps[index].value;
  switch (type) {
    case 'boolean':
      if (translatedValue === 'true') {
        translatedValue = true;
      } else if (translatedValue === 'false') {
        translatedValue = false;
      } else {
        translatedValue = !!translatedValue;
      }
      break;
    case 'number':
      translatedValue = parseInt(translatedValue, 10) || 0;
      break;
    case 'text':
    case 'json_object':
    case 'object':
      translatedValue = translatedValue + '';
      break;
    case 'file':
      translatedValue = '';
      break;
    default:
      break;
  }
  setCapabilityParam(index, 'value', translatedValue);
};
const CapabilityEditor = props => {
  const {
    setCapabilityParam,
    caps,
    addCapability,
    removeCapability,
    saveSession,
    hideSaveAsModal,
    saveAsText,
    showSaveAsModal,
    setSaveAsText,
    isEditingDesiredCaps,
    t,
    setAddVendorPrefixes,
    addVendorPrefixes,
    server,
    serverType
  } = props;
  const onSaveAsOk = () => saveSession(server, serverType, caps, {
    name: saveAsText
  });
  const latestCapField = (0, _react.useRef)();

  // if we have more than one cap and the most recent cap name is empty, it means we've just
  // added a new cap field, so focus that input element. But only do this once, so we don't annoy
  // the user if they decide to unfocus and do something else.
  (0, _react.useEffect)(() => {
    if (caps.length > 1 && !latestCapField.current.input.value && !latestCapField.current.__didFocus) {
      latestCapField.current.focus();
      latestCapField.current.__didFocus = true;
    }
  }, [caps.length, latestCapField]);
  return /*#__PURE__*/_react.default.createElement(_antd.Row, {
    type: _AntdTypes.ROW.FLEX,
    align: "top",
    justify: "start",
    className: _Session.default.capsFormRow
  }, /*#__PURE__*/_react.default.createElement(_antd.Col, {
    order: 1,
    span: 12,
    className: _Session.default.capsFormCol
  }, /*#__PURE__*/_react.default.createElement(_antd.Form, {
    className: _Session.default.newSessionForm
  }, caps.map((cap, index) => /*#__PURE__*/_react.default.createElement(_antd.Row, {
    gutter: 8,
    key: index
  }, /*#__PURE__*/_react.default.createElement(_antd.Col, {
    span: 7
  }, /*#__PURE__*/_react.default.createElement(_antd.Form.Item, null, /*#__PURE__*/_react.default.createElement(_antd.Tooltip, {
    title: whitespaceMsg(cap.name),
    open: whitespaces.test(cap.name)
  }, /*#__PURE__*/_react.default.createElement(_antd.Input, {
    disabled: isEditingDesiredCaps,
    id: `desiredCapabilityName_${index}`,
    placeholder: t('Name'),
    value: cap.name,
    onChange: e => setCapabilityParam(index, 'name', e.target.value),
    ref: index === caps.length - 1 ? latestCapField : '',
    className: _Session.default.capsBoxFont
  })))), /*#__PURE__*/_react.default.createElement(_antd.Col, {
    span: 8
  }, /*#__PURE__*/_react.default.createElement(_antd.Form.Item, null, /*#__PURE__*/_react.default.createElement(_antd.Select, {
    disabled: isEditingDesiredCaps,
    defaultValue: cap.type,
    onChange: val => handleSetType(setCapabilityParam, caps, index, val)
  }, /*#__PURE__*/_react.default.createElement(_antd.Select.Option, {
    value: "text"
  }, t('text')), /*#__PURE__*/_react.default.createElement(_antd.Select.Option, {
    value: "boolean"
  }, t('boolean')), /*#__PURE__*/_react.default.createElement(_antd.Select.Option, {
    value: "number"
  }, t('number')), /*#__PURE__*/_react.default.createElement(_antd.Select.Option, {
    value: "object"
  }, t('JSON object')), /*#__PURE__*/_react.default.createElement(_antd.Select.Option, {
    value: "file"
  }, t('filepath'))))), /*#__PURE__*/_react.default.createElement(_antd.Col, {
    span: 7
  }, /*#__PURE__*/_react.default.createElement(_antd.Form.Item, null, /*#__PURE__*/_react.default.createElement(_antd.Tooltip, {
    title: whitespaceMsg(cap.value),
    open: whitespaces.test(cap.value)
  }, /*#__PURE__*/_react.default.createElement(_CapabilityControl.default, _extends({}, props, {
    cap: cap,
    id: `desiredCapabilityValue_${index}`,
    onSetCapabilityParam: value => setCapabilityParam(index, 'value', value),
    onPressEnter: index === caps.length - 1 ? addCapability : () => {}
  }))))), /*#__PURE__*/_react.default.createElement(_antd.Col, {
    span: 2
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: _Session.default.btnDeleteCap
  }, /*#__PURE__*/_react.default.createElement(_antd.Form.Item, null, /*#__PURE__*/_react.default.createElement(_antd.Button, {
    disabled: caps.length <= 1 || isEditingDesiredCaps,
    icon: /*#__PURE__*/_react.default.createElement(_icons.DeleteOutlined, null),
    onClick: () => removeCapability(index)
  })))))), /*#__PURE__*/_react.default.createElement(_antd.Row, null, /*#__PURE__*/_react.default.createElement(_antd.Col, {
    span: 22
  }, /*#__PURE__*/_react.default.createElement(_antd.Form.Item, null, /*#__PURE__*/_react.default.createElement(_antd.Checkbox, {
    checked: addVendorPrefixes,
    onChange: e => setAddVendorPrefixes(e.target.checked)
  }, t('autoAddPrefixes')))), /*#__PURE__*/_react.default.createElement(_antd.Col, {
    span: 2
  }, /*#__PURE__*/_react.default.createElement(_antd.Form.Item, null, /*#__PURE__*/_react.default.createElement(_antd.Button, {
    disabled: isEditingDesiredCaps,
    id: "btnAddDesiredCapability",
    icon: /*#__PURE__*/_react.default.createElement(_icons.PlusOutlined, null),
    onClick: addCapability,
    className: _Session.default['add-desired-capability-button']
  })))))), /*#__PURE__*/_react.default.createElement(_antd.Col, {
    order: 2,
    span: 12,
    className: _Session.default.capsFormattedCol
  }, /*#__PURE__*/_react.default.createElement(_FormattedCaps.default, props), /*#__PURE__*/_react.default.createElement(_antd.Modal, {
    open: showSaveAsModal,
    title: t('Save Capability Set As'),
    okText: "Save",
    cancelText: "Cancel",
    onCancel: hideSaveAsModal,
    onOk: onSaveAsOk
  }, /*#__PURE__*/_react.default.createElement(_antd.Input, {
    onChange: e => setSaveAsText(e.target.value),
    addonBefore: t('Name'),
    value: saveAsText,
    onPressEnter: onSaveAsOk
  }))));
};
var _default = CapabilityEditor;
exports.default = _default;
},{"./FormattedCaps":"components/Session/FormattedCaps.js","./CapabilityControl":"components/Session/CapabilityControl.js","./Session.css":"components/Session/Session.css","../AntdTypes":"components/AntdTypes.js"}],"components/Session/SavedSessions.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _moment = _interopRequireDefault(require("moment"));
var _antd = require("antd");
var _FormattedCaps = _interopRequireDefault(require("./FormattedCaps"));
var _Session = _interopRequireDefault(require("./Session.css"));
var _icons = require("@ant-design/icons");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const DATE_COLUMN_WIDTH = '25%';
const ACTIONS_COLUMN_WIDTH = '106px';
const dataSource = savedSessions => {
  if (!savedSessions) {
    return [];
  }
  return savedSessions.map(session => ({
    key: session.uuid,
    name: session.name || '(Unnamed)',
    date: (0, _moment.default)(session.date).format('YYYY-MM-DD')
  }));
};
const sessionFromUUID = (savedSessions, uuid) => {
  for (let session of savedSessions) {
    if (session.uuid === uuid) {
      return session;
    }
  }
  throw new Error(`Couldn't find session with uuid ${uuid}`);
};
const SavedSessions = props => {
  const {
    savedSessions,
    capsUUID,
    switchTabs
  } = props;
  const handleCapsAndServer = uuid => {
    const {
      setCapsAndServer,
      server,
      serverType,
      isEditingDesiredCapsName,
      abortDesiredCapsNameEditor,
      isEditingDesiredCaps,
      abortDesiredCapsEditor
    } = props;
    const session = sessionFromUUID(savedSessions, uuid);

    // Disable any editors before changing the selected caps
    if (isEditingDesiredCapsName) {
      abortDesiredCapsNameEditor();
    }
    if (isEditingDesiredCaps) {
      abortDesiredCapsEditor();
    }

    // In case user has CAPS saved from older version of Inspector which
    // doesn't contain server and serverType within the session object
    setCapsAndServer(session.server || server, session.serverType || serverType, session.caps, session.uuid, session.name);
  };
  const handleDelete = uuid => {
    const {
      deleteSavedSession
    } = props;
    if (window.confirm('Are you sure?')) {
      deleteSavedSession(uuid);
    }
  };
  const columns = [{
    title: 'Capability Set',
    dataIndex: 'name',
    key: 'name'
  }, {
    title: 'Created',
    dataIndex: 'date',
    key: 'date',
    width: DATE_COLUMN_WIDTH
  }, {
    title: 'Actions',
    key: 'action',
    width: ACTIONS_COLUMN_WIDTH,
    render: (_, record) => /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_antd.Button, {
      icon: /*#__PURE__*/_react.default.createElement(_icons.EditOutlined, null),
      onClick: () => {
        handleCapsAndServer(record.key);
        switchTabs('new');
      },
      className: _Session.default.editSession
    }), /*#__PURE__*/_react.default.createElement(_antd.Button, {
      icon: /*#__PURE__*/_react.default.createElement(_icons.DeleteOutlined, null),
      onClick: () => handleDelete(record.key)
    }))
  }];
  return /*#__PURE__*/_react.default.createElement(_antd.Row, {
    className: _Session.default.savedSessions
  }, /*#__PURE__*/_react.default.createElement(_antd.Col, {
    span: 12
  }, /*#__PURE__*/_react.default.createElement(_antd.Table, {
    pagination: false,
    sticky: true,
    dataSource: dataSource(savedSessions),
    columns: columns,
    onRow: row => ({
      onClick: () => handleCapsAndServer(row.key)
    }),
    rowClassName: row => capsUUID === row.key ? _Session.default.selected : ''
  })), /*#__PURE__*/_react.default.createElement(_antd.Col, {
    span: 12,
    className: _Session.default.capsFormattedCol
  }, /*#__PURE__*/_react.default.createElement(_FormattedCaps.default, _extends({}, props, {
    title: capsUUID ? sessionFromUUID(savedSessions, capsUUID).name : null
  }))));
};
var _default = SavedSessions;
exports.default = _default;
},{"./FormattedCaps":"components/Session/FormattedCaps.js","./Session.css":"components/Session/Session.css"}],"components/Session/AttachToSession.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _antd = require("antd");
var _Session = _interopRequireDefault(require("./Session.css"));
var _icons = require("@ant-design/icons");
var _Session2 = require("../../actions/Session");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const formatCaps = caps => {
  let importantCaps = [caps.app, caps.platformName, caps.deviceName];
  if (caps.automationName) {
    importantCaps.push(caps.automationName);
  }
  return importantCaps.join(', ').trim();
};
const formatCapsBrowserstack = caps => {
  let importantCaps = formatCaps(caps).split(', ');
  if (caps.sessionName) {
    importantCaps.push(caps.sessionName);
  }
  return importantCaps.join(', ').trim();
};
const formatCapsLambdaTest = caps => {
  if (caps.hasOwnProperty.call(caps, 'capabilities')) {
    caps = caps.capabilities;
  }
  const deviceName = caps.desired ? caps.desired.deviceName : caps.deviceName;
  const importantCaps = [deviceName, caps.platformName, caps.platformVersion];
  return importantCaps.join(', ').trim();
};
const getSessionInfo = (session, serverType) => {
  switch (serverType) {
    case _Session2.ServerTypes.browserstack:
      return `${session.id} — ${formatCapsBrowserstack(session.capabilities)}`;
    case _Session2.ServerTypes.lambdatest:
      return `${session.id} - ${formatCapsLambdaTest(session.capabilities)}`;
    default:
      return `${session.id} — ${formatCaps(session.capabilities)}`;
  }
};
const AttachToSession = ({
  serverType,
  attachSessId,
  setAttachSessId,
  runningAppiumSessions,
  getRunningSessions,
  t
}) => /*#__PURE__*/_react.default.createElement(_antd.Form, null, /*#__PURE__*/_react.default.createElement(_antd.Form.Item, null, /*#__PURE__*/_react.default.createElement(_antd.Card, null, /*#__PURE__*/_react.default.createElement("p", {
  className: _Session.default.localDesc
}, t('connectToExistingSessionInstructions'), /*#__PURE__*/_react.default.createElement("br", null), t('selectSessionIDInDropdown')))), /*#__PURE__*/_react.default.createElement(_antd.Form.Item, null, /*#__PURE__*/_react.default.createElement(_antd.Row, null, /*#__PURE__*/_react.default.createElement(_antd.Col, {
  span: 23
}, /*#__PURE__*/_react.default.createElement(_antd.Select, {
  showSearch: true,
  mode: "AutoComplete",
  notFoundContent: "None found",
  placeholder: t('enterYourSessionId'),
  value: attachSessId || undefined,
  onChange: value => setAttachSessId(value)
}, runningAppiumSessions.map(session => /*#__PURE__*/_react.default.createElement(_antd.Select.Option, {
  key: session.id,
  value: session.id
}, /*#__PURE__*/_react.default.createElement("div", null, getSessionInfo(session, serverType)))))), /*#__PURE__*/_react.default.createElement(_antd.Col, {
  span: 1
}, /*#__PURE__*/_react.default.createElement("div", {
  className: _Session.default.btnReload
}, /*#__PURE__*/_react.default.createElement(_antd.Button, {
  onClick: getRunningSessions,
  icon: /*#__PURE__*/_react.default.createElement(_icons.ReloadOutlined, null)
}))))));
var _default = AttachToSession;
exports.default = _default;
},{"./Session.css":"components/Session/Session.css","../../actions/Session":"actions/Session.js"}],"components/Session/ServerTabCustom.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _antd = require("antd");
var _Session = require("../../actions/Session");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const ServerTabCustom = ({
  server,
  setServerParam,
  t
}) => /*#__PURE__*/_react.default.createElement(_antd.Form, null, /*#__PURE__*/_react.default.createElement(_antd.Row, {
  gutter: 8
}, /*#__PURE__*/_react.default.createElement(_antd.Col, {
  span: 9
}, /*#__PURE__*/_react.default.createElement(_antd.Form.Item, null, /*#__PURE__*/_react.default.createElement(_antd.Input, {
  id: "customServerHost",
  placeholder: _Session.DEFAULT_SERVER_HOST,
  addonBefore: t('Remote Host'),
  value: server.remote.hostname,
  onChange: e => setServerParam('hostname', e.target.value)
}))), /*#__PURE__*/_react.default.createElement(_antd.Col, {
  span: 4
}, /*#__PURE__*/_react.default.createElement(_antd.Form.Item, null, /*#__PURE__*/_react.default.createElement(_antd.Input, {
  id: "customServerPort",
  placeholder: _Session.DEFAULT_SERVER_PORT,
  addonBefore: t('Remote Port'),
  value: server.remote.port,
  onChange: e => setServerParam('port', e.target.value)
}))), /*#__PURE__*/_react.default.createElement(_antd.Col, {
  span: 9
}, /*#__PURE__*/_react.default.createElement(_antd.Form.Item, null, /*#__PURE__*/_react.default.createElement(_antd.Input, {
  id: "customServerPath",
  placeholder: _Session.DEFAULT_SERVER_PATH,
  addonBefore: t('Remote Path'),
  value: server.remote.path,
  onChange: e => setServerParam('path', e.target.value)
}))), /*#__PURE__*/_react.default.createElement(_antd.Col, {
  span: 2
}, /*#__PURE__*/_react.default.createElement(_antd.Form.Item, null, /*#__PURE__*/_react.default.createElement(_antd.Checkbox, {
  id: "customServerSSL",
  checked: !!server.remote.ssl,
  value: server.remote.ssl,
  onChange: e => setServerParam('ssl', e.target.checked)
}, t('SSL'))))));
var _default = ServerTabCustom;
exports.default = _default;
},{"../../actions/Session":"actions/Session.js"}],"components/Session/AdvancedServerParams.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _antd = require("antd");
var _Session = _interopRequireDefault(require("./Session.css"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const AdvancedServerParams = ({
  server,
  setServerParam,
  serverType,
  t
}) => /*#__PURE__*/_react.default.createElement(_antd.Row, {
  gutter: 8
}, /*#__PURE__*/_react.default.createElement(_antd.Col, {
  className: _Session.default.advancedSettingsContainerCol
}, /*#__PURE__*/_react.default.createElement("div", {
  className: _Session.default.advancedSettingsContainer
}, /*#__PURE__*/_react.default.createElement(_antd.Collapse, {
  bordered: true
}, /*#__PURE__*/_react.default.createElement(_antd.Collapse.Panel, {
  header: t('Advanced Settings')
}, /*#__PURE__*/_react.default.createElement(_antd.Row, null, serverType !== 'lambdatest' && /*#__PURE__*/_react.default.createElement(_antd.Col, {
  span: 7
}, /*#__PURE__*/_react.default.createElement(_antd.Form.Item, null, /*#__PURE__*/_react.default.createElement(_antd.Checkbox, {
  checked: !!server.advanced.allowUnauthorized,
  onChange: e => setServerParam('allowUnauthorized', e.target.checked, 'advanced')
}, t('allowUnauthorizedCerts')))), /*#__PURE__*/_react.default.createElement(_antd.Col, {
  span: 5,
  align: "right"
}, /*#__PURE__*/_react.default.createElement(_antd.Form.Item, null, /*#__PURE__*/_react.default.createElement(_antd.Checkbox, {
  checked: !!server.advanced.useProxy,
  onChange: e => setServerParam('useProxy', e.target.checked, 'advanced')
}, t('Use Proxy')))), /*#__PURE__*/_react.default.createElement(_antd.Col, {
  span: 8
}, /*#__PURE__*/_react.default.createElement(_antd.Form.Item, null, /*#__PURE__*/_react.default.createElement(_antd.Input, {
  disabled: !server.advanced.useProxy,
  onChange: e => setServerParam('proxy', e.target.value, 'advanced'),
  placeholder: t('Proxy URL'),
  value: server.advanced.proxy
})))))))));
var _default = AdvancedServerParams;
exports.default = _default;
},{"./Session.css":"components/Session/Session.css"}],"components/Session/CloudProviderSelector.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _lodash = _interopRequireDefault(require("lodash"));
var _antd = require("antd");
var _CloudProviders = _interopRequireDefault(require("./CloudProviders"));
var _Session = _interopRequireDefault(require("./Session.css"));
var _AntdTypes = require("../AntdTypes");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const CloudProviderSelector = props => {
  const {
    visibleProviders = [],
    isAddingCloudProvider,
    stopAddCloudProvider,
    t
  } = props;
  const footer = /*#__PURE__*/_react.default.createElement(_antd.Button, {
    key: "back",
    type: _AntdTypes.BUTTON.PRIMARY,
    onClick: stopAddCloudProvider
  }, t('Done'));
  const providersGrid = _lodash.default.chunk(_lodash.default.keys(_CloudProviders.default), 2); // Converts list of providers into list of pairs of providers

  const toggleVisibleProvider = providerName => {
    const {
      addVisibleProvider,
      removeVisibleProvider
    } = props;
    if (visibleProviders.includes(providerName)) {
      removeVisibleProvider(providerName);
    } else {
      addVisibleProvider(providerName);
    }
  };
  return /*#__PURE__*/_react.default.createElement(_antd.Modal, {
    key: "modal",
    className: _Session.default.cloudProviderModal,
    open: isAddingCloudProvider,
    onCancel: stopAddCloudProvider,
    footer: footer,
    title: t('Select Cloud Providers')
  }, [..._lodash.default.map(providersGrid, (row, key) => /*#__PURE__*/_react.default.createElement(_antd.Row, {
    gutter: 16,
    key: key
  }, [...(0, _lodash.default)(row).map(providerName => {
    const providerIsVisible = visibleProviders.includes(providerName);
    const style = {};
    if (providerIsVisible) {
      style.borderColor = '#40a9ff';
    }
    const provider = _CloudProviders.default[providerName];
    return provider && /*#__PURE__*/_react.default.createElement(_antd.Col, {
      span: 12,
      key: providerName
    }, /*#__PURE__*/_react.default.createElement(_antd.Button, {
      role: "checkbox",
      style: style,
      onClick: () => toggleVisibleProvider(providerName)
    }, /*#__PURE__*/_react.default.createElement("img", {
      src: provider.logo
    })));
  })]))]);
};
var _default = CloudProviderSelector;
exports.default = _default;
},{"./CloudProviders":"components/Session/CloudProviders.js","./Session.css":"components/Session/Session.css","../AntdTypes":"components/AntdTypes.js"}],"components/Session/Session.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _polyfills = require("../../polyfills");
var _react = _interopRequireWildcard(require("react"));
var _lodash = _interopRequireDefault(require("lodash"));
var _CapabilityEditor = _interopRequireDefault(require("./CapabilityEditor"));
var _SavedSessions = _interopRequireDefault(require("./SavedSessions"));
var _AttachToSession = _interopRequireDefault(require("./AttachToSession"));
var _ServerTabCustom = _interopRequireDefault(require("./ServerTabCustom"));
var _antd = require("antd");
var _AdvancedServerParams = _interopRequireDefault(require("./AdvancedServerParams"));
var _Session = _interopRequireDefault(require("./Session.css"));
var _CloudProviders = _interopRequireDefault(require("./CloudProviders"));
var _CloudProviderSelector = _interopRequireDefault(require("./CloudProviderSelector"));
var _icons = require("@ant-design/icons");
var _AntdTypes = require("../AntdTypes");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const ADD_CLOUD_PROVIDER = 'addCloudProvider';
const CAPS_DOCS_LINK = 'https://appium.io/docs/en/latest/guides/caps/';
const Session = props => {
  const {
    tabKey,
    switchTabs,
    serverType,
    server,
    visibleProviders = [],
    caps,
    capsUUID,
    capsName,
    isCapsDirty,
    isEditingDesiredCaps,
    requestSaveAsModal,
    saveSession,
    newSession,
    savedSessions,
    newSessionLoading,
    attachSessId,
    t
  } = props;
  const isAttaching = tabKey === 'attach';
  const handleSelectServerTab = async tab => {
    const {
      changeServerType,
      addCloudProvider
    } = props;
    if (tab === ADD_CLOUD_PROVIDER) {
      addCloudProvider();
      return;
    }
    await changeServerType(tab);
  };
  (0, _react.useEffect)(() => {
    const {
      setLocalServerParams,
      getSavedSessions,
      setSavedServerParams,
      setStateFromAppiumFile,
      setVisibleProviders,
      getRunningSessions,
      bindWindowClose,
      initFromQueryString,
      saveFile
    } = props;
    (async () => {
      try {
        bindWindowClose();
        switchTabs('new');
        await getSavedSessions();
        await setSavedServerParams();
        await setLocalServerParams();
        await setVisibleProviders();
        getRunningSessions();
        await initFromQueryString();
        await setStateFromAppiumFile();
        _polyfills.ipcRenderer.on('open-file', (_, filePath) => setStateFromAppiumFile(filePath));
        _polyfills.ipcRenderer.on('save-file', (_, filePath) => saveFile(filePath));
      } catch (e) {
        console.error(e); // eslint-disable-line no-console
      }
    })();
  }, []);
  return [/*#__PURE__*/_react.default.createElement(_antd.Spin, {
    spinning: !!newSessionLoading,
    key: "main"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: _Session.default.sessionContainer
  }, /*#__PURE__*/_react.default.createElement("div", {
    id: "serverTypeTabs",
    className: _Session.default.serverTab
  }, /*#__PURE__*/_react.default.createElement(_antd.Tabs, {
    activeKey: serverType,
    onChange: tab => handleSelectServerTab(tab),
    className: _Session.default.serverTabs,
    items: [{
      label: t('Appium Server'),
      key: 'remote',
      children: /*#__PURE__*/_react.default.createElement(_ServerTabCustom.default, props)
    }, ...(0, _lodash.default)(visibleProviders).map(providerName => {
      const provider = _CloudProviders.default[providerName];
      if (!provider) {
        return true;
      }
      return {
        label: /*#__PURE__*/_react.default.createElement("div", null, provider.tabhead()),
        key: providerName,
        children: provider.tab(props)
      };
    }), {
      label: /*#__PURE__*/_react.default.createElement("span", {
        className: "addCloudProviderTab"
      }, t('Select Cloud Providers')),
      key: ADD_CLOUD_PROVIDER
    }]
  }), /*#__PURE__*/_react.default.createElement(_AdvancedServerParams.default, props)), /*#__PURE__*/_react.default.createElement(_antd.Tabs, {
    activeKey: tabKey,
    onChange: switchTabs,
    className: _Session.default.scrollingTabCont,
    items: [{
      label: t('Desired Capabilities'),
      key: 'new',
      className: _Session.default.scrollingTab,
      children: /*#__PURE__*/_react.default.createElement(_CapabilityEditor.default, props)
    }, {
      label: /*#__PURE__*/_react.default.createElement("span", null, t('Saved Capability Sets'), " ", /*#__PURE__*/_react.default.createElement(_antd.Badge, {
        count: savedSessions.length,
        offset: [0, -3]
      })),
      key: 'saved',
      className: _Session.default.scrollingTab,
      disabled: savedSessions.length === 0,
      children: /*#__PURE__*/_react.default.createElement(_SavedSessions.default, props)
    }, {
      label: t('Attach to Session'),
      key: 'attach',
      className: _Session.default.scrollingTab,
      children: /*#__PURE__*/_react.default.createElement(_AttachToSession.default, props)
    }]
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: _Session.default.sessionFooter
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: _Session.default.desiredCapsLink
  }, /*#__PURE__*/_react.default.createElement("a", {
    href: "#",
    onClick: e => e.preventDefault() || _polyfills.shell.openExternal(CAPS_DOCS_LINK)
  }, /*#__PURE__*/_react.default.createElement(_icons.LinkOutlined, null), "\xA0", t('desiredCapabilitiesDocumentation'))), !isAttaching && capsUUID && /*#__PURE__*/_react.default.createElement(_antd.Button, {
    onClick: () => saveSession(server, serverType, caps, {
      name: capsName,
      uuid: capsUUID
    }),
    disabled: !isCapsDirty || isEditingDesiredCaps
  }, t('Save')), !isAttaching && /*#__PURE__*/_react.default.createElement(_antd.Button, {
    onClick: requestSaveAsModal,
    disabled: isEditingDesiredCaps
  }, t('saveAs')), !isAttaching && /*#__PURE__*/_react.default.createElement(_antd.Button, {
    type: _AntdTypes.BUTTON.PRIMARY,
    id: "btnStartSession",
    onClick: () => newSession(caps),
    className: _Session.default['start-session-button']
  }, t('startSession')), isAttaching && /*#__PURE__*/_react.default.createElement(_antd.Button, {
    type: _AntdTypes.BUTTON.PRIMARY,
    disabled: !attachSessId,
    onClick: () => newSession(null, attachSessId)
  }, t('attachToSession'))))), /*#__PURE__*/_react.default.createElement(_CloudProviderSelector.default, _extends({}, props, {
    key: "CloudProviderSelector"
  }))];
};
var _default = Session;
exports.default = _default;
},{"../../polyfills":"polyfills/index.js","./CapabilityEditor":"components/Session/CapabilityEditor.js","./SavedSessions":"components/Session/SavedSessions.js","./AttachToSession":"components/Session/AttachToSession.js","./ServerTabCustom":"components/Session/ServerTabCustom.js","./AdvancedServerParams":"components/Session/AdvancedServerParams.js","./Session.css":"components/Session/Session.css","./CloudProviders":"components/Session/CloudProviders.js","./CloudProviderSelector":"components/Session/CloudProviderSelector.js","../AntdTypes":"components/AntdTypes.js"}],"containers/SessionPage.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactRedux = require("react-redux");
var _util = require("../util");
var SessionActions = _interopRequireWildcard(require("../actions/Session"));
var _Session2 = _interopRequireDefault(require("../components/Session/Session"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function mapStateToProps(state) {
  return state.session;
}
var _default = (0, _util.withTranslation)(_Session2.default, (0, _reactRedux.connect)(mapStateToProps, SessionActions));
exports.default = _default;
},{"../util":"util.js","../actions/Session":"actions/Session.js","../components/Session/Session":"components/Session/Session.js"}],"components/Inspector/Inspector.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');
module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
module.exports = {
  "inspector-container": "_inspector-container_5407d",
  "inspector-toolbar": "_inspector-toolbar_5407d",
  "ant-btn": "_ant-btn_5407d",
  "inspector-main": "_inspector-main_5407d",
  "screenshot-container": "_screenshot-container_5407d",
  "screenshot-controls": "_screenshot-controls_5407d",
  "screenshotBox": "_screenshotBox_5407d",
  "interaction-tab-container": "_interaction-tab-container_5407d",
  "tree-container": "_tree-container_5407d",
  "session-info-table": "_session-info-table_5407d",
  "session-code-box": "_session-code-box_5407d",
  "session-inner-table": "_session-inner-table_5407d",
  "scroll-buttons": "_scroll-buttons_5407d",
  "scroll-right": "_scroll-right_5407d",
  "recorded-actions": "_recorded-actions_5407d",
  "_inspector-main_0387c": "__inspector-main_0387c_5407d",
  "ant-card-body": "_ant-card-body_5407d",
  "interaction-tab-card": "_interaction-tab-card_5407d",
  "highlighter-box": "_highlighter-box_5407d",
  "inspected-element-box": "_inspected-element-box_5407d",
  "hovered-element-box": "_hovered-element-box_5407d",
  "centroid-box": "_centroid-box_5407d",
  "centroid": "_centroid_5407d",
  "overlap": "_overlap_5407d",
  "expand": "_expand_5407d",
  "plus-minus": "_plus-minus_5407d",
  "custom-button-icon": "_custom-button-icon_5407d",
  "elementActions": "_elementActions_5407d",
  "elementKeyInputActions": "_elementKeyInputActions_5407d",
  "selectedElementContainer": "_selectedElementContainer_5407d",
  "selected-element-table-cells": "_selected-element-table-cells_5407d",
  "element-cell-copy": "_element-cell-copy_5407d",
  "selected-element-card": "_selected-element-card_5407d",
  "selectedElemNotInteractableAlertRow": "_selectedElemNotInteractableAlertRow_5407d",
  "context-selector": "_context-selector_5407d",
  "sourceTag": "_sourceTag_5407d",
  "sourceAttrName": "_sourceAttrName_5407d",
  "no-recorded-actions": "_no-recorded-actions_5407d",
  "recorded-code": "_recorded-code_5407d",
  "framework-dropdown": "_framework-dropdown_5407d",
  "searchResultsList": "_searchResultsList_5407d",
  "searchResultsSelectedItem": "_searchResultsSelectedItem_5407d",
  "searchResultsActions": "_searchResultsActions_5407d",
  "searchResultsKeyInput": "_searchResultsKeyInput_5407d",
  "elementKeyInput": "_elementKeyInput_5407d",
  "element-count-container": "_element-count-container_5407d",
  "locatorStrategyBtn": "_locatorStrategyBtn_5407d",
  "locatorSelectorTextArea": "_locatorSelectorTextArea_5407d",
  "coordinatesContainer": "_coordinatesContainer_5407d",
  "swipeInstructions": "_swipeInstructions_5407d",
  "swipeSvg": "_swipeSvg_5407d",
  "tapDiv": "_tapDiv_5407d",
  "gestureSvg": "_gestureSvg_5407d",
  "filled": "_filled_5407d",
  "dashed": "_dashed_5407d",
  "whole": "_whole_5407d",
  "newDashed": "_newDashed_5407d",
  "circle-dashed": "_circle-dashed_5407d",
  "circle-newDashed": "_circle-newDashed_5407d",
  "innerScreenshotContainer": "_innerScreenshotContainer_5407d",
  "screenshotActionsPanel": "_screenshotActionsPanel_5407d",
  "commands-container": "_commands-container_5407d",
  "btn-container": "_btn-container_5407d",
  "arg-row": "_arg-row_5407d",
  "arg-container": "_arg-container_5407d",
  "gesture-header": "_gesture-header_5407d",
  "gesture-header-title": "_gesture-header-title_5407d",
  "gesture-header-description": "_gesture-header-description_5407d",
  "gesture-header-coord-btn": "_gesture-header-coord-btn_5407d",
  "gesture-header-timeline": "_gesture-header-timeline_5407d",
  "timeline-tick-title": "_timeline-tick-title_5407d",
  "gesture-header-icon": "_gesture-header-icon_5407d",
  "pointer-title": "_pointer-title_5407d",
  "tick-card": "_tick-card_5407d",
  "tick-plus-card": "_tick-plus-card_5407d",
  "tick-plus-btn": "_tick-plus-btn_5407d",
  "spaceContainer": "_spaceContainer_5407d",
  "tick-pointer-input": "_tick-pointer-input_5407d",
  "tick-button-group": "_tick-button-group_5407d",
  "tick-button-input": "_tick-button-input_5407d",
  "tick-input-box": "_tick-input-box_5407d",
  "tick-coord-box": "_tick-coord-box_5407d",
  "option-inpt": "_option-inpt_5407d"
};
},{"_css_loader":"../../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"components/Inspector/HighlighterRect.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _Inspector = _interopRequireDefault(require("./Inspector.css"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * Absolute positioned divs that overlay the app screenshot and highlight the bounding
 * boxes of the elements in the app
 */
const HighlighterRect = props => {
  const {
    selectedElement = {},
    selectHoveredElement,
    unselectHoveredElement,
    hoveredElement = {},
    selectElement,
    unselectElement,
    element,
    scaleRatio,
    xOffset,
    elLocation,
    elSize,
    dimensions
  } = props;
  const {
    path: hoveredPath
  } = hoveredElement;
  const {
    path: selectedPath
  } = selectedElement;
  let width, height, left, top, highlighterClasses, key;
  highlighterClasses = [_Inspector.default['highlighter-box']];
  if (element) {
    ({
      width,
      height,
      left,
      top
    } = dimensions);

    // Add class + special classes to hovered and selected elements
    if (hoveredPath === element.path) {
      highlighterClasses.push(_Inspector.default['hovered-element-box']);
    }
    if (selectedPath === element.path) {
      highlighterClasses.push(_Inspector.default['inspected-element-box']);
    }
    key = element.path;
  } else if (elLocation && elSize) {
    width = elSize.width / scaleRatio;
    height = elSize.height / scaleRatio;
    top = elLocation.y / scaleRatio;
    left = elLocation.x / scaleRatio + xOffset;
    // Unique keys are assigned to elements by their x & y coordinates
    key = `searchedForElement{x: ${elLocation.x}, y: ${elLocation.y}}`;
    highlighterClasses.push(_Inspector.default['inspected-element-box']);
  }
  return /*#__PURE__*/_react.default.createElement("div", {
    className: highlighterClasses.join(' ').trim(),
    onMouseOver: () => selectHoveredElement(key),
    onMouseOut: unselectHoveredElement,
    onClick: () => key === selectedPath ? unselectElement() : selectElement(key),
    key: key,
    style: {
      left: left || 0,
      top: top || 0,
      width: width || 0,
      height: height || 0
    }
  }, /*#__PURE__*/_react.default.createElement("div", null));
};
var _default = HighlighterRect;
exports.default = _default;
},{"./Inspector.css":"components/Inspector/Inspector.css"}],"components/Inspector/HighlighterCentroid.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _Inspector = _interopRequireDefault(require("./Inspector.css"));
var _shared = require("./shared");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const {
  CENTROID,
  OVERLAP,
  EXPAND
} = _shared.RENDER_CENTROID_AS;
const CENTROID_STYLES = {
  VISIBLE: 'visible',
  HIDDEN: 'hidden',
  CONTAINER: '50%',
  NON_CONTAINER: '0%'
};

// Generate new coordinates along a circlular trajectory
// for overlapping elements only
const getCentroidPos = (type, angle, coord) => {
  if (type === OVERLAP) {
    return `calc((${angle} * 2.6vh) + ${coord}px)`;
  }
  return coord;
};

/**
 * Shows all element centroids
 */
const HighlighterCentroid = props => {
  const {
    selectedElementPath,
    hoveredElement = {},
    element,
    elementProperties,
    centroidType,
    hoveredCentroid,
    selectedCentroid
  } = props;
  const {
    centerX,
    centerY,
    angleX,
    angleY,
    keyCode,
    path,
    container
  } = elementProperties;
  const onMouseEnter = path => {
    const {
      selectHoveredElement,
      selectHoveredCentroid
    } = props;
    if (centroidType === EXPAND) {
      selectHoveredCentroid(path);
    } else {
      selectHoveredElement(path);
    }
  };
  const onMouseLeave = () => {
    const {
      unselectHoveredElement,
      unselectHoveredCentroid
    } = props;
    if (centroidType === EXPAND) {
      unselectHoveredCentroid();
    } else {
      unselectHoveredElement();
    }
  };
  const onClickCentroid = path => {
    const {
      selectElement,
      unselectElement,
      selectCentroid,
      unselectCentroid
    } = props;
    if (centroidType === EXPAND) {
      if (path === selectedCentroid) {
        unselectCentroid();
      } else {
        selectCentroid(path);
      }
    } else {
      if (path === selectedElementPath) {
        unselectElement();
      } else {
        selectElement(path);
      }
    }
  };
  const centroidClasses = [_Inspector.default['centroid-box']];
  centroidClasses.push(_Inspector.default[centroidType]);

  // Highlight centroids that represent elements
  if (centroidType !== EXPAND) {
    if (hoveredElement.path === path) {
      centroidClasses.push(_Inspector.default['hovered-element-box']);
    }
    if (selectedElementPath === path) {
      centroidClasses.push(_Inspector.default['inspected-element-box']);
    }
  }

  // Highlight +/- centroids
  if (centroidType !== CENTROID) {
    if (hoveredCentroid === keyCode) {
      centroidClasses.push(_Inspector.default['hovered-element-box']);
    }
    if (selectedCentroid === keyCode && !element) {
      centroidClasses.push(_Inspector.default['inspected-element-box']);
    }
  }
  const overlapDivStyle = {
    visibility: keyCode === selectedCentroid ? CENTROID_STYLES.VISIBLE : CENTROID_STYLES.HIDDEN
  };
  const centroidDivStyle = {
    left: getCentroidPos(centroidType, angleX, centerX),
    top: getCentroidPos(centroidType, angleY, centerY),
    borderRadius: element && !container ? CENTROID_STYLES.NON_CONTAINER : CENTROID_STYLES.CONTAINER,
    ...(centroidType === OVERLAP ? overlapDivStyle : {})
  };
  const placeHolder = centroidType === EXPAND ? /*#__PURE__*/_react.default.createElement("div", {
    className: _Inspector.default['plus-minus']
  }, keyCode === selectedCentroid ? '-' : '+') : /*#__PURE__*/_react.default.createElement("div", null);
  return /*#__PURE__*/_react.default.createElement("div", {
    className: centroidClasses.join(' ').trim(),
    onMouseOver: () => onMouseEnter(path),
    onMouseOut: () => onMouseLeave(),
    onClick: () => onClickCentroid(path),
    key: path,
    style: centroidDivStyle
  }, placeHolder);
};
var _default = HighlighterCentroid;
exports.default = _default;
},{"./Inspector.css":"components/Inspector/Inspector.css","./shared":"components/Inspector/shared.js"}],"components/Inspector/HighlighterRects.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _HighlighterRect = _interopRequireDefault(require("./HighlighterRect"));
var _HighlighterCentroid = _interopRequireDefault(require("./HighlighterCentroid"));
var _shared = require("./shared");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const {
  CENTROID,
  OVERLAP,
  EXPAND
} = _shared.RENDER_CENTROID_AS;

/**
 * Shows screenshot of running application and divs that highlight the elements' bounding boxes
 */
const HighlighterRects = props => {
  const {
    source,
    containerEl,
    searchedForElementBounds,
    scaleRatio,
    showCentroids,
    isLocatorTestModalVisible,
    isSiriCommandModalVisible
  } = props;
  const highlighterRects = [];
  const highlighterCentroids = [];
  let highlighterXOffset = 0;
  let screenshotEl = null;
  const getElements = source => {
    const elementsByOverlap = buildElementsWithProps(source, null, [], {});
    let elements = [];

    // Adjust overlapping elements
    for (const key of Object.keys(elementsByOverlap)) {
      if (elementsByOverlap[key].length > 1) {
        const {
          centerX,
          centerY
        } = elementsByOverlap[key][0].properties;

        // Create new element obj which will be a +/- centroid

        const element = {
          type: EXPAND,
          element: null,
          parent: null,
          properties: {
            left: null,
            top: null,
            width: null,
            height: null,
            centerX,
            centerY,
            angleX: null,
            angleY: null,
            path: key,
            keyCode: key,
            container: null,
            accessible: null
          }
        };
        elements = [...elements, element, ...updateOverlapsAngles(elementsByOverlap[key], key)];
      } else {
        elements.push(elementsByOverlap[key][0]);
      }
    }
    return elements;
  };

  // This func creates a new object for each element and determines its properties
  // 'elements' is an array that stores all prev elements
  // 'overlaps' is an object which organzies elements by their positions
  const buildElementsWithProps = (source, prevElement, elements, overlaps) => {
    if (!source) {
      return {};
    }
    const {
      x1,
      y1,
      x2,
      y2
    } = (0, _shared.parseCoordinates)(source);
    const xOffset = highlighterXOffset || 0;
    const centerPoint = (v1, v2) => Math.round(v1 + (v2 - v1) / 2) / scaleRatio;
    const obj = {
      type: CENTROID,
      element: source,
      parent: prevElement,
      properties: {
        left: x1 / scaleRatio + xOffset,
        top: y1 / scaleRatio,
        width: (x2 - x1) / scaleRatio,
        height: (y2 - y1) / scaleRatio,
        centerX: centerPoint(x1, x2) + xOffset,
        centerY: centerPoint(y1, y2),
        angleX: null,
        angleY: null,
        path: source.path,
        keyCode: null,
        container: false,
        accessible: source.attributes ? source.attributes.accessible : null
      }
    };
    const coordinates = `${obj.properties.centerX}.${obj.properties.centerY}`;
    obj.properties.container = isElementContainer(obj, elements);
    elements.push(obj);
    if (source.path) {
      if (overlaps[coordinates]) {
        overlaps[coordinates].push(obj);
      } else {
        overlaps[coordinates] = [obj];
      }
    }
    if (source.children) {
      for (const childEl of source.children) {
        buildElementsWithProps(childEl, source, elements, overlaps);
      }
    }
    return overlaps;
  };
  const isElementContainer = (element1, elements) => {
    for (const element2 of elements) {
      if (element2.element !== element1.element && isElementOverElement(element1.properties, element2.properties) && !isAncestor(element1.parent, element2.element, elements)) {
        return true;
      }
    }
    return false;
  };
  const isElementOverElement = (element1, element2) => element1.left <= element2.left && element1.width >= element2.width && element1.top >= element2.top && element1.height >= element2.height;

  // Traverse through parent elements until we reach maybeAncestor
  const isAncestor = (curElement, maybeAncestor, elements) => {
    if (elements.length > 0) {
      while (curElement !== null) {
        if (curElement === maybeAncestor) {
          return true;
        }
        for (const elem of elements) {
          if (elem.element === curElement) {
            curElement = elem.parent;
          }
        }
      }
    }
    return false;
  };

  // Generate angles for circular positioning for overlaping elements
  const updateOverlapsAngles = (elements, key) => {
    const steps = elements.length;
    for (let step = 0; step < steps; step++) {
      const [el, elProps] = [elements[step], elements[step].properties];
      el.type = OVERLAP;
      elProps.keyCode = key;
      elProps.angleX = Math.cos(2 * Math.PI * (step / steps));
      elProps.angleY = Math.sin(2 * Math.PI * (step / steps));
    }
    return elements;
  };

  // Displays element rectangles only
  const renderElements = source => {
    for (const elem of source) {
      highlighterRects.push( /*#__PURE__*/_react.default.createElement(_HighlighterRect.default, _extends({}, props, {
        dimensions: elem.properties,
        element: elem.element,
        scaleRatio: scaleRatio,
        key: elem.properties.path,
        xOffset: highlighterXOffset
      })));
    }
  };

  // Displays centroids only
  const renderCentroids = centroids => {
    for (const elem of centroids) {
      highlighterCentroids.push( /*#__PURE__*/_react.default.createElement(_HighlighterCentroid.default, _extends({}, props, {
        centroidType: elem.type,
        elementProperties: elem.properties,
        element: elem.element,
        key: elem.properties.path
      })));
    }
  };

  // Array of all element objects with properties to draw rectangles and/or centroids
  const elements = getElements(source);
  if (containerEl) {
    screenshotEl = containerEl.querySelector('img');
    highlighterXOffset = screenshotEl.getBoundingClientRect().left - containerEl.getBoundingClientRect().left;
  }

  // If the user selected an element that they searched for, highlight that element
  if (searchedForElementBounds && isLocatorTestModalVisible) {
    const {
      location: elLocation,
      size
    } = searchedForElementBounds;
    highlighterRects.push( /*#__PURE__*/_react.default.createElement(_HighlighterRect.default, {
      elSize: size,
      elLocation: elLocation,
      scaleRatio: scaleRatio,
      xOffset: highlighterXOffset
    }));
  }

  // Don't show highlighter rects when Search Elements modal is open
  if (!isLocatorTestModalVisible && !isSiriCommandModalVisible) {
    renderElements(elements);
    if (showCentroids) {
      renderCentroids(elements);
    }
  }
  return /*#__PURE__*/_react.default.createElement("div", null, highlighterRects, highlighterCentroids);
};
var _default = HighlighterRects;
exports.default = _default;
},{"./HighlighterRect":"components/Inspector/HighlighterRect.js","./HighlighterCentroid":"components/Inspector/HighlighterCentroid.js","./shared":"components/Inspector/shared.js"}],"components/Inspector/Screenshot.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _HighlighterRects = _interopRequireDefault(require("./HighlighterRects"));
var _antd = require("antd");
var _bluebird = _interopRequireDefault(require("bluebird"));
var _Inspector = _interopRequireDefault(require("./Inspector.css"));
var _shared = require("./shared");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); } /* eslint-disable space-in-parens */ /* eslint-disable no-console */ /* eslint-disable quotes */ /* eslint-disable no-trailing-spaces */ /* eslint-disable no-unused-vars */
const {
  POINTER_UP,
  POINTER_DOWN,
  PAUSE,
  POINTER_MOVE
} = _shared.POINTER_TYPES;
const {
  TAP,
  SELECT,
  SWIPE,
  LONGPRESS,
  DRAG_AND_DROP,
  DOUBLE_TAP,
  ZOOMIN
} = _shared.SCREENSHOT_INTERACTION_MODE;
const TYPES = {
  FILLED: 'filled',
  NEW_DASHED: 'newDashed',
  WHOLE: 'whole',
  DASHED: 'dashed',
  DRAG: 'drag'
};

/**
 * Shows screenshot of running application and divs that highlight the elements' bounding boxes
 */
const Screenshot = props => {
  const {
    screenshot,
    mjpegScreenshotUrl,
    methodCallInProgress,
    screenshotInteractionMode,
    swipeStart,
    swipeEnd1,
    swipeStart1,
    swipeEnd,
    scaleRatio,
    selectedTick,
    selectedInteractionMode,
    applyClientMethod,
    t,
    hoveredElement
  } = props;
  // console.log("inside the screenshot function props!!!", props);
  const [xLongPress, setXLongPress] = (0, _react.useState)(null);
  const [yLongPress, setYLongPress] = (0, _react.useState)(null);
  (0, _react.useEffect)(() => {
    if (hoveredElement && hoveredElement.attributes && hoveredElement.attributes.bounds) {
      const coordinatesString = hoveredElement.attributes.bounds;
      const coordinatesArray = coordinatesString.match(/\d+/g); // Extract all numbers from the string
      if (coordinatesArray.length >= 4) {
        const x1 = parseInt(coordinatesArray[0], 10);
        const y1 = parseInt(coordinatesArray[1], 10);
        const x2 = parseInt(coordinatesArray[2], 10);
        const y2 = parseInt(coordinatesArray[3], 10);

        // console.log("x1:", x1);
        // console.log("y1:", y1);
        // console.log("x2:", x2);
        // console.log("y2:", y2);
        const centerX = Math.round(x2);
        const centerY = Math.round(y2);
        // setX(centerX);
        // setY(centerY);
        setXLongPress(centerX);
        setYLongPress(centerY);
      }
    }
  }, [hoveredElement]);
  if (hoveredElement) {
    console.log("hoveredElement.attributes.bounds:", hoveredElement.attributes.bounds);
  }
  const containerEl = (0, _react.useRef)();
  const [x, setX] = (0, _react.useState)();
  const [y, setY] = (0, _react.useState)();
  const [isLongPress, setIsLongPress] = (0, _react.useState)(false);
  const [coords, setCoords] = (0, _react.useState)({});
  // const [dragging, setDragging] = useState(false);
  // const [coords, setCoords] = useState(false);
  // const [state, setState] = useState({});

  // const [zoomLevel, setZoomLevel] = useState(1);
  // const svgRef = useRef(null);

  // function getInitialState() {
  //   return {
  //     x: 0,
  //     y: 0,
  //     scale: 1,
  //   };
  // };

  let [crop, setCrop] = (0, _react.useState)({
    x: 0,
    y: 0,
    scale: 1
  });
  let imageElement = containerEl.current;
  let imageRef = (0, _react.useRef)();
  // eslint-disable-next-line no-console
  // console.log('🚀 ~ file: Screenshot.js:41 ~ Screenshot ~ imageRef:', imageRef);
  // // let imageElement = imageRef.querySelector('img');
  // let image = imageRef && imageRef.getElementById('#screenshot');
  // // eslint-disable-next-line no-console
  // console.log('🚀 ~ file: Screenshot.js:45 ~ Screenshot ~ imageElement:', imageElement);
  // if (screenshotInteractionMode === ZOOMIN) {
  //   useGesture(
  //   {
  //     onDrag: ({ offset: [dx, dy] }) => {
  //       setCrop((crop) => ({ ...crop, x: dx, y: dy }));
  //     },
  //     onPinch: ({ offset: [d] }) => {
  //       setCrop((crop) => ({ ...crop, scale: 1 + d / 50 }));
  //     },
  //   },
  //   {
  //     domTarget: containerEl.current,
  //     eventOptions: { passive: false },
  //   }
  //   );
  // }

  const handleScreenshotClick = async () => {
    const {
      setSwipeStart,
      setSwipeEnd,
      tapTickCoordinates,
      setSwipeStart1,
      setSwipeEnd1
    } = props;
    const {
      POINTER_NAME,
      DURATION_1,
      DURATION_2,
      BUTTON
    } = _shared.DEFAULT_TAP;
    const {
      LONGPRESS_POINTER_NAME,
      LONGPRESS_DURATION_1,
      LONGPRESS_DURATION_2,
      LONGPRESS_BUTTON
    } = _shared.DEFAULT_LONGPRESS;
    if (screenshotInteractionMode === TAP) {
      applyClientMethod({
        methodName: TAP,
        args: [{
          [POINTER_NAME]: [{
            type: POINTER_MOVE,
            duration: DURATION_1,
            x,
            y
          }, {
            type: POINTER_DOWN,
            button: BUTTON
          }, {
            type: PAUSE,
            duration: DURATION_2
          }, {
            type: POINTER_UP,
            button: BUTTON
          }]
        }]
      });
    } else if (screenshotInteractionMode === LONGPRESS) {
      console.log("inside the condition of the longpress!!");
      console.log('xxxxxxxxxx: YYYYYYYYYYY: from the long', xLongPress, yLongPress);
      console.log('xxxxxxxxxx: YYYYYYYYYYY: after the set', x, y);
      setTimeout(() => {
        applyClientMethod({
          methodName: TAP,
          args: [{
            [LONGPRESS_POINTER_NAME]: [{
              type: POINTER_MOVE,
              duration: LONGPRESS_DURATION_1,
              x,
              y
            }, {
              type: POINTER_DOWN,
              button: LONGPRESS_BUTTON
            }, {
              type: PAUSE,
              duration: LONGPRESS_DURATION_2
            }, {
              type: POINTER_UP,
              button: LONGPRESS_BUTTON
            }]
          }]
        });
      }, LONGPRESS_DURATION_2);
    } else if (screenshotInteractionMode === DOUBLE_TAP) {
      console.log("inside the double tap function!!!");
      applyClientMethod({
        methodName: TAP,
        args: [{
          [POINTER_NAME]: [{
            type: POINTER_MOVE,
            duration: DURATION_1,
            x,
            y
          }, {
            type: POINTER_DOWN,
            button: BUTTON
          }, {
            type: PAUSE,
            duration: DURATION_2
          }, {
            type: POINTER_UP,
            button: BUTTON
          }]
        }]
      });
      const delay = 200;
      setTimeout(() => {
        applyClientMethod({
          methodName: TAP,
          args: [{
            [POINTER_NAME]: [{
              type: POINTER_MOVE,
              duration: DURATION_1,
              x,
              y
            }, {
              type: POINTER_DOWN,
              button: BUTTON
            }, {
              type: PAUSE,
              duration: DURATION_2
            }, {
              type: POINTER_UP,
              button: BUTTON
            }]
          }]
        });
      }, delay);
    } else if (screenshotInteractionMode === DRAG_AND_DROP) {
      console.log("inside the drage and drop condition value!!!!!!");
      if (!swipeStart) {
        setSwipeStart(x, y);
      } else if (!swipeEnd) {
        setSwipeEnd(x, y);
        if (isLongPress) {
          // await B.delay(500);
          // await applyClientMethod({ methodName: SWIPE, args: { /* ... */ } });
          // await handleDoDragAndDrop({ x, y });
        }
        handleDragStart({
          x,
          y
        });
      }
    } else if (selectedTick) {
      tapTickCoordinates(x, y);
    } else if (screenshotInteractionMode === SWIPE) {
      if (!swipeStart) {
        setSwipeStart(x, y);
      } else if (!swipeEnd) {
        setSwipeEnd(x, y);
        await _bluebird.default.delay(500);
        await handleDoSwipe({
          x,
          y
        });
      }
    } else if (screenshotInteractionMode === ZOOMIN) {
      if (!swipeStart) {
        setSwipeStart(x, y);
      } else if (!swipeEnd) {
        setSwipeEnd(x, y);
        await _bluebird.default.delay(500); // Wait a second to do the swipe so user can see the SVG line
        setCoords({
          x,
          y
        });
        // setTimeout(() => {
        //  handleDoZoom({x, y});
        // }, 2000);
      } else if (!swipeStart1) {
        setSwipeStart1(x, y);
      } else if (!swipeEnd1) {
        setSwipeEnd1(x, y);
        await _bluebird.default.delay(500); // Wait a second to do the swipe so user can see the SVG line
        await handleDoZoom({
          x,
          y
        }, coords); // Pass swipeEnd because otherwise it is not retrieved
      }
    }
  };

  const handleLongPress = () => {
    setIsLongPress(true);
  };
  const handleDoSwipe = async swipeEndLocal => {
    const {
      clearSwipeAction
    } = props;
    const {
      POINTER_NAME,
      DURATION_1,
      DURATION_2,
      BUTTON,
      ORIGIN
    } = _shared.DEFAULT_SWIPE;
    await applyClientMethod({
      methodName: SWIPE,
      args: {
        [POINTER_NAME]: [{
          type: POINTER_MOVE,
          duration: DURATION_1,
          x: swipeStart.x,
          y: swipeStart.y
        }, {
          type: POINTER_DOWN,
          button: BUTTON
        }, {
          type: POINTER_MOVE,
          duration: DURATION_2,
          origin: ORIGIN,
          x: swipeEndLocal.x,
          y: swipeEndLocal.y
        }, {
          type: POINTER_UP,
          button: BUTTON
        }]
      }
    });
    clearSwipeAction();
  };
  const handleDoDragAndDrop = async swipeEndLocal => {
    console.log("value of the x and y", swipeEndLocal);
    const {
      POINTER_NAME,
      DURATION_1,
      DURATION_2,
      BUTTON,
      ORIGIN
    } = _shared.DEFAULT_DRAG_AND_DROP;
    await applyClientMethod({
      methodName: TAP,
      args: {
        [POINTER_NAME]: [{
          type: POINTER_MOVE,
          duration: DURATION_1,
          origin: ORIGIN,
          x: swipeStart.x,
          y: swipeStart.y
        }, {
          type: POINTER_DOWN,
          button: BUTTON
        }, {
          type: PAUSE,
          duration: DURATION_2
        }, {
          type: POINTER_MOVE,
          duration: DURATION_2,
          origin: ORIGIN,
          x: swipeEndLocal.x,
          y: swipeEndLocal.y
        }, {
          type: POINTER_UP,
          button: BUTTON
        }]
      }
    });
  };
  const handleDoZoom = async (swipeEndLocal, swipeEndLocal1) => {
    const {
      clearSwipeAction
    } = props;
    const {
      POINTER_NAME1,
      POINTER_NAME2,
      DURATION_1,
      DURATION_2,
      BUTTON,
      ORIGIN
    } = _shared.DEFAULT_ZOOM;
    console.log(`swipeStart.x : ${swipeStart.x}, swipeStart.y : : ${swipeStart.y} , swipeEndLocal1.x : ${swipeEndLocal1.x} , swipeEndLocal1.y : ${swipeEndLocal1.y} , swipeStart1.x : ${swipeStart1.x} , swipeStart1.y : ${swipeStart1.y}, swipeEndLocal.x : ${swipeEndLocal.x} , swipeEndLocal.y : ${swipeEndLocal.y}`);
    if (swipeEndLocal && swipeEndLocal1) {
      await applyClientMethod({
        methodName: SWIPE,
        args: {
          [POINTER_NAME1]: [{
            type: POINTER_MOVE,
            duration: DURATION_1,
            x: swipeStart.x,
            y: swipeStart.y
          }, {
            type: POINTER_DOWN,
            button: BUTTON
          }, {
            type: POINTER_MOVE,
            duration: DURATION_2,
            origin: ORIGIN,
            x: swipeEndLocal1.x,
            y: swipeEndLocal1.y
          }, {
            type: POINTER_UP,
            button: BUTTON
          }],
          [POINTER_NAME2]: [{
            type: POINTER_MOVE,
            duration: DURATION_1,
            x: swipeStart1.x,
            y: swipeStart1.y
          }, {
            type: POINTER_DOWN,
            button: BUTTON
          }, {
            type: POINTER_MOVE,
            duration: DURATION_2,
            origin: ORIGIN,
            x: swipeEndLocal.x,
            y: swipeEndLocal.y
          }, {
            type: POINTER_UP,
            button: BUTTON
          }]
        }
      });
      clearSwipeAction();
    }
  };
  const handleMouseMove = e => {
    if (screenshotInteractionMode !== (SELECT || LONGPRESS)) {
      const offsetX = e.nativeEvent.offsetX;
      const offsetY = e.nativeEvent.offsetY;
      const newX = offsetX * scaleRatio;
      const newY = offsetY * scaleRatio;
      setX(Math.round(newX));
      setY(Math.round(newY));
    }
    // if (screenshotInteractionMode === ZOOMIN) {
    //   if (!dragging) {
    //     return;
    //   }
    //   e.preventDefault();
    //   //Get mouse change differential
    //   let xDiff = coords.x - e.pageX,
    //       yDiff = coords.y - e.pageY;

    //   //Update to our new coordinates
    //   coords.x = e.pageX;
    //   coords.y = e.pageY;
    //   //Adjust our x,y based upon the x/y diff from before
    //   state.x = state.x - xDiff;
    //   state.y = state.y - yDiff;

    //   //Re-render
    //   setState(state);
    // }
  };

  // function isNegative (n) {
  //   return ((n = +n) || 1 / n) < 0;
  // };

  const handleMouseOut = () => {
    setX(null);
    setY(null);
  };
  const handleDragStart = startPoint => {
    console.log('Drag start:', startPoint);
  };
  const handleDrop = event => {
    // event.preventDefault();
    const {
      offsetX,
      offsetY
    } = event.nativeEvent;
    const dropX = offsetX * scaleRatio;
    const dropY = offsetY * scaleRatio;
    const roundedDropX = Math.round(dropX);
    const roundedDropY = Math.round(dropY);
    console.log('Drop position:', {
      x: roundedDropX,
      y: roundedDropY
    });
    setX(roundedDropX);
    setY(roundedDropY);
    setTimeout(async () => {
      await handleDoDragAndDrop({
        x: roundedDropX,
        y: roundedDropY
      });
    }, 1000);
  };
  const handleDragOver = event => {
    event.preventDefault();
  };

  // function handleMouseWheel (e) {
  //   if (screenshotInteractionMode === ZOOMIN) {

  //     let ZOOM_STEP = 0.03;

  //     //require the shift key to be pressed to scroll
  //     if (!e.shiftKey) {
  //       return;
  //     }
  //     e.preventDefault();
  //     let direction = isNegative(e.deltaX) && isNegative(e.deltaY) ? 'down' : 'up';

  //     if (direction === 'up') {
  //       state.scale += ZOOM_STEP;
  //     } else {
  //       state.scale -= ZOOM_STEP;
  //     }
  //     state.scale = state.scale < 0 ? 0 : state.scale;
  //     setState(state);
  //   }
  // }

  // retrieve and format gesture for svg drawings
  const getGestureCoordinates = () => {
    const {
      showGesture
    } = props;
    const {
      FILLED,
      NEW_DASHED,
      WHOLE,
      DASHED
    } = TYPES;
    const defaultTypes = {
      pointerDown: WHOLE,
      pointerUp: DASHED
    };
    if (!showGesture) {
      return null;
    }
    return showGesture.map(pointer => {
      // 'type' is used to keep track of the last pointerup/pointerdown move
      let type = DASHED;
      const temp = [];
      for (const tick of pointer.ticks) {
        if (tick.type === PAUSE) {
          continue;
        }
        const len = temp.length;
        type = tick.type !== POINTER_MOVE ? defaultTypes[tick.type] : type;
        if (tick.type === POINTER_MOVE && tick.x !== undefined && tick.y !== undefined) {
          temp.push({
            id: tick.id,
            type,
            x: tick.x,
            y: tick.y,
            color: pointer.color
          });
        }
        if (len === 0) {
          if (tick.type === POINTER_DOWN) {
            temp.push({
              id: tick.id,
              type: FILLED,
              x: 0,
              y: 0,
              color: pointer.color
            });
          }
        } else {
          if (tick.type === POINTER_DOWN && temp[len - 1].type === DASHED) {
            temp[len - 1].type = FILLED;
          }
          if (tick.type === POINTER_UP && temp[len - 1].type === WHOLE) {
            temp[len - 1].type = NEW_DASHED;
          }
        }
      }
      return temp;
    });
  };

  // If we're tapping or swiping, show the 'crosshair' cursor style
  const screenshotStyle = {};
  if ([TAP, SWIPE].includes(screenshotInteractionMode) || selectedTick) {
    screenshotStyle.cursor = 'crosshair';
  } else if ([DRAG_AND_DROP].includes(screenshotInteractionMode) || selectedTick) {
    screenshotStyle.cursor = 'move';
  } else {
    screenshotStyle.cursor = 'pointer';
  }
  if ([ZOOMIN].includes(screenshotInteractionMode) || selectedTick) {
    screenshotStyle.cursor = 'crosshair';
  }
  let swipeInstructions = null;
  if (screenshotInteractionMode === SWIPE && (!swipeStart || !swipeEnd)) {
    if (!swipeStart) {
      swipeInstructions = t('Click swipe start point');
    } else if (!swipeEnd) {
      swipeInstructions = t('Click swipe end point');
    }
  }
  const screenSrc = mjpegScreenshotUrl || `data:image/gif;base64,${screenshot}`;
  const screenImg = /*#__PURE__*/_react.default.createElement("img", {
    src: screenSrc,
    id: "screenshot"
  });
  const points = getGestureCoordinates();

  // const screenshotStyle1 = {
  //   transform: `scale(${2})`, // Apply the zoom level to the transform style
  // };
  // Show the screenshot and highlighter rects.
  // Show loading indicator if a method call is in progress, unless using MJPEG mode.
  return /*#__PURE__*/_react.default.createElement(_antd.Spin, {
    size: "large",
    spinning: !!methodCallInProgress && !mjpegScreenshotUrl
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: _Inspector.default.innerScreenshotContainer
  }, /*#__PURE__*/_react.default.createElement("div", {
    ref: containerEl,
    style: screenshotStyle,
    onMouseDown: handleScreenshotClick,
    onMouseMove: handleMouseMove,
    onMouseOut: handleMouseOut,
    onDragOver: handleDragOver,
    onDrop: handleDrop,
    className: _Inspector.default.screenshotBox
  }, screenshotInteractionMode !== SELECT && /*#__PURE__*/_react.default.createElement("div", {
    className: _Inspector.default.coordinatesContainer
  }, /*#__PURE__*/_react.default.createElement("p", null, t('xCoordinate', {
    x
  })), /*#__PURE__*/_react.default.createElement("p", null, t('yCoordinate', {
    y
  }))), swipeInstructions && /*#__PURE__*/_react.default.createElement(_antd.Tooltip, {
    open: true,
    title: swipeInstructions,
    placement: "topLeft"
  }, screenImg), !swipeInstructions && screenImg, screenshotInteractionMode === SELECT && containerEl.current && /*#__PURE__*/_react.default.createElement(_HighlighterRects.default, _extends({}, props, {
    containerEl: containerEl.current
  })), screenshotInteractionMode === SWIPE && /*#__PURE__*/_react.default.createElement("svg", {
    className: _Inspector.default.swipeSvg
  }, swipeStart && !swipeEnd && /*#__PURE__*/_react.default.createElement("circle", {
    cx: swipeStart.x / scaleRatio,
    cy: swipeStart.y / scaleRatio
  }), swipeStart && swipeEnd && /*#__PURE__*/_react.default.createElement("line", {
    x1: swipeStart.x / scaleRatio,
    y1: swipeStart.y / scaleRatio,
    x2: swipeEnd.x / scaleRatio,
    y2: swipeEnd.y / scaleRatio
  })), screenshotInteractionMode === ZOOMIN && /*#__PURE__*/_react.default.createElement("svg", {
    className: _Inspector.default.swipeSvg
  }, swipeStart && !swipeEnd && /*#__PURE__*/_react.default.createElement("circle", {
    cx: swipeStart.x / scaleRatio,
    cy: swipeStart.y / scaleRatio
  }), swipeStart && swipeEnd && /*#__PURE__*/_react.default.createElement("line", {
    x1: swipeStart.x / scaleRatio,
    y1: swipeStart.y / scaleRatio,
    x2: swipeEnd.x / scaleRatio,
    y2: swipeEnd.y / scaleRatio
  }), swipeStart1 && !swipeEnd1 && /*#__PURE__*/_react.default.createElement("circle", {
    cx: swipeStart1.x / scaleRatio,
    cy: swipeStart1.y / scaleRatio
  }), swipeStart1 && swipeEnd1 && /*#__PURE__*/_react.default.createElement("line", {
    x1: swipeStart1.x / scaleRatio,
    y1: swipeStart1.y / scaleRatio,
    x2: swipeEnd1.x / scaleRatio,
    y2: swipeEnd1.y / scaleRatio
  })), screenshotInteractionMode === TAP && /*#__PURE__*/_react.default.createElement("div", {
    className: _Inspector.default.tapDiv
  }), selectedInteractionMode === _shared.INTERACTION_MODE.GESTURES && points && /*#__PURE__*/_react.default.createElement("svg", {
    key: "gestureSVG",
    className: _Inspector.default.gestureSvg
  }, points.map(pointer => pointer.map((tick, index) => /*#__PURE__*/_react.default.createElement(_react.default.Fragment, {
    key: tick.id
  }, index > 0 && /*#__PURE__*/_react.default.createElement("line", {
    className: _Inspector.default[tick.type],
    key: `${tick.id}.line`,
    x1: pointer[index - 1].x / scaleRatio,
    y1: pointer[index - 1].y / scaleRatio,
    x2: tick.x / scaleRatio,
    y2: tick.y / scaleRatio,
    style: {
      stroke: tick.color
    }
  }), /*#__PURE__*/_react.default.createElement("circle", {
    className: _Inspector.default[`circle-${tick.type}`],
    key: `${tick.id}.circle`,
    cx: tick.x / scaleRatio,
    cy: tick.y / scaleRatio,
    style: tick.type === TYPES.FILLED ? {
      fill: tick.color
    } : {
      stroke: tick.color
    }
  }))))))));
};
var _default = Screenshot;
exports.default = _default;
},{"./HighlighterRects":"components/Inspector/HighlighterRects.js","./Inspector.css":"components/Inspector/Inspector.css","./shared":"components/Inspector/shared.js"}],"components/Inspector/HeaderButtons.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _antd = require("antd");
var _Inspector = _interopRequireDefault(require("./Inspector.css"));
var _hi = require("react-icons/hi");
var _bi = require("react-icons/bi");
var _io = require("react-icons/io5");
var _shared = require("./shared");
var _AntdTypes = require("../AntdTypes");
var _icons = require("@ant-design/icons");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const HeaderButtons = props => {
  const {
    selectAppMode,
    appMode,
    mjpegScreenshotUrl,
    isSourceRefreshOn,
    toggleRefreshingState,
    isRecording,
    startRecording,
    pauseRecording,
    showLocatorTestModal,
    showSiriCommandModal,
    applyClientMethod,
    quitSession,
    driver,
    t
  } = props;
  const deviceControls = /*#__PURE__*/_react.default.createElement(_antd.Button.Group, null, driver && driver.client.isIOS && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_antd.Tooltip, {
    title: t('Press Home Button')
  }, /*#__PURE__*/_react.default.createElement(_antd.Button, {
    id: "btnPressHomeButton",
    icon: /*#__PURE__*/_react.default.createElement(_hi.HiOutlineHome, {
      className: _Inspector.default['custom-button-icon']
    }),
    onClick: () => applyClientMethod({
      methodName: 'executeScript',
      args: ['mobile:pressButton', [{
        name: 'home'
      }]]
    })
  })), /*#__PURE__*/_react.default.createElement(_antd.Tooltip, {
    title: t('Execute Siri Command')
  }, /*#__PURE__*/_react.default.createElement(_antd.Button, {
    id: "siriCommand",
    icon: /*#__PURE__*/_react.default.createElement(_hi.HiOutlineMicrophone, {
      className: _Inspector.default['custom-button-icon']
    }),
    onClick: showSiriCommandModal
  }))), driver && driver.client.isAndroid && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_antd.Tooltip, {
    title: t('Press Back Button')
  }, /*#__PURE__*/_react.default.createElement(_antd.Button, {
    id: "btnPressHomeButton",
    icon: /*#__PURE__*/_react.default.createElement(_io.IoChevronBackOutline, {
      className: _Inspector.default['custom-button-icon']
    }),
    onClick: () => applyClientMethod({
      methodName: 'pressKeyCode',
      args: [4]
    })
  })), /*#__PURE__*/_react.default.createElement(_antd.Tooltip, {
    title: t('Press Home Button')
  }, /*#__PURE__*/_react.default.createElement(_antd.Button, {
    id: "btnPressHomeButton",
    icon: /*#__PURE__*/_react.default.createElement(_bi.BiCircle, {
      className: _Inspector.default['custom-button-icon']
    }),
    onClick: () => applyClientMethod({
      methodName: 'pressKeyCode',
      args: [3]
    })
  })), /*#__PURE__*/_react.default.createElement(_antd.Tooltip, {
    title: t('Press App Switch Button')
  }, /*#__PURE__*/_react.default.createElement(_antd.Button, {
    id: "btnPressHomeButton",
    icon: /*#__PURE__*/_react.default.createElement(_bi.BiSquare, {
      className: _Inspector.default['custom-button-icon']
    }),
    onClick: () => applyClientMethod({
      methodName: 'pressKeyCode',
      args: [187]
    })
  }))));
  const appModeControls = /*#__PURE__*/_react.default.createElement(_antd.Button.Group, {
    value: appMode
  }, /*#__PURE__*/_react.default.createElement(_antd.Tooltip, {
    title: t('Native App Mode')
  }, /*#__PURE__*/_react.default.createElement(_antd.Button, {
    icon: /*#__PURE__*/_react.default.createElement(_icons.AppstoreOutlined, null),
    onClick: () => {
      selectAppMode(_shared.APP_MODE.NATIVE);
    },
    type: appMode === _shared.APP_MODE.NATIVE ? _AntdTypes.BUTTON.PRIMARY : _AntdTypes.BUTTON.DEFAULT
  })), /*#__PURE__*/_react.default.createElement(_antd.Tooltip, {
    title: t('Web/Hybrid App Mode')
  }, /*#__PURE__*/_react.default.createElement(_antd.Button, {
    icon: /*#__PURE__*/_react.default.createElement(_icons.GlobalOutlined, null),
    onClick: () => {
      selectAppMode(_shared.APP_MODE.WEB_HYBRID);
    },
    type: appMode === _shared.APP_MODE.WEB_HYBRID ? _AntdTypes.BUTTON.PRIMARY : _AntdTypes.BUTTON.DEFAULT
  })));
  const generalControls = /*#__PURE__*/_react.default.createElement(_antd.Button.Group, null, mjpegScreenshotUrl && !isSourceRefreshOn && /*#__PURE__*/_react.default.createElement(_antd.Tooltip, {
    title: t('Start Refreshing Source')
  }, /*#__PURE__*/_react.default.createElement(_antd.Button, {
    id: "btnStartRefreshing",
    icon: /*#__PURE__*/_react.default.createElement(_icons.PlayCircleOutlined, null),
    onClick: toggleRefreshingState
  })), mjpegScreenshotUrl && isSourceRefreshOn && /*#__PURE__*/_react.default.createElement(_antd.Tooltip, {
    title: t('Pause Refreshing Source')
  }, /*#__PURE__*/_react.default.createElement(_antd.Button, {
    id: "btnPauseRefreshing",
    icon: /*#__PURE__*/_react.default.createElement(_icons.PauseCircleOutlined, null),
    onClick: toggleRefreshingState
  })), /*#__PURE__*/_react.default.createElement(_antd.Tooltip, {
    title: t('refreshSource')
  }, /*#__PURE__*/_react.default.createElement(_antd.Button, {
    id: "btnReload",
    icon: /*#__PURE__*/_react.default.createElement(_icons.ReloadOutlined, null),
    onClick: () => applyClientMethod({
      methodName: 'getPageSource'
    })
  })), /*#__PURE__*/_react.default.createElement(_antd.Tooltip, {
    title: t('Search for element')
  }, /*#__PURE__*/_react.default.createElement(_antd.Button, {
    id: "searchForElement",
    icon: /*#__PURE__*/_react.default.createElement(_icons.SearchOutlined, null),
    onClick: showLocatorTestModal
  })), !isRecording && /*#__PURE__*/_react.default.createElement(_antd.Tooltip, {
    title: t('Start Recording')
  }, /*#__PURE__*/_react.default.createElement(_antd.Button, {
    id: "btnStartRecording",
    icon: /*#__PURE__*/_react.default.createElement(_icons.EyeOutlined, null),
    onClick: startRecording
  })), isRecording && /*#__PURE__*/_react.default.createElement(_antd.Tooltip, {
    title: t('Pause Recording')
  }, /*#__PURE__*/_react.default.createElement(_antd.Button, {
    id: "btnPause",
    icon: /*#__PURE__*/_react.default.createElement(_icons.PauseOutlined, null),
    type: _AntdTypes.BUTTON.DANGER,
    onClick: pauseRecording
  })));
  const quitSessionButton = /*#__PURE__*/_react.default.createElement(_antd.Tooltip, {
    title: t('quitSessionAndClose')
  }, /*#__PURE__*/_react.default.createElement(_antd.Button, {
    id: "btnClose",
    icon: /*#__PURE__*/_react.default.createElement(_icons.CloseOutlined, null),
    onClick: () => quitSession()
  }));
  return /*#__PURE__*/_react.default.createElement("div", {
    className: _Inspector.default['inspector-toolbar']
  }, /*#__PURE__*/_react.default.createElement(_antd.Space, {
    size: "middle"
  }, deviceControls, appModeControls, generalControls, quitSessionButton));
};
var _default = HeaderButtons;
exports.default = _default;
},{"./Inspector.css":"components/Inspector/Inspector.css","./shared":"components/Inspector/shared.js","../AntdTypes":"components/AntdTypes.js"}],"components/Inspector/SelectedElement.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _lodash = _interopRequireDefault(require("lodash"));
var _shared = require("./shared");
var _Inspector = _interopRequireDefault(require("./Inspector.css"));
var _antd = require("antd");
var _polyfills = require("../../polyfills");
var _icons = require("@ant-design/icons");
var _AntdTypes = require("../AntdTypes");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/* eslint-disable no-console */
/* eslint-disable quotes */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-unused-vars */

const NATIVE_APP = 'NATIVE_APP';
const CLASS_CHAIN_DOCS_URL = 'https://github.com/facebookarchive/WebDriverAgent/wiki/Class-Chain-Queries-Construction-Rules';
const PREDICATE_DOCS_URL = 'https://github.com/facebookarchive/WebDriverAgent/wiki/Predicate-Queries-Construction-Rules';
const selectedElementTableCell = (text, copyToClipBoard) => {
  if (copyToClipBoard) {
    return /*#__PURE__*/_react.default.createElement("div", {
      className: _Inspector.default['selected-element-table-cells']
    }, /*#__PURE__*/_react.default.createElement(_antd.Tooltip, {
      title: "Copied!",
      trigger: "click"
    }, /*#__PURE__*/_react.default.createElement("span", {
      className: _Inspector.default['element-cell-copy'],
      onClick: () => _polyfills.clipboard.writeText(text)
    }, text)));
  } else {
    return /*#__PURE__*/_react.default.createElement("div", {
      className: _Inspector.default['selected-element-table-cells']
    }, text);
  }
};

/**
 * Shows details of the currently selected element and shows methods that can
 * be called on the elements (tap, sendKeys)
 */
const SelectedElement = props => {
  console.log('props inside the selected Element!!', props);
  console.log('props.hoveredElement$$$$$$$4!!', props.hoveredElement);
  const {
    applyClientMethod,
    contexts,
    currentContext,
    getFindElementsTimes,
    findElementsExecutionTimes,
    isFindingElementsTimes,
    selectedElement,
    selectedElementId,
    sourceXML,
    elementInteractionsNotAvailable,
    selectedElementSearchInProgress,
    t
  } = props;
  console.log('selectedElementId inside the selected Element!!', selectedElementId);
  const sendKeys = (0, _react.useRef)();
  const contextSelect = () => {
    const {
      setContext
    } = props;
    return /*#__PURE__*/_react.default.createElement(_antd.Tooltip, {
      title: t('contextSwitcher')
    }, /*#__PURE__*/_react.default.createElement(_antd.Select, {
      value: currentContext,
      onChange: value => {
        setContext(value);
        applyClientMethod({
          methodName: 'switchContext',
          args: [value]
        });
      },
      className: _Inspector.default['context-selector']
    }, contexts.map(({
      id,
      title
    }) => /*#__PURE__*/_react.default.createElement(_antd.Select.Option, {
      key: id,
      value: id
    }, title ? `${title} (${id})` : id))));
  };
  const {
    attributes,
    classChain,
    predicateString,
    xpath
  } = selectedElement;
  const isDisabled = selectedElementSearchInProgress || isFindingElementsTimes;

  // Get the columns for the attributes table
  let attributeColumns = [{
    title: t('Attribute'),
    dataIndex: 'name',
    key: 'name',
    width: 100,
    render: text => selectedElementTableCell(text, false)
  }, {
    title: t('Value'),
    dataIndex: 'value',
    key: 'value',
    render: text => selectedElementTableCell(text, true)
  }];

  // Get the data for the attributes table
  let attrArray = _lodash.default.toPairs(attributes).filter(([key]) => key !== 'path');
  let dataSource = attrArray.map(([key, value]) => ({
    key,
    value,
    name: key
  }));
  dataSource.unshift({
    key: 'elementId',
    value: selectedElementId,
    name: 'elementId'
  });
  // console.log('dataSource in the dataSource', dataSource);

  // Get the columns for the strategies table
  let findColumns = [{
    title: t('Find By'),
    dataIndex: 'find',
    key: 'find',
    width: 100,
    render: text => selectedElementTableCell(text, false)
  }, {
    title: t('Selector'),
    dataIndex: 'selector',
    key: 'selector',
    render: text => selectedElementTableCell(text, true)
  }];
  if (findElementsExecutionTimes.length > 0) {
    findColumns.push({
      title: t('Time'),
      dataIndex: 'time',
      key: 'time',
      align: 'right',
      width: 100,
      render: text => selectedElementTableCell(text, false)
    });
  }

  // Get the data for the strategies table
  let findDataSource = _lodash.default.toPairs((0, _shared.getLocators)(attributes, sourceXML)).map(([key, selector]) => ({
    key,
    selector,
    find: key
  }));

  // If XPath is the only provided data source, warn the user about it's brittleness
  let showXpathWarning = false;
  if (findDataSource.length === 0) {
    showXpathWarning = true;
  }

  // Add class chain to the data source as well
  if (classChain && currentContext === NATIVE_APP) {
    const classChainText = /*#__PURE__*/_react.default.createElement("span", null, "-ios class chain", /*#__PURE__*/_react.default.createElement("strong", null, /*#__PURE__*/_react.default.createElement("a", {
      onClick: e => e.preventDefault() || _polyfills.shell.openExternal(CLASS_CHAIN_DOCS_URL)
    }, "\xA0(docs)")));
    findDataSource.push({
      key: '-ios class chain',
      find: classChainText,
      selector: classChain
    });
  }

  // Add predicate string to the data source as well
  if (predicateString && currentContext === NATIVE_APP) {
    const predicateStringText = /*#__PURE__*/_react.default.createElement("span", null, "-ios predicate string", /*#__PURE__*/_react.default.createElement("strong", null, /*#__PURE__*/_react.default.createElement("a", {
      onClick: e => e.preventDefault() || _polyfills.shell.openExternal(PREDICATE_DOCS_URL)
    }, "\xA0(docs)")));
    findDataSource.push({
      key: '-ios predicate string',
      find: predicateStringText,
      selector: predicateString
    });
  }

  // Add XPath to the data source as well
  if (xpath) {
    findDataSource.push({
      key: 'xpath',
      find: 'xpath',
      selector: xpath
    });
    // console.log('findDataSource in the Xpath condition####', findDataSource);
    //add the datasource to the findDataSource
    let sendData = findDataSource.concat(dataSource);
    console.log("🚀 ~ file: SelectedElement.js:169 ~ SelectedElement ~ sendData:", sendData);
  }

  // Replace table data with table data that has the times
  if (findElementsExecutionTimes.length > 0) {
    findDataSource = findElementsExecutionTimes;
  }
  let tapIcon = /*#__PURE__*/_react.default.createElement(_icons.AimOutlined, null);
  if (!(elementInteractionsNotAvailable || selectedElementId) || selectedElementSearchInProgress) {
    tapIcon = /*#__PURE__*/_react.default.createElement(_icons.LoadingOutlined, null);
  }
  return /*#__PURE__*/_react.default.createElement("div", null, elementInteractionsNotAvailable && /*#__PURE__*/_react.default.createElement(_antd.Row, {
    type: _AntdTypes.ROW.FLEX,
    gutter: 10,
    className: _Inspector.default.selectedElemNotInteractableAlertRow
  }, /*#__PURE__*/_react.default.createElement(_antd.Col, null, /*#__PURE__*/_react.default.createElement(_antd.Alert, {
    type: _AntdTypes.ALERT.INFO,
    message: t('interactionsNotAvailable'),
    showIcon: true
  }))), /*#__PURE__*/_react.default.createElement(_antd.Row, {
    justify: "center",
    type: _AntdTypes.ROW.FLEX,
    align: "middle",
    className: _Inspector.default.elementActions
  }, /*#__PURE__*/_react.default.createElement(_antd.Tooltip, {
    title: t('Tap')
  }, /*#__PURE__*/_react.default.createElement(_antd.Button, {
    disabled: isDisabled,
    icon: tapIcon,
    id: "btnTapElement",
    onClick: () => applyClientMethod({
      methodName: 'click',
      elementId: selectedElementId
    })
  })), /*#__PURE__*/_react.default.createElement(_antd.Button.Group, {
    className: _Inspector.default.elementKeyInputActions
  }, /*#__PURE__*/_react.default.createElement(_antd.Input, {
    className: _Inspector.default.elementKeyInput,
    disabled: isDisabled,
    placeholder: t('Enter Keys to Send'),
    allowClear: true,
    onChange: e => sendKeys.current = e.target.value
  }), /*#__PURE__*/_react.default.createElement(_antd.Tooltip, {
    title: t('Send Keys')
  }, /*#__PURE__*/_react.default.createElement(_antd.Button, {
    disabled: isDisabled,
    id: "btnSendKeysToElement",
    icon: /*#__PURE__*/_react.default.createElement(_icons.SendOutlined, null),
    onClick: () => applyClientMethod({
      methodName: 'sendKeys',
      elementId: selectedElementId,
      args: [sendKeys.current || '']
    })
  })), /*#__PURE__*/_react.default.createElement(_antd.Tooltip, {
    title: t('Clear')
  }, /*#__PURE__*/_react.default.createElement(_antd.Button, {
    disabled: isDisabled,
    id: "btnClearElement",
    icon: /*#__PURE__*/_react.default.createElement(_icons.ClearOutlined, null),
    onClick: () => applyClientMethod({
      methodName: 'clear',
      elementId: selectedElementId
    })
  }))), /*#__PURE__*/_react.default.createElement(_antd.Button.Group, null, /*#__PURE__*/_react.default.createElement(_antd.Tooltip, {
    title: t('Copy Attributes to Clipboard')
  }, /*#__PURE__*/_react.default.createElement(_antd.Button, {
    disabled: isDisabled,
    id: "btnCopyAttributes",
    icon: /*#__PURE__*/_react.default.createElement(_icons.CopyOutlined, null),
    onClick: () => _polyfills.clipboard.writeText(JSON.stringify(dataSource))
  })), /*#__PURE__*/_react.default.createElement(_antd.Tooltip, {
    title: t('Get Timing')
  }, /*#__PURE__*/_react.default.createElement(_antd.Button, {
    disabled: isDisabled,
    id: "btnGetTiming",
    icon: /*#__PURE__*/_react.default.createElement(_icons.HourglassOutlined, null),
    onClick: () => getFindElementsTimes(findDataSource)
  })))), findDataSource.length > 0 && /*#__PURE__*/_react.default.createElement(_antd.Row, null, /*#__PURE__*/_react.default.createElement(_antd.Spin, {
    spinning: isFindingElementsTimes
  }, /*#__PURE__*/_react.default.createElement(_antd.Table, {
    columns: findColumns,
    dataSource: findDataSource,
    size: "small",
    tableLayout: "fixed",
    pagination: false
  }))), /*#__PURE__*/_react.default.createElement("br", null), currentContext === NATIVE_APP && showXpathWarning && /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_antd.Alert, {
    message: t('usingXPathNotRecommended'),
    type: _AntdTypes.ALERT.WARNING,
    showIcon: true
  }), /*#__PURE__*/_react.default.createElement("br", null)), currentContext === NATIVE_APP && contexts && contexts.length > 1 && /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_antd.Alert, {
    message: t('usingSwitchContextRecommended'),
    type: _AntdTypes.ALERT.WARNING,
    showIcon: true
  }), /*#__PURE__*/_react.default.createElement("br", null)), currentContext !== NATIVE_APP && /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_antd.Alert, {
    message: t('usingWebviewContext'),
    type: _AntdTypes.ALERT.WARNING,
    showIcon: true
  }), /*#__PURE__*/_react.default.createElement("br", null)), contexts && contexts.length > 1 && /*#__PURE__*/_react.default.createElement("div", null, contextSelect(), /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement("br", null)), dataSource.length > 0 && /*#__PURE__*/_react.default.createElement(_antd.Row, null, /*#__PURE__*/_react.default.createElement(_antd.Table, {
    columns: attributeColumns,
    dataSource: dataSource,
    size: "small",
    pagination: false
  })));
};
var _default = SelectedElement;
exports.default = _default;
},{"./shared":"components/Inspector/shared.js","./Inspector.css":"components/Inspector/Inspector.css","../../polyfills":"polyfills/index.js","../AntdTypes":"components/AntdTypes.js"}],"components/Inspector/LocatedElements.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _antd = require("antd");
var _icons = require("@ant-design/icons");
var _AntdTypes = require("../AntdTypes");
var _Inspector = _interopRequireDefault(require("./Inspector.css"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const LocatedElements = props => {
  const {
    locatedElements,
    locatedElementsExecutionTime,
    applyClientMethod,
    setLocatorTestElement,
    locatorTestElement,
    isFindingLocatedElementInSource,
    searchedForElementBounds,
    selectLocatedElement,
    source,
    driver,
    t
  } = props;
  const sendKeys = (0, _react.useRef)(null);
  const showIdAutocompleteInfo = () => {
    const {
      locatorTestStrategy,
      locatorTestValue
    } = props;
    const automationName = driver.client.capabilities.automationName;
    const idLocatorAutocompletionDisabled = driver.client.capabilities.disableIdLocatorAutocompletion;
    if (automationName && automationName.toLowerCase() === 'uiautomator2' && locatorTestStrategy === 'id' && !locatorTestValue.includes(':id/') && !idLocatorAutocompletionDisabled) {
      return /*#__PURE__*/_react.default.createElement(_antd.Row, null, /*#__PURE__*/_react.default.createElement(_antd.Alert, {
        message: t('idAutocompletionCanBeDisabled'),
        type: _AntdTypes.ALERT.INFO,
        showIcon: true
      }));
    }
  };
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, locatedElements.length === 0 && /*#__PURE__*/_react.default.createElement(_antd.Space, {
    className: _Inspector.default.spaceContainer,
    direction: "vertical",
    size: "small"
  }, /*#__PURE__*/_react.default.createElement(_antd.Row, null, /*#__PURE__*/_react.default.createElement("i", null, t('couldNotFindAnyElements'))), showIdAutocompleteInfo()), locatedElements.length > 0 && /*#__PURE__*/_react.default.createElement(_antd.Spin, {
    spinning: isFindingLocatedElementInSource
  }, /*#__PURE__*/_react.default.createElement(_antd.Space, {
    className: _Inspector.default.spaceContainer,
    direction: "vertical",
    size: "small"
  }, /*#__PURE__*/_react.default.createElement(_antd.Row, {
    justify: "space-between"
  }, /*#__PURE__*/_react.default.createElement("span", null, t('elementsCount'), " ", /*#__PURE__*/_react.default.createElement(_antd.Badge, {
    count: locatedElements.length,
    offset: [0, -2]
  })), /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, t('Time'), ": ", locatedElementsExecutionTime)), /*#__PURE__*/_react.default.createElement(_antd.Row, null, /*#__PURE__*/_react.default.createElement(_antd.List, {
    className: _Inspector.default.searchResultsList,
    size: "small",
    dataSource: locatedElements,
    renderItem: elementId => /*#__PURE__*/_react.default.createElement(_antd.List.Item, _extends({
      type: "text"
    }, locatorTestElement === elementId ? {
      className: _Inspector.default.searchResultsSelectedItem
    } : {}, locatorTestElement !== elementId ? {
      onClick: () => {
        setLocatorTestElement(elementId);
      }
    } : {}), elementId)
  })), /*#__PURE__*/_react.default.createElement(_antd.Row, {
    justify: "center"
  }, /*#__PURE__*/_react.default.createElement(_antd.Space, {
    direction: "horizontal",
    size: "small"
  }, /*#__PURE__*/_react.default.createElement(_antd.Tooltip, {
    title: t('Find and Select in Source'),
    placement: "bottom"
  }, /*#__PURE__*/_react.default.createElement(_antd.Button, {
    disabled: !locatorTestElement,
    icon: /*#__PURE__*/_react.default.createElement(_icons.MenuUnfoldOutlined, null),
    onClick: () => selectLocatedElement(source, searchedForElementBounds, locatorTestElement)
  })), /*#__PURE__*/_react.default.createElement(_antd.Tooltip, {
    title: t('Tap'),
    placement: "bottom"
  }, /*#__PURE__*/_react.default.createElement(_antd.Button, {
    disabled: !locatorTestElement,
    icon: /*#__PURE__*/_react.default.createElement(_icons.AimOutlined, null),
    onClick: () => applyClientMethod({
      methodName: 'click',
      elementId: locatorTestElement
    })
  })), /*#__PURE__*/_react.default.createElement(_antd.Button.Group, {
    className: _Inspector.default.searchResultsActions
  }, /*#__PURE__*/_react.default.createElement(_antd.Input, {
    className: _Inspector.default.searchResultsKeyInput,
    disabled: !locatorTestElement,
    placeholder: t('Enter Keys to Send'),
    allowClear: true,
    onChange: e => sendKeys.current = e.target.value
  }), /*#__PURE__*/_react.default.createElement(_antd.Tooltip, {
    title: t('Send Keys'),
    placement: "bottom"
  }, /*#__PURE__*/_react.default.createElement(_antd.Button, {
    disabled: !locatorTestElement,
    icon: /*#__PURE__*/_react.default.createElement(_icons.SendOutlined, null),
    onClick: () => applyClientMethod({
      methodName: 'sendKeys',
      elementId: locatorTestElement,
      args: [sendKeys.current || '']
    })
  })), /*#__PURE__*/_react.default.createElement(_antd.Tooltip, {
    title: t('Clear'),
    placement: "bottom"
  }, /*#__PURE__*/_react.default.createElement(_antd.Button, {
    disabled: !locatorTestElement,
    id: "btnClearElement",
    icon: /*#__PURE__*/_react.default.createElement(_icons.ClearOutlined, null),
    onClick: () => applyClientMethod({
      methodName: 'clear',
      elementId: locatorTestElement
    })
  }))))))));
};
var _default = LocatedElements;
exports.default = _default;
},{"../AntdTypes":"components/AntdTypes.js","./Inspector.css":"components/Inspector/Inspector.css"}],"components/Inspector/ElementLocator.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _antd = require("antd");
var _AntdTypes = require("../AntdTypes");
var _Inspector = _interopRequireDefault(require("./Inspector.css"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const STRAT_ID = ['id', 'Id'];
const STRAT_XPATH = ['xpath', 'XPath'];
const STRAT_NAME = ['name', 'Name'];
const STRAT_CLASS_NAME = ['class name', 'Class Name'];
const STRAT_ACCESSIBILITY_ID = ['accessibility id', 'Accessibility ID'];
const STRAT_PREDICATE = ['-ios predicate string', 'Predicate String'];
const STRAT_CLASS_CHAIN = ['-ios class chain', 'Class Chain'];
const STRAT_UIAUTOMATOR = ['-android uiautomator', 'UIAutomator'];
const STRAT_DATAMATCHER = ['-android datamatcher', 'DataMatcher'];
const STRAT_VIEWTAG = ['-android viewtag', 'View Tag'];
const locatorStrategies = driver => {
  const automationName = driver.client.capabilities.automationName;
  let strategies = [STRAT_ID, STRAT_XPATH, STRAT_NAME, STRAT_CLASS_NAME, STRAT_ACCESSIBILITY_ID];
  if (!automationName) {
    return strategies;
  }
  switch (automationName.toLowerCase()) {
    case 'xcuitest':
    case 'mac2':
      strategies.push(STRAT_PREDICATE, STRAT_CLASS_CHAIN);
      break;
    case 'espresso':
      strategies.push(STRAT_DATAMATCHER, STRAT_VIEWTAG);
      break;
    case 'uiautomator2':
      strategies.push(STRAT_UIAUTOMATOR);
      break;
  }
  return strategies;
};
const showMissingAutomationNameInfo = (driver, t) => {
  if (!driver.client.capabilities.automationName) {
    return /*#__PURE__*/_react.default.createElement(_antd.Alert, {
      message: t('missingAutomationNameForStrategies'),
      type: _AntdTypes.ALERT.INFO,
      showIcon: true
    });
  }
};
const ElementLocator = props => {
  const {
    setLocatorTestValue,
    locatorTestValue,
    setLocatorTestStrategy,
    locatorTestStrategy,
    driver,
    t
  } = props;
  return /*#__PURE__*/_react.default.createElement(_antd.Space, {
    className: _Inspector.default.spaceContainer,
    direction: "vertical",
    size: "small"
  }, t('locatorStrategy'), /*#__PURE__*/_react.default.createElement(_antd.Row, {
    justify: "center"
  }, /*#__PURE__*/_react.default.createElement(_antd.Radio.Group, {
    buttonStyle: "solid",
    onChange: e => setLocatorTestStrategy(e.target.value),
    defaultValue: locatorTestStrategy
  }, /*#__PURE__*/_react.default.createElement(_antd.Row, {
    justify: "center"
  }, locatorStrategies(driver).map(([strategyValue, strategyName]) => /*#__PURE__*/_react.default.createElement(_antd.Radio.Button, {
    className: _Inspector.default.locatorStrategyBtn,
    value: strategyValue,
    key: strategyValue
  }, strategyName))))), showMissingAutomationNameInfo(driver, t), t('selector'), /*#__PURE__*/_react.default.createElement(_antd.Input.TextArea, {
    className: _Inspector.default.locatorSelectorTextArea,
    onChange: e => setLocatorTestValue(e.target.value),
    value: locatorTestValue,
    allowClear: true,
    rows: 3
  }));
};
var _default = ElementLocator;
exports.default = _default;
},{"../AntdTypes":"components/AntdTypes.js","./Inspector.css":"components/Inspector/Inspector.css"}],"components/Inspector/LocatorTestModal.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _antd = require("antd");
var _LocatedElements = _interopRequireDefault(require("./LocatedElements"));
var _ElementLocator = _interopRequireDefault(require("./ElementLocator"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const LocatorTestModal = props => {
  const {
    isLocatorTestModalVisible,
    isSearchingForElements,
    clearSearchResults,
    locatedElements,
    t
  } = props;
  const onCancel = () => {
    const {
      hideLocatorTestModal
    } = props;
    hideLocatorTestModal();
    clearSearchResults();
  };
  const onSubmit = () => {
    const {
      locatorTestStrategy,
      locatorTestValue,
      searchForElement
    } = props;
    if (locatedElements) {
      onCancel();
    } else {
      searchForElement(locatorTestStrategy, locatorTestValue);
    }
  };

  // Footer displays all the buttons at the bottom of the Modal
  return /*#__PURE__*/_react.default.createElement(_antd.Modal, {
    open: isLocatorTestModalVisible,
    title: t('Search for element'),
    onCancel: onCancel,
    footer: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, locatedElements && /*#__PURE__*/_react.default.createElement(_antd.Button, {
      onClick: e => e.preventDefault() || clearSearchResults()
    }, t('Back')), /*#__PURE__*/_react.default.createElement(_antd.Button, {
      loading: isSearchingForElements,
      onClick: onSubmit,
      type: "primary"
    }, locatedElements ? t('Done') : t('Search')))
  }, !locatedElements && /*#__PURE__*/_react.default.createElement(_ElementLocator.default, props), locatedElements && /*#__PURE__*/_react.default.createElement(_LocatedElements.default, props));
};
var _default = LocatorTestModal;
exports.default = _default;
},{"./LocatedElements":"components/Inspector/LocatedElements.js","./ElementLocator":"components/Inspector/ElementLocator.js"}],"components/Inspector/SiriCommandModal.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _antd = require("antd");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const SiriCommandModal = props => {
  const {
    siriCommandValue,
    setSiriCommandValue,
    isSiriCommandModalVisible,
    t
  } = props;
  const onSubmit = () => {
    const {
      applyClientMethod
    } = props;
    applyClientMethod({
      methodName: 'executeScript',
      args: ['mobile:siriCommand', [{
        text: siriCommandValue
      }]]
    });
    onCancel();
  };
  const onCancel = () => {
    const {
      hideSiriCommandModal
    } = props;
    hideSiriCommandModal();
  };

  // Footer displays all the buttons at the bottom of the Modal
  return /*#__PURE__*/_react.default.createElement(_antd.Modal, {
    open: isSiriCommandModalVisible,
    title: t('Execute Siri Command'),
    onCancel: onCancel,
    footer: /*#__PURE__*/_react.default.createElement(_antd.Button, {
      onClick: onSubmit,
      type: "primary"
    }, t('Execute Command'))
  }, /*#__PURE__*/_react.default.createElement(_antd.Row, null, t('Command'), /*#__PURE__*/_react.default.createElement(_antd.Input.TextArea, {
    onChange: e => setSiriCommandValue(e.target.value),
    value: siriCommandValue
  })));
};
var _default = SiriCommandModal;
exports.default = _default;
},{}],"components/Inspector/Source.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _antd = require("antd");
var _LocatorTestModal = _interopRequireDefault(require("./LocatorTestModal"));
var _Inspector = _interopRequireDefault(require("./Inspector.css"));
var _SiriCommandModal = _interopRequireDefault(require("./SiriCommandModal"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const IMPORTANT_ATTRS = ['name', 'content-desc', 'resource-id', 'AXDescription', 'AXIdentifier'];

/**
 * Shows the 'source' of the app as a Tree
 */
const Source = props => {
  const {
    source,
    sourceError,
    setExpandedPaths,
    expandedPaths,
    selectedElement = {},
    showSourceAttrs,
    methodCallInProgress,
    mjpegScreenshotUrl,
    isSourceRefreshOn,
    t
  } = props;
  const getFormattedTag = (el, showAllAttrs) => {
    const {
      tagName,
      attributes
    } = el;
    let attrs = [];
    for (let attr of Object.keys(attributes)) {
      if (IMPORTANT_ATTRS.includes(attr) || showAllAttrs) {
        attrs.push( /*#__PURE__*/_react.default.createElement("span", {
          key: attr
        }, "\xA0", /*#__PURE__*/_react.default.createElement("i", {
          className: _Inspector.default.sourceAttrName
        }, attr), "=", /*#__PURE__*/_react.default.createElement("span", {
          className: _Inspector.default.sourceAttrValue
        }, "\"", attributes[attr], "\"")));
      }
    }
    return /*#__PURE__*/_react.default.createElement("span", null, "<", /*#__PURE__*/_react.default.createElement("b", {
      className: _Inspector.default.sourceTag
    }, tagName), attrs, ">");
  };

  /**
   * Binds to antd Tree onSelect. If an item is being unselected, path is undefined
   * otherwise 'path' refers to the element's path.
   */
  const handleSelectElement = path => {
    const {
      selectElement,
      unselectElement
    } = props;
    if (!path) {
      unselectElement();
    } else {
      selectElement(path);
    }
  };

  // Recursives through the source and renders a TreeNode for an element
  const recursive = elemObj => {
    if (!((elemObj || {}).children || []).length) {
      return null;
    }
    return elemObj.children.map(el => ({
      title: getFormattedTag(el, showSourceAttrs),
      key: el.path,
      children: recursive(el)
    }));
  };
  const treeData = source && recursive(source);
  return /*#__PURE__*/_react.default.createElement("div", {
    id: "sourceContainer",
    className: _Inspector.default['tree-container'],
    tabIndex: "0"
  }, !source && !sourceError && /*#__PURE__*/_react.default.createElement("i", null, t('Gathering initial app source…')), sourceError && t('couldNotObtainSource', {
    errorMsg: JSON.stringify(sourceError)
  }), /*#__PURE__*/_react.default.createElement(_antd.Spin, {
    size: "large",
    spinning: !!methodCallInProgress && mjpegScreenshotUrl && isSourceRefreshOn
  }, treeData ? /*#__PURE__*/_react.default.createElement(_antd.Tree, {
    defaultExpandAll: true,
    onExpand: setExpandedPaths,
    expandedKeys: expandedPaths,
    onSelect: selectedPaths => handleSelectElement(selectedPaths[0]),
    selectedKeys: [selectedElement.path],
    treeData: treeData
  }) : /*#__PURE__*/_react.default.createElement(_antd.Tree, {
    treeData: []
  })), /*#__PURE__*/_react.default.createElement(_LocatorTestModal.default, props), /*#__PURE__*/_react.default.createElement(_SiriCommandModal.default, props));
};
var _default = Source;
exports.default = _default;
},{"./LocatorTestModal":"components/Inspector/LocatorTestModal.js","./Inspector.css":"components/Inspector/Inspector.css","./SiriCommandModal":"components/Inspector/SiriCommandModal.js"}],"components/Inspector/RecordedActions.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _polyfills = require("../../polyfills");
var _react = _interopRequireDefault(require("react"));
var _antd = require("antd");
var _Inspector = _interopRequireDefault(require("./Inspector.css"));
var _clientFrameworks = _interopRequireDefault(require("../../lib/client-frameworks"));
var _highlight = require("highlight.js");
var _icons = require("@ant-design/icons");
var _AntdTypes = require("../AntdTypes");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const RecordedActions = props => {
  const {
    showBoilerplate,
    recordedActions,
    actionFramework,
    t
  } = props;
  const code = (raw = true) => {
    const {
      host,
      port,
      path,
      https,
      desiredCapabilities
    } = props.sessionDetails;
    let framework = new _clientFrameworks.default[actionFramework](host, port, path, https, desiredCapabilities);
    framework.actions = recordedActions;
    const rawCode = framework.getCodeString(showBoilerplate);
    if (raw) {
      return rawCode;
    }
    return (0, _highlight.highlight)(framework.language, rawCode, true).value;
  };
  const actionBar = () => {
    const {
      setActionFramework,
      toggleShowBoilerplate,
      clearRecording,
      closeRecorder,
      isRecording
    } = props;
    return /*#__PURE__*/_react.default.createElement("div", null, !!recordedActions.length && /*#__PURE__*/_react.default.createElement(_antd.Select, {
      defaultValue: actionFramework,
      onChange: setActionFramework,
      className: _Inspector.default['framework-dropdown'],
      size: "small"
    }, Object.keys(_clientFrameworks.default).map(f => /*#__PURE__*/_react.default.createElement(_antd.Select.Option, {
      value: f,
      key: f
    }, _clientFrameworks.default[f].readableName))), (!!recordedActions.length || !isRecording) && /*#__PURE__*/_react.default.createElement(_antd.Button.Group, {
      size: "small"
    }, !!recordedActions.length && /*#__PURE__*/_react.default.createElement(_antd.Tooltip, {
      title: t('Show/Hide Boilerplate Code')
    }, /*#__PURE__*/_react.default.createElement(_antd.Button, {
      onClick: toggleShowBoilerplate,
      icon: /*#__PURE__*/_react.default.createElement(_icons.ExportOutlined, null),
      type: showBoilerplate ? _AntdTypes.BUTTON.PRIMARY : _AntdTypes.BUTTON.DEFAULT
    })), !!recordedActions.length && /*#__PURE__*/_react.default.createElement(_antd.Tooltip, {
      title: t('Copy code to clipboard')
    }, /*#__PURE__*/_react.default.createElement(_antd.Button, {
      icon: /*#__PURE__*/_react.default.createElement(_icons.CopyOutlined, null),
      onClick: () => _polyfills.clipboard.writeText(code())
    })), !!recordedActions.length && /*#__PURE__*/_react.default.createElement(_antd.Tooltip, {
      title: t('Clear Actions')
    }, /*#__PURE__*/_react.default.createElement(_antd.Button, {
      icon: /*#__PURE__*/_react.default.createElement(_icons.DeleteOutlined, null),
      onClick: clearRecording
    })), !isRecording && /*#__PURE__*/_react.default.createElement(_antd.Tooltip, {
      title: t('Close Recorder')
    }, /*#__PURE__*/_react.default.createElement(_antd.Button, {
      icon: /*#__PURE__*/_react.default.createElement(_icons.CloseOutlined, null),
      onClick: closeRecorder
    }))));
  };
  const highlightedCode = code(false);
  return /*#__PURE__*/_react.default.createElement(_antd.Card, {
    title: /*#__PURE__*/_react.default.createElement("span", null, /*#__PURE__*/_react.default.createElement(_icons.CodeOutlined, null), " ", t('Recorder')),
    className: _Inspector.default['recorded-actions'],
    extra: actionBar()
  }, !recordedActions.length && /*#__PURE__*/_react.default.createElement("div", {
    className: _Inspector.default['no-recorded-actions']
  }, t('Perform some actions to see code show up here')), !!recordedActions.length && /*#__PURE__*/_react.default.createElement("div", {
    className: _Inspector.default['recorded-code'],
    dangerouslySetInnerHTML: {
      __html: highlightedCode
    }
  }));
};
var _default = RecordedActions;
exports.default = _default;
},{"../../polyfills":"polyfills/index.js","./Inspector.css":"components/Inspector/Inspector.css","../../lib/client-frameworks":"lib/client-frameworks/index.js","../AntdTypes":"components/AntdTypes.js"}],"components/Inspector/Commands.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _lodash = _interopRequireDefault(require("lodash"));
var _antd = require("antd");
var _shared = require("./shared");
var _Inspector = _interopRequireDefault(require("./Inspector.css"));
var _AntdTypes = require("../AntdTypes");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const Commands = props => {
  const {
    selectCommandGroup,
    selectCommandSubGroup,
    selectedCommandGroup,
    selectedCommandSubGroup,
    pendingCommand,
    cancelPendingCommand,
    setCommandArg,
    applyClientMethod,
    t
  } = props;
  const startPerformingCommand = (commandName, command) => {
    const {
      startEnteringCommandArgs
    } = props;
    if (_lodash.default.isEmpty(command.args)) {
      applyClientMethod({
        methodName: command.methodName,
        args: [],
        skipRefresh: !command.refresh,
        ignoreResult: false
      });
    } else {
      startEnteringCommandArgs(commandName, command);
    }
  };
  const executeCommand = () => {
    let {
      args,
      command
    } = pendingCommand;

    // Special case for 'rotateDevice'
    if (command.methodName === 'rotateDevice') {
      args = {
        x: args[0],
        y: args[1],
        duration: args[2],
        radius: args[3],
        rotation: args[4],
        touchCount: args[5]
      };
    }

    // Special case for 'setGeoLocation'
    if (command.methodName === 'setGeoLocation') {
      args = {
        latitude: args[0],
        longitude: args[1],
        altitude: args[2]
      };
    }

    // Special case for 'execute'
    if (command.methodName === 'executeScript') {
      if (!_lodash.default.isEmpty(args[1])) {
        try {
          args[1] = JSON.parse(args[1]);
        } catch (e) {
          _antd.notification.error({
            message: t('invalidJson', {
              json: args[1]
            }),
            duration: 5
          });
        }
      }
    }

    // Special case for 'updateSettings'
    if (command.methodName === 'updateSettings') {
      if (_lodash.default.isString(args[0])) {
        try {
          args[0] = JSON.parse(args[0]);
        } catch (e) {
          _antd.notification.error({
            message: t('invalidJson', {
              json: args[0]
            }),
            duration: 5
          });
        }
      }
    }
    applyClientMethod({
      methodName: command.methodName,
      args,
      skipRefresh: !command.refresh,
      ignoreResult: false
    });
    cancelPendingCommand();
  };
  return /*#__PURE__*/_react.default.createElement("div", {
    className: _Inspector.default['commands-container']
  }, /*#__PURE__*/_react.default.createElement(_antd.Row, {
    gutter: 16,
    className: _Inspector.default['arg-row']
  }, /*#__PURE__*/_react.default.createElement(_antd.Col, {
    span: 24
  }, /*#__PURE__*/_react.default.createElement(_antd.Select, {
    onChange: commandGroupName => selectCommandGroup(commandGroupName),
    placeholder: t('Select Command Group')
  }, _lodash.default.keys(_shared.COMMAND_DEFINITIONS).map(commandGroup => /*#__PURE__*/_react.default.createElement(_antd.Select.Option, {
    key: commandGroup
  }, t(commandGroup)))))), selectedCommandGroup && /*#__PURE__*/_react.default.createElement(_antd.Row, null, /*#__PURE__*/_react.default.createElement(_antd.Col, {
    span: 24
  }, /*#__PURE__*/_react.default.createElement(_antd.Select, {
    onChange: commandGroupName => selectCommandSubGroup(commandGroupName),
    placeholder: t('Select Sub Group')
  }, _lodash.default.keys(_shared.COMMAND_DEFINITIONS[selectedCommandGroup]).map(commandGroup => /*#__PURE__*/_react.default.createElement(_antd.Select.Option, {
    key: commandGroup
  }, t(commandGroup)))))), /*#__PURE__*/_react.default.createElement(_antd.Row, null, selectedCommandSubGroup && _lodash.default.toPairs(_shared.COMMAND_DEFINITIONS[selectedCommandGroup][selectedCommandSubGroup]).map(([commandName, command], index) => /*#__PURE__*/_react.default.createElement(_antd.Col, {
    key: index,
    span: 8
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: _Inspector.default['btn-container']
  }, /*#__PURE__*/_react.default.createElement(_antd.Button, {
    onClick: () => startPerformingCommand(commandName, command)
  }, t(commandName)))))), !!pendingCommand && /*#__PURE__*/_react.default.createElement(_antd.Modal, {
    title: t(pendingCommand.commandName),
    okText: t('Execute Command'),
    cancelText: t('Cancel'),
    open: !!pendingCommand,
    onOk: () => executeCommand(),
    onCancel: () => cancelPendingCommand()
  }, !_lodash.default.isEmpty(pendingCommand.command.args) && _lodash.default.map(pendingCommand.command.args, ([argName, argType], index) => /*#__PURE__*/_react.default.createElement(_antd.Row, {
    key: index,
    gutter: 16
  }, /*#__PURE__*/_react.default.createElement(_antd.Col, {
    span: 24,
    className: _Inspector.default['arg-container']
  }, argType === _shared.COMMAND_ARG_TYPES.NUMBER && /*#__PURE__*/_react.default.createElement(_antd.Input, {
    type: _AntdTypes.INPUT.NUMBER,
    value: pendingCommand.args[index],
    addonBefore: t(argName),
    onChange: e => setCommandArg(index, _lodash.default.toNumber(e.target.value))
  }), argType === _shared.COMMAND_ARG_TYPES.BOOLEAN && /*#__PURE__*/_react.default.createElement("div", null, t(argName), " ", /*#__PURE__*/_react.default.createElement(_antd.Switch, {
    checked: pendingCommand.args[index],
    onChange: v => setCommandArg(index, v)
  })), argType === _shared.COMMAND_ARG_TYPES.STRING && /*#__PURE__*/_react.default.createElement(_antd.Input, {
    addonBefore: t(argName),
    onChange: e => setCommandArg(index, e.target.value)
  }))))));
};
var _default = Commands;
exports.default = _default;
},{"./shared":"components/Inspector/shared.js","./Inspector.css":"components/Inspector/Inspector.css","../AntdTypes":"components/AntdTypes.js"}],"components/Inspector/SavedGestures.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _antd = require("antd");
var _Inspector = _interopRequireDefault(require("./Inspector.css"));
var _icons = require("@ant-design/icons");
var _shared = require("./shared");
var _lodash = _interopRequireDefault(require("lodash"));
var _moment = _interopRequireDefault(require("moment"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const SAVED_ACTIONS_OBJ = {
  NAME: 'Name',
  DESCRIPTION: 'Description',
  CREATED: 'Created',
  ACTIONS: 'Actions'
};
const SavedGestures = props => {
  const {
    savedGestures,
    showGestureEditor,
    removeGestureDisplay,
    t
  } = props;
  const drawnGestureRef = (0, _react.useRef)(null);
  const onRowClick = rowKey => {
    const gesture = getGestureByID(rowKey);
    if (gesture.id === drawnGestureRef.current) {
      removeGestureDisplay();
      drawnGestureRef.current = null;
    } else {
      onDraw(gesture);
      drawnGestureRef.current = gesture.id;
    }
  };
  const loadSavedGesture = gesture => {
    const {
      setLoadedGesture
    } = props;
    removeGestureDisplay();
    setLoadedGesture(gesture);
    showGestureEditor();
  };
  const handleDelete = id => {
    const {
      deleteSavedGesture
    } = props;
    if (window.confirm('Are you sure?')) {
      deleteSavedGesture(id);
    }
  };
  const getGestureByID = id => {
    for (const gesture of savedGestures) {
      if (gesture.id === id) {
        return gesture;
      }
    }
    throw new Error(`Couldn't find session with id ${id}`);
  };
  const onDraw = gesture => {
    const {
      displayGesture
    } = props;
    const pointers = convertCoordinates(gesture.actions);
    displayGesture(pointers);
  };
  const onPlay = gesture => {
    const {
      applyClientMethod
    } = props;
    const pointers = convertCoordinates(gesture.actions);
    const actions = formatGesture(pointers);
    applyClientMethod({
      methodName: _shared.SCREENSHOT_INTERACTION_MODE.GESTURE,
      args: [actions]
    });
  };
  const formatGesture = pointers => {
    const actions = {};
    for (const pointer of pointers) {
      actions[pointer.name] = pointer.ticks.map(tick => _lodash.default.omit(tick, 'id'));
    }
    return actions;
  };
  const convertCoordinates = pointers => {
    const {
      windowSize
    } = props;
    const newPointers = JSON.parse(JSON.stringify(pointers));
    for (const pointer of newPointers) {
      for (const tick of pointer.ticks) {
        if (tick.type === _shared.POINTER_TYPES.POINTER_MOVE) {
          tick.x = (0, _shared.percentageToPixels)(tick.x, windowSize.width);
          tick.y = (0, _shared.percentageToPixels)(tick.y, windowSize.height);
        }
      }
    }
    return newPointers;
  };
  const dataSource = () => {
    if (!savedGestures) {
      return [];
    }
    return savedGestures.map(gesture => ({
      key: gesture.id,
      Name: gesture.name || '(Unnamed)',
      Created: (0, _moment.default)(gesture.date).format('YYYY-MM-DD'),
      Description: gesture.description || 'No Description'
    }));
  };
  const columns = Object.keys(SAVED_ACTIONS_OBJ).map(key => {
    if (SAVED_ACTIONS_OBJ[key] === SAVED_ACTIONS_OBJ.ACTIONS) {
      return {
        title: SAVED_ACTIONS_OBJ[key],
        key: SAVED_ACTIONS_OBJ[key],
        render: (_, record) => {
          const gesture = getGestureByID(record.key);
          return /*#__PURE__*/_react.default.createElement(_antd.Button.Group, null, /*#__PURE__*/_react.default.createElement(_antd.Tooltip, {
            title: t('Play')
          }, /*#__PURE__*/_react.default.createElement(_antd.Button, {
            key: "play",
            type: "primary",
            icon: /*#__PURE__*/_react.default.createElement(_icons.PlayCircleOutlined, null),
            onClick: () => onPlay(gesture)
          })), /*#__PURE__*/_react.default.createElement(_antd.Button, {
            icon: /*#__PURE__*/_react.default.createElement(_icons.EditOutlined, null),
            onClick: () => loadSavedGesture(gesture)
          }), /*#__PURE__*/_react.default.createElement(_antd.Button, {
            icon: /*#__PURE__*/_react.default.createElement(_icons.DeleteOutlined, null),
            onClick: () => handleDelete(gesture.id)
          }));
        }
      };
    } else {
      return {
        title: SAVED_ACTIONS_OBJ[key],
        dataIndex: SAVED_ACTIONS_OBJ[key],
        key: SAVED_ACTIONS_OBJ[key]
      };
    }
  });
  (0, _react.useEffect)(() => {
    const {
      getSavedGestures
    } = props;
    getSavedGestures();
    return () => drawnGestureRef.current = null;
  }, []);
  return /*#__PURE__*/_react.default.createElement(_antd.Space, {
    className: _Inspector.default.spaceContainer,
    direction: "vertical",
    size: "middle"
  }, t('gesturesDescription'), /*#__PURE__*/_react.default.createElement(_antd.Table, {
    onRow: row => ({
      onClick: () => onRowClick(row.key)
    }),
    pagination: false,
    dataSource: dataSource(),
    columns: columns,
    footer: () => /*#__PURE__*/_react.default.createElement(_antd.Button, {
      onClick: showGestureEditor,
      icon: /*#__PURE__*/_react.default.createElement(_icons.PlusOutlined, null)
    })
  }));
};
var _default = SavedGestures;
exports.default = _default;
},{"./Inspector.css":"components/Inspector/Inspector.css","./shared":"components/Inspector/shared.js"}],"components/Inspector/GestureEditor.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _lodash = _interopRequireDefault(require("lodash"));
var _antd = require("antd");
var _icons = require("@ant-design/icons");
var _shared = require("./shared");
var _Inspector = _interopRequireDefault(require("./Inspector.css"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const {
  POINTER_UP,
  POINTER_DOWN,
  PAUSE,
  POINTER_MOVE
} = _shared.POINTER_TYPES;
const DEFAULT_DURATION_TIME = 2500;
const COLORS = ['#FF3333', '#FF8F00', '#B65FF4', '#6CFF00', '#00FFDC'];
const BUTTONS = {
  LEFT: 0,
  RIGHT: 1
};
const ACTION_TYPES = {
  ADD: 'add',
  REMOVE: 'remove'
};
const MSG_TYPES = {
  ERROR: 'error',
  SUCCESS: 'success'
};
const COORD_TYPE = {
  PERCENTAGES: 'percentages',
  PIXELS: 'pixels'
};
const TICK_PROPS = {
  POINTER_TYPE: 'pointerType',
  DURATION: 'duration',
  BUTTON: 'button',
  X: 'x',
  Y: 'y'
};
const CURSOR = {
  POINTER: 'pointer',
  TEXT: 'text'
};
const STATUS = {
  WAIT: 'wait',
  FINISH: 'finish',
  COLOR: '#FFFFFF',
  FILLER: 'filler'
};
const DISPLAY = {
  [POINTER_UP]: 'Pointer Up',
  [POINTER_DOWN]: 'Pointer Down',
  [PAUSE]: 'Pause',
  [POINTER_MOVE]: 'Move'
};
const DEFAULT_POINTERS = () => [{
  name: 'pointer1',
  ticks: [{
    id: '1.1'
  }],
  color: COLORS[0],
  id: '1'
}];

/**
 * Shows the gesture editor interface
 */
const GestureEditor = props => {
  const {
    loadedGesture,
    saveGesture,
    tickCoordinates,
    selectedTick,
    selectTick,
    unselectTick,
    windowSize,
    t
  } = props;
  const [pointers, setPointers] = (0, _react.useState)(loadedGesture ? loadedGesture.actions : DEFAULT_POINTERS());
  const [name, setName] = (0, _react.useState)(loadedGesture ? loadedGesture.name : t('Untitled Gesture'));
  const [description, setDescription] = (0, _react.useState)(loadedGesture ? loadedGesture.description : t('Add Description'));
  const [coordType, setCoordType] = (0, _react.useState)(COORD_TYPE.PERCENTAGES);
  const [activePointerId, setActivePointerId] = (0, _react.useState)('1');

  // Draw gesture whenever pointers change
  (0, _react.useEffect)(() => {
    const {
      displayGesture
    } = props;
    const convertedPointers = getConvertedPointers(COORD_TYPE.PIXELS);
    displayGesture(convertedPointers);
  }, [pointers]);

  // Retrieve coordinates when user taps screenshot
  (0, _react.useEffect)(() => {
    if (tickCoordinates) {
      updateCoordinates(selectedTick, tickCoordinates.x, tickCoordinates.y);
    }
  }, [selectedTick, tickCoordinates]);
  const onSave = () => {
    const {
      id,
      date
    } = loadedGesture;
    if (duplicatePointerNames(pointers)) {
      return null;
    }
    const gesture = {
      name,
      description,
      id,
      date,
      actions: getConvertedPointers(COORD_TYPE.PERCENTAGES)
    };
    saveGesture(gesture);
    displayNotificationMsg(MSG_TYPES.SUCCESS, t('Gesture saved'));
  };
  const onSaveAs = () => {
    if (duplicatePointerNames(pointers)) {
      return null;
    }
    const gesture = {
      name,
      description,
      actions: getConvertedPointers(COORD_TYPE.PERCENTAGES)
    };
    saveGesture(gesture);
    displayNotificationMsg(MSG_TYPES.SUCCESS, t('Gesture saved as', {
      gestureName: name
    }));
    onBack();
  };
  const onPlay = () => {
    const {
      applyClientMethod
    } = props;
    if (duplicatePointerNames(pointers)) {
      return null;
    }
    const formattedPointers = getW3CPointers();
    applyClientMethod({
      methodName: _shared.SCREENSHOT_INTERACTION_MODE.GESTURE,
      args: [formattedPointers]
    });
  };
  const onBack = () => {
    const {
      hideGestureEditor,
      removeLoadedGesture,
      removeGestureDisplay
    } = props;
    unselectTick();
    removeGestureDisplay();
    removeLoadedGesture();
    hideGestureEditor();
  };

  // Check if pointer names are duplicates before saving/playing
  const duplicatePointerNames = localPointers => {
    const duplicates = {};
    for (const pointer of localPointers) {
      if (duplicates[pointer.name]) {
        displayNotificationMsg(MSG_TYPES.ERROR, t('Duplicate pointer names are not allowed'));
        return true;
      } else {
        duplicates[pointer.name] = pointer;
      }
    }
    return false;
  };
  const displayNotificationMsg = (type, msg) => {
    _antd.notification[type]({
      message: msg,
      duration: 5
    });
  };

  // Change gesture datastructure to fit Webdriver spec
  const getW3CPointers = () => {
    const newPointers = {};
    const currentPointers = getConvertedPointers(COORD_TYPE.PIXELS);
    for (const pointer of currentPointers) {
      newPointers[pointer.name] = pointer.ticks.map(tick => _lodash.default.omit(tick, 'id'));
    }
    return newPointers;
  };

  // This converts all the coordinates in the gesture to px/%
  const getConvertedPointers = type => {
    const {
      width,
      height
    } = windowSize;
    if (type === coordType) {
      return pointers;
    }
    const newPointers = _lodash.default.cloneDeep(pointers);
    for (const pointer of newPointers) {
      for (const tick of pointer.ticks) {
        if (tick.type === _shared.POINTER_TYPES.POINTER_MOVE) {
          if (type === COORD_TYPE.PIXELS) {
            tick.x = (0, _shared.percentageToPixels)(tick.x, width);
            tick.y = (0, _shared.percentageToPixels)(tick.y, height);
          } else {
            tick.x = (0, _shared.pixelsToPercentage)(tick.x, width);
            tick.y = (0, _shared.pixelsToPercentage)(tick.y, height);
          }
        }
      }
    }
    return newPointers;
  };
  const getDefaultMoveDuration = (ticks, tickId, x2, y2, coordFromTap) => {
    const {
      width,
      height
    } = windowSize;
    const ticksExceptCurrent = ticks.filter(tick => tick.id !== tickId);
    const prevPointerMoves = [];
    for (const tick of ticksExceptCurrent) {
      if (tick.type === POINTER_MOVE && tick.x !== undefined && tick.y !== undefined) {
        prevPointerMoves.push({
          x: tick.x,
          y: tick.y
        });
      }
    }
    const len = prevPointerMoves.length;
    if (len === 0) {
      return 0;
    }
    const obj = {
      x1: prevPointerMoves[len - 1].x,
      y1: prevPointerMoves[len - 1].y,
      x2,
      y2
    };
    if (coordType === COORD_TYPE.PERCENTAGES) {
      obj.x1 = (0, _shared.percentageToPixels)(obj.x1, width);
      obj.y1 = (0, _shared.percentageToPixels)(obj.y1, height);
      // No need to convert coordinates from tap since they are in px
      if (!coordFromTap) {
        obj.x2 = (0, _shared.percentageToPixels)(obj.x2, width);
        obj.y2 = (0, _shared.percentageToPixels)(obj.y2, height);
      }
    }
    const calcLength = (v1, v2) => Math.sqrt(v1 ** 2 + v2 ** 2);
    const calcDiff = (v1, v2) => Math.abs(v2) - Math.abs(v1);
    const xDiff = calcDiff(obj.x1, obj.x2);
    const yDiff = calcDiff(obj.y1, obj.y2);
    const maxScreenLength = calcLength(width, height);
    const lineLength = calcLength(xDiff, yDiff);
    const lineLengthPct = lineLength / maxScreenLength;
    return Math.round(lineLengthPct * DEFAULT_DURATION_TIME);
  };

  // Update tapped coordinates within local state
  const updateCoordinates = (tickKey, updateX, updateY) => {
    if (!updateX || !updateY) {
      return null;
    }
    const {
      width,
      height
    } = windowSize;
    const copiedPointers = _lodash.default.cloneDeep(pointers);
    const currentPointer = copiedPointers.find(pointer => pointer.id === tickKey[0]);
    const currentTick = currentPointer.ticks.find(tick => tick.id === tickKey);
    const x = parseFloat(updateX, 10);
    const y = parseFloat(updateY, 10);
    if (coordType === COORD_TYPE.PERCENTAGES) {
      currentTick.x = (0, _shared.pixelsToPercentage)(x, width);
      currentTick.y = (0, _shared.pixelsToPercentage)(y, height);
    } else {
      currentTick.x = x;
      currentTick.y = y;
    }
    if (currentTick.duration === undefined) {
      currentTick.duration = getDefaultMoveDuration(currentPointer.ticks, currentTick.id, x, y, true);
    }
    setPointers(copiedPointers);
  };
  const addPointer = () => {
    const key = pointers.length + 1;
    const pointerId = String(key);
    const copiedPointers = _lodash.default.cloneDeep(pointers);
    copiedPointers.push({
      name: `pointer${key}`,
      ticks: [{
        id: `${key}.1`
      }],
      id: pointerId,
      color: COLORS[key - 1]
    });
    setPointers(copiedPointers);
    setActivePointerId(pointerId);
  };
  const deletePointer = targetKey => {
    // 'newActivePointerId' variable keeps track of the previous pointer before deleting the current one
    // its default is the first pointer
    let newActivePointerId = '1';
    const pointersExceptCurrent = pointers.filter(pointer => pointer.id !== targetKey);
    const newPointers = pointersExceptCurrent.map((pointer, index) => {
      const id = String(index + 1);
      if (id !== pointer.id) {
        pointer.id = id;
        pointer.color = COLORS[index];
        pointer.ticks = pointer.ticks.map(tick => {
          tick.id = `${id}.${tick.id[2]}`;
          return tick;
        });
      } else {
        newActivePointerId = pointer.id;
      }
      return pointer;
    });
    unselectTick();
    setPointers(newPointers);
    setActivePointerId(newActivePointerId);
  };
  const addTick = pointerKey => {
    const copiedPointers = _lodash.default.cloneDeep(pointers);
    const currentPointer = copiedPointers.find(pointer => pointer.id === pointerKey);
    const id = `${pointerKey}.${currentPointer.ticks.length + 1}`;
    currentPointer.ticks.push({
      id
    });
    setPointers(copiedPointers);
  };
  const deleteTick = (pointerKey, tickKey) => {
    const copiedPointers = _lodash.default.cloneDeep(pointers);
    const currentPointer = copiedPointers.find(pointer => pointer.id === pointerKey);
    const ticksToKeep = currentPointer.ticks.filter(tick => tick.id !== tickKey);
    const newTicks = ticksToKeep.map((tick, index) => {
      const id = String(index + 1);
      if (tick.id !== id) {
        tick.id = `${tick.id[0]}.${id}`;
      }
      return tick;
    });
    currentPointer.ticks = newTicks;
    unselectTick();
    setPointers(copiedPointers);
  };

  // Updates the current tick within local state
  const updateTick = (tick, msg, value) => {
    const copiedPointers = _lodash.default.cloneDeep(pointers);
    const currentPointer = copiedPointers.find(p => p.id === tick.id[0]);
    const targetTickIdx = currentPointer.ticks.findIndex(t => t.id === tick.id);
    // currentTick can be assigned a new tick object if made changes to pointer types
    let currentTick = currentPointer.ticks[targetTickIdx];

    // We create an entire new tick for changes in pointer types to ensure previous properties are removed
    if (msg === TICK_PROPS.POINTER_TYPE) {
      if (value === POINTER_MOVE) {
        selectTick(tick.id);
      }
      currentTick = {
        id: tick.id,
        type: value,
        ...([POINTER_DOWN, POINTER_UP].includes(value) && {
          button: BUTTONS.LEFT
        }),
        ...(value === PAUSE && {
          duration: 0
        })
      };
    } else {
      // We just modify the existing tick values
      currentTick[msg] = parseFloat(value, 10);

      // set default duration for if not set already
      if (currentTick.x !== undefined && currentTick.y !== undefined && currentTick.duration === undefined) {
        currentTick.duration = getDefaultMoveDuration(currentPointer.ticks, tick.id, currentTick.x, currentTick.y, false);
      }
    }
    currentPointer.ticks[targetTickIdx] = currentTick;
    setPointers(copiedPointers);
  };

  // Reformats the gesture only for the timeline by populating the 'filler' ticks for each pointer
  // to match same length to keep timeline lengths consistent and accurate
  const updateGestureForTimeline = () => {
    const copiedPointers = _lodash.default.cloneDeep(pointers);
    const allTickLengths = copiedPointers.map(pointer => pointer.ticks.length);
    const maxTickLength = Math.max(...allTickLengths);
    return copiedPointers.map(pointer => {
      const currentLength = pointer.ticks.length;
      if (currentLength > 0) {
        pointer.ticks[currentLength - 1].customStep = STATUS.WAIT;
        if (currentLength < maxTickLength) {
          const fillers = Array.from({
            length: maxTickLength - currentLength
          }, () => ({
            type: STATUS.FILLER,
            color: STATUS.COLOR
          }));
          pointer.ticks.push(...fillers);
        }
      }
      return pointer;
    });
  };
  const updatePointerName = (pointerName, pointerIndex) => {
    const copiedPointers = _lodash.default.cloneDeep(pointers);
    copiedPointers[pointerIndex].name = pointerName;
    setPointers(copiedPointers);
  };
  const headerTitle = /*#__PURE__*/_react.default.createElement(_antd.Tooltip, {
    title: t('Edit')
  }, /*#__PURE__*/_react.default.createElement(_antd.Input, {
    defaultValue: name,
    className: _Inspector.default['gesture-header-title'],
    onChange: e => setName(e.target.value),
    size: "small"
  }));
  const headerButtons = /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_antd.Button.Group, null, /*#__PURE__*/_react.default.createElement(_antd.Button, {
    className: _Inspector.default['gesture-header-coord-btn'],
    type: coordType === COORD_TYPE.PERCENTAGES ? 'primary' : 'default',
    onClick: () => {
      setPointers(getConvertedPointers(COORD_TYPE.PERCENTAGES));
      setCoordType(COORD_TYPE.PERCENTAGES);
    },
    size: "small"
  }, "%"), /*#__PURE__*/_react.default.createElement(_antd.Button, {
    className: _Inspector.default['gesture-header-coord-btn'],
    type: coordType === COORD_TYPE.PIXELS ? 'primary' : 'default',
    onClick: () => {
      setPointers(getConvertedPointers(COORD_TYPE.PIXELS));
      setCoordType(COORD_TYPE.PIXELS);
    },
    size: "small"
  }, "px")), /*#__PURE__*/_react.default.createElement(_antd.Tooltip, {
    title: t('Play')
  }, /*#__PURE__*/_react.default.createElement(_antd.Button, {
    type: "primary",
    icon: /*#__PURE__*/_react.default.createElement(_icons.PlayCircleOutlined, null),
    onClick: () => onPlay()
  })), /*#__PURE__*/_react.default.createElement(_antd.Button, {
    onClick: () => onSaveAs()
  }, t('saveAs')), /*#__PURE__*/_react.default.createElement(_antd.Button, {
    onClick: () => onSave(),
    disabled: !loadedGesture
  }, t('Save')));
  const headerDescription = /*#__PURE__*/_react.default.createElement(_antd.Tooltip, {
    title: t('Edit')
  }, /*#__PURE__*/_react.default.createElement(_antd.Input, {
    defaultValue: description,
    className: _Inspector.default['gesture-header-description'],
    onChange: e => setDescription(e.target.value),
    size: "small"
  }));
  const regularTimelineIcon = (pointer, tick) => {
    const {
      type,
      duration,
      button,
      x,
      y
    } = tick;
    const iconStyle = {
      color: pointer.color
    };
    return /*#__PURE__*/_react.default.createElement(_antd.Popover, {
      placement: "bottom",
      title: /*#__PURE__*/_react.default.createElement("center", null, t(DISPLAY[type])),
      content: /*#__PURE__*/_react.default.createElement("div", {
        className: _Inspector.default['timeline-tick-title']
      }, duration !== undefined && /*#__PURE__*/_react.default.createElement("p", null, t('Duration'), ": ", duration, "ms"), button !== undefined && /*#__PURE__*/_react.default.createElement("p", null, t('Button'), ": ", button === BUTTONS.LEFT ? t('Left') : t('Right')), x !== undefined && /*#__PURE__*/_react.default.createElement("p", null, "X: ", x, coordType === COORD_TYPE.PIXELS ? 'px' : '%'), y !== undefined && /*#__PURE__*/_react.default.createElement("p", null, "Y: ", y, coordType === COORD_TYPE.PIXELS ? 'px' : '%'), type === undefined && /*#__PURE__*/_react.default.createElement("p", null, t('Action Type Not Defined')))
    }, type === POINTER_MOVE && /*#__PURE__*/_react.default.createElement(_icons.RightCircleOutlined, {
      className: _Inspector.default['gesture-header-icon'],
      style: iconStyle
    }), type === POINTER_DOWN && /*#__PURE__*/_react.default.createElement(_icons.DownCircleOutlined, {
      className: _Inspector.default['gesture-header-icon'],
      style: iconStyle
    }), type === POINTER_UP && /*#__PURE__*/_react.default.createElement(_icons.UpCircleOutlined, {
      className: _Inspector.default['gesture-header-icon'],
      style: iconStyle
    }), type === PAUSE && /*#__PURE__*/_react.default.createElement(_icons.PauseCircleOutlined, {
      className: _Inspector.default['gesture-header-icon'],
      style: iconStyle
    }), type === undefined && /*#__PURE__*/_react.default.createElement(_icons.QuestionCircleOutlined, {
      className: _Inspector.default['gesture-header-icon'],
      style: iconStyle
    }));
  };
  const timeline = updateGestureForTimeline().map(pointer => /*#__PURE__*/_react.default.createElement("center", {
    key: pointer.id
  }, /*#__PURE__*/_react.default.createElement(_antd.Steps, {
    className: _Inspector.default['gesture-header-timeline'],
    style: {
      '--timelineColor': pointer.color
    },
    items: pointer.ticks.map(tick => {
      if (tick.type !== STATUS.FILLER) {
        return {
          key: 'timeline-steps',
          status: tick.customStep || STATUS.FINISH,
          icon: regularTimelineIcon(pointer, tick)
        };
      } else {
        return {
          key: 'transparent-steps',
          status: STATUS.WAIT,
          icon: /*#__PURE__*/_react.default.createElement(_icons.RightCircleOutlined, {
            className: _Inspector.default['gesture-header-icon'],
            style: {
              color: tick.color
            }
          })
        };
      }
    })
  })));
  const tickButton = tick => /*#__PURE__*/_react.default.createElement("center", null, /*#__PURE__*/_react.default.createElement(_antd.Button.Group, {
    className: _Inspector.default['tick-button-group']
  }, /*#__PURE__*/_react.default.createElement(_antd.Button, {
    type: tick.button === BUTTONS.LEFT ? 'primary' : 'default',
    className: _Inspector.default['tick-button-input'],
    onClick: () => updateTick(tick, TICK_PROPS.BUTTON, BUTTONS.LEFT)
  }, t('Left')), /*#__PURE__*/_react.default.createElement(_antd.Button, {
    type: tick.button === BUTTONS.RIGHT ? 'primary' : 'default',
    className: _Inspector.default['tick-button-input'],
    onClick: () => updateTick(tick, TICK_PROPS.BUTTON, BUTTONS.RIGHT)
  }, t('Right'))));
  const tickDuration = tick => /*#__PURE__*/_react.default.createElement("center", null, /*#__PURE__*/_react.default.createElement(_antd.Input, {
    className: _Inspector.default['tick-input-box'],
    value: !isNaN(tick.duration) ? tick.duration : null,
    placeholder: t('Duration'),
    defaultValue: tick.duration,
    onChange: e => updateTick(tick, TICK_PROPS.DURATION, e.target.value),
    addonAfter: "ms"
  }));
  const tickCoords = tick => /*#__PURE__*/_react.default.createElement("center", null, /*#__PURE__*/_react.default.createElement("div", {
    className: _Inspector.default['tick-input-box']
  }, /*#__PURE__*/_react.default.createElement(_antd.Input, {
    className: _Inspector.default['tick-coord-box'],
    value: !isNaN(tick.x) ? tick.x : '',
    placeholder: "X",
    defaultValue: tick.x,
    onChange: e => updateTick(tick, TICK_PROPS.X, e.target.value)
  }), /*#__PURE__*/_react.default.createElement(_antd.Input, {
    className: _Inspector.default['tick-coord-box'],
    value: !isNaN(tick.y) ? tick.y : '',
    placeholder: "Y",
    defaultValue: tick.y,
    onChange: e => updateTick(tick, TICK_PROPS.Y, e.target.value)
  })));
  const tickType = tick => /*#__PURE__*/_react.default.createElement("center", null, /*#__PURE__*/_react.default.createElement(_antd.Select, {
    className: _Inspector.default['tick-pointer-input'],
    placeholder: t('Action Type'),
    value: tick.type,
    defaultValue: tick.type,
    size: "middle",
    dropdownMatchSelectWidth: false,
    onChange: e => updateTick(tick, TICK_PROPS.POINTER_TYPE, e)
  }, /*#__PURE__*/_react.default.createElement(_antd.Select.Option, {
    className: _Inspector.default['option-inpt'],
    value: POINTER_MOVE
  }, t(DISPLAY.pointerMove)), /*#__PURE__*/_react.default.createElement(_antd.Select.Option, {
    className: _Inspector.default['option-inpt'],
    value: POINTER_DOWN
  }, t(DISPLAY.pointerDown)), /*#__PURE__*/_react.default.createElement(_antd.Select.Option, {
    className: _Inspector.default['option-inpt'],
    value: POINTER_UP
  }, t(DISPLAY.pointerUp)), /*#__PURE__*/_react.default.createElement(_antd.Select.Option, {
    className: _Inspector.default['option-inpt'],
    value: PAUSE
  }, t(DISPLAY.pause))));
  const tapCoordinatesBtn = tickId => /*#__PURE__*/_react.default.createElement(_antd.Tooltip, {
    title: selectedTick === tickId ? t('Click to Set Coordinates') : t('Set Coordinates Via Field')
  }, /*#__PURE__*/_react.default.createElement(_antd.Button, {
    size: "small",
    type: selectedTick === tickId ? 'primary' : 'text',
    icon: /*#__PURE__*/_react.default.createElement(_icons.AimOutlined, null),
    onClick: () => selectedTick === tickId ? unselectTick() : selectTick(tickId)
  }));
  const tickCard = tick => /*#__PURE__*/_react.default.createElement(_antd.Card, {
    hoverable: true,
    className: _Inspector.default['tick-card'],
    extra: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, tick.type === POINTER_MOVE && tapCoordinatesBtn(tick.id), /*#__PURE__*/_react.default.createElement(_antd.Button, {
      size: "small",
      type: "text",
      icon: /*#__PURE__*/_react.default.createElement(_icons.CloseOutlined, null),
      onClick: () => deleteTick(tick.id[0], tick.id)
    }))
  }, /*#__PURE__*/_react.default.createElement(_antd.Space, {
    className: _Inspector.default.spaceContainer,
    direction: "vertical",
    size: "middle"
  }, tickType(tick), (tick.type === POINTER_MOVE || tick.type === PAUSE) && tickDuration(tick), (tick.type === POINTER_DOWN || tick.type === POINTER_UP) && tickButton(tick), tick.type === POINTER_MOVE && tickCoords(tick)));
  const pointerTicksGrid = pointer => /*#__PURE__*/_react.default.createElement(_antd.Row, {
    gutter: [24, 24]
  }, pointer.ticks.map(tick => /*#__PURE__*/_react.default.createElement(_antd.Col, {
    xs: 12,
    sm: 12,
    md: 12,
    lg: 8,
    xl: 6,
    xxl: 4,
    key: tick.id
  }, tickCard(tick))), /*#__PURE__*/_react.default.createElement(_antd.Col, {
    xs: 12,
    sm: 12,
    md: 12,
    lg: 8,
    xl: 6,
    xxl: 4
  }, /*#__PURE__*/_react.default.createElement(_antd.Card, {
    className: _Inspector.default['tick-plus-card'],
    bordered: false
  }, /*#__PURE__*/_react.default.createElement("center", null, /*#__PURE__*/_react.default.createElement(_antd.Button, {
    className: _Inspector.default['tick-plus-btn'],
    icon: /*#__PURE__*/_react.default.createElement(_icons.PlusCircleOutlined, null),
    onClick: () => addTick(pointer.id)
  })))));
  const pointerTabs = pointers.map((pointer, index) => ({
    label: /*#__PURE__*/_react.default.createElement(_antd.Tooltip, {
      title: t('Edit')
    }, /*#__PURE__*/_react.default.createElement(_antd.Input, {
      className: _Inspector.default['pointer-title'],
      style: {
        cursor: activePointerId === pointer.id ? CURSOR.TEXT : CURSOR.POINTER,
        textDecorationColor: pointer.color
      },
      value: pointer.name,
      defaultValue: pointer.name,
      bordered: false,
      maxLength: 10,
      onChange: e => updatePointerName(e.target.value, index)
    })),
    key: pointer.id,
    children: pointerTicksGrid(pointer)
  }));
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_antd.PageHeader, {
    className: _Inspector.default['gesture-header'],
    onBack: () => onBack(),
    title: headerTitle,
    extra: headerButtons,
    footer: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, headerDescription, /*#__PURE__*/_react.default.createElement(_antd.Divider, null), timeline)
  }), /*#__PURE__*/_react.default.createElement(_antd.Tabs, {
    type: "editable-card",
    onChange: pointerId => setActivePointerId(pointerId),
    activeKey: activePointerId,
    onEdit: (targetKey, action) => action === ACTION_TYPES.ADD ? addPointer() : deletePointer(targetKey),
    hideAdd: pointers.length === 5,
    centered: true,
    tabBarGutter: 10,
    items: pointerTabs
  }));
};
var _default = GestureEditor;
exports.default = _default;
},{"./shared":"components/Inspector/shared.js","./Inspector.css":"components/Inspector/Inspector.css"}],"components/Inspector/SessionCodeBox.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _antd = require("antd");
var _icons = require("@ant-design/icons");
var _Inspector = _interopRequireDefault(require("./Inspector.css"));
var _clientFrameworks = _interopRequireDefault(require("../../lib/client-frameworks"));
var _highlight = require("highlight.js");
var _polyfills = require("../../polyfills");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const SessionCodeBox = ({
  actionFramework,
  setActionFramework,
  sessionDetails,
  t
}) => {
  const code = () => {
    const {
      host,
      port,
      path,
      https,
      desiredCapabilities
    } = sessionDetails;
    const framework = new _clientFrameworks.default[actionFramework](host, port, path, https, desiredCapabilities);
    const rawCode = framework.getCodeString(true);
    return (0, _highlight.highlight)(framework.language, rawCode, true).value;
  };
  const actionBar = () => /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_antd.Select, {
    defaultValue: actionFramework,
    onChange: setActionFramework,
    className: _Inspector.default['framework-dropdown'],
    size: "small"
  }, Object.keys(_clientFrameworks.default).map(f => /*#__PURE__*/_react.default.createElement(_antd.Select.Option, {
    value: f,
    key: f
  }, _clientFrameworks.default[f].readableName))), /*#__PURE__*/_react.default.createElement(_antd.Tooltip, {
    title: t('Copy Code to Clipboard')
  }, /*#__PURE__*/_react.default.createElement(_antd.Button, {
    icon: /*#__PURE__*/_react.default.createElement(_icons.CopyOutlined, null),
    onClick: () => _polyfills.clipboard.writeText(code()),
    type: "text"
  })));
  return /*#__PURE__*/_react.default.createElement(_antd.Card, {
    title: /*#__PURE__*/_react.default.createElement("span", null, /*#__PURE__*/_react.default.createElement(_icons.CodeOutlined, null), " ", t('Start this Kind of Session with Code')),
    className: _Inspector.default['recorded-actions'],
    extra: actionBar()
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: _Inspector.default['recorded-code'],
    dangerouslySetInnerHTML: {
      __html: code()
    }
  }));
};
var _default = SessionCodeBox;
exports.default = _default;
},{"./Inspector.css":"components/Inspector/Inspector.css","../../lib/client-frameworks":"lib/client-frameworks/index.js","../../polyfills":"polyfills/index.js"}],"components/Inspector/SessionInfo.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _antd = require("antd");
var _SessionCodeBox = _interopRequireDefault(require("./SessionCodeBox"));
var _Inspector = _interopRequireDefault(require("./Inspector.css"));
var _formatJson = _interopRequireDefault(require("format-json"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const SESSION_OBJ = {
  session_id: 'Session ID',
  session_url: 'Session URL',
  server_details: 'Server Details',
  session_length: 'Session Length',
  session_details: 'Session Details',
  active_appId: 'Currently Active App ID'
};
const OUTER_TABLE_KEY = 'sessionInfo';
const SESSION_TABLE_KEY = 'sessionDetails';
const SERVER_TABLE_KEY = 'serverDetails';
const SCROLL_DISTANCE_Y = 104;
const COLUMN_WIDTH = 200;
let SESSION_DETAILS;
const SessionInfo = props => {
  const {
    driver
  } = props;
  const sessionArray = Object.keys(SESSION_OBJ).map(key => [key, String(SESSION_OBJ[key])]);
  const generateSessionTime = () => {
    const {
      sessionStartTime
    } = props;
    const currentTime = Date.now();
    const timeDiff = currentTime - sessionStartTime;
    const hours = timeDiff / 3600000;
    const minutes = (hours - Math.floor(hours)) * 60;
    const seconds = (minutes - Math.floor(minutes)) * 60;
    const showTime = time => String(Math.floor(time)).padStart(2, '0');
    return `${showTime(hours)}:${showTime(minutes)}:${showTime(seconds)}`;
  };
  const interval = (0, _react.useRef)();
  const [time, setTime] = (0, _react.useState)(generateSessionTime());
  const getTable = (tableValues, keyName, outerTable) => {
    const keyValue = `${keyName}_value`;
    const dataSource = tableValues.map(([name, value]) => ({
      key: name,
      [keyName]: outerTable ? value : name,
      [keyValue]: value
    }));
    const columns = [{
      dataIndex: keyName,
      key: keyName,
      ...(outerTable && {
        width: COLUMN_WIDTH
      })
    }, {
      dataIndex: keyValue,
      key: keyValue,
      render: outerTable ? text => generateSessionInfo(text) : text => typeof text === 'object' ? /*#__PURE__*/_react.default.createElement("pre", null, _formatJson.default.plain(text)) : String(text)
    }];
    return outerTable ? /*#__PURE__*/_react.default.createElement("div", {
      className: _Inspector.default['session-info-table']
    }, /*#__PURE__*/_react.default.createElement(_antd.Row, null, /*#__PURE__*/_react.default.createElement(_antd.Col, {
      span: 24
    }, /*#__PURE__*/_react.default.createElement(_antd.Table, {
      columns: columns,
      dataSource: dataSource,
      pagination: false,
      showHeader: false,
      bordered: true,
      size: "small"
    }))), /*#__PURE__*/_react.default.createElement("div", {
      className: _Inspector.default['session-code-box']
    }, /*#__PURE__*/_react.default.createElement(_antd.Row, null, /*#__PURE__*/_react.default.createElement(_SessionCodeBox.default, props)))) : /*#__PURE__*/_react.default.createElement(_antd.Table, {
      className: _Inspector.default['session-inner-table'],
      columns: columns,
      dataSource: dataSource,
      pagination: false,
      showHeader: false,
      size: "small",
      scroll: {
        y: SCROLL_DISTANCE_Y
      }
    });
  };
  const generateSessionInfo = name => {
    const {
      sessionDetails,
      appId,
      status
    } = props;
    const {
      host,
      path,
      port
    } = sessionDetails;
    const {
      sessionId,
      connectedUrl
    } = driver || '';
    const serverDetailsArray = [['host', host], ['path', path], ['port', port]];
    const sessionArray = SESSION_DETAILS != null ? Object.keys(SESSION_DETAILS).map(key => [key, SESSION_DETAILS[key]]) : [];
    const serverStatusArray = status != null ? Object.keys(status).map(key => [key, String(status[key])]) : [];

    // TODO: Fetch URL from Cloud Providers
    const sessionUrl = sessionId && connectedUrl ? `${connectedUrl}session/${sessionId}` : 'Error Fetching Session Url';
    switch (name) {
      case 'Session ID':
        return sessionId;
      case 'Session URL':
        return sessionUrl;
      case 'Server Details':
        return getTable([...serverDetailsArray, ...serverStatusArray], SERVER_TABLE_KEY, false);
      case 'Session Length':
        return time;
      case 'Session Details':
        return getTable(sessionArray, SESSION_TABLE_KEY, false);
      case 'Currently Active App ID':
        return appId;
      default:
        return name;
    }
  };
  (0, _react.useEffect)(() => {
    const {
      getActiveAppId,
      getServerStatus,
      applyClientMethod
    } = props;
    const {
      isIOS,
      isAndroid
    } = driver.client;
    getActiveAppId(isIOS, isAndroid);
    getServerStatus();
    (async () => SESSION_DETAILS = await applyClientMethod({
      methodName: 'getSession'
    }))();
    interval.current = setInterval(() => {
      setTime(generateSessionTime());
    }, 1000);
    return () => clearInterval(interval.current);
  }, []);
  return getTable(sessionArray, OUTER_TABLE_KEY, true);
};
var _default = SessionInfo;
exports.default = _default;
},{"./SessionCodeBox":"components/Inspector/SessionCodeBox.js","./Inspector.css":"components/Inspector/Inspector.css"}],"components/Inspector/Inspector.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _lodash = require("lodash");
var _shared = require("./shared");
var _antd = require("antd");
var _Screenshot = _interopRequireDefault(require("./Screenshot"));
var _HeaderButtons = _interopRequireDefault(require("./HeaderButtons"));
var _SelectedElement = _interopRequireDefault(require("./SelectedElement"));
var _Source = _interopRequireDefault(require("./Source"));
var _Inspector = _interopRequireDefault(require("./Inspector.css"));
var _RecordedActions = _interopRequireDefault(require("./RecordedActions"));
var _Commands = _interopRequireDefault(require("./Commands"));
var _SavedGestures = _interopRequireDefault(require("./SavedGestures"));
var _GestureEditor = _interopRequireDefault(require("./GestureEditor"));
var _SessionInfo = _interopRequireDefault(require("./SessionInfo"));
var _polyfills = require("../../polyfills");
var _icons = require("@ant-design/icons");
var _AntdTypes = require("../AntdTypes");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); } /* eslint-disable no-unused-vars */
const {
  SELECT,
  SWIPE,
  TAP,
  LONGPRESS,
  DRAG_AND_DROP,
  DOUBLE_TAP,
  ZOOMIN,
  SLIDE
} = _shared.SCREENSHOT_INTERACTION_MODE;
const ButtonGroup = _antd.Button.Group;
const MIN_WIDTH = 870;
const MIN_HEIGHT = 610;
const MAX_SCREENSHOT_WIDTH = 500;
const MJPEG_STREAM_CHECK_INTERVAL = 1000;
function downloadXML(sourceXML) {
  let element = document.createElement('a');
  element.setAttribute('href', 'data:application/xml;charset=utf-8,' + encodeURIComponent(sourceXML));
  element.setAttribute('download', 'source.xml');
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}
class Inspector extends _react.Component {
  constructor() {
    super();
    this.didInitialResize = false;
    this.state = {
      scaleRatio: 1
    };
    this.screenAndSourceEl = null;
    this.lastScreenshot = null;
    this.screenshotEl = null;
    this.updateSourceTreeWidth = (0, _lodash.debounce)(this.updateSourceTreeWidth.bind(this), 50);
    this.updateScaleRatio = (0, _lodash.debounce)(this.updateScaleRatio.bind(this), 500);
    this.mjpegStreamCheckInterval = null;
  }

  /**
   * Calculates the ratio that the image is being scaled by
   */
  updateScaleRatio() {
    const screenshotImg = this.screenshotEl.querySelector('img');

    // now update scale ratio
    this.setState({
      scaleRatio: this.props.windowSize.width / screenshotImg.offsetWidth
    });
  }
  updateSourceTreeWidth() {
    // the idea here is to keep track of the screenshot image width. if it has
    // too much space to the right or bottom, adjust the max-width of the
    // screenshot container so the source tree flex adjusts to always fill the
    // remaining space. This keeps everything looking tight.
    if (!this.screenAndSourceEl) {
      return;
    }
    const screenshotBox = this.screenAndSourceEl.querySelector('#screenshotContainer');
    const img = this.screenAndSourceEl.querySelector('#screenshotContainer img#screenshot');
    if (!img) {
      return;
    }
    const imgRect = img.getBoundingClientRect();
    const screenshotRect = screenshotBox.getBoundingClientRect();
    screenshotBox.style.flexBasis = `${imgRect.width}px`;
    if (imgRect.height < screenshotRect.height) {
      // get what the img width would be if it fills screenshot box height
      const attemptedWidth = screenshotRect.height / imgRect.height * imgRect.width;
      screenshotBox.style.maxWidth = attemptedWidth > MAX_SCREENSHOT_WIDTH ? `${MAX_SCREENSHOT_WIDTH}px` : `${attemptedWidth}px`;
    } else if (imgRect.width < screenshotRect.width) {
      screenshotBox.style.maxWidth = `${imgRect.width}px`;
    }
    this.updateScaleRatio();
  }
  componentDidMount() {
    const curHeight = window.innerHeight;
    const curWidth = window.innerWidth;
    const needsResize = curHeight < MIN_HEIGHT || curWidth < MIN_WIDTH;
    if (!this.didInitialResize && needsResize) {
      const newWidth = curWidth < MIN_WIDTH ? MIN_WIDTH : curWidth;
      const newHeight = curHeight < MIN_HEIGHT ? MIN_HEIGHT : curHeight;
      // resize width to something sensible for using the inspector on first run
      window.resizeTo(newWidth, newHeight);
    }
    this.didInitialResize = true;
    // setInterval(() => {
    //   this.props.applyClientMethod({methodName: 'getPageSource', ignoreResult: true});
    // }, 8000);
    this.props.applyClientMethod({
      methodName: 'getPageSource',
      ignoreResult: true
    });
    this.props.getSavedActionFramework();
    this.props.runKeepAliveLoop();
    window.addEventListener('resize', this.updateSourceTreeWidth);
    this.props.setSessionTime(Date.now());
    if (this.props.mjpegScreenshotUrl) {
      this.mjpegStreamCheckInterval = setInterval(this.checkMjpegStream.bind(this), MJPEG_STREAM_CHECK_INTERVAL);
    }
  }
  async checkMjpegStream() {
    const {
      mjpegScreenshotUrl,
      isAwaitingMjpegStream,
      setAwaitingMjpegStream
    } = this.props;
    const img = new Image();
    img.src = mjpegScreenshotUrl;
    let imgReady = false;
    try {
      await img.decode();
      imgReady = true;
    } catch (ign) {}
    if (imgReady && isAwaitingMjpegStream) {
      setAwaitingMjpegStream(false);
      this.updateSourceTreeWidth();
    } else if (!imgReady && !isAwaitingMjpegStream) {
      setAwaitingMjpegStream(true);
    }
  }
  componentDidUpdate() {
    const {
      screenshot
    } = this.props;
    // only update when the screenshot changed, not for any other kind of
    // update
    if (screenshot !== this.lastScreenshot) {
      this.updateSourceTreeWidth();
      this.lastScreenshot = screenshot;
    }
  }
  componentWillUnmount() {
    if (this.mjpegStreamCheckInterval) {
      clearInterval(this.mjpegStreamCheckInterval);
      this.mjpegStreamCheckInterval = null;
    }
  }
  screenshotInteractionChange(mode) {
    const {
      selectScreenshotInteractionMode,
      clearSwipeAction
    } = this.props;
    clearSwipeAction(); // When the action changes, reset the swipe action
    selectScreenshotInteractionMode(mode);
  }
  render() {
    const {
      screenshot,
      screenshotError,
      selectedElement = {},
      quitSession,
      showRecord,
      screenshotInteractionMode,
      visibleCommandMethod,
      selectedInteractionMode,
      selectInteractionMode,
      setVisibleCommandResult,
      showKeepAlivePrompt,
      keepSessionAlive,
      sourceXML,
      t,
      visibleCommandResult,
      mjpegScreenshotUrl,
      isAwaitingMjpegStream,
      toggleShowCentroids,
      showCentroids,
      isGestureEditorVisible,
      toggleShowAttributes,
      isSourceRefreshOn
    } = this.props;
    const {
      path
    } = selectedElement;
    const showScreenshot = screenshot && !screenshotError || mjpegScreenshotUrl && (!isSourceRefreshOn || !isAwaitingMjpegStream);
    let screenShotControls = /*#__PURE__*/_react.default.createElement("div", {
      className: _Inspector.default['screenshot-controls']
    }, /*#__PURE__*/_react.default.createElement(_antd.Space, {
      size: "middle"
    }, /*#__PURE__*/_react.default.createElement(_antd.Tooltip, {
      title: t(showCentroids ? 'Hide Element Handles' : 'Show Element Handles'),
      placement: "topRight"
    }, /*#__PURE__*/_react.default.createElement(_antd.Switch, {
      checkedChildren: /*#__PURE__*/_react.default.createElement(_icons.CheckCircleOutlined, null),
      unCheckedChildren: /*#__PURE__*/_react.default.createElement(_icons.CloseCircleOutlined, null),
      defaultChecked: false,
      onChange: () => toggleShowCentroids(),
      disabled: isGestureEditorVisible
    })), /*#__PURE__*/_react.default.createElement(ButtonGroup, {
      value: screenshotInteractionMode
    }, /*#__PURE__*/_react.default.createElement(_antd.Tooltip, {
      title: t('Select Elements')
    }, /*#__PURE__*/_react.default.createElement(_antd.Button, {
      icon: /*#__PURE__*/_react.default.createElement(_icons.SelectOutlined, null),
      onClick: () => {
        this.screenshotInteractionChange(SELECT);
      },
      type: screenshotInteractionMode === SELECT ? _AntdTypes.BUTTON.PRIMARY : _AntdTypes.BUTTON.DEFAULT,
      disabled: isGestureEditorVisible
    })), /*#__PURE__*/_react.default.createElement(_antd.Tooltip, {
      title: t('Swipe By Coordinates')
    }, /*#__PURE__*/_react.default.createElement(_antd.Button, {
      icon: /*#__PURE__*/_react.default.createElement(_icons.SwapRightOutlined, null),
      onClick: () => {
        this.screenshotInteractionChange(SWIPE);
      },
      type: screenshotInteractionMode === SWIPE ? _AntdTypes.BUTTON.PRIMARY : _AntdTypes.BUTTON.DEFAULT,
      disabled: isGestureEditorVisible
    })), /*#__PURE__*/_react.default.createElement(_antd.Tooltip, {
      title: t('Tap By Coordinates')
    }, /*#__PURE__*/_react.default.createElement(_antd.Button, {
      icon: /*#__PURE__*/_react.default.createElement(_icons.ScanOutlined, null),
      onClick: () => {
        this.screenshotInteractionChange(TAP);
      },
      type: screenshotInteractionMode === TAP ? _AntdTypes.BUTTON.PRIMARY : _AntdTypes.BUTTON.DEFAULT,
      disabled: isGestureEditorVisible
    })), /*#__PURE__*/_react.default.createElement(_antd.Tooltip, {
      title: t('LongPress')
    }, /*#__PURE__*/_react.default.createElement(_antd.Button, {
      icon: /*#__PURE__*/_react.default.createElement(_icons.InfoOutlined, null),
      onClick: () => {
        this.screenshotInteractionChange(LONGPRESS);
      },
      type: screenshotInteractionMode === LONGPRESS ? _AntdTypes.BUTTON.PRIMARY : _AntdTypes.BUTTON.DEFAULT,
      disabled: isGestureEditorVisible
    })), /*#__PURE__*/_react.default.createElement(_antd.Tooltip, {
      title: t('drag_and_drop')
    }, /*#__PURE__*/_react.default.createElement(_antd.Button, {
      icon: /*#__PURE__*/_react.default.createElement(_icons.DragOutlined, null),
      onClick: () => {
        this.screenshotInteractionChange(DRAG_AND_DROP);
      },
      type: screenshotInteractionMode === DRAG_AND_DROP ? _AntdTypes.BUTTON.PRIMARY : _AntdTypes.BUTTON.DEFAULT,
      disabled: isGestureEditorVisible
    })), /*#__PURE__*/_react.default.createElement(_antd.Tooltip, {
      title: t('Double Tap')
    }, /*#__PURE__*/_react.default.createElement(_antd.Button, {
      icon: /*#__PURE__*/_react.default.createElement(_icons.UpCircleOutlined, null),
      onClick: () => {
        this.screenshotInteractionChange(DOUBLE_TAP);
      },
      type: screenshotInteractionMode === DOUBLE_TAP ? _AntdTypes.BUTTON.PRIMARY : _AntdTypes.BUTTON.DEFAULT
    })), /*#__PURE__*/_react.default.createElement(_antd.Tooltip, {
      title: t('Zoom In and Zoom Out')
    }, /*#__PURE__*/_react.default.createElement(_antd.Button, {
      icon: /*#__PURE__*/_react.default.createElement(_icons.ShrinkOutlined, null),
      onClick: () => {
        this.screenshotInteractionChange(ZOOMIN);
      },
      type: screenshotInteractionMode === ZOOMIN ? _AntdTypes.BUTTON.PRIMARY : _AntdTypes.BUTTON.DEFAULT,
      disabled: isGestureEditorVisible
    })), /*#__PURE__*/_react.default.createElement(_antd.Tooltip, {
      title: t('Slider')
    }, /*#__PURE__*/_react.default.createElement(_antd.Button, {
      icon: /*#__PURE__*/_react.default.createElement(_icons.SlidersOutlined, null),
      onClick: () => {
        this.screenshotInteractionChange(SLIDE);
      },
      type: screenshotInteractionMode === SLIDE ? _AntdTypes.BUTTON.PRIMARY : _AntdTypes.BUTTON.DEFAULT,
      disabled: isGestureEditorVisible
    })))));
    let main = /*#__PURE__*/_react.default.createElement("div", {
      className: _Inspector.default['inspector-main'],
      ref: el => {
        this.screenAndSourceEl = el;
      }
    }, /*#__PURE__*/_react.default.createElement("div", {
      id: "screenshotContainer",
      className: _Inspector.default['screenshot-container'],
      ref: el => {
        this.screenshotEl = el;
      }
    }, screenShotControls, showScreenshot && /*#__PURE__*/_react.default.createElement(_Screenshot.default, _extends({}, this.props, {
      scaleRatio: this.state.scaleRatio
    })), screenshotError && t('couldNotObtainScreenshot', {
      screenshotError
    }), !showScreenshot && /*#__PURE__*/_react.default.createElement(_antd.Spin, {
      size: "large",
      spinning: true
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: _Inspector.default.screenshotBox
    }))), /*#__PURE__*/_react.default.createElement("div", {
      id: "sourceTreeContainer",
      className: _Inspector.default['interaction-tab-container']
    }, showRecord && /*#__PURE__*/_react.default.createElement(_RecordedActions.default, this.props), /*#__PURE__*/_react.default.createElement(_antd.Tabs, {
      activeKey: selectedInteractionMode,
      size: "small",
      onChange: tab => selectInteractionMode(tab),
      items: [{
        label: t('Source'),
        key: _shared.INTERACTION_MODE.SOURCE,
        children: /*#__PURE__*/_react.default.createElement("div", {
          className: "action-row"
        }, /*#__PURE__*/_react.default.createElement("div", {
          id: "selectedElementContainer",
          className: `${_Inspector.default['interaction-tab-container']} ${_Inspector.default['element-detail-container']} action-col`
        }, /*#__PURE__*/_react.default.createElement(_antd.Card, {
          title: /*#__PURE__*/_react.default.createElement("span", null, /*#__PURE__*/_react.default.createElement(_icons.TagOutlined, null), " ", t('selectedElement')),
          className: _Inspector.default['selected-element-card']
        }, path && /*#__PURE__*/_react.default.createElement(_SelectedElement.default, this.props), !path && /*#__PURE__*/_react.default.createElement("i", null, t('selectElementInSource')))))
      }, {
        label: t('Commands'),
        key: _shared.INTERACTION_MODE.COMMANDS,
        children: /*#__PURE__*/_react.default.createElement(_antd.Card, {
          title: /*#__PURE__*/_react.default.createElement("span", null, /*#__PURE__*/_react.default.createElement(_icons.ThunderboltOutlined, null), " ", t('Execute Commands')),
          className: _Inspector.default['interaction-tab-card']
        }, /*#__PURE__*/_react.default.createElement(_Commands.default, this.props))
      }, {
        label: t('Gestures'),
        key: _shared.INTERACTION_MODE.GESTURES,
        children: isGestureEditorVisible ? /*#__PURE__*/_react.default.createElement(_antd.Card, {
          title: /*#__PURE__*/_react.default.createElement("span", null, /*#__PURE__*/_react.default.createElement(_icons.HighlightOutlined, null), " ", t('Gesture Builder')),
          className: _Inspector.default['interaction-tab-card']
        }, /*#__PURE__*/_react.default.createElement(_GestureEditor.default, this.props)) : /*#__PURE__*/_react.default.createElement(_antd.Card, {
          title: /*#__PURE__*/_react.default.createElement("span", null, /*#__PURE__*/_react.default.createElement(_icons.HighlightOutlined, null), " ", t('Saved Gestures')),
          className: _Inspector.default['interaction-tab-card']
        }, /*#__PURE__*/_react.default.createElement(_SavedGestures.default, this.props))
      }, {
        label: t('Session Information'),
        key: _shared.INTERACTION_MODE.SESSION_INFO,
        children: /*#__PURE__*/_react.default.createElement(_antd.Card, {
          title: /*#__PURE__*/_react.default.createElement("span", null, /*#__PURE__*/_react.default.createElement(_icons.InfoCircleOutlined, null), " ", t('Session Information')),
          className: _Inspector.default['interaction-tab-card']
        }, /*#__PURE__*/_react.default.createElement(_SessionInfo.default, this.props))
      }]
    })));
    return /*#__PURE__*/_react.default.createElement("div", {
      className: _Inspector.default['inspector-container']
    }, /*#__PURE__*/_react.default.createElement(_HeaderButtons.default, this.props), main, /*#__PURE__*/_react.default.createElement(_antd.Modal, {
      title: t('Session Inactive'),
      open: showKeepAlivePrompt,
      onOk: () => keepSessionAlive(),
      onCancel: () => quitSession(),
      okText: t('Keep Session Running'),
      cancelText: t('Quit Session')
    }, /*#__PURE__*/_react.default.createElement("p", null, t('Your session is about to expire'))), /*#__PURE__*/_react.default.createElement(_antd.Modal, {
      title: t('methodCallResult', {
        methodName: visibleCommandMethod
      }),
      open: !!visibleCommandResult,
      onOk: () => setVisibleCommandResult(null),
      onCancel: () => setVisibleCommandResult(null)
    }, /*#__PURE__*/_react.default.createElement("pre", null, /*#__PURE__*/_react.default.createElement("code", null, visibleCommandResult))));
  }
}
exports.default = Inspector;
},{"./shared":"components/Inspector/shared.js","./Screenshot":"components/Inspector/Screenshot.js","./HeaderButtons":"components/Inspector/HeaderButtons.js","./SelectedElement":"components/Inspector/SelectedElement.js","./Source":"components/Inspector/Source.js","./Inspector.css":"components/Inspector/Inspector.css","./RecordedActions":"components/Inspector/RecordedActions.js","./Commands":"components/Inspector/Commands.js","./SavedGestures":"components/Inspector/SavedGestures.js","./GestureEditor":"components/Inspector/GestureEditor.js","./SessionInfo":"components/Inspector/SessionInfo.js","../../polyfills":"polyfills/index.js","../AntdTypes":"components/AntdTypes.js"}],"containers/InspectorPage.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactRedux = require("react-redux");
var _util = require("../util");
var InspectorActions = _interopRequireWildcard(require("../actions/Inspector"));
var _Inspector2 = _interopRequireDefault(require("../components/Inspector/Inspector"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function mapStateToProps(state) {
  return state.inspector;
}
var _default = (0, _util.withTranslation)(_Inspector2.default, (0, _reactRedux.connect)(mapStateToProps, InspectorActions));
exports.default = _default;
},{"../util":"util.js","../actions/Inspector":"actions/Inspector.js","../components/Inspector/Inspector":"components/Inspector/Inspector.js"}],"components/Spinner/Spinner.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');
module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
module.exports = {
  "container": "_container_afc3f",
  "loader": "_loader_afc3f",
  "load1": "_load1_afc3f"
};
},{"_css_loader":"../../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"components/Spinner/Spinner.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _Spinner = _interopRequireDefault(require("./Spinner.css"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const Spinner = () => /*#__PURE__*/_react.default.createElement("div", {
  className: _Spinner.default.container
}, /*#__PURE__*/_react.default.createElement("div", {
  className: _Spinner.default.loader
}));
var _default = Spinner;
exports.default = _default;
},{"./Spinner.css":"components/Spinner/Spinner.css"}],"routes.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactRouterDom = require("react-router-dom");
var _App = _interopRequireDefault(require("./containers/App"));
var _SessionPage = _interopRequireDefault(require("./containers/SessionPage"));
var _InspectorPage = _interopRequireDefault(require("./containers/InspectorPage"));
var _Spinner = _interopRequireDefault(require("./components/Spinner/Spinner"));
var _polyfills = require("./polyfills");
var _i18nextConfig = _interopRequireDefault(require("../configs/i18next.config.renderer"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
_polyfills.ipcRenderer.on('appium-language-changed', (event, message) => {
  if (_i18nextConfig.default.language !== message.language) {
    _i18nextConfig.default.changeLanguage(message.language);
  }
});
var _default = () => /*#__PURE__*/_react.default.createElement(_react.Suspense, {
  fallback: /*#__PURE__*/_react.default.createElement(_Spinner.default, null)
}, /*#__PURE__*/_react.default.createElement(_App.default, null, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Switch, null, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
  exact: true,
  path: "/"
}, /*#__PURE__*/_react.default.createElement(_SessionPage.default, null)), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
  path: "/session"
}, /*#__PURE__*/_react.default.createElement(_SessionPage.default, null)), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
  path: "/inspector"
}, /*#__PURE__*/_react.default.createElement(_InspectorPage.default, null)))));
exports.default = _default;
},{"./containers/App":"containers/App.js","./containers/SessionPage":"containers/SessionPage.js","./containers/InspectorPage":"containers/InspectorPage.js","./components/Spinner/Spinner":"components/Spinner/Spinner.js","./polyfills":"polyfills/index.js","../configs/i18next.config.renderer":"../configs/i18next.config.renderer.js"}],"containers/Root.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactRedux = require("react-redux");
var _reactRouterDom = require("react-router-dom");
var _routes = _interopRequireDefault(require("../routes"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
class Root extends _react.Component {
  render() {
    const {
      store,
      history
    } = this.props;
    return /*#__PURE__*/_react.default.createElement(_reactRedux.Provider, {
      store: store
    }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Router, {
      history: history
    }, /*#__PURE__*/_react.default.createElement(_routes.default, null)));
  }
}
exports.default = Root;
},{"../routes":"routes.js"}],"components/ErrorBoundary/ErrorMessage.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');
module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
module.exports = {
  "errorMessage": "_errorMessage_e36f2",
  "copyTraceBtn": "_copyTraceBtn_e36f2"
};
},{"_css_loader":"../../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"components/ErrorBoundary/ErrorMessage.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _antd = require("antd");
var _icons = require("@ant-design/icons");
var _ErrorMessage = _interopRequireDefault(require("./ErrorMessage.css"));
var _AntdTypes = require("../AntdTypes");
var _util = require("../../util");
var _polyfills = require("../../polyfills");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const CREATE_ISSUE_URL = 'https://github.com/appium/appium-inspector/issues/new/choose';
const ErrorMessage = ({
  error,
  copyTrace,
  t
}) => /*#__PURE__*/_react.default.createElement("div", {
  className: _ErrorMessage.default.errorMessage
}, /*#__PURE__*/_react.default.createElement(_antd.Alert, {
  message: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, t('Unexpected Error:'), " ", /*#__PURE__*/_react.default.createElement("code", {
    children: error.message
  })),
  type: _AntdTypes.ALERT.ERROR,
  showIcon: true,
  description: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, t('Please report this issue at:'), "\xA0", /*#__PURE__*/_react.default.createElement("a", {
    onClick: e => e.preventDefault() || _polyfills.shell.openExternal(CREATE_ISSUE_URL),
    children: CREATE_ISSUE_URL
  }), /*#__PURE__*/_react.default.createElement("br", null), t('Full error trace:'), /*#__PURE__*/_react.default.createElement(_antd.Tooltip, {
    title: t('Copy Error Trace')
  }, /*#__PURE__*/_react.default.createElement(_antd.Button, {
    size: "small",
    className: _ErrorMessage.default.copyTraceBtn,
    onClick: copyTrace(error.stack),
    icon: /*#__PURE__*/_react.default.createElement(_icons.CopyOutlined, null)
  })), /*#__PURE__*/_react.default.createElement("pre", {
    children: error.stack
  }))
}));
var _default = (0, _util.withTranslation)(ErrorMessage);
exports.default = _default;
},{"./ErrorMessage.css":"components/ErrorBoundary/ErrorMessage.css","../AntdTypes":"components/AntdTypes.js","../../util":"util.js","../../polyfills":"polyfills/index.js"}],"components/ErrorBoundary/ErrorBoundary.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _ErrorMessage = _interopRequireDefault(require("./ErrorMessage"));
var _polyfills = require("../../polyfills");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const copyTrace = trace => {
  _polyfills.clipboard.writeText(trace);
};
class ErrorBoundary extends _react.default.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null
    };
  }
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return {
      error
    };
  }
  render() {
    const {
      error
    } = this.state;
    if (error) {
      return /*#__PURE__*/_react.default.createElement(_ErrorMessage.default, {
        error: error,
        copyTrace: copyTrace
      });
    }
    return this.props.children;
  }
}
exports.default = ErrorBoundary;
},{"./ErrorMessage":"components/ErrorBoundary/ErrorMessage.js","../../polyfills":"polyfills/index.js"}],"actions/Updater.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SET_UPDATE_STATE = void 0;
exports.setUpdateState = setUpdateState;
const SET_UPDATE_STATE = 'SET_UPDATE_STATE';
exports.SET_UPDATE_STATE = SET_UPDATE_STATE;
function setUpdateState(updateState) {
  return dispatch => {
    dispatch({
      type: SET_UPDATE_STATE,
      updateState
    });
  };
}
},{}],"actions/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var inspectorActions = _interopRequireWildcard(require("./Inspector"));
var sessionActions = _interopRequireWildcard(require("./Session"));
var updaterActions = _interopRequireWildcard(require("./Updater"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var _default = {
  ...inspectorActions,
  ...sessionActions,
  ...updaterActions
};
exports.default = _default;
},{"./Inspector":"actions/Inspector.js","./Session":"actions/Session.js","./Updater":"actions/Updater.js"}],"reducers/Session.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = session;
var _lodash = _interopRequireWildcard(require("lodash"));
var _formatJson = _interopRequireDefault(require("format-json"));
var _Session = require("../actions/Session");
var _antd = require("antd");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const visibleProviders = []; // Pull this from "electron-settings"
const server = {
  local: {},
  remote: {},
  advanced: {}
};
for (const serverName of _lodash.default.keys(_Session.ServerTypes)) {
  server[serverName] = {};
}

// Make sure there's always at least one cap
const INITIAL_STATE = {
  savedSessions: [],
  tabKey: 'new',
  serverType: _Session.ServerTypes.remote,
  visibleProviders,
  server: {
    local: {},
    remote: {},
    sauce: {
      dataCenter: 'us-west-1'
    },
    headspin: {},
    browserstack: {},
    lambdatest: {},
    advanced: {},
    bitbar: {},
    kobiton: {},
    perfecto: {},
    pcloudy: {},
    testingbot: {},
    experitest: {},
    roboticmobi: {},
    remotetestkit: {}
  },
  attachSessId: null,
  // Make sure there's always at least one cap
  caps: [{
    type: 'text'
  }],
  isCapsDirty: true,
  gettingSessions: false,
  runningAppiumSessions: [],
  isEditingDesiredCapsName: false,
  isEditingDesiredCaps: false,
  isValidCapsJson: true,
  isValidatingCapsJson: false,
  isAddingCloudProvider: false,
  addVendorPrefixes: true
};
let nextState;

// returns false if the attachSessId is not present in the runningSessions list
const isAttachSessIdValid = (runningSessions, attachSessId) => {
  if (!attachSessId || !runningSessions) {
    return false;
  }
  for (const session of runningSessions) {
    if (session.id === attachSessId) {
      return true;
    }
  }
  return false;
};
function session(state = INITIAL_STATE, action) {
  switch (action.type) {
    case _Session.NEW_SESSION_REQUESTED:
      return {
        ...state,
        newSessionRequested: true
      };
    case _Session.NEW_SESSION_LOADING:
      nextState = {
        ...state,
        newSessionLoading: true
      };
      return (0, _lodash.omit)(nextState, 'newSessionRequested');
    case _Session.NEW_SESSION_DONE:
      return (0, _lodash.omit)(state, 'newSessionLoading');
    case _Session.ADD_CAPABILITY:
      return {
        ...state,
        caps: [...state.caps, {
          type: 'text'
        }]
      };
    case _Session.REMOVE_CAPABILITY:
      return {
        ...state,
        caps: state.caps.filter((cap, index) => index !== action.index),
        isCapsDirty: true
      };
    case _Session.SET_CAPABILITY_PARAM:
      return {
        ...state,
        isCapsDirty: true,
        caps: state.caps.map((cap, index) => index !== action.index ? cap : {
          ...cap,
          [action.name]: action.value
        })
      };
    case _Session.SET_CAPS_AND_SERVER:
      nextState = {
        ...state,
        server: action.server,
        serverType: action.serverType,
        caps: action.caps,
        capsUUID: action.uuid,
        capsName: action.name
      };
      return (0, _lodash.omit)(nextState, 'isCapsDirty');
    case _Session.SAVE_SESSION_REQUESTED:
      nextState = {
        ...state,
        saveSessionRequested: true
      };
      return (0, _lodash.omit)(nextState, 'showSaveAsModal');
    case _Session.SAVE_SESSION_DONE:
      return (0, _lodash.omit)(state, ['saveSessionRequested', 'saveAsText']);
    case _Session.GET_SAVED_SESSIONS_REQUESTED:
      return {
        ...state,
        getSavedSessionsRequested: true
      };
    case _Session.GET_SAVED_SESSIONS_DONE:
      nextState = {
        ...state,
        savedSessions: action.savedSessions || []
      };
      return (0, _lodash.omit)(nextState, 'getSavedSessionsRequested');
    case _Session.DELETE_SAVED_SESSION_REQUESTED:
      return {
        ...state,
        deletingSession: true
      };
    case _Session.DELETE_SAVED_SESSION_DONE:
      return {
        ...state,
        deletingSession: false,
        capsUUID: null,
        capsName: null
      };
    case _Session.SWITCHED_TABS:
      return {
        ...state,
        tabKey: action.key
      };
    case _Session.SAVE_AS_MODAL_REQUESTED:
      return {
        ...state,
        'showSaveAsModal': true
      };
    case _Session.HIDE_SAVE_AS_MODAL_REQUESTED:
      return (0, _lodash.omit)(state, ['saveAsText', 'showSaveAsModal']);
    case _Session.SET_SAVE_AS_TEXT:
      return {
        ...state,
        saveAsText: action.saveAsText
      };
    case _Session.CHANGE_SERVER_TYPE:
      return {
        ...state,
        serverType: action.serverType
      };
    case _Session.SET_SERVER_PARAM:
      return {
        ...state,
        server: {
          ...state.server,
          [action.serverType]: {
            ...state.server[action.serverType],
            [action.name]: action.value
          }
        }
      };
    case _Session.SET_SERVER:
      return {
        ...state,
        server: {
          ...function extendCurrentServerStateWithNewServerState(currentServerState, newServerState) {
            // Copy current server state and extend it with new server state
            const nextServerState = _lodash.default.cloneDeep(currentServerState || {});

            // Extend each server (sauce, remote, kobiton, etc...)
            for (let serverName of _lodash.default.keys(nextServerState)) {
              nextServerState[serverName] = {
                ...(nextServerState[serverName] || {}),
                ...(newServerState[serverName] || {})
              };
            }
            return nextServerState;
          }(state.server, action.server)
        },
        serverType: action.serverType || _Session.ServerTypes.local
      };
    case _Session.SET_ATTACH_SESS_ID:
      return {
        ...state,
        attachSessId: action.attachSessId
      };
    case _Session.GET_SESSIONS_REQUESTED:
      return {
        ...state,
        gettingSessions: true
      };
    case _Session.GET_SESSIONS_DONE:
      {
        const attachSessId = isAttachSessIdValid(action.sessions, state.attachSessId) ? state.attachSessId : null;
        return {
          ...state,
          gettingSessions: false,
          attachSessId: action.sessions && action.sessions.length > 0 && !attachSessId ? action.sessions[0].id : attachSessId,
          runningAppiumSessions: action.sessions || []
        };
      }
    case _Session.ENABLE_DESIRED_CAPS_NAME_EDITOR:
      return {
        ...state,
        isEditingDesiredCapsName: true,
        desiredCapsName: state.capsName
      };
    case _Session.ABORT_DESIRED_CAPS_NAME_EDITOR:
      return {
        ...state,
        isEditingDesiredCapsName: false,
        desiredCapsName: null
      };
    case _Session.SAVE_DESIRED_CAPS_NAME:
      return {
        ...state,
        isEditingDesiredCapsName: false,
        capsName: action.name
      };
    case _Session.SET_DESIRED_CAPS_NAME:
      return {
        ...state,
        desiredCapsName: action.desiredCapsName
      };
    case _Session.ENABLE_DESIRED_CAPS_EDITOR:
      return {
        ...state,
        isEditingDesiredCaps: true,
        rawDesiredCaps: _formatJson.default.plain(
        // Translate the caps definition to a proper capabilities JS Object
        _lodash.default.reduce(state.caps, (result, obj) => ({
          ...result,
          [obj.name]: obj.value
        }), {})),
        isValidCapsJson: true,
        isValidatingCapsJson: false // Don't start validating JSON until the user has attempted to save the JSON
      };

    case _Session.ABORT_DESIRED_CAPS_EDITOR:
      return {
        ...state,
        isEditingDesiredCaps: false,
        rawDesiredCaps: null
      };
    case _Session.SAVE_RAW_DESIRED_CAPS:
      return {
        ...state,
        isEditingDesiredCaps: false,
        caps: action.caps,
        isCapsDirty: true
      };
    case _Session.SHOW_DESIRED_CAPS_JSON_ERROR:
      return {
        ...state,
        invalidCapsJsonReason: action.message,
        isValidCapsJson: false,
        isValidatingCapsJson: true
      };
    case _Session.SET_RAW_DESIRED_CAPS:
      return {
        ...state,
        rawDesiredCaps: action.rawDesiredCaps,
        isValidCapsJson: action.isValidCapsJson,
        invalidCapsJsonReason: action.invalidCapsJsonReason
      };
    case _Session.IS_ADDING_CLOUD_PROVIDER:
      return {
        ...state,
        isAddingCloudProvider: action.isAddingProvider
      };
    case _Session.SET_PROVIDERS:
      return {
        ...state,
        visibleProviders: action.providers || []
      };
    case _Session.SET_ADD_VENDOR_PREFIXES:
      return {
        ...state,
        addVendorPrefixes: action.addVendorPrefixes
      };
    case _Session.SET_STATE_FROM_URL:
      return {
        ...state,
        server: {
          ...state.server,
          ...(action.state.server || {})
        },
        ...(0, _lodash.omit)(action.state, ['server'])
      };
    case _Session.SET_STATE_FROM_SAVED:
      if (!Object.keys(_Session.ServerTypes).includes(action.state.serverType)) {
        _antd.notification.error({
          message: `Failed to load session: ${action.state.serverType} is not a valid server type`
        });
        return state;
      }
      if (![...state.visibleProviders, _Session.ServerTypes.local, _Session.ServerTypes.remote].includes(action.state.serverType)) {
        state.visibleProviders.push(action.state.serverType);
      }
      return {
        ...state,
        ...action.state,
        filePath: action.filePath
      };
    default:
      return {
        ...state
      };
  }
}
},{"../actions/Session":"actions/Session.js"}],"reducers/Inspector.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = inspector;
var _lodash = require("lodash");
var _Inspector = require("../actions/Inspector");
var _shared = require("../components/Inspector/shared");
const DEFAULT_FRAMEWORK = 'java';
const NATIVE_APP = 'NATIVE_APP';
const INITIAL_STATE = {
  savedGestures: [],
  driver: null,
  keepAliveInterval: null,
  showKeepAlivePrompt: false,
  userWaitTimeout: null,
  lastActiveMoment: null,
  expandedPaths: ['0'],
  isRecording: false,
  isSourceRefreshOn: true,
  showRecord: false,
  showBoilerplate: false,
  recordedActions: [],
  actionFramework: DEFAULT_FRAMEWORK,
  sessionDetails: {},
  isGestureEditorVisible: false,
  isLocatorTestModalVisible: false,
  isSiriCommandModalVisible: false,
  siriCommandValue: '',
  showCentroids: false,
  locatorTestStrategy: 'id',
  locatorTestValue: '',
  isSearchingForElements: false,
  assignedVarCache: {},
  screenshotInteractionMode: _shared.SCREENSHOT_INTERACTION_MODE.SELECT,
  searchedForElementBounds: null,
  selectedCommandGroup: null,
  selectedCommandSubGroup: null,
  selectedInteractionMode: _shared.INTERACTION_MODE.SOURCE,
  appMode: _shared.APP_MODE.NATIVE,
  mjpegScreenshotUrl: null,
  pendingCommand: null,
  findElementsExecutionTimes: [],
  isFindingElementsTimes: false,
  isFindingLocatedElementInSource: false,
  visibleCommandResult: null,
  visibleCommandMethod: null,
  isAwaitingMjpegStream: true,
  showSourceAttrs: false
};
let nextState;

/**
 * Look up an element in the source with the provided path
 */
function findElementByPath(path, source) {
  let selectedElement = source;
  for (let index of path.split('.')) {
    selectedElement = selectedElement.children[index];
  }
  return {
    ...selectedElement
  };
}
function inspector(state = INITIAL_STATE, action) {
  switch (action.type) {
    case _Inspector.SET_SOURCE_AND_SCREENSHOT:
      return {
        ...state,
        contexts: action.contexts,
        contextsError: action.contextsError,
        currentContext: action.currentContext || NATIVE_APP,
        currentContextError: action.currentContextError,
        source: action.source,
        sourceXML: action.sourceXML,
        sourceError: action.sourceError,
        screenshot: action.screenshot,
        screenshotError: action.screenshotError,
        windowSize: action.windowSize,
        windowSizeError: action.windowSizeError,
        findElementsExecutionTimes: []
      };
    case _Inspector.QUIT_SESSION_REQUESTED:
      return {
        ...state,
        methodCallInProgress: true,
        isQuittingSession: true
      };
    case _Inspector.QUIT_SESSION_DONE:
      return {
        ...INITIAL_STATE
      };
    case _Inspector.SESSION_DONE:
      return {
        ...state,
        isSessionDone: true,
        methodCallInProgress: false
      };
    case _Inspector.SELECT_ELEMENT:
      return {
        ...state,
        selectedElement: findElementByPath(action.path, state.source),
        selectedElementPath: action.path,
        selectedElementSearchInProgress: true,
        elementInteractionsNotAvailable: false,
        findElementsExecutionTimes: []
      };
    case _Inspector.UNSELECT_ELEMENT:
      return {
        ...state,
        selectedElement: undefined,
        selectedElementPath: null,
        selectedElementId: null,
        selectedElementVariableName: null,
        selectedElementVariableType: null,
        selectedElementSearchInProgress: false
      };
    case _Inspector.SELECT_CENTROID:
      return {
        ...state,
        selectedCentroid: action.path
      };
    case _Inspector.UNSELECT_CENTROID:
      return (0, _lodash.omit)(state, 'selectedCentroid');
    case _Inspector.SET_SELECTED_ELEMENT_ID:
      return {
        ...state,
        selectedElementId: action.elementId,
        selectedElementVariableName: action.variableName,
        selectedElementVariableType: action.variableType,
        selectedElementSearchInProgress: false,
        findElementsExecutionTimes: []
      };
    case _Inspector.SET_INTERACTIONS_NOT_AVAILABLE:
      return {
        ...state,
        elementInteractionsNotAvailable: true,
        selectedElementSearchInProgress: false
      };
    case _Inspector.SELECT_HOVERED_ELEMENT:
      return {
        ...state,
        hoveredElement: findElementByPath(action.path, state.source)
      };
    case _Inspector.UNSELECT_HOVERED_ELEMENT:
      return (0, _lodash.omit)(state, 'hoveredElement');
    case _Inspector.SELECT_HOVERED_CENTROID:
      return {
        ...state,
        hoveredCentroid: action.path
      };
    case _Inspector.UNSELECT_HOVERED_CENTROID:
      return (0, _lodash.omit)(state, 'hoveredCentroid');
    case _Inspector.METHOD_CALL_REQUESTED:
      return {
        ...state,
        methodCallInProgress: true
      };
    case _Inspector.METHOD_CALL_DONE:
      return {
        ...state,
        methodCallInProgress: false
      };
    case _Inspector.SET_EXPANDED_PATHS:
      return {
        ...state,
        expandedPaths: action.paths,
        findElementsExecutionTimes: []
      };
    case _Inspector.START_RECORDING:
      return {
        ...state,
        isRecording: true,
        showRecord: true
      };
    case _Inspector.PAUSE_RECORDING:
      return {
        ...state,
        isRecording: false,
        showRecord: state.recordedActions.length > 0
      };
    case _Inspector.CLEAR_RECORDING:
      return {
        ...state,
        recordedActions: []
      };
    case _Inspector.SET_ACTION_FRAMEWORK:
      return {
        ...state,
        actionFramework: action.framework || DEFAULT_FRAMEWORK
      };
    case _Inspector.RECORD_ACTION:
      return {
        ...state,
        recordedActions: [...state.recordedActions, {
          action: action.action,
          params: action.params
        }]
      };
    case _Inspector.ADD_ASSIGNED_VAR_CACHE:
      return {
        ...state,
        assignedVarCache: {
          ...state.assignedVarCache,
          [action.varName]: true
        }
      };
    case _Inspector.CLEAR_ASSIGNED_VAR_CACHE:
      return {
        ...state,
        assignedVarCache: []
      };
    case _Inspector.CLOSE_RECORDER:
      return {
        ...state,
        showRecord: false
      };
    case _Inspector.SET_SHOW_BOILERPLATE:
      return {
        ...state,
        showBoilerplate: action.show
      };
    case _Inspector.SET_SESSION_DETAILS:
      return {
        ...state,
        sessionDetails: action.sessionDetails,
        driver: action.driver,
        appMode: action.mode,
        mjpegScreenshotUrl: action.mjpegScreenshotUrl
      };
    case _Inspector.SHOW_LOCATOR_TEST_MODAL:
      return {
        ...state,
        isLocatorTestModalVisible: true
      };
    case _Inspector.HIDE_LOCATOR_TEST_MODAL:
      return {
        ...state,
        isLocatorTestModalVisible: false
      };
    case _Inspector.SHOW_SIRI_COMMAND_MODAL:
      return {
        ...state,
        isSiriCommandModalVisible: true
      };
    case _Inspector.HIDE_SIRI_COMMAND_MODAL:
      return {
        ...state,
        isSiriCommandModalVisible: false
      };
    case _Inspector.SET_SIRI_COMMAND_VALUE:
      return {
        ...state,
        siriCommandValue: action.siriCommandValue
      };
    case _Inspector.SET_LOCATOR_TEST_STRATEGY:
      return {
        ...state,
        locatorTestStrategy: action.locatorTestStrategy
      };
    case _Inspector.SET_LOCATOR_TEST_VALUE:
      return {
        ...state,
        locatorTestValue: action.locatorTestValue
      };
    case _Inspector.SEARCHING_FOR_ELEMENTS:
      return {
        ...state,
        locatedElements: null,
        locatedElementsExecutionTime: null,
        locatorTestElement: null,
        isSearchingForElements: true
      };
    case _Inspector.SEARCHING_FOR_ELEMENTS_COMPLETED:
      return {
        ...state,
        locatedElements: action.elements,
        locatedElementsExecutionTime: action.executionTime,
        isSearchingForElements: false
      };
    case _Inspector.GET_FIND_ELEMENTS_TIMES:
      return {
        ...state,
        isFindingElementsTimes: true
      };
    case _Inspector.GET_FIND_ELEMENTS_TIMES_COMPLETED:
      return {
        ...state,
        findElementsExecutionTimes: action.findElementsExecutionTimes,
        isFindingElementsTimes: false
      };
    case _Inspector.SET_LOCATOR_TEST_ELEMENT:
      return {
        ...state,
        locatorTestElement: action.elementId
      };
    case _Inspector.FINDING_ELEMENT_IN_SOURCE:
      return {
        ...state,
        isFindingLocatedElementInSource: true
      };
    case _Inspector.FINDING_ELEMENT_IN_SOURCE_COMPLETED:
      return {
        ...state,
        isFindingLocatedElementInSource: false
      };
    case _Inspector.CLEAR_SEARCH_RESULTS:
      return {
        ...state,
        locatedElements: null,
        isFindingLocatedElementInSource: false
      };
    case _Inspector.SET_SCREENSHOT_INTERACTION_MODE:
      return {
        ...state,
        screenshotInteractionMode: action.screenshotInteractionMode
      };
    case _Inspector.SET_SWIPE_START:
      return {
        ...state,
        swipeStart: {
          x: action.swipeStartX,
          y: action.swipeStartY
        }
      };
    case _Inspector.SET_SWIPE_END:
      return {
        ...state,
        swipeEnd: {
          x: action.swipeEndX,
          y: action.swipeEndY
        }
      };
    case _Inspector.SET_SWIPE_START1:
      return {
        ...state,
        swipeStart1: {
          x: action.swipeStartX,
          y: action.swipeStartY
        }
      };
    case _Inspector.SET_SWIPE_END1:
      return {
        ...state,
        swipeEnd1: {
          x: action.swipeEndX,
          y: action.swipeEndY
        }
      };
    case _Inspector.CLEAR_SWIPE_ACTION:
      return {
        ...state,
        swipeStart: null,
        swipeEnd: null,
        swipeStart1: null,
        swipeEnd1: null
      };
    case _Inspector.SET_SEARCHED_FOR_ELEMENT_BOUNDS:
      return {
        ...state,
        searchedForElementBounds: {
          location: action.location,
          size: action.size
        }
      };
    case _Inspector.CLEAR_SEARCHED_FOR_ELEMENT_BOUNDS:
      return {
        ...state,
        searchedForElementBounds: null
      };
    case _Inspector.PROMPT_KEEP_ALIVE:
      return {
        ...state,
        showKeepAlivePrompt: true
      };
    case _Inspector.HIDE_PROMPT_KEEP_ALIVE:
      return {
        ...state,
        showKeepAlivePrompt: false
      };
    case _Inspector.SELECT_COMMAND_GROUP:
      return {
        ...state,
        selectedCommandGroup: action.group
      };
    case _Inspector.SELECT_COMMAND_SUB_GROUP:
      return {
        ...state,
        selectedCommandSubGroup: action.group
      };
    case _Inspector.SELECT_INTERACTION_MODE:
      return {
        ...state,
        selectedInteractionMode: action.interaction
      };
    case _Inspector.SET_APP_MODE:
      return {
        ...state,
        appMode: action.mode
      };
    case _Inspector.SET_SHOW_CENTROIDS:
      return {
        ...state,
        showCentroids: action.show
      };
    case _Inspector.ENTERING_COMMAND_ARGS:
      return {
        ...state,
        pendingCommand: {
          commandName: action.commandName,
          command: action.command,
          args: []
        }
      };
    case _Inspector.SET_COMMAND_ARG:
      return {
        ...state,
        pendingCommand: {
          ...state.pendingCommand,
          args: Object.assign([], state.pendingCommand.args, {
            [action.index]: action.value
          }) // Replace 'value' at 'index'
        }
      };

    case _Inspector.CANCEL_PENDING_COMMAND:
      return {
        ...state,
        pendingCommand: null
      };
    case _Inspector.SET_CONTEXT:
      return {
        ...state,
        currentContext: action.context
      };
    case _Inspector.SET_KEEP_ALIVE_INTERVAL:
      return {
        ...state,
        keepAliveInterval: action.keepAliveInterval
      };
    case _Inspector.SET_USER_WAIT_TIMEOUT:
      return {
        ...state,
        userWaitTimeout: null
      };
    case _Inspector.SET_LAST_ACTIVE_MOMENT:
      return {
        ...state,
        lastActiveMoment: action.lastActiveMoment
      };
    case _Inspector.SET_VISIBLE_COMMAND_RESULT:
      return {
        ...state,
        visibleCommandResult: action.result,
        visibleCommandMethod: action.methodName
      };
    case _Inspector.SET_SESSION_TIME:
      return {
        ...state,
        sessionStartTime: action.sessionStartTime
      };
    case _Inspector.SET_APP_ID:
      return {
        ...state,
        appId: action.appId
      };
    case _Inspector.SET_SERVER_STATUS:
      return {
        ...state,
        status: action.status
      };
    case _Inspector.SET_AWAITING_MJPEG_STREAM:
      return {
        ...state,
        isAwaitingMjpegStream: action.isAwaiting
      };
    case _Inspector.SHOW_GESTURE_EDITOR:
      return {
        ...state,
        isGestureEditorVisible: true
      };
    case _Inspector.HIDE_GESTURE_EDITOR:
      return {
        ...state,
        isGestureEditorVisible: false
      };
    case _Inspector.GET_SAVED_GESTURES_REQUESTED:
      return {
        ...state,
        getSavedGesturesRequested: true
      };
    case _Inspector.GET_SAVED_GESTURES_DONE:
      nextState = {
        ...state,
        savedGestures: action.savedGestures || []
      };
      return (0, _lodash.omit)(nextState, 'getSavedGesturesRequested');
    case _Inspector.DELETE_SAVED_GESTURES_REQUESTED:
      return {
        ...state,
        deleteGesture: action.deleteGesture
      };
    case _Inspector.DELETE_SAVED_GESTURES_DONE:
      return (0, _lodash.omit)(state, 'deleteGesture');
    case _Inspector.SET_LOADED_GESTURE:
      return {
        ...state,
        loadedGesture: action.loadedGesture
      };
    case _Inspector.REMOVE_LOADED_GESTURE:
      return (0, _lodash.omit)(state, 'loadedGesture');
    case _Inspector.SHOW_GESTURE_ACTION:
      return {
        ...state,
        showGesture: action.showGesture
      };
    case _Inspector.HIDE_GESTURE_ACTION:
      return (0, _lodash.omit)(state, 'showGesture');
    case _Inspector.SELECT_TICK_ELEMENT:
      return {
        ...state,
        selectedTick: action.selectedTick
      };
    case _Inspector.UNSELECT_TICK_ELEMENT:
      return (0, _lodash.omit)(state, 'selectedTick');
    case _Inspector.SET_GESTURE_TAP_COORDS_MODE:
      return {
        ...state,
        tickCoordinates: {
          x: action.x,
          y: action.y
        }
      };
    case _Inspector.CLEAR_TAP_COORDINATES:
      return (0, _lodash.omit)(state, 'tickCoordinates');
    case _Inspector.TOGGLE_SHOW_ATTRIBUTES:
      return {
        ...state,
        showSourceAttrs: !state.showSourceAttrs
      };
    case _Inspector.TOGGLE_REFRESHING_STATE:
      return {
        ...state,
        isSourceRefreshOn: !state.isSourceRefreshOn
      };
    default:
      return {
        ...state
      };
  }
}
},{"../actions/Inspector":"actions/Inspector.js","../components/Inspector/shared":"components/Inspector/shared.js"}],"reducers/Updater.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = session;
var _Updater = require("../actions/Updater");
const INITIAL_STATE = {};
function session(state = INITIAL_STATE, action) {
  switch (action.type) {
    case _Updater.SET_UPDATE_STATE:
      return {
        ...action.updateState
      };
    default:
      return {
        ...state
      };
  }
}
},{"../actions/Updater":"actions/Updater.js"}],"reducers/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createRootReducer;
var _toolkit = require("@reduxjs/toolkit");
var _Session = _interopRequireDefault(require("./Session"));
var _Inspector = _interopRequireDefault(require("./Inspector"));
var _Updater = _interopRequireDefault(require("./Updater"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// create our root reducer
function createRootReducer(routerReducer) {
  return (0, _toolkit.combineReducers)({
    router: routerReducer,
    session: _Session.default,
    inspector: _Inspector.default,
    updater: _Updater.default
  });
}
},{"./Session":"reducers/Session.js","./Inspector":"reducers/Inspector.js","./Updater":"reducers/Updater.js"}],"store.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.store = exports.history = void 0;
var _toolkit = require("@reduxjs/toolkit");
var _history = require("history");
var _reduxFirstHistory = require("redux-first-history");
var _actions = _interopRequireDefault(require("./actions"));
var _reducers = _interopRequireDefault(require("./reducers"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const {
  createReduxHistory,
  routerMiddleware,
  routerReducer
} = (0, _reduxFirstHistory.createReduxHistoryContext)({
  history: (0, _history.createHashHistory)()
});
const rootReducer = (0, _reducers.default)(routerReducer);
const store = (0, _toolkit.configureStore)({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => {
    const middleware = getDefaultMiddleware({
      serializableCheck: false
    });

    // Additional development tools
    if (process.env.NODE_ENV === 'development') {
      // Logging Middleware
      const {
        createLogger
      } = require('redux-logger');
      const logger = createLogger({
        level: 'info',
        collapsed: true
      });
      middleware.push(logger);
    }

    // Router Middleware
    middleware.push(routerMiddleware);
    return middleware;
  },
  devTools: process.env.NODE_ENV !== 'development' ? false : {
    actionCreators: {
      ..._actions.default,
      push: _reduxFirstHistory.push
    }
  }
});
exports.store = store;
const history = createReduxHistory(store);
exports.history = history;
},{"./actions":"actions/index.js","./reducers":"reducers/index.js"}],"index.js":[function(require,module,exports) {
"use strict";

var _react = _interopRequireDefault(require("react"));
var _client = require("react-dom/client");
var _Root = _interopRequireDefault(require("./containers/Root"));
var _ErrorBoundary = _interopRequireDefault(require("./components/ErrorBoundary/ErrorBoundary"));
var _store = require("./store");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const container = document.getElementById('root');
const root = (0, _client.createRoot)(container);
root.render( /*#__PURE__*/_react.default.createElement(_ErrorBoundary.default, null, /*#__PURE__*/_react.default.createElement(_Root.default, {
  store: _store.store,
  history: _store.history
})));
if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    const NextRoot = require('./containers/Root').default;
    root.render( /*#__PURE__*/_react.default.createElement(AppContainer, null, /*#__PURE__*/_react.default.createElement(NextRoot, {
      store: _store.store,
      history: _store.history
    })));
  });
}
},{"./containers/Root":"containers/Root.js","./components/ErrorBoundary/ErrorBoundary":"components/ErrorBoundary/ErrorBoundary.js","./store":"store.js"}],"../../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var OVERLAY_ID = '__parcel__error__overlay__';

var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };

  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = process.env.HMR_HOSTNAME || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + process.env.HMR_PORT + '/');
  ws.onmessage = function(event) {
    checkedAssets = {};
    assetsToAccept = [];

    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function(asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function(asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();

        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });

        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) { // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      }
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');

      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);

      removeErrorOverlay();

      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;

  overlay.innerHTML = (
    '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' +
      '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' +
      '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' +
      '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' +
      '<pre>' + stackTrace.innerHTML + '</pre>' +
    '</div>'
  );

  return overlay;

}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || (Array.isArray(dep) && dep[dep.length - 1] === id)) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;

  var cached = bundle.cache[id];

  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id)
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}

},{}]},{},["../../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
=======
process.env.HMR_PORT=0;process.env.HMR_HOSTNAME="localhost";parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"Suti":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.shell=exports.settings=exports.remote=exports.log=exports.ipcRenderer=exports.i18NextBackendOptions=exports.i18NextBackend=exports.clipboard=void 0;const e={clipboard:{writeText:e=>navigator.clipboard.writeText(e)},shell:{openExternal:e=>window.open(e,"")},remote:{getCurrentWindow:()=>({getSize:()=>[window.innerWidth,window.innerHeight]})},ipcRenderer:{on:e=>{console.warn(`Cannot listen for IPC event ${e} in browser context`)}},fs:null,util:null};class t{has(e){return null!==this.get(e)}set(e,t){return localStorage.setItem(e,JSON.stringify(t))}get(e){return JSON.parse(localStorage.getItem(e))}getSync(e){return this.get(e)}}const r=console;exports.log=r;const n=new t;exports.settings=n;const{clipboard:o,shell:s,remote:i,ipcRenderer:l}=e;exports.ipcRenderer=l,exports.remote=i,exports.shell=s,exports.clipboard=o;const a=require("i18next-chained-backend").default;exports.i18NextBackend=a;const c={backends:[require("i18next-localstorage-backend").default,require("i18next-http-backend").default],backendOptions:[{},{loadPath:"./locales/{{lng}}/{{ns}}.json"}]};exports.i18NextBackendOptions=c;
},{}],"HFEx":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),Object.defineProperty(exports,"clipboard",{enumerable:!0,get:function(){return t.clipboard}}),Object.defineProperty(exports,"fs",{enumerable:!0,get:function(){return u.default}}),Object.defineProperty(exports,"i18NextBackend",{enumerable:!0,get:function(){return o.default}}),exports.i18NextBackendOptions=void 0,Object.defineProperty(exports,"ipcRenderer",{enumerable:!0,get:function(){return t.ipcRenderer}}),Object.defineProperty(exports,"log",{enumerable:!0,get:function(){return r.default}}),Object.defineProperty(exports,"remote",{enumerable:!0,get:function(){return t.remote}}),Object.defineProperty(exports,"settings",{enumerable:!0,get:function(){return n.default}}),Object.defineProperty(exports,"shell",{enumerable:!0,get:function(){return t.shell}}),Object.defineProperty(exports,"util",{enumerable:!0,get:function(){return i.default}});var e=l(require("path")),t=require("electron"),r=l(require("electron-log")),n=l(require("electron-settings")),o=l(require("i18next-fs-backend")),u=l(require("fs")),i=l(require("util"));function l(e){return e&&e.__esModule?e:{default:e}}const c={loadPath:e.default.join(__dirname,"locales/{{lng}}/{{ns}}.json"),addPath:e.default.join(__dirname,"locales/{{lng}}/{{ns}}.json"),jsonIndent:2};exports.i18NextBackendOptions=c;
},{}],"yhbL":[function(require,module,exports) {
"use strict";let e,t,r,s,o,p,x,i,n,l;function c(){return!!process.env.BUILD_BROWSER||"undefined"!=typeof navigator&&!/electron/i.test(navigator.userAgent)}Object.defineProperty(exports,"__esModule",{value:!0}),exports.util=exports.shell=exports.settings=exports.remote=exports.log=exports.ipcRenderer=exports.i18NextBackendOptions=exports.i18NextBackend=exports.fs=exports.clipboard=void 0,exports.util=l,exports.fs=n,exports.i18NextBackendOptions=i,exports.i18NextBackend=x,exports.ipcRenderer=p,exports.remote=o,exports.shell=s,exports.clipboard=r,exports.settings=t,exports.log=e,c()?(({log:e,settings:t,clipboard:r,shell:s,remote:o,ipcRenderer:p,i18NextBackend:x,i18NextBackendOptions:i,fs:n,util:l}=require("./browser")),exports.log=e,exports.settings=t,exports.clipboard=r,exports.shell=s,exports.remote=o,exports.ipcRenderer=p,exports.i18NextBackend=x,exports.i18NextBackendOptions=i,exports.fs=n,exports.util=l):(({log:e,settings:t,clipboard:r,shell:s,remote:o,ipcRenderer:p,i18NextBackend:x,i18NextBackendOptions:i,fs:n,util:l}=require("./electron")),exports.log=e,exports.settings=t,exports.clipboard=r,exports.shell=s,exports.remote=o,exports.ipcRenderer=p,exports.i18NextBackend=x,exports.i18NextBackendOptions=i,exports.fs=n,exports.util=l);
},{"./browser":"Suti","./electron":"HFEx"}],"wFy3":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=exports.SET_SAVED_GESTURES=exports.SESSION_SERVER_TYPE=exports.SESSION_SERVER_PARAMS=exports.SERVER_ARGS=exports.SAVED_SESSIONS=exports.SAVED_FRAMEWORK=void 0,exports.getSetting=_,exports.setSetting=n;var S=require("../renderer/polyfills");const t="SAVED_SESSIONS";exports.SAVED_SESSIONS=t;const E="SET_SAVED_GESTURES";exports.SET_SAVED_GESTURES=E;const e="SERVER_ARGS";exports.SERVER_ARGS=e;const s="SESSION_SERVER_PARAMS";exports.SESSION_SERVER_PARAMS=s;const R="SESSION_SERVER_TYPE";exports.SESSION_SERVER_TYPE=R;const o="SAVED_FRAMEWORK";exports.SAVED_FRAMEWORK=o;const r={[t]:[],[E]:[],[e]:null,[s]:null,[R]:null,[o]:"java"};async function _(t){return await S.settings.has(t)?await S.settings.get(t):r[t]}async function n(t,E){await S.settings.set(t,E)}var A=S.settings;exports.default=A;
},{"../renderer/polyfills":"yhbL"}],"rZZj":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0,exports.getI18NextOptions=n;var e=t(require("../shared/settings"));function t(e){return e&&e.__esModule?e:{default:e}}const a={platform:process.platform,languages:["de","en","es-ES","fa","hi","it","ja","ko","kn","ml-IN","pa-IN","pl","pt-BR","pt-PT","ru","te","uk","zh-CN"],fallbackLng:"en",namespace:"translation"};function n(t){return{backend:t,interpolation:{escapeValue:!1},lng:e.default&&e.default.getSync("PREFERRED_LANGUAGE")||"en",fallbackLng:a.fallbackLng,whitelist:a.languages}}var l=a;exports.default=l;
},{"../shared/settings":"wFy3"}],"YOqM":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.addVendorPrefixes=h,exports.getOptimalXPath=m,exports.withTranslation=g,exports.xmlToJSON=d;var e=i(require("xpath")),t=require("react-i18next"),n=i(require("lodash")),r=require("./polyfills"),a=i(require("../configs/app.config")),o=require("@xmldom/xmldom");function i(e){return e&&e.__esModule?e:{default:e}}const l=["platformName","browserName","browserVersion","acceptInsecureCerts","pageLoadStrategy","proxy","setWindowRect","timeouts","unhandledPromptBehavior"],s=["name","content-desc","id","accessibility-id"],u=["label","name","value"],c=["label","name","value","type"];function d(e){const t=e=>{if(!e||!e.hasChildNodes())return[];const t=[];for(let n=0;n<e.childNodes.length;++n){const r=e.childNodes.item(n);1===r.nodeType&&t.push(r)}return t},r=(e,o="",l=null)=>{const d={};for(let t=0;t<e.attributes.length;++t){const n=e.attributes.item(t);d[n.name]=n.value}const g=n.default.isNil(l)?"":`${o?o+".":""}${l}`,h=a?f(i,e,u):"",N=a?p(i,e,c):"";return{children:t(e).map((e,t)=>r(e,g,t)),tagName:e.tagName,attributes:d,xpath:m(i,e,s),...a?{classChain:h?`**${h}`:""}:{},...a?{predicateString:N||""}:{},path:g}},a=e.includes("XCUIElement"),i=(new o.DOMParser).parseFromString(e),l=t(i)[0]||t(i.documentElement)[0];return l?r(l):{}}function m(t,n,a=["id"]){try{if(!n.tagName||1!==n.nodeType)return"";for(let r of a){const a=n.getAttribute(r);if(a){let i,l=`//${n.tagName||"*"}[@${r}="${a}"]`;try{i=e.default.select(l,t)}catch(o){continue}if(i.length>1){l=`(${l})[${i.indexOf(n)+1}]`}return l}}let l=`/${n.tagName}`;if(n.parentNode){const e=Array.prototype.slice.call(n.parentNode.childNodes,0).filter(e=>1===e.nodeType&&e.tagName===n.tagName);if(e.length>1){l+=`[${e.indexOf(n)+1}]`}}return m(t,n.parentNode,a)+l}catch(i){return r.log.error(`The most optimal XPATH could not be determined because an error was thrown: '${JSON.stringify(i,null,2)}'`),null}}function f(t,n,a){try{if(!n.tagName||1!==n.nodeType||"XCUIElementTypeApplication"===n.tagName)return"";for(let r of a){const a=n.getAttribute(r);if(a){let i,l=`//${n.tagName||"*"}[@${r}="${a}"]`,s=`/${n.tagName||"*"}[\`${r} == "${a}"\`]`;try{i=e.default.select(l,t)}catch(o){continue}if(i.length>1){s=`${s}[${i.indexOf(n)+1}]`}return s}}let l=`/${n.tagName}`;if(n.parentNode){const e=Array.prototype.slice.call(n.parentNode.childNodes,0).filter(e=>1===e.nodeType&&e.tagName===n.tagName);if(e.length>1){l+=`[${e.indexOf(n)+1}]`}}return f(t,n.parentNode,a)+l}catch(i){return r.log.error(`The most optimal '-ios class chain' could not be determined because an error was thrown: '${JSON.stringify(i,null,2)}'`),null}}function p(t,a,o){try{if(!a.tagName||1!==a.nodeType||"XCUIElementTypeApplication"===a.tagName)return"";let s=[],u=[];for(let r of o){const o=a.getAttribute(r);if(n.default.isNil(o)||n.default.isString(o)&&0===o.length)continue;s.push(`@${r}="${o}"`);const l=`//*[${s.join(" and ")}]`;let c;u.push(`${r} == "${o}"`);try{c=e.default.select(l,t)}catch(i){continue}if(1===c.length)return u.join(" AND ")}}catch(l){return r.log.error(`The most optimal '-ios predicate string' could not be determined because an error was thrown: '${JSON.stringify(l,null,2)}'`),null}}function g(e,...r){return n.default.flow(...r,(0,t.withTranslation)(a.default.namespace))(e)}function h(e){return e.map(e=>(l.includes(e.name)||n.default.includes(e.name,":")||(e.name=`appium:${e.name}`),e))}
},{"./polyfills":"yhbL","../configs/app.config":"rZZj"}],"UYUd":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=u(require("react")),r=u(require("prop-types")),t=require("../util");function u(e){return e&&e.__esModule?e:{default:e}}class l extends e.default.Component{render(){const{children:r}=this.props;return e.default.createElement(e.default.Fragment,null,r)}}l.propTypes={children:r.default.element.isRequired};var n=(0,t.withTranslation)(l);exports.default=n;
},{"../util":"YOqM"}],"n676":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.SCREENSHOT_INTERACTION_MODE=exports.RENDER_CENTROID_AS=exports.POINTER_TYPES=exports.INTERACTION_MODE=exports.DEFAULT_ZOOM=exports.DEFAULT_TAP=exports.DEFAULT_SWIPE=exports.DEFAULT_LONGPRESS=exports.DEFAULT_DRAG_AND_DROP=exports.COMMAND_DEFINITIONS=exports.COMMAND_ARG_TYPES=exports.APP_MODE=void 0,exports.getLocators=m,exports.isUnique=n,exports.parseCoordinates=s,exports.percentageToPixels=r,exports.pixelsToPercentage=a;var e=require("@xmldom/xmldom"),t=o(require("xpath"));function o(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!isNaN(e))return parseFloat((e/t*100).toFixed(1),10)}function r(e,t){if(!isNaN(e))return Math.round(t*(e/100))}function s(e){let{bounds:t,x:o,y:a,width:r,height:s}=e.attributes||{};if(t){let e=t.split(/\[|\]|,/).filter(e=>""!==e);const o=parseInt(e[0],10),a=parseInt(e[2],10);return{x1:o,y1:parseInt(e[1],10),x2:a,y2:parseInt(e[3],10)}}return o?{x1:o=parseInt(o,10),y1:a=parseInt(a,10),x2:o+(r=parseInt(r,10)),y2:a+(s=parseInt(s,10))}:{}}function n(o,a,r){if(!r)return!0;const s=(new e.DOMParser).parseFromString(r);return t.default.select(`//*[@${o}="${a.replace(/"/g,"")}"]`,s).length<2}const i=[["name","accessibility id"],["content-desc","accessibility id"],["id","id"],["rntestid","id"],["resource-id","id"],["class","class name"],["type","class name"]];function m(e,t){const o={};for(let[a,r]of i){const s=e[a];s&&n(a,s,t)&&(o[r]=e[a])}return o}const d={POINTER_UP:"pointerUp",POINTER_DOWN:"pointerDown",PAUSE:"pause",POINTER_MOVE:"pointerMove"};exports.POINTER_TYPES=d;const N={POINTER_NAME:"finger1",DURATION_1:0,DURATION_2:750,BUTTON:0,ORIGIN:"viewport"};exports.DEFAULT_SWIPE=N;const p={POINTER_NAME1:"finger1",POINTER_NAME2:"finger2",DURATION_1:0,DURATION_2:750,BUTTON:0,ORIGIN:"viewport"};exports.DEFAULT_ZOOM=p;const g={POINTER_NAME:"finger1",DURATION_1:0,DURATION_2:100,BUTTON:0};exports.DEFAULT_TAP=g;const l={LONGPRESS_POINTER_NAME:"finger1",LONGPRESS_DURATION_1:0,LONGPRESS_DURATION_2:1e3,LONGPRESS_BUTTON:0};exports.DEFAULT_LONGPRESS=l;const h={POINTER_NAME:"finger1",DURATION_1:0,DURATION_2:750,BUTTON:0,ORIGIN:"viewport"};exports.DEFAULT_DRAG_AND_DROP=h;const c={CENTROID:"centroid",EXPAND:"expand",OVERLAP:"overlap"};exports.RENDER_CENTROID_AS=c;const T={SELECT:"select",SWIPE:"swipe",TAP:"tap",LONGPRESS:"longpress",DRAG_AND_DROP:"drag_and_drop",DOUBLE_TAP:"double tap",GESTURE:"gesture",ZOOMIN:"zoomin",SLIDE:"slide"};exports.SCREENSHOT_INTERACTION_MODE=T;const E={NATIVE:"native",WEB_HYBRID:"web_hybrid"};exports.APP_MODE=E;const O={STRING:"string",NUMBER:"number",BOOLEAN:"boolean"};exports.COMMAND_ARG_TYPES=O;const{STRING:S,NUMBER:A,BOOLEAN:u}=O,I={Device:{"Execute Script":{Execute:{methodName:"executeScript",args:[["executeScriptCommand",S],["jsonArgument",S]]}},"Android Activity":{"Start Activity":{methodName:"startActivity",args:[["appPackage",S],["appActivity",S],["appWaitPackage",S],["intentAction",S],["intentCategory",S],["intentFlags",S],["optionalIntentArguments",S],["dontStopAppOnReset",S]],refresh:!0},"Current Activity":{methodName:"getCurrentActivity"},"Current Package":{methodName:"getCurrentPackage"}},App:{"Install App":{methodName:"installApp",args:[["appPathOrUrl",S]]},"Is App Installed":{methodName:"isAppInstalled",args:[["appId",S]]},"Background App":{methodName:"background",args:[["timeout",A]],refresh:!0},"Activate App":{methodName:"activateApp",args:[["appId",S]],refresh:!0},"Terminate App":{methodName:"terminateApp",args:[["appId",S]],refresh:!0},"Remove App":{methodName:"removeApp",args:[["appId",S]]},"Get App Strings":{methodName:"getStrings",args:[["language",S],["stringFile",S]],refresh:!0}},Clipboard:{"Get Clipboard":{methodName:"getClipboard"},"Set Clipboard":{methodName:"setClipboard",args:[["clipboardText",S],["contentType",S],["contentLabel",S]]}},File:{"Push File":{methodName:"pushFile",args:[["pathToInstallTo",S],["fileContentString",S]]},"Pull File":{methodName:"pullFile",args:[["pathToPullFrom",S]]},"Pull Folder":{methodName:"pullFolder",args:[["folderToPullFrom",S]]}},Interaction:{Shake:{methodName:"shake"},Lock:{methodName:"lock",args:[["seconds",A]],refresh:!0},Unlock:{methodName:"unlock",refresh:!0},"Is Device Locked":{methodName:"isLocked"},"Rotate Device":{methodName:"rotateDevice",args:[["x",A],["y",A],["radius",A],["rotatation",A],["touchCount",A],["duration",A]],refresh:!0}},Keys:{"Press Key":{methodName:"pressKeyCode",args:[["keyCode",A],["metaState",A],["flags",A]],refresh:!0},"Long Press Key":{methodName:"longPressKeyCode",args:[["keyCode",A],["metaState",A],["flags",A]],refresh:!0},"Hide Keyboard":{methodName:"hideKeyboard",refresh:!0},"Is Keyboard Shown":{methodName:"isKeyboardShown"}},Network:{"Toggle Airplane Mode":{methodName:"toggleAirplaneMode"},"Toggle Data":{methodName:"toggleData"},"Toggle WiFi":{methodName:"toggleWiFi"},"Toggle Location Services":{methodName:"toggleLocationServices"},"Send SMS":{methodName:"sendSMS",args:[["phoneNumber",S],["text",S]]},"GSM Call":{methodName:"gsmCall",args:[["phoneNumber",S],["action",S]]},"GSM Signal":{methodName:"gsmSignal",args:[["signalStrengh",A]]},"GSM Voice":{methodName:"gsmVoice",args:[["state",S]]}},"Performance Data":{"Get Data":{methodName:"getPerformanceData",args:[["packageName",S],["dataType",S],["dataReadTimeout",A]]},"Get Data Types":{methodName:"getPerformanceDataTypes"}},"iOS Simulator":{"Perform Touch Id":{methodName:"touchId",args:[["shouldMatch",u]],refresh:!0},"Toggle Touch Id Enrollment":{methodName:"toggleEnrollTouchId",args:[["shouldEnroll",u]]}},System:{"Open Notifications":{methodName:"openNotifications",refresh:!0},"Get System Time":{methodName:"getDeviceTime"},"Fingerprint (Android)":{methodName:"fingerPrint",args:[["fingerPrintId",A]],refresh:!0}}},Session:{"Session Capabilities":{"Get Session Capabilities":{methodName:"getSession"}},Timeouts:{"Set Timeouts":{methodName:"setTimeouts",args:[["implicitTimeout",A],["pageLoadTimeout",A],["scriptTimeout",A]]}},Orientation:{"Get Orientation":{methodName:"getOrientation"},"Set Orientation":{methodName:"setOrientation",args:[["orientation",S]],refresh:!0}},Geolocation:{"Get Geolocation":{methodName:"getGeoLocation"},"Set Geolocation":{methodName:"setGeoLocation",args:[["latitude",A],["longitude",A],["altitude",A]]}},Logs:{"Get Log Types":{methodName:"getLogTypes"},"Get Logs":{methodName:"getLogs",args:[["logType",S]]}},Settings:{"Update Settings":{methodName:"updateSettings",args:[["settingsJson",S]]},"Get Device Settings":{methodName:"getSettings"}}},Web:{Navigation:{"Go to URL":{methodName:"navigateTo",args:[["url",S]],refresh:!0},"Get URL":{methodName:"getUrl"},Back:{methodName:"back",refresh:!0},Forward:{methodName:"forward",refresh:!0},Refresh:{methodName:"refresh",refresh:!0}}},Context:{Context:{"Get Current Context":{methodName:"getContext"},"Get Context List":{methodName:"getContexts"},"Set Context":{methodName:"switchContext",args:[["name",S]],refresh:!0}},"Window (W3C)":{"Get Window Handle":{methodName:"getWindowHandle"},"Close Window":{methodName:"closeWindow",refresh:!0},"Switch To Window":{methodName:"switchToWindow",args:[["handle",S]],refresh:!0},"Get Window Handles":{methodName:"getWindowHandles"},"New Window":{methodName:"createWindow",args:[["type",S]],refresh:!0}}}};exports.COMMAND_DEFINITIONS=I;const _={SOURCE:"source",COMMANDS:"commands",GESTURES:"gestures",SESSION_INFO:"sessionInfo"};exports.INTERACTION_MODE=_;
},{}],"gNIk":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var t=require("../../components/Inspector/shared");class e{constructor(t,e,r,o,s){this.host=t||"localhost",this.port=e||4723,this.path=r||"/wd/hub",this.caps=s||{},this.https=!!o,this.scheme=o?"https":"http",this.actions=[],this.localVarCount=0,this.localVarCache={},this.lastAssignedVar=null}getTapCoordinatesFromPointerActions(e){const r=e[t.DEFAULT_TAP.POINTER_NAME][0];return{x:r.x,y:r.y}}getSwipeCoordinatesFromPointerActions(e){let r,o;return t.SCREENSHOT_INTERACTION_MODE.SWIPE&&(r=e[t.DEFAULT_SWIPE.POINTER_NAME][0],o=e[t.DEFAULT_SWIPE.POINTER_NAME][2]),t.SCREENSHOT_INTERACTION_MODE.ZOOMIN&&(r=e[t.DEFAULT_ZOOM.POINTER_NAME1][0],o=e[t.DEFAULT_ZOOM.POINTER_NAME2][2]),{x1:r.x,y1:r.y,x2:o.x,y2:o.y}}get serverUrl(){return`${this.scheme}://${this.host}:${this.port}${"/"===this.path?"":this.path}`}get name(){throw new Error("Must implement name getter")}get language(){throw new Error("Must implement language getter")}addAction(t,e){this.actions.push({action:t,params:e})}wrapWithBoilerplate(){throw new Error("Must implement wrapWithBoilerplate")}indent(t,e){let r=t.split("\n"),o="";for(let s=0;s<e;s++)o+=" ";return r.filter(t=>!!t.trim()).map(t=>`${o}${t}`).join("\n")}getCodeString(t=!1){let e="";for(let{action:r,params:o}of this.actions){const t=`codeFor_${r}`;if(!this[t])throw new Error(`Need to implement '${t}()': ${this[t]}`);let s=this[t](...o);s&&(e+=`${s}\n`)}return t?this.wrapWithBoilerplate(e):e}getNewLocalVar(){return this.localVarCount++,`el${this.localVarCount}`}getVarForFind(t,e){const r=`${t}-${e}`;let o=!1;return this.localVarCache[r]||(this.localVarCache[r]=this.getNewLocalVar(),o=!0),this.lastAssignedVar=this.localVarCache[r],[this.localVarCache[r],o]}getVarName(t,e){return e||0===e?`${t}[${e}]`:t}codeFor_findAndAssign(){throw new Error("Need to implement codeFor_findAndAssign")}codeFor_findElement(t,e){let[r,o]=this.getVarForFind(t,e);return o?this.codeFor_findAndAssign(t,e,r):""}codeFor_tap(){throw new Error("Need to implement codeFor_tap")}codeFor_swipe(){throw new Error("Need to implement codeFor_tap")}}exports.default=e;
},{"../../components/Inspector/shared":"n676"}],"rn2A":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=r(require("./framework"));function r(e){return e&&e.__esModule?e:{default:e}}class t extends e.default{get language(){return"js"}wrapWithBoilerplate(e){let r=JSON.stringify(this.caps);return`// Requires the admc/wd client library\n// (npm install wd)\n// Then paste this into a .js file and run with Node 7.6+\n\nconst wd = require('wd');\nconst driver = wd.promiseChainRemote("${this.serverUrl}");\nconst caps = ${r};\n\nasync function main () {\n  await driver.init(caps);\n  await driver.setImplicitWaitTimeout(5000);\n${this.indent(e,2)}\n  await driver.quit();\n}\n\nmain().catch(console.log);\n`}codeFor_executeScript(){return"/* TODO implement executeScript */"}codeFor_findAndAssign(e,r,t,o){let i={xpath:"XPath","accessibility id":"AccessibilityId",id:"Id",name:"Name","class name":"ClassName","-android uiautomator":"AndroidUIAutomator","-android datamatcher":"AndroidDataMatcher","-android viewtag":"unsupported","-ios predicate string":"IosUIAutomation","-ios class chain":"IosClassChain"};if(!i[e])throw new Error(`Strategy ${e} can't be code-gened`);return o?`let ${t} = await driver.elementsBy${i[e]}(${JSON.stringify(r)});`:`let ${t} = await driver.elementBy${i[e]}(${JSON.stringify(r)});`}codeFor_click(e,r){return`await ${this.getVarName(e,r)}.click();`}codeFor_clear(e,r){return`await ${this.getVarName(e,r)}.clear();`}codeFor_sendKeys(e,r,t){return`await ${this.getVarName(e,r)}.sendKeys(${JSON.stringify(t)});`}codeFor_back(){return"await driver.back();"}codeFor_tap(e,r,t){const{x:o,y:i}=this.getTapCoordinatesFromPointerActions(t);return`await (new wd.TouchAction(driver))\n  .tap({x: ${o}, y: ${i}})\n  .perform()\n    `}codeFor_swipe(e,r,t){const{x1:o,y1:i,x2:a,y2:n}=this.getSwipeCoordinatesFromPointerActions(t);return`await (new wd.TouchAction(driver))\n  .press({x: ${o}, y: ${i}})\n  .moveTo({x: ${a}, y: ${n}})\n  .release()\n  .perform()\n    `}codeFor_getCurrentActivity(){return"let activityName = await driver.getCurrentActivity()"}codeFor_getCurrentPackage(){return"let packageName = await driver.getCurrentPackage()"}codeFor_installApp(e,r,t){return`let isAppInstalled = await driver.installApp('${t}');`}codeFor_isAppInstalled(e,r,t){return`driver.isAppInstalled("${t}");`}codeFor_launchApp(){return"await driver.launchApp();"}codeFor_background(e,r,t){return`await driver.background(${t});`}codeFor_closeApp(){return"await driver.closeApp();"}codeFor_reset(){return"await driver.reset();"}codeFor_removeApp(e,r,t){return`await driver.removeApp('${t}');`}codeFor_getStrings(e,r,t,o){return`let appStrings = await driver.getStrings(${t?`${t}, `:""}${o?`"${o}`:""});`}codeFor_getClipboard(){return"let clipboardText = await driver.getClipboard();"}codeFor_setClipboard(e,r,t){return`await driver.setClipboard('${t}')`}codeFor_pressKeyCode(e,r,t,o,i){return`await driver.longPressKeyCode(${t}, ${o}, ${i});`}codeFor_longPressKeyCode(e,r,t,o,i){return`await driver.longPressKeyCode(${t}, ${o}, ${i});`}codeFor_hideKeyboard(){return"await driver.hideKeyboard();"}codeFor_isKeyboardShown(){return"await driver.isKeyboardShown();"}codeFor_pushFile(e,r,t,o){return`await driver.pushFile('${t}', '${o}');`}codeFor_pullFile(e,r,t){return`let fileBase64 = await driver.pullFile('${t}');`}codeFor_pullFolder(e,r,t){return`let fileBase64 = await driver.pullFolder('${t}');`}codeFor_toggleAirplaneMode(){return"await driver.toggleAirplaneMode();"}codeFor_toggleData(){return"await driver.toggleData();"}codeFor_toggleWiFi(){return"await driver.toggleWiFi();"}codeFor_toggleLocationServices(){return"await driver.toggleLocationServices();"}codeFor_sendSMS(e,r,t,o){return`await driver.sendSms('${t}', '${o}');`}codeFor_gsmCall(e,r,t,o){return`await driver.gsmCall('${t}', '${o}');`}codeFor_gsmSignal(e,r,t){return`await driver.gsmSignal(${t});`}codeFor_gsmVoice(e,r,t){return`await driver.gsmVoice('${t}');`}codeFor_shake(){return"await driver.shake();"}codeFor_lock(e,r,t){return`await driver.lock(${t})`}codeFor_unlock(){return"await driver.unlock()"}codeFor_isLocked(){return"let isLocked = await driver.isLocked();"}codeFor_rotateDevice(e,r,t,o,i,a,n,d){return`driver.rotateDevice({x: ${t}, y: ${o}, duration: ${d}, radius: ${i}, rotation: ${a}, touchCount: ${n}});`}codeFor_getPerformanceData(e,r,t,o,i){return`let performanceData = await driver.getPerformanceData('${t}', '${o}', ${i});`}codeFor_getPerformanceDataTypes(){return"let supportedPerformanceDataTypes = await driver.getPerformanceDataTypes();"}codeFor_touchId(e,r,t){return`await driver.touchId(${t});`}codeFor_toggleEnrollTouchId(e,r,t){return`await driver.toggleEnrollTouchId(${t});`}codeFor_openNotifications(){return"await driver.openNotifications();"}codeFor_getDeviceTime(){return"let time = await driver.getDeviceTime();"}codeFor_fingerprint(e,r,t){return`await driver.fingerprint(${t});`}codeFor_getSession(){return"let caps = await driver.getSession();"}codeFor_setTimeouts(){return"/* TODO implement setTimeouts */"}codeFor_getOrientation(){return"let orientation = await driver.getOrientation();"}codeFor_setOrientation(e,r,t){return`await driver.setOrientation('${t}');`}codeFor_getGeoLocation(){return"let location = await driver.getGeoLocation();"}codeFor_setGeoLocation(e,r,t,o,i){return`await driver.setGeoLocation(${t}, ${o}, ${i});`}codeFor_getLogTypes(){return"let getLogTypes = await driver.getLogTypes();"}codeFor_getLogs(e,r,t){return`let logs = await driver.log('${t}');`}codeFor_updateSettings(e,r,t){return`await driver.updateSettings(${t});`}codeFor_getSettings(){return"let settings = await driver.settings();"}codeFor_navigateTo(e){return`driver.get('${e}');`}codeFor_getUrl(){return"let current_url = driver.url();"}codeFor_forward(){return"driver.forward();"}codeFor_refresh(){return"driver.refresh();"}codeFor_getContext(){return"driver.currentContext();"}codeFor_getContexts(){return"driver.contexts();"}codeFor_switchContext(e){return`driver.context('${e}');`}}t.readableName="JS - WD (Promise)";var o=t;exports.default=o;
},{"./framework":"gNIk"}],"Yz7v":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=r(require("./framework"));function r(e){return e&&e.__esModule?e:{default:e}}class t extends e.default{get language(){return"js"}chainifyCode(e){return e.replace(/let .+ = /g,"").replace(/(\n|^)(driver|el[0-9]+)\./g,"\n.").replace(/;\n/g,"\n")}wrapWithBoilerplate(e){let r=JSON.stringify(this.host),t=JSON.stringify(this.caps),i=JSON.stringify(this.scheme),o=JSON.stringify(this.path);return`// Requires the webdriverio client library\n// (npm install webdriverio)\n// Then paste this into a .js file and run with Node:\n// node <file>.js\n\nconst wdio = require('webdriverio');\nasync function main () {\n  const caps = ${t}\n  const driver = await wdio.remote({\n    protocol: ${i},\n    hostname: ${r},\n    port: ${this.port},\n    path: ${o},\n    capabilities: caps\n  });\n${this.indent(e,2)}\n  await driver.deleteSession();\n}\n\nmain().catch(console.log);`}codeFor_executeScript(){return"/* TODO implement executeScript */"}codeFor_findAndAssign(e,r,t,i){switch(e){case"xpath":break;case"accessibility id":r=`~${r}`;break;case"id":r=`${r}`;break;case"name":r=`name=${r}`;break;case"class name":r=`${r}`;break;case"-android uiautomator":case"-android datamatcher":r=`android=${r}`;break;case"-android viewtag":r="android=unsupported";break;case"-ios predicate string":case"-ios class chain":r=`ios=${r}`;break;default:throw new Error(`Can't handle strategy ${e}`)}return i?`let ${t} = await driver.$$(${JSON.stringify(r)});`:`let ${t} = await driver.$(${JSON.stringify(r)});`}codeFor_click(e,r){return`await ${this.getVarName(e,r)}.click();`}codeFor_clear(e,r){return`await ${this.getVarName(e,r)}.clearValue();`}codeFor_sendKeys(e,r,t){return`await ${this.getVarName(e,r)}.setValue(${JSON.stringify(t)});`}codeFor_back(){return"await driver.back();"}codeFor_tap(e,r,t){const{x:i,y:o}=this.getTapCoordinatesFromPointerActions(t);return`await driver.touchAction({actions: 'tap', x: ${i}, y: ${o}})`}codeFor_swipe(e,r,t){const{x1:i,y1:o,x2:a,y2:n}=this.getSwipeCoordinatesFromPointerActions(t);return`await driver.touchAction([\n  {action: 'press', x: ${i}, y: ${o}},\n  {action: 'moveTo', x: ${a}, y: ${n}},\n  'release'\n]);`}codeFor_getCurrentActivity(){return"let activityName = await driver.getCurrentActivity();"}codeFor_getCurrentPackage(){return"let packageName = await driver.getCurrentPackage();"}codeFor_installApp(e,r,t){return`await driver.installApp('${t}');`}codeFor_isAppInstalled(e,r,t){return`let isAppInstalled = await driver.isAppInstalled("${t}");`}codeFor_launchApp(){return"await driver.launchApp();"}codeFor_background(e,r,t){return`await driver.background(${t});`}codeFor_closeApp(){return"await driver.closeApp();"}codeFor_reset(){return"await driver.reset();"}codeFor_removeApp(e,r,t){return`await driver.removeApp('${t}')`}codeFor_getStrings(e,r,t,i){return`let appStrings = await driver.getStrings(${t?`${t}, `:""}${i?`"${i}`:""});`}codeFor_getClipboard(e,r,t){return`let clipboardText = await driver.getClipboard(${t?`${t}, `:""});`}codeFor_setClipboard(e,r,t){return`await driver.setClipboard('${t}')`}codeFor_pressKeyCode(e,r,t,i,o){return`await driver.longPressKeyCode(${t}, ${i}, ${o});`}codeFor_longPressKeyCode(e,r,t,i,o){return`await driver.longPressKeyCode(${t}, ${i}, ${o});`}codeFor_hideKeyboard(){return"await driver.hideKeyboard();"}codeFor_isKeyboardShown(){return"let isKeyboardShown = await driver.isKeyboardShown();"}codeFor_pushFile(e,r,t,i){return`await driver.pushFile('${t}', '${i}');`}codeFor_pullFile(e,r,t){return`let data = await driver.pullFile('${t}');`}codeFor_pullFolder(e,r,t){return`let data = await driver.pullFolder('${t}');`}codeFor_toggleAirplaneMode(){return"await driver.toggleAirplaneMode();"}codeFor_toggleData(){return"await driver.toggleData();"}codeFor_toggleWiFi(){return"await driver.toggleWiFi();"}codeFor_toggleLocationServices(){return"await driver.toggleLocationServices();"}codeFor_sendSMS(e,r,t,i){return`await driver.sendSms("${t}", "${i}");`}codeFor_gsmCall(e,r,t,i){return`await driver.gsmCall("${t}", "${i}");`}codeFor_gsmSignal(e,r,t){return`await driver.gsmSignal("${t}");`}codeFor_gsmVoice(e,r,t){return`await driver.gsmVoice("${t}");`}codeFor_shake(){return"await driver.shake();"}codeFor_lock(e,r,t){return`await driver.lock(${t});`}codeFor_unlock(){return"await driver.unlock();"}codeFor_isLocked(){return"let isLocked = await driver.isLocked();"}codeFor_rotateDevice(e,r,t,i,o,a,n,d){return`await driver.rotateDevice(${t}, ${i}, ${o}, ${a}, ${n}, ${d});`}codeFor_getPerformanceData(e,r,t,i,o){return`let performanceData = driver.getPerformanceData("${t}", "${i}", ${o});`}codeFor_getPerformanceDataTypes(){return"let performanceDataTypes = await driver.getPerformanceDataTypes()"}codeFor_touchId(e,r,t){return`await driver.touchId(${t});`}codeFor_toggleEnrollTouchId(e,r,t){return`await driver.toggleEnrollTouchId(${t});`}codeFor_openNotifications(){return"await driver.openNotifications();"}codeFor_getDeviceTime(){return"let time = await driver.getDeviceTime();"}codeFor_fingerprint(e,r,t){return`await driver.fingerprint(${t});`}codeFor_getSession(){return"let caps = await driver.getSession();"}codeFor_setTimeouts(){return"/* TODO implement setTimeouts */"}codeFor_setCommandTimeout(){return"// Not supported: setCommandTimeout"}codeFor_getOrientation(){return"let orientation = await driver.getOrientation();"}codeFor_setOrientation(e,r,t){return`await driver.setOrientation("${t}");`}codeFor_getGeoLocation(){return"let location = await driver.getGeoLocation();"}codeFor_setGeoLocation(e,r,t,i,o){return`await driver.setGeoLocation({latitude: ${t}, longitude: ${i}, altitude: ${o}});`}codeFor_getLogTypes(){return"let getLogTypes = await driver.getLogTypes();"}codeFor_getLogs(e,r,t){return`let logs = await driver.getLogs('${t}');`}codeFor_updateSettings(e,r,t){return`await driver.updateSettings(${t});`}codeFor_getSettings(){return"let settings = await driver.getSettings();"}codeFor_navigateTo(e,r,t){return`await driver.navigateTo('${t}');`}codeFor_getUrl(){return"let current_url = await driver.getUrl();"}codeFor_forward(){return"await driver.forward();"}codeFor_refresh(){return"await driver.refresh();"}codeFor_getContext(){return"let context = await driver.getContext();"}codeFor_getContexts(){return"let contexts = await driver.getContexts();"}codeFor_switchContext(e,r,t){return`await driver.switchContext('${t}');`}}t.readableName="JS - Webdriver.io";var i=t;exports.default=i;
},{"./framework":"gNIk"}],"GnTK":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=t(require("./framework"));function t(e){return e&&e.__esModule?e:{default:e}}class r extends e.default{get language(){return"js"}get type(){if(this.caps&&this.caps.platformName){const e=this.caps.platformName.toLowerCase();if("windows"===e)return"win";if(["android","androiddriver"].includes(e))return"mob";if(["ios","iosdriver"].includes(e))return"mob"}return"mob"}wrapWithBoilerplate(e){return e&&e.includes("mob.open")?this.caps.browserName="__chrome_or_safari__":this.caps.app="__application_path_or_name__",`// Requires the Oxygen HQ client library\n// (npm install oxygen-cli -g)\n// Then paste this into a .js file and run with:\n// oxygen <file>.js\nconst capabilities = ${JSON.stringify(this.caps,null,2)};\nconst appiumUrl = ${JSON.stringify(`${this.scheme}://${this.host}:${this.port}${this.path}`)};\n${this.type}.init(capabilities, appiumUrl);\n\n${e}\n\n`}codeFor_executeScript(e,t,r){return`${this.type}.execute(${r})`}codeFor_findAndAssign(e,t,r,i){switch(e){case"xpath":break;case"accessibility id":t=`~${t}`;break;case"id":t=`id=${t}`;break;case"name":t=`name=${t}`;break;case"class name":t=`css=${t}`;break;case"-android uiautomator":case"-android datamatcher":t=`android=${t}`;break;case"-ios predicate string":case"-ios class chain":t=`ios=${t}`;break;default:throw new Error(`Can't handle strategy ${e}`)}return i?`let ${r} = mob.findElements(${JSON.stringify(t)});`:`let ${r} = mob.findElement(${JSON.stringify(t)});`}codeFor_click(e,t){return`${this.type}.click(${this.getVarName(e,t)});`}codeFor_clear(e,t){return`${this.type}.clear(${this.getVarName(e,t)});`}codeFor_sendKeys(e,t,r){return`${this.type}.type(${this.getVarName(e,t)}, ${JSON.stringify(r)});`}codeFor_back(){return`${this.type}.back();`}codeFor_tap(e,t,r){const{x:i,y:o}=this.getTapCoordinatesFromPointerActions(r);return`${this.type}.tap(${i}, ${o});`}codeFor_swipe(e,t,r){const{x1:i,y1:o,x2:s,y2:n}=this.getSwipeCoordinatesFromPointerActions(r);return`${this.type}.swipeScreen(${i}, ${o}, ${s}, ${n});`}codeFor_getCurrentActivity(){return`let activityName = ${this.type}.getCurrentActivity();`}codeFor_getCurrentPackage(){return`let packageName = ${this.type}.getCurrentPackage();`}codeFor_installApp(e,t,r){return`${this.type}.installApp('${r}');`}codeFor_isAppInstalled(e,t,r){return`let isAppInstalled = ${this.type}.isAppInstalled("${r}");`}codeFor_launchApp(){return`${this.type}.launchApp();`}codeFor_background(e,t,r){return`${this.type}.getDriver().background(${r});`}codeFor_closeApp(){return`${this.type}.closeApp();`}codeFor_reset(){return`${this.type}.resetApp();`}codeFor_removeApp(e,t,r){return`${this.type}.removeApp('${r}')`}codeFor_getStrings(e,t,r,i){return`let appStrings = ${this.type}.getDriver().getStrings(${r?`${r}, `:""}${i?`"${i}`:""});`}codeFor_getClipboard(){return`let clipboardText = ${this.type}.getDriver().getClipboard();`}codeFor_setClipboard(e,t,r){return`${this.type}.getDriver().setClipboard('${r}')`}codeFor_pressKeyCode(e,t,r){return`${this.type}.pressKeyCode(${r});`}codeFor_longPressKeyCode(e,t,r){return`${this.type}.longPressKeyCode(${r});`}codeFor_hideKeyboard(){return`${this.type}.hideKeyboard();`}codeFor_isKeyboardShown(){return`let isKeyboardShown = ${this.type}.getDriver().isKeyboardShown();`}codeFor_pushFile(e,t,r,i){return`${this.type}.getDriver().pushFile('${r}', '${i}');`}codeFor_pullFile(e,t,r){return`let fileBase64 = ${this.type}.getDriver().pullFile('${r}');`}codeFor_pullFolder(e,t,r){return`let fileBase64 = ${this.type}.getDriver().pullFolder('${r}');`}codeFor_toggleAirplaneMode(){return`${this.type}.getDriver().toggleAirplaneMode();`}codeFor_toggleData(){return`${this.type}.getDriver().toggleData();`}codeFor_toggleWiFi(){return`${this.type}.getDriver().toggleWiFi();`}codeFor_toggleLocationServices(){return`${this.type}.getDriver().toggleLocationServices();`}codeFor_sendSMS(e,t,r,i){return`${this.type}.getDriver().sendSms('${r}', '${i}');`}codeFor_gsmCall(e,t,r,i){return`${this.type}.getDriver().gsmCall('${r}', '${i}');`}codeFor_gsmSignal(e,t,r){return`${this.type}.getDriver().gsmSignal(${r});`}codeFor_gsmVoice(e,t,r){return`${this.type}.getDriver().gsmVoice('${r}');`}codeFor_shake(){return`${this.type}.shake();`}codeFor_lock(e,t,r){return`${this.type}.getDriver().lock(${r});`}codeFor_unlock(){return`${this.type}.getDriver().unlock();`}codeFor_isLocked(){return`let isLocked = ${this.type}.getDriver().isLocked();`}codeFor_rotateDevice(e,t,r,i,o,s,n,a){return`${this.type}.getDriver().rotateDevice({x: ${r}, y: ${i}, duration: ${a}, radius: ${o}, rotation: ${s}, touchCount: ${n}});`}codeFor_getPerformanceData(e,t,r,i,o){return`let performanceData = ${this.type}.getDriver().getPerformanceData('${r}', '${i}', ${o});`}codeFor_getPerformanceDataTypes(){return`let supportedPerformanceDataTypes = ${this.type}.getDriver().getPerformanceDataTypes();`}codeFor_touchId(e,t,r){return`${this.type}.getDriver().touchId(${r});`}codeFor_toggleEnrollTouchId(e,t,r){return`${this.type}.getDriver().toggleEnrollTouchId(${r});`}codeFor_openNotifications(){return`${this.type}.getDriver().openNotifications();`}codeFor_getDeviceTime(){return`let time = ${this.type}.getDeviceTime();`}codeFor_fingerprint(e,t,r){return`${this.type}.getDriver().fingerPrint(${r});`}codeFor_getSession(){return`let caps = ${this.type}.getDriver().capabilities;`}codeFor_setTimeouts(){return"/* TODO implement setTimeouts */"}codeFor_setCommandTimeout(){return"// Not supported: setCommandTimeout"}codeFor_getOrientation(){return`let orientation = ${this.type}.getDriver().getOrientation();`}codeFor_setOrientation(e,t,r){return`${this.type}.getDriver().setOrientation("${r}");`}codeFor_getGeoLocation(){return`let location = ${this.type}.getDriver().getGeoLocation();`}codeFor_setGeoLocation(e,t,r,i,o){return`${this.type}.getDriver().setGeoLocation({latitude: ${r}, longitude: ${i}, altitude: ${o}});`}codeFor_getLogTypes(){return`let getLogTypes = ${this.type}.getDriver().getLogTypes();`}codeFor_getLogs(e,t,r){return`let logs = ${this.type}.getDriver().getLogs('${r}');`}codeFor_updateSettings(e,t,r){return`${this.type}.getDriver().updateSettings(${r});`}codeFor_getSettings(){return`let settings = ${this.type}.getDriver().getSettings();`}}r.readableName="JS - Oxygen HQ";var i=r;exports.default=i;
},{"./framework":"gNIk"}],"tI3Y":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=t(require("./framework")),r=t(require("lodash"));function t(e){return e&&e.__esModule?e:{default:e}}class o extends e.default{get language(){return"java"}wrapWithBoilerplate(e){let[r,t]=(()=>{if(!this.caps.platformName)return["unknownPlatform","UnknownDriver"];switch(this.caps.platformName.toLowerCase()){case"ios":return["ios","IOSDriver"];case"android":return["android","AndroidDriver"];default:return["unknownPlatform","UnknownDriver"]}})();return`import io.appium.java_client.MobileElement;\nimport io.appium.java_client.${r}.${t};\nimport junit.framework.TestCase;\nimport org.junit.After;\nimport org.junit.Before;\nimport org.junit.Test;\nimport java.net.MalformedURLException;\nimport java.net.URL;\nimport org.openqa.selenium.remote.DesiredCapabilities;\n\npublic class SampleTest {\n\n  private ${t} driver;\n\n  @Before\n  public void setUp() throws MalformedURLException {\n    DesiredCapabilities desiredCapabilities = new DesiredCapabilities();\n${this.indent(Object.keys(this.caps).map(e=>`desiredCapabilities.setCapability(${JSON.stringify(e)}, ${JSON.stringify(this.caps[e])});`).join("\n"),4)}\n\n    URL remoteUrl = new URL("${this.serverUrl}");\n\n    driver = new ${t}(remoteUrl, desiredCapabilities);\n  }\n\n  @Test\n  public void sampleTest() {\n${this.indent(e,4)}\n  }\n\n  @After\n  public void tearDown() {\n    driver.quit();\n  }\n}\n`}codeFor_executeScript(){return"/* TODO implement executeScript */"}codeFor_findAndAssign(e,r,t,o){let i={xpath:"XPath","accessibility id":"AccessibilityId",id:"Id","class name":"ClassName",name:"Name","-android uiautomator":"AndroidUIAutomator","-android datamatcher":"AndroidDataMatcher","-android viewtag":"AndroidViewTag","-ios predicate string":"IosNsPredicate","-ios class chain":"IosClassChain"};if(!i[e])throw new Error(`Strategy ${e} can't be code-gened`);return o?`List<MobileElement> ${t} = (MobileElement) driver.findElementsBy${i[e]}(${JSON.stringify(r)});`:`MobileElement ${t} = (MobileElement) driver.findElementBy${i[e]}(${JSON.stringify(r)});`}getVarName(e,r){return r||0===r?`${e}.get(${r})`:e}codeFor_click(e,r){return`${this.getVarName(e,r)}.click();`}codeFor_clear(e,r){return`${this.getVarName(e,r)}.clear();`}codeFor_sendKeys(e,r,t){return`${this.getVarName(e,r)}.sendKeys(${JSON.stringify(t)});`}codeFor_back(){return"driver.navigate().back();"}codeFor_tap(e,r,t){const{x:o,y:i}=this.getTapCoordinatesFromPointerActions(t);return`(new TouchAction(driver)).tap(${o}, ${i}).perform()`}codeFor_swipe(e,r,t){const{x1:o,y1:i,x2:n,y2:a}=this.getSwipeCoordinatesFromPointerActions(t);return`(new TouchAction(driver))\n  .press(PointOption.point(${o}, ${i}}))\n  .moveTo(PointOption.point(${n}, ${a}}))\n  .release()\n  .perform();\n  `}codeFor_getCurrentActivity(){return"String activityName = driver.currentActivity()"}codeFor_getCurrentPackage(){return"String packageName = driver.currentPackage()"}codeFor_startActivity(){return"driver."}codeFor_installApp(e,r,t){return`driver.installApp("${t}");`}codeFor_isAppInstalled(e,r,t){return`boolean isAppInstalled = driver.isAppInstalled("${t}");`}codeFor_launchApp(){return"driver.launchApp();"}codeFor_background(e,r,t){return`driver.runAppInBackground(Duration.ofSeconds(${t}));`}codeFor_closeApp(){return"driver.closeApp();"}codeFor_reset(){return"driver.reset();"}codeFor_removeApp(e,r,t){return`driver.removeApp("${t}");`}codeFor_getStrings(e,r,t,o){return`Map<String, String> appStrings = driver.getAppStringMap(${t?`${t}, `:""}${o?`"${o}`:""});`}codeFor_getClipboard(){return"String clipboardText = driver.getClipboardText();"}codeFor_setClipboard(e,r,t){return`driver.setClipboardText("${t}");`}codeFor_pressKeyCode(e,r,t,o,i){return`driver.pressKeyCode(${t}, ${o}, ${i});`}codeFor_longPressKeyCode(e,r,t,o,i){return`driver.longPressKeyCode(${t}, ${o}, ${i});`}codeFor_hideKeyboard(){return"driver.hideKeyboard();"}codeFor_isKeyboardShown(){return"boolean isKeyboardShown = driver.isKeyboardShown();"}codeFor_pushFile(e,r,t,o){return`driver.pushFile("${t}", ${o})`}codeFor_pullFile(e,r,t){return`byte[] fileBase64 = driver.pullFile("${t}");`}codeFor_pullFolder(e,r,t){return`byte[] fileBase64 = driver.pullFolder("${t}");`}codeFor_toggleAirplaneMode(){return"driver.toggleAirplaneMode();"}codeFor_toggleData(){return"driver.toggleData();"}codeFor_toggleWiFi(){return"driver.toggleWifi();"}codeFor_toggleLocationServices(){return"driver.toggleLocationServices();"}codeFor_sendSMS(e,r,t,o){return`driver.sendSMS("${t}", "${o}");`}codeFor_gsmCall(e,r,t,o){return`driver.makeGsmCall("${t}", "${o}");`}codeFor_gsmSignal(e,r,t){return`driver.setGsmSignalStrength("${t}");`}codeFor_gsmVoice(e,r,t){return`driver.setGsmVoice("${t}");`}codeFor_shake(){return"driver.shake();"}codeFor_lock(e,r,t){return`driver.lockDevice(${t});`}codeFor_unlock(){return"driver.unlockDevice()"}codeFor_isLocked(){return"boolean isLocked = driver.isDeviceLocked();"}codeFor_rotateDevice(e,r,t,o,i,n,a,d){return`driver.rotate(new DeviceRotation(${t}, ${o}, ${i}, ${n}, ${a}, ${d}));`}codeFor_getPerformanceData(e,r,t,o,i){return`List<List<Object>> performanceData = driver.getPerformanceData("${t}", "${o}", ${i});`}codeFor_getPerformanceDataTypes(){return"List<String> performanceTypes = driver.getPerformanceDataTypes();"}codeFor_touchId(e,r,t){return`driver.performTouchID(${t});`}codeFor_toggleEnrollTouchId(e,r,t){return`driver.toggleTouchIDEnrollment(${t});`}codeFor_openNotifications(){return"driver.openNotifications();"}codeFor_getDeviceTime(){return"String time = driver.getDeviceTime();"}codeFor_fingerprint(e,r,t){return`driver.fingerPrint(${t});`}codeFor_getSession(){return"Map<String, Object> caps = driver.getSessionDetails();"}codeFor_setTimeouts(){return"/* TODO implement setTimeouts */"}codeFor_getOrientation(){return"ScreenOrientation orientation = driver.getOrientation();"}codeFor_setOrientation(e,r,t){return`driver.rotate("${t}");`}codeFor_getGeoLocation(){return"Location location = driver.location();"}codeFor_setGeoLocation(e,r,t,o,i){return`driver.setLocation(new Location(${t}, ${o}, ${i}));`}codeFor_getLogTypes(){return"Set<String> getLogTypes = driver.manage().logs().getAvailableLogTypes();"}codeFor_getLogs(e,r,t){return`LogEntries logEntries = driver.manage().logs().get("${t}");`}codeFor_updateSettings(e,t,o){try{let e="";for(let[t,i]of r.default.toPairs(JSON.parse(o)))e+=`driver.setSetting("${t}", "${i}");\n`;return e}catch(i){return`// Could not parse: ${o}`}}codeFor_getSettings(){return"Map<String, Object> settings = driver.getSettings();"}codeFor_navigateTo(e,r,t){return`driver.get("${t}");`}codeFor_getUrl(){return"String current_url = driver.getCurrentUrl();"}codeFor_forward(){return"driver.navigate().forward();"}codeFor_refresh(){return"driver.navigate().refresh();"}codeFor_getContext(){return"driver.getContext()"}codeFor_getContexts(){return"driver.getContextHandles();"}codeFor_switchContext(e,r,t){return`driver.context("${t}");`}}o.readableName="Java - JUnit";var i=o;exports.default=i;
},{"./framework":"gNIk"}],"miwa":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=r(require("./framework"));function r(e){return e&&e.__esModule?e:{default:e}}class o extends e.default{get language(){return"python"}getPythonVal(e){return"boolean"==typeof e?e?"True":"False":JSON.stringify(e)}wrapWithBoilerplate(e){return`# This sample code uses the Appium python client v2\n# pip install Appium-Python-Client\n# Then you can paste this into a file and simply run with Python\n\nfrom appium import webdriver\nfrom appium.webdriver.common.appiumby import AppiumBy\n\n# For W3C actions\nfrom selenium.webdriver.common.action_chains import ActionChains\nfrom selenium.webdriver.common.actions import interaction\nfrom selenium.webdriver.common.actions.action_builder import ActionBuilder\nfrom selenium.webdriver.common.actions.pointer_input import PointerInput\n\ncaps = {}\n${Object.keys(this.caps).map(e=>`caps[${JSON.stringify(e)}] = ${this.getPythonVal(this.caps[e])}`).join("\n")}\n\ndriver = webdriver.Remote("${this.serverUrl}", caps)\n\n${e}\ndriver.quit()`}codeFor_executeScript(e,r,o){return`driver.execute_script('${o}')`}codeFor_findAndAssign(e,r,o,t){let i={xpath:"AppiumBy.XPATH","accessibility id":"AppiumBy.ACCESSIBILITY_ID",id:"AppiumBy.ID",name:"AppiumBy.NAME","class name":"AppiumBy.CLASS_NAME","-android uiautomator":"AppiumBy.ANDROID_UIAUTOMATOR","-android datamatcher":"AppiumBy.ANDROID_DATA_MATCHER","-android viewtag":"AppiumBy.ANDROID_VIEWTAG","-ios predicate string":"AppiumBy.IOS_PREDICATE","-ios class chain":"AppiumBy.IOS_CLASS_CHAIN"};if(!i[e])throw new Error(`Strategy ${e} can't be code-gened`);return t?`${o} = driver.find_elements(by=${i[e]}, value=${JSON.stringify(r)})`:`${o} = driver.find_element(by=${i[e]}, value=${JSON.stringify(r)})`}codeFor_click(e,r){return`${this.getVarName(e,r)}.click()`}codeFor_clear(e,r){return`${this.getVarName(e,r)}.clear()`}codeFor_sendKeys(e,r,o){return`${this.getVarName(e,r)}.send_keys(${JSON.stringify(o)})`}codeFor_back(){return"driver.back()"}codeFor_tap(e,r,o){const{x:t,y:i}=this.getTapCoordinatesFromPointerActions(o);return`actions = ActionChains(driver)\nactions.w3c_actions = ActionBuilder(driver, mouse=PointerInput(interaction.POINTER_TOUCH, "touch"))\nactions.w3c_actions.pointer_action.move_to_location(${t}, ${i})\nactions.w3c_actions.pointer_action.pointer_down()\nactions.w3c_actions.pointer_action.pause(0.1)\nactions.w3c_actions.pointer_action.release()\nactions.perform()\n    `}codeFor_swipe(e,r,o){const{x1:t,y1:i,x2:n,y2:c}=this.getSwipeCoordinatesFromPointerActions(o);return`actions = ActionChains(driver)\nactions.w3c_actions = ActionBuilder(driver, mouse=PointerInput(interaction.POINTER_TOUCH, "touch"))\nactions.w3c_actions.pointer_action.move_to_location(${t}, ${i})\nactions.w3c_actions.pointer_action.pointer_down()\nactions.w3c_actions.pointer_action.move_to_location(${n}, ${c})\nactions.w3c_actions.pointer_action.release()\nactions.perform()\n    `}codeFor_getCurrentActivity(){return"activity_name = driver.current_activity"}codeFor_getCurrentPackage(){return"package_name = driver.current_package"}codeFor_installApp(e,r,o){return`driver.install_app('${o}');`}codeFor_isAppInstalled(e,r,o){return`is_app_installed = driver.is_app_installed('${o}');`}codeFor_launchApp(){return"driver.launch_app()"}codeFor_background(e,r,o){return`driver.background_app(${o})`}codeFor_closeApp(){return"driver.close_app()"}codeFor_reset(){return"driver.reset()"}codeFor_removeApp(e,r,o){return`driver.remove_app('${o}');`}codeFor_getStrings(e,r,o,t){return`appStrings = driver.app_strings(${o?`${o}, `:""}${t?`"${t}`:""})`}codeFor_getClipboard(){return"clipboard_text = driver.get_clipboard_text()"}codeFor_setClipboard(e,r,o){return`driver.set_clipboard_text('${o}')`}codeFor_pressKeyCode(e,r,o,t,i){return`driver.press_keycode(${o}, ${t}, ${i});`}codeFor_longPressKeyCode(e,r,o,t,i){return`driver.long_press_keycode(${o}, ${t}, ${i});`}codeFor_hideKeyboard(){return"driver.hide_keyboard()"}codeFor_isKeyboardShown(){return"driver.is_keyboard_shown()"}codeFor_pushFile(e,r,o,t){return`driver.push_file('${o}', '${t}');`}codeFor_pullFile(e,r,o){return`file_base64 = self.driver.pull_file('${o}');`}codeFor_pullFolder(e,r,o){return`file_base64 = self.driver.pull_folder('${o}');`}codeFor_toggleAirplaneMode(){return"# Not supported: toggleAirplaneMode"}codeFor_toggleData(){return"# Not supported: toggleData"}codeFor_toggleWiFi(){return"driver.toggle_wifi()"}codeFor_toggleLocationServices(){return"driver.toggle_location_services();"}codeFor_sendSMS(){return"# Not supported: sendSMS"}codeFor_gsmCall(e,r,o,t){return`driver.make_gsm_call(${o}, ${t})`}codeFor_gsmSignal(e,r,o){return`driver.set_gsm_signal(${o})`}codeFor_gsmVoice(e,r,o){return`driver.set_gsm_voice(${o})`}codeFor_shake(){return"driver.shake();"}codeFor_lock(e,r,o){return`driver.lock(${o});`}codeFor_unlock(){return"driver.unlock();"}codeFor_isLocked(){return"driver.is_locked()"}codeFor_rotateDevice(){return"# Not supported: rotate device"}codeFor_getPerformanceData(e,r,o,t,i){return`driver.get_performance_data('${o}', '${t}', ${i})`}codeFor_getPerformanceDataTypes(){return"driver.get_performance_data_types()"}codeFor_touchId(e,r,o){return`driver.touch_id(${o})`}codeFor_toggleEnrollTouchId(e,r,o){return`driver.toggle_touch_id_enrollment(${o})`}codeFor_openNotifications(){return"driver.open_notifications();"}codeFor_getDeviceTime(){return"time = self.driver.device_time()"}codeFor_fingerprint(e,r,o){return`driver.finger_print(${o})`}codeFor_getSession(){return"desired_caps = self.driver.desired_capabilities()"}codeFor_setTimeouts(){return"# TODO implement setTimeouts"}codeFor_getOrientation(){return"orientation = self.driver.orientation()"}codeFor_setOrientation(e,r,o){return`driver.orientation = "${o}"`}codeFor_getGeoLocation(){return"location = self.driver.location()"}codeFor_setGeoLocation(e,r,o,t,i){return`driver.set_location(${o}, ${t}, ${i})`}codeFor_getLogTypes(){return"log_types = driver.log_types();"}codeFor_getLogs(e,r,o){return`logs = driver.get_log('${o}');`}codeFor_updateSettings(e,r,o){return`driver.update_settings(${o}))`}codeFor_getSettings(){return"settings = driver.get_settings"}codeFor_navigateTo(e,r,o){return`driver.get('${o}')`}codeFor_getUrl(){return"current_url = driver.current_url"}codeFor_forward(){return"driver.forward()"}codeFor_refresh(){return"driver.refresh()"}codeFor_getContext(){return"driver.current_context"}codeFor_getContexts(){return"driver.contexts()"}codeFor_switchContext(e,r,o){return`driver.switch_to.context('${o}')`}}o.readableName="Python";var t=o;exports.default=t;
},{"./framework":"gNIk"}],"NOQI":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=t(require("./framework")),r=t(require("lodash"));function t(e){return e&&e.__esModule?e:{default:e}}class o extends e.default{get language(){return"ruby"}wrapWithBoilerplate(e){return`# This sample code uses the Appium ruby lib core client v5\n# gem install appium_lib_core\n# Then you can paste this into a file and simply run with Ruby\n\nrequire 'appium_lib_core'\n\ncaps = {}\n${Object.keys(this.caps).map(e=>`caps[${JSON.stringify(e)}] = ${JSON.stringify(this.caps[e])}`).join("\n")}\nopts = {\n    server_url: "${this.serverUrl}"\n}\ndriver = Appium::Core.for({caps: caps, appium_lib: opts}).start_driver\n\n${e}\ndriver.quit`}codeFor_executeScript(e,r,t){return`driver.execute_script '${t}'`}codeFor_findAndAssign(e,r,t,o){let i={xpath:":xpath","accessibility id":":accessibility_id",id:":id",name:":name","class name":":class_name","-android uiautomator":":uiautomation","-android datamatcher":":datamatcher","-android viewtag":":viewtag","-ios predicate string":":predicate","-ios class chain":":class_chain"};if(!i[e])throw new Error(`Strategy ${e} can't be code-gened`);return o?`${t} = driver.find_elements ${i[e]}, ${JSON.stringify(r)}`:`${t} = driver.find_element ${i[e]}, ${JSON.stringify(r)}`}codeFor_click(e,r){return`${this.getVarName(e,r)}.click`}codeFor_clear(e,r){return`${this.getVarName(e,r)}.clear`}codeFor_sendKeys(e,r,t){return`${this.getVarName(e,r)}.send_keys ${JSON.stringify(t)}`}codeFor_back(){return"driver.back"}codeFor_tap(e,r,t){const{x:o,y:i}=this.getTapCoordinatesFromPointerActions(t);return`driver\n  .action\n  .move_to_location(${o}, ${i})\n  .pointer_down(:left)\n  .release\n  .perform\n  `}codeFor_swipe(e,r,t){const{x1:o,y1:i,x2:n,y2:d}=this.getSwipeCoordinatesFromPointerActions(t);return`driver\n  .action\n  .move_to_location(${o}, ${i})\n  .pointer_down(:left)\n  .move_to_location(${n}, ${d})\n  .release\n  .perform\n    `}codeFor_getCurrentActivity(){return"current_activity = driver.current_activity"}codeFor_getCurrentPackage(){return"current_package = driver.current_package"}codeFor_installApp(e,r,t){return`driver.app_installed? '${t}'`}codeFor_isAppInstalled(e,r,t){return`is_app_installed = driver.app_installed? '${t}'`}codeFor_launchApp(){return"driver.launch_app"}codeFor_background(e,r,t){return`driver.background_app ${t}`}codeFor_closeApp(){return"driver.close_app"}codeFor_reset(){return"driver.reset"}codeFor_removeApp(e,r,t){return`driver.remove_app '${t}'`}codeFor_getStrings(e,r,t,o){return`driver.app_strings ${t?`${t}, `:""}${o?`"${o}`:""}`}codeFor_getClipboard(){return"clipboard_text = driver.get_clipboard"}codeFor_setClipboard(e,r,t){return`driver.set_clipboard content: '${t}'`}codeFor_pressKeyCode(e,r,t,o,i){return`driver.press_keycode ${t}, ${o}, ${i}`}codeFor_longPressKeyCode(e,r,t,o,i){return`driver.long_press_keycode ${t}, ${o}, ${i}`}codeFor_hideKeyboard(){return"driver.hide_keyboard"}codeFor_isKeyboardShown(){return"is_keyboard_shown = driver.is_keyboard_shown"}codeFor_pushFile(e,r,t,o){return`driver.push_file '${t}', '${o}'`}codeFor_pullFile(e,r,t){return`driver.pull_file '${t}'`}codeFor_pullFolder(e,r,t){return`driver.pull_folder '${t}'`}codeFor_toggleAirplaneMode(){return"driver.toggle_flight_mode"}codeFor_toggleData(){return"driver.toggle_data"}codeFor_toggleWiFi(){return"driver.toggle_wifi"}codeFor_toggleLocationServices(){return"driver.toggle_location_services"}codeFor_sendSMS(e,r,t,o){return`driver.send_sms phone_number: '${t}', message: '${o}'`}codeFor_gsmCall(e,r,t,o){return`driver.gsm_call phone_number: '${t}', action: :${o}`}codeFor_gsmSignal(e,r,t){return`driver.gsm_signal :${t}`}codeFor_gsmVoice(e,r,t){return`driver.gsm_voice :${t}`}codeFor_shake(){return"driver.shake"}codeFor_lock(e,r,t){return`driver.lock ${t}`}codeFor_unlock(){return"driver.unlock"}codeFor_isLocked(){return"is_device_locked = driver.device_locked?"}codeFor_rotateDevice(){return"# Not supported: rotateDevice"}codeFor_getPerformanceData(e,r,t,o,i){return`performance_data = driver.get_performance_data package_name: '${t}', data_type: '${o}', data_read_timeout: ${i}`}codeFor_getPerformanceDataTypes(){return"performance_data = driver.get_performance_data_types"}codeFor_touchId(e,r,t){return`driver.touch_id ${t}`}codeFor_toggleEnrollTouchId(e,r,t){return`driver.toggle_touch_id_enrollment ${t}`}codeFor_openNotifications(){return"driver.open_notifications"}codeFor_getDeviceTime(){return"device_time = driver.device_time"}codeFor_fingerprint(e,r,t){return`driver.finger_print ${t}`}codeFor_getSession(){return"session_capabilities = driver.session_capabilities"}codeFor_setTimeouts(){return"# TODO implement setTimeouts"}codeFor_getOrientation(){return"orientation = driver.orientation"}codeFor_setOrientation(e,t,o){return`driver.rotation = :${r.default.lowerCase(o)}`}codeFor_getGeoLocation(){return"geo_location = driver.location"}codeFor_setGeoLocation(e,r,t,o,i){return`driver.set_location ${t}, ${o}, ${i}`}codeFor_getLogTypes(){return"log_types = driver.logs.available_types"}codeFor_getLogs(e,r,t){return`driver.logs.get '${t}'`}codeFor_updateSettings(e,t,o){try{let e="";for(let[t,i]of r.default.toPairs(JSON.parse(o)))e+=`driver.settings.update ${t}: '${i}'\n`;return e}catch(i){return`// Could not parse: ${o}`}}codeFor_getSettings(){return"settings = driver.settings.get"}codeFor_navigateTo(e,r,t){return`driver.get '${t}'`}codeFor_getUrl(){return"current_url = driver.current_url"}codeFor_forward(){return"driver.navigate().forward"}codeFor_refresh(){return"driver.navigate().refresh"}codeFor_getContext(){return"driver.current_context"}codeFor_getContexts(){return"driver.available_contexts"}codeFor_switchContext(e,r,t){return`driver.context = '${t}'`}}o.readableName="Ruby";var i=o;exports.default=i;
},{"./framework":"gNIk"}],"Akvb":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=r(require("./framework"));function r(e){return e&&e.__esModule?e:{default:e}}class t extends e.default{get language(){return"python"}get getCapsVariables(){return Object.keys(this.caps).map(e=>`\${${e}}    ${this.getPythonVal(this.caps[e])}`).join("\n")}getPythonVal(e){return"boolean"==typeof e?e?"true":"false":e}wrapWithBoilerplate(e){return`# This sample code uses the Appium robot client\n# pip install robotframework-appiumlibrary\n# Then you can paste this into a file and simply run with robot\n#\n#  more keywords on: http://serhatbolsu.github.io/robotframework-appiumlibrary/AppiumLibrary.html\n#\n# if your tests fails saying 'did not match any elements' consider use 'wait activity' or \n# 'wait until page contains element' before a click command \n\n*** Settings ***\nLibrary           AppiumLibrary\nTest Teardown     Quit Application\nSuite Teardown    Close Application\n\n*** Variables ***\n\${REMOTE_URL}   ${this.serverUrl}\n${this.getCapsVariables}\n\n*** Test Cases ***\nTest case name\n${this.indent(this.getApplicationInitialization(),4)}\n${this.indent(e,4)}\n`}codeFor_findAndAssign(e,r){if(!{xpath:"xpath","accessibility id":"accessibility_id",id:"id",name:"name","class name":"class_name","-android uiautomator":"unsupported","-android datamatcher":"unsupported","-android viewtag":"unsupported","-ios predicate string":"ios_predicate","-ios class chain":"ios_uiautomation"}[e])throw new Error(`Strategy ${e} can't be code-gened`);return this.lastID=`${e}=${r}`,this.lastID.includes("accessibility id")&&(this.lastID=this.lastID.replace("accessibility id","accessibility_id")),`# ${this.lastID}`}getApplicationInitialization(){return`    Open Application    \${REMOTE_URL}   ${Object.keys(this.caps).map(e=>`${e}=\${${e}}`).join("  ")}`}codeFor_executeScript(){return"    Execute Script    TODO implement executeScript"}codeFor_click(){return`    Click Element    ${this.lastID}`}codeFor_clear(){return`    Clear Text    ${this.lastID}`}codeFor_sendKeys(e,r,t){return`    Input Text    ${this.lastID}    ${t}`}codeFor_back(){return"    Go Back"}codeFor_tap(e,r,t){const{x:o,y:n}=this.getTapCoordinatesFromPointerActions(t);return`    Tap With Positions    100    \${${o}, ${n}}`}codeFor_swipe(e,r,t){const{x1:o,y1:n,x2:i,y2:a}=this.getSwipeCoordinatesFromPointerActions(t);return`    Swipe    ${o}    ${n}    ${i}    ${a}`}codeFor_getCurrentActivity(){return""}codeFor_getCurrentPackage(){return""}codeFor_installApp(){return""}codeFor_isAppInstalled(){return""}codeFor_launchApp(){return""}codeFor_background(){return""}codeFor_closeApp(){return""}codeFor_reset(){return""}codeFor_removeApp(){return""}codeFor_getStrings(){return""}codeFor_getClipboard(){return""}codeFor_setClipboard(){return""}codeFor_pressKeyCode(){return""}codeFor_longPressKeyCode(){return""}codeFor_hideKeyboard(){return""}codeFor_isKeyboardShown(){return""}codeFor_pushFile(){return""}codeFor_pullFile(){return""}codeFor_pullFolder(){return""}codeFor_toggleAirplaneMode(){return""}codeFor_toggleData(){return""}codeFor_toggleWiFi(){return""}codeFor_toggleLocationServices(){return""}codeFor_sendSMS(){return""}codeFor_gsmCall(){return""}codeFor_gsmSignal(){return""}codeFor_gsmVoice(){return""}codeFor_shake(){return""}codeFor_lock(){return""}codeFor_unlock(){return""}codeFor_isLocked(){return""}codeFor_rotateDevice(){return""}codeFor_getPerformanceData(){return""}codeFor_getPerformanceDataTypes(){return""}codeFor_touchId(){return""}codeFor_toggleEnrollTouchId(){return""}codeFor_openNotifications(){return""}codeFor_getDeviceTime(){return""}codeFor_fingerprint(){return""}codeFor_getSession(){return""}codeFor_setTimeouts(){return""}codeFor_getOrientation(){return""}codeFor_setOrientation(){return""}codeFor_getGeoLocation(){return""}codeFor_setGeoLocation(){return""}codeFor_getLogTypes(){return""}codeFor_getLogs(){return""}codeFor_updateSettings(){return""}codeFor_getSettings(){return""}codeFor_navigateTo(){return""}codeFor_getUrl(){return""}codeFor_forward(){return""}codeFor_refresh(){return""}codeFor_getContext(){return""}codeFor_getContexts(){return""}codeFor_switchContext(){return""}}t.readableName="Robot Framework";var o=t;exports.default=o;
},{"./framework":"gNIk"}],"VMpq":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=s(require("./js-wd")),r=s(require("./js-wdio")),u=s(require("./js-oxygen")),t=s(require("./java")),d=s(require("./python")),o=s(require("./ruby")),a=s(require("./robot"));function s(e){return e&&e.__esModule?e:{default:e}}const l={jsWd:e.default,jsWdIo:r.default,jsOxygen:u.default,java:t.default,python:d.default,ruby:o.default,robot:a.default};var f=l;exports.default=f;
},{"./js-wd":"rn2A","./js-wdio":"Yz7v","./js-oxygen":"GnTK","./java":"tI3Y","./python":"miwa","./ruby":"NOQI","./robot":"Akvb"}],"Lc28":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=u(require("i18next")),t=require("react-i18next"),i=require("./app.config"),r=require("../renderer/polyfills");function u(e){return e&&e.__esModule?e:{default:e}}const n=(0,i.getI18NextOptions)(r.i18NextBackendOptions);e.default.isInitialized||e.default.use(t.initReactI18next).use(r.i18NextBackend).init(n);var a=e.default;exports.default=a;
},{"./app.config":"rZZj","../renderer/polyfills":"yhbL"}],"SnVe":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.getWebviewStatusAddressBarHeight=r,exports.parseSource=o,exports.setHtmlElementAttributes=i;var t=require("cheerio"),e=require("htmlparser2");function r(t){const{platformName:e,statBarHeight:r}=t,i="android"===e.toLowerCase(),o=i?window.devicePixelRatio:1,a=i?56:50,n=window.screen.height-window.innerHeight-r;return r+(n>=0&&n-a<0?n:a)*o}function i(t){const{platformName:e,webviewStatusAddressBarHeight:r}=t,i=document.body.getElementsByTagName("*"),o="android"===e.toLowerCase()?window.devicePixelRatio:1;Array.from(i).forEach(t=>{const e=t.getBoundingClientRect();t.setAttribute("data-appium-inspector-width",Math.round(e.width*o)),t.setAttribute("data-appium-inspector-height",Math.round(e.height*o)),t.setAttribute("data-appium-inspector-x",Math.round(e.left*o)),t.setAttribute("data-appium-inspector-y",Math.round(r+e.top*o))})}function o(r){if(!r.includes("<html")||r.includes("<app ")||r.includes("<mock"))return r;const i=(0,e.parseDocument)(r),o=(0,t.load)(i);return o("head").remove(),o("script").remove(),o("*").removeAttr("width").removeAttr("height").removeAttr("x").removeAttr("y").each(function(){const t=o(this);["width","height","x","y"].forEach(e=>{t.attr(`data-appium-inspector-${e}`)&&(t.attr(e,t.attr(`data-appium-inspector-${e}`)),t.removeAttr(`data-appium-inspector-${e}`))})}),o.xml()}
},{}],"mQiU":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=exports.NATIVE_APP=void 0;var e=i(require("lodash")),t=i(require("bluebird")),r=require("./webview-helpers"),a=require("../components/Inspector/shared");function i(e){return e&&e.__esModule?e:{default:e}}const{TAP:s,SWIPE:n,GESTURE:o}=a.SCREENSHOT_INTERACTION_MODE,l="NATIVE_APP";exports.NATIVE_APP=l;let c=null;class d{constructor(e){this.driver=e,this.elementCache={},this.elVarCount=0,this.elArrayVarCount=0}async run(e){const{methodName:t,strategy:r,selector:i,fetchArray:s=!1,elementId:n,args:o=[],skipRefresh:l=!1,skipScreenshot:d=!1,appMode:h=a.APP_MODE.NATIVE}=e;if("quit"===t){try{await this.driver.quit()}catch(p){}return c=null,{source:null,screenshot:null,windowSize:null,result:null}}let u={};return t?n?(console.log(`Handling client method request with method '${t}', args ${JSON.stringify(o)} and elementId ${n}`),u=await this.executeMethod({elementId:n,methodName:t,args:o,skipRefresh:l,skipScreenshot:d,appMode:h})):(console.log(`Handling client method request with method '${t}' and args ${JSON.stringify(o)}`),u=await this.executeMethod({methodName:t,args:o,skipRefresh:l,skipScreenshot:d,appMode:h})):r&&i&&(s?(console.log(`Fetching elements with selector '${i}' and strategy ${r}`),u=await this.fetchElements({strategy:r,selector:i})):(console.log(`Fetching an element with selector '${i}' and strategy ${r}`),u=await this.fetchElement({strategy:r,selector:i}))),u}async executeMethod({elementId:r,methodName:i,args:l,skipRefresh:c,skipScreenshot:d,appMode:h}){let u,p={};if(e.default.isArray(l)||e.default.isUndefined(l)||(l=[l]),r)(u=this.elementCache[r]).variableName||(this.elVarCount+=1,u.variableName=`el${this.elVarCount}`),p=await u.el[i].apply(u.el,l);else if([s,n,o].includes(i)){const e=Object.keys(l[0]).map(e=>({type:"pointer",id:e,parameters:{pointerType:"touch"},actions:l[0][e]}));p=await this.driver.performActions(e)}else"getPageSource"!==i&&"takeScreenshot"!==i&&(p=await this.driver[i].apply(this.driver,l));let m={},w={},g={},y={};return c||(await t.default.delay(500),d||(g=await this.getScreenshotUpdate()),y=await this.getWindowUpdate(),h===a.APP_MODE.WEB_HYBRID&&(m=await this.getContextUpdate()),w=await this.getSourceUpdate()),{...u,...m,...w,...g,...y,commandRes:p}}async fetchElements({strategy:e,selector:t}){const r=Date.now(),a=await this.driver.findElements(e,t),i=Date.now()-r;this.elArrayVarCount+=1;const s=`els${this.elArrayVarCount}`,n={},o=a.map((r,a)=>{const i={el:r,variableName:s,variableIndex:a,variableType:"string",id:r.elementId,strategy:e,selector:t};return n[r.elementId]=i,i});return this.elementCache={...this.elementCache,...n},{variableName:s,variableType:"array",strategy:e,selector:t,elements:o,executionTime:i}}async fetchElement({strategy:e,selector:t}){const r=Date.now();let a=null;try{a=await this.driver.findElement(e,t)}catch(o){return{}}const i=Date.now()-r,s=a.elementId,n={el:a,variableType:"string",strategy:e,selector:t,id:s};return this.elementCache[s]=n,{...n,executionTime:i}}async getWindowUpdate(){let t,r;const{client:{capabilities:{deviceScreenSize:a,platformName:i,automationName:s}}}=this.driver;try{if("android"===e.default.toLower(i)&&"uiautomator2"===e.default.toLower(s)){const[e,r]=a.split("x");t={width:e,height:r,x:0,y:0}}else t=await this.driver.getWindowRect()}catch(n){r=n}return{windowSize:t,windowSizeError:r}}async getContextUpdate(){let t,a,i,s,n,o,c,d,h;if(!(await this.hasContextsCommand()))return{currentContext:null,contexts:[]};try{i=await this.driver.getContext()}catch(p){s=p}i!==l&&await this.driver.switchContext(l),({platformName:o,pixelRatio:n,statBarHeight:c,viewportRect:d}=await this.driver.getSession());const u="android"===e.default.toLower(o);try{t=await this.driver.executeScript("mobile:getContexts",[]),t=u?this.parseAndroidContexts(t):t}catch(p){a=p}if(i!==l){try{if(d)h={x:u?d.left:Math.round(d.left/n),y:u?d.top:Math.round(d.top/n)};else{const e=await this.driver.findElement(u?"xpath":"-ios class chain",u?"//android.webkit.WebView":"**/XCUIElementTypeWebView");e&&(h=await e.getRect())}}catch(m){}await this.driver.switchContext(i)}try{i!==l&&(h||(h={x:0,y:await this.driver.executeScript(`return (${r.getWebviewStatusAddressBarHeight}).apply(null, arguments)`,[{platformName:o,statBarHeight:c}])}),await this.driver.executeScript(`return (${r.setHtmlElementAttributes}).apply(null, arguments)`,[{platformName:o,webviewStatusAddressBarHeight:h.y}]))}catch(m){}return{contexts:t,contextsError:a,currentContext:i,currentContextError:s}}async getSourceUpdate(){try{return{source:(0,r.parseSource)(await this.driver.getPageSource())}}catch(e){return{sourceError:e}}}async getScreenshotUpdate(){try{return{screenshot:await this.driver.takeScreenshot()}}catch(e){return{screenshotError:e}}}async hasContextsCommand(){try{return await this.driver.getContexts(),!0}catch(e){}return!1}parseAndroidContexts(t){const r=[];return t.filter(t=>e.default.has(t,"webviewName")).map(({info:t,pages:a,webviewName:i})=>{if(a)return a.filter(t=>{const r=e.default.has(t,"description")?t.description:"";let a={attached:!1};try{a=JSON.parse(t.description)}catch(i){}return"page"===t.type&&(""===r||a.attached)}).map(a=>{r.push({id:i,...a&&e.default.has(a,"title")?{title:a.title}:{},...a&&e.default.has(a,"url")?{url:a.url}:{},...a&&e.default.has(t,"Android-Package")?{packageName:t["Android-Package"]}:{},...a&&e.default.has(a,"id")?{handle:a.id}:{}})}),r}),[{id:"NATIVE_APP"},...r.filter(Boolean)]}}exports.default=d,d.instance=(e=>(null===c&&(c=new d(e)),c));
},{"./webview-helpers":"SnVe","../components/Inspector/shared":"n676"}],"hyV8":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.UNSELECT_TICK_ELEMENT=exports.UNSELECT_HOVERED_ELEMENT=exports.UNSELECT_HOVERED_CENTROID=exports.UNSELECT_ELEMENT=exports.UNSELECT_CENTROID=exports.TOGGLE_SHOW_ATTRIBUTES=exports.TOGGLE_REFRESHING_STATE=exports.START_RECORDING=exports.SHOW_SIRI_COMMAND_MODAL=exports.SHOW_LOCATOR_TEST_MODAL=exports.SHOW_GESTURE_EDITOR=exports.SHOW_GESTURE_ACTION=exports.SET_VISIBLE_COMMAND_RESULT=exports.SET_USER_WAIT_TIMEOUT=exports.SET_SWIPE_START1=exports.SET_SWIPE_START=exports.SET_SWIPE_END1=exports.SET_SWIPE_END=exports.SET_SOURCE_AND_SCREENSHOT=exports.SET_SIRI_COMMAND_VALUE=exports.SET_SHOW_CENTROIDS=exports.SET_SHOW_BOILERPLATE=exports.SET_SESSION_TIME=exports.SET_SESSION_DETAILS=exports.SET_SERVER_STATUS=exports.SET_SELECTED_ELEMENT_ID=exports.SET_SEARCHED_FOR_ELEMENT_BOUNDS=exports.SET_SCREENSHOT_INTERACTION_MODE=exports.SET_LOCATOR_TEST_VALUE=exports.SET_LOCATOR_TEST_STRATEGY=exports.SET_LOCATOR_TEST_ELEMENT=exports.SET_LOADED_GESTURE=exports.SET_LAST_ACTIVE_MOMENT=exports.SET_KEEP_ALIVE_INTERVAL=exports.SET_INTERACTIONS_NOT_AVAILABLE=exports.SET_GESTURE_TAP_COORDS_MODE=exports.SET_EXPANDED_PATHS=exports.SET_CONTEXT=exports.SET_COMMAND_ARG=exports.SET_AWAITING_MJPEG_STREAM=exports.SET_APP_MODE=exports.SET_APP_ID=exports.SET_ACTION_FRAMEWORK=exports.SESSION_DONE=exports.SELECT_TICK_ELEMENT=exports.SELECT_INTERACTION_MODE=exports.SELECT_HOVERED_ELEMENT=exports.SELECT_HOVERED_CENTROID=exports.SELECT_ELEMENT=exports.SELECT_COMMAND_SUB_GROUP=exports.SELECT_COMMAND_GROUP=exports.SELECT_CENTROID=exports.SEARCHING_FOR_ELEMENTS_COMPLETED=exports.SEARCHING_FOR_ELEMENTS=exports.REMOVE_LOADED_GESTURE=exports.RECORD_ACTION=exports.QUIT_SESSION_REQUESTED=exports.QUIT_SESSION_DONE=exports.PROMPT_KEEP_ALIVE=exports.PAUSE_RECORDING=exports.METHOD_CALL_REQUESTED=exports.METHOD_CALL_DONE=exports.HIDE_SIRI_COMMAND_MODAL=exports.HIDE_PROMPT_KEEP_ALIVE=exports.HIDE_LOCATOR_TEST_MODAL=exports.HIDE_GESTURE_EDITOR=exports.HIDE_GESTURE_ACTION=exports.GET_SAVED_GESTURES_REQUESTED=exports.GET_SAVED_GESTURES_DONE=exports.GET_FIND_ELEMENTS_TIMES_COMPLETED=exports.GET_FIND_ELEMENTS_TIMES=exports.FINDING_ELEMENT_IN_SOURCE_COMPLETED=exports.FINDING_ELEMENT_IN_SOURCE=exports.ENTERING_COMMAND_ARGS=exports.DELETE_SAVED_GESTURES_REQUESTED=exports.DELETE_SAVED_GESTURES_DONE=exports.CLOSE_RECORDER=exports.CLEAR_TAP_COORDINATES=exports.CLEAR_SWIPE_ACTION=exports.CLEAR_SEARCH_RESULTS=exports.CLEAR_SEARCHED_FOR_ELEMENT_BOUNDS=exports.CLEAR_RECORDING=exports.CLEAR_ASSIGNED_VAR_CACHE=exports.CANCEL_PENDING_COMMAND=exports.ADD_ASSIGNED_VAR_CACHE=void 0,exports.addAssignedVarCache=rt,exports.applyClientMethod=ot,exports.callClientMethod=Zt,exports.cancelPendingCommand=Xt,exports.clearRecording=Tt,exports.clearSearchResults=ht,exports.clearSwipeAction=Ft,exports.closeRecorder=at,exports.deleteSavedGesture=rE,exports.displayGesture=TE,exports.findAndAssign=Mt,exports.getActiveAppId=Pt,exports.getFindElementsTimes=Lt,exports.getSavedActionFramework=pt,exports.getSavedGestures=oE,exports.getServerStatus=wt,exports.hideGestureEditor=nE,exports.hideKeepAlivePrompt=Bt,exports.hideLocatorTestModal=Rt,exports.hideSiriCommandModal=lt,exports.keepSessionAlive=$t,exports.killKeepAliveLoop=Yt,exports.pauseRecording=St,exports.promptKeepAlive=kt,exports.quitSession=nt,exports.recordAction=ct,exports.removeGestureDisplay=pE,exports.removeLoadedGesture=SE,exports.runKeepAliveLoop=Jt,exports.saveGesture=EE,exports.searchForElement=dt,exports.selectAppMode=gt,exports.selectCentroid=Ye,exports.selectCommandGroup=jt,exports.selectCommandSubGroup=Kt,exports.selectElement=ze,exports.selectHoveredCentroid=Ze,exports.selectHoveredElement=tt,exports.selectInteractionMode=Qt,exports.selectLocatedElement=yt,exports.selectScreenshotInteractionMode=mt,exports.selectTick=iE,exports.setActionFramework=it,exports.setAwaitingMjpegStream=tE,exports.setCommandArg=zt,exports.setContext=Ct,exports.setExpandedPaths=st,exports.setLoadedGesture=_E,exports.setLocatorTestElement=ft,exports.setLocatorTestStrategy=Dt,exports.setLocatorTestValue=xt,exports.setSessionDetails=Ot,exports.setSessionTime=Ht,exports.setSiriCommandValue=It,exports.setSwipeEnd=Wt,exports.setSwipeEnd1=bt,exports.setSwipeStart=Vt,exports.setSwipeStart1=vt,exports.setVisibleCommandResult=eE,exports.showGestureEditor=sE,exports.showLocatorTestModal=At,exports.showSiriCommandModal=Nt,exports.startEnteringCommandArgs=qt,exports.startRecording=_t,exports.tapTickCoordinates=aE,exports.toggleRefreshingState=Gt,exports.toggleShowAttributes=uE,exports.toggleShowBoilerplate=ut,exports.toggleShowCentroids=Ut,exports.unselectCentroid=$e,exports.unselectElement=Je,exports.unselectHoveredCentroid=et,exports.unselectHoveredElement=Et,exports.unselectTick=cE;var e=a(require("lodash")),t=require("redux-first-history"),E=require("../components/Inspector/shared"),o=require("./Session"),r=require("../util"),s=require("uuid"),n=i(require("../lib/client-frameworks")),_=require("../../shared/settings"),S=i(require("../../configs/i18next.config.renderer")),T=a(require("../lib/appium-client")),p=require("antd");function i(e){return e&&e.__esModule?e:{default:e}}function c(e){if("function"!=typeof WeakMap)return null;var t=new WeakMap,E=new WeakMap;return(c=function(e){return e?E:t})(e)}function a(e,t){if(!t&&e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var E=c(t);if(E&&E.has(e))return E.get(e);var o={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var s in e)if("default"!==s&&Object.prototype.hasOwnProperty.call(e,s)){var n=r?Object.getOwnPropertyDescriptor(e,s):null;n&&(n.get||n.set)?Object.defineProperty(o,s,n):o[s]=e[s]}return o.default=e,E&&E.set(e,o),o}const u="SET_SESSION_DETAILS";exports.SET_SESSION_DETAILS=u;const O="SET_SOURCE_AND_SCREENSHOT";exports.SET_SOURCE_AND_SCREENSHOT=O;const A="SESSION_DONE";exports.SESSION_DONE=A;const R="SELECT_ELEMENT";exports.SELECT_ELEMENT=R;const N="UNSELECT_ELEMENT";exports.UNSELECT_ELEMENT=N;const l="SET_SELECTED_ELEMENT_ID";exports.SET_SELECTED_ELEMENT_ID=l;const I="SET_INTERACTIONS_NOT_AVAILABLE";exports.SET_INTERACTIONS_NOT_AVAILABLE=I;const x="METHOD_CALL_REQUESTED";exports.METHOD_CALL_REQUESTED=x;const D="METHOD_CALL_DONE";exports.METHOD_CALL_DONE=D;const C="SET_EXPANDED_PATHS";exports.SET_EXPANDED_PATHS=C;const d="SELECT_HOVERED_ELEMENT";exports.SELECT_HOVERED_ELEMENT=d;const L="UNSELECT_HOVERED_ELEMENT";exports.UNSELECT_HOVERED_ELEMENT=L;const M="SELECT_HOVERED_CENTROID";exports.SELECT_HOVERED_CENTROID=M;const f="UNSELECT_HOVERED_CENTROID";exports.UNSELECT_HOVERED_CENTROID=f;const y="SELECT_CENTROID";exports.SELECT_CENTROID=y;const h="UNSELECT_CENTROID";exports.UNSELECT_CENTROID=h;const m="SET_SHOW_CENTROIDS";exports.SET_SHOW_CENTROIDS=m;const G="QUIT_SESSION_REQUESTED";exports.QUIT_SESSION_REQUESTED=G;const g="QUIT_SESSION_DONE";exports.QUIT_SESSION_DONE=g;const U="SET_SESSION_TIME";exports.SET_SESSION_TIME=U;const P="START_RECORDING";exports.START_RECORDING=P;const w="PAUSE_RECORDING";exports.PAUSE_RECORDING=w;const H="CLEAR_RECORDING";exports.CLEAR_RECORDING=H;const V="CLOSE_RECORDER";exports.CLOSE_RECORDER=V;const v="SET_ACTION_FRAMEWORK";exports.SET_ACTION_FRAMEWORK=v;const W="RECORD_ACTION";exports.RECORD_ACTION=W;const b="SET_SHOW_BOILERPLATE";exports.SET_SHOW_BOILERPLATE=b;const F="SHOW_LOCATOR_TEST_MODAL";exports.SHOW_LOCATOR_TEST_MODAL=F;const k="HIDE_LOCATOR_TEST_MODAL";exports.HIDE_LOCATOR_TEST_MODAL=k;const B="SHOW_SIRI_COMMAND_MODAL";exports.SHOW_SIRI_COMMAND_MODAL=B;const j="HIDE_SIRI_COMMAND_MODAL";exports.HIDE_SIRI_COMMAND_MODAL=j;const K="SET_SIRI_COMMAND_VALUE";exports.SET_SIRI_COMMAND_VALUE=K;const Q="SET_LOCATOR_TEST_STRATEGY";exports.SET_LOCATOR_TEST_STRATEGY=Q;const q="SET_LOCATOR_TEST_VALUE";exports.SET_LOCATOR_TEST_VALUE=q;const X="SEARCHING_FOR_ELEMENTS";exports.SEARCHING_FOR_ELEMENTS=X;const z="SEARCHING_FOR_ELEMENTS_COMPLETED";exports.SEARCHING_FOR_ELEMENTS_COMPLETED=z;const J="GET_FIND_ELEMENTS_TIMES";exports.GET_FIND_ELEMENTS_TIMES=J;const Y="GET_FIND_ELEMENTS_TIMES_COMPLETED";exports.GET_FIND_ELEMENTS_TIMES_COMPLETED=Y;const $="SET_LOCATOR_TEST_ELEMENT";exports.SET_LOCATOR_TEST_ELEMENT=$;const Z="FINDING_ELEMENT_IN_SOURCE";exports.FINDING_ELEMENT_IN_SOURCE=Z;const ee="FINDING_ELEMENT_IN_SOURCE_COMPLETED";exports.FINDING_ELEMENT_IN_SOURCE_COMPLETED=ee;const te="CLEAR_SEARCH_RESULTS";exports.CLEAR_SEARCH_RESULTS=te;const Ee="ADD_ASSIGNED_VAR_CACHE";exports.ADD_ASSIGNED_VAR_CACHE=Ee;const oe="CLEAR_ASSIGNED_VAR_CACHE";exports.CLEAR_ASSIGNED_VAR_CACHE=oe;const re="SET_SCREENSHOT_INTERACTION_MODE";exports.SET_SCREENSHOT_INTERACTION_MODE=re;const se="SET_APP_MODE";exports.SET_APP_MODE=se;const ne="SET_SEARCHED_FOR_ELEMENT_BOUNDS";exports.SET_SEARCHED_FOR_ELEMENT_BOUNDS=ne;const _e="CLEAR_SEARCHED_FOR_ELEMENT_BOUNDS";exports.CLEAR_SEARCHED_FOR_ELEMENT_BOUNDS=_e;const Se="SET_SWIPE_START";exports.SET_SWIPE_START=Se;const Te="SET_SWIPE_END";exports.SET_SWIPE_END=Te;const pe="SET_SWIPE_START1";exports.SET_SWIPE_START1=pe;const ie="SET_SWIPE_END1";exports.SET_SWIPE_END1=ie;const ce="CLEAR_SWIPE_ACTION";exports.CLEAR_SWIPE_ACTION=ce;const ae="PROMPT_KEEP_ALIVE";exports.PROMPT_KEEP_ALIVE=ae;const ue="HIDE_PROMPT_KEEP_ALIVE";exports.HIDE_PROMPT_KEEP_ALIVE=ue;const Oe="SELECT_INTERACTION_MODE";exports.SELECT_INTERACTION_MODE=Oe;const Ae="SELECT_COMMAND_GROUP";exports.SELECT_COMMAND_GROUP=Ae;const Re="SELECT_COMMAND_SUB_GROUP";exports.SELECT_COMMAND_SUB_GROUP=Re;const Ne="ENTERING_COMMAND_ARGS";exports.ENTERING_COMMAND_ARGS=Ne;const le="CANCEL_PENDING_COMMAND";exports.CANCEL_PENDING_COMMAND=le;const Ie="SET_COMMAND_ARG";exports.SET_COMMAND_ARG=Ie;const xe="SET_CONTEXT";exports.SET_CONTEXT=xe;const De="SET_APP_ID";exports.SET_APP_ID=De;const Ce="SET_SERVER_STATUS";exports.SET_SERVER_STATUS=Ce;const de="SET_KEEP_ALIVE_INTERVAL";exports.SET_KEEP_ALIVE_INTERVAL=de;const Le="SET_USER_WAIT_TIMEOUT";exports.SET_USER_WAIT_TIMEOUT=Le;const Me="SET_LAST_ACTIVE_MOMENT";exports.SET_LAST_ACTIVE_MOMENT=Me;const fe="SET_VISIBLE_COMMAND_RESULT";exports.SET_VISIBLE_COMMAND_RESULT=fe;const ye="SET_AWAITING_MJPEG_STREAM";exports.SET_AWAITING_MJPEG_STREAM=ye;const he="SHOW_GESTURE_EDITOR";exports.SHOW_GESTURE_EDITOR=he;const me="HIDE_GESTURE_EDITOR";exports.HIDE_GESTURE_EDITOR=me;const Ge="GET_SAVED_GESTURES_REQUESTED";exports.GET_SAVED_GESTURES_REQUESTED=Ge;const ge="GET_SAVED_GESTURES_DONE";exports.GET_SAVED_GESTURES_DONE=ge;const Ue="DELETE_SAVED_GESTURES_REQUESTED";exports.DELETE_SAVED_GESTURES_REQUESTED=Ue;const Pe="DELETE_SAVED_GESTURES_DONE";exports.DELETE_SAVED_GESTURES_DONE=Pe;const we="SET_LOADED_GESTURE";exports.SET_LOADED_GESTURE=we;const He="REMOVE_LOADED_GESTURE";exports.REMOVE_LOADED_GESTURE=He;const Ve="SHOW_GESTURE_ACTION";exports.SHOW_GESTURE_ACTION=Ve;const ve="HIDE_GESTURE_ACTION";exports.HIDE_GESTURE_ACTION=ve;const We="SELECT_TICK_ELEMENT";exports.SELECT_TICK_ELEMENT=We;const be="UNSELECT_TICK_ELEMENT";exports.UNSELECT_TICK_ELEMENT=be;const Fe="SET_GESTURE_TAP_COORDS_MODE";exports.SET_GESTURE_TAP_COORDS_MODE=Fe;const ke="CLEAR_TAP_COORDINATES";exports.CLEAR_TAP_COORDINATES=ke;const Be="TOGGLE_SHOW_ATTRIBUTES";exports.TOGGLE_SHOW_ATTRIBUTES=Be;const je="TOGGLE_REFRESHING_STATE";exports.TOGGLE_REFRESHING_STATE=je;const Ke=2e4,Qe=864e5,qe=36e5,Xe=e.default.debounce(async function(e,t,E,o){for(let[r,s]of e){const e=Zt({strategy:r,selector:s});let{elementId:n,variableName:_,variableType:S}=await e(t,E);if(n&&E().inspector.selectedElementPath===o)return t({type:l,elementId:n,variableName:_,variableType:S})}return t({type:I})},1e3);function ze(t){return async(o,r)=>{o({type:R,path:t});const{selectedElement:s,sourceXML:n,expandedPaths:_}=r().inspector,S=[..._];let T=t.split(".").slice(0,t.length-1);for(;T.length>1;){T.splice(T.length-1);let e=T.join(".");S.includes(e)||S.push(e)}o({type:C,paths:S});const p=e.default.toPairs((0,E.getLocators)(s.attributes,n));p.push(["xpath",s.xpath]),await Xe(p,o,r,t)}}function Je(){return e=>{e({type:N})}}function Ye(e){return t=>{t({type:y,path:e})}}function $e(){return e=>{e({type:h})}}function Ze(e){return t=>{t({type:M,path:e})}}function et(){return e=>{e({type:f})}}function tt(e){return t=>{t({type:d,path:e})}}function Et(e){return t=>{t({type:L,path:e})}}function ot(e){return async(t,E)=>{const s="quit"!==e.methodName&&"getPageSource"!==e.methodName&&"gesture"!==e.methodName&&"status"!==e.methodName&&E().inspector.isRecording;try{t({type:x});const _=Zt(e),{contexts:S,contextsError:T,commandRes:p,currentContext:i,currentContextError:c,source:a,screenshot:u,windowSize:A,sourceError:R,screenshotError:N,windowSizeError:l,variableName:I,variableIndex:C,strategy:d,selector:L}=await _(t,E);if(s){if(d&&L&&!C&&0!==C){Mt(d,L,I,!1)(t,E)}let o=[I,C];o=o.concat(e.args||[]),t({type:W,action:e.methodName,params:o})}return t({type:D}),a&&t({type:O,contexts:S,currentContext:i,source:a&&(0,r.xmlToJSON)(a),sourceXML:a,screenshot:u,windowSize:A,contextsError:T,currentContextError:c,sourceError:R,screenshotError:N,windowSizeError:l}),window.dispatchEvent(new Event("resize")),p}catch(n){console.log(n);let E="click"===e.methodName?"tap":e.methodName;(0,o.showError)(n,E,10),t({type:D})}}}function rt(e){return t=>{t({type:Ee,varName:e})}}function st(e){return t=>{t({type:C,paths:e})}}function nt(e,E=!0){return async(o,r)=>{Yt()(o,r);const s=ot({methodName:"quit"});await s(o,r),o({type:g}),o((0,t.push)("/session")),E||p.notification.error({message:"Error",description:e||S.default.t("Session has been terminated"),duration:0})}}function _t(){return e=>{e({type:P})}}function St(){return e=>{e({type:w})}}function Tt(){return e=>{e({type:H}),e({type:oe})}}function pt(){return async e=>{let t=await(0,_.getSetting)(_.SAVED_FRAMEWORK);e({type:v,framework:t})}}function it(e){return async t=>{if(!n.default[e])throw new Error(S.default.t("frameworkNotSupported",{framework:e}));await(0,_.setSetting)(_.SAVED_FRAMEWORK,e),t({type:v,framework:e})}}function ct(e,t){return E=>{E({type:W,action:e,params:t})}}function at(){return e=>{e({type:V})}}function ut(){return(e,t)=>{const E=!t().inspector.showBoilerplate;e({type:b,show:E})}}function Ot({driver:e,sessionDetails:t,mode:E,mjpegScreenshotUrl:o}){return r=>{r({type:u,driver:e,sessionDetails:t,mode:E,mjpegScreenshotUrl:o})}}function At(){return e=>{e({type:F})}}function Rt(){return e=>{e({type:k})}}function Nt(){return e=>{e({type:B})}}function lt(){return e=>{e({type:j})}}function It(e){return t=>{t({type:K,siriCommandValue:e})}}function xt(e){return t=>{t({type:q,locatorTestValue:e})}}function Dt(e){return t=>{t({type:Q,locatorTestStrategy:e})}}function Ct(e){return t=>{t({type:xe,context:e})}}function dt(e,t){return async(E,r)=>{E({type:X});try{const n=Zt({strategy:e,selector:t,fetchArray:!0});let{elements:_,variableName:S,executionTime:T}=await n(E,r);Mt(e,t,S,!0)(E,r),_=_.map(e=>e.id),E({type:z,elements:_,executionTime:T})}catch(s){E({type:z}),(0,o.showError)(s,10)}}}function Lt(t){return async(E,r)=>{E({type:J});try{const n=[];for(const e of t){const{find:t,key:o,selector:s}=e,_=Zt({strategy:o,selector:s}),{executionTime:S}=await _(E,r);n.push({find:t,key:o,selector:s,time:S})}E({type:Y,findElementsExecutionTimes:e.default.sortBy(n,["time"])})}catch(s){E({type:Y}),(0,o.showError)(s,10)}}}function Mt(e,t,E,o){return(r,s)=>{const{assignedVarCache:n}=s().inspector;n[E]||(r({type:W,action:"findAndAssign",params:[e,t,E,o]}),r({type:Ee,varName:E}))}}function ft(e){return async(t,E)=>{if(t({type:$,elementId:e}),t({type:_e}),e)try{const r=Zt({elementId:e,methodName:"getRect",skipRefresh:!0,skipRecord:!0,ignoreResult:!0}),{commandRes:s}=await r(t,E);t({type:ne,location:{x:s.x,y:s.y},size:{width:s.width,height:s.height}})}catch(o){}}}function yt(e,t,E){const o=10;function r(){if(!t||!e.children||!e.children[0].attributes)return null;if(e.children[0].attributes.bounds){const[E,o]=[t.location.x+t.size.width,t.location.y+t.size.height],r=`[${t.location.x},${t.location.y}][${E},${o}]`;return function e(t,E){let o=[];for(const r of t)r.attributes.bounds===E&&o.push([r.path,r.xpath]),r.children.length&&o.push(...e(r.children,E));return o}(e.children,r)}if(e.children[0].attributes.x){const E={x:String(t.location.x),y:String(t.location.y),height:String(t.size.height),width:String(t.size.width)};return function e(t,E){let o=[];for(const r of t)r.attributes.x===E.x&&r.attributes.y===E.y&&r.attributes.height===E.height&&r.attributes.width===E.width&&o.push([r.path,r.xpath]),r.children.length&&o.push(...e(r.children,E));return o}(e.children,E)}return null}async function s(e,t,r){return e?1===e.length?e[0][0]:0!==e.length&&e.length<=o?await async function(e,t,o){for(const r of e){const e=Zt({strategy:"xpath",selector:r[1]}),{el:s}=await e(t,o);if(s&&s.elementId===E)return r[0]}return null}(e,t,r):null:null}return async(e,t)=>{e({type:Z});const E=r(),o=await s(E,e,t);if(o){const E=ze(o);await E(e,t)}else p.notification.error({message:S.default.t("Error"),description:S.default.t("findingElementInSourceFailed"),duration:8});e({type:ee})}}function ht(){return e=>{e({type:te}),e({type:_e})}}function mt(e){return t=>{t({type:re,screenshotInteractionMode:e})}}function Gt(){return e=>{e({type:je})}}function gt(e){return async(t,o)=>{const{appMode:r}=o().inspector;if(t({type:se,mode:e}),r!==e&&e===E.APP_MODE.WEB_HYBRID){const e=ot({methodName:"getPageSource"});await e(t,o)}if(r!==e&&e===E.APP_MODE.NATIVE){const e=ot({methodName:"switchContext",args:[T.NATIVE_APP]});await e(t,o)}}}function Ut(){return(e,t)=>{const{showCentroids:E}=t().inspector;e({type:m,show:!E})}}function Pt(e,t){return async(E,o)=>{try{if(e){const e=ot({methodName:"executeScript",args:["mobile:activeAppInfo",[]]}),{bundleId:t}=await e(E,o);E({type:De,appId:t})}if(t){const e=ot({methodName:"getCurrentPackage"}),t=await e(E,o);E({type:De,appId:t})}}catch(r){console.error(`Could not Retrieve Active App ID: ${r}`)}}}function wt(){return async(e,t)=>{const E=ot({methodName:"status"}),{build:o}=await E(e,t);e({type:Ce,status:o})}}function Ht(e){return t=>{t({type:U,sessionStartTime:e})}}function Vt(e,t){return E=>{E({type:Se,swipeStartX:e,swipeStartY:t})}}function vt(e,t){return E=>{E({type:pe,swipeStartX:e,swipeStartY:t})}}function Wt(e,t){return E=>{E({type:Te,swipeEndX:e,swipeEndY:t})}}function bt(e,t){return E=>{E({type:ie,swipeEndX:e,swipeEndY:t})}}function Ft(){return e=>{e({type:ce})}}function kt(){return e=>{e({type:ae})}}function Bt(){return e=>{e({type:ue})}}function jt(e){return t=>{t({type:Ae,group:e})}}function Kt(e){return t=>{t({type:Re,group:e})}}function Qt(e){return t=>{t({type:Oe,interaction:e})}}function qt(e,t){return E=>{E({type:Ne,commandName:e,command:t})}}function Xt(){return e=>{e({type:le})}}function zt(e,t){return E=>{E({type:Ie,index:e,value:t})}}function Jt(){return(e,t)=>{e({type:Me,lastActiveMoment:Date.now()});const{driver:E}=t().inspector,o=setInterval(async()=>{const{lastActiveMoment:o}=t().inspector;console.log("Pinging Appium server to keep session active");try{await E.getTimeouts()}catch(r){}if(Date.now()-o>Qe){kt()(e);const E=setTimeout(()=>{nt(S.default.t("Session closed due to inactivity"),!1)(e,t)},qe);e({type:Le,userWaitTimeout:E})}},Ke);e({type:de,keepAliveInterval:o})}}function Yt(){return(e,t)=>{const{keepAliveInterval:E,userWaitTimeout:o}=t().inspector;clearInterval(E),o&&clearTimeout(o),e({type:de,keepAliveInterval:null}),e({type:Le,userWaitTimeout:null})}}function $t(){return(e,t)=>{const{userWaitTimeout:E}=t().inspector;Bt()(e),e({type:Me,lastActiveMoment:+new Date}),E&&(clearTimeout(E),e({type:Le,userWaitTimeout:null}))}}function Zt(t){return async(E,o)=>{console.log("🚀 ~ file: Inspector.js:803 ~ return ~ params:",t),console.log("🚀 ~ file: Inspector.js:804 ~ return ~ getState",o());const{driver:r,appMode:s,mjpegScreenshotUrl:n,isSourceRefreshOn:_,selectedElement:S,screenshotInteractionMode:p}=o().inspector;console.log("🚀 ~ file: Inspector.js:811 ~ return ~ selectedElement:",S);const{methodName:i,ignoreResult:c=!0}=t;t.appMode=s,n&&(t.skipScreenshot=!0),_||(t.skipRefresh=!0),console.log("Calling client method with params:",t),$t()(E,o),console.log("driver session id",r.sessionId);const a=T.default.instance(r),u=await a.run(t);console.log("🚀 ~ file: Inspector.js:821 ~ return ~ res:",u);let{commandRes:O}=u,A={session_id:r.sessionId,params:t,selectedElement:S,"step-name":p};if("click"===A.params.methodName?(console.log("🚀 ~ file: Inspector.js:825 ~ return ~ postdata:",A),await fetch("https://apprecord.testing24x7.ai/appAction",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(A)}).then(e=>{console.log("API response:",e)}).catch(e=>{console.error("API error:",e)})):"swipe"===A.params.methodName?(delete A.selectedElement,console.log("🚀 ~ file: Inspector.js:825 ~ return ~ postdata:",A),await fetch("https://apprecord.testing24x7.ai/appAction",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(A)}).then(e=>{console.log("API response:",e)}).catch(e=>{console.error("API error:",e)})):"tap"===A.params.methodName?(delete A.selectedElement,console.log("🚀 ~ file: Inspector.js:825 ~ return ~ postdata:",A),await fetch("https://apprecord.testing24x7.ai/appAction",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(A)}).then(e=>{console.log("API response:",e)}).catch(e=>{console.error("API error:",e)})):"sendKeys"===A.params.methodName&&(console.log("🚀 ~ file: Inspector.js:825 ~ return ~ postdata:",A),await fetch("https://apprecord.testing24x7.ai/appAction",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(A)}).then(e=>{console.log("API response:",e)}).catch(e=>{console.error("API error:",e)})),e.default.isObject(u)&&e.default.isEmpty(u)&&(O=null),!c){const t=JSON.stringify(O,null,"  "),o=e.default.truncate(t,{length:2e3});console.log(`Got result from client method: ${o}`),eE(t,i)(E)}return u.elementId=u.id,u}}function eE(e,t){return E=>{E({type:fe,result:e,methodName:t})}}function tE(e){return t=>{t({type:ye,isAwaiting:e})}}function EE(e){return async t=>{let E=await(0,_.getSetting)(_.SET_SAVED_GESTURES)||[];if(e.id)for(const r of E)r.id===e.id&&(r.name=e.name,r.description=e.description,r.actions=e.actions);else e.id=(0,s.v4)(),e.date=Date.now(),E.push(e);await(0,_.setSetting)(_.SET_SAVED_GESTURES,E);const o=oE();await o(t)}}function oE(){return async e=>{e({type:Ge});const t=await(0,_.getSetting)(_.SET_SAVED_GESTURES);e({type:ge,savedGestures:t})}}function rE(e){return async t=>{t({type:Ue,deleteGesture:e});const E=(await(0,_.getSetting)(_.SET_SAVED_GESTURES)).filter(t=>t.id!==e);await(0,_.setSetting)(_.SET_SAVED_GESTURES,E),t({type:Pe}),t({type:ge,savedGestures:E})}}function sE(){return e=>{e({type:he}),e({type:re,screenshotInteractionMode:"gesture"})}}function nE(){return e=>{e({type:me}),e({type:re,screenshotInteractionMode:"select"})}}function _E(e){return t=>{t({type:we,loadedGesture:e})}}function SE(){return e=>{e({type:He})}}function TE(e){return t=>{t({type:Ve,showGesture:e})}}function pE(){return e=>{e({type:ve})}}function iE(e){return(t,E)=>{const{tickCoordinates:o}=E().inspector;o&&t({type:Fe,x:void 0,y:void 0}),t({type:We,selectedTick:e})}}function cE(){return e=>{e({type:ke}),e({type:be})}}function aE(e,t){return E=>{E({type:Fe,x:e,y:t})}}function uE(){return e=>{e({type:Be})}}
},{"../components/Inspector/shared":"n676","./Session":"VMiD","../util":"YOqM","../lib/client-frameworks":"VMpq","../../shared/settings":"wFy3","../../configs/i18next.config.renderer":"Lc28","../lib/appium-client":"mQiU"}],"NkMK":[function(require,module,exports) {
module.exports={"active-session":"_active-session_8105c",sessionContainer:"_sessionContainer_8105c",cloudProviderModal:"_cloudProviderModal_8105c",sessionFooter:"_sessionFooter_8105c",desiredCapsLink:"_desiredCapsLink_8105c",tabText:"_tabText_8105c",serverTabs:"_serverTabs_8105c",scrollingTabCont:"_scrollingTabCont_8105c",scrollingTab:"_scrollingTab_8105c",savedSessions:"_savedSessions_8105c",newSessionForm:"_newSessionForm_8105c",capsFormattedCol:"_capsFormattedCol_8105c",formattedCaps:"_formattedCaps_8105c",formattedCapsBody:"_formattedCapsBody_8105c","start-session-button":"_start-session-button_8105c","filepath-button":"_filepath-button_8105c",capsFormCol:"_capsFormCol_8105c",capsFormRow:"_capsFormRow_8105c",capsBoxFont:"_capsBoxFont_8105c",capsValueControl:"_capsValueControl_8105c",fileControlWrapper:"_fileControlWrapper_8105c",localDesc:"_localDesc_8105c",selected:"_selected_8105c",capsNameEditorButton:"_capsNameEditorButton_8105c",capsEditorControls:"_capsEditorControls_8105c",capsEditorButton:"_capsEditorButton_8105c",capsEditor:"_capsEditor_8105c",capsEditorTitle:"_capsEditorTitle_8105c",capsEditorBody:"_capsEditorBody_8105c",capsEditorBodyFull:"_capsEditorBodyFull_8105c",capsEditorBodyResized:"_capsEditorBodyResized_8105c",advancedSettingsContainerCol:"_advancedSettingsContainerCol_8105c",advancedSettingsContainer:"_advancedSettingsContainer_8105c","add-desired-capability-button":"_add-desired-capability-button_8105c",editSession:"_editSession_8105c",btnReload:"_btnReload_8105c",btnDeleteCap:"_btnDeleteCap_8105c",inputDataCenter:"_inputDataCenter_8105c",addonDataCenter:"_addonDataCenter_8105c",addonDataCenterRadioContainer:"_addonDataCenterRadioContainer_8105c"};
},{}],"HVTW":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=a(require("react")),r=require("antd"),t=a(require("./Session.css"));function a(e){return e&&e.__esModule?e:{default:e}}const l="https://xxxx.headspin.io:4723/v0/your-api-token/wd/hub",s=({server:a,setServerParam:s,t:u})=>e.default.createElement(r.Form,null,e.default.createElement(r.Row,{gutter:8},e.default.createElement(r.Col,{span:24},e.default.createElement(r.Form.Item,null,e.default.createElement(r.Input,{className:t.default.customServerInputLeft,id:"headspinServerHost",placeholder:l,addonBefore:u("serverTabHeasdpinWebDriverURL"),value:a.headspin.webDriverUrl,onChange:e=>s("webDriverUrl",e.target.value)}),e.default.createElement("p",{className:t.default.localDesc},u("sessionHeadspinWebDriverURLDescription"))))));var u=s;exports.default=u;
},{"./Session.css":"NkMK"}],"uK2B":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.ROW=exports.INPUT=exports.BUTTON=exports.ALERT=void 0;const e={DEFAULT:"default",PRIMARY:"primary",DISABLED:"disabled",DANGER:"danger"};exports.BUTTON=e;const t={ERROR:"error",WARNING:"warning",INFO:"info"};exports.ALERT=t;const r={NUMBER:"number",TEXT:"text",TEXTAREA:"textarea",PASSWORD:"password",SUBMIT:"submit"};exports.INPUT=r;const s={FLEX:"flex"};exports.ROW=s;
},{}],"lmnG":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=a(require("react")),r=require("antd"),t=require("../AntdTypes");function a(e){return e&&e.__esModule?e:{default:e}}const n=e=>process.env.BROWSERSTACK_USERNAME?e("usingDataFoundIn",{environmentVariable:"BROWSERSTACK_USERNAME"}):e("yourUsername"),s=e=>process.env.BROWSERSTACK_ACCESS_KEY?e("usingDataFoundIn",{environmentVariable:"BROWSERSTACK_ACCESS_KEY"}):e("yourAccessKey"),l=({server:a,setServerParam:l,t:o})=>e.default.createElement(r.Form,null,e.default.createElement(r.Row,{gutter:8},e.default.createElement(r.Col,{span:12},e.default.createElement(r.Form.Item,null,e.default.createElement(r.Input,{id:"browserstackUsername",placeholder:n(o),addonBefore:o("BrowserStack Username"),value:a.browserstack.username,onChange:e=>l("username",e.target.value)}))),e.default.createElement(r.Col,{span:12},e.default.createElement(r.Form.Item,null,e.default.createElement(r.Input,{id:"browserstackPassword",type:t.INPUT.PASSWORD,placeholder:s(o),addonBefore:o("BrowserStack Access Key"),value:a.browserstack.accessKey,onChange:e=>l("accessKey",e.target.value)})))));var o=l;exports.default=o;
},{"../AntdTypes":"uK2B"}],"D5L8":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=r(require("react")),a=require("antd"),t=require("../AntdTypes");function r(e){return e&&e.__esModule?e:{default:e}}const n=e=>process.env.LAMBDATEST_USERNAME?e("usingDataFoundIn",{environmentVariable:"LAMBDATEST_USERNAME"}):e("yourUsername"),l=e=>process.env.LAMBDATEST_ACCESS_KEY?e("usingDataFoundIn",{environmentVariable:"LAMBDATEST_ACCESS_KEY"}):e("yourAccessKey"),s=({server:r,setServerParam:s,t:u})=>e.default.createElement(a.Form,null,e.default.createElement(a.Row,{gutter:8},e.default.createElement(a.Col,{span:12},e.default.createElement(a.Form.Item,null,e.default.createElement(a.Input,{id:"lambdatestUsername",placeholder:n(u),addonBefore:u("LambdaTest Username"),value:r.lambdatest.username,onChange:e=>s("username",e.target.value)}))),e.default.createElement(a.Col,{span:12},e.default.createElement(a.Form.Item,null,e.default.createElement(a.Input,{id:"lambdatestPassword",type:t.INPUT.PASSWORD,placeholder:l(u),addonBefore:u("LambdaTest Access Key"),value:r.lambdatest.accessKey,onChange:e=>s("accessKey",e.target.value)})))));var u=s;exports.default=u;
},{"../AntdTypes":"uK2B"}],"W0lq":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=a(require("react")),t=require("antd"),r=require("../AntdTypes");function a(e){return e&&e.__esModule?e:{default:e}}const l=e=>process.env.BITBAR_API_KEY?e("usingDataFoundIn",{environmentVariable:"BITBAR_API_KEY"}):e("yourApiKey"),n=({server:a,setServerParam:n,t:u})=>e.default.createElement(t.Form,null,e.default.createElement(t.Row,{gutter:8},e.default.createElement(t.Col,{span:24},e.default.createElement(t.Form.Item,null,e.default.createElement(t.Input,{id:"bitbarApiKey",type:r.INPUT.PASSWORD,placeholder:l(u),addonBefore:u("Bitbar API Key"),value:a.bitbar.apiKey,onChange:e=>n("apiKey",e.target.value)})))));var u=n;exports.default=u;
},{"../AntdTypes":"uK2B"}],"mmMc":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=r(require("react")),t=require("antd"),a=require("../AntdTypes");function r(e){return e&&e.__esModule?e:{default:e}}const n=e=>process.env.KOBITON_USERNAME?e("usingDataFoundIn",{environmentVariable:"KOBITON_USERNAME"}):e("yourUsername"),o=e=>process.env.KOBITON_ACCESS_KEY?e("usingDataFoundIn",{environmentVariable:"KOBITON_ACCESS_KEY"}):e("yourAccessKey"),l=({server:r,setServerParam:l,t:u})=>e.default.createElement(t.Form,null,e.default.createElement(t.Row,{gutter:8},e.default.createElement(t.Col,{span:12},e.default.createElement(t.Form.Item,null,e.default.createElement(t.Input,{id:"kobitonUsername",placeholder:n(u),addonBefore:u("Your Kobiton Username"),value:r.kobiton.username,onChange:e=>l("username",e.target.value)}))),e.default.createElement(t.Col,{span:12},e.default.createElement(t.Form.Item,null,e.default.createElement(t.Input,{id:"kobitonAccessKey",type:a.INPUT.PASSWORD,placeholder:o(u),addonBefore:u("Kobiton Access Key"),value:r.kobiton.accessKey,onChange:e=>l("accessKey",e.target.value)})))));var u=l;exports.default=u;
},{"../AntdTypes":"uK2B"}],"llAx":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=a(require("react")),t=require("antd"),r=a(require("./Session.css"));function a(e){return e&&e.__esModule?e:{default:e}}const l="cloud.Perfectomobile.com",o=e=>e.perfecto.ssl?"443":"80",n=e=>process.env.PERFECTO_TOKEN?e("usingDataFoundIn",{environmentVariable:"PERFECTO_TOKEN"}):e("Add your token"),u=({server:a,setServerParam:u,t:c})=>e.default.createElement(t.Form,null,e.default.createElement(t.Row,{gutter:8},e.default.createElement(t.Col,{span:9},e.default.createElement(t.Form.Item,null,e.default.createElement(t.Input,{className:r.default.customServerInputLeft,id:"PerfectoServerHost",placeholder:l,addonBefore:c("Perfecto Host"),value:a.perfecto.hostname,onChange:e=>u("hostname",e.target.value)}))),e.default.createElement(t.Col,{span:4},e.default.createElement(t.Form.Item,null,e.default.createElement(t.Input,{id:"PerfectoPort",placeholder:o(a),addonBefore:c("Perfecto Port"),value:a.perfecto.port,onChange:e=>u("port",e.target.value)}))),e.default.createElement(t.Col,{span:9},e.default.createElement(t.Form.Item,null,e.default.createElement(t.Input,{id:"token",placeholder:n(c),addonBefore:c("Perfecto Token"),value:a.perfecto.token,onChange:e=>u("token",e.target.value)}))),e.default.createElement(t.Col,{span:2},e.default.createElement(t.Form.Item,null,e.default.createElement(t.Checkbox,{checked:!!a.perfecto.ssl,onChange:e=>u("ssl",e.target.checked)}," ","SSL")))));var c=u;exports.default=c;
},{"./Session.css":"NkMK"}],"rXJM":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=u(require("react")),t=require("antd"),a=u(require("./Session.css")),l=require("../AntdTypes");function u(e){return e&&e.__esModule?e:{default:e}}const r="username@pcloudy.com",d="cloud.pcloudy.com",o="kjdgtdwn65fdasd78uy6y",n=({server:u,setServerParam:r,t:d})=>e.default.createElement(t.Form,null,e.default.createElement(t.Row,{gutter:8},e.default.createElement(t.Col,{span:8},e.default.createElement(t.Form.Item,null,e.default.createElement(t.Input,{className:a.default.customServerInputLeft,id:"PcloudyServerHost",placeholder:"cloud.pcloudy.com",addonBefore:d("Pcloudy Host"),value:u.pcloudy.hostname,onChange:e=>r("hostname",e.target.value)}))),e.default.createElement(t.Col,{span:8},e.default.createElement(t.Form.Item,null,e.default.createElement(t.Input,{id:"username",type:l.INPUT.TEXT,placeholder:"username@pcloudy.com",addonBefore:d("Pcloudy User Name"),value:u.pcloudy.username,onChange:e=>r("username",e.target.value)}))),e.default.createElement(t.Col,{span:8},e.default.createElement(t.Form.Item,null,e.default.createElement(t.Input,{id:"accessKey",type:l.INPUT.PASSWORD,placeholder:"kjdgtdwn65fdasd78uy6y",addonBefore:d("Pcloudy API Key"),value:u.pcloudy.accessKey,onChange:e=>r("accessKey",e.target.value)})))));var c=n;exports.default=c;
},{"./Session.css":"NkMK","../AntdTypes":"uK2B"}],"wdjn":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=r(require("react")),a=require("antd"),t=r(require("./Session.css")),l=require("../AntdTypes");function r(e){return e&&e.__esModule?e:{default:e}}const n=e=>process.env.SAUCE_USERNAME?e("usingDataFoundIn",{environmentVariable:"SAUCE_USERNAME"}):e("yourUsername"),u=e=>process.env.SAUCE_ACCESS_KEY?e("usingDataFoundIn",{environmentVariable:"SAUCE_ACCESS_KEY"}):e("yourAccessKey"),o=({server:r,setServerParam:o,t:s})=>e.default.createElement(a.Form,null,e.default.createElement(a.Row,{gutter:8},e.default.createElement(a.Col,{span:12},e.default.createElement(a.Form.Item,null,e.default.createElement(a.Input,{id:"sauceUsername",placeholder:n(s),addonBefore:s("Sauce Username"),value:r.sauce.username,onChange:e=>o("username",e.target.value)}))),e.default.createElement(a.Col,{span:12},e.default.createElement(a.Form.Item,null,e.default.createElement(a.Input,{id:"saucePassword",type:l.INPUT.PASSWORD,placeholder:u(s),addonBefore:s("Sauce Access Key"),value:r.sauce.accessKey,onChange:e=>o("accessKey",e.target.value)})))),e.default.createElement(a.Row,{gutter:8},e.default.createElement(a.Col,{span:8},e.default.createElement(a.Form.Item,null,e.default.createElement("div",{className:["ant-input-group-addon",t.default.addonDataCenter].join(" ")},s("SauceLabs Data Center")),e.default.createElement(a.Radio.Group,{className:[t.default.inputDataCenter,t.default.addonDataCenterRadioContainer].join(" "),buttonStyle:"solid",defaultValue:"us-west-1",id:"sauceObjectDataCenter",value:r.sauce.dataCenter,onChange:e=>o("dataCenter",e.target.value)},e.default.createElement(a.Tooltip,{placement:"top",title:s("UP")},e.default.createElement(a.Radio,{value:"us-west-1"},s("US"))),e.default.createElement(a.Radio,{value:"eu-central-1"},s("EU"))))),e.default.createElement(a.Col,{span:8,align:"right"},e.default.createElement(a.Form.Item,null,e.default.createElement(a.Checkbox,{checked:!!r.sauce.useSCProxy,onChange:e=>o("useSCProxy",e.target.checked)}," ",s("proxyThroughSC")))),e.default.createElement(a.Col,{span:5},e.default.createElement(a.Form.Item,null,e.default.createElement(a.Input,{addonBefore:s("Host"),placeholder:s("localhost"),disabled:!r.sauce.useSCProxy,value:r.sauce.scHost,onChange:e=>o("scHost",e.target.value)}))),e.default.createElement(a.Col,{span:3},e.default.createElement(a.Form.Item,null,e.default.createElement(a.Input,{addonBefore:s("Port"),placeholder:4445,disabled:!r.sauce.useSCProxy,value:r.sauce.scPort,onChange:e=>o("scPort",e.target.value)})))));var s=o;exports.default=s;
},{"./Session.css":"NkMK","../AntdTypes":"uK2B"}],"tCTm":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=a(require("react")),t=require("antd"),r=require("../AntdTypes");function a(e){return e&&e.__esModule?e:{default:e}}const n=e=>process.env.TB_KEY?e("usingDataFoundIn",{environmentVariable:"TB_KEY"}):e("yourUsername"),l=e=>process.env.TB_SECRET?e("usingDataFoundIn",{environmentVariable:"TB_SECRET"}):e("yourAccessKey"),o=({server:a,setServerParam:o,t:u})=>e.default.createElement(t.Form,null,e.default.createElement(t.Row,{gutter:8},e.default.createElement(t.Col,{span:12},e.default.createElement(t.Form.Item,null,e.default.createElement(t.Input,{id:"testingbotKey",placeholder:n(u),addonBefore:u("TestingBot Key"),value:a.testingbot.key,onChange:e=>o("key",e.target.value)}))),e.default.createElement(t.Col,{span:12},e.default.createElement(t.Form.Item,null,e.default.createElement(t.Input,{id:"testingbotSecret",type:r.INPUT.PASSWORD,placeholder:l(u),addonBefore:u("TestingBot Secret"),value:a.testingbot.secret,onChange:e=>o("secret",e.target.value)})))));var u=o;exports.default=u;
},{"../AntdTypes":"uK2B"}],"Wqs3":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=a(require("react")),t=require("antd"),r=a(require("./Session.css"));function a(e){return e&&e.__esModule?e:{default:e}}const l="accessKey",s="https://example.experitest.com",u=({server:a,setServerParam:l,t:u})=>e.default.createElement(t.Form,null,e.default.createElement(t.Row,{gutter:8},e.default.createElement(t.Col,{span:12},e.default.createElement(t.Form.Item,null,e.default.createElement(t.Input,{className:r.default.customServerInputLeft,id:"ExperitestServerUrl",placeholder:s,addonBefore:u("experitestUrl"),value:a.experitest.url,onChange:e=>l("url",e.target.value)}))),e.default.createElement(t.Col,{span:12},e.default.createElement(t.Form.Item,null,e.default.createElement(t.Input,{className:r.default.customServerInputLeft,id:"ExperitestServerAccessKey",placeholder:"accessKey",addonBefore:u("experitestAccessKey"),value:a.experitest.accessKey,onChange:e=>l("accessKey",e.target.value)})))));var c=u;exports.default=c;
},{"./Session.css":"NkMK"}],"MGIA":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=r(require("react")),t=require("antd");function r(e){return e&&e.__esModule?e:{default:e}}const o=e=>process.env.ROBOTQA_TOKEN?e("usingDataFoundIn",{environmentVariable:"ROBOTQA_TOKEN"}):e("Add your token"),a=({server:r,setServerParam:a,t:n})=>e.default.createElement(t.Form,null,e.default.createElement(t.Row,{gutter:8},e.default.createElement(t.Col,{span:24},e.default.createElement(t.Form.Item,null,e.default.createElement(t.Input,{id:"robotQAToken",placeholder:o(n),addonBefore:n("RobotQA Token"),value:r.roboticmobi.token,onChange:e=>a("token",e.target.value)})))));var n=a;exports.default=n;
},{}],"nRCv":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=a(require("react")),t=require("antd"),r=require("../AntdTypes");function a(e){return e&&e.__esModule?e:{default:e}}const l=({server:a,setServerParam:l,t:n})=>e.default.createElement(t.Form,null,e.default.createElement(t.Row,{gutter:8},e.default.createElement(t.Col,{span:24},e.default.createElement(t.Form.Item,null,e.default.createElement(t.Input,{id:"remoteTestKitAccessToken",type:r.INPUT.PASSWORD,addonBefore:n("RemoteTestKit AccessToken"),value:a.remotetestkit.token,onChange:e=>l("token",e.target.value)})))));var n=l;exports.default=n;
},{"../AntdTypes":"uK2B"}],"Pu0c":[function(require,module,exports) {
module.exports="sauce_logo.7b689af7.svg";
},{}],"Ztp2":[function(require,module,exports) {
module.exports="headspin_logo.557fb4f4.svg";
},{}],"nUxl":[function(require,module,exports) {
module.exports="browserstack_logo.738dfe32.svg";
},{}],"FeTL":[function(require,module,exports) {
module.exports="lambdatest_logo.c2fa0064.svg";
},{}],"opyt":[function(require,module,exports) {
module.exports="bitbar_logo.192f8b19.svg";
},{}],"ULVG":[function(require,module,exports) {
module.exports="kobiton_logo.53ea17ad.svg";
},{}],"nLcv":[function(require,module,exports) {
module.exports="perfecto_logo.db858a29.svg";
},{}],"vYYB":[function(require,module,exports) {
module.exports="pcloudy_logo.1d5301b4.svg";
},{}],"f0yH":[function(require,module,exports) {
module.exports="testingbot_logo.d0430f78.svg";
},{}],"H1Zp":[function(require,module,exports) {
module.exports="experitest_logo.698fdbd5.svg";
},{}],"COGI":[function(require,module,exports) {
module.exports="robotqa_logo.7d16ed03.svg";
},{}],"L546":[function(require,module,exports) {
module.exports="remotetestkit_logo.8802f193.svg";
},{}],"kZCC":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=k(require("react")),t=k(require("./ServerTabHeadspin")),a=k(require("./ServerTabBrowserstack")),l=k(require("./ServerTabLambdatest")),r=k(require("./ServerTabBitbar")),u=k(require("./ServerTabKobiton")),d=k(require("./ServerTabPerfecto")),s=k(require("./ServerTabPcloudy")),f=k(require("./ServerTabSauce")),o=k(require("./ServerTabTestingbot")),c=k(require("./ServerTabExperitest")),m=k(require("./ServerTabRobotQA")),i=k(require("./ServerTabRemoteTestKit")),b=k(require("./Session.css")),g=k(require("../../images/sauce_logo.svg")),n=k(require("../../images/headspin_logo.svg")),E=k(require("../../images/browserstack_logo.svg")),v=k(require("../../images/lambdatest_logo.svg")),q=k(require("../../images/bitbar_logo.svg")),p=k(require("../../images/kobiton_logo.svg")),T=k(require("../../images/perfecto_logo.svg")),x=k(require("../../images/pcloudy_logo.svg")),_=k(require("../../images/testingbot_logo.svg")),h=k(require("../../images/experitest_logo.svg")),S=k(require("../../images/robotqa_logo.svg")),N=k(require("../../images/remotetestkit_logo.svg"));function k(e){return e&&e.__esModule?e:{default:e}}const y={sauce:{tabhead:()=>e.default.createElement("span",{className:b.default.tabText},e.default.createElement("img",{src:g.default})),tab:t=>e.default.createElement(f.default,t),logo:g.default},headspin:{tabhead:()=>e.default.createElement("span",{className:b.default.tabText},e.default.createElement("img",{src:n.default})),tab:a=>e.default.createElement(t.default,a),logo:n.default},browserstack:{tabhead:()=>e.default.createElement("span",{className:b.default.tabText},e.default.createElement("img",{src:E.default})),tab:t=>e.default.createElement(a.default,t),logo:E.default},lambdatest:{tabhead:()=>e.default.createElement("span",{className:b.default.tabText},e.default.createElement("img",{src:v.default})),tab:t=>e.default.createElement(l.default,t),logo:v.default},bitbar:{tabhead:()=>e.default.createElement("span",{className:b.default.tabText},e.default.createElement("img",{src:q.default})),tab:t=>e.default.createElement(r.default,t),logo:q.default},kobiton:{tabhead:()=>e.default.createElement("span",{className:b.default.tabText},e.default.createElement("img",{src:p.default})),tab:t=>e.default.createElement(u.default,t),logo:p.default},perfecto:{tabhead:()=>e.default.createElement("span",{className:b.default.tabText},e.default.createElement("img",{src:T.default})),tab:t=>e.default.createElement(d.default,t),logo:T.default},pcloudy:{tabhead:()=>e.default.createElement("span",{className:b.default.tabText},e.default.createElement("img",{src:x.default})),tab:t=>e.default.createElement(s.default,t),logo:x.default},testingbot:{tabhead:()=>e.default.createElement("span",{className:b.default.tabText},e.default.createElement("img",{src:_.default})),tab:t=>e.default.createElement(o.default,t),logo:_.default},experitest:{tabhead:()=>e.default.createElement("span",{className:b.default.tabText},e.default.createElement("img",{src:h.default})),tab:t=>e.default.createElement(c.default,t),logo:h.default},roboticmobi:{tabhead:()=>e.default.createElement("span",{className:b.default.tabText},e.default.createElement("img",{src:S.default})),tab:t=>e.default.createElement(m.default,t),logo:S.default},remotetestkit:{tabhead:()=>e.default.createElement("span",{className:b.default.tabText},e.default.createElement("img",{src:N.default})),tab:t=>e.default.createElement(i.default,t),logo:N.default}};var w=y;exports.default=w;
},{"./ServerTabHeadspin":"HVTW","./ServerTabBrowserstack":"lmnG","./ServerTabLambdatest":"D5L8","./ServerTabBitbar":"W0lq","./ServerTabKobiton":"mmMc","./ServerTabPerfecto":"llAx","./ServerTabPcloudy":"rXJM","./ServerTabSauce":"wdjn","./ServerTabTestingbot":"tCTm","./ServerTabExperitest":"Wqs3","./ServerTabRobotQA":"MGIA","./ServerTabRemoteTestKit":"nRCv","./Session.css":"NkMK","../../images/sauce_logo.svg":"Pu0c","../../images/headspin_logo.svg":"Ztp2","../../images/browserstack_logo.svg":"nUxl","../../images/lambdatest_logo.svg":"FeTL","../../images/bitbar_logo.svg":"opyt","../../images/kobiton_logo.svg":"ULVG","../../images/perfecto_logo.svg":"nLcv","../../images/pcloudy_logo.svg":"vYYB","../../images/testingbot_logo.svg":"f0yH","../../images/experitest_logo.svg":"H1Zp","../../images/robotqa_logo.svg":"COGI","../../images/remotetestkit_logo.svg":"L546"}],"hg1V":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.APPIUM_SESSION_EXTENSION=void 0,exports.getAppiumSessionFilePath=r,exports.getSaveableState=s;const e="1.0";function r(e,r,s){if(s)return!1;if("darwin"===process.platform&&!s)return!1;return e[r?1:2]}function s(r){return{version:e,caps:r.caps,server:r.server,serverType:r.serverType,visibleProviders:r.visibleProviders}}const t="appiumsession";exports.APPIUM_SESSION_EXTENSION="appiumsession";
},{}],"VMiD":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.VISIBLE_PROVIDERS=exports.ServerTypes=exports.SWITCHED_TABS=exports.SHOW_DESIRED_CAPS_JSON_ERROR=exports.SET_STATE_FROM_URL=exports.SET_STATE_FROM_SAVED=exports.SET_SERVER_PARAM=exports.SET_SERVER=exports.SET_SAVE_AS_TEXT=exports.SET_RAW_DESIRED_CAPS=exports.SET_PROVIDERS=exports.SET_DESIRED_CAPS_NAME=exports.SET_CAPS_AND_SERVER=exports.SET_CAPABILITY_PARAM=exports.SET_ATTACH_SESS_ID=exports.SET_ADD_VENDOR_PREFIXES=exports.SAVE_SESSION_REQUESTED=exports.SAVE_SESSION_DONE=exports.SAVE_RAW_DESIRED_CAPS=exports.SAVE_DESIRED_CAPS_NAME=exports.SAVE_AS_MODAL_REQUESTED=exports.REMOVE_CAPABILITY=exports.NEW_SESSION_REQUESTED=exports.NEW_SESSION_LOADING=exports.NEW_SESSION_DONE=exports.IS_ADDING_CLOUD_PROVIDER=exports.HIDE_SAVE_AS_MODAL_REQUESTED=exports.GET_SESSIONS_REQUESTED=exports.GET_SESSIONS_DONE=exports.GET_SAVED_SESSIONS_REQUESTED=exports.GET_SAVED_SESSIONS_DONE=exports.ENABLE_DESIRED_CAPS_NAME_EDITOR=exports.ENABLE_DESIRED_CAPS_EDITOR=exports.DELETE_SAVED_SESSION_REQUESTED=exports.DELETE_SAVED_SESSION_DONE=exports.DEFAULT_SERVER_PORT=exports.DEFAULT_SERVER_PATH=exports.DEFAULT_SERVER_HOST=exports.CONN_RETRIES=exports.CHANGE_SERVER_TYPE=exports.CHANGE_CAPABILITY=exports.ADD_CAPABILITY=exports.ABORT_DESIRED_CAPS_NAME_EDITOR=exports.ABORT_DESIRED_CAPS_EDITOR=void 0,exports.abortDesiredCapsEditor=Xe,exports.abortDesiredCapsNameEditor=Ge,exports.addCapability=xe,exports.addCloudProvider=et,exports.addVisibleProvider=st,exports.bindWindowClose=at,exports.changeCapability=Ie,exports.changeServerType=Me,exports.deleteSavedSession=ke,exports.getCapsObject=fe,exports.getRunningSessions=Fe,exports.getSavedSessions=Ve,exports.hideSaveAsModal=Le,exports.initFromQueryString=Et,exports.newSession=Pe,exports.removeCapability=Ne,exports.removeVisibleProvider=rt,exports.requestSaveAsModal=we,exports.saveDesiredCapsName=Qe,exports.saveFile=qe,exports.saveRawDesiredCaps=ze,exports.saveSession=he,exports.setAddVendorPrefixes=it,exports.setAttachSessId=Be,exports.setCapabilityParam=be,exports.setCapsAndServer=ye,exports.setDesiredCapsName=je,exports.setLocalServerParams=Ke,exports.setRawDesiredCaps=Ze,exports.setSaveAsText=Ue,exports.setSavedServerParams=Ye,exports.setServerParam=We,exports.setStateFromAppiumFile=He,exports.setVisibleProviders=ot,exports.showError=Oe,exports.startDesiredCapsEditor=Je,exports.startDesiredCapsNameEditor=$e,exports.stopAddCloudProvider=tt,exports.switchTabs=ge;var e=require("../../shared/settings"),t=require("uuid"),s=require("redux-first-history"),r=require("antd"),o=require("lodash"),n=require("./Inspector"),a=l(require("../../configs/i18next.config.renderer")),i=l(require("../components/Session/CloudProviders")),E=require("web2driver"),S=require("../util"),p=l(require("ky/umd")),c=l(require("moment")),_=require("../components/Inspector/shared"),u=require("../polyfills"),d=require("../../main/helpers");function l(e){return e&&e.__esModule?e:{default:e}}const A="NEW_SESSION_REQUESTED";exports.NEW_SESSION_REQUESTED=A;const v="NEW_SESSION_LOADING";exports.NEW_SESSION_LOADING=v;const R="NEW_SESSION_DONE";exports.NEW_SESSION_DONE=R;const D="CHANGE_CAPABILITY";exports.CHANGE_CAPABILITY=D;const T="SAVE_SESSION_REQUESTED";exports.SAVE_SESSION_REQUESTED=T;const m="SAVE_SESSION_DONE";exports.SAVE_SESSION_DONE=m;const f="GET_SAVED_SESSIONS_REQUESTED";exports.GET_SAVED_SESSIONS_REQUESTED=f;const O="GET_SAVED_SESSIONS_DONE";exports.GET_SAVED_SESSIONS_DONE=O;const y="SET_CAPABILITY_PARAM";exports.SET_CAPABILITY_PARAM=y;const I="ADD_CAPABILITY";exports.ADD_CAPABILITY=I;const x="REMOVE_CAPABILITY";exports.REMOVE_CAPABILITY=x;const b="SWITCHED_TABS";exports.SWITCHED_TABS=b;const N="SET_CAPS_AND_SERVER";exports.SET_CAPS_AND_SERVER=N;const C="SAVE_AS_MODAL_REQUESTED";exports.SAVE_AS_MODAL_REQUESTED=C;const P="HIDE_SAVE_AS_MODAL_REQUESTED";exports.HIDE_SAVE_AS_MODAL_REQUESTED=P;const h="SET_SAVE_AS_TEXT";exports.SET_SAVE_AS_TEXT=h;const V="DELETE_SAVED_SESSION_REQUESTED";exports.DELETE_SAVED_SESSION_REQUESTED=V;const g="DELETE_SAVED_SESSION_DONE";exports.DELETE_SAVED_SESSION_DONE=g;const w="CHANGE_SERVER_TYPE";exports.CHANGE_SERVER_TYPE=w;const L="SET_SERVER_PARAM";exports.SET_SERVER_PARAM=L;const U="SET_SERVER";exports.SET_SERVER=U;const k="VISIBLE_PROVIDERS";exports.VISIBLE_PROVIDERS=k;const B="SET_ATTACH_SESS_ID";exports.SET_ATTACH_SESS_ID=B;const M="GET_SESSIONS_REQUESTED";exports.GET_SESSIONS_REQUESTED=M;const W="GET_SESSIONS_DONE";exports.GET_SESSIONS_DONE=W;const K="ENABLE_DESIRED_CAPS_NAME_EDITOR";exports.ENABLE_DESIRED_CAPS_NAME_EDITOR=K;const Y="ABORT_DESIRED_CAPS_NAME_EDITOR";exports.ABORT_DESIRED_CAPS_NAME_EDITOR=Y;const H="SAVE_DESIRED_CAPS_NAME";exports.SAVE_DESIRED_CAPS_NAME=H;const q="SET_DESIRED_CAPS_NAME";exports.SET_DESIRED_CAPS_NAME=q;const F="ENABLE_DESIRED_CAPS_EDITOR";exports.ENABLE_DESIRED_CAPS_EDITOR=F;const $="ABORT_DESIRED_CAPS_EDITOR";exports.ABORT_DESIRED_CAPS_EDITOR=$;const G="SAVE_RAW_DESIRED_CAPS";exports.SAVE_RAW_DESIRED_CAPS=G;const Q="SET_RAW_DESIRED_CAPS";exports.SET_RAW_DESIRED_CAPS=Q;const j="SHOW_DESIRED_CAPS_JSON_ERROR";exports.SHOW_DESIRED_CAPS_JSON_ERROR=j;const J="IS_ADDING_CLOUD_PROVIDER";exports.IS_ADDING_CLOUD_PROVIDER=J;const X="SET_PROVIDERS";exports.SET_PROVIDERS=X;const z="SET_ADD_VENDOR_PREFIXES";exports.SET_ADD_VENDOR_PREFIXES=z;const Z="SET_STATE_FROM_URL";exports.SET_STATE_FROM_URL=Z;const ee="SET_STATE_FROM_SAVED";exports.SET_STATE_FROM_SAVED=ee;const te="appium:newCommandTimeout",se="appium:connectHardwareKeyboard",re="appium:nativeWebScreenshot",oe="appium:ensureWebviewsHavePages",ne="appium:includeSafariInWebviews",ae="last_opened_file",ie="1",Ee="mjpegScreenshotUrl",Se="mjpegServerPort",pe=0;exports.CONN_RETRIES=pe;const ce=3e5,_e="application/json; charset=utf-8",ue=3600;let de=!0;const le={};for(const St of(0,o.keys)(i.default))le[St]=St;le.local="local",le.remote="remote";const Ae=le;exports.ServerTypes=Ae;const ve="/";exports.DEFAULT_SERVER_PATH=ve;const Re="127.0.0.1";exports.DEFAULT_SERVER_HOST=Re;const De=4723;exports.DEFAULT_SERVER_PORT=De;const Te="sauce:options",me=["object","number","boolean"];function fe(e){return Object.assign({},...e.map(e=>{if(-1!==me.indexOf(e.type))try{let s=JSON.parse(e.value);return{[e.name]:s}}catch(t){}return{[e.name]:e.value}}))}function Oe(e,t,s=5){let n;if(e["jsonwire-error"]&&7===e["jsonwire-error"].status)10===t&&(t="findElements"),n=a.default.t("findElementFailure",{methodName:t}),e.message&&(n+=` Original error: '${e.message}'`);else if(e.data){try{e.data=JSON.parse(e.data)}catch(i){}n=e.data.value&&e.data.value.message?e.data.value.message:e.data}else n=e.message?e.message:e.code?e.code:a.default.t("Could not start session");("ECONNREFUSED"===n||(0,o.includes)(n,"Failed to fetch"))&&(n=a.default.t("couldNotConnect")),r.notification.error({message:t?a.default.t("callToMethodFailed",{methodName:t}):a.default.t("Error"),description:n,duration:s})}function ye(e,t,s,r,o){return n=>{n({type:N,server:e,serverType:t,caps:s,uuid:r,name:o})}}function Ie(e,t){return s=>{s({type:D,key:e,value:t})}}function xe(){return e=>{e({type:I})}}function be(e,t,s){return r=>{r({type:y,index:e,name:t,value:s})}}function Ne(e){return t=>{t({type:x,index:e})}}function Ce(e,t,s){const{server:r,serverType:o,capsUUID:n,capsName:a}=s().session,i=(0,S.addVendorPrefixes)(e);return ye(r,o,i,n,a)(t),i}function Pe(t,i=null){return async(S,p)=>{let u=p().session;!i&&u.addVendorPrefixes&&(t=Ce(t,S,p)),S({type:A,caps:t});let d,l,D,T,m,f,O,y=t?fe(t):{};switch(y=nt(y),u.serverType){case Ae.local:"0.0.0.0"===(d=u.server.local.hostname)&&(d="localhost"),l=u.server.local.port;break;case Ae.remote:d=u.server.remote.hostname,l=u.server.remote.port,f=u.server.remote.path,m=u.server.remote.ssl;break;case Ae.sauce:if(f="/wd/hub",d=`ondemand.${u.server.sauce.dataCenter}.saucelabs.com`,l=80,u.server.sauce.useSCProxy&&(d=u.server.sauce.scHost||"localhost",l=parseInt(u.server.sauce.scPort,10)||4445),D=u.server.sauce.username||process.env.SAUCE_USERNAME,T=u.server.sauce.accessKey||process.env.SAUCE_ACCESS_KEY,!D||!T)return void r.notification.error({message:a.default.t("Error"),description:a.default.t("sauceCredentialsRequired"),duration:4});if(m=!1,(0,o.isPlainObject)(y[Te])||(y[Te]={}),!y[Te].name){const e=(0,c.default)().format("lll");y[Te].name=`Appium Desktop Session -- ${e}`}break;case Ae.headspin:{let e;try{e=new URL(u.server.headspin.webDriverUrl)}catch(h){return void Oe(new Error(`${u.server.headspin.webDriverUrl} is invalid url`),null,0)}d=u.server.headspin.hostname=e.hostname,f=u.server.headspin.path=e.pathname,m=u.server.headspin.ssl="https:"===e.protocol,l=u.server.headspin.port=""===e.port?m?443:80:e.port;break}case Ae.perfecto:if(d=u.server.perfecto.hostname,l=u.server.perfecto.port||(u.server.perfecto.ssl?443:80),O=u.server.perfecto.token||process.env.PERFECTO_TOKEN,f=u.server.perfecto.path="/nexperience/perfectomobile/wd/hub",!O)return void r.notification.error({message:a.default.t("Error"),description:a.default.t("Perfecto SecurityToken is required"),duration:4});y["perfecto:options"]={securityToken:O},m=u.server.perfecto.ssl;break;case Ae.browserstack:if(d=u.server.browserstack.hostname=process.env.BROWSERSTACK_HOST||"hub-cloud.browserstack.com",l=u.server.browserstack.port=process.env.BROWSERSTACK_PORT||443,f=u.server.browserstack.path="/wd/hub",D=u.server.browserstack.username||process.env.BROWSERSTACK_USERNAME,y["bstack:options"]||(y["bstack:options"]={}),y["bstack:options"].source="appiumdesktop",T=u.server.browserstack.accessKey||process.env.BROWSERSTACK_ACCESS_KEY,!D||!T)return void r.notification.error({message:a.default.t("Error"),description:a.default.t("browserstackCredentialsRequired"),duration:4});m=u.server.browserstack.ssl=443===parseInt(l,10);break;case Ae.lambdatest:if(d=u.server.lambdatest.hostname=process.env.LAMBDATEST_HOST||"mobile-hub.lambdatest.com",l=u.server.lambdatest.port=process.env.LAMBDATEST_PORT||443,f=u.server.lambdatest.path="/wd/hub",D=u.server.lambdatest.username||process.env.LAMBDATEST_USERNAME,y.hasOwnProperty.call(y,"lt:options")?(y["lt:options"].source="appiumdesktop",y["lt:options"].isRealMobile=!0,u.server.advanced.useProxy&&(y["lt:options"].proxyUrl=(0,o.isUndefined)(u.server.advanced.proxy)?"":u.server.advanced.proxy)):(y["lambdatest:source"]="appiumdesktop",y["lambdatest:isRealMobile"]=!0,u.server.advanced.useProxy&&(y["lambdatest:proxyUrl"]=(0,o.isUndefined)(u.server.advanced.proxy)?"":u.server.advanced.proxy)),T=u.server.lambdatest.accessKey||process.env.LAMBDATEST_ACCESS_KEY,!D||!T)return void r.notification.error({message:a.default.t("Error"),description:a.default.t("lambdatestCredentialsRequired"),duration:4});m=u.server.lambdatest.ssl=443===parseInt(l,10);break;case Ae.bitbar:if(d=process.env.BITBAR_HOST||"appium.bitbar.com",l=u.server.bitbar.port=443,f=u.server.bitbar.path="/wd/hub",!(T=u.server.bitbar.apiKey||process.env.BITBAR_API_KEY))return void r.notification.error({message:a.default.t("Error"),description:a.default.t("bitbarCredentialsRequired"),duration:4});y["bitbar:options"]={source:"appiumdesktop",apiKey:T},m=u.server.bitbar.ssl=!0;break;case Ae.kobiton:if(d=process.env.KOBITON_HOST||"api.kobiton.com",l=u.server.kobiton.port=443,f=u.server.kobiton.path="/wd/hub",D=u.server.kobiton.username||process.env.KOBITON_USERNAME,T=u.server.kobiton.accessKey||process.env.KOBITON_ACCESS_KEY,y["kobiton:options"]={},y["kobiton:options"].source="appiumdesktop",!D||!T)return void r.notification.error({message:a.default.t("Error"),description:a.default.t("kobitonCredentialsRequired"),duration:4});m=u.server.kobiton.ssl=!0;break;case Ae.pcloudy:if(d=u.server.pcloudy.hostname,l=u.server.pcloudy.port=443,f=u.server.pcloudy.path="/objectspy/wd/hub",y.pCloudy_Username=u.server.pcloudy.username||process.env.PCLOUDY_USERNAME,y.pCloudy_ApiKey=u.server.pcloudy.accessKey||process.env.PCLOUDY_ACCESS_KEY,!u.server.pcloudy.username&&!process.env.PCLOUDY_USERNAME||!u.server.pcloudy.accessKey&&!process.env.PCLOUDY_ACCESS_KEY)return void r.notification.error({message:"Error",description:"PCLOUDY username and api key are required!",duration:4});m=u.server.pcloudy.ssl=!0;break;case Ae.testingbot:if(d=u.server.testingbot.hostname=process.env.TB_HOST||"hub.testingbot.com",l=u.server.testingbot.port=443,f=u.server.testingbot.path="/wd/hub",y["tb:options"]||(y["tb:options"]={}),y["tb:options"].key=u.server.testingbot.key||process.env.TB_KEY,y["tb:options"].secret=u.server.testingbot.secret||process.env.TB_SECRET,!u.server.testingbot.key&&!process.env.TB_KEY||!u.server.testingbot.secret&&!process.env.TB_SECRET)return void r.notification.error({message:"Error",description:a.default.t("testingbotCredentialsRequired"),duration:4});m=u.server.testingbot.ssl=!0;break;case Ae.experitest:{if(!u.server.experitest.url||!u.server.experitest.accessKey)return void r.notification.error({message:a.default.t("Error"),description:a.default.t("experitestAccessKeyURLRequired"),duration:4});let e;y["experitest:accessKey"]=u.server.experitest.accessKey;try{e=new URL(u.server.experitest.url)}catch(h){return void Oe(new Error(`${u.server.experitest.url} is invalid url`),null,0)}d=u.server.experitest.hostname=e.hostname,f=u.server.experitest.path="/wd/hub",m=u.server.experitest.ssl="https:"===e.protocol,l=u.server.experitest.port=""===e.port?m?443:80:e.port;break}case Ae.roboticmobi:d="remote.robotqa.com",f="/wd/hub",l=443,m=u.server.roboticmobi.ssl=!0,t&&(y["robotqa:options"]={},y["robotqa:options"].robotqa_token=u.server.roboticmobi.token||process.env.ROBOTQA_TOKEN);break;case Ae.remotetestkit:d="gwjp.appkitbox.com",f="/wd/hub",l=443,m=!0,y["remotetestkit:options"]={},y["remotetestkit:options"].accessToken=u.server.remotetestkit.token}f=f||ve,d=d||Re,l=l||De,S({type:v});const I={hostname:d,port:parseInt(l,10),protocol:m?"https":"http",path:f,connectionRetryCount:pe,connectionRetryTimeout:ce};D&&T&&(I.user=D,I.key=T),(0,o.isUndefined)(y[te])&&(y[te]=ue),(0,o.isUndefined)(y[se])&&(y[se]=!0),I.logLevel="development"===process.env.NODE_ENV?"info":"warn";let x=null;try{if(i){const e=u.runningAppiumSessions.find(e=>e.id===i).capabilities;I.isMobile=!0,I.isIOS=Boolean(e.platformName.match(/iOS/i)),I.isAndroid=Boolean(e.platformName.match(/Android/i)),(x=await E.Web2Driver.attachToSession(i,I,e))._isAttachedSession=!0}else x=await E.Web2Driver.remote(I,y)}catch(V){return void Oe(V,null,0)}finally{S({type:R}),await(0,e.setSetting)(e.SESSION_SERVER_PARAMS,u.server)}const{browserName:b=""}=y;let N=_.APP_MODE.NATIVE;if(""!==b.trim())try{N=_.APP_MODE.WEB_HYBRID,await x.navigateTo("https://appium.io")}catch(h){}let C=x.capabilities[`appium:${Ee}`]||x.capabilities[Ee]||null;const P=x.capabilities[`appium:${Se}`]||x.capabilities[Se]||null;!C&&P&&(C=`${m?"https":"http"}://${d}:${P}`),(0,n.setSessionDetails)({driver:x,sessionDetails:{desiredCapabilities:y,host:d,port:l,path:f,username:D,accessKey:T,https:m},mode:N,mjpegScreenshotUrl:C})(S),S((0,s.push)("/inspector"))}}function he(s,r,o,n){return async a=>{let{name:i,uuid:E}=n;a({type:T});let S=await(0,e.getSetting)(e.SAVED_SESSIONS)||[];if(E)for(let e of S)e.uuid===E&&(e.name=i,e.caps=o,e.server=s,e.serverType=r);else{E=(0,t.v4)();let e={date:Date.now(),name:i,uuid:E,caps:o,server:s,serverType:r};S.push(e)}await(0,e.setSetting)(e.SAVED_SESSIONS,S);const p=Ve();await p(a),a({type:N,server:s,serverType:r,caps:o,uuid:E,name:i}),a({type:m})}}function Ve(){return async t=>{t({type:f});let s=await(0,e.getSetting)(e.SAVED_SESSIONS);t({type:O,savedSessions:s})}}function ge(e){return t=>{t({type:b,key:e})}}function we(){return e=>{e({type:C})}}function Le(){return e=>{e({type:P})}}function Ue(e){return t=>{t({type:h,saveAsText:e})}}function ke(t){return async s=>{s({type:V,uuid:t});let r=(await(0,e.getSetting)(e.SAVED_SESSIONS)).filter(e=>e.uuid!==t);await(0,e.setSetting)(e.SAVED_SESSIONS,r),s({type:g}),s({type:O,savedSessions:r})}}function Be(e){return t=>{t({type:B,attachSessId:e})}}function Me(t){return async(s,r)=>{await(0,e.setSetting)(e.SESSION_SERVER_TYPE,t),s({type:w,serverType:t}),Fe()(s,r)}}function We(t,s,r){const n=(0,o.debounce)(Fe(),5e3);return async(o,a)=>{r=r||a().session.serverType,await(0,e.setSetting)(e.SESSION_SERVER_TYPE,r),o({type:L,serverType:r,name:t,value:s}),n(o,a)}}function Ke(){return async(t,s)=>{let r=await(0,e.getSetting)(e.SERVER_ARGS);if(r)t({type:L,serverType:Ae.local,name:"port",value:r.port}),t({type:L,serverType:Ae.local,name:"hostname",value:"localhost"});else if(t({type:L,serverType:Ae.local,name:"port",value:void 0}),t({type:L,serverType:Ae.local,name:"hostname",value:void 0}),"local"===s().session.serverType){const e=Me("remote");await e(t,s)}}}function Ye(){return async(t,s)=>{let r=await(0,e.getSetting)(e.SESSION_SERVER_PARAMS),n=await(0,e.getSetting)(e.SESSION_SERVER_TYPE),a=s().session.visibleProviders;r&&((0,o.keys)(i.default).includes(n)&&!a.includes(n)&&(n=Ae.remote),t({type:U,server:r,serverType:n}))}}function He(e=null){return async t=>{if(u.fs)try{let o=e;if(!e){const e=process.argv[process.argv.length-1];if(!e.startsWith("filename="))return;o=e.split("=")[1]}if(sessionStorage.getItem(ae)===o)return;const n=JSON.parse(await u.util.promisify(u.fs.readFile)(o,"utf8"));sessionStorage.setItem(ae,o),t({type:ee,state:n,filePath:o})}catch(s){r.notification.error({message:`Cannot open file '${e}'.\n ${s.message}\n ${s.stack}`})}}}function qe(e){return async(t,s)=>{const r=s().session,o=e||r.filePath;if(o){const e=(0,d.getSaveableState)(r);await u.util.promisify(u.fs.writeFile)(o,JSON.stringify(e,null,2),"utf8"),sessionStorage.setItem(ae,o)}else u.ipcRenderer.send("save-file-as")}}function Fe(){return async(e,t)=>{const s=t().session,{server:r,serverType:o}=s,n=r[o];let{hostname:a,port:i,path:E,ssl:S,username:c,accessKey:_}=n;if(o===Ae.remote&&(a=a||Re,i=i||De,E=E||ve),a&&i&&E)if(e({type:M}),["sauce"].includes(o))e({type:W});else try{const t=E.endsWith("/")?E:`${E}/`,s=c&&_?await(0,p.default)(`http${S?"s":""}://${a}:${i}${t}sessions`,{headers:{Authorization:`Basic ${btoa(`${c}:${_}`)}`,"content-type":_e}}).json():await(0,p.default)(`http${S?"s":""}://${a}:${i}${t}sessions`,{headers:{"content-type":_e}}).json();e({type:W,sessions:s.value})}catch(u){console.warn(`Ignoring error in getting list of active sessions: ${u}`),e({type:W})}}}function $e(){return e=>{e({type:K})}}function Ge(){return e=>{e({type:Y})}}function Qe(){return(e,t)=>{const{server:s,serverType:r,caps:o,capsUUID:n,desiredCapsName:a}=t().session;e({type:H,name:a}),he(s,r,o,{name:a,uuid:n})(e)}}function je(e){return t=>{t({type:q,desiredCapsName:e})}}function Je(){return e=>{e({type:F})}}function Xe(){return e=>{e({type:$})}}function ze(){return(e,t)=>{const s=t().session,{rawDesiredCaps:r,caps:n}=s;try{const t=JSON.parse(r);let s={};for(let{type:e,name:r,value:o}of n)s[r]={type:e,value:o};let i=(0,o.toPairs)(t).map(([e,t])=>({type:(()=>{let r=typeof t;return s[e]&&"file"===s[e].type&&"string"===r?"file":"string"===r?"text":r})(),name:e,value:t}));e({type:G,caps:i})}catch(a){e({type:j,message:a.message})}}}function Ze(e){return(t,s)=>{let r,o=!0;if(s().session.isValidatingCapsJson)try{JSON.parse(e)}catch(n){o=!1,r=n.message}t({type:Q,rawDesiredCaps:e,isValidCapsJson:o,invalidCapsJsonReason:r})}}function et(){return e=>{e({type:J,isAddingProvider:!0})}}function tt(){return e=>{e({type:J,isAddingProvider:!1})}}function st(t){return async(s,r)=>{let n=r().session.visibleProviders;const a=(0,o.union)(n,[t]);await(0,e.setSetting)(k,a),s({type:X,providers:a})}}function rt(t){return async(s,r)=>{let n=r().session.visibleProviders;const a=(0,o.without)(n,t);await(0,e.setSetting)(k,a),s({type:X,providers:a})}}function ot(){return async t=>{const s=await(0,e.getSetting)(k);t({type:X,providers:s})}}function nt(e){const{platformName:t=""}=e,s={};s[oe]=!0,s[re]=!0;const r={};return r[ne]=!0,{...e,..."android"===t.toLowerCase()?s:{},..."ios"===t.toLowerCase()?r:{}}}function at(){return(e,t)=>{window.addEventListener("beforeunload",async s=>{let{driver:r}=t().inspector;if(r)try{const s=(0,n.quitSession)("Window closed");await s(e,t)}finally{r=null}delete s.returnValue})}}function it(e){return t=>{t({type:z,addVendorPrefixes:e})}}function Et(){return async(e,t)=>{if(!de)return;de=!1;const s=new URL(window.location.href),r=s.searchParams.get("state"),o=s.searchParams.get("autoStart");if(r)try{const t=JSON.parse(r);e({type:Z,state:t})}catch(n){Oe(new Error("Could not parse initial state from URL"),null,0)}if(o===ie){const{attachSessId:s,caps:r}=t().session;if(s)return await Pe(null,s)(e,t);await Pe(r)(e,t)}}}
},{"../../shared/settings":"wFy3","./Inspector":"hyV8","../../configs/i18next.config.renderer":"Lc28","../components/Session/CloudProviders":"kZCC","../util":"YOqM","../components/Inspector/shared":"n676","../polyfills":"yhbL","../../main/helpers":"hg1V"}],"dld2":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=i(require("react")),t=i(require("format-json")),a=i(require("./Session.css")),l=require("antd"),s=require("../../actions/Session.js"),d=require("@ant-design/icons"),n=require("../AntdTypes");function i(e){return e&&e.__esModule?e:{default:e}}const r=i=>{const{caps:r,title:u,desiredCapsName:o,isEditingDesiredCapsName:c,isEditingDesiredCaps:m,startDesiredCapsEditor:E,abortDesiredCapsEditor:f,saveRawDesiredCaps:p,setRawDesiredCaps:C,rawDesiredCaps:N,isValidCapsJson:v,invalidCapsJsonReason:B,t:D}=i;return r&&e.default.createElement(l.Card,{className:a.default.formattedCaps,title:(()=>{const{setDesiredCapsName:t}=i;return u?c?e.default.createElement("input",{onChange:e=>t(e.target.value),value:o,className:a.default.capsEditorTitle}):u:"JSON Representation"})(),extra:(()=>{const{startDesiredCapsNameEditor:t,abortDesiredCapsNameEditor:s,saveDesiredCapsName:n}=i;return u?c?e.default.createElement("div",null,e.default.createElement(l.Tooltip,{title:D("Cancel")},e.default.createElement(l.Button,{size:"small",onClick:s,icon:e.default.createElement(d.CloseOutlined,null),className:a.default.capsNameEditorButton})),e.default.createElement(l.Tooltip,{title:D("Save")},e.default.createElement(l.Button,{size:"small",onClick:n,icon:e.default.createElement(d.SaveOutlined,null),className:a.default.capsNameEditorButton}))):e.default.createElement(l.Tooltip,{title:D("Edit")},e.default.createElement(l.Button,{size:"small",onClick:t,icon:e.default.createElement(d.EditOutlined,null),className:a.default.capsNameEditorButton})):null})()},e.default.createElement("div",{className:a.default.capsEditorControls},m&&e.default.createElement(l.Tooltip,{title:D("Cancel")},e.default.createElement(l.Button,{onClick:f,icon:e.default.createElement(d.CloseOutlined,null),className:a.default.capsEditorButton})),m&&e.default.createElement(l.Tooltip,{title:D("Save")},e.default.createElement(l.Button,{onClick:p,icon:e.default.createElement(d.SaveOutlined,null),className:a.default.capsEditorButton})),!m&&e.default.createElement(l.Tooltip,{title:D("Edit Raw JSON"),placement:"topRight"},e.default.createElement(l.Button,{onClick:E,icon:e.default.createElement(d.EditOutlined,null)}))),m&&e.default.createElement("div",{className:a.default.capsEditor},e.default.createElement("textarea",{onChange:e=>C(e.target.value),value:N,className:`${a.default.capsEditorBody} ${v?a.default.capsEditorBodyFull:a.default.capsEditorBodyResized}`}),!v&&e.default.createElement(l.Alert,{message:B,type:n.ALERT.ERROR})),!m&&e.default.createElement("div",{className:a.default.formattedCapsBody},e.default.createElement("pre",null,t.default.plain((0,s.getCapsObject)(r)))))};var u=r;exports.default=u;
},{"./Session.css":"NkMK","../../actions/Session.js":"VMiD","../AntdTypes":"uK2B"}],"R5hM":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=u(require("react")),a=require("antd"),t=u(require("./Session.css")),l=require("../../polyfills"),r=require("@ant-design/icons"),n=require("../AntdTypes"),s=u(require("lodash"));function u(e){return e&&e.__esModule?e:{default:e}}const d=async()=>{try{const{canceled:a,filePaths:t}=await l.remote.dialog.showOpenDialog({properties:["openFile"]});if(!a&&!s.default.isEmpty(t))return t[0]}catch(e){l.log.error(e)}},o=({cap:l,onSetCapabilityParam:s,onPressEnter:u,isEditingDesiredCaps:o,id:i,t:c})=>{switch(l.type){case"text":return e.default.createElement(a.Input,{disabled:o,id:i,placeholder:c("Value"),value:l.value,onChange:e=>s(e.target.value),onPressEnter:u,className:t.default.capsBoxFont});case"boolean":return e.default.createElement(a.Switch,{disabled:o,id:i,checkedChildren:"true",unCheckedChildren:"false",placeholder:c("Value"),checked:l.value,onChange:e=>s(e)});case"number":return e.default.createElement(a.Input,{disabled:o,id:i,placeholder:c("Value"),value:l.value,onChange:e=>isNaN(parseInt(e.target.value,10))?s(void 0):s(parseInt(e.target.value,10)),onPressEnter:u,className:t.default.capsBoxFont});case"object":case"json_object":return e.default.createElement(a.Input,{disabled:o,id:i,type:n.INPUT.TEXTAREA,rows:4,placeholder:c("Value"),value:l.value,onChange:e=>s(e.target.value),className:t.default.capsBoxFont});case"file":return e.default.createElement("div",{className:t.default.fileControlWrapper},e.default.createElement(a.Input,{disabled:o,id:i,placeholder:c("Value"),value:l.value,onChange:e=>s(e.target.value),onPressEnter:u,className:t.default.capsBoxFont,addonAfter:e.default.createElement(r.FileOutlined,{className:t.default["filepath-button"],onClick:async()=>s(await d()||l.value)})}));default:throw`Invalid cap type: ${l.type}`}};var i=o;exports.default=i;
},{"./Session.css":"NkMK","../../polyfills":"yhbL","../AntdTypes":"uK2B"}],"jTOa":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=c(require("react")),t=require("antd"),a=o(require("./FormattedCaps")),l=o(require("./CapabilityControl")),n=o(require("./Session.css")),r=require("@ant-design/icons"),u=require("../AntdTypes");function o(e){return e&&e.__esModule?e:{default:e}}function s(e){if("function"!=typeof WeakMap)return null;var t=new WeakMap,a=new WeakMap;return(s=function(e){return e?a:t})(e)}function c(e,t){if(!t&&e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var a=s(t);if(a&&a.has(e))return a.get(e);var l={},n=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var r in e)if("default"!==r&&Object.prototype.hasOwnProperty.call(e,r)){var u=n?Object.getOwnPropertyDescriptor(e,r):null;u&&(u.get||u.set)?Object.defineProperty(l,r,u):l[r]=e[r]}return l.default=e,a&&a.set(e,l),l}function d(){return(d=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var l in a)Object.prototype.hasOwnProperty.call(a,l)&&(e[l]=a[l])}return e}).apply(this,arguments)}const i=/^\s|\s$/,f=e=>{const t=/^\s/.test(e),a=/\s$/.test(e);return t&&a?"Contains Leading & Trailing Whitespace":t?"Contains Leading Whitespace":a?"Contains Trailing Whitespace":void 0},m=(e,t,a,l)=>{e(a,"type",l);let n=t[a].value;switch(l){case"boolean":n="true"===n||"false"!==n&&!!n;break;case"number":n=parseInt(n,10)||0;break;case"text":case"json_object":case"object":n+="";break;case"file":n=""}e(a,"value",n)},p=o=>{const{setCapabilityParam:s,caps:c,addCapability:p,removeCapability:b,saveSession:E,hideSaveAsModal:v,saveAsText:C,showSaveAsModal:y,setSaveAsText:g,isEditingDesiredCaps:h,t:O,setAddVendorPrefixes:S,addVendorPrefixes:j,server:F,serverType:x}=o,P=()=>E(F,x,c,{name:C}),k=(0,e.useRef)();return(0,e.useEffect)(()=>{c.length>1&&!k.current.input.value&&!k.current.__didFocus&&(k.current.focus(),k.current.__didFocus=!0)},[c.length,k]),e.default.createElement(t.Row,{type:u.ROW.FLEX,align:"top",justify:"start",className:n.default.capsFormRow},e.default.createElement(t.Col,{order:1,span:12,className:n.default.capsFormCol},e.default.createElement(t.Form,{className:n.default.newSessionForm},c.map((a,u)=>e.default.createElement(t.Row,{gutter:8,key:u},e.default.createElement(t.Col,{span:7},e.default.createElement(t.Form.Item,null,e.default.createElement(t.Tooltip,{title:f(a.name),open:i.test(a.name)},e.default.createElement(t.Input,{disabled:h,id:`desiredCapabilityName_${u}`,placeholder:O("Name"),value:a.name,onChange:e=>s(u,"name",e.target.value),ref:u===c.length-1?k:"",className:n.default.capsBoxFont})))),e.default.createElement(t.Col,{span:8},e.default.createElement(t.Form.Item,null,e.default.createElement(t.Select,{disabled:h,defaultValue:a.type,onChange:e=>m(s,c,u,e)},e.default.createElement(t.Select.Option,{value:"text"},O("text")),e.default.createElement(t.Select.Option,{value:"boolean"},O("boolean")),e.default.createElement(t.Select.Option,{value:"number"},O("number")),e.default.createElement(t.Select.Option,{value:"object"},O("JSON object")),e.default.createElement(t.Select.Option,{value:"file"},O("filepath"))))),e.default.createElement(t.Col,{span:7},e.default.createElement(t.Form.Item,null,e.default.createElement(t.Tooltip,{title:f(a.value),open:i.test(a.value)},e.default.createElement(l.default,d({},o,{cap:a,id:`desiredCapabilityValue_${u}`,onSetCapabilityParam:e=>s(u,"value",e),onPressEnter:u===c.length-1?p:()=>{}}))))),e.default.createElement(t.Col,{span:2},e.default.createElement("div",{className:n.default.btnDeleteCap},e.default.createElement(t.Form.Item,null,e.default.createElement(t.Button,{disabled:c.length<=1||h,icon:e.default.createElement(r.DeleteOutlined,null),onClick:()=>b(u)})))))),e.default.createElement(t.Row,null,e.default.createElement(t.Col,{span:22},e.default.createElement(t.Form.Item,null,e.default.createElement(t.Checkbox,{checked:j,onChange:e=>S(e.target.checked)},O("autoAddPrefixes")))),e.default.createElement(t.Col,{span:2},e.default.createElement(t.Form.Item,null,e.default.createElement(t.Button,{disabled:h,id:"btnAddDesiredCapability",icon:e.default.createElement(r.PlusOutlined,null),onClick:p,className:n.default["add-desired-capability-button"]})))))),e.default.createElement(t.Col,{order:2,span:12,className:n.default.capsFormattedCol},e.default.createElement(a.default,o),e.default.createElement(t.Modal,{open:y,title:O("Save Capability Set As"),okText:"Save",cancelText:"Cancel",onCancel:v,onOk:P},e.default.createElement(t.Input,{onChange:e=>g(e.target.value),addonBefore:O("Name"),value:C,onPressEnter:P}))))};var b=p;exports.default=b;
},{"./FormattedCaps":"dld2","./CapabilityControl":"R5hM","./Session.css":"NkMK","../AntdTypes":"uK2B"}],"gTTA":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=i(require("react")),t=i(require("moment")),a=require("antd"),n=i(require("./FormattedCaps")),r=i(require("./Session.css")),s=require("@ant-design/icons");function i(e){return e&&e.__esModule?e:{default:e}}function d(){return(d=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e}).apply(this,arguments)}const l="25%",o="106px",u=e=>e?e.map(e=>({key:e.uuid,name:e.name||"(Unnamed)",date:(0,t.default)(e.date).format("YYYY-MM-DD")})):[],c=(e,t)=>{for(let a of e)if(a.uuid===t)return a;throw new Error(`Couldn't find session with uuid ${t}`)},f=t=>{const{savedSessions:i,capsUUID:l,switchTabs:o}=t,f=e=>{const{setCapsAndServer:a,server:n,serverType:r,isEditingDesiredCapsName:s,abortDesiredCapsNameEditor:d,isEditingDesiredCaps:l,abortDesiredCapsEditor:o}=t,u=c(i,e);s&&d(),l&&o(),a(u.server||n,u.serverType||r,u.caps,u.uuid,u.name)},m=[{title:"Capability Set",dataIndex:"name",key:"name"},{title:"Created",dataIndex:"date",key:"date",width:"25%"},{title:"Actions",key:"action",width:"106px",render:(n,i)=>e.default.createElement("div",null,e.default.createElement(a.Button,{icon:e.default.createElement(s.EditOutlined,null),onClick:()=>{f(i.key),o("new")},className:r.default.editSession}),e.default.createElement(a.Button,{icon:e.default.createElement(s.DeleteOutlined,null),onClick:()=>(e=>{const{deleteSavedSession:a}=t;window.confirm("Are you sure?")&&a(e)})(i.key)}))}];return e.default.createElement(a.Row,{className:r.default.savedSessions},e.default.createElement(a.Col,{span:12},e.default.createElement(a.Table,{pagination:!1,sticky:!0,dataSource:u(i),columns:m,onRow:e=>({onClick:()=>f(e.key)}),rowClassName:e=>l===e.key?r.default.selected:""})),e.default.createElement(a.Col,{span:12,className:r.default.capsFormattedCol},e.default.createElement(n.default,d({},t,{title:l?c(i,l).name:null}))))};var m=f;exports.default=m;
},{"./FormattedCaps":"dld2","./Session.css":"NkMK"}],"xWCS":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=r(require("react")),t=require("antd"),a=r(require("./Session.css")),l=require("@ant-design/icons"),n=require("../../actions/Session");function r(e){return e&&e.__esModule?e:{default:e}}const s=e=>{let t=[e.app,e.platformName,e.deviceName];return e.automationName&&t.push(e.automationName),t.join(", ").trim()},i=e=>{let t=s(e).split(", ");return e.sessionName&&t.push(e.sessionName),t.join(", ").trim()},o=e=>{return e.hasOwnProperty.call(e,"capabilities")&&(e=e.capabilities),[e.desired?e.desired.deviceName:e.deviceName,e.platformName,e.platformVersion].join(", ").trim()},u=(e,t)=>{switch(t){case n.ServerTypes.browserstack:return`${e.id} — ${i(e.capabilities)}`;case n.ServerTypes.lambdatest:return`${e.id} - ${o(e.capabilities)}`;default:return`${e.id} — ${s(e.capabilities)}`}},d=({serverType:n,attachSessId:r,setAttachSessId:s,runningAppiumSessions:i,getRunningSessions:o,t:d})=>e.default.createElement(t.Form,null,e.default.createElement(t.Form.Item,null,e.default.createElement(t.Card,null,e.default.createElement("p",{className:a.default.localDesc},d("connectToExistingSessionInstructions"),e.default.createElement("br",null),d("selectSessionIDInDropdown")))),e.default.createElement(t.Form.Item,null,e.default.createElement(t.Row,null,e.default.createElement(t.Col,{span:23},e.default.createElement(t.Select,{showSearch:!0,mode:"AutoComplete",notFoundContent:"None found",placeholder:d("enterYourSessionId"),value:r||void 0,onChange:e=>s(e)},i.map(a=>e.default.createElement(t.Select.Option,{key:a.id,value:a.id},e.default.createElement("div",null,u(a,n)))))),e.default.createElement(t.Col,{span:1},e.default.createElement("div",{className:a.default.btnReload},e.default.createElement(t.Button,{onClick:o,icon:e.default.createElement(l.ReloadOutlined,null)}))))));var c=d;exports.default=c;
},{"./Session.css":"NkMK","../../actions/Session":"VMiD"}],"tIQW":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=r(require("react")),t=require("antd"),a=require("../../actions/Session");function r(e){return e&&e.__esModule?e:{default:e}}const l=({server:r,setServerParam:l,t:o})=>e.default.createElement(t.Form,null,e.default.createElement(t.Row,{gutter:8},e.default.createElement(t.Col,{span:9},e.default.createElement(t.Form.Item,null,e.default.createElement(t.Input,{id:"customServerHost",placeholder:a.DEFAULT_SERVER_HOST,addonBefore:o("Remote Host"),value:r.remote.hostname,onChange:e=>l("hostname",e.target.value)}))),e.default.createElement(t.Col,{span:4},e.default.createElement(t.Form.Item,null,e.default.createElement(t.Input,{id:"customServerPort",placeholder:a.DEFAULT_SERVER_PORT,addonBefore:o("Remote Port"),value:r.remote.port,onChange:e=>l("port",e.target.value)}))),e.default.createElement(t.Col,{span:9},e.default.createElement(t.Form.Item,null,e.default.createElement(t.Input,{id:"customServerPath",placeholder:a.DEFAULT_SERVER_PATH,addonBefore:o("Remote Path"),value:r.remote.path,onChange:e=>l("path",e.target.value)}))),e.default.createElement(t.Col,{span:2},e.default.createElement(t.Form.Item,null,e.default.createElement(t.Checkbox,{id:"customServerSSL",checked:!!r.remote.ssl,value:r.remote.ssl,onChange:e=>l("ssl",e.target.checked)},o("SSL"))))));var o=l;exports.default=o;
},{"../../actions/Session":"VMiD"}],"CDdV":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=l(require("react")),a=require("antd"),t=l(require("./Session.css"));function l(e){return e&&e.__esModule?e:{default:e}}const r=({server:l,setServerParam:r,serverType:d,t:n})=>e.default.createElement(a.Row,{gutter:8},e.default.createElement(a.Col,{className:t.default.advancedSettingsContainerCol},e.default.createElement("div",{className:t.default.advancedSettingsContainer},e.default.createElement(a.Collapse,{bordered:!0},e.default.createElement(a.Collapse.Panel,{header:n("Advanced Settings")},e.default.createElement(a.Row,null,"lambdatest"!==d&&e.default.createElement(a.Col,{span:7},e.default.createElement(a.Form.Item,null,e.default.createElement(a.Checkbox,{checked:!!l.advanced.allowUnauthorized,onChange:e=>r("allowUnauthorized",e.target.checked,"advanced")},n("allowUnauthorizedCerts")))),e.default.createElement(a.Col,{span:5,align:"right"},e.default.createElement(a.Form.Item,null,e.default.createElement(a.Checkbox,{checked:!!l.advanced.useProxy,onChange:e=>r("useProxy",e.target.checked,"advanced")},n("Use Proxy")))),e.default.createElement(a.Col,{span:8},e.default.createElement(a.Form.Item,null,e.default.createElement(a.Input,{disabled:!l.advanced.useProxy,onChange:e=>r("proxy",e.target.value,"advanced"),placeholder:n("Proxy URL"),value:l.advanced.proxy})))))))));var d=r;exports.default=d;
},{"./Session.css":"NkMK"}],"qTKb":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=u(require("react")),t=u(require("lodash")),r=require("antd"),o=u(require("./CloudProviders")),l=u(require("./Session.css")),d=require("../AntdTypes");function u(e){return e&&e.__esModule?e:{default:e}}const a=u=>{const{visibleProviders:a=[],isAddingCloudProvider:s,stopAddCloudProvider:i,t:n}=u,c=e.default.createElement(r.Button,{key:"back",type:d.BUTTON.PRIMARY,onClick:i},n("Done")),f=t.default.chunk(t.default.keys(o.default),2);return e.default.createElement(r.Modal,{key:"modal",className:l.default.cloudProviderModal,open:s,onCancel:i,footer:c,title:n("Select Cloud Providers")},[...t.default.map(f,(l,d)=>e.default.createElement(r.Row,{gutter:16,key:d},[...(0,t.default)(l).map(t=>{const l={};a.includes(t)&&(l.borderColor="#40a9ff");const d=o.default[t];return d&&e.default.createElement(r.Col,{span:12,key:t},e.default.createElement(r.Button,{role:"checkbox",style:l,onClick:()=>(e=>{const{addVisibleProvider:t,removeVisibleProvider:r}=u;a.includes(e)?r(e):t(e)})(t)},e.default.createElement("img",{src:d.logo})))})]))])};var s=a;exports.default=s;
},{"./CloudProviders":"kZCC","./Session.css":"NkMK","../AntdTypes":"uK2B"}],"J37W":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=require("../../polyfills"),t=b(require("react")),a=v(require("lodash")),r=v(require("./CapabilityEditor")),l=v(require("./SavedSessions")),s=v(require("./AttachToSession")),n=v(require("./ServerTabCustom")),i=require("antd"),d=v(require("./AdvancedServerParams")),o=v(require("./Session.css")),u=v(require("./CloudProviders")),c=v(require("./CloudProviderSelector")),f=require("@ant-design/icons"),p=require("../AntdTypes");function v(e){return e&&e.__esModule?e:{default:e}}function m(e){if("function"!=typeof WeakMap)return null;var t=new WeakMap,a=new WeakMap;return(m=function(e){return e?a:t})(e)}function b(e,t){if(!t&&e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var a=m(t);if(a&&a.has(e))return a.get(e);var r={},l=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var s in e)if("default"!==s&&Object.prototype.hasOwnProperty.call(e,s)){var n=l?Object.getOwnPropertyDescriptor(e,s):null;n&&(n.get||n.set)?Object.defineProperty(r,s,n):r[s]=e[s]}return r.default=e,a&&a.set(e,r),r}function y(){return(y=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var r in a)Object.prototype.hasOwnProperty.call(a,r)&&(e[r]=a[r])}return e}).apply(this,arguments)}const S="addCloudProvider",h="https://appium.io/docs/en/latest/guides/caps/",C=v=>{const{tabKey:m,switchTabs:b,serverType:S,server:C,visibleProviders:E=[],caps:g,capsUUID:P,capsName:T,isCapsDirty:w,isEditingDesiredCaps:k,requestSaveAsModal:O,saveSession:q,newSession:N,savedSessions:j,newSessionLoading:A,attachSessId:M,t:D}=v,B="attach"===m;return(0,t.useEffect)(()=>{const{setLocalServerParams:t,getSavedSessions:a,setSavedServerParams:r,setStateFromAppiumFile:l,setVisibleProviders:s,getRunningSessions:n,bindWindowClose:i,initFromQueryString:d,saveFile:o}=v;(async()=>{try{i(),b("new"),await a(),await r(),await t(),await s(),n(),await d(),await l(),e.ipcRenderer.on("open-file",(e,t)=>l(t)),e.ipcRenderer.on("save-file",(e,t)=>o(t))}catch(u){console.error(u)}})()},[]),[t.default.createElement(i.Spin,{spinning:!!A,key:"main"},t.default.createElement("div",{className:o.default.sessionContainer},t.default.createElement("div",{id:"serverTypeTabs",className:o.default.serverTab},t.default.createElement(i.Tabs,{activeKey:S,onChange:e=>(async e=>{const{changeServerType:t,addCloudProvider:a}=v;"addCloudProvider"!==e?await t(e):a()})(e),className:o.default.serverTabs,items:[{label:D("Appium Server"),key:"remote",children:t.default.createElement(n.default,v)},...(0,a.default)(E).map(e=>{const a=u.default[e];return!a||{label:t.default.createElement("div",null,a.tabhead()),key:e,children:a.tab(v)}}),{label:t.default.createElement("span",{className:"addCloudProviderTab"},D("Select Cloud Providers")),key:"addCloudProvider"}]}),t.default.createElement(d.default,v)),t.default.createElement(i.Tabs,{activeKey:m,onChange:b,className:o.default.scrollingTabCont,items:[{label:D("Desired Capabilities"),key:"new",className:o.default.scrollingTab,children:t.default.createElement(r.default,v)},{label:t.default.createElement("span",null,D("Saved Capability Sets")," ",t.default.createElement(i.Badge,{count:j.length,offset:[0,-3]})),key:"saved",className:o.default.scrollingTab,disabled:0===j.length,children:t.default.createElement(l.default,v)},{label:D("Attach to Session"),key:"attach",className:o.default.scrollingTab,children:t.default.createElement(s.default,v)}]}),t.default.createElement("div",{className:o.default.sessionFooter},t.default.createElement("div",{className:o.default.desiredCapsLink},t.default.createElement("a",{href:"#",onClick:t=>t.preventDefault()||e.shell.openExternal(h)},t.default.createElement(f.LinkOutlined,null)," ",D("desiredCapabilitiesDocumentation"))),!B&&P&&t.default.createElement(i.Button,{onClick:()=>q(C,S,g,{name:T,uuid:P}),disabled:!w||k},D("Save")),!B&&t.default.createElement(i.Button,{onClick:O,disabled:k},D("saveAs")),!B&&t.default.createElement(i.Button,{type:p.BUTTON.PRIMARY,id:"btnStartSession",onClick:()=>N(g),className:o.default["start-session-button"]},D("startSession")),B&&t.default.createElement(i.Button,{type:p.BUTTON.PRIMARY,disabled:!M,onClick:()=>N(null,M)},D("attachToSession"))))),t.default.createElement(c.default,y({},v,{key:"CloudProviderSelector"}))]};var E=C;exports.default=E;
},{"../../polyfills":"yhbL","./CapabilityEditor":"jTOa","./SavedSessions":"gTTA","./AttachToSession":"xWCS","./ServerTabCustom":"tIQW","./AdvancedServerParams":"CDdV","./Session.css":"NkMK","./CloudProviders":"kZCC","./CloudProviderSelector":"qTKb","../AntdTypes":"uK2B"}],"w595":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=require("react-redux"),t=require("../util"),r=i(require("../actions/Session")),n=o(require("../components/Session/Session"));function o(e){return e&&e.__esModule?e:{default:e}}function u(e){if("function"!=typeof WeakMap)return null;var t=new WeakMap,r=new WeakMap;return(u=function(e){return e?r:t})(e)}function i(e,t){if(!t&&e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var r=u(t);if(r&&r.has(e))return r.get(e);var n={},o=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var i in e)if("default"!==i&&Object.prototype.hasOwnProperty.call(e,i)){var a=o?Object.getOwnPropertyDescriptor(e,i):null;a&&(a.get||a.set)?Object.defineProperty(n,i,a):n[i]=e[i]}return n.default=e,r&&r.set(e,n),n}function a(e){return e.session}var f=(0,t.withTranslation)(n.default,(0,e.connect)(a,r));exports.default=f;
},{"../util":"YOqM","../actions/Session":"VMiD","../components/Session/Session":"J37W"}],"rCqx":[function(require,module,exports) {
module.exports={"inspector-container":"_inspector-container_61591","inspector-toolbar":"_inspector-toolbar_61591","ant-btn":"_ant-btn_61591","inspector-main":"_inspector-main_61591","screenshot-container":"_screenshot-container_61591","screenshot-controls":"_screenshot-controls_61591",screenshotBox:"_screenshotBox_61591","interaction-tab-container":"_interaction-tab-container_61591","tree-container":"_tree-container_61591","session-info-table":"_session-info-table_61591","session-code-box":"_session-code-box_61591","session-inner-table":"_session-inner-table_61591","scroll-buttons":"_scroll-buttons_61591","scroll-right":"_scroll-right_61591","recorded-actions":"_recorded-actions_61591","_inspector-main_0387c":"__inspector-main_0387c_61591","ant-card-body":"_ant-card-body_61591","interaction-tab-card":"_interaction-tab-card_61591","highlighter-box":"_highlighter-box_61591","inspected-element-box":"_inspected-element-box_61591","hovered-element-box":"_hovered-element-box_61591","centroid-box":"_centroid-box_61591",centroid:"_centroid_61591",overlap:"_overlap_61591",expand:"_expand_61591","plus-minus":"_plus-minus_61591","custom-button-icon":"_custom-button-icon_61591",elementActions:"_elementActions_61591",elementKeyInputActions:"_elementKeyInputActions_61591",selectedElementContainer:"_selectedElementContainer_61591","selected-element-table-cells":"_selected-element-table-cells_61591","element-cell-copy":"_element-cell-copy_61591","selected-element-card":"_selected-element-card_61591",selectedElemNotInteractableAlertRow:"_selectedElemNotInteractableAlertRow_61591","context-selector":"_context-selector_61591",sourceTag:"_sourceTag_61591",sourceAttrName:"_sourceAttrName_61591","no-recorded-actions":"_no-recorded-actions_61591","recorded-code":"_recorded-code_61591","framework-dropdown":"_framework-dropdown_61591",searchResultsList:"_searchResultsList_61591",searchResultsSelectedItem:"_searchResultsSelectedItem_61591",searchResultsActions:"_searchResultsActions_61591",searchResultsKeyInput:"_searchResultsKeyInput_61591",elementKeyInput:"_elementKeyInput_61591","element-count-container":"_element-count-container_61591",locatorStrategyBtn:"_locatorStrategyBtn_61591",locatorSelectorTextArea:"_locatorSelectorTextArea_61591",coordinatesContainer:"_coordinatesContainer_61591",swipeInstructions:"_swipeInstructions_61591",swipeSvg:"_swipeSvg_61591",tapDiv:"_tapDiv_61591",gestureSvg:"_gestureSvg_61591",filled:"_filled_61591",dashed:"_dashed_61591",whole:"_whole_61591",newDashed:"_newDashed_61591","circle-dashed":"_circle-dashed_61591","circle-newDashed":"_circle-newDashed_61591",innerScreenshotContainer:"_innerScreenshotContainer_61591",screenshotActionsPanel:"_screenshotActionsPanel_61591","commands-container":"_commands-container_61591","btn-container":"_btn-container_61591","arg-row":"_arg-row_61591","arg-container":"_arg-container_61591","gesture-header":"_gesture-header_61591","gesture-header-title":"_gesture-header-title_61591","gesture-header-description":"_gesture-header-description_61591","gesture-header-coord-btn":"_gesture-header-coord-btn_61591","gesture-header-timeline":"_gesture-header-timeline_61591","timeline-tick-title":"_timeline-tick-title_61591","gesture-header-icon":"_gesture-header-icon_61591","pointer-title":"_pointer-title_61591","tick-card":"_tick-card_61591","tick-plus-card":"_tick-plus-card_61591","tick-plus-btn":"_tick-plus-btn_61591",spaceContainer:"_spaceContainer_61591","tick-pointer-input":"_tick-pointer-input_61591","tick-button-group":"_tick-button-group_61591","tick-button-input":"_tick-button-input_61591","tick-input-box":"_tick-input-box_61591","tick-coord-box":"_tick-coord-box_61591","option-inpt":"_option-inpt_61591"};
},{}],"rkOx":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=l(require("react")),t=l(require("./Inspector.css"));function l(e){return e&&e.__esModule?e:{default:e}}const n=l=>{const{selectedElement:n={},selectHoveredElement:o,unselectHoveredElement:s,hoveredElement:r={},selectElement:d,unselectElement:u,element:a,scaleRatio:i,xOffset:h,elLocation:c,elSize:p,dimensions:m}=l,{path:f}=r,{path:v}=n;let x,E,y,b,g,M;return g=[t.default["highlighter-box"]],a?(({width:x,height:E,left:y,top:b}=m),f===a.path&&g.push(t.default["hovered-element-box"]),v===a.path&&g.push(t.default["inspected-element-box"]),M=a.path):c&&p&&(x=p.width/i,E=p.height/i,b=c.y/i,y=c.x/i+h,M=`searchedForElement{x: ${c.x}, y: ${c.y}}`,g.push(t.default["inspected-element-box"])),e.default.createElement("div",{className:g.join(" ").trim(),onMouseOver:()=>o(M),onMouseOut:s,onClick:()=>M===v?u():d(M),key:M,style:{left:y||0,top:b||0,width:x||0,height:E||0}},e.default.createElement("div",null))};var o=n;exports.default=o;
},{"./Inspector.css":"rCqx"}],"vzOu":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=n(require("react")),t=n(require("./Inspector.css")),l=require("./shared");function n(e){return e&&e.__esModule?e:{default:e}}const{CENTROID:r,OVERLAP:o,EXPAND:s}=l.RENDER_CENTROID_AS,d={VISIBLE:"visible",HIDDEN:"hidden",CONTAINER:"50%",NON_CONTAINER:"0%"},u=(e,t,l)=>e===o?`calc((${t} * 2.6vh) + ${l}px)`:l,c=l=>{const{selectedElementPath:n,hoveredElement:c={},element:i,elementProperties:a,centroidType:E,hoveredCentroid:N,selectedCentroid:m}=l,{centerX:p,centerY:v,angleX:f,angleY:h,keyCode:C,path:I,container:O}=a,R=[t.default["centroid-box"]];R.push(t.default[E]),E!==s&&(c.path===I&&R.push(t.default["hovered-element-box"]),n===I&&R.push(t.default["inspected-element-box"])),E!==r&&(N===C&&R.push(t.default["hovered-element-box"]),m!==C||i||R.push(t.default["inspected-element-box"]));const b={visibility:C===m?d.VISIBLE:d.HIDDEN},x={left:u(E,f,p),top:u(E,h,v),borderRadius:i&&!O?d.NON_CONTAINER:d.CONTAINER,...E===o?b:{}},D=E===s?e.default.createElement("div",{className:t.default["plus-minus"]},C===m?"-":"+"):e.default.createElement("div",null);return e.default.createElement("div",{className:R.join(" ").trim(),onMouseOver:()=>(e=>{const{selectHoveredElement:t,selectHoveredCentroid:n}=l;E===s?n(e):t(e)})(I),onMouseOut:()=>(()=>{const{unselectHoveredElement:e,unselectHoveredCentroid:t}=l;E===s?t():e()})(),onClick:()=>(e=>{const{selectElement:t,unselectElement:r,selectCentroid:o,unselectCentroid:d}=l;E===s?e===m?d():o(e):e===n?r():t(e)})(I),key:I,style:x},D)};var i=c;exports.default=i;
},{"./Inspector.css":"rCqx","./shared":"n676"}],"nUEu":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=l(require("react")),t=l(require("./HighlighterRect")),r=l(require("./HighlighterCentroid")),n=require("./shared");function l(e){return e&&e.__esModule?e:{default:e}}function o(){return(o=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e}).apply(this,arguments)}const{CENTROID:i,OVERLAP:s,EXPAND:a}=n.RENDER_CENTROID_AS,c=l=>{console.log("🚀 ~ file: HighlighterRects.js:12 ~ HighlighterRects ~ props:",l);const{source:c,containerEl:u,searchedForElementBounds:p,scaleRatio:f,showCentroids:h,isLocatorTestModalVisible:d,isSiriCommandModalVisible:g}=l,m=[],y=[];let b=0,R=null;const E=(e,t,r,l)=>{if(!e)return{};const{x1:o,y1:s,x2:a,y2:c}=(0,n.parseCoordinates)(e),u=b||0,p=(e,t)=>Math.round(e+(t-e)/2)/f,h={type:i,element:e,parent:t,properties:{left:o/f+u,top:s/f,width:(a-o)/f,height:(c-s)/f,centerX:p(o,a)+u,centerY:p(s,c),angleX:null,angleY:null,path:e.path,keyCode:null,container:!1,accessible:e.attributes?e.attributes.accessible:null}},d=`${h.properties.centerX}.${h.properties.centerY}`;if(h.properties.container=C(h,r),r.push(h),e.path&&(l[d]?l[d].push(h):l[d]=[h]),e.children)for(const n of e.children)E(n,e,r,l);return l},C=(e,t)=>{for(const r of t)if(r.element!==e.element&&O(e.properties,r.properties)&&!M(e.parent,r.element,t))return!0;return!1},O=(e,t)=>e.left<=t.left&&e.width>=t.width&&e.top>=t.top&&e.height>=t.height,M=(e,t,r)=>{if(r.length>0)for(;null!==e;){if(e===t)return!0;for(const t of r)t.element===e&&(e=t.parent)}return!1},v=(e,t)=>{const r=e.length;for(let n=0;n<r;n++){const[l,o]=[e[n],e[n].properties];l.type=s,o.keyCode=t,o.angleX=Math.cos(2*Math.PI*(n/r)),o.angleY=Math.sin(2*Math.PI*(n/r))}return e},X=(e=>{const t=E(e,null,[],{});let r=[];for(const n of Object.keys(t))if(t[n].length>1){const{centerX:e,centerY:l}=t[n][0].properties,o={type:a,element:null,parent:null,properties:{left:null,top:null,width:null,height:null,centerX:e,centerY:l,angleX:null,angleY:null,path:n,keyCode:n,container:null,accessible:null}};r=[...r,o,...v(t[n],n)]}else r.push(t[n][0]);return r})(c);if(u&&(R=u.querySelector("img"),b=R.getBoundingClientRect().left-u.getBoundingClientRect().left),p&&d){const{location:r,size:n}=p;m.push(e.default.createElement(t.default,{elSize:n,elLocation:r,scaleRatio:f,xOffset:b}))}return d||g||((r=>{for(const n of r)m.push(e.default.createElement(t.default,o({},l,{dimensions:n.properties,element:n.element,scaleRatio:f,key:n.properties.path,xOffset:b})))})(X),h&&(t=>{for(const n of t)y.push(e.default.createElement(r.default,o({},l,{centroidType:n.type,elementProperties:n.properties,element:n.element,key:n.properties.path})))})(X)),e.default.createElement("div",null,m,y)};var u=c;exports.default=u;
},{"./HighlighterRect":"rkOx","./HighlighterCentroid":"vzOu","./shared":"n676"}],"mtSW":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=i(require("react")),t=l(require("./HighlighterRects")),n=require("antd"),a=l(require("bluebird")),o=l(require("./Inspector.css")),r=require("./shared");function l(e){return e&&e.__esModule?e:{default:e}}function s(e){if("function"!=typeof WeakMap)return null;var t=new WeakMap,n=new WeakMap;return(s=function(e){return e?n:t})(e)}function i(e,t){if(!t&&e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var n=s(t);if(n&&n.has(e))return n.get(e);var a={},o=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var r in e)if("default"!==r&&Object.prototype.hasOwnProperty.call(e,r)){var l=o?Object.getOwnPropertyDescriptor(e,r):null;l&&(l.get||l.set)?Object.defineProperty(a,r,l):a[r]=e[r]}return a.default=e,n&&n.set(e,a),a}function c(){return(c=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e}).apply(this,arguments)}const{POINTER_UP:u,POINTER_DOWN:d,PAUSE:y,POINTER_MOVE:p}=r.POINTER_TYPES,{TAP:E,SELECT:x,SLIDE:f,SWIPE:N,LONGPRESS:m,DRAG_AND_DROP:O,DOUBLE_TAP:g,ZOOMIN:S}=r.SCREENSHOT_INTERACTION_MODE,T={FILLED:"filled",NEW_DASHED:"newDashed",WHOLE:"whole",DASHED:"dashed",DRAG:"drag"},h=l=>{const{screenshot:s,mjpegScreenshotUrl:i,methodCallInProgress:h,screenshotInteractionMode:D,swipeStart:I,swipeEnd1:_,swipeStart1:w,swipeEnd:R,scaleRatio:A,selectedTick:b,selectedInteractionMode:v,applyClientMethod:P,t:M,hoveredElement:U}=l;console.log("inside the screenshot function props!!!",l);const[L,Y]=(0,e.useState)(null),[G,k]=(0,e.useState)(null);(0,e.useEffect)(()=>{if(U&&U.attributes&&U.attributes.bounds){const e=U.attributes.bounds.match(/\d+/g);if(e.length>=4){const t=parseInt(e[0],10),n=parseInt(e[1],10),a=parseInt(e[2],10),o=parseInt(e[3],10);console.log("x1:",t),console.log("y1:",n),console.log("x2:",a),console.log("y2:",o);const r=Math.round(a),l=Math.round(o);Y(r),k(l)}}},[U]),U&&console.log("hoveredElement.attributes.bounds:",U.attributes.bounds);const C=(0,e.useRef)(),[$,j]=(0,e.useState)(),[W,F]=(0,e.useState)(),[B,H]=(0,e.useState)(!1),[q,V]=(0,e.useState)({}),[X,Z]=(0,e.useState)({});let[z,J]=(0,e.useState)({x:0,y:0,scale:1});C.current,(0,e.useRef)();const K=async e=>{const{clearSwipeAction:t}=l,{POINTER_NAME:n,DURATION_1:a,DURATION_2:o,BUTTON:s,ORIGIN:i}=r.DEFAULT_SWIPE;await P({methodName:N,args:{[n]:[{type:p,duration:a,x:I.x,y:I.y},{type:d,button:s},{type:p,duration:o,origin:i,x:e.x,y:e.y},{type:u,button:s}]}}),t()},Q=async e=>{console.log("handleDoSlide >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",q);const{clearSwipeAction:t}=l,{POINTER_NAME:n,DURATION_1:a,DURATION_2:o,BUTTON:s,ORIGIN:i}=r.DEFAULT_SWIPE;await P({methodName:N,args:{[n]:[{type:p,duration:a,x:I.x,y:I.y},{type:d,button:s},{type:p,duration:o,origin:i,x:e.x,y:e.y},{type:u,button:s}]}}),t()},ee=async(e,t)=>{const{clearSwipeAction:n}=l,{POINTER_NAME1:a,POINTER_NAME2:o,DURATION_1:s,DURATION_2:i,BUTTON:c,ORIGIN:y}=r.DEFAULT_ZOOM;console.log(`swipeStart.x : ${I.x}, swipeStart.y : : ${I.y} , swipeEndLocal1.x : ${t.x} , swipeEndLocal1.y : ${t.y} , swipeStart1.x : ${w.x} , swipeStart1.y : ${w.y}, swipeEndLocal.x : ${e.x} , swipeEndLocal.y : ${e.y}`),e&&t&&(await P({methodName:N,args:{[a]:[{type:p,duration:s,x:I.x,y:I.y},{type:d,button:c},{type:p,duration:i,origin:y,x:t.x,y:t.y},{type:u,button:c}],[o]:[{type:p,duration:s,x:w.x,y:w.y},{type:d,button:c},{type:p,duration:i,origin:y,x:e.x,y:e.y},{type:u,button:c}]}}),n())},te=e=>{console.log("Drag start:",e)},ne={};[E,N].includes(D)||b?ne.cursor="crosshair":[O].includes(D)||b?ne.cursor="move":ne.cursor="pointer",([S].includes(D)||b)&&(ne.cursor="crosshair");let ae=null;D!==N||I&&R||(I?R||(ae=M("Click swipe end point")):ae=M("Click swipe start point"));const oe=i||`data:image/gif;base64,${s}`,re=e.default.createElement("img",{src:oe,id:"screenshot"}),le=(()=>{const{showGesture:e}=l,{FILLED:t,NEW_DASHED:n,WHOLE:a,DASHED:o}=T,r={pointerDown:a,pointerUp:o};return e?e.map(e=>{let l=o;const s=[];for(const i of e.ticks){if(i.type===y)continue;const c=s.length;l=i.type!==p?r[i.type]:l,i.type===p&&void 0!==i.x&&void 0!==i.y&&s.push({id:i.id,type:l,x:i.x,y:i.y,color:e.color}),0===c?i.type===d&&s.push({id:i.id,type:t,x:0,y:0,color:e.color}):(i.type===d&&s[c-1].type===o&&(s[c-1].type=t),i.type===u&&s[c-1].type===a&&(s[c-1].type=n))}return s}):null})();return e.default.createElement(n.Spin,{size:"large",spinning:!!h&&!i},e.default.createElement("div",{className:o.default.innerScreenshotContainer},e.default.createElement("div",{ref:C,style:ne,onMouseDown:async()=>{const{setSwipeStart:e,setSwipeEnd:t,tapTickCoordinates:n,setSwipeStart1:o,setSwipeEnd1:s}=l,{POINTER_NAME:i,DURATION_1:c,DURATION_2:x,BUTTON:T}=r.DEFAULT_TAP,{LONGPRESS_POINTER_NAME:h,LONGPRESS_DURATION_1:A,LONGPRESS_DURATION_2:v,LONGPRESS_BUTTON:M}=r.DEFAULT_LONGPRESS;D===E?P({methodName:E,args:[{[i]:[{type:p,duration:c,x:$,y:W},{type:d,button:T},{type:y,duration:x},{type:u,button:T}]}]}):D===m?(console.log("inside the condition of the longpress!!"),console.log("xxxxxxxxxx: YYYYYYYYYYY: from the long",L,G),console.log("xxxxxxxxxx: YYYYYYYYYYY: after the set",$,W),setTimeout(()=>{P({methodName:E,args:[{[h]:[{type:p,duration:A,x:$,y:W},{type:d,button:M},{type:y,duration:v},{type:u,button:M}]}]})},v)):D===g?(console.log("inside the double tap function!!!"),P({methodName:E,args:[{[i]:[{type:p,duration:c,x:$,y:W},{type:d,button:T},{type:y,duration:x},{type:u,button:T}]}]}),setTimeout(()=>{P({methodName:E,args:[{[i]:[{type:p,duration:c,x:$,y:W},{type:d,button:T},{type:y,duration:x},{type:u,button:T}]}]})},200)):D===O?(console.log("inside the drage and drop condition value!!!!!!"),I?R||(t($,W),te({x:$,y:W})):e($,W)):b?n($,W):D===N?I?R||(t($,W),await a.default.delay(500),await K({x:$,y:W})):e($,W):D===S?I?R?w?_||(s($,W),await a.default.delay(500),await ee({x:$,y:W},X)):o($,W):(t($,W),await a.default.delay(500),Z({x:$,y:W})):e($,W):D===f&&(l.selectedElement&&V(l.selectedElement),I?R||(t($,W),await a.default.delay(500),await Q({x:$,y:W})):e($,W))},onMouseMove:e=>{if(D!==(x||m)){const t=e.nativeEvent.offsetX,n=e.nativeEvent.offsetY,a=t*A,o=n*A;j(Math.round(a)),F(Math.round(o))}},onMouseOut:()=>{j(null),F(null)},onDragOver:e=>{e.preventDefault()},onDrop:e=>{const{offsetX:t,offsetY:n}=e.nativeEvent,a=t*A,o=n*A,l=Math.round(a),s=Math.round(o);console.log("Drop position:",{x:l,y:s}),j(l),F(s),setTimeout(async()=>{await(async e=>{console.log("value of the x and y",e);const{POINTER_NAME:t,DURATION_1:n,DURATION_2:a,BUTTON:o,ORIGIN:l}=r.DEFAULT_DRAG_AND_DROP;await P({methodName:E,args:{[t]:[{type:p,duration:n,origin:l,x:I.x,y:I.y},{type:d,button:o},{type:y,duration:a},{type:p,duration:a,origin:l,x:e.x,y:e.y},{type:u,button:o}]}})})({x:l,y:s})},1e3)},className:o.default.screenshotBox},D!==x&&e.default.createElement("div",{className:o.default.coordinatesContainer},e.default.createElement("p",null,M("xCoordinate",{x:$})),e.default.createElement("p",null,M("yCoordinate",{y:W}))),ae&&e.default.createElement(n.Tooltip,{open:!0,title:ae,placement:"topLeft"},re),!ae&&re,D===x&&C.current&&e.default.createElement(t.default,c({},l,{containerEl:C.current})),D===f&&C.current&&e.default.createElement("div",null,e.default.createElement(t.default,c({},l,{containerEl:C.current})),e.default.createElement("svg",{className:o.default.swipeSvg},I&&!R&&e.default.createElement("circle",{cx:I.x/A,cy:I.y/A}),I&&R&&e.default.createElement("line",{x1:I.x/A,y1:I.y/A,x2:R.x/A,y2:R.y/A}))),D===N&&e.default.createElement("svg",{className:o.default.swipeSvg},I&&!R&&e.default.createElement("circle",{cx:I.x/A,cy:I.y/A}),I&&R&&e.default.createElement("line",{x1:I.x/A,y1:I.y/A,x2:R.x/A,y2:R.y/A})),D===S&&e.default.createElement("svg",{className:o.default.swipeSvg},I&&!R&&e.default.createElement("circle",{cx:I.x/A,cy:I.y/A}),I&&R&&e.default.createElement("line",{x1:I.x/A,y1:I.y/A,x2:R.x/A,y2:R.y/A}),w&&!_&&e.default.createElement("circle",{cx:w.x/A,cy:w.y/A}),w&&_&&e.default.createElement("line",{x1:w.x/A,y1:w.y/A,x2:_.x/A,y2:_.y/A})),D===E&&e.default.createElement("div",{className:o.default.tapDiv}),v===r.INTERACTION_MODE.GESTURES&&le&&e.default.createElement("svg",{key:"gestureSVG",className:o.default.gestureSvg},le.map(t=>t.map((n,a)=>e.default.createElement(e.default.Fragment,{key:n.id},a>0&&e.default.createElement("line",{className:o.default[n.type],key:`${n.id}.line`,x1:t[a-1].x/A,y1:t[a-1].y/A,x2:n.x/A,y2:n.y/A,style:{stroke:n.color}}),e.default.createElement("circle",{className:o.default[`circle-${n.type}`],key:`${n.id}.circle`,cx:n.x/A,cy:n.y/A,style:n.type===T.FILLED?{fill:n.color}:{stroke:n.color}}))))))))};var D=h;exports.default=D;
},{"./HighlighterRects":"nUEu","./Inspector.css":"rCqx","./shared":"n676"}],"d9PD":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=c(require("react")),t=require("antd"),l=c(require("./Inspector.css")),n=require("react-icons/hi"),a=require("react-icons/bi"),o=require("react-icons/io5"),u=require("./shared"),r=require("../AntdTypes"),i=require("@ant-design/icons");function c(e){return e&&e.__esModule?e:{default:e}}const d=c=>{const{selectAppMode:d,appMode:s,mjpegScreenshotUrl:m,isSourceRefreshOn:f,toggleRefreshingState:E,isRecording:p,startRecording:B,pauseRecording:T,showLocatorTestModal:C,showSiriCommandModal:P,applyClientMethod:h,quitSession:O,driver:g,t:b}=c,S=e.default.createElement(t.Button.Group,null,g&&g.client.isIOS&&e.default.createElement(e.default.Fragment,null,e.default.createElement(t.Tooltip,{title:b("Press Home Button")},e.default.createElement(t.Button,{id:"btnPressHomeButton",icon:e.default.createElement(n.HiOutlineHome,{className:l.default["custom-button-icon"]}),onClick:()=>h({methodName:"executeScript",args:["mobile:pressButton",[{name:"home"}]]})})),e.default.createElement(t.Tooltip,{title:b("Execute Siri Command")},e.default.createElement(t.Button,{id:"siriCommand",icon:e.default.createElement(n.HiOutlineMicrophone,{className:l.default["custom-button-icon"]}),onClick:P}))),g&&g.client.isAndroid&&e.default.createElement(e.default.Fragment,null,e.default.createElement(t.Tooltip,{title:b("Press Back Button")},e.default.createElement(t.Button,{id:"btnPressHomeButton",icon:e.default.createElement(o.IoChevronBackOutline,{className:l.default["custom-button-icon"]}),onClick:()=>h({methodName:"pressKeyCode",args:[4]})})),e.default.createElement(t.Tooltip,{title:b("Press Home Button")},e.default.createElement(t.Button,{id:"btnPressHomeButton",icon:e.default.createElement(a.BiCircle,{className:l.default["custom-button-icon"]}),onClick:()=>h({methodName:"pressKeyCode",args:[3]})})),e.default.createElement(t.Tooltip,{title:b("Press App Switch Button")},e.default.createElement(t.Button,{id:"btnPressHomeButton",icon:e.default.createElement(a.BiSquare,{className:l.default["custom-button-icon"]}),onClick:()=>h({methodName:"pressKeyCode",args:[187]})})))),R=e.default.createElement(t.Button.Group,{value:s},e.default.createElement(t.Tooltip,{title:b("Native App Mode")},e.default.createElement(t.Button,{icon:e.default.createElement(i.AppstoreOutlined,null),onClick:()=>{d(u.APP_MODE.NATIVE)},type:s===u.APP_MODE.NATIVE?r.BUTTON.PRIMARY:r.BUTTON.DEFAULT})),e.default.createElement(t.Tooltip,{title:b("Web/Hybrid App Mode")},e.default.createElement(t.Button,{icon:e.default.createElement(i.GlobalOutlined,null),onClick:()=>{d(u.APP_MODE.WEB_HYBRID)},type:s===u.APP_MODE.WEB_HYBRID?r.BUTTON.PRIMARY:r.BUTTON.DEFAULT}))),N=e.default.createElement(t.Button.Group,null,m&&!f&&e.default.createElement(t.Tooltip,{title:b("Start Refreshing Source")},e.default.createElement(t.Button,{id:"btnStartRefreshing",icon:e.default.createElement(i.PlayCircleOutlined,null),onClick:E})),m&&f&&e.default.createElement(t.Tooltip,{title:b("Pause Refreshing Source")},e.default.createElement(t.Button,{id:"btnPauseRefreshing",icon:e.default.createElement(i.PauseCircleOutlined,null),onClick:E})),e.default.createElement(t.Tooltip,{title:b("refreshSource")},e.default.createElement(t.Button,{id:"btnReload",icon:e.default.createElement(i.ReloadOutlined,null),onClick:()=>h({methodName:"getPageSource"})})),e.default.createElement(t.Tooltip,{title:b("Search for element")},e.default.createElement(t.Button,{id:"searchForElement",icon:e.default.createElement(i.SearchOutlined,null),onClick:C})),!p&&e.default.createElement(t.Tooltip,{title:b("Start Recording")},e.default.createElement(t.Button,{id:"btnStartRecording",icon:e.default.createElement(i.EyeOutlined,null),onClick:B})),p&&e.default.createElement(t.Tooltip,{title:b("Pause Recording")},e.default.createElement(t.Button,{id:"btnPause",icon:e.default.createElement(i.PauseOutlined,null),type:r.BUTTON.DANGER,onClick:T}))),A=e.default.createElement(t.Tooltip,{title:b("quitSessionAndClose")},e.default.createElement(t.Button,{id:"btnClose",icon:e.default.createElement(i.CloseOutlined,null),onClick:()=>O()}));return e.default.createElement("div",{className:l.default["inspector-toolbar"]},e.default.createElement(t.Space,{size:"middle"},S,R,N,A))};var s=d;exports.default=s;
},{"./Inspector.css":"rCqx","./shared":"n676","../AntdTypes":"uK2B"}],"lQeY":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=o(require("react")),t=c(require("lodash")),l=require("./shared"),n=c(require("./Inspector.css")),a=require("antd"),r=require("../../polyfills"),i=require("@ant-design/icons"),d=require("../AntdTypes");function c(e){return e&&e.__esModule?e:{default:e}}function u(e){if("function"!=typeof WeakMap)return null;var t=new WeakMap,l=new WeakMap;return(u=function(e){return e?l:t})(e)}function o(e,t){if(!t&&e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var l=u(t);if(l&&l.has(e))return l.get(e);var n={},a=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var r in e)if("default"!==r&&Object.prototype.hasOwnProperty.call(e,r)){var i=a?Object.getOwnPropertyDescriptor(e,r):null;i&&(i.get||i.set)?Object.defineProperty(n,r,i):n[r]=e[r]}return n.default=e,l&&l.set(e,n),n}const s="NATIVE_APP",m="https://github.com/facebookarchive/WebDriverAgent/wiki/Class-Chain-Queries-Construction-Rules",f="https://github.com/facebookarchive/WebDriverAgent/wiki/Predicate-Queries-Construction-Rules",p=(t,l)=>l?e.default.createElement("div",{className:n.default["selected-element-table-cells"]},e.default.createElement(a.Tooltip,{title:"Copied!",trigger:"click"},e.default.createElement("span",{className:n.default["element-cell-copy"],onClick:()=>r.clipboard.writeText(t)},t))):e.default.createElement("div",{className:n.default["selected-element-table-cells"]},t),E=c=>{console.log("props inside the selected Element!!",c),console.log("props.hoveredElement$$$$$$$4!!",c.hoveredElement);const{applyClientMethod:u,contexts:o,currentContext:E,getFindElementsTimes:h,findElementsExecutionTimes:g,isFindingElementsTimes:b,selectedElement:y,selectedElementId:v,sourceXML:C,elementInteractionsNotAvailable:k,selectedElementSearchInProgress:I,t:w}=c;console.log("selectedElementId inside the selected Element!!",v);const T=(0,e.useRef)(),{attributes:x,classChain:A,predicateString:N,xpath:O}=y,R=I||b;let S=[{title:w("Attribute"),dataIndex:"name",key:"name",width:100,render:e=>p(e,!1)},{title:w("Value"),dataIndex:"value",key:"value",render:e=>p(e,!0)}],P=t.default.toPairs(x).filter(([e])=>"path"!==e).map(([e,t])=>({key:e,value:t,name:e}));P.unshift({key:"elementId",value:v,name:"elementId"});let W=[{title:w("Find By"),dataIndex:"find",key:"find",width:100,render:e=>p(e,!1)},{title:w("Selector"),dataIndex:"selector",key:"selector",render:e=>p(e,!0)}];g.length>0&&W.push({title:w("Time"),dataIndex:"time",key:"time",align:"right",width:100,render:e=>p(e,!1)});let L=t.default.toPairs((0,l.getLocators)(x,C)).map(([e,t])=>({key:e,selector:t,find:e})),j=!1;if(0===L.length&&(j=!0),A&&E===s){const t=e.default.createElement("span",null,"-ios class chain",e.default.createElement("strong",null,e.default.createElement("a",{onClick:e=>e.preventDefault()||r.shell.openExternal(m)}," (docs)")));L.push({key:"-ios class chain",find:t,selector:A})}if(N&&E===s){const t=e.default.createElement("span",null,"-ios predicate string",e.default.createElement("strong",null,e.default.createElement("a",{onClick:e=>e.preventDefault()||r.shell.openExternal(f)}," (docs)")));L.push({key:"-ios predicate string",find:t,selector:N})}if(O){L.push({key:"xpath",find:"xpath",selector:O});let e=L.concat(P);console.log("🚀 ~ file: SelectedElement.js:169 ~ SelectedElement ~ sendData:",e)}g.length>0&&(L=g);let $=e.default.createElement(i.AimOutlined,null);return(!k&&!v||I)&&($=e.default.createElement(i.LoadingOutlined,null)),e.default.createElement("div",null,k&&e.default.createElement(a.Row,{type:d.ROW.FLEX,gutter:10,className:n.default.selectedElemNotInteractableAlertRow},e.default.createElement(a.Col,null,e.default.createElement(a.Alert,{type:d.ALERT.INFO,message:w("interactionsNotAvailable"),showIcon:!0}))),e.default.createElement(a.Row,{justify:"center",type:d.ROW.FLEX,align:"middle",className:n.default.elementActions},e.default.createElement(a.Tooltip,{title:w("Tap")},e.default.createElement(a.Button,{disabled:R,icon:$,id:"btnTapElement",onClick:()=>u({methodName:"click",elementId:v})})),e.default.createElement(a.Button.Group,{className:n.default.elementKeyInputActions},e.default.createElement(a.Input,{className:n.default.elementKeyInput,disabled:R,placeholder:w("Enter Keys to Send"),allowClear:!0,onChange:e=>T.current=e.target.value}),e.default.createElement(a.Tooltip,{title:w("Send Keys")},e.default.createElement(a.Button,{disabled:R,id:"btnSendKeysToElement",icon:e.default.createElement(i.SendOutlined,null),onClick:()=>u({methodName:"sendKeys",elementId:v,args:[T.current||""]})})),e.default.createElement(a.Tooltip,{title:w("Clear")},e.default.createElement(a.Button,{disabled:R,id:"btnClearElement",icon:e.default.createElement(i.ClearOutlined,null),onClick:()=>u({methodName:"clear",elementId:v})}))),e.default.createElement(a.Button.Group,null,e.default.createElement(a.Tooltip,{title:w("Copy Attributes to Clipboard")},e.default.createElement(a.Button,{disabled:R,id:"btnCopyAttributes",icon:e.default.createElement(i.CopyOutlined,null),onClick:()=>r.clipboard.writeText(JSON.stringify(P))})),e.default.createElement(a.Tooltip,{title:w("Get Timing")},e.default.createElement(a.Button,{disabled:R,id:"btnGetTiming",icon:e.default.createElement(i.HourglassOutlined,null),onClick:()=>h(L)})))),L.length>0&&e.default.createElement(a.Row,null,e.default.createElement(a.Spin,{spinning:b},e.default.createElement(a.Table,{columns:W,dataSource:L,size:"small",tableLayout:"fixed",pagination:!1}))),e.default.createElement("br",null),E===s&&j&&e.default.createElement("div",null,e.default.createElement(a.Alert,{message:w("usingXPathNotRecommended"),type:d.ALERT.WARNING,showIcon:!0}),e.default.createElement("br",null)),E===s&&o&&o.length>1&&e.default.createElement("div",null,e.default.createElement(a.Alert,{message:w("usingSwitchContextRecommended"),type:d.ALERT.WARNING,showIcon:!0}),e.default.createElement("br",null)),E!==s&&e.default.createElement("div",null,e.default.createElement(a.Alert,{message:w("usingWebviewContext"),type:d.ALERT.WARNING,showIcon:!0}),e.default.createElement("br",null)),o&&o.length>1&&e.default.createElement("div",null,(()=>{const{setContext:t}=c;return e.default.createElement(a.Tooltip,{title:w("contextSwitcher")},e.default.createElement(a.Select,{value:E,onChange:e=>{t(e),u({methodName:"switchContext",args:[e]})},className:n.default["context-selector"]},o.map(({id:t,title:l})=>e.default.createElement(a.Select.Option,{key:t,value:t},l?`${l} (${t})`:t))))})(),e.default.createElement("br",null),e.default.createElement("br",null)),P.length>0&&e.default.createElement(a.Row,null,e.default.createElement(a.Table,{columns:S,dataSource:P,size:"small",pagination:!1})))};var h=E;exports.default=h;
},{"./shared":"n676","./Inspector.css":"rCqx","../../polyfills":"yhbL","../AntdTypes":"uK2B"}],"jw1I":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=c(require("react")),t=require("antd"),l=require("@ant-design/icons"),a=require("../AntdTypes"),n=r(require("./Inspector.css"));function r(e){return e&&e.__esModule?e:{default:e}}function o(e){if("function"!=typeof WeakMap)return null;var t=new WeakMap,l=new WeakMap;return(o=function(e){return e?l:t})(e)}function c(e,t){if(!t&&e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var l=o(t);if(l&&l.has(e))return l.get(e);var a={},n=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var r in e)if("default"!==r&&Object.prototype.hasOwnProperty.call(e,r)){var c=n?Object.getOwnPropertyDescriptor(e,r):null;c&&(c.get||c.set)?Object.defineProperty(a,r,c):a[r]=e[r]}return a.default=e,l&&l.set(e,a),a}function u(){return(u=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var l=arguments[t];for(var a in l)Object.prototype.hasOwnProperty.call(l,a)&&(e[a]=l[a])}return e}).apply(this,arguments)}const i=r=>{const{locatedElements:o,locatedElementsExecutionTime:c,applyClientMethod:i,setLocatorTestElement:d,locatorTestElement:s,isFindingLocatedElementInSource:m,searchedForElementBounds:f,selectLocatedElement:p,source:E,driver:b,t:y}=r,g=(0,e.useRef)(null);return e.default.createElement(e.default.Fragment,null,0===o.length&&e.default.createElement(t.Space,{className:n.default.spaceContainer,direction:"vertical",size:"small"},e.default.createElement(t.Row,null,e.default.createElement("i",null,y("couldNotFindAnyElements"))),(()=>{const{locatorTestStrategy:l,locatorTestValue:n}=r,o=b.client.capabilities.automationName,c=b.client.capabilities.disableIdLocatorAutocompletion;if(o&&"uiautomator2"===o.toLowerCase()&&"id"===l&&!n.includes(":id/")&&!c)return e.default.createElement(t.Row,null,e.default.createElement(t.Alert,{message:y("idAutocompletionCanBeDisabled"),type:a.ALERT.INFO,showIcon:!0}))})()),o.length>0&&e.default.createElement(t.Spin,{spinning:m},e.default.createElement(t.Space,{className:n.default.spaceContainer,direction:"vertical",size:"small"},e.default.createElement(t.Row,{justify:"space-between"},e.default.createElement("span",null,y("elementsCount")," ",e.default.createElement(t.Badge,{count:o.length,offset:[0,-2]})),e.default.createElement(e.default.Fragment,null,y("Time"),": ",c)),e.default.createElement(t.Row,null,e.default.createElement(t.List,{className:n.default.searchResultsList,size:"small",dataSource:o,renderItem:l=>e.default.createElement(t.List.Item,u({type:"text"},s===l?{className:n.default.searchResultsSelectedItem}:{},s!==l?{onClick:()=>{d(l)}}:{}),l)})),e.default.createElement(t.Row,{justify:"center"},e.default.createElement(t.Space,{direction:"horizontal",size:"small"},e.default.createElement(t.Tooltip,{title:y("Find and Select in Source"),placement:"bottom"},e.default.createElement(t.Button,{disabled:!s,icon:e.default.createElement(l.MenuUnfoldOutlined,null),onClick:()=>p(E,f,s)})),e.default.createElement(t.Tooltip,{title:y("Tap"),placement:"bottom"},e.default.createElement(t.Button,{disabled:!s,icon:e.default.createElement(l.AimOutlined,null),onClick:()=>i({methodName:"click",elementId:s})})),e.default.createElement(t.Button.Group,{className:n.default.searchResultsActions},e.default.createElement(t.Input,{className:n.default.searchResultsKeyInput,disabled:!s,placeholder:y("Enter Keys to Send"),allowClear:!0,onChange:e=>g.current=e.target.value}),e.default.createElement(t.Tooltip,{title:y("Send Keys"),placement:"bottom"},e.default.createElement(t.Button,{disabled:!s,icon:e.default.createElement(l.SendOutlined,null),onClick:()=>i({methodName:"sendKeys",elementId:s,args:[g.current||""]})})),e.default.createElement(t.Tooltip,{title:y("Clear"),placement:"bottom"},e.default.createElement(t.Button,{disabled:!s,id:"btnClearElement",icon:e.default.createElement(l.ClearOutlined,null),onClick:()=>i({methodName:"clear",elementId:s})}))))))))};var d=i;exports.default=d;
},{"../AntdTypes":"uK2B","./Inspector.css":"rCqx"}],"tUc4":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=s(require("react")),t=require("antd"),a=require("../AntdTypes"),r=s(require("./Inspector.css"));function s(e){return e&&e.__esModule?e:{default:e}}const o=["id","Id"],l=["xpath","XPath"],i=["name","Name"],c=["class name","Class Name"],u=["accessibility id","Accessibility ID"],n=["-ios predicate string","Predicate String"],d=["-ios class chain","Class Chain"],m=["-android uiautomator","UIAutomator"],f=["-android datamatcher","DataMatcher"],p=["-android viewtag","View Tag"],g=e=>{const t=e.client.capabilities.automationName;let a=[o,l,i,c,u];if(!t)return a;switch(t.toLowerCase()){case"xcuitest":case"mac2":a.push(n,d);break;case"espresso":a.push(f,p);break;case"uiautomator2":a.push(m)}return a},h=(r,s)=>{if(!r.client.capabilities.automationName)return e.default.createElement(t.Alert,{message:s("missingAutomationNameForStrategies"),type:a.ALERT.INFO,showIcon:!0})},y=a=>{const{setLocatorTestValue:s,locatorTestValue:o,setLocatorTestStrategy:l,locatorTestStrategy:i,driver:c,t:u}=a;return e.default.createElement(t.Space,{className:r.default.spaceContainer,direction:"vertical",size:"small"},u("locatorStrategy"),e.default.createElement(t.Row,{justify:"center"},e.default.createElement(t.Radio.Group,{buttonStyle:"solid",onChange:e=>l(e.target.value),defaultValue:i},e.default.createElement(t.Row,{justify:"center"},g(c).map(([a,s])=>e.default.createElement(t.Radio.Button,{className:r.default.locatorStrategyBtn,value:a,key:a},s))))),h(c,u),u("selector"),e.default.createElement(t.Input.TextArea,{className:r.default.locatorSelectorTextArea,onChange:e=>s(e.target.value),value:o,allowClear:!0,rows:3}))};var v=y;exports.default=v;
},{"../AntdTypes":"uK2B","./Inspector.css":"rCqx"}],"JE1Y":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=l(require("react")),t=require("antd"),a=l(require("./LocatedElements")),r=l(require("./ElementLocator"));function l(e){return e&&e.__esModule?e:{default:e}}const o=l=>{const{isLocatorTestModalVisible:o,isSearchingForElements:n,clearSearchResults:c,locatedElements:u,t:d}=l,s=()=>{const{hideLocatorTestModal:e}=l;e(),c()};return e.default.createElement(t.Modal,{open:o,title:d("Search for element"),onCancel:s,footer:e.default.createElement(e.default.Fragment,null,u&&e.default.createElement(t.Button,{onClick:e=>e.preventDefault()||c()},d("Back")),e.default.createElement(t.Button,{loading:n,onClick:()=>{const{locatorTestStrategy:e,locatorTestValue:t,searchForElement:a}=l;u?s():a(e,t)},type:"primary"},d(u?"Done":"Search")))},!u&&e.default.createElement(r.default,l),u&&e.default.createElement(a.default,l))};var n=o;exports.default=n;
},{"./LocatedElements":"jw1I","./ElementLocator":"tUc4"}],"hLke":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=a(require("react")),t=require("antd");function a(e){return e&&e.__esModule?e:{default:e}}const o=a=>{const{siriCommandValue:o,setSiriCommandValue:r,isSiriCommandModalVisible:n,t:l}=a,i=()=>{const{hideSiriCommandModal:e}=a;e()};return e.default.createElement(t.Modal,{open:n,title:l("Execute Siri Command"),onCancel:i,footer:e.default.createElement(t.Button,{onClick:()=>{const{applyClientMethod:e}=a;e({methodName:"executeScript",args:["mobile:siriCommand",[{text:o}]]}),i()},type:"primary"},l("Execute Command"))},e.default.createElement(t.Row,null,l("Command"),e.default.createElement(t.Input.TextArea,{onChange:e=>r(e.target.value),value:o})))};var r=o;exports.default=r;
},{}],"RqXv":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=n(require("react")),t=require("antd"),a=n(require("./LocatorTestModal")),r=n(require("./Inspector.css")),l=n(require("./SiriCommandModal"));function n(e){return e&&e.__esModule?e:{default:e}}const s=["name","content-desc","resource-id","AXDescription","AXIdentifier"],u=n=>{const{source:u,sourceError:c,setExpandedPaths:d,expandedPaths:o,selectedElement:i={},showSourceAttrs:f,methodCallInProgress:m,mjpegScreenshotUrl:p,isSourceRefreshOn:E,t:h}=n,g=(t,a)=>{const{tagName:l,attributes:n}=t;let u=[];for(let c of Object.keys(n))(s.includes(c)||a)&&u.push(e.default.createElement("span",{key:c}," ",e.default.createElement("i",{className:r.default.sourceAttrName},c),"=",e.default.createElement("span",{className:r.default.sourceAttrValue},'"',n[c],'"')));return e.default.createElement("span",null,"<",e.default.createElement("b",{className:r.default.sourceTag},l),u,">")},x=e=>((e||{}).children||[]).length?e.children.map(e=>({title:g(e,f),key:e.path,children:x(e)})):null,N=u&&x(u);return e.default.createElement("div",{id:"sourceContainer",className:r.default["tree-container"],tabIndex:"0"},!u&&!c&&e.default.createElement("i",null,h("Gathering initial app source…")),c&&h("couldNotObtainSource",{errorMsg:JSON.stringify(c)}),e.default.createElement(t.Spin,{size:"large",spinning:!!m&&p&&E},N?e.default.createElement(t.Tree,{defaultExpandAll:!0,onExpand:d,expandedKeys:o,onSelect:e=>(e=>{const{selectElement:t,unselectElement:a}=n;e?t(e):a()})(e[0]),selectedKeys:[i.path],treeData:N}):e.default.createElement(t.Tree,{treeData:[]})),e.default.createElement(a.default,n),e.default.createElement(l.default,n))};var c=u;exports.default=c;
},{"./LocatorTestModal":"JE1Y","./Inspector.css":"rCqx","./SiriCommandModal":"hLke"}],"n1jh":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=require("../../polyfills"),t=i(require("react")),l=require("antd"),a=i(require("./Inspector.css")),r=i(require("../../lib/client-frameworks")),n=require("highlight.js"),o=require("@ant-design/icons"),d=require("../AntdTypes");function i(e){return e&&e.__esModule?e:{default:e}}const c=i=>{const{showBoilerplate:c,recordedActions:u,actionFramework:s,t:f}=i,m=(e=!0)=>{const{host:t,port:l,path:a,https:o,desiredCapabilities:d}=i.sessionDetails;let f=new r.default[s](t,l,a,o,d);f.actions=u;const m=f.getCodeString(c);return e?m:(0,n.highlight)(f.language,m,!0).value},p=m(!1);return t.default.createElement(l.Card,{title:t.default.createElement("span",null,t.default.createElement(o.CodeOutlined,null)," ",f("Recorder")),className:a.default["recorded-actions"],extra:(()=>{const{setActionFramework:n,toggleShowBoilerplate:p,clearRecording:h,closeRecorder:E,isRecording:g}=i;return t.default.createElement("div",null,!!u.length&&t.default.createElement(l.Select,{defaultValue:s,onChange:n,className:a.default["framework-dropdown"],size:"small"},Object.keys(r.default).map(e=>t.default.createElement(l.Select.Option,{value:e,key:e},r.default[e].readableName))),(!!u.length||!g)&&t.default.createElement(l.Button.Group,{size:"small"},!!u.length&&t.default.createElement(l.Tooltip,{title:f("Show/Hide Boilerplate Code")},t.default.createElement(l.Button,{onClick:p,icon:t.default.createElement(o.ExportOutlined,null),type:c?d.BUTTON.PRIMARY:d.BUTTON.DEFAULT})),!!u.length&&t.default.createElement(l.Tooltip,{title:f("Copy code to clipboard")},t.default.createElement(l.Button,{icon:t.default.createElement(o.CopyOutlined,null),onClick:()=>e.clipboard.writeText(m())})),!!u.length&&t.default.createElement(l.Tooltip,{title:f("Clear Actions")},t.default.createElement(l.Button,{icon:t.default.createElement(o.DeleteOutlined,null),onClick:h})),!g&&t.default.createElement(l.Tooltip,{title:f("Close Recorder")},t.default.createElement(l.Button,{icon:t.default.createElement(o.CloseOutlined,null),onClick:E}))))})()},!u.length&&t.default.createElement("div",{className:a.default["no-recorded-actions"]},f("Perform some actions to see code show up here")),!!u.length&&t.default.createElement("div",{className:a.default["recorded-code"],dangerouslySetInnerHTML:{__html:p}}))};var u=c;exports.default=u;
},{"../../polyfills":"yhbL","./Inspector.css":"rCqx","../../lib/client-frameworks":"VMpq","../AntdTypes":"uK2B"}],"MPWP":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=o(require("react")),t=o(require("lodash")),a=require("antd"),n=require("./shared"),l=o(require("./Inspector.css")),r=require("../AntdTypes");function o(e){return e&&e.__esModule?e:{default:e}}const d=o=>{const{selectCommandGroup:d,selectCommandSubGroup:u,selectedCommandGroup:m,selectedCommandSubGroup:c,pendingCommand:s,cancelPendingCommand:i,setCommandArg:f,applyClientMethod:p,t:E}=o;return e.default.createElement("div",{className:l.default["commands-container"]},e.default.createElement(a.Row,{gutter:16,className:l.default["arg-row"]},e.default.createElement(a.Col,{span:24},e.default.createElement(a.Select,{onChange:e=>d(e),placeholder:E("Select Command Group")},t.default.keys(n.COMMAND_DEFINITIONS).map(t=>e.default.createElement(a.Select.Option,{key:t},E(t)))))),m&&e.default.createElement(a.Row,null,e.default.createElement(a.Col,{span:24},e.default.createElement(a.Select,{onChange:e=>u(e),placeholder:E("Select Sub Group")},t.default.keys(n.COMMAND_DEFINITIONS[m]).map(t=>e.default.createElement(a.Select.Option,{key:t},E(t)))))),e.default.createElement(a.Row,null,c&&t.default.toPairs(n.COMMAND_DEFINITIONS[m][c]).map(([n,r],d)=>e.default.createElement(a.Col,{key:d,span:8},e.default.createElement("div",{className:l.default["btn-container"]},e.default.createElement(a.Button,{onClick:()=>((e,a)=>{const{startEnteringCommandArgs:n}=o;t.default.isEmpty(a.args)?p({methodName:a.methodName,args:[],skipRefresh:!a.refresh,ignoreResult:!1}):n(e,a)})(n,r)},E(n)))))),!!s&&e.default.createElement(a.Modal,{title:E(s.commandName),okText:E("Execute Command"),cancelText:E("Cancel"),open:!!s,onOk:()=>(()=>{let{args:e,command:n}=s;if("rotateDevice"===n.methodName&&(e={x:e[0],y:e[1],duration:e[2],radius:e[3],rotation:e[4],touchCount:e[5]}),"setGeoLocation"===n.methodName&&(e={latitude:e[0],longitude:e[1],altitude:e[2]}),"executeScript"===n.methodName&&!t.default.isEmpty(e[1]))try{e[1]=JSON.parse(e[1])}catch(l){a.notification.error({message:E("invalidJson",{json:e[1]}),duration:5})}if("updateSettings"===n.methodName&&t.default.isString(e[0]))try{e[0]=JSON.parse(e[0])}catch(l){a.notification.error({message:E("invalidJson",{json:e[0]}),duration:5})}p({methodName:n.methodName,args:e,skipRefresh:!n.refresh,ignoreResult:!1}),i()})(),onCancel:()=>i()},!t.default.isEmpty(s.command.args)&&t.default.map(s.command.args,([o,d],u)=>e.default.createElement(a.Row,{key:u,gutter:16},e.default.createElement(a.Col,{span:24,className:l.default["arg-container"]},d===n.COMMAND_ARG_TYPES.NUMBER&&e.default.createElement(a.Input,{type:r.INPUT.NUMBER,value:s.args[u],addonBefore:E(o),onChange:e=>f(u,t.default.toNumber(e.target.value))}),d===n.COMMAND_ARG_TYPES.BOOLEAN&&e.default.createElement("div",null,E(o)," ",e.default.createElement(a.Switch,{checked:s.args[u],onChange:e=>f(u,e)})),d===n.COMMAND_ARG_TYPES.STRING&&e.default.createElement(a.Input,{addonBefore:E(o),onChange:e=>f(u,e.target.value)}))))))};var u=d;exports.default=u;
},{"./shared":"n676","./Inspector.css":"rCqx","../AntdTypes":"uK2B"}],"JE4e":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=c(require("react")),t=require("antd"),r=l(require("./Inspector.css")),n=require("@ant-design/icons"),o=require("./shared"),a=l(require("lodash")),i=l(require("moment"));function l(e){return e&&e.__esModule?e:{default:e}}function u(e){if("function"!=typeof WeakMap)return null;var t=new WeakMap,r=new WeakMap;return(u=function(e){return e?r:t})(e)}function c(e,t){if(!t&&e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var r=u(t);if(r&&r.has(e))return r.get(e);var n={},o=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var a in e)if("default"!==a&&Object.prototype.hasOwnProperty.call(e,a)){var i=o?Object.getOwnPropertyDescriptor(e,a):null;i&&(i.get||i.set)?Object.defineProperty(n,a,i):n[a]=e[a]}return n.default=e,r&&r.set(e,n),n}const s={NAME:"Name",DESCRIPTION:"Description",CREATED:"Created",ACTIONS:"Actions"},d=l=>{const{savedGestures:u,showGestureEditor:c,removeGestureDisplay:d,t:f}=l,p=(0,e.useRef)(null),m=e=>{for(const t of u)if(t.id===e)return t;throw new Error(`Couldn't find session with id ${e}`)},y=e=>{const{displayGesture:t}=l;t(O(e.actions))},E=e=>{const t={};for(const r of e)t[r.name]=r.ticks.map(e=>a.default.omit(e,"id"));return t},O=e=>{const{windowSize:t}=l,r=JSON.parse(JSON.stringify(e));for(const n of r)for(const e of n.ticks)e.type===o.POINTER_TYPES.POINTER_MOVE&&(e.x=(0,o.percentageToPixels)(e.x,t.width),e.y=(0,o.percentageToPixels)(e.y,t.height));return r},k=Object.keys(s).map(r=>s[r]===s.ACTIONS?{title:s[r],key:s[r],render:(r,a)=>{const i=m(a.key);return e.default.createElement(t.Button.Group,null,e.default.createElement(t.Tooltip,{title:f("Play")},e.default.createElement(t.Button,{key:"play",type:"primary",icon:e.default.createElement(n.PlayCircleOutlined,null),onClick:()=>(e=>{const{applyClientMethod:t}=l,r=O(e.actions),n=E(r);t({methodName:o.SCREENSHOT_INTERACTION_MODE.GESTURE,args:[n]})})(i)})),e.default.createElement(t.Button,{icon:e.default.createElement(n.EditOutlined,null),onClick:()=>(e=>{const{setLoadedGesture:t}=l;d(),t(e),c()})(i)}),e.default.createElement(t.Button,{icon:e.default.createElement(n.DeleteOutlined,null),onClick:()=>(e=>{const{deleteSavedGesture:t}=l;window.confirm("Are you sure?")&&t(e)})(i.id)}))}}:{title:s[r],dataIndex:s[r],key:s[r]});return(0,e.useEffect)(()=>{const{getSavedGestures:e}=l;return e(),()=>p.current=null},[]),e.default.createElement(t.Space,{className:r.default.spaceContainer,direction:"vertical",size:"middle"},f("gesturesDescription"),e.default.createElement(t.Table,{onRow:e=>({onClick:()=>(e=>{const t=m(e);t.id===p.current?(d(),p.current=null):(y(t),p.current=t.id)})(e.key)}),pagination:!1,dataSource:(()=>u?u.map(e=>({key:e.id,Name:e.name||"(Unnamed)",Created:(0,i.default)(e.date).format("YYYY-MM-DD"),Description:e.description||"No Description"})):[])(),columns:k,footer:()=>e.default.createElement(t.Button,{onClick:c,icon:e.default.createElement(n.PlusOutlined,null)})}))};var f=d;exports.default=f;
},{"./Inspector.css":"rCqx","./shared":"n676"}],"qT8s":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=o(require("react")),t=i(require("lodash")),a=require("antd"),l=require("@ant-design/icons"),n=require("./shared"),r=i(require("./Inspector.css"));function i(e){return e&&e.__esModule?e:{default:e}}function u(e){if("function"!=typeof WeakMap)return null;var t=new WeakMap,a=new WeakMap;return(u=function(e){return e?a:t})(e)}function o(e,t){if(!t&&e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var a=u(t);if(a&&a.has(e))return a.get(e);var l={},n=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var r in e)if("default"!==r&&Object.prototype.hasOwnProperty.call(e,r)){var i=n?Object.getOwnPropertyDescriptor(e,r):null;i&&(i.get||i.set)?Object.defineProperty(l,r,i):l[r]=e[r]}return l.default=e,a&&a.set(e,l),l}const{POINTER_UP:c,POINTER_DOWN:d,PAUSE:s,POINTER_MOVE:f}=n.POINTER_TYPES,p=2500,m=["#FF3333","#FF8F00","#B65FF4","#6CFF00","#00FFDC"],E={LEFT:0,RIGHT:1},y={ADD:"add",REMOVE:"remove"},T={ERROR:"error",SUCCESS:"success"},g={PERCENTAGES:"percentages",PIXELS:"pixels"},N={POINTER_TYPE:"pointerType",DURATION:"duration",BUTTON:"button",X:"x",Y:"y"},h={POINTER:"pointer",TEXT:"text"},x={WAIT:"wait",FINISH:"finish",COLOR:"#FFFFFF",FILLER:"filler"},P={[c]:"Pointer Up",[d]:"Pointer Down",[s]:"Pause",[f]:"Move"},C=()=>[{name:"pointer1",ticks:[{id:"1.1"}],color:m[0],id:"1"}],k=i=>{const{loadedGesture:u,saveGesture:o,tickCoordinates:p,selectedTick:k,selectTick:S,unselectTick:v,windowSize:O,t:I}=i,[R,F]=(0,e.useState)(u?u.actions:C()),[b,D]=(0,e.useState)(u?u.name:I("Untitled Gesture")),[A,L]=(0,e.useState)(u?u.description:I("Add Description")),[G,B]=(0,e.useState)(g.PERCENTAGES),[M,w]=(0,e.useState)("1");(0,e.useEffect)(()=>{const{displayGesture:e}=i;e(z(g.PIXELS))},[R]),(0,e.useEffect)(()=>{p&&W(k,p.x,p.y)},[k,p]);const _=()=>{const{hideGestureEditor:e,removeLoadedGesture:t,removeGestureDisplay:a}=i;v(),a(),t(),e()},U=e=>{const t={};for(const a of e){if(t[a.name])return X(T.ERROR,I("Duplicate pointer names are not allowed")),!0;t[a.name]=a}return!1},X=(e,t)=>{a.notification[e]({message:t,duration:5})},V=()=>{const e={},a=z(g.PIXELS);for(const l of a)e[l.name]=l.ticks.map(e=>t.default.omit(e,"id"));return e},z=e=>{const{width:a,height:l}=O;if(e===G)return R;const r=t.default.cloneDeep(R);for(const t of r)for(const r of t.ticks)r.type===n.POINTER_TYPES.POINTER_MOVE&&(e===g.PIXELS?(r.x=(0,n.percentageToPixels)(r.x,a),r.y=(0,n.percentageToPixels)(r.y,l)):(r.x=(0,n.pixelsToPercentage)(r.x,a),r.y=(0,n.pixelsToPercentage)(r.y,l)));return r},Y=(e,t,a,l,r)=>{const{width:i,height:u}=O,o=e.filter(e=>e.id!==t),c=[];for(const n of o)n.type===f&&void 0!==n.x&&void 0!==n.y&&c.push({x:n.x,y:n.y});const d=c.length;if(0===d)return 0;const s={x1:c[d-1].x,y1:c[d-1].y,x2:a,y2:l};G===g.PERCENTAGES&&(s.x1=(0,n.percentageToPixels)(s.x1,i),s.y1=(0,n.percentageToPixels)(s.y1,u),r||(s.x2=(0,n.percentageToPixels)(s.x2,i),s.y2=(0,n.percentageToPixels)(s.y2,u)));const p=(e,t)=>Math.sqrt(e**2+t**2),m=(e,t)=>Math.abs(t)-Math.abs(e),E=m(s.x1,s.x2),y=m(s.y1,s.y2),T=p(i,u),N=p(E,y)/T;return Math.round(2500*N)},W=(e,a,l)=>{if(!a||!l)return null;const{width:r,height:i}=O,u=t.default.cloneDeep(R),o=u.find(t=>t.id===e[0]),c=o.ticks.find(t=>t.id===e),d=parseFloat(a,10),s=parseFloat(l,10);G===g.PERCENTAGES?(c.x=(0,n.pixelsToPercentage)(d,r),c.y=(0,n.pixelsToPercentage)(s,i)):(c.x=d,c.y=s),void 0===c.duration&&(c.duration=Y(o.ticks,c.id,d,s,!0)),F(u)},$=(e,a,l)=>{const n=t.default.cloneDeep(R),r=n.find(t=>t.id===e.id[0]),i=r.ticks.findIndex(t=>t.id===e.id);let u=r.ticks[i];a===N.POINTER_TYPE?(l===f&&S(e.id),u={id:e.id,type:l,...[d,c].includes(l)&&{button:E.LEFT},...l===s&&{duration:0}}):(u[a]=parseFloat(l,10),void 0!==u.x&&void 0!==u.y&&void 0===u.duration&&(u.duration=Y(r.ticks,e.id,u.x,u.y,!1))),r.ticks[i]=u,F(n)},j=e.default.createElement(a.Tooltip,{title:I("Edit")},e.default.createElement(a.Input,{defaultValue:b,className:r.default["gesture-header-title"],onChange:e=>D(e.target.value),size:"small"})),q=e.default.createElement(e.default.Fragment,null,e.default.createElement(a.Button.Group,null,e.default.createElement(a.Button,{className:r.default["gesture-header-coord-btn"],type:G===g.PERCENTAGES?"primary":"default",onClick:()=>{F(z(g.PERCENTAGES)),B(g.PERCENTAGES)},size:"small"},"%"),e.default.createElement(a.Button,{className:r.default["gesture-header-coord-btn"],type:G===g.PIXELS?"primary":"default",onClick:()=>{F(z(g.PIXELS)),B(g.PIXELS)},size:"small"},"px")),e.default.createElement(a.Tooltip,{title:I("Play")},e.default.createElement(a.Button,{type:"primary",icon:e.default.createElement(l.PlayCircleOutlined,null),onClick:()=>(()=>{const{applyClientMethod:e}=i;if(U(R))return null;const t=V();e({methodName:n.SCREENSHOT_INTERACTION_MODE.GESTURE,args:[t]})})()})),e.default.createElement(a.Button,{onClick:()=>(()=>{if(U(R))return null;const e={name:b,description:A,actions:z(g.PERCENTAGES)};o(e),X(T.SUCCESS,I("Gesture saved as",{gestureName:b})),_()})()},I("saveAs")),e.default.createElement(a.Button,{onClick:()=>(()=>{const{id:e,date:t}=u;if(U(R))return null;const a={name:b,description:A,id:e,date:t,actions:z(g.PERCENTAGES)};o(a),X(T.SUCCESS,I("Gesture saved"))})(),disabled:!u},I("Save"))),H=e.default.createElement(a.Tooltip,{title:I("Edit")},e.default.createElement(a.Input,{defaultValue:A,className:r.default["gesture-header-description"],onChange:e=>L(e.target.value),size:"small"})),K=(t,n)=>{const{type:i,duration:u,button:o,x:p,y:m}=n,y={color:t.color};return e.default.createElement(a.Popover,{placement:"bottom",title:e.default.createElement("center",null,I(P[i])),content:e.default.createElement("div",{className:r.default["timeline-tick-title"]},void 0!==u&&e.default.createElement("p",null,I("Duration"),": ",u,"ms"),void 0!==o&&e.default.createElement("p",null,I("Button"),": ",I(o===E.LEFT?"Left":"Right")),void 0!==p&&e.default.createElement("p",null,"X: ",p,G===g.PIXELS?"px":"%"),void 0!==m&&e.default.createElement("p",null,"Y: ",m,G===g.PIXELS?"px":"%"),void 0===i&&e.default.createElement("p",null,I("Action Type Not Defined")))},i===f&&e.default.createElement(l.RightCircleOutlined,{className:r.default["gesture-header-icon"],style:y}),i===d&&e.default.createElement(l.DownCircleOutlined,{className:r.default["gesture-header-icon"],style:y}),i===c&&e.default.createElement(l.UpCircleOutlined,{className:r.default["gesture-header-icon"],style:y}),i===s&&e.default.createElement(l.PauseCircleOutlined,{className:r.default["gesture-header-icon"],style:y}),void 0===i&&e.default.createElement(l.QuestionCircleOutlined,{className:r.default["gesture-header-icon"],style:y}))},Q=(()=>{const e=t.default.cloneDeep(R),a=e.map(e=>e.ticks.length),l=Math.max(...a);return e.map(e=>{const t=e.ticks.length;if(t>0&&(e.ticks[t-1].customStep=x.WAIT,t<l)){const a=Array.from({length:l-t},()=>({type:x.FILLER,color:x.COLOR}));e.ticks.push(...a)}return e})})().map(t=>e.default.createElement("center",{key:t.id},e.default.createElement(a.Steps,{className:r.default["gesture-header-timeline"],style:{"--timelineColor":t.color},items:t.ticks.map(a=>a.type!==x.FILLER?{key:"timeline-steps",status:a.customStep||x.FINISH,icon:K(t,a)}:{key:"transparent-steps",status:x.WAIT,icon:e.default.createElement(l.RightCircleOutlined,{className:r.default["gesture-header-icon"],style:{color:a.color}})})}))),J=t=>e.default.createElement(a.Tooltip,{title:I(k===t?"Click to Set Coordinates":"Set Coordinates Via Field")},e.default.createElement(a.Button,{size:"small",type:k===t?"primary":"text",icon:e.default.createElement(l.AimOutlined,null),onClick:()=>k===t?v():S(t)})),Z=n=>e.default.createElement(a.Card,{hoverable:!0,className:r.default["tick-card"],extra:e.default.createElement(e.default.Fragment,null,n.type===f&&J(n.id),e.default.createElement(a.Button,{size:"small",type:"text",icon:e.default.createElement(l.CloseOutlined,null),onClick:()=>((e,a)=>{const l=t.default.cloneDeep(R),n=l.find(t=>t.id===e),r=n.ticks.filter(e=>e.id!==a).map((e,t)=>{const a=String(t+1);return e.id!==a&&(e.id=`${e.id[0]}.${a}`),e});n.ticks=r,v(),F(l)})(n.id[0],n.id)}))},e.default.createElement(a.Space,{className:r.default.spaceContainer,direction:"vertical",size:"middle"},(t=>e.default.createElement("center",null,e.default.createElement(a.Select,{className:r.default["tick-pointer-input"],placeholder:I("Action Type"),value:t.type,defaultValue:t.type,size:"middle",dropdownMatchSelectWidth:!1,onChange:e=>$(t,N.POINTER_TYPE,e)},e.default.createElement(a.Select.Option,{className:r.default["option-inpt"],value:f},I(P.pointerMove)),e.default.createElement(a.Select.Option,{className:r.default["option-inpt"],value:d},I(P.pointerDown)),e.default.createElement(a.Select.Option,{className:r.default["option-inpt"],value:c},I(P.pointerUp)),e.default.createElement(a.Select.Option,{className:r.default["option-inpt"],value:s},I(P.pause)))))(n),(n.type===f||n.type===s)&&(t=>e.default.createElement("center",null,e.default.createElement(a.Input,{className:r.default["tick-input-box"],value:isNaN(t.duration)?null:t.duration,placeholder:I("Duration"),defaultValue:t.duration,onChange:e=>$(t,N.DURATION,e.target.value),addonAfter:"ms"})))(n),(n.type===d||n.type===c)&&(t=>e.default.createElement("center",null,e.default.createElement(a.Button.Group,{className:r.default["tick-button-group"]},e.default.createElement(a.Button,{type:t.button===E.LEFT?"primary":"default",className:r.default["tick-button-input"],onClick:()=>$(t,N.BUTTON,E.LEFT)},I("Left")),e.default.createElement(a.Button,{type:t.button===E.RIGHT?"primary":"default",className:r.default["tick-button-input"],onClick:()=>$(t,N.BUTTON,E.RIGHT)},I("Right")))))(n),n.type===f&&(t=>e.default.createElement("center",null,e.default.createElement("div",{className:r.default["tick-input-box"]},e.default.createElement(a.Input,{className:r.default["tick-coord-box"],value:isNaN(t.x)?"":t.x,placeholder:"X",defaultValue:t.x,onChange:e=>$(t,N.X,e.target.value)}),e.default.createElement(a.Input,{className:r.default["tick-coord-box"],value:isNaN(t.y)?"":t.y,placeholder:"Y",defaultValue:t.y,onChange:e=>$(t,N.Y,e.target.value)}))))(n))),ee=n=>e.default.createElement(a.Row,{gutter:[24,24]},n.ticks.map(t=>e.default.createElement(a.Col,{xs:12,sm:12,md:12,lg:8,xl:6,xxl:4,key:t.id},Z(t))),e.default.createElement(a.Col,{xs:12,sm:12,md:12,lg:8,xl:6,xxl:4},e.default.createElement(a.Card,{className:r.default["tick-plus-card"],bordered:!1},e.default.createElement("center",null,e.default.createElement(a.Button,{className:r.default["tick-plus-btn"],icon:e.default.createElement(l.PlusCircleOutlined,null),onClick:()=>(e=>{const a=t.default.cloneDeep(R),l=a.find(t=>t.id===e),n=`${e}.${l.ticks.length+1}`;l.ticks.push({id:n}),F(a)})(n.id)}))))),te=R.map((l,n)=>({label:e.default.createElement(a.Tooltip,{title:I("Edit")},e.default.createElement(a.Input,{className:r.default["pointer-title"],style:{cursor:M===l.id?h.TEXT:h.POINTER,textDecorationColor:l.color},value:l.name,defaultValue:l.name,bordered:!1,maxLength:10,onChange:e=>((e,a)=>{const l=t.default.cloneDeep(R);l[a].name=e,F(l)})(e.target.value,n)})),key:l.id,children:ee(l)}));return e.default.createElement(e.default.Fragment,null,e.default.createElement(a.PageHeader,{className:r.default["gesture-header"],onBack:()=>_(),title:j,extra:q,footer:e.default.createElement(e.default.Fragment,null,H,e.default.createElement(a.Divider,null),Q)}),e.default.createElement(a.Tabs,{type:"editable-card",onChange:e=>w(e),activeKey:M,onEdit:(e,a)=>a===y.ADD?(()=>{const e=R.length+1,a=String(e),l=t.default.cloneDeep(R);l.push({name:`pointer${e}`,ticks:[{id:`${e}.1`}],id:a,color:m[e-1]}),F(l),w(a)})():(e=>{let t="1";const a=R.filter(t=>t.id!==e).map((e,a)=>{const l=String(a+1);return l!==e.id?(e.id=l,e.color=m[a],e.ticks=e.ticks.map(e=>(e.id=`${l}.${e.id[2]}`,e))):t=e.id,e});v(),F(a),w(t)})(e),hideAdd:5===R.length,centered:!0,tabBarGutter:10,items:te}))};var S=k;exports.default=S;
},{"./shared":"n676","./Inspector.css":"rCqx"}],"PrK6":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=i(require("react")),t=require("antd"),l=require("@ant-design/icons"),a=i(require("./Inspector.css")),r=i(require("../../lib/client-frameworks")),n=require("highlight.js"),d=require("../../polyfills");function i(e){return e&&e.__esModule?e:{default:e}}const o=({actionFramework:i,setActionFramework:o,sessionDetails:u,t:s})=>{const c=()=>{const{host:e,port:t,path:l,https:a,desiredCapabilities:d}=u,o=new r.default[i](e,t,l,a,d),s=o.getCodeString(!0);return(0,n.highlight)(o.language,s,!0).value};return e.default.createElement(t.Card,{title:e.default.createElement("span",null,e.default.createElement(l.CodeOutlined,null)," ",s("Start this Kind of Session with Code")),className:a.default["recorded-actions"],extra:(()=>e.default.createElement("div",null,e.default.createElement(t.Select,{defaultValue:i,onChange:o,className:a.default["framework-dropdown"],size:"small"},Object.keys(r.default).map(l=>e.default.createElement(t.Select.Option,{value:l,key:l},r.default[l].readableName))),e.default.createElement(t.Tooltip,{title:s("Copy Code to Clipboard")},e.default.createElement(t.Button,{icon:e.default.createElement(l.CopyOutlined,null),onClick:()=>d.clipboard.writeText(c()),type:"text"}))))()},e.default.createElement("div",{className:a.default["recorded-code"],dangerouslySetInnerHTML:{__html:c()}}))};var u=o;exports.default=u;
},{"./Inspector.css":"rCqx","../../lib/client-frameworks":"VMpq","../../polyfills":"yhbL"}],"fLJm":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=l(require("react")),t=require("antd"),s=a(require("./SessionCodeBox")),r=a(require("./Inspector.css")),n=a(require("format-json"));function a(e){return e&&e.__esModule?e:{default:e}}function o(e){if("function"!=typeof WeakMap)return null;var t=new WeakMap,s=new WeakMap;return(o=function(e){return e?s:t})(e)}function l(e,t){if(!t&&e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var s=o(t);if(s&&s.has(e))return s.get(e);var r={},n=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var a in e)if("default"!==a&&Object.prototype.hasOwnProperty.call(e,a)){var l=n?Object.getOwnPropertyDescriptor(e,a):null;l&&(l.get||l.set)?Object.defineProperty(r,a,l):r[a]=e[a]}return r.default=e,s&&s.set(e,r),r}const i={session_id:"Session ID",session_url:"Session URL",server_details:"Server Details",session_length:"Session Length",session_details:"Session Details",active_appId:"Currently Active App ID"},u="sessionInfo",c="sessionDetails",d="serverDetails",f=104,p=200;let v;const S=a=>{const{driver:o}=a,l=Object.keys(i).map(e=>[e,String(i[e])]),u=()=>{const{sessionStartTime:e}=a,t=(Date.now()-e)/36e5,s=60*(t-Math.floor(t)),r=60*(s-Math.floor(s)),n=e=>String(Math.floor(e)).padStart(2,"0");return`${n(t)}:${n(s)}:${n(r)}`},c=(0,e.useRef)(),[d,f]=(0,e.useState)(u()),p=(o,l,i)=>{const u=`${l}_value`,c=o.map(([e,t])=>({key:e,[l]:i?t:e,[u]:t})),d=[{dataIndex:l,key:l,...i&&{width:200}},{dataIndex:u,key:u,render:i?e=>S(e):t=>"object"==typeof t?e.default.createElement("pre",null,n.default.plain(t)):String(t)}];return i?e.default.createElement("div",{className:r.default["session-info-table"]},e.default.createElement(t.Row,null,e.default.createElement(t.Col,{span:24},e.default.createElement(t.Table,{columns:d,dataSource:c,pagination:!1,showHeader:!1,bordered:!0,size:"small"}))),e.default.createElement("div",{className:r.default["session-code-box"]},e.default.createElement(t.Row,null,e.default.createElement(s.default,a)))):e.default.createElement(t.Table,{className:r.default["session-inner-table"],columns:d,dataSource:c,pagination:!1,showHeader:!1,size:"small",scroll:{y:104}})},S=e=>{const{sessionDetails:t,appId:s,status:r}=a,{host:n,path:l,port:i}=t,{sessionId:u,connectedUrl:c}=o||"",f=[["host",n],["path",l],["port",i]],S=null!=v?Object.keys(v).map(e=>[e,v[e]]):[],m=null!=r?Object.keys(r).map(e=>[e,String(r[e])]):[],y=u&&c?`${c}session/${u}`:"Error Fetching Session Url";switch(e){case"Session ID":return u;case"Session URL":return y;case"Server Details":return p([...f,...m],"serverDetails",!1);case"Session Length":return d;case"Session Details":return p(S,"sessionDetails",!1);case"Currently Active App ID":return s;default:return e}};return(0,e.useEffect)(()=>{const{getActiveAppId:e,getServerStatus:t,applyClientMethod:s}=a,{isIOS:r,isAndroid:n}=o.client;return e(r,n),t(),(async()=>v=await s({methodName:"getSession"}))(),c.current=setInterval(()=>{f(u())},1e3),()=>clearInterval(c.current)},[]),p(l,"sessionInfo",!0)};var m=S;exports.default=m;
},{"./SessionCodeBox":"PrK6","./Inspector.css":"rCqx"}],"wU5m":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=C(require("react")),t=require("lodash"),n=require("./shared"),l=require("antd"),a=S(require("./Screenshot")),r=S(require("./HeaderButtons")),i=S(require("./SelectedElement")),s=S(require("./Source")),o=S(require("./Inspector.css")),c=S(require("./RecordedActions")),d=S(require("./Commands")),u=S(require("./SavedGestures")),h=S(require("./GestureEditor")),m=S(require("./SessionInfo")),p=require("../../polyfills"),f=require("@ant-design/icons"),E=require("../AntdTypes");function S(e){return e&&e.__esModule?e:{default:e}}function T(e){if("function"!=typeof WeakMap)return null;var t=new WeakMap,n=new WeakMap;return(T=function(e){return e?n:t})(e)}function C(e,t){if(!t&&e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var n=T(t);if(n&&n.has(e))return n.get(e);var l={},a=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var r in e)if("default"!==r&&Object.prototype.hasOwnProperty.call(e,r)){var i=a?Object.getOwnPropertyDescriptor(e,r):null;i&&(i.get||i.set)?Object.defineProperty(l,r,i):l[r]=e[r]}return l.default=e,n&&n.set(e,l),l}function O(){return(O=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var l in n)Object.prototype.hasOwnProperty.call(n,l)&&(e[l]=n[l])}return e}).apply(this,arguments)}const{SELECT:g,SWIPE:I,TAP:R,LONGPRESS:N,DRAG_AND_DROP:b,DOUBLE_TAP:A,ZOOMIN:y,SLIDE:w}=n.SCREENSHOT_INTERACTION_MODE,v=l.Button.Group,M=870,B=610,U=500,k=1e3;function D(e){let t=document.createElement("a");t.setAttribute("href","data:application/xml;charset=utf-8,"+encodeURIComponent(e)),t.setAttribute("download","source.xml"),t.style.display="none",document.body.appendChild(t),t.click(),document.body.removeChild(t)}class j extends e.Component{constructor(){super(),this.didInitialResize=!1,this.state={scaleRatio:1},this.screenAndSourceEl=null,this.lastScreenshot=null,this.screenshotEl=null,this.updateSourceTreeWidth=(0,t.debounce)(this.updateSourceTreeWidth.bind(this),50),this.updateScaleRatio=(0,t.debounce)(this.updateScaleRatio.bind(this),500),this.mjpegStreamCheckInterval=null}updateScaleRatio(){const e=this.screenshotEl.querySelector("img");this.setState({scaleRatio:this.props.windowSize.width/e.offsetWidth})}updateSourceTreeWidth(){if(!this.screenAndSourceEl)return;const e=this.screenAndSourceEl.querySelector("#screenshotContainer"),t=this.screenAndSourceEl.querySelector("#screenshotContainer img#screenshot");if(!t)return;const n=t.getBoundingClientRect(),l=e.getBoundingClientRect();if(e.style.flexBasis=`${n.width}px`,n.height<l.height){const t=l.height/n.height*n.width;e.style.maxWidth=t>U?`${U}px`:`${t}px`}else n.width<l.width&&(e.style.maxWidth=`${n.width}px`);this.updateScaleRatio()}componentDidMount(){const e=window.innerHeight,t=window.innerWidth,n=e<B||t<M;if(!this.didInitialResize&&n){const n=t<M?M:t,l=e<B?B:e;window.resizeTo(n,l)}this.didInitialResize=!0,this.props.applyClientMethod({methodName:"getPageSource",ignoreResult:!0}),this.props.getSavedActionFramework(),this.props.runKeepAliveLoop(),window.addEventListener("resize",this.updateSourceTreeWidth),this.props.setSessionTime(Date.now()),this.props.mjpegScreenshotUrl&&(this.mjpegStreamCheckInterval=setInterval(this.checkMjpegStream.bind(this),k))}async checkMjpegStream(){const{mjpegScreenshotUrl:e,isAwaitingMjpegStream:t,setAwaitingMjpegStream:n}=this.props,l=new Image;l.src=e;let a=!1;try{await l.decode(),a=!0}catch(r){}a&&t?(n(!1),this.updateSourceTreeWidth()):a||t||n(!0)}componentDidUpdate(){const{screenshot:e}=this.props;e!==this.lastScreenshot&&(this.updateSourceTreeWidth(),this.lastScreenshot=e)}componentWillUnmount(){this.mjpegStreamCheckInterval&&(clearInterval(this.mjpegStreamCheckInterval),this.mjpegStreamCheckInterval=null)}screenshotInteractionChange(e){const{selectScreenshotInteractionMode:t,clearSwipeAction:n}=this.props;n(),t(e)}render(){const{screenshot:t,screenshotError:s,selectedElement:p={},quitSession:S,showRecord:T,screenshotInteractionMode:C,visibleCommandMethod:M,selectedInteractionMode:B,selectInteractionMode:U,setVisibleCommandResult:k,showKeepAlivePrompt:D,keepSessionAlive:j,sourceXML:P,t:q,visibleCommandResult:x,mjpegScreenshotUrl:_,isAwaitingMjpegStream:L,toggleShowCentroids:W,showCentroids:F,isGestureEditorVisible:G,toggleShowAttributes:z,isSourceRefreshOn:Y}=this.props,{path:H}=p,$=t&&!s||_&&(!Y||!L);let K=e.default.createElement("div",{className:o.default["screenshot-controls"]},e.default.createElement(l.Space,{size:"middle"},e.default.createElement(l.Tooltip,{title:q(F?"Hide Element Handles":"Show Element Handles"),placement:"topRight"},e.default.createElement(l.Switch,{checkedChildren:e.default.createElement(f.CheckCircleOutlined,null),unCheckedChildren:e.default.createElement(f.CloseCircleOutlined,null),defaultChecked:!1,onChange:()=>W(),disabled:G})),e.default.createElement(v,{value:C},e.default.createElement(l.Tooltip,{title:q("Select Elements")},e.default.createElement(l.Button,{icon:e.default.createElement(f.SelectOutlined,null),onClick:()=>{this.screenshotInteractionChange(g)},type:C===g?E.BUTTON.PRIMARY:E.BUTTON.DEFAULT,disabled:G})),e.default.createElement(l.Tooltip,{title:q("Swipe By Coordinates")},e.default.createElement(l.Button,{icon:e.default.createElement(f.SwapRightOutlined,null),onClick:()=>{this.screenshotInteractionChange(I)},type:C===I?E.BUTTON.PRIMARY:E.BUTTON.DEFAULT,disabled:G})),e.default.createElement(l.Tooltip,{title:q("Tap By Coordinates")},e.default.createElement(l.Button,{icon:e.default.createElement(f.ScanOutlined,null),onClick:()=>{this.screenshotInteractionChange(R)},type:C===R?E.BUTTON.PRIMARY:E.BUTTON.DEFAULT,disabled:G})),e.default.createElement(l.Tooltip,{title:q("LongPress")},e.default.createElement(l.Button,{icon:e.default.createElement(f.InfoOutlined,null),onClick:()=>{this.screenshotInteractionChange(N)},type:C===N?E.BUTTON.PRIMARY:E.BUTTON.DEFAULT,disabled:G})),e.default.createElement(l.Tooltip,{title:q("drag_and_drop")},e.default.createElement(l.Button,{icon:e.default.createElement(f.DragOutlined,null),onClick:()=>{this.screenshotInteractionChange(b)},type:C===b?E.BUTTON.PRIMARY:E.BUTTON.DEFAULT,disabled:G})),e.default.createElement(l.Tooltip,{title:q("Double Tap")},e.default.createElement(l.Button,{icon:e.default.createElement(f.UpCircleOutlined,null),onClick:()=>{this.screenshotInteractionChange(A)},type:C===A?E.BUTTON.PRIMARY:E.BUTTON.DEFAULT})),e.default.createElement(l.Tooltip,{title:q("Zoom In and Zoom Out")},e.default.createElement(l.Button,{icon:e.default.createElement(f.ShrinkOutlined,null),onClick:()=>{this.screenshotInteractionChange(y)},type:C===y?E.BUTTON.PRIMARY:E.BUTTON.DEFAULT,disabled:G})),e.default.createElement(l.Tooltip,{title:q("Slider")},e.default.createElement(l.Button,{icon:e.default.createElement(f.SlidersOutlined,null),onClick:()=>{this.screenshotInteractionChange(w)},type:C===w?E.BUTTON.PRIMARY:E.BUTTON.DEFAULT,disabled:G}))))),Z=e.default.createElement("div",{className:o.default["inspector-main"],ref:e=>{this.screenAndSourceEl=e}},e.default.createElement("div",{id:"screenshotContainer",className:o.default["screenshot-container"],ref:e=>{this.screenshotEl=e}},K,$&&e.default.createElement(a.default,O({},this.props,{scaleRatio:this.state.scaleRatio})),s&&q("couldNotObtainScreenshot",{screenshotError:s}),!$&&e.default.createElement(l.Spin,{size:"large",spinning:!0},e.default.createElement("div",{className:o.default.screenshotBox}))),e.default.createElement("div",{id:"sourceTreeContainer",className:o.default["interaction-tab-container"]},T&&e.default.createElement(c.default,this.props),e.default.createElement(l.Tabs,{activeKey:B,size:"small",onChange:e=>U(e),items:[{label:q("Source"),key:n.INTERACTION_MODE.SOURCE,children:e.default.createElement("div",{className:"action-row"},e.default.createElement("div",{id:"selectedElementContainer",className:`${o.default["interaction-tab-container"]} ${o.default["element-detail-container"]} action-col`},e.default.createElement(l.Card,{title:e.default.createElement("span",null,e.default.createElement(f.TagOutlined,null)," ",q("selectedElement")),className:o.default["selected-element-card"]},H&&e.default.createElement(i.default,this.props),!H&&e.default.createElement("i",null,q("selectElementInSource")))))},{label:q("Commands"),key:n.INTERACTION_MODE.COMMANDS,children:e.default.createElement(l.Card,{title:e.default.createElement("span",null,e.default.createElement(f.ThunderboltOutlined,null)," ",q("Execute Commands")),className:o.default["interaction-tab-card"]},e.default.createElement(d.default,this.props))},{label:q("Gestures"),key:n.INTERACTION_MODE.GESTURES,children:G?e.default.createElement(l.Card,{title:e.default.createElement("span",null,e.default.createElement(f.HighlightOutlined,null)," ",q("Gesture Builder")),className:o.default["interaction-tab-card"]},e.default.createElement(h.default,this.props)):e.default.createElement(l.Card,{title:e.default.createElement("span",null,e.default.createElement(f.HighlightOutlined,null)," ",q("Saved Gestures")),className:o.default["interaction-tab-card"]},e.default.createElement(u.default,this.props))},{label:q("Session Information"),key:n.INTERACTION_MODE.SESSION_INFO,children:e.default.createElement(l.Card,{title:e.default.createElement("span",null,e.default.createElement(f.InfoCircleOutlined,null)," ",q("Session Information")),className:o.default["interaction-tab-card"]},e.default.createElement(m.default,this.props))}]})));return e.default.createElement("div",{className:o.default["inspector-container"]},e.default.createElement(r.default,this.props),Z,e.default.createElement(l.Modal,{title:q("Session Inactive"),open:D,onOk:()=>j(),onCancel:()=>S(),okText:q("Keep Session Running"),cancelText:q("Quit Session")},e.default.createElement("p",null,q("Your session is about to expire"))),e.default.createElement(l.Modal,{title:q("methodCallResult",{methodName:M}),open:!!x,onOk:()=>k(null),onCancel:()=>k(null)},e.default.createElement("pre",null,e.default.createElement("code",null,x))))}}exports.default=j;
},{"./shared":"n676","./Screenshot":"mtSW","./HeaderButtons":"d9PD","./SelectedElement":"lQeY","./Source":"RqXv","./Inspector.css":"rCqx","./RecordedActions":"n1jh","./Commands":"MPWP","./SavedGestures":"JE4e","./GestureEditor":"qT8s","./SessionInfo":"fLJm","../../polyfills":"yhbL","../AntdTypes":"uK2B"}],"JL1u":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=require("react-redux"),t=require("../util"),r=i(require("../actions/Inspector")),n=o(require("../components/Inspector/Inspector"));function o(e){return e&&e.__esModule?e:{default:e}}function u(e){if("function"!=typeof WeakMap)return null;var t=new WeakMap,r=new WeakMap;return(u=function(e){return e?r:t})(e)}function i(e,t){if(!t&&e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var r=u(t);if(r&&r.has(e))return r.get(e);var n={},o=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var i in e)if("default"!==i&&Object.prototype.hasOwnProperty.call(e,i)){var a=o?Object.getOwnPropertyDescriptor(e,i):null;a&&(a.get||a.set)?Object.defineProperty(n,i,a):n[i]=e[i]}return n.default=e,r&&r.set(e,n),n}function a(e){return e.inspector}var c=(0,t.withTranslation)(n.default,(0,e.connect)(a,r));exports.default=c;
},{"../util":"YOqM","../actions/Inspector":"hyV8","../components/Inspector/Inspector":"wU5m"}],"cVur":[function(require,module,exports) {
module.exports={container:"_container_9b1d1",loader:"_loader_9b1d1",load1:"_load1_9b1d1"};
},{}],"XVdh":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=r(require("react")),t=r(require("./Spinner.css"));function r(e){return e&&e.__esModule?e:{default:e}}const a=()=>e.default.createElement("div",{className:t.default.container},e.default.createElement("div",{className:t.default.loader}));var l=a;exports.default=l;
},{"./Spinner.css":"cVur"}],"kDlg":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=i(require("react")),t=require("react-router-dom"),r=f(require("./containers/App")),n=f(require("./containers/SessionPage")),a=f(require("./containers/InspectorPage")),u=f(require("./components/Spinner/Spinner")),l=require("./polyfills"),o=f(require("../configs/i18next.config.renderer"));function f(e){return e&&e.__esModule?e:{default:e}}function c(e){if("function"!=typeof WeakMap)return null;var t=new WeakMap,r=new WeakMap;return(c=function(e){return e?r:t})(e)}function i(e,t){if(!t&&e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var r=c(t);if(r&&r.has(e))return r.get(e);var n={},a=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var u in e)if("default"!==u&&Object.prototype.hasOwnProperty.call(e,u)){var l=a?Object.getOwnPropertyDescriptor(e,u):null;l&&(l.get||l.set)?Object.defineProperty(n,u,l):n[u]=e[u]}return n.default=e,r&&r.set(e,n),n}l.ipcRenderer.on("appium-language-changed",(e,t)=>{o.default.language!==t.language&&o.default.changeLanguage(t.language)});var d=()=>e.default.createElement(e.Suspense,{fallback:e.default.createElement(u.default,null)},e.default.createElement(r.default,null,e.default.createElement(t.Switch,null,e.default.createElement(t.Route,{exact:!0,path:"/"},e.default.createElement(n.default,null)),e.default.createElement(t.Route,{path:"/session"},e.default.createElement(n.default,null)),e.default.createElement(t.Route,{path:"/inspector"},e.default.createElement(a.default,null)))));exports.default=d;
},{"./containers/App":"UYUd","./containers/SessionPage":"w595","./containers/InspectorPage":"JL1u","./components/Spinner/Spinner":"XVdh","./polyfills":"yhbL","../configs/i18next.config.renderer":"Lc28"}],"j8ta":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=a(require("react")),t=require("react-redux"),r=require("react-router-dom"),n=u(require("../routes"));function u(e){return e&&e.__esModule?e:{default:e}}function o(e){if("function"!=typeof WeakMap)return null;var t=new WeakMap,r=new WeakMap;return(o=function(e){return e?r:t})(e)}function a(e,t){if(!t&&e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var r=o(t);if(r&&r.has(e))return r.get(e);var n={},u=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var a in e)if("default"!==a&&Object.prototype.hasOwnProperty.call(e,a)){var f=u?Object.getOwnPropertyDescriptor(e,a):null;f&&(f.get||f.set)?Object.defineProperty(n,a,f):n[a]=e[a]}return n.default=e,r&&r.set(e,n),n}class f extends e.Component{render(){const{store:u,history:o}=this.props;return e.default.createElement(t.Provider,{store:u},e.default.createElement(r.Router,{history:o},e.default.createElement(n.default,null)))}}exports.default=f;
},{"../routes":"kDlg"}],"Ryuc":[function(require,module,exports) {
module.exports={errorMessage:"_errorMessage_cd7c8",copyTraceBtn:"_copyTraceBtn_cd7c8"};
},{}],"EuBb":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=s(require("react")),t=require("antd"),r=require("@ant-design/icons"),l=s(require("./ErrorMessage.css")),a=require("../AntdTypes"),n=require("../../util"),u=require("../../polyfills");function s(e){return e&&e.__esModule?e:{default:e}}const c="https://github.com/appium/appium-inspector/issues/new/choose",o=({error:n,copyTrace:s,t:o})=>e.default.createElement("div",{className:l.default.errorMessage},e.default.createElement(t.Alert,{message:e.default.createElement(e.default.Fragment,null,o("Unexpected Error:")," ",e.default.createElement("code",{children:n.message})),type:a.ALERT.ERROR,showIcon:!0,description:e.default.createElement(e.default.Fragment,null,o("Please report this issue at:")," ",e.default.createElement("a",{onClick:e=>e.preventDefault()||u.shell.openExternal(c),children:c}),e.default.createElement("br",null),o("Full error trace:"),e.default.createElement(t.Tooltip,{title:o("Copy Error Trace")},e.default.createElement(t.Button,{size:"small",className:l.default.copyTraceBtn,onClick:s(n.stack),icon:e.default.createElement(r.CopyOutlined,null)})),e.default.createElement("pre",{children:n.stack}))}));var i=(0,n.withTranslation)(o);exports.default=i;
},{"./ErrorMessage.css":"Ryuc","../AntdTypes":"uK2B","../../util":"YOqM","../../polyfills":"yhbL"}],"SZdX":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=o(require("react")),r=o(require("./ErrorMessage")),t=require("../../polyfills");function o(e){return e&&e.__esModule?e:{default:e}}const s=e=>{t.clipboard.writeText(e)};class u extends e.default.Component{constructor(e){super(e),this.state={error:null}}static getDerivedStateFromError(e){return{error:e}}render(){const{error:t}=this.state;return t?e.default.createElement(r.default,{error:t,copyTrace:s}):this.props.children}}exports.default=u;
},{"./ErrorMessage":"EuBb","../../polyfills":"yhbL"}],"AcdF":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.SET_UPDATE_STATE=void 0,exports.setUpdateState=t;const e="SET_UPDATE_STATE";function t(t){return T=>{T({type:e,updateState:t})}}exports.SET_UPDATE_STATE=e;
},{}],"aiXV":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=o(require("./Inspector")),r=o(require("./Session")),t=o(require("./Updater"));function n(e){if("function"!=typeof WeakMap)return null;var r=new WeakMap,t=new WeakMap;return(n=function(e){return e?t:r})(e)}function o(e,r){if(!r&&e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var t=n(r);if(t&&t.has(e))return t.get(e);var o={},u=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var a in e)if("default"!==a&&Object.prototype.hasOwnProperty.call(e,a)){var f=u?Object.getOwnPropertyDescriptor(e,a):null;f&&(f.get||f.set)?Object.defineProperty(o,a,f):o[a]=e[a]}return o.default=e,t&&t.set(e,o),o}var u={...e,...r,...t};exports.default=u;
},{"./Inspector":"hyV8","./Session":"VMiD","./Updater":"AcdF"}],"jWzB":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=c;var e=n(require("lodash")),s=t(require("format-json")),r=require("../actions/Session"),a=require("antd");function t(e){return e&&e.__esModule?e:{default:e}}function i(e){if("function"!=typeof WeakMap)return null;var s=new WeakMap,r=new WeakMap;return(i=function(e){return e?r:s})(e)}function n(e,s){if(!s&&e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var r=i(s);if(r&&r.has(e))return r.get(e);var a={},t=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var n in e)if("default"!==n&&Object.prototype.hasOwnProperty.call(e,n)){var S=t?Object.getOwnPropertyDescriptor(e,n):null;S&&(S.get||S.set)?Object.defineProperty(a,n,S):a[n]=e[n]}return a.default=e,r&&r.set(e,a),a}const S=[],o={local:{},remote:{},advanced:{}};for(const p of e.default.keys(r.ServerTypes))o[p]={};const E={savedSessions:[],tabKey:"new",serverType:r.ServerTypes.remote,visibleProviders:S,server:{local:{},remote:{},sauce:{dataCenter:"us-west-1"},headspin:{},browserstack:{},lambdatest:{},advanced:{},bitbar:{},kobiton:{},perfecto:{},pcloudy:{},testingbot:{},experitest:{},roboticmobi:{},remotetestkit:{}},attachSessId:null,caps:[{type:"text"}],isCapsDirty:!0,gettingSessions:!1,runningAppiumSessions:[],isEditingDesiredCapsName:!1,isEditingDesiredCaps:!1,isValidCapsJson:!0,isValidatingCapsJson:!1,isAddingCloudProvider:!1,addVendorPrefixes:!0};let d;const u=(e,s)=>{if(!s||!e)return!1;for(const r of e)if(r.id===s)return!0;return!1};function c(t=E,i){switch(i.type){case r.NEW_SESSION_REQUESTED:return{...t,newSessionRequested:!0};case r.NEW_SESSION_LOADING:return d={...t,newSessionLoading:!0},(0,e.omit)(d,"newSessionRequested");case r.NEW_SESSION_DONE:return(0,e.omit)(t,"newSessionLoading");case r.ADD_CAPABILITY:return{...t,caps:[...t.caps,{type:"text"}]};case r.REMOVE_CAPABILITY:return{...t,caps:t.caps.filter((e,s)=>s!==i.index),isCapsDirty:!0};case r.SET_CAPABILITY_PARAM:return{...t,isCapsDirty:!0,caps:t.caps.map((e,s)=>s!==i.index?e:{...e,[i.name]:i.value})};case r.SET_CAPS_AND_SERVER:return d={...t,server:i.server,serverType:i.serverType,caps:i.caps,capsUUID:i.uuid,capsName:i.name},(0,e.omit)(d,"isCapsDirty");case r.SAVE_SESSION_REQUESTED:return d={...t,saveSessionRequested:!0},(0,e.omit)(d,"showSaveAsModal");case r.SAVE_SESSION_DONE:return(0,e.omit)(t,["saveSessionRequested","saveAsText"]);case r.GET_SAVED_SESSIONS_REQUESTED:return{...t,getSavedSessionsRequested:!0};case r.GET_SAVED_SESSIONS_DONE:return d={...t,savedSessions:i.savedSessions||[]},(0,e.omit)(d,"getSavedSessionsRequested");case r.DELETE_SAVED_SESSION_REQUESTED:return{...t,deletingSession:!0};case r.DELETE_SAVED_SESSION_DONE:return{...t,deletingSession:!1,capsUUID:null,capsName:null};case r.SWITCHED_TABS:return{...t,tabKey:i.key};case r.SAVE_AS_MODAL_REQUESTED:return{...t,showSaveAsModal:!0};case r.HIDE_SAVE_AS_MODAL_REQUESTED:return(0,e.omit)(t,["saveAsText","showSaveAsModal"]);case r.SET_SAVE_AS_TEXT:return{...t,saveAsText:i.saveAsText};case r.CHANGE_SERVER_TYPE:return{...t,serverType:i.serverType};case r.SET_SERVER_PARAM:return{...t,server:{...t.server,[i.serverType]:{...t.server[i.serverType],[i.name]:i.value}}};case r.SET_SERVER:return{...t,server:{...function(s,r){const a=e.default.cloneDeep(s||{});for(let t of e.default.keys(a))a[t]={...a[t]||{},...r[t]||{}};return a}(t.server,i.server)},serverType:i.serverType||r.ServerTypes.local};case r.SET_ATTACH_SESS_ID:return{...t,attachSessId:i.attachSessId};case r.GET_SESSIONS_REQUESTED:return{...t,gettingSessions:!0};case r.GET_SESSIONS_DONE:{const e=u(i.sessions,t.attachSessId)?t.attachSessId:null;return{...t,gettingSessions:!1,attachSessId:i.sessions&&i.sessions.length>0&&!e?i.sessions[0].id:e,runningAppiumSessions:i.sessions||[]}}case r.ENABLE_DESIRED_CAPS_NAME_EDITOR:return{...t,isEditingDesiredCapsName:!0,desiredCapsName:t.capsName};case r.ABORT_DESIRED_CAPS_NAME_EDITOR:return{...t,isEditingDesiredCapsName:!1,desiredCapsName:null};case r.SAVE_DESIRED_CAPS_NAME:return{...t,isEditingDesiredCapsName:!1,capsName:i.name};case r.SET_DESIRED_CAPS_NAME:return{...t,desiredCapsName:i.desiredCapsName};case r.ENABLE_DESIRED_CAPS_EDITOR:return{...t,isEditingDesiredCaps:!0,rawDesiredCaps:s.default.plain(e.default.reduce(t.caps,(e,s)=>({...e,[s.name]:s.value}),{})),isValidCapsJson:!0,isValidatingCapsJson:!1};case r.ABORT_DESIRED_CAPS_EDITOR:return{...t,isEditingDesiredCaps:!1,rawDesiredCaps:null};case r.SAVE_RAW_DESIRED_CAPS:return{...t,isEditingDesiredCaps:!1,caps:i.caps,isCapsDirty:!0};case r.SHOW_DESIRED_CAPS_JSON_ERROR:return{...t,invalidCapsJsonReason:i.message,isValidCapsJson:!1,isValidatingCapsJson:!0};case r.SET_RAW_DESIRED_CAPS:return{...t,rawDesiredCaps:i.rawDesiredCaps,isValidCapsJson:i.isValidCapsJson,invalidCapsJsonReason:i.invalidCapsJsonReason};case r.IS_ADDING_CLOUD_PROVIDER:return{...t,isAddingCloudProvider:i.isAddingProvider};case r.SET_PROVIDERS:return{...t,visibleProviders:i.providers||[]};case r.SET_ADD_VENDOR_PREFIXES:return{...t,addVendorPrefixes:i.addVendorPrefixes};case r.SET_STATE_FROM_URL:return{...t,server:{...t.server,...i.state.server||{}},...(0,e.omit)(i.state,["server"])};case r.SET_STATE_FROM_SAVED:return Object.keys(r.ServerTypes).includes(i.state.serverType)?([...t.visibleProviders,r.ServerTypes.local,r.ServerTypes.remote].includes(i.state.serverType)||t.visibleProviders.push(i.state.serverType),{...t,...i.state,filePath:i.filePath}):(a.notification.error({message:`Failed to load session: ${i.state.serverType} is not a valid server type`}),t);default:return{...t}}}
},{"../actions/Session":"VMiD"}],"I5zN":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=i;var e=require("lodash"),r=require("../actions/Inspector"),t=require("../components/Inspector/shared");const s="java",E="NATIVE_APP",n={savedGestures:[],driver:null,keepAliveInterval:null,showKeepAlivePrompt:!1,userWaitTimeout:null,lastActiveMoment:null,expandedPaths:["0"],isRecording:!1,isSourceRefreshOn:!0,showRecord:!1,showBoilerplate:!1,recordedActions:[],actionFramework:s,sessionDetails:{},isGestureEditorVisible:!1,isLocatorTestModalVisible:!1,isSiriCommandModalVisible:!1,siriCommandValue:"",showCentroids:!1,locatorTestStrategy:"id",locatorTestValue:"",isSearchingForElements:!1,assignedVarCache:{},screenshotInteractionMode:t.SCREENSHOT_INTERACTION_MODE.SELECT,searchedForElementBounds:null,selectedCommandGroup:null,selectedCommandSubGroup:null,selectedInteractionMode:t.INTERACTION_MODE.SOURCE,appMode:t.APP_MODE.NATIVE,mjpegScreenshotUrl:null,pendingCommand:null,findElementsExecutionTimes:[],isFindingElementsTimes:!1,isFindingLocatedElementInSource:!1,visibleCommandResult:null,visibleCommandMethod:null,isAwaitingMjpegStream:!0,showSourceAttrs:!1};let a;function o(e,r){let t=r;for(let s of e.split("."))t=t.children[s];return{...t}}function i(t=n,i){switch(i.type){case r.SET_SOURCE_AND_SCREENSHOT:return{...t,contexts:i.contexts,contextsError:i.contextsError,currentContext:i.currentContext||E,currentContextError:i.currentContextError,source:i.source,sourceXML:i.sourceXML,sourceError:i.sourceError,screenshot:i.screenshot,screenshotError:i.screenshotError,windowSize:i.windowSize,windowSizeError:i.windowSizeError,findElementsExecutionTimes:[]};case r.QUIT_SESSION_REQUESTED:return{...t,methodCallInProgress:!0,isQuittingSession:!0};case r.QUIT_SESSION_DONE:return{...n};case r.SESSION_DONE:return{...t,isSessionDone:!0,methodCallInProgress:!1};case r.SELECT_ELEMENT:return{...t,selectedElement:o(i.path,t.source),selectedElementPath:i.path,selectedElementSearchInProgress:!0,elementInteractionsNotAvailable:!1,findElementsExecutionTimes:[]};case r.UNSELECT_ELEMENT:return{...t,selectedElement:void 0,selectedElementPath:null,selectedElementId:null,selectedElementVariableName:null,selectedElementVariableType:null,selectedElementSearchInProgress:!1};case r.SELECT_CENTROID:return{...t,selectedCentroid:i.path};case r.UNSELECT_CENTROID:return(0,e.omit)(t,"selectedCentroid");case r.SET_SELECTED_ELEMENT_ID:return{...t,selectedElementId:i.elementId,selectedElementVariableName:i.variableName,selectedElementVariableType:i.variableType,selectedElementSearchInProgress:!1,findElementsExecutionTimes:[]};case r.SET_INTERACTIONS_NOT_AVAILABLE:return{...t,elementInteractionsNotAvailable:!0,selectedElementSearchInProgress:!1};case r.SELECT_HOVERED_ELEMENT:return{...t,hoveredElement:o(i.path,t.source)};case r.UNSELECT_HOVERED_ELEMENT:return(0,e.omit)(t,"hoveredElement");case r.SELECT_HOVERED_CENTROID:return{...t,hoveredCentroid:i.path};case r.UNSELECT_HOVERED_CENTROID:return(0,e.omit)(t,"hoveredCentroid");case r.METHOD_CALL_REQUESTED:return{...t,methodCallInProgress:!0};case r.METHOD_CALL_DONE:return{...t,methodCallInProgress:!1};case r.SET_EXPANDED_PATHS:return{...t,expandedPaths:i.paths,findElementsExecutionTimes:[]};case r.START_RECORDING:return{...t,isRecording:!0,showRecord:!0};case r.PAUSE_RECORDING:return{...t,isRecording:!1,showRecord:t.recordedActions.length>0};case r.CLEAR_RECORDING:return{...t,recordedActions:[]};case r.SET_ACTION_FRAMEWORK:return{...t,actionFramework:i.framework||s};case r.RECORD_ACTION:return{...t,recordedActions:[...t.recordedActions,{action:i.action,params:i.params}]};case r.ADD_ASSIGNED_VAR_CACHE:return{...t,assignedVarCache:{...t.assignedVarCache,[i.varName]:!0}};case r.CLEAR_ASSIGNED_VAR_CACHE:return{...t,assignedVarCache:[]};case r.CLOSE_RECORDER:return{...t,showRecord:!1};case r.SET_SHOW_BOILERPLATE:return{...t,showBoilerplate:i.show};case r.SET_SESSION_DETAILS:return{...t,sessionDetails:i.sessionDetails,driver:i.driver,appMode:i.mode,mjpegScreenshotUrl:i.mjpegScreenshotUrl};case r.SHOW_LOCATOR_TEST_MODAL:return{...t,isLocatorTestModalVisible:!0};case r.HIDE_LOCATOR_TEST_MODAL:return{...t,isLocatorTestModalVisible:!1};case r.SHOW_SIRI_COMMAND_MODAL:return{...t,isSiriCommandModalVisible:!0};case r.HIDE_SIRI_COMMAND_MODAL:return{...t,isSiriCommandModalVisible:!1};case r.SET_SIRI_COMMAND_VALUE:return{...t,siriCommandValue:i.siriCommandValue};case r.SET_LOCATOR_TEST_STRATEGY:return{...t,locatorTestStrategy:i.locatorTestStrategy};case r.SET_LOCATOR_TEST_VALUE:return{...t,locatorTestValue:i.locatorTestValue};case r.SEARCHING_FOR_ELEMENTS:return{...t,locatedElements:null,locatedElementsExecutionTime:null,locatorTestElement:null,isSearchingForElements:!0};case r.SEARCHING_FOR_ELEMENTS_COMPLETED:return{...t,locatedElements:i.elements,locatedElementsExecutionTime:i.executionTime,isSearchingForElements:!1};case r.GET_FIND_ELEMENTS_TIMES:return{...t,isFindingElementsTimes:!0};case r.GET_FIND_ELEMENTS_TIMES_COMPLETED:return{...t,findElementsExecutionTimes:i.findElementsExecutionTimes,isFindingElementsTimes:!1};case r.SET_LOCATOR_TEST_ELEMENT:return{...t,locatorTestElement:i.elementId};case r.FINDING_ELEMENT_IN_SOURCE:return{...t,isFindingLocatedElementInSource:!0};case r.FINDING_ELEMENT_IN_SOURCE_COMPLETED:return{...t,isFindingLocatedElementInSource:!1};case r.CLEAR_SEARCH_RESULTS:return{...t,locatedElements:null,isFindingLocatedElementInSource:!1};case r.SET_SCREENSHOT_INTERACTION_MODE:return{...t,screenshotInteractionMode:i.screenshotInteractionMode};case r.SET_SWIPE_START:return{...t,swipeStart:{x:i.swipeStartX,y:i.swipeStartY}};case r.SET_SWIPE_END:return{...t,swipeEnd:{x:i.swipeEndX,y:i.swipeEndY}};case r.SET_SWIPE_START1:return{...t,swipeStart1:{x:i.swipeStartX,y:i.swipeStartY}};case r.SET_SWIPE_END1:return{...t,swipeEnd1:{x:i.swipeEndX,y:i.swipeEndY}};case r.CLEAR_SWIPE_ACTION:return{...t,swipeStart:null,swipeEnd:null,swipeStart1:null,swipeEnd1:null};case r.SET_SEARCHED_FOR_ELEMENT_BOUNDS:return{...t,searchedForElementBounds:{location:i.location,size:i.size}};case r.CLEAR_SEARCHED_FOR_ELEMENT_BOUNDS:return{...t,searchedForElementBounds:null};case r.PROMPT_KEEP_ALIVE:return{...t,showKeepAlivePrompt:!0};case r.HIDE_PROMPT_KEEP_ALIVE:return{...t,showKeepAlivePrompt:!1};case r.SELECT_COMMAND_GROUP:return{...t,selectedCommandGroup:i.group};case r.SELECT_COMMAND_SUB_GROUP:return{...t,selectedCommandSubGroup:i.group};case r.SELECT_INTERACTION_MODE:return{...t,selectedInteractionMode:i.interaction};case r.SET_APP_MODE:return{...t,appMode:i.mode};case r.SET_SHOW_CENTROIDS:return{...t,showCentroids:i.show};case r.ENTERING_COMMAND_ARGS:return{...t,pendingCommand:{commandName:i.commandName,command:i.command,args:[]}};case r.SET_COMMAND_ARG:return{...t,pendingCommand:{...t.pendingCommand,args:Object.assign([],t.pendingCommand.args,{[i.index]:i.value})}};case r.CANCEL_PENDING_COMMAND:return{...t,pendingCommand:null};case r.SET_CONTEXT:return{...t,currentContext:i.context};case r.SET_KEEP_ALIVE_INTERVAL:return{...t,keepAliveInterval:i.keepAliveInterval};case r.SET_USER_WAIT_TIMEOUT:return{...t,userWaitTimeout:null};case r.SET_LAST_ACTIVE_MOMENT:return{...t,lastActiveMoment:i.lastActiveMoment};case r.SET_VISIBLE_COMMAND_RESULT:return{...t,visibleCommandResult:i.result,visibleCommandMethod:i.methodName};case r.SET_SESSION_TIME:return{...t,sessionStartTime:i.sessionStartTime};case r.SET_APP_ID:return{...t,appId:i.appId};case r.SET_SERVER_STATUS:return{...t,status:i.status};case r.SET_AWAITING_MJPEG_STREAM:return{...t,isAwaitingMjpegStream:i.isAwaiting};case r.SHOW_GESTURE_EDITOR:return{...t,isGestureEditorVisible:!0};case r.HIDE_GESTURE_EDITOR:return{...t,isGestureEditorVisible:!1};case r.GET_SAVED_GESTURES_REQUESTED:return{...t,getSavedGesturesRequested:!0};case r.GET_SAVED_GESTURES_DONE:return a={...t,savedGestures:i.savedGestures||[]},(0,e.omit)(a,"getSavedGesturesRequested");case r.DELETE_SAVED_GESTURES_REQUESTED:return{...t,deleteGesture:i.deleteGesture};case r.DELETE_SAVED_GESTURES_DONE:return(0,e.omit)(t,"deleteGesture");case r.SET_LOADED_GESTURE:return{...t,loadedGesture:i.loadedGesture};case r.REMOVE_LOADED_GESTURE:return(0,e.omit)(t,"loadedGesture");case r.SHOW_GESTURE_ACTION:return{...t,showGesture:i.showGesture};case r.HIDE_GESTURE_ACTION:return(0,e.omit)(t,"showGesture");case r.SELECT_TICK_ELEMENT:return{...t,selectedTick:i.selectedTick};case r.UNSELECT_TICK_ELEMENT:return(0,e.omit)(t,"selectedTick");case r.SET_GESTURE_TAP_COORDS_MODE:return{...t,tickCoordinates:{x:i.x,y:i.y}};case r.CLEAR_TAP_COORDINATES:return(0,e.omit)(t,"tickCoordinates");case r.TOGGLE_SHOW_ATTRIBUTES:return{...t,showSourceAttrs:!t.showSourceAttrs};case r.TOGGLE_REFRESHING_STATE:return{...t,isSourceRefreshOn:!t.isSourceRefreshOn};default:return{...t}}}
},{"../actions/Inspector":"hyV8","../components/Inspector/shared":"n676"}],"AqHS":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=r;var e=require("../actions/Updater");const t={};function r(r=t,u){switch(u.type){case e.SET_UPDATE_STATE:return{...u.updateState};default:return{...r}}}
},{"../actions/Updater":"AcdF"}],"YCYF":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=s;var e=require("@reduxjs/toolkit"),r=o(require("./Session")),t=o(require("./Inspector")),u=o(require("./Updater"));function o(e){return e&&e.__esModule?e:{default:e}}function s(o){return(0,e.combineReducers)({router:o,session:r.default,inspector:t.default,updater:u.default})}
},{"./Session":"jWzB","./Inspector":"I5zN","./Updater":"AqHS"}],"iz0v":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.store=exports.history=void 0;var e=require("@reduxjs/toolkit"),r=require("history"),t=require("redux-first-history"),o=u(require("./actions")),s=u(require("./reducers"));function u(e){return e&&e.__esModule?e:{default:e}}const{createReduxHistory:i,routerMiddleware:d,routerReducer:c}=(0,t.createReduxHistoryContext)({history:(0,r.createHashHistory)()}),l=(0,s.default)(c),a=(0,e.configureStore)({reducer:l,middleware:e=>{const r=e({serializableCheck:!1});if("development"===process.env.NODE_ENV){const{createLogger:e}=require("redux-logger"),t=e({level:"info",collapsed:!0});r.push(t)}return r.push(d),r},devTools:"development"===process.env.NODE_ENV&&{actionCreators:{...o.default,push:t.push}}});exports.store=a;const n=i(a);exports.history=n;
},{"./actions":"aiXV","./reducers":"YCYF"}],"Focm":[function(require,module,exports) {
"use strict";var e=u(require("react")),t=require("react-dom/client"),r=u(require("./containers/Root")),o=u(require("./components/ErrorBoundary/ErrorBoundary")),n=require("./store");function u(e){return e&&e.__esModule?e:{default:e}}const a=document.getElementById("root"),l=(0,t.createRoot)(a);l.render(e.default.createElement(o.default,null,e.default.createElement(r.default,{store:n.store,history:n.history}))),module.hot&&module.hot.accept("./containers/Root",()=>{const t=require("./containers/Root").default;l.render(e.default.createElement(AppContainer,null,e.default.createElement(t,{store:n.store,history:n.history})))});
},{"./containers/Root":"j8ta","./components/ErrorBoundary/ErrorBoundary":"SZdX","./store":"iz0v"}]},{},["Focm"], null)
>>>>>>> 60da075 (added dist folder)
//# sourceMappingURL=renderer.e31bb0bc.js.map