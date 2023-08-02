process.env.HMR_PORT=39669;process.env.HMR_HOSTNAME="localhost";// modules are defined as an array
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
  SLIDE: 'slide',
  SLIDE_SWIPE: 'slide_swipe',
  SELECT_LONG: 'select_long',
  SELECT_DOUBLE: 'select_double',
  FILE_UPLOAD: 'file_upload',
  SELECT_FILE: 'select_file',
  EXPECTED_VALUE: 'expected_value',
  TAKE_SCREENSHOT: 'take_screenshot',
  SCRATCH: 'scratch'
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
    let {
      commandRes
    } = res;
    let postdata = {
      "session_id": driver.sessionId,
      params,
      selectedElement,
      'step-name': screenshotInteractionMode
    };
    console.log("🚀 ~ file: Inspector.js:825 ~ return ~ postdata:", postdata);
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
    } else if (postdata['step-name'] === 'expected_value') {
      postdata.params.xpath = postdata.selectedElement.xpath;
      postdata.params.expected_value = postdata.selectedElement.attributes.text;
      console.log("🚀 ~ file: Inspector.js:916 ~ return ~ postdata:", postdata);
      await fetch("https://apprecord.testing24x7.ai/appAction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(postdata)
      }).then(response => {
        console.log("API response for expected_value:", response);
      }).catch(error => {
        console.error("API error:", error);
      });
    } else if (params.methodName === "quit") {
      console.log("🚀 inside the quit function!!");
      let sendData = {
        "session_id": driver.sessionId,
        "step-name": "quit"
      };
      await fetch("https://apprecord.testing24x7.ai/appAction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(sendData)
      }).then(response => {
        console.log("API response:", response);
        // window.close();
      }).catch(error => {
        console.error("API error:", error);
      });
    } else {
      console.log("no api will call becopuse of the no action happend@@@@@@@@@@@");
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
  "active-session": "_active-session_5ede3",
  "sessionContainer": "_sessionContainer_5ede3",
  "cloudProviderModal": "_cloudProviderModal_5ede3",
  "sessionFooter": "_sessionFooter_5ede3",
  "desiredCapsLink": "_desiredCapsLink_5ede3",
  "tabText": "_tabText_5ede3",
  "serverTabs": "_serverTabs_5ede3",
  "scrollingTabCont": "_scrollingTabCont_5ede3",
  "scrollingTab": "_scrollingTab_5ede3",
  "savedSessions": "_savedSessions_5ede3",
  "newSessionForm": "_newSessionForm_5ede3",
  "capsFormattedCol": "_capsFormattedCol_5ede3",
  "formattedCaps": "_formattedCaps_5ede3",
  "formattedCapsBody": "_formattedCapsBody_5ede3",
  "start-session-button": "_start-session-button_5ede3",
  "filepath-button": "_filepath-button_5ede3",
  "capsFormCol": "_capsFormCol_5ede3",
  "capsFormRow": "_capsFormRow_5ede3",
  "capsBoxFont": "_capsBoxFont_5ede3",
  "capsValueControl": "_capsValueControl_5ede3",
  "fileControlWrapper": "_fileControlWrapper_5ede3",
  "localDesc": "_localDesc_5ede3",
  "selected": "_selected_5ede3",
  "capsNameEditorButton": "_capsNameEditorButton_5ede3",
  "capsEditorControls": "_capsEditorControls_5ede3",
  "capsEditorButton": "_capsEditorButton_5ede3",
  "capsEditor": "_capsEditor_5ede3",
  "capsEditorTitle": "_capsEditorTitle_5ede3",
  "capsEditorBody": "_capsEditorBody_5ede3",
  "capsEditorBodyFull": "_capsEditorBodyFull_5ede3",
  "capsEditorBodyResized": "_capsEditorBodyResized_5ede3",
  "advancedSettingsContainerCol": "_advancedSettingsContainerCol_5ede3",
  "advancedSettingsContainer": "_advancedSettingsContainer_5ede3",
  "add-desired-capability-button": "_add-desired-capability-button_5ede3",
  "editSession": "_editSession_5ede3",
  "btnReload": "_btnReload_5ede3",
  "btnDeleteCap": "_btnDeleteCap_5ede3",
  "inputDataCenter": "_inputDataCenter_5ede3",
  "addonDataCenter": "_addonDataCenter_5ede3",
  "addonDataCenterRadioContainer": "_addonDataCenterRadioContainer_5ede3"
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
  "inspector-container": "_inspector-container_3421c",
  "inspector-toolbar": "_inspector-toolbar_3421c",
  "button_wrapper": "_button_wrapper_3421c",
  "ant-btn": "_ant-btn_3421c",
  "user_actions": "_user_actions_3421c",
  "actionButton": "_actionButton_3421c",
  "inspector-main": "_inspector-main_3421c",
  "whole-btn": "_whole-btn_3421c",
  "screenshot-container": "_screenshot-container_3421c",
  "screenshot": "_screenshot_3421c",
  "screenshot-controls": "_screenshot-controls_3421c",
  "logoContainer": "_logoContainer_3421c",
  "screenshotBox": "_screenshotBox_3421c",
  "interaction-tab-container": "_interaction-tab-container_3421c",
  "tree-container": "_tree-container_3421c",
  "session-info-table": "_session-info-table_3421c",
  "session-code-box": "_session-code-box_3421c",
  "session-inner-table": "_session-inner-table_3421c",
  "scroll-buttons": "_scroll-buttons_3421c",
  "scroll-right": "_scroll-right_3421c",
  "recorded-actions": "_recorded-actions_3421c",
  "_inspector-main_0387c": "__inspector-main_0387c_3421c",
  "ant-card-body": "_ant-card-body_3421c",
  "interaction-tab-card": "_interaction-tab-card_3421c",
  "highlighter-box": "_highlighter-box_3421c",
  "inspected-element-box": "_inspected-element-box_3421c",
  "hovered-element-box": "_hovered-element-box_3421c",
  "centroid-box": "_centroid-box_3421c",
  "centroid": "_centroid_3421c",
  "overlap": "_overlap_3421c",
  "expand": "_expand_3421c",
  "plus-minus": "_plus-minus_3421c",
  "phone-btn1": "_phone-btn1_3421c",
  "phone-btn2": "_phone-btn2_3421c",
  "phone-btn3": "_phone-btn3_3421c",
  "custom-button-icon": "_custom-button-icon_3421c",
  "elementActions": "_elementActions_3421c",
  "elementKeyInputActions": "_elementKeyInputActions_3421c",
  "selectedElementContainer": "_selectedElementContainer_3421c",
  "selected-element-table-cells": "_selected-element-table-cells_3421c",
  "element-cell-copy": "_element-cell-copy_3421c",
  "selected-element-card": "_selected-element-card_3421c",
  "selectedElemNotInteractableAlertRow": "_selectedElemNotInteractableAlertRow_3421c",
  "context-selector": "_context-selector_3421c",
  "sourceTag": "_sourceTag_3421c",
  "sourceAttrName": "_sourceAttrName_3421c",
  "no-recorded-actions": "_no-recorded-actions_3421c",
  "recorded-code": "_recorded-code_3421c",
  "framework-dropdown": "_framework-dropdown_3421c",
  "searchResultsList": "_searchResultsList_3421c",
  "searchResultsSelectedItem": "_searchResultsSelectedItem_3421c",
  "searchResultsActions": "_searchResultsActions_3421c",
  "searchResultsKeyInput": "_searchResultsKeyInput_3421c",
  "elementKeyInput": "_elementKeyInput_3421c",
  "element-count-container": "_element-count-container_3421c",
  "locatorStrategyBtn": "_locatorStrategyBtn_3421c",
  "locatorSelectorTextArea": "_locatorSelectorTextArea_3421c",
  "coordinatesContainer": "_coordinatesContainer_3421c",
  "swipeInstructions": "_swipeInstructions_3421c",
  "swipeSvg": "_swipeSvg_3421c",
  "tapDiv": "_tapDiv_3421c",
  "iphone_x": "_iphone_x_3421c",
  "gestureSvg": "_gestureSvg_3421c",
  "filled": "_filled_3421c",
  "dashed": "_dashed_3421c",
  "whole": "_whole_3421c",
  "newDashed": "_newDashed_3421c",
  "circle-dashed": "_circle-dashed_3421c",
  "circle-newDashed": "_circle-newDashed_3421c",
  "screenimage": "_screenimage_3421c",
  "innerScreenshotContainer": "_innerScreenshotContainer_3421c",
  "screenshotActionsPanel": "_screenshotActionsPanel_3421c",
  "commands-container": "_commands-container_3421c",
  "btn-container": "_btn-container_3421c",
  "arg-row": "_arg-row_3421c",
  "arg-container": "_arg-container_3421c",
  "gesture-header": "_gesture-header_3421c",
  "gesture-header-title": "_gesture-header-title_3421c",
  "gesture-header-description": "_gesture-header-description_3421c",
  "gesture-header-coord-btn": "_gesture-header-coord-btn_3421c",
  "gesture-header-timeline": "_gesture-header-timeline_3421c",
  "timeline-tick-title": "_timeline-tick-title_3421c",
  "gesture-header-icon": "_gesture-header-icon_3421c",
  "pointer-title": "_pointer-title_3421c",
  "tick-card": "_tick-card_3421c",
  "tick-plus-card": "_tick-plus-card_3421c",
  "tick-plus-btn": "_tick-plus-btn_3421c",
  "spaceContainer": "_spaceContainer_3421c",
  "tick-pointer-input": "_tick-pointer-input_3421c",
  "tick-button-group": "_tick-button-group_3421c",
  "tick-button-input": "_tick-button-input_3421c",
  "tick-input-box": "_tick-input-box_3421c",
  "tick-coord-box": "_tick-coord-box_3421c",
  "option-inpt": "_option-inpt_3421c"
};
},{"./../../../../assets/images/mobile.png":[["mobile.85cb68fa.png","../../assets/images/mobile.png"],"../../assets/images/mobile.png"],"_css_loader":"../../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"components/Inspector/HighlighterRect.js":[function(require,module,exports) {
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
  console.log("🚀 ~ file: HighlighterRects.js:12 ~ HighlighterRects ~ props:", props);
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
var _io = require("react-icons/io5");
var _bi = require("react-icons/bi");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); } /* eslint-disable import/no-unresolved */ /* eslint-disable space-before-blocks */ /* eslint-disable space-in-parens */ /* eslint-disable no-console */ /* eslint-disable quotes */ /* eslint-disable no-trailing-spaces */ /* eslint-disable no-unused-vars */
const {
  POINTER_UP,
  POINTER_DOWN,
  PAUSE,
  POINTER_MOVE
} = _shared.POINTER_TYPES;
const {
  TAP,
  SELECT,
  SLIDE,
  SWIPE,
  LONGPRESS,
  DRAG_AND_DROP,
  DOUBLE_TAP,
  SLIDE_SWIPE,
  ZOOMIN,
  SELECT_LONG,
  SELECT_DOUBLE,
  FILE_UPLOAD,
  SELECT_FILE,
  EXPECTED_VALUE,
  TAKE_SCREENSHOT,
  SCRATCH
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
    driver,
    selectScreenshotInteractionMode,
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
  const [xLongPress, setXLongPress] = (0, _react.useState)(null);
  const [yLongPress, setYLongPress] = (0, _react.useState)(null);
  const [element, setElement] = (0, _react.useState)({});
  const [coordinates, setCoordinates] = (0, _react.useState)([]);
  const [scratch, setScratch] = (0, _react.useState)(false);
  (0, _react.useEffect)(() => {
    if (hoveredElement && hoveredElement.attributes && hoveredElement.attributes.bounds) {
      const coordinatesString = hoveredElement.attributes.bounds;
      console.log("coordinatestring", coordinatesString);
      const coordinatesArray = coordinatesString.match(/\d+/g);
      if (coordinatesArray.length >= 4) {
        const x1 = parseInt(coordinatesArray[0], 10);
        const y1 = parseInt(coordinatesArray[1], 10);
        const x2 = parseInt(coordinatesArray[2], 10);
        const y2 = parseInt(coordinatesArray[3], 10);
        const centerX = Math.round(x2);
        const centerY = Math.round(y2);
        setXLongPress(centerX);
        setYLongPress(centerY);
      }
    }
  }, [hoveredElement]);
  if (hoveredElement) {
    // console.log("hoveredElement.attributes.bounds:", hoveredElement.attributes.bounds);
  }
  const containerEl = (0, _react.useRef)();
  const [x, setX] = (0, _react.useState)();
  const [y, setY] = (0, _react.useState)();
  const [isLongPress, setIsLongPress] = (0, _react.useState)(false);
  const [coords, setCoords] = (0, _react.useState)({});
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

  const handleScreenshotClick = async e => {
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
      setTimeout(() => {
        selectScreenshotInteractionMode(SELECT_LONG);
      }, 2000);
    } else if (screenshotInteractionMode === SELECT_LONG) {
      await useLongPress();
    } else if (screenshotInteractionMode === DOUBLE_TAP) {
      console.log("inside the double tap function!!!");
      setTimeout(() => {
        selectScreenshotInteractionMode(SELECT_DOUBLE);
      }, 1000);
    } else if (screenshotInteractionMode === SELECT_DOUBLE) {
      await useDoubleTap();
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
        handleDoDragAndDrop({
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
        await _bluebird.default.delay(500);
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
        await _bluebird.default.delay(500);
        await handleDoZoom({
          x,
          y
        }, coords);
      }
    } else if (screenshotInteractionMode === SLIDE) {
      setTimeout(() => {
        selectScreenshotInteractionMode(SLIDE_SWIPE);
      }, 1000);
      if (props.selectedElement) {
        setElement(props.selectedElement);
      }
    } else if (screenshotInteractionMode === SLIDE_SWIPE) {
      if (!swipeStart) {
        setSwipeStart(x, y);
      } else if (!swipeEnd) {
        setSwipeEnd(x, y);
        await _bluebird.default.delay(500);
        await handleDoSwipeSlide({
          x,
          y
        });
      }
    } else if (screenshotInteractionMode === FILE_UPLOAD) {
      console.log("inside the file upload condition!!!!!!!!!");
      setTimeout(() => {
        selectScreenshotInteractionMode(SELECT_FILE);
      }, 1000);
    } else if (screenshotInteractionMode === SELECT_FILE) {
      console.log("inside the select file condition!!!!!!!!!");
      await useFileUpload();
    } else if (screenshotInteractionMode === EXPECTED_VALUE) {
      let expected_value = '';
      let data = {};
      if (props.selectedElement) {
        expected_value = props.selectedElement.attributes.text;
        data = {
          expected_value: expected_value,
          xpath: props.selectedElement.xpath
        };
      }
      await fetchExpectedValue(data);
    } else if (screenshotInteractionMode === TAKE_SCREENSHOT) {
      const image = await driver.client.takeScreenshot();
      //   console.log("🚀 ~ file: Screenshot.js:203 ~ handleScreenshotClick ~ image:", image);
      //   let sendData = {
      //     "session_id": driver.sessionId,
      //     "step-name": "take_screenshot",
      //   };
      //   await fetch("https://apprecord.testing24x7.ai/appAction", {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify(sendData),
      //   })
      //   .then((response) => {
      //     console.log("API response:", response);
      //   })
      //   .catch((error) => {
      //     console.error("API error:", error);
      //   });
    } else if (screenshotInteractionMode === SCRATCH) {
      console.log("🚀 ~ file: Screenshot.js:201 ~ handleScreenshotClick ~ e:", e);
      if (!swipeStart) {
        setScratch(true);
        setCoordinates([]);
        await scratchCard(e);
        setSwipeStart(x, y);
      }
    }
  };
  const handleLongPress = () => {
    setIsLongPress(true);
  };
  const useFileUpload = () => {
    console.log("inside the use file upload function!!!!!!");
    const {
      POINTER_NAME,
      DURATION_1,
      DURATION_2,
      BUTTON
    } = _shared.DEFAULT_TAP;
    const {
      clearSwipeAction
    } = props;
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
    clearSwipeAction();
    selectScreenshotInteractionMode(FILE_UPLOAD);
  };
  const useLongPress = async () => {
    const {
      LONGPRESS_POINTER_NAME,
      LONGPRESS_DURATION_1,
      LONGPRESS_DURATION_2,
      LONGPRESS_BUTTON
    } = _shared.DEFAULT_LONGPRESS;
    let longdata = {
      methodName: TAP,
      args: {
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
      }
    };
    await applyClientMethod(longdata);
    selectScreenshotInteractionMode(LONGPRESS);
  };
  const useDoubleTap = () => {
    const {
      POINTER_NAME,
      DURATION_1,
      DURATION_2,
      BUTTON
    } = _shared.DEFAULT_TAP;
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
    const delay = 50;
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
    selectScreenshotInteractionMode(DOUBLE_TAP);
  };
  const scratchCard = async e => {
    console.log("🚀 ~ file: Screenshot.js:293 ~ scratchCard ~ e:", e);
    console.log('scratching');
    if (scratch === true) {
      await handleMouseMove(e);
    }
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
  const handleDoSwipeSlide = async swipeEndLocal => {
    console.log("🚀 ~ file: Screenshot.js:332 ~ handleDoSwipeSlide ~ props:", props);
    let xpath = props.selectedElement.xpath;
    console.log("🚀 ~ file: Screenshot.js:304 ~ handleDoSwipeSlide ~ xpath:", xpath);
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
    let data = {
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
    };
    if (xpath) {
      data.xpath = xpath;
    }
    await applyClientMethod(data);
    selectScreenshotInteractionMode(SLIDE);
    clearSwipeAction();
  };
  const handleDoDragAndDrop = async swipeEndLocal => {
    const {
      clearSwipeAction
    } = props;
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
    clearSwipeAction();
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
  const fetchExpectedValue = async value => {
    const {
      POINTER_NAME,
      DURATION_1,
      DURATION_2,
      BUTTON,
      ORIGIN
    } = _shared.DEFAULT_SWIPE;
    let data = {
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
        }]
      },
      xpath: value.xpath,
      expected_value: value.expected_value
    };
    await applyClientMethod(data);
  };
  const handleMouseMove = e => {
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
    if (screenshotInteractionMode !== SELECT) {
      const offsetX = e.nativeEvent.offsetX;
      const offsetY = e.nativeEvent.offsetY;
      const newX = offsetX * scaleRatio;
      const newY = offsetY * scaleRatio;
      setX(Math.round(newX));
      setY(Math.round(newY));
      if (screenshotInteractionMode === SCRATCH) {
        // console.log("🚀 ~ file: Screenshot.js:299 ~ scratchCard ~ coordinates.length:", coordinates.length)
        setCoordinates(prevCoordinates => [...prevCoordinates, {
          x: Math.round(newX),
          y: Math.round(newY)
        }]);
        if (coordinates.length > 250) {
          console.log("🚀 ~ file: Screenshot.js:440 ~ handleMouseMove ~ coordinates.length:", coordinates);
          // setTimeout(() => {
          applyClientMethod({
            methodName: SWIPE,
            args: {
              [POINTER_NAME1]: [{
                type: POINTER_MOVE,
                duration: DURATION_1,
                x: coordinates[0].x,
                y: coordinates[0].y
              }, {
                type: POINTER_DOWN,
                button: BUTTON
              }, {
                type: POINTER_MOVE,
                duration: DURATION_2,
                origin: ORIGIN,
                x: coordinates[80].x,
                y: coordinates[80].y
              }, {
                type: POINTER_UP,
                button: BUTTON
              }],
              [POINTER_NAME2]: [{
                type: POINTER_MOVE,
                duration: DURATION_1,
                x: coordinates[80].x,
                y: coordinates[80].y
              }, {
                type: POINTER_DOWN,
                button: BUTTON
              }, {
                type: POINTER_MOVE,
                duration: DURATION_2,
                origin: ORIGIN,
                x: coordinates[160].x,
                y: coordinates[160].y
              }, {
                type: POINTER_UP,
                button: BUTTON
              }]
            }
          });
          // }, 500);
          clearSwipeAction();
          setCoordinates([]);
          // selectScreenshotInteractionMode(SELECT);
          setScratch(false);
        }
      }
    }
    console.log("🚀 ~ file: Screenshot.js:406 ~ handleMouseMove ~ e:", e);
  };
  const handleMouseOut = () => {
    // setCoordinates([])
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
    setCoordinates([]);
    setScratch(false);
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
  if ([ZOOMIN, SLIDE_SWIPE].includes(screenshotInteractionMode) || selectedTick) {
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
    id: "screenshot",
    className: _Inspector.default.screenimage
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
  })), screenshotInteractionMode === SLIDE && containerEl.current && /*#__PURE__*/_react.default.createElement(_HighlighterRects.default, _extends({}, props, {
    containerEl: containerEl.current
  })), screenshotInteractionMode === DOUBLE_TAP && containerEl.current && /*#__PURE__*/_react.default.createElement(_HighlighterRects.default, _extends({}, props, {
    containerEl: containerEl.current
  })), screenshotInteractionMode === LONGPRESS && containerEl.current && /*#__PURE__*/_react.default.createElement(_HighlighterRects.default, _extends({}, props, {
    containerEl: containerEl.current
  })), screenshotInteractionMode === EXPECTED_VALUE && containerEl.current && /*#__PURE__*/_react.default.createElement(_HighlighterRects.default, _extends({}, props, {
    containerEl: containerEl.current
  })), screenshotInteractionMode === FILE_UPLOAD && containerEl.current && /*#__PURE__*/_react.default.createElement(_HighlighterRects.default, _extends({}, props, {
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
  })), screenshotInteractionMode === SCRATCH && /*#__PURE__*/_react.default.createElement("svg", {
    className: _Inspector.default.swipeSvg
  }, swipeStart && scratch && coordinates.map((coord, index) => /*#__PURE__*/_react.default.createElement("circle", {
    key: index,
    cx: coord.x / scaleRatio,
    cy: coord.y / scaleRatio
  }))), screenshotInteractionMode === SLIDE_SWIPE && /*#__PURE__*/_react.default.createElement("svg", {
    className: _Inspector.default.swipeSvg
  }, swipeStart && !swipeEnd && /*#__PURE__*/_react.default.createElement("circle", {
    cx: swipeStart.x / scaleRatio,
    cy: swipeStart.y / scaleRatio
  }), swipeStart && swipeEnd && /*#__PURE__*/_react.default.createElement("line", {
    x1: swipeStart.x / scaleRatio,
    y1: swipeStart.y / scaleRatio,
    x2: swipeEnd.x / scaleRatio,
    y2: swipeEnd.y / scaleRatio
  })), screenshotInteractionMode === DRAG_AND_DROP && /*#__PURE__*/_react.default.createElement("svg", {
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
  }))))))), driver && driver.client.isAndroid && /*#__PURE__*/_react.default.createElement("div", {
    className: _Inspector.default['whole-btn']
  }, /*#__PURE__*/_react.default.createElement(_antd.Tooltip, {
    title: t('Press Back Button')
  }, /*#__PURE__*/_react.default.createElement(_antd.Button, {
    id: "btnPressHomeButton",
    className: _Inspector.default['phone-btn1'],
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
    className: _Inspector.default['phone-btn2'],
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
    className: _Inspector.default['phone-btn3'],
    icon: /*#__PURE__*/_react.default.createElement(_bi.BiSquare, {
      className: _Inspector.default['custom-button-icon']
    }),
    onClick: () => applyClientMethod({
      methodName: 'pressKeyCode',
      args: [187]
    })
  }))));
};
var _default = Screenshot;
exports.default = _default;
},{"./HighlighterRects":"components/Inspector/HighlighterRects.js","./Inspector.css":"components/Inspector/Inspector.css","./shared":"components/Inspector/shared.js"}],"../../assets/images/testinglogo.png":[function(require,module,exports) {
module.exports = "testinglogo.3ef8e341.png";
},{}],"../../assets/images/hamburger.jpg":[function(require,module,exports) {
module.exports = "hamburger.8977aadd.jpg";
},{}],"components/Inspector/HeaderButtons.js":[function(require,module,exports) {
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
var _testinglogo = _interopRequireDefault(require("../../../../assets/images/testinglogo.png"));
var _hamburger = _interopRequireDefault(require("../../../../assets/images/hamburger.jpg"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/* eslint-disable no-unused-vars */

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
  const headerLogo = /*#__PURE__*/_react.default.createElement("div", {
    className: _Inspector.default['logoContainer']
  }, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("img", {
    src: _hamburger.default,
    alt: "toggleButton",
    style: {
      height: "45px"
    }
  })), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("img", {
    src: _testinglogo.default,
    alt: "testingLogo",
    style: {
      height: "45px"
    }
  })));
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
  }))));
  const appModeControls = /*#__PURE__*/_react.default.createElement(_antd.Button.Group, {
    value: appMode,
    style: {
      display: "flex",
      gap: "10px"
    }
  }, /*#__PURE__*/_react.default.createElement(_antd.Button, {
    className: _Inspector.default['actionButton'],
    icon: /*#__PURE__*/_react.default.createElement(_icons.AppstoreOutlined, null),
    onClick: () => {
      selectAppMode(_shared.APP_MODE.NATIVE);
    }
    // type={appMode === APP_MODE.NATIVE ? BUTTON.PRIMARY : BUTTON.DEFAULT}
  }, "Native Mode"), /*#__PURE__*/_react.default.createElement(_antd.Button, {
    className: _Inspector.default['actionButton'],
    icon: /*#__PURE__*/_react.default.createElement(_icons.GlobalOutlined, null),
    onClick: () => {
      selectAppMode(_shared.APP_MODE.WEB_HYBRID);
    }
    // type={appMode === APP_MODE.WEB_HYBRID ? BUTTON.PRIMARY : BUTTON.DEFAULT}
  }, "Hybrid Mode"));
  const generalControls = /*#__PURE__*/_react.default.createElement(_antd.Button.Group, {
    style: {
      display: "flex",
      gap: "10px"
    }
  }, mjpegScreenshotUrl && !isSourceRefreshOn && /*#__PURE__*/_react.default.createElement(_antd.Tooltip, {
    title: t('Start Refreshing Source')
  }, /*#__PURE__*/_react.default.createElement(_antd.Button, {
    className: _Inspector.default['actionButton'],
    id: "btnStartRefreshing",
    icon: /*#__PURE__*/_react.default.createElement(_icons.PlayCircleOutlined, null),
    onClick: toggleRefreshingState
  })), mjpegScreenshotUrl && isSourceRefreshOn && /*#__PURE__*/_react.default.createElement(_antd.Tooltip, {
    title: t('Pause Refreshing Source')
  }, /*#__PURE__*/_react.default.createElement(_antd.Button, {
    className: _Inspector.default['actionButton'],
    id: "btnPauseRefreshing",
    icon: /*#__PURE__*/_react.default.createElement(_icons.PauseCircleOutlined, null),
    onClick: toggleRefreshingState
  }, "Pause Recording")), /*#__PURE__*/_react.default.createElement(_antd.Button, {
    className: _Inspector.default['actionButton'],
    id: "btnReload",
    icon: /*#__PURE__*/_react.default.createElement(_icons.ReloadOutlined, null),
    onClick: () => applyClientMethod({
      methodName: 'getPageSource'
    })
  }, "Refresh"), /*#__PURE__*/_react.default.createElement(_antd.Button, {
    className: _Inspector.default['actionButton'],
    id: "searchForElement",
    icon: /*#__PURE__*/_react.default.createElement(_icons.SearchOutlined, null),
    onClick: showLocatorTestModal
  }, "Search"), !isRecording &&
  /*#__PURE__*/
  // <Tooltip title={t('Start Recording')}>
  _react.default.createElement(_antd.Button, {
    className: _Inspector.default['actionButton'],
    id: "btnStartRecording",
    icon: /*#__PURE__*/_react.default.createElement(_icons.EyeOutlined, null),
    onClick: startRecording
  }, "Start Recording")
  // </Tooltip>
  , isRecording &&
  /*#__PURE__*/
  // <Tooltip title={t('Pause Recording')}>
  _react.default.createElement(_antd.Button, {
    className: _Inspector.default['actionButton'],
    id: "btnPause",
    icon: /*#__PURE__*/_react.default.createElement(_icons.PauseOutlined, null),
    type: _AntdTypes.BUTTON.DANGER,
    onClick: pauseRecording
  }, "Pause Recording")
  // </Tooltip>
  );

  const quitSessionButton =
  /*#__PURE__*/
  // <Tooltip title={t('Close')}>
  _react.default.createElement(_antd.Button, {
    style: {
      borderRadius: "50%"
    },
    className: _Inspector.default['actionButton'],
    id: "btnClose",
    icon: /*#__PURE__*/_react.default.createElement(_icons.CloseOutlined, null),
    onClick: () => quitSession()
  });
  // </Tooltip>;

  return /*#__PURE__*/_react.default.createElement("div", {
    className: _Inspector.default['inspector-toolbar']
  }, /*#__PURE__*/_react.default.createElement(_antd.Space, {
    className: _Inspector.default['button_wrapper']
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      display: "flex",
      gap: "10px",
      alignItems: "center"
    }
  }, headerLogo, deviceControls, appModeControls, generalControls), /*#__PURE__*/_react.default.createElement("div", null, quitSessionButton)));
};
var _default = HeaderButtons;
exports.default = _default;
},{"./Inspector.css":"components/Inspector/Inspector.css","./shared":"components/Inspector/shared.js","../AntdTypes":"components/AntdTypes.js","../../../../assets/images/testinglogo.png":"../../assets/images/testinglogo.png","../../../../assets/images/hamburger.jpg":"../../assets/images/hamburger.jpg"}],"components/Inspector/SelectedElement.js":[function(require,module,exports) {
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
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); } /* eslint-disable dot-notation */ /* eslint-disable indent */ /* eslint-disable no-console */ /* eslint-disable no-unused-vars */
const {
  SELECT,
  SWIPE,
  TAP,
  LONGPRESS,
  DRAG_AND_DROP,
  DOUBLE_TAP,
  ZOOMIN,
  SLIDE,
  FILE_UPLOAD,
  EXPECTED_VALUE,
  TAKE_SCREENSHOT,
  SCRATCH
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
      scaleRatio: 1,
      activeIndex: 0,
      showPanel: false
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
    console.log('props in the inspector', this.props);
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
  handlePanel(val) {
    this.setState({
      showPanel: !this.state.showPanel
    });
  }
  screenshotInteractionChange(mode) {
    const {
      selectScreenshotInteractionMode,
      clearSwipeAction
    } = this.props;
    clearSwipeAction(); // When the action changes, reset the swipe action
    selectScreenshotInteractionMode(mode);
  }
  setActiveIndex(val) {
    this.setState({
      activeIndex: val
    });
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
    const {
      driver
    } = this.props;
    console.log('driver for iddddddd', driver.sessionId);
    const showScreenshot = screenshot && !screenshotError || mjpegScreenshotUrl && (!isSourceRefreshOn || !isAwaitingMjpegStream);
    let screenShotControls = /*#__PURE__*/_react.default.createElement("div", {
      className: _Inspector.default['screenshot-controls']
    }, /*#__PURE__*/_react.default.createElement(_antd.Tooltip, {
      title: t(showCentroids ? 'Hide Element Handles' : 'Show Element Handles'),
      placement: "topRight"
    }, /*#__PURE__*/_react.default.createElement(_antd.Switch, {
      checkedChildren: /*#__PURE__*/_react.default.createElement(_icons.CheckCircleOutlined, null),
      unCheckedChildren: /*#__PURE__*/_react.default.createElement(_icons.CloseCircleOutlined, null),
      defaultChecked: false,
      onChange: () => toggleShowCentroids(),
      disabled: isGestureEditorVisible,
      style: {
        width: '40px'
      }
    })), /*#__PURE__*/_react.default.createElement(_antd.Button, {
      icon: /*#__PURE__*/_react.default.createElement(_icons.BarsOutlined, null),
      onClick: () => this.handlePanel(this.state.showPanel)
    }), /*#__PURE__*/_react.default.createElement(ButtonGroup, {
      value: screenshotInteractionMode,
      style: {
        display: 'flex',
        flexDirection: 'column',
        position: "absolute",
        top: "150px",
        zIndex: "99"
      }
    }, /*#__PURE__*/_react.default.createElement(_antd.Button, {
      onMouseOver: () => this.setActiveIndex(1),
      onMouseOut: () => this.setActiveIndex(0),
      icon: /*#__PURE__*/_react.default.createElement(_icons.SelectOutlined, null),
      onClick: () => {
        this.screenshotInteractionChange(SELECT);
      },
      type: screenshotInteractionMode === SELECT ? _AntdTypes.BUTTON.PRIMARY : _AntdTypes.BUTTON.DEFAULT,
      disabled: isGestureEditorVisible,
      className: _Inspector.default['user_actions']
    }, this.state.activeIndex === 1 && /*#__PURE__*/_react.default.createElement("span", null, "Select Elements")), /*#__PURE__*/_react.default.createElement(_antd.Button, {
      onMouseOver: () => this.setActiveIndex(2),
      onMouseOut: () => this.setActiveIndex(0),
      icon: /*#__PURE__*/_react.default.createElement(_icons.SwapRightOutlined, null),
      onClick: () => {
        this.screenshotInteractionChange(SWIPE);
      },
      type: screenshotInteractionMode === SWIPE ? _AntdTypes.BUTTON.PRIMARY : _AntdTypes.BUTTON.DEFAULT,
      disabled: isGestureEditorVisible,
      className: _Inspector.default['user_actions']
    }, this.state.activeIndex === 2 && /*#__PURE__*/_react.default.createElement("span", null, "Swipe By Coordinates")), /*#__PURE__*/_react.default.createElement(_antd.Button, {
      onMouseOver: () => this.setActiveIndex(3),
      onMouseOut: () => this.setActiveIndex(0),
      icon: /*#__PURE__*/_react.default.createElement(_icons.ScanOutlined, null),
      onClick: () => {
        this.screenshotInteractionChange(TAP);
      },
      type: screenshotInteractionMode === TAP ? _AntdTypes.BUTTON.PRIMARY : _AntdTypes.BUTTON.DEFAULT,
      disabled: isGestureEditorVisible,
      className: _Inspector.default['user_actions']
    }, this.state.activeIndex === 3 && /*#__PURE__*/_react.default.createElement("span", null, "Tap By Coordinates")), /*#__PURE__*/_react.default.createElement(_antd.Button, {
      onMouseOver: () => this.setActiveIndex(4),
      onMouseOut: () => this.setActiveIndex(0),
      icon: /*#__PURE__*/_react.default.createElement(_icons.InfoOutlined, null),
      onClick: () => {
        this.screenshotInteractionChange(LONGPRESS);
      },
      type: screenshotInteractionMode === LONGPRESS ? _AntdTypes.BUTTON.PRIMARY : _AntdTypes.BUTTON.DEFAULT,
      disabled: isGestureEditorVisible,
      className: _Inspector.default['user_actions']
    }, this.state.activeIndex === 4 && /*#__PURE__*/_react.default.createElement("span", null, "LongPress")), /*#__PURE__*/_react.default.createElement(_antd.Button, {
      onMouseOver: () => this.setActiveIndex(5),
      onMouseOut: () => this.setActiveIndex(0),
      icon: /*#__PURE__*/_react.default.createElement(_icons.DragOutlined, null),
      onClick: () => {
        this.screenshotInteractionChange(DRAG_AND_DROP);
      },
      type: screenshotInteractionMode === DRAG_AND_DROP ? _AntdTypes.BUTTON.PRIMARY : _AntdTypes.BUTTON.DEFAULT,
      disabled: isGestureEditorVisible,
      className: _Inspector.default['user_actions']
    }, this.state.activeIndex === 5 && /*#__PURE__*/_react.default.createElement("span", null, "Drag & Drop")), /*#__PURE__*/_react.default.createElement(_antd.Button, {
      onMouseOver: () => this.setActiveIndex(6),
      onMouseOut: () => this.setActiveIndex(0),
      icon: /*#__PURE__*/_react.default.createElement(_icons.UpCircleOutlined, null),
      onClick: () => {
        this.screenshotInteractionChange(DOUBLE_TAP);
      },
      type: screenshotInteractionMode === DOUBLE_TAP ? _AntdTypes.BUTTON.PRIMARY : _AntdTypes.BUTTON.DEFAULT,
      className: _Inspector.default['user_actions']
    }, this.state.activeIndex === 6 && /*#__PURE__*/_react.default.createElement("span", null, "Double Tap")), /*#__PURE__*/_react.default.createElement(_antd.Button, {
      onMouseOver: () => this.setActiveIndex(7),
      onMouseOut: () => this.setActiveIndex(0),
      icon: /*#__PURE__*/_react.default.createElement(_icons.ShrinkOutlined, null),
      onClick: () => {
        this.screenshotInteractionChange(ZOOMIN);
      },
      type: screenshotInteractionMode === ZOOMIN ? _AntdTypes.BUTTON.PRIMARY : _AntdTypes.BUTTON.DEFAULT,
      disabled: isGestureEditorVisible,
      className: _Inspector.default['user_actions']
    }, this.state.activeIndex === 7 && /*#__PURE__*/_react.default.createElement("span", null, "Zoom")), /*#__PURE__*/_react.default.createElement(_antd.Button, {
      onMouseOver: () => this.setActiveIndex(8),
      onMouseOut: () => this.setActiveIndex(0),
      icon: /*#__PURE__*/_react.default.createElement(_icons.SlidersOutlined, null),
      onClick: () => {
        this.screenshotInteractionChange(SLIDE);
      },
      type: screenshotInteractionMode === SLIDE ? _AntdTypes.BUTTON.PRIMARY : _AntdTypes.BUTTON.DEFAULT,
      disabled: isGestureEditorVisible,
      className: _Inspector.default['user_actions']
    }, this.state.activeIndex === 8 && /*#__PURE__*/_react.default.createElement("span", null, "Slider")), /*#__PURE__*/_react.default.createElement(_antd.Button, {
      onMouseOver: () => this.setActiveIndex(9),
      onMouseOut: () => this.setActiveIndex(0),
      className: _Inspector.default['user_actions'],
      icon: /*#__PURE__*/_react.default.createElement(_icons.FileAddOutlined, null),
      onClick: async () => {
        if (screenshotInteractionMode === FILE_UPLOAD) {
          this.screenshotInteractionChange(null);
          let data = {
            'session_id': driver.sessionId,
            'step-name': 'select_file',
            'status': 'done'
          };
          await fetch('https://apprecord.testing24x7.ai/appAction', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          }).then(response => {
            console.log('API response:', response);
          }).catch(error => {
            console.error('API error:', error);
          });
        } else {
          this.screenshotInteractionChange(FILE_UPLOAD);
        }
      },
      type: screenshotInteractionMode === FILE_UPLOAD ? _AntdTypes.BUTTON.PRIMARY : _AntdTypes.BUTTON.DEFAULT,
      disabled: isGestureEditorVisible
    }, this.state.activeIndex === 9 && /*#__PURE__*/_react.default.createElement("span", null, "File Upload")), /*#__PURE__*/_react.default.createElement(_antd.Button, {
      onMouseOver: () => this.setActiveIndex(10),
      onMouseOut: () => this.setActiveIndex(0),
      icon: /*#__PURE__*/_react.default.createElement(_icons.DollarOutlined, null),
      onClick: () => {
        this.screenshotInteractionChange(EXPECTED_VALUE);
      },
      type: screenshotInteractionMode === EXPECTED_VALUE ? _AntdTypes.BUTTON.PRIMARY : _AntdTypes.BUTTON.DEFAULT,
      disabled: isGestureEditorVisible,
      className: _Inspector.default['user_actions']
    }, this.state.activeIndex === 10 && /*#__PURE__*/_react.default.createElement("span", null, "Expected value")), /*#__PURE__*/_react.default.createElement(_antd.Button, {
      onMouseOver: () => this.setActiveIndex(11),
      onMouseOut: () => this.setActiveIndex(0),
      icon: /*#__PURE__*/_react.default.createElement(_icons.FundProjectionScreenOutlined, null),
      onClick: () => {
        this.screenshotInteractionChange(TAKE_SCREENSHOT);
      },
      type: screenshotInteractionMode === TAKE_SCREENSHOT ? _AntdTypes.BUTTON.PRIMARY : _AntdTypes.BUTTON.DEFAULT,
      disabled: isGestureEditorVisible,
      className: _Inspector.default['user_actions']
    }, this.state.activeIndex === 11 && /*#__PURE__*/_react.default.createElement("span", null, "Take Screenshot")), /*#__PURE__*/_react.default.createElement(_antd.Button, {
      onMouseOver: () => this.setActiveIndex(12),
      onMouseOut: () => this.setActiveIndex(0),
      icon: /*#__PURE__*/_react.default.createElement(_icons.DollarOutlined, null),
      onClick: () => {
        this.screenshotInteractionChange(SCRATCH);
      },
      type: screenshotInteractionMode === SCRATCH ? _AntdTypes.BUTTON.PRIMARY : _AntdTypes.BUTTON.DEFAULT,
      disabled: isGestureEditorVisible,
      className: _Inspector.default['user_actions']
    }, this.state.activeIndex === 12 && /*#__PURE__*/_react.default.createElement("span", null, "Scratch"))));
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
  "container": "_container_70832",
  "loader": "_loader_70832",
  "load1": "_load1_70832"
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
  "errorMessage": "_errorMessage_8d2a9",
  "copyTraceBtn": "_copyTraceBtn_8d2a9"
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
//# sourceMappingURL=renderer.e31bb0bc.js.map