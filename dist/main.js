// modules are defined as an array
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
})({"main/debug.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.installExtensions = installExtensions;
async function installExtensions() {
  const installer = require('electron-devtools-installer');
  const {
    REACT_DEVELOPER_TOOLS,
    REDUX_DEVTOOLS
  } = installer;
  const opts = {
    forceDownload: !!process.env.UPGRADE_EXTENSIONS,
    loadExtensionOptions: {
      allowFileAccess: true
    }
  };
  try {
    await installer.default([REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS], opts);
  } catch (e) {
    console.warn(`Error installing extension: ${e}`); // eslint-disable-line no-console
  }
}
},{}],"main/helpers.js":[function(require,module,exports) {
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
},{}],"../env/.env-dev.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {};
exports.default = _default;
},{}],"env.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
let env = {};
if (typeof _ENV_ === 'undefined') {
  env = require('../env/.env-dev');
} else {
  env = _ENV_; // eslint-disable-line no-undef
}
var _default = env;
exports.default = _default;
},{"../env/.env-dev":"../env/.env-dev.js"}],"renderer/polyfills/browser.js":[function(require,module,exports) {
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
},{}],"renderer/polyfills/electron.js":[function(require,module,exports) {
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
},{}],"renderer/polyfills/index.js":[function(require,module,exports) {
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
},{"./browser":"renderer/polyfills/browser.js","./electron":"renderer/polyfills/electron.js"}],"shared/settings.js":[function(require,module,exports) {
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
},{"../renderer/polyfills":"renderer/polyfills/index.js"}],"configs/app.config.js":[function(require,module,exports) {
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
},{"../shared/settings":"shared/settings.js"}],"configs/i18next.config.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _i18next = _interopRequireDefault(require("i18next"));
var _app = require("./app.config");
var _polyfills = require("../renderer/polyfills");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const i18nextOptions = (0, _app.getI18NextOptions)(_polyfills.i18NextBackendOptions);
if (!_i18next.default.isInitialized) {
  _i18next.default.use(_polyfills.i18NextBackend).init(i18nextOptions);
}
var _default = _i18next.default;
exports.default = _default;
},{"./app.config":"configs/app.config.js","../renderer/polyfills":"renderer/polyfills/index.js"}],"main/auto-updater/config.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFeedUrl = getFeedUrl;
const baseFeedUrl = `https://appium-inspector-hazel.vercel.app`;
function getFeedUrl(version) {
  let platform = process.platform;
  if (platform.toLowerCase() === 'linux') {
    platform = 'AppImage';
  }
  return `${baseFeedUrl}/update/${platform}/${version}`;
}
},{}],"main/auto-updater/update-checker.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkUpdate = checkUpdate;
exports.setUpAutoUpdater = setUpAutoUpdater;
var _requestPromise = _interopRequireDefault(require("request-promise"));
var _config = require("./config");
var _semver = _interopRequireDefault(require("semver"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
async function checkUpdate(currentVersion) {
  try {
    // The response is like (macOS):
    // {  "name":"v1.15.0-1",
    //    "notes":"* Bump up Appium to v1.15.0",
    //    "pub_date":"2019-10-04T04:40:37Z",
    //    "url":"https://github.com/appium/appium-desktop/releases/download/v1.15.0-1/Appium-1.15.0-1-mac.zip"}
    const res = await _requestPromise.default.get((0, _config.getFeedUrl)(currentVersion));
    if (res) {
      const j = JSON.parse(res);
      if (_semver.default.lt(currentVersion, j.name)) {
        return j;
      }
    }
  } catch (ign) {}
  return false;
}
function setUpAutoUpdater({
  autoUpdater,
  app,
  moment,
  i18n,
  env,
  dialog,
  B
}) {
  autoUpdater.setFeedURL((0, _config.getFeedUrl)(app.getVersion()));

  /**
   * Check for new updates
   */
  const checkNewUpdates = async function (fromMenu) {
    // autoupdate.checkForUpdates always downloads updates immediately
    // This method (getUpdate) let's us take a peek to see if there is an update
    // available before calling .checkForUpdates
    if (process.env.RUNNING_IN_SPECTRON) {
      return;
    }
    const update = await checkUpdate(app.getVersion());
    if (update) {
      let {
        name,
        notes,
        pub_date: pubDate
      } = update;
      pubDate = moment(pubDate).format(i18n.t('datetimeFormat'));
      let detail = i18n.t('updateDetails', {
        pubDate,
        notes: notes.replace('*', '\n*')
      });
      if (env.NO_AUTO_UPDATE) {
        detail += `\n\nhttps://www.github.com/appium/appium-inspector/releases/latest`;
      }

      // Ask user if they wish to install now or later
      if (!process.env.RUNNING_IN_SPECTRON) {
        dialog.showMessageBox({
          type: 'info',
          buttons: env.NO_AUTO_UPDATE ? [i18n.t('OK')] : [i18n.t('Install Now'), i18n.t('Install Later')],
          message: i18n.t('appiumIsAvailable', {
            name
          }),
          detail
        }, response => {
          if (response === 0) {
            // If they say yes, get the updates now
            if (!env.NO_AUTO_UPDATE) {
              autoUpdater.checkForUpdates();
            }
          }
        });
      }
    } else {
      if (fromMenu) {
        autoUpdater.emit('update-not-available');
      } else {
        // If no updates found check for updates every hour
        await B.delay(60 * 60 * 1000);
        checkNewUpdates();
      }
    }
  };

  // Inform user when the download is starting and that they'll be notified again when it is complete
  autoUpdater.on('update-available', () => {
    dialog.showMessageBox({
      type: 'info',
      buttons: [i18n.t('OK')],
      message: i18n.t('Update Download Started'),
      detail: i18n.t('updateIsBeingDownloaded')
    });
  });

  // Handle the unusual case where we checked the updates endpoint, found an update
  // but then after calling 'checkForUpdates', nothing was there
  autoUpdater.on('update-not-available', () => {
    dialog.showMessageBox({
      type: 'info',
      buttons: [i18n.t('OK')],
      message: i18n.t('No update available'),
      detail: i18n.t('Appium Inspector is up-to-date')
    });
  });

  // When it's done, ask if user want to restart now or later
  autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName) => {
    dialog.showMessageBox({
      type: 'info',
      buttons: [i18n.t('Restart Now'), i18n.t('Later')],
      message: i18n.t('Update Downloaded'),
      detail: i18n.t('updateIsDownloaded', {
        releaseName
      })
    }, response => {
      // If they say yes, restart now
      if (response === 0) {
        autoUpdater.quitAndInstall();
      }
    });
  });

  // Handle error case
  autoUpdater.on('error', message => {
    dialog.showMessageBox({
      type: 'error',
      message: i18n.t('Could not download update'),
      detail: i18n.t('updateDownloadFailed', {
        message
      })
    });
  });
  return checkNewUpdates;
}
},{"./config":"main/auto-updater/config.js"}],"main/auto-updater/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkNewUpdates = void 0;
var _electron = require("electron");
var _moment = _interopRequireDefault(require("moment"));
var _bluebird = _interopRequireDefault(require("bluebird"));
var _lodash = _interopRequireDefault(require("lodash"));
var _env = _interopRequireDefault(require("../../env"));
var _i18next = _interopRequireDefault(require("../../configs/i18next.config"));
var _updateChecker = require("./update-checker");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * Auto Updater
 *
 * Similar to https://electronjs.org/docs/api/auto-updater#events
 * See https://electronjs.org/docs/tutorial/updates for documentation
 */

const isDev = process.env.NODE_ENV === 'development';
const runningLocally = isDev || process.env.RUNNING_LOCALLY;
let checkNewUpdates = _lodash.default.noop;
exports.checkNewUpdates = checkNewUpdates;
if (!runningLocally && !process.env.RUNNING_IN_SPECTRON) {
  // put autoupdater in try block so that it doesn't break if autoupdater doesn't work
  try {
    exports.checkNewUpdates = checkNewUpdates = (0, _updateChecker.setUpAutoUpdater)({
      autoUpdater: _electron.autoUpdater,
      app: _electron.app,
      moment: _moment.default,
      i18n: _i18next.default,
      env: _env.default,
      dialog: _electron.dialog,
      B: _bluebird.default
    });
  } catch (e) {}
}
},{"../../env":"env.js","../../configs/i18next.config":"configs/i18next.config.js","./update-checker":"main/auto-updater/update-checker.js"}],"main/menus.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rebuildMenus = rebuildMenus;
var _electron = require("electron");
var _autoUpdater = require("./auto-updater");
var _windows = require("./windows");
var _app = _interopRequireDefault(require("../configs/app.config"));
var _i18next = _interopRequireDefault(require("../configs/i18next.config"));
var _helpers = require("./helpers");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
let menuTemplates = {
  mac: {},
  other: {}
};
function languageMenu() {
  return _app.default.languages.map(languageCode => ({
    label: _i18next.default.t(languageCode),
    type: 'radio',
    checked: _i18next.default.language === languageCode,
    click: () => _i18next.default.changeLanguage(languageCode)
  }));
}
function getShowAppInfoClickAction() {
  return () => {
    _electron.dialog.showMessageBox({
      title: _i18next.default.t('appiumInspector'),
      message: _i18next.default.t('showAppInfo', {
        appVersion: _electron.app.getVersion(),
        electronVersion: process.versions.electron,
        nodejsVersion: process.versions.node
      })
    });
  };
}
function macMenuAppium() {
  return {
    label: 'Appium',
    submenu: [{
      label: _i18next.default.t('About Appium'),
      click: getShowAppInfoClickAction()
    }, {
      label: _i18next.default.t('Check for updates'),
      click() {
        (0, _autoUpdater.checkNewUpdates)(true);
      }
    }, {
      type: 'separator'
    }, {
      label: _i18next.default.t('Hide Appium'),
      accelerator: 'Command+H',
      selector: 'hide:'
    }, {
      label: _i18next.default.t('Hide Others'),
      accelerator: 'Command+Shift+H',
      selector: 'hideOtherApplications:'
    }, {
      label: _i18next.default.t('Show All'),
      selector: 'unhideAllApplications:'
    }, {
      type: 'separator'
    }, {
      label: _i18next.default.t('Quit'),
      accelerator: 'Command+Q',
      click() {
        _electron.app.quit();
      }
    }]
  };
}
function macMenuEdit() {
  return {
    label: _i18next.default.t('Edit'),
    submenu: [{
      label: _i18next.default.t('Undo'),
      accelerator: 'Command+Z',
      selector: 'undo:'
    }, {
      label: _i18next.default.t('Redo'),
      accelerator: 'Shift+Command+Z',
      selector: 'redo:'
    }, {
      type: 'separator'
    }, {
      label: _i18next.default.t('Cut'),
      accelerator: 'Command+X',
      selector: 'cut:'
    }, {
      label: _i18next.default.t('Copy'),
      accelerator: 'Command+C',
      selector: 'copy:'
    }, {
      label: _i18next.default.t('Paste'),
      accelerator: 'Command+V',
      selector: 'paste:'
    }, {
      label: _i18next.default.t('Select All'),
      accelerator: 'Command+A',
      selector: 'selectAll:'
    }]
  };
}
function macMenuView({
  mainWindow
}) {
  const submenu = process.env.NODE_ENV === 'development' ? [{
    label: _i18next.default.t('Reload'),
    accelerator: 'Command+R',
    click() {
      mainWindow.webContents.reload();
    }
  }, {
    label: _i18next.default.t('Toggle Developer Tools'),
    accelerator: 'Alt+Command+I',
    click() {
      mainWindow.toggleDevTools();
    }
  }] : [];
  submenu.push({
    label: _i18next.default.t('Toggle Full Screen'),
    accelerator: 'Ctrl+Command+F',
    click() {
      mainWindow.setFullScreen(!mainWindow.isFullScreen());
    }
  });
  submenu.push({
    label: _i18next.default.t('Languages'),
    submenu: languageMenu()
  });
  return {
    label: _i18next.default.t('View'),
    submenu
  };
}
function macMenuWindow() {
  return {
    label: _i18next.default.t('Window'),
    submenu: [{
      label: _i18next.default.t('Minimize'),
      accelerator: 'Command+M',
      selector: 'performMiniaturize:'
    }, {
      label: _i18next.default.t('Close'),
      accelerator: 'Command+W',
      selector: 'performClose:'
    }, {
      type: 'separator'
    }, {
      label: _i18next.default.t('Bring All to Front'),
      selector: 'arrangeInFront:'
    }]
  };
}
function macMenuHelp() {
  return {
    label: _i18next.default.t('Help'),
    submenu: [{
      label: _i18next.default.t('Inspector Documentation'),
      click() {
        _electron.shell.openExternal('https://github.com/appium/appium-inspector');
      }
    }, {
      label: _i18next.default.t('Appium Documentation'),
      click() {
        _electron.shell.openExternal('https://appium.io');
      }
    }, {
      label: _i18next.default.t('Search Issues'),
      click() {
        _electron.shell.openExternal('https://github.com/appium/appium-inspector/issues');
      }
    }, {
      label: _i18next.default.t('Add Or Improve Translations'),
      click() {
        _electron.shell.openExternal('https://crowdin.com/project/appium-desktop');
      }
    }]
  };
}
menuTemplates.mac = ({
  mainWindow,
  shouldShowFileMenu
}) => [macMenuAppium(), ...(shouldShowFileMenu ? [macMenuFile({
  mainWindow
})] : []), macMenuEdit(), macMenuView({
  mainWindow
}), macMenuWindow(), macMenuHelp()];
async function openFileCallback(mainWindow) {
  const {
    canceled,
    filePaths
  } = await _electron.dialog.showOpenDialog({
    properties: ['openFile'],
    filters: [{
      name: 'Appium Session Files',
      extensions: [_helpers.APPIUM_SESSION_EXTENSION]
    }]
  });
  if (!canceled) {
    const filePath = filePaths[0];
    mainWindow.webContents.send('open-file', filePath);
  }
}
async function saveAsCallback(mainWindow) {
  const {
    canceled,
    filePath
  } = await _electron.dialog.showSaveDialog({
    title: _i18next.default.t('saveAs'),
    filters: [{
      name: 'Appium',
      extensions: [_helpers.APPIUM_SESSION_EXTENSION]
    }]
  });
  if (!canceled) {
    mainWindow.webContents.send('save-file', filePath);
  }
}
function macMenuFile({
  mainWindow
}) {
  return {
    label: _i18next.default.t('File'),
    submenu: [{
      label: _i18next.default.t('New Session Window…'),
      accelerator: 'Command+N',
      click: _windows.launchNewSessionWindow
    }, {
      label: _i18next.default.t('Open'),
      accelerator: 'Command+O',
      click: () => openFileCallback(mainWindow)
    }, {
      label: _i18next.default.t('Save'),
      accelerator: 'Command+S',
      click: () => mainWindow.webContents.send('save-file')
    }, {
      label: _i18next.default.t('saveAs'),
      accelerator: 'Command+Shift+S',
      click: () => saveAsCallback(mainWindow)
    }]
  };
}
function otherMenuFile({
  mainWindow,
  shouldShowFileMenu
}) {
  const fileSavingOperations = [{
    label: _i18next.default.t('New Session Window…'),
    accelerator: 'Ctrl+N',
    click: _windows.launchNewSessionWindow
  }, {
    label: _i18next.default.t('Open'),
    accelerator: 'Ctrl+O',
    click: () => openFileCallback(mainWindow)
  }, {
    label: _i18next.default.t('Save'),
    accelerator: 'Ctrl+S',
    click: () => mainWindow.webContents.send('save-file')
  }, {
    label: _i18next.default.t('saveAs'),
    accelerator: 'Ctrl+Shift+S',
    click: () => saveAsCallback(mainWindow)
  }];
  let fileSubmenu = [...(shouldShowFileMenu ? fileSavingOperations : []), {
    label: '&' + _i18next.default.t('About Appium'),
    click: getShowAppInfoClickAction()
  }, {
    type: 'separator'
  }, {
    label: '&' + _i18next.default.t('Close'),
    accelerator: 'Ctrl+W',
    click() {
      mainWindow.close();
    }
  }];

  // If it's Windows, add a 'Check for Updates' menu option
  if (process.platform === 'win32') {
    fileSubmenu.splice(1, 0, {
      label: '&' + _i18next.default.t('Check for updates'),
      click() {
        (0, _autoUpdater.checkNewUpdates)(true);
      }
    });
  }
  return {
    label: '&' + _i18next.default.t('File'),
    submenu: fileSubmenu
  };
}
function otherMenuView({
  mainWindow
}) {
  const submenu = [];
  submenu.push({
    label: _i18next.default.t('Toggle &Full Screen'),
    accelerator: 'F11',
    click() {
      mainWindow.setFullScreen(!mainWindow.isFullScreen());
    }
  });
  submenu.push({
    label: _i18next.default.t('Languages'),
    submenu: languageMenu()
  });
  if (process.env.NODE_ENV === 'development') {
    submenu.push({
      label: '&' + _i18next.default.t('Reload'),
      accelerator: 'Ctrl+R',
      click() {
        mainWindow.webContents.reload();
      }
    });
    submenu.push({
      label: _i18next.default.t('Toggle &Developer Tools'),
      accelerator: 'Alt+Ctrl+I',
      click() {
        mainWindow.toggleDevTools();
      }
    });
  }
  return {
    label: '&' + _i18next.default.t('View'),
    submenu
  };
}
function otherMenuHelp() {
  // just the same as mac menus for now since we don't have any hotkeys for this menu
  return macMenuHelp();
}
menuTemplates.other = ({
  mainWindow,
  shouldShowFileMenu
}) => [otherMenuFile({
  mainWindow,
  shouldShowFileMenu
}), otherMenuView({
  mainWindow
}), otherMenuHelp()];
function rebuildMenus(mainWindow, shouldShowFileMenu) {
  if (!mainWindow) {
    return;
  }
  if (_app.default.platform === 'darwin') {
    const template = menuTemplates.mac({
      mainWindow,
      shouldShowFileMenu
    });
    const menu = _electron.Menu.buildFromTemplate(template);
    _electron.Menu.setApplicationMenu(menu);
  } else {
    const template = menuTemplates.other({
      mainWindow,
      shouldShowFileMenu
    });
    const menu = _electron.Menu.buildFromTemplate(template);
    mainWindow.setMenu(menu);
  }
}
},{"./auto-updater":"main/auto-updater/index.js","./windows":"main/windows.js","../configs/app.config":"configs/app.config.js","../configs/i18next.config":"configs/i18next.config.js","./helpers":"main/helpers.js"}],"main/windows.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.launchNewSessionWindow = launchNewSessionWindow;
exports.setupMainWindow = setupMainWindow;
var _electron = require("electron");
var _helpers = require("./helpers");
var _menus = require("./menus");
var _main = require("../main");
var _i18next = _interopRequireDefault(require("../configs/i18next.config"));
var _settings = _interopRequireDefault(require("../shared/settings"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
let mainWindow = null;
function buildSplashWindow() {
  return new _electron.BrowserWindow({
    width: 300,
    height: 300,
    minWidth: 300,
    minHeight: 300,
    frame: false
  });
}
function buildSessionWindow() {
  const window = new _electron.BrowserWindow({
    show: false,
    width: 1100,
    height: 710,
    minWidth: 890,
    minHeight: 710,
    titleBarStyle: 'hiddenInset',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
      additionalArguments: _main.openFilePath ? [`filename=${_main.openFilePath}`] : []
    }
  });
  _electron.ipcMain.on('save-file-as', async () => {
    const {
      canceled,
      filePath
    } = await _electron.dialog.showSaveDialog(mainWindow, {
      title: 'Save Appium File',
      filters: [{
        name: 'Appium Session Files',
        extensions: [_helpers.APPIUM_SESSION_EXTENSION]
      }]
    });
    if (!canceled) {
      mainWindow.webContents.send('save-file', filePath);
    }
  });
  return window;
}
function setupMainWindow({
  splashUrl,
  mainUrl,
  isDev,
  shouldShowFileMenu = false
}) {
  const splashWindow = buildSplashWindow();
  mainWindow = buildSessionWindow();
  splashWindow.loadURL(splashUrl);
  splashWindow.show();
  mainWindow.loadURL(mainUrl);
  mainWindow.webContents.on('did-finish-load', () => {
    splashWindow.destroy();
    mainWindow.show();
    mainWindow.focus();
    if (isDev) {
      mainWindow.openDevTools();
    }
  });
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
  mainWindow.webContents.on('context-menu', (e, props) => {
    const {
      x,
      y
    } = props;
    _electron.Menu.buildFromTemplate([{
      label: _i18next.default.t('Inspect element'),
      click() {
        mainWindow.inspectElement(x, y);
      }
    }]).popup(mainWindow);
  });
  _i18next.default.on('languageChanged', async languageCode => {
    (0, _menus.rebuildMenus)(null, shouldShowFileMenu);
    await _settings.default.set('PREFERRED_LANGUAGE', languageCode);
    _electron.webContents.getAllWebContents().forEach(wc => {
      wc.send('appium-language-changed', {
        language: languageCode
      });
    });
  });
  (0, _menus.rebuildMenus)(mainWindow, shouldShowFileMenu);
}
function launchNewSessionWindow() {
  const url = `file://${__dirname}/index.html`;
  const win = buildSessionWindow();
  win.loadURL(url);
  win.show();
}
},{"./helpers":"main/helpers.js","./menus":"main/menus.js","../main":"main.js","../configs/i18next.config":"configs/i18next.config.js","../shared/settings":"shared/settings.js"}],"main.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.openFilePath = void 0;
var _electron = require("electron");
var _debug = require("./main/debug");
var _windows = require("./main/windows");
var _helpers = require("./main/helpers");
const isDev = process.env.NODE_ENV === 'development';
let openFilePath = (0, _helpers.getAppiumSessionFilePath)(process.argv, _electron.app.isPackaged, isDev);
exports.openFilePath = openFilePath;
_electron.app.on('open-file', (event, filePath) => {
  exports.openFilePath = openFilePath = filePath;
});
_electron.app.on('window-all-closed', () => {
  _electron.app.quit();
});
_electron.app.on('ready', async () => {
  if (isDev) {
    require('electron-debug')();
    await (0, _debug.installExtensions)();
  }
  (0, _windows.setupMainWindow)({
    mainUrl: `file://${__dirname}/index.html`,
    splashUrl: `file://${__dirname}/splash.html`,
    isDev,
    shouldShowFileMenu: true
  });
});
},{"./main/debug":"main/debug.js","./main/windows":"main/windows.js","./main/helpers":"main/helpers.js"}]},{},["main.js"], null)
//# sourceMappingURL=main.js.map