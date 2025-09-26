// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (
  modules,
  entry,
  mainEntry,
  parcelRequireName,
  externals,
  distDir,
  publicUrl,
  devServer
) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var importMap = previousRequire.i || {};
  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        if (externals[name]) {
          return externals[name];
        }
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
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

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        globalObject
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      if (res === false) {
        return {};
      }
      // Synthesize a module to follow re-exports.
      if (Array.isArray(res)) {
        var m = {__esModule: true};
        res.forEach(function (v) {
          var key = v[0];
          var id = v[1];
          var exp = v[2] || v[0];
          var x = newRequire(id);
          if (key === '*') {
            Object.keys(x).forEach(function (key) {
              if (
                key === 'default' ||
                key === '__esModule' ||
                Object.prototype.hasOwnProperty.call(m, key)
              ) {
                return;
              }

              Object.defineProperty(m, key, {
                enumerable: true,
                get: function () {
                  return x[key];
                },
              });
            });
          } else if (exp === '*') {
            Object.defineProperty(m, key, {
              enumerable: true,
              value: x,
            });
          } else {
            Object.defineProperty(m, key, {
              enumerable: true,
              get: function () {
                if (exp === 'default') {
                  return x.__esModule ? x.default : x;
                }
                return x[exp];
              },
            });
          }
        });
        return m;
      }
      return newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.require = nodeRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.distDir = distDir;
  newRequire.publicUrl = publicUrl;
  newRequire.devServer = devServer;
  newRequire.i = importMap;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  // Only insert newRequire.load when it is actually used.
  // The code in this file is linted against ES5, so dynamic import is not allowed.
  // INSERT_LOAD_HERE

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });
    }
  }
})({"iUuJv":[function(require,module,exports,__globalThis) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SERVER_PORT = 1234;
var HMR_SECURE = false;
var HMR_ENV_HASH = "439701173a9199ea";
var HMR_USE_SSE = false;
module.bundle.HMR_BUNDLE_ID = "47f455d51fcc916e";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_SERVER_PORT, HMR_ENV_HASH, HMR_SECURE, HMR_USE_SSE, chrome, browser, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_SERVER_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var HMR_USE_SSE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets /*: {|[string]: boolean|} */ , disposedAssets /*: {|[string]: boolean|} */ , assetsToDispose /*: Array<[ParcelRequire, string]> */ , assetsToAccept /*: Array<[ParcelRequire, string]> */ , bundleNotFound = false;
function getHostname() {
    return HMR_HOST || (typeof location !== 'undefined' && location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
    return HMR_PORT || (typeof location !== 'undefined' ? location.port : HMR_SERVER_PORT);
}
// eslint-disable-next-line no-redeclare
let WebSocket = globalThis.WebSocket;
if (!WebSocket && typeof module.bundle.root === 'function') try {
    // eslint-disable-next-line no-global-assign
    WebSocket = module.bundle.root('ws');
} catch  {
// ignore.
}
var hostname = getHostname();
var port = getPort();
var protocol = HMR_SECURE || typeof location !== 'undefined' && location.protocol === 'https:' && ![
    'localhost',
    '127.0.0.1',
    '0.0.0.0'
].includes(hostname) ? 'wss' : 'ws';
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if (!parent || !parent.isParcelRequire) {
    // Web extension context
    var extCtx = typeof browser === 'undefined' ? typeof chrome === 'undefined' ? null : chrome : browser;
    // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes('test.js');
    }
    var ws;
    if (HMR_USE_SSE) ws = new EventSource('/__parcel_hmr');
    else try {
        // If we're running in the dev server's node runner, listen for messages on the parent port.
        let { workerData, parentPort } = module.bundle.root('node:worker_threads') /*: any*/ ;
        if (workerData !== null && workerData !== void 0 && workerData.__parcel) {
            parentPort.on('message', async (message)=>{
                try {
                    await handleMessage(message);
                    parentPort.postMessage('updated');
                } catch  {
                    parentPort.postMessage('restart');
                }
            });
            // After the bundle has finished running, notify the dev server that the HMR update is complete.
            queueMicrotask(()=>parentPort.postMessage('ready'));
        }
    } catch  {
        if (typeof WebSocket !== 'undefined') try {
            ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/');
        } catch (err) {
            // Ignore cloudflare workers error.
            if (err.message && !err.message.includes('Disallowed operation called within global scope')) console.error(err.message);
        }
    }
    if (ws) {
        // $FlowFixMe
        ws.onmessage = async function(event /*: {data: string, ...} */ ) {
            var data /*: HMRMessage */  = JSON.parse(event.data);
            await handleMessage(data);
        };
        if (ws instanceof WebSocket) {
            ws.onerror = function(e) {
                if (e.message) console.error(e.message);
            };
            ws.onclose = function() {
                console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
            };
        }
    }
}
async function handleMessage(data /*: HMRMessage */ ) {
    checkedAssets = {} /*: {|[string]: boolean|} */ ;
    disposedAssets = {} /*: {|[string]: boolean|} */ ;
    assetsToAccept = [];
    assetsToDispose = [];
    bundleNotFound = false;
    if (data.type === 'reload') fullReload();
    else if (data.type === 'update') {
        // Remove error overlay if there is one
        if (typeof document !== 'undefined') removeErrorOverlay();
        let assets = data.assets;
        // Handle HMR Update
        let handled = assets.every((asset)=>{
            return asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
        });
        // Dispatch a custom event in case a bundle was not found. This might mean
        // an asset on the server changed and we should reload the page. This event
        // gives the client an opportunity to refresh without losing state
        // (e.g. via React Server Components). If e.preventDefault() is not called,
        // we will trigger a full page reload.
        if (handled && bundleNotFound && assets.some((a)=>a.envHash !== HMR_ENV_HASH) && typeof window !== 'undefined' && typeof CustomEvent !== 'undefined') handled = !window.dispatchEvent(new CustomEvent('parcelhmrreload', {
            cancelable: true
        }));
        if (handled) {
            console.clear();
            // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
            if (typeof window !== 'undefined' && typeof CustomEvent !== 'undefined') window.dispatchEvent(new CustomEvent('parcelhmraccept'));
            await hmrApplyUpdates(assets);
            hmrDisposeQueue();
            // Run accept callbacks. This will also re-execute other disposed assets in topological order.
            let processedAssets = {};
            for(let i = 0; i < assetsToAccept.length; i++){
                let id = assetsToAccept[i][1];
                if (!processedAssets[id]) {
                    hmrAccept(assetsToAccept[i][0], id);
                    processedAssets[id] = true;
                }
            }
        } else fullReload();
    }
    if (data.type === 'error') {
        // Log parcel errors to console
        for (let ansiDiagnostic of data.diagnostics.ansi){
            let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
            console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
        }
        if (typeof document !== 'undefined') {
            // Render the fancy html overlay
            removeErrorOverlay();
            var overlay = createErrorOverlay(data.diagnostics.html);
            // $FlowFixMe
            document.body.appendChild(overlay);
        }
    }
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] \u2728 Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="${protocol === 'wss' ? 'https' : 'http'}://${hostname}:${port}/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, '') : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          \u{1F6A8} ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + '</div>').join('')}
        </div>
        ${diagnostic.documentation ? `<div>\u{1F4DD} <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ''}
      </div>
    `;
    }
    errorHTML += '</div>';
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if (typeof location !== 'undefined' && 'reload' in location) location.reload();
    else if (typeof extCtx !== 'undefined' && extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
    else try {
        let { workerData, parentPort } = module.bundle.root('node:worker_threads') /*: any*/ ;
        if (workerData !== null && workerData !== void 0 && workerData.__parcel) parentPort.postMessage('restart');
    } catch (err) {
        console.error("[parcel] \u26A0\uFE0F An HMR update was not accepted. Please restart the process.");
    }
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var href = link.getAttribute('href');
    if (!href) return;
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute('href', // $FlowFixMe
    href.split('?')[0] + '?' + Date.now());
    // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout || typeof document === 'undefined') return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href /*: string */  = links[i].getAttribute('href');
            var hostname = getHostname();
            var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === 'js') {
        if (typeof document !== 'undefined') {
            let script = document.createElement('script');
            script.src = asset.url + '?t=' + Date.now();
            if (asset.outputFormat === 'esmodule') script.type = 'module';
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === 'function') {
            // Worker scripts
            if (asset.outputFormat === 'esmodule') return import(asset.url + '?t=' + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + '?t=' + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension fix
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3 && typeof ServiceWorkerGlobalScope != 'undefined' && global instanceof ServiceWorkerGlobalScope) {
                        extCtx.runtime.reload();
                        return;
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle /*: ParcelRequire */ , asset /*:  HMRAsset */ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === 'css') reloadCSS();
    else if (asset.type === 'js') {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
            // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        }
        // Always traverse to the parent bundle, even if we already replaced the asset in this bundle.
        // This is required in case modules are duplicated. We need to ensure all instances have the updated code.
        if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        }
        // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id];
        // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    checkedAssets = {};
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
    // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else if (a !== null) {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) {
            bundleNotFound = true;
            return true;
        }
        return hmrAcceptCheckOne(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return null;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    if (!cached) return true;
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
    return false;
}
function hmrDisposeQueue() {
    // Dispose all old assets.
    for(let i = 0; i < assetsToDispose.length; i++){
        let id = assetsToDispose[i][1];
        if (!disposedAssets[id]) {
            hmrDispose(assetsToDispose[i][0], id);
            disposedAssets[id] = true;
        }
    }
    assetsToDispose = [];
}
function hmrDispose(bundle /*: ParcelRequire */ , id /*: string */ ) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle /*: ParcelRequire */ , id /*: string */ ) {
    // Execute the module.
    bundle(id);
    // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
        let assetsToAlsoAccept = [];
        cached.hot._acceptCallbacks.forEach(function(cb) {
            let additionalAssets = cb(function() {
                return getParents(module.bundle.root, id);
            });
            if (Array.isArray(additionalAssets) && additionalAssets.length) assetsToAlsoAccept.push(...additionalAssets);
        });
        if (assetsToAlsoAccept.length) {
            let handled = assetsToAlsoAccept.every(function(a) {
                return hmrAcceptCheck(a[0], a[1]);
            });
            if (!handled) return fullReload();
            hmrDisposeQueue();
        }
    }
}

},{}],"fILKw":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "UltimateFrisbeeGame", ()=>UltimateFrisbeeGame);
var _localStorageJs = require("./core/local-storage.js");
var _assetLoaderJs = require("./core/asset-loader.js");
var _gameStateJs = require("./core/game-state.js");
var _physicsEngineJs = require("./logic/physics-engine.js");
var _aiControllerJs = require("./logic/ai-controller.js");
var _audioManagerJs = require("./logic/audio-manager.js");
var _canvasRendererJs = require("./presentation/canvas-renderer.js");
var _inputHandlerJs = require("./presentation/input-handler.js");
var _gameControllerJs = require("./controllers/game-controller.js");
var _configJs = require("./config.js");
/**
 * Main application entry point
 */ class UltimateFrisbeeGame {
    constructor(){
        this.canvas = null;
        this.gameController = null;
        this.localStorage = new (0, _localStorageJs.LocalStorage)();
    }
    async initialize() {
        try {
            // Create canvas
            this.createCanvas();
            // Initialize core systems
            const assetLoader = new (0, _assetLoaderJs.AssetLoader)();
            const gameState = new (0, _gameStateJs.GameState)();
            // Load saved settings
            this.loadSettings(gameState);
            // Initialize game systems
            const physicsEngine = new (0, _physicsEngineJs.PhysicsEngine)();
            const aiController = new (0, _aiControllerJs.AIController)(gameState);
            const audioManager = new (0, _audioManagerJs.AudioManager)(assetLoader);
            const renderer = new (0, _canvasRendererJs.CanvasRenderer)(this.canvas, assetLoader);
            const inputHandler = new (0, _inputHandlerJs.InputHandler)(this.canvas);
            // Load sprites asynchronously
            this.loadSpritesSync(assetLoader);
            // Initialize audio
            await audioManager.initialize();
            // Create game controller AFTER sprites are loaded
            this.gameController = new (0, _gameControllerJs.GameController)(gameState, physicsEngine, aiController, audioManager, renderer, inputHandler);
            console.log('Ultimate Frisbee Game initialized successfully!');
        } catch (error) {
            console.error('Failed to initialize game:', error);
            this.showError('Failed to load game. Please refresh the page.');
        }
    }
    createCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.width = (0, _configJs.CONFIG).CANVAS_WIDTH;
        this.canvas.height = (0, _configJs.CONFIG).CANVAS_HEIGHT;
        this.canvas.style.border = '2px solid #333';
        this.canvas.style.background = (0, _configJs.CONFIG).COLORS.FIELD;
        const app = document.getElementById('app');
        if (app) app.appendChild(this.canvas);
        else document.body.appendChild(this.canvas);
    }
    loadSettings(gameState) {
        const settings = this.localStorage.load('gameSettings', {
            difficulty: 'medium',
            soundEnabled: true,
            musicEnabled: true
        });
        gameState.setState('gameSettings', settings);
    }
    saveSettings(gameState) {
        const settings = gameState.getState('gameSettings');
        this.localStorage.save('gameSettings', settings);
    }
    loadSpritesSync(assetLoader) {
        console.log('Loading sprites asynchronously...');
        // Create images and load them without blocking
        const redImg = new Image();
        const blueImg = new Image();
        const frisbeeImg = new Image();
        redImg.onload = ()=>{
            assetLoader.assets.set('player-team1', redImg);
            console.log('Red sprite loaded');
        };
        blueImg.onload = ()=>{
            assetLoader.assets.set('player-team2', blueImg);
            console.log('Blue sprite loaded');
        };
        frisbeeImg.onload = ()=>{
            assetLoader.assets.set('frisbee', frisbeeImg);
            console.log('Frisbee sprite loaded');
        };
        // Set sources to start loading
        redImg.src = './player-red.png';
        blueImg.src = './player-blue.png';
        frisbeeImg.src = './frisbee.png';
        console.log('Sprite loading initiated, game will continue...');
    }
    showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: #ff4444;
            color: white;
            padding: 20px;
            border-radius: 5px;
            font-family: monospace;
            text-align: center;
            z-index: 1000;
        `;
        errorDiv.textContent = message;
        document.body.appendChild(errorDiv);
    }
}
// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', async ()=>{
    const game = new UltimateFrisbeeGame();
    await game.initialize();
});
// Handle page visibility changes
document.addEventListener('visibilitychange', ()=>{
    if (document.hidden) // Pause game when tab is not visible
    console.log('Game paused due to tab visibility');
});
// Handle window resize
window.addEventListener('resize', ()=>{
// Could implement responsive canvas sizing here if needed
});

},{"./core/local-storage.js":"apJHB","./core/asset-loader.js":"idQZk","./core/game-state.js":"gr4qO","./logic/physics-engine.js":"fyWTm","./logic/ai-controller.js":"eawOQ","./logic/audio-manager.js":"emx49","./presentation/canvas-renderer.js":"gzDyv","./presentation/input-handler.js":"j1rTw","./controllers/game-controller.js":"1IrqE","./config.js":"8oaOz","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"apJHB":[function(require,module,exports,__globalThis) {
/**
 * Local Storage utility for game data persistence
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "LocalStorage", ()=>LocalStorage);
class LocalStorage {
    constructor(){
        this.prefix = 'ultimate-frisbee-';
    }
    save(key, data) {
        try {
            const serialized = JSON.stringify(data);
            localStorage.setItem(this.prefix + key, serialized);
            return true;
        } catch (error) {
            console.error('Failed to save to localStorage:', error);
            return false;
        }
    }
    load(key, defaultValue = null) {
        try {
            const item = localStorage.getItem(this.prefix + key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (error) {
            console.error('Failed to load from localStorage:', error);
            return defaultValue;
        }
    }
    remove(key) {
        try {
            localStorage.removeItem(this.prefix + key);
            return true;
        } catch (error) {
            console.error('Failed to remove from localStorage:', error);
            return false;
        }
    }
    clear() {
        try {
            const keys = Object.keys(localStorage);
            keys.forEach((key)=>{
                if (key.startsWith(this.prefix)) localStorage.removeItem(key);
            });
            return true;
        } catch (error) {
            console.error('Failed to clear localStorage:', error);
            return false;
        }
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"jnFvT":[function(require,module,exports,__globalThis) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, '__esModule', {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === 'default' || key === '__esModule' || Object.prototype.hasOwnProperty.call(dest, key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"idQZk":[function(require,module,exports,__globalThis) {
/**
 * Asset Loader for sprites and audio files
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "AssetLoader", ()=>AssetLoader);
class AssetLoader {
    constructor(){
        this.assets = new Map();
        this.loadPromises = new Map();
    }
    async loadImage(name, path) {
        if (this.assets.has(name)) {
            console.log(`Asset ${name} already loaded`);
            return this.assets.get(name);
        }
        if (this.loadPromises.has(name)) return this.loadPromises.get(name);
        console.log(`Loading image: ${name} from ${path}`);
        const promise = new Promise((resolve, reject)=>{
            const img = new Image();
            img.onload = ()=>{
                console.log(`Successfully loaded image: ${name}`);
                this.assets.set(name, img);
                this.loadPromises.delete(name);
                resolve(img);
            };
            img.onerror = (error)=>{
                console.error(`Failed to load image: ${name} from ${path}`, error);
                this.loadPromises.delete(name);
                reject(new Error(`Failed to load image: ${path}`));
            };
            img.src = path;
        });
        this.loadPromises.set(name, promise);
        return promise;
    }
    async loadAudio(name, path) {
        if (this.assets.has(name)) return this.assets.get(name);
        if (this.loadPromises.has(name)) return this.loadPromises.get(name);
        const promise = new Promise((resolve, reject)=>{
            const audio = new Audio();
            audio.oncanplaythrough = ()=>{
                this.assets.set(name, audio);
                this.loadPromises.delete(name);
                resolve(audio);
            };
            audio.onerror = ()=>{
                this.loadPromises.delete(name);
                reject(new Error(`Failed to load audio: ${path}`));
            };
            audio.src = path;
        });
        this.loadPromises.set(name, promise);
        return promise;
    }
    async loadAssets(assetList) {
        console.log('Loading assets:', assetList);
        const promises = assetList.map((asset)=>{
            if (asset.type === 'image') return this.loadImage(asset.name, asset.path);
            else if (asset.type === 'audio') return this.loadAudio(asset.name, asset.path);
        });
        const results = await Promise.all(promises);
        console.log('Assets loaded:', this.assets);
        return results;
    }
    getAsset(name) {
        return this.assets.get(name);
    }
    hasAsset(name) {
        return this.assets.has(name);
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"gr4qO":[function(require,module,exports,__globalThis) {
/**
 * Central Game State Management
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "GameState", ()=>GameState);
class GameState {
    constructor(){
        this.state = {
            currentScreen: 'menu',
            score: {
                team1: 0,
                team2: 0
            },
            gameTime: 180,
            players: [],
            frisbee: null,
            field: null,
            gameSettings: {
                difficulty: 'medium',
                soundEnabled: true,
                musicEnabled: true
            }
        };
        this.listeners = new Map();
    }
    setState(key, value) {
        const oldValue = this.state[key];
        this.state[key] = value;
        this.notifyListeners(key, value, oldValue);
    }
    getState(key) {
        return key ? this.state[key] : this.state;
    }
    updateState(updates) {
        Object.keys(updates).forEach((key)=>{
            this.setState(key, updates[key]);
        });
    }
    subscribe(key, callback) {
        if (!this.listeners.has(key)) this.listeners.set(key, []);
        this.listeners.get(key).push(callback);
        return ()=>{
            const callbacks = this.listeners.get(key);
            const index = callbacks.indexOf(callback);
            if (index > -1) callbacks.splice(index, 1);
        };
    }
    notifyListeners(key, newValue, oldValue) {
        const callbacks = this.listeners.get(key);
        if (callbacks) callbacks.forEach((callback)=>{
            try {
                callback(newValue, oldValue);
            } catch (error) {
                console.error('Error in state listener:', error);
            }
        });
    }
    reset() {
        this.setState('score', {
            team1: 0,
            team2: 0
        });
        this.setState('gameTime', 180);
        this.setState('currentScreen', 'menu');
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"fyWTm":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Physics Engine for game mechanics
 */ parcelHelpers.export(exports, "PhysicsEngine", ()=>PhysicsEngine);
var _configJs = require("../config.js");
class PhysicsEngine {
    constructor(){
        this.gravity = 0;
        this.friction = (0, _configJs.CONFIG).FRICTION;
    }
    updatePosition(entity, deltaTime) {
        entity.x += entity.velocityX * deltaTime;
        entity.y += entity.velocityY * deltaTime;
        // Apply friction
        entity.velocityX *= this.friction;
        entity.velocityY *= this.friction;
        // Boundary checking
        this.checkBoundaries(entity);
    }
    checkBoundaries(entity) {
        const halfSize = entity.size / 2;
        if (entity.x - halfSize < 0) {
            entity.x = halfSize;
            entity.velocityX = 0;
        }
        if (entity.x + halfSize > (0, _configJs.CONFIG).CANVAS_WIDTH) {
            entity.x = (0, _configJs.CONFIG).CANVAS_WIDTH - halfSize;
            entity.velocityX = 0;
        }
        if (entity.y - halfSize < 0) {
            entity.y = halfSize;
            entity.velocityY = 0;
        }
        if (entity.y + halfSize > (0, _configJs.CONFIG).CANVAS_HEIGHT) {
            entity.y = (0, _configJs.CONFIG).CANVAS_HEIGHT - halfSize;
            entity.velocityY = 0;
        }
    }
    checkCollision(entity1, entity2) {
        const dx = entity1.x - entity2.x;
        const dy = entity1.y - entity2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const minDistance = (entity1.size + entity2.size) / 2;
        return distance < minDistance;
    }
    resolveCollision(entity1, entity2) {
        const dx = entity1.x - entity2.x;
        const dy = entity1.y - entity2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance === 0) return;
        const overlap = (entity1.size + entity2.size) / 2 - distance;
        const separationX = dx / distance * overlap * 0.5;
        const separationY = dy / distance * overlap * 0.5;
        entity1.x += separationX;
        entity1.y += separationY;
        entity2.x -= separationX;
        entity2.y -= separationY;
    }
    calculateThrowVector(fromX, fromY, toX, toY, power) {
        const dx = toX - fromX;
        const dy = toY - fromY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance === 0) return {
            x: 0,
            y: 0
        };
        const normalizedX = dx / distance;
        const normalizedY = dy / distance;
        return {
            x: normalizedX * power,
            y: normalizedY * power
        };
    }
}

},{"../config.js":"8oaOz","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"8oaOz":[function(require,module,exports,__globalThis) {
/**
 * Game Configuration
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "CONFIG", ()=>CONFIG);
const CONFIG = {
    // Canvas settings
    CANVAS_WIDTH: 800,
    CANVAS_HEIGHT: 600,
    TARGET_FPS: 60,
    // Field dimensions
    FIELD_WIDTH: 700,
    FIELD_HEIGHT: 500,
    END_ZONE_WIDTH: 100,
    // Player settings
    PLAYER_SIZE: 16,
    PLAYER_SPEED: 120,
    TEAM_SIZE: 3,
    // Frisbee settings
    FRISBEE_SIZE: 8,
    FRISBEE_SPEED: 200,
    THROW_POWER_MAX: 300,
    // Game settings
    GAME_DURATION: 180,
    SCORE_TO_WIN: 7,
    // Physics
    FRICTION: 0.95,
    COLLISION_DISTANCE: 20,
    // Colors (8-bit palette)
    COLORS: {
        FIELD: '#2a5d31',
        END_ZONE: '#1a4d21',
        FIELD_LINES: '#ffffff',
        TEAM1: '#ff4444',
        TEAM2: '#4444ff',
        FRISBEE: '#ffff44',
        UI_TEXT: '#ffffff',
        UI_BACKGROUND: '#000000'
    },
    // Asset paths
    ASSETS: {
        SPRITES: {
            PLAYER_TEAM1: '/Users/sitzeti/Documents/Projects/UltimateFrisbeeArcadeGame/assets/sprites/player-red.png',
            PLAYER_TEAM2: '/Users/sitzeti/Documents/Projects/UltimateFrisbeeArcadeGame/assets/sprites/player-blue.png',
            FRISBEE: '/Users/sitzeti/Documents/Projects/UltimateFrisbeeArcadeGame/assets/sprites/frisbee.png',
            FIELD_MARKER: '/Users/sitzeti/Documents/Projects/UltimateFrisbeeArcadeGame/assets/sprites/field-marker.png'
        },
        AUDIO: {
            THROW: '/Users/sitzeti/Documents/Projects/UltimateFrisbeeArcadeGame/assets/audio/throw.mp3',
            CATCH: '/Users/sitzeti/Documents/Projects/UltimateFrisbeeArcadeGame/assets/audio/catch.mp3',
            SCORE: '/Users/sitzeti/Documents/Projects/UltimateFrisbeeArcadeGame/assets/audio/score.mp3',
            WHISTLE: '/Users/sitzeti/Documents/Projects/UltimateFrisbeeArcadeGame/assets/audio/whistle.mp3',
            BACKGROUND_MUSIC: '/Users/sitzeti/Documents/Projects/UltimateFrisbeeArcadeGame/assets/audio/background.mp3'
        }
    }
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"eawOQ":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * AI Controller for computer opponents
 */ parcelHelpers.export(exports, "AIController", ()=>AIController);
var _configJs = require("../config.js");
class AIController {
    constructor(gameState){
        this.gameState = gameState;
        this.difficulty = 'medium';
        this.reactionTime = 0.5; // seconds
        this.lastDecision = 0;
    }
    update(deltaTime, players, frisbee) {
        this.lastDecision += deltaTime;
        if (this.lastDecision < this.reactionTime) return;
        const aiPlayers = players.filter((p)=>p.isAI);
        aiPlayers.forEach((player)=>{
            this.updatePlayerAI(player, frisbee, players, deltaTime);
        });
        this.lastDecision = 0;
    }
    updatePlayerAI(player, frisbee, allPlayers, deltaTime) {
        if (player.hasFrisbee) this.handleOffensiveAI(player, frisbee, allPlayers);
        else this.handleDefensiveAI(player, frisbee, allPlayers);
    }
    handleOffensiveAI(player, frisbee, allPlayers) {
        const teammates = allPlayers.filter((p)=>p.team === player.team && p !== player);
        const opponents = allPlayers.filter((p)=>p.team !== player.team);
        // Find best teammate to throw to
        let bestTarget = null;
        let bestScore = -1;
        teammates.forEach((teammate)=>{
            const score = this.evaluateThrowTarget(player, teammate, opponents);
            if (score > bestScore) {
                bestScore = score;
                bestTarget = teammate;
            }
        });
        if (bestTarget && bestScore > 0.3) this.throwToTarget(player, bestTarget, frisbee);
    }
    handleDefensiveAI(player, frisbee, allPlayers) {
        const opponents = allPlayers.filter((p)=>p.team !== player.team);
        if (frisbee.isFlying) // Try to intercept frisbee
        this.moveTowards(player, frisbee.x, frisbee.y);
        else {
            // Mark nearest opponent
            const nearestOpponent = this.findNearestOpponent(player, opponents);
            if (nearestOpponent) this.markOpponent(player, nearestOpponent);
        }
    }
    evaluateThrowTarget(thrower, target, opponents) {
        const distance = this.getDistance(thrower, target);
        const distanceScore = Math.max(0, 1 - distance / 200);
        // Check if target is open
        const nearestDefender = this.findNearestOpponent(target, opponents);
        const openScore = nearestDefender ? Math.max(0, this.getDistance(target, nearestDefender) / 50 - 1) : 1;
        // Prefer forward progress
        const progressScore = target.y < thrower.y ? 0.5 : 0;
        return (distanceScore + openScore + progressScore) / 3;
    }
    throwToTarget(player, target, frisbee) {
        const power = Math.min((0, _configJs.CONFIG).THROW_POWER_MAX, this.getDistance(player, target) * 2);
        // Lead the target slightly
        const leadX = target.velocityX * 0.3;
        const leadY = target.velocityY * 0.3;
        frisbee.throw(player.x, player.y, target.x + leadX, target.y + leadY, power);
        player.hasFrisbee = false;
    }
    moveTowards(player, targetX, targetY) {
        const dx = targetX - player.x;
        const dy = targetY - player.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance > 5) {
            player.velocityX = dx / distance * (0, _configJs.CONFIG).PLAYER_SPEED;
            player.velocityY = dy / distance * (0, _configJs.CONFIG).PLAYER_SPEED;
        }
    }
    markOpponent(player, opponent) {
        const idealDistance = 30;
        const dx = opponent.x - player.x;
        const dy = opponent.y - player.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance > idealDistance + 10) this.moveTowards(player, opponent.x, opponent.y);
        else if (distance < idealDistance - 10) this.moveTowards(player, player.x - dx * 0.1, player.y - dy * 0.1);
    }
    findNearestOpponent(player, opponents) {
        let nearest = null;
        let minDistance = Infinity;
        opponents.forEach((opponent)=>{
            const distance = this.getDistance(player, opponent);
            if (distance < minDistance) {
                minDistance = distance;
                nearest = opponent;
            }
        });
        return nearest;
    }
    getDistance(entity1, entity2) {
        const dx = entity1.x - entity2.x;
        const dy = entity1.y - entity2.y;
        return Math.sqrt(dx * dx + dy * dy);
    }
    setDifficulty(difficulty) {
        this.difficulty = difficulty;
        switch(difficulty){
            case 'easy':
                this.reactionTime = 1.0;
                break;
            case 'medium':
                this.reactionTime = 0.5;
                break;
            case 'hard':
                this.reactionTime = 0.2;
                break;
        }
    }
}

},{"../config.js":"8oaOz","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"emx49":[function(require,module,exports,__globalThis) {
/**
 * Audio Manager for sound effects and music
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "AudioManager", ()=>AudioManager);
class AudioManager {
    constructor(assetLoader){
        this.assetLoader = assetLoader;
        this.sounds = new Map();
        this.music = null;
        this.soundEnabled = true;
        this.musicEnabled = true;
        this.masterVolume = 1.0;
        this.soundVolume = 0.7;
        this.musicVolume = 0.3;
    }
    async initialize() {
        // Initialize Web Audio API for programmatic sounds
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            // Try to load background music file
            await this.loadBackgroundMusic();
        } catch (error) {
            console.warn('Web Audio API not supported', error);
            this.audioContext = null;
        }
    }
    async loadBackgroundMusic() {
        console.log("\uD83C\uDFB5 Checking browser permissions and loading music...");
        console.log('Location:', window.location.href);
        console.log('Protocol:', window.location.protocol);
        // Check if running from file:// protocol
        if (window.location.protocol === 'file:') {
            console.warn("\u26A0\uFE0F Running from file:// protocol - audio may not load");
            console.log("\uD83D\uDCA1 Try running from http://localhost instead");
        }
        try {
            console.log("\uD83D\uDD0D Trying MP3 file...");
            this.music = new Audio('assets/audio/background-music.mp3');
            this.music.loop = true;
            this.music.volume = this.masterVolume * this.musicVolume;
            // Add detailed error logging
            this.music.addEventListener('error', (e)=>{
                console.error("\u274C MP3 Error details:", {
                    error: e.target.error,
                    networkState: e.target.networkState,
                    readyState: e.target.readyState,
                    src: e.target.src
                });
            });
            await new Promise((resolve, reject)=>{
                const timeout = setTimeout(()=>{
                    reject(new Error('MP3 load timeout'));
                }, 3000);
                this.music.addEventListener('canplaythrough', ()=>{
                    clearTimeout(timeout);
                    resolve();
                }, {
                    once: true
                });
                this.music.addEventListener('error', (e)=>{
                    clearTimeout(timeout);
                    reject(e);
                }, {
                    once: true
                });
                this.music.load();
            });
            console.log("\u2705 MP3 background music loaded successfully");
        } catch (error) {
            console.warn("\u274C MP3 failed, trying WAV:", error.message);
            try {
                console.log("\uD83D\uDD0D Trying WAV file...");
                this.music = new Audio('assets/audio/background-music.wav');
                this.music.loop = true;
                this.music.volume = this.masterVolume * this.musicVolume;
                this.music.addEventListener('error', (e)=>{
                    console.error("\u274C WAV Error details:", {
                        error: e.target.error,
                        networkState: e.target.networkState,
                        readyState: e.target.readyState,
                        src: e.target.src
                    });
                });
                await new Promise((resolve, reject)=>{
                    const timeout = setTimeout(()=>{
                        reject(new Error('WAV load timeout'));
                    }, 3000);
                    this.music.addEventListener('canplaythrough', ()=>{
                        clearTimeout(timeout);
                        resolve();
                    }, {
                        once: true
                    });
                    this.music.addEventListener('error', (e)=>{
                        clearTimeout(timeout);
                        reject(e);
                    }, {
                        once: true
                    });
                    this.music.load();
                });
                console.log("\u2705 WAV background music loaded successfully");
            } catch (wavError) {
                console.error("\u274C Both MP3 and WAV failed:", wavError.message);
                console.log("\uD83D\uDCA1 Suggestions:");
                console.log('- Check if files exist in assets/audio/');
                console.log('- Ensure running from http://localhost (not file://)');
                console.log('- Check browser console for CORS errors');
                console.log('- Verify audio file formats are supported');
                this.music = null;
            }
        }
    }
    createProgrammaticMusic() {
        if (!this.audioContext) return;
        this.musicGainNode = this.audioContext.createGain();
        this.musicGainNode.connect(this.audioContext.destination);
        this.musicGainNode.gain.setValueAtTime(this.masterVolume * this.musicVolume * 0.1, this.audioContext.currentTime);
        this.music = {
            playing: false,
            paused: false,
            volume: this.masterVolume * this.musicVolume,
            play: ()=>this.startProgrammaticMusic(),
            pause: ()=>this.stopProgrammaticMusic(),
            currentTime: 0,
            loop: true
        };
        console.log("\u2705 Programmatic background music ready");
    }
    startProgrammaticMusic() {
        if (!this.audioContext || this.music.playing) return;
        this.music.playing = true;
        this.playMelodyLoop();
    }
    stopProgrammaticMusic() {
        this.music.playing = false;
        if (this.melodyTimeout) clearTimeout(this.melodyTimeout);
    }
    playMelodyLoop() {
        if (!this.music.playing) return;
        const melody = [
            262,
            294,
            330,
            349,
            392,
            440,
            494,
            523
        ];
        const rhythm = [
            0.5,
            0.5,
            0.5,
            0.5,
            1,
            0.5,
            0.5,
            1
        ];
        let noteIndex = 0;
        const playNote = ()=>{
            if (!this.music.playing) return;
            const freq = melody[noteIndex % melody.length];
            const duration = rhythm[noteIndex % rhythm.length] * 0.3;
            const oscillator = this.audioContext.createOscillator();
            const noteGain = this.audioContext.createGain();
            oscillator.connect(noteGain);
            noteGain.connect(this.musicGainNode);
            oscillator.frequency.setValueAtTime(freq, this.audioContext.currentTime);
            oscillator.type = 'square';
            noteGain.gain.setValueAtTime(0.1, this.audioContext.currentTime);
            noteGain.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);
            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + duration);
            noteIndex++;
            this.melodyTimeout = setTimeout(playNote, duration * 1000);
        };
        playNote();
    }
    playSound(soundName, volume = 1.0) {
        if (!this.soundEnabled || !this.audioContext) return;
        try {
            const finalVolume = this.masterVolume * this.soundVolume * volume;
            switch(soundName){
                case 'throw':
                    this.playThrowSound(finalVolume);
                    break;
                case 'catch':
                    this.playCatchSound(finalVolume);
                    break;
                case 'score':
                    this.playScoreSound(finalVolume);
                    break;
                case 'whistle':
                    this.playWhistleSound(finalVolume);
                    break;
            }
        } catch (error) {
            console.warn(`Error playing sound: ${soundName}`, error);
        }
    }
    playThrowSound(volume) {
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        oscillator.frequency.setValueAtTime(200, this.audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(100, this.audioContext.currentTime + 0.2);
        gainNode.gain.setValueAtTime(volume * 0.3, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.2);
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.2);
    }
    playCatchSound(volume) {
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        oscillator.frequency.setValueAtTime(400, this.audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(600, this.audioContext.currentTime + 0.1);
        gainNode.gain.setValueAtTime(volume * 0.2, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.1);
    }
    playScoreSound(volume) {
        // Play a celebratory ascending tone
        const frequencies = [
            262,
            330,
            392,
            523
        ]; // C, E, G, C
        frequencies.forEach((freq, index)=>{
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            oscillator.frequency.setValueAtTime(freq, this.audioContext.currentTime + index * 0.1);
            gainNode.gain.setValueAtTime(volume * 0.2, this.audioContext.currentTime + index * 0.1);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + index * 0.1 + 0.2);
            oscillator.start(this.audioContext.currentTime + index * 0.1);
            oscillator.stop(this.audioContext.currentTime + index * 0.1 + 0.2);
        });
    }
    playWhistleSound(volume) {
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime);
        gainNode.gain.setValueAtTime(volume * 0.3, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.5);
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.5);
    }
    playMusic() {
        if (!this.musicEnabled || !this.music) {
            console.log("\uD83D\uDD07 Music disabled or not loaded");
            return;
        }
        try {
            this.music.volume = this.masterVolume * this.musicVolume;
            console.log(`\u{1F3B5} Attempting to play music at volume: ${this.music.volume}`);
            this.music.play().then(()=>{
                console.log("\u2705 Background music started playing");
            }).catch((error)=>{
                console.warn("\u274C Failed to play background music:", error.message);
                if (error.name === 'NotAllowedError') console.log("\uD83D\uDCA1 User interaction required - music will start after first click");
            });
        } catch (error) {
            console.warn('Error playing background music', error);
        }
    }
    stopMusic() {
        if (this.music) try {
            this.music.pause();
            this.music.currentTime = 0;
        } catch (error) {
            console.warn('Error stopping background music', error);
        }
    }
    pauseMusic() {
        if (this.music) try {
            this.music.pause();
        } catch (error) {
            console.warn('Error pausing background music', error);
        }
    }
    resumeMusic() {
        if (this.musicEnabled && this.music) try {
            this.music.play().catch((error)=>{
                console.warn('Failed to resume background music', error);
            });
        } catch (error) {
            console.warn('Error resuming background music', error);
        }
    }
    setSoundEnabled(enabled) {
        this.soundEnabled = enabled;
    }
    setMusicEnabled(enabled) {
        this.musicEnabled = enabled;
        if (!enabled) this.stopMusic();
        else this.playMusic();
    }
    setMasterVolume(volume) {
        this.masterVolume = Math.max(0, Math.min(1, volume));
        if (this.music) this.music.volume = this.masterVolume * this.musicVolume;
    }
    setSoundVolume(volume) {
        this.soundVolume = Math.max(0, Math.min(1, volume));
    }
    setMusicVolume(volume) {
        this.musicVolume = Math.max(0, Math.min(1, volume));
        if (this.music) this.music.volume = this.masterVolume * this.musicVolume;
    }
    // Game event handlers
    onThrow() {
        this.playSound('throw');
    }
    onCatch() {
        this.playSound('catch');
    }
    onScore() {
        this.playSound('score', 1.2);
    }
    onGameStart() {
        this.playSound('whistle');
        this.playMusic();
    }
    onGameEnd() {
        this.playSound('whistle');
        this.stopMusic();
    }
    onGamePause() {
        this.pauseMusic();
    }
    onGameResume() {
        this.resumeMusic();
    }
    // Call this after first user interaction to enable audio
    enableAudioContext() {
        if (this.audioContext && this.audioContext.state === 'suspended') this.audioContext.resume().then(()=>{
            console.log("\u2705 Audio context resumed");
        });
        // Try to play music if it failed before
        if (this.musicEnabled && this.music && this.music.paused) this.playMusic();
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"gzDyv":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Canvas Renderer for game graphics
 */ parcelHelpers.export(exports, "CanvasRenderer", ()=>CanvasRenderer);
var _configJs = require("../config.js");
class CanvasRenderer {
    constructor(canvas, assetLoader){
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.assetLoader = assetLoader;
        // Set canvas size
        this.canvas.width = (0, _configJs.CONFIG).CANVAS_WIDTH;
        this.canvas.height = (0, _configJs.CONFIG).CANVAS_HEIGHT;
        // Disable image smoothing for pixel-perfect 8-bit graphics
        this.ctx.imageSmoothingEnabled = false;
    }
    clear() {
        this.ctx.fillStyle = (0, _configJs.CONFIG).COLORS.FIELD;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    drawField() {
        // Draw field background
        this.ctx.fillStyle = (0, _configJs.CONFIG).COLORS.FIELD;
        this.ctx.fillRect(0, 0, (0, _configJs.CONFIG).CANVAS_WIDTH, (0, _configJs.CONFIG).CANVAS_HEIGHT);
        // Draw end zones
        this.ctx.fillStyle = (0, _configJs.CONFIG).COLORS.END_ZONE;
        this.ctx.fillRect(0, 0, (0, _configJs.CONFIG).END_ZONE_WIDTH, (0, _configJs.CONFIG).CANVAS_HEIGHT);
        this.ctx.fillRect((0, _configJs.CONFIG).CANVAS_WIDTH - (0, _configJs.CONFIG).END_ZONE_WIDTH, 0, (0, _configJs.CONFIG).END_ZONE_WIDTH, (0, _configJs.CONFIG).CANVAS_HEIGHT);
        // Draw field lines
        this.ctx.strokeStyle = (0, _configJs.CONFIG).COLORS.FIELD_LINES;
        this.ctx.lineWidth = 2;
        // End zone lines
        this.ctx.beginPath();
        this.ctx.moveTo((0, _configJs.CONFIG).END_ZONE_WIDTH, 0);
        this.ctx.lineTo((0, _configJs.CONFIG).END_ZONE_WIDTH, (0, _configJs.CONFIG).CANVAS_HEIGHT);
        this.ctx.moveTo((0, _configJs.CONFIG).CANVAS_WIDTH - (0, _configJs.CONFIG).END_ZONE_WIDTH, 0);
        this.ctx.lineTo((0, _configJs.CONFIG).CANVAS_WIDTH - (0, _configJs.CONFIG).END_ZONE_WIDTH, (0, _configJs.CONFIG).CANVAS_HEIGHT);
        this.ctx.stroke();
        // Center line
        this.ctx.beginPath();
        this.ctx.moveTo((0, _configJs.CONFIG).CANVAS_WIDTH / 2, 0);
        this.ctx.lineTo((0, _configJs.CONFIG).CANVAS_WIDTH / 2, (0, _configJs.CONFIG).CANVAS_HEIGHT);
        this.ctx.stroke();
    }
    drawPlayer(player) {
        const spriteName = player.team === 1 ? 'player-team1' : 'player-team2';
        const sprite = this.assetLoader.getAsset(spriteName);
        if (sprite && sprite.width > 0) this.ctx.drawImage(sprite, player.x - (0, _configJs.CONFIG).PLAYER_SIZE / 2, player.y - (0, _configJs.CONFIG).PLAYER_SIZE / 2, (0, _configJs.CONFIG).PLAYER_SIZE, (0, _configJs.CONFIG).PLAYER_SIZE);
        else {
            // Fallback to colored rectangles
            this.ctx.fillStyle = player.team === 1 ? (0, _configJs.CONFIG).COLORS.TEAM1 : (0, _configJs.CONFIG).COLORS.TEAM2;
            this.ctx.fillRect(player.x - (0, _configJs.CONFIG).PLAYER_SIZE / 2, player.y - (0, _configJs.CONFIG).PLAYER_SIZE / 2, (0, _configJs.CONFIG).PLAYER_SIZE, (0, _configJs.CONFIG).PLAYER_SIZE);
        }
        // Draw player number
        this.ctx.fillStyle = (0, _configJs.CONFIG).COLORS.UI_TEXT;
        this.ctx.font = '10px monospace';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(player.number.toString(), player.x, player.y - (0, _configJs.CONFIG).PLAYER_SIZE / 2 - 5);
        // Highlight player with frisbee
        if (player.hasFrisbee) {
            this.ctx.strokeStyle = (0, _configJs.CONFIG).COLORS.FRISBEE;
            this.ctx.lineWidth = 2;
            this.ctx.strokeRect(player.x - (0, _configJs.CONFIG).PLAYER_SIZE / 2 - 2, player.y - (0, _configJs.CONFIG).PLAYER_SIZE / 2 - 2, (0, _configJs.CONFIG).PLAYER_SIZE + 4, (0, _configJs.CONFIG).PLAYER_SIZE + 4);
        }
    }
    drawFrisbee(frisbee) {
        console.log('Drawing frisbee - visible:', frisbee.isVisible, 'flying:', frisbee.isFlying, 'pos:', frisbee.x, frisbee.y);
        if (!frisbee.isVisible) return;
        const sprite = this.assetLoader.getAsset('frisbee');
        if (sprite) this.ctx.drawImage(sprite, frisbee.x - (0, _configJs.CONFIG).FRISBEE_SIZE / 2, frisbee.y - (0, _configJs.CONFIG).FRISBEE_SIZE / 2, (0, _configJs.CONFIG).FRISBEE_SIZE, (0, _configJs.CONFIG).FRISBEE_SIZE);
        else {
            // Fallback to colored circle
            this.ctx.fillStyle = (0, _configJs.CONFIG).COLORS.FRISBEE;
            this.ctx.beginPath();
            this.ctx.arc(frisbee.x, frisbee.y, (0, _configJs.CONFIG).FRISBEE_SIZE / 2, 0, Math.PI * 2);
            this.ctx.fill();
        }
        // Draw trajectory line when flying
        if (frisbee.isFlying) {
            this.ctx.strokeStyle = (0, _configJs.CONFIG).COLORS.FRISBEE;
            this.ctx.lineWidth = 1;
            this.ctx.setLineDash([
                5,
                5
            ]);
            this.ctx.beginPath();
            this.ctx.moveTo(frisbee.startX, frisbee.startY);
            this.ctx.lineTo(frisbee.x, frisbee.y);
            this.ctx.stroke();
            this.ctx.setLineDash([]);
        }
    }
    drawUI(gameState) {
        const state = gameState.getState();
        // Draw score
        this.ctx.fillStyle = (0, _configJs.CONFIG).COLORS.UI_TEXT;
        this.ctx.font = '20px monospace';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(`${state.score.team1} - ${state.score.team2}`, (0, _configJs.CONFIG).CANVAS_WIDTH / 2, 30);
        // Draw timer
        const minutes = Math.floor(state.gameTime / 60);
        const seconds = Math.floor(state.gameTime % 60);
        const timeString = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        this.ctx.fillText(timeString, (0, _configJs.CONFIG).CANVAS_WIDTH / 2, 55);
        // Draw game status
        if (state.currentScreen === 'pause') this.drawPauseOverlay();
        else if (state.currentScreen === 'gameOver') this.drawGameOverOverlay(state);
    }
    drawPauseOverlay() {
        // Semi-transparent overlay
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        this.ctx.fillRect(0, 0, (0, _configJs.CONFIG).CANVAS_WIDTH, (0, _configJs.CONFIG).CANVAS_HEIGHT);
        // Pause text
        this.ctx.fillStyle = (0, _configJs.CONFIG).COLORS.UI_TEXT;
        this.ctx.font = '40px monospace';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('PAUSED', (0, _configJs.CONFIG).CANVAS_WIDTH / 2, (0, _configJs.CONFIG).CANVAS_HEIGHT / 2);
        this.ctx.font = '16px monospace';
        this.ctx.fillText('Press SPACE to resume', (0, _configJs.CONFIG).CANVAS_WIDTH / 2, (0, _configJs.CONFIG).CANVAS_HEIGHT / 2 + 40);
    }
    drawGameOverOverlay(state) {
        // Semi-transparent overlay
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        this.ctx.fillRect(0, 0, (0, _configJs.CONFIG).CANVAS_WIDTH, (0, _configJs.CONFIG).CANVAS_HEIGHT);
        // Game over text
        this.ctx.fillStyle = (0, _configJs.CONFIG).COLORS.UI_TEXT;
        this.ctx.font = '40px monospace';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('GAME OVER', (0, _configJs.CONFIG).CANVAS_WIDTH / 2, (0, _configJs.CONFIG).CANVAS_HEIGHT / 2 - 40);
        // Winner announcement
        const winner = state.score.team1 > state.score.team2 ? 'Red Team' : 'Blue Team';
        this.ctx.font = '24px monospace';
        this.ctx.fillText(`${winner} Wins!`, (0, _configJs.CONFIG).CANVAS_WIDTH / 2, (0, _configJs.CONFIG).CANVAS_HEIGHT / 2);
        // Final score
        this.ctx.font = '20px monospace';
        this.ctx.fillText(`Final Score: ${state.score.team1} - ${state.score.team2}`, (0, _configJs.CONFIG).CANVAS_WIDTH / 2, (0, _configJs.CONFIG).CANVAS_HEIGHT / 2 + 40);
        this.ctx.font = '16px monospace';
        this.ctx.fillText('Press R to restart', (0, _configJs.CONFIG).CANVAS_WIDTH / 2, (0, _configJs.CONFIG).CANVAS_HEIGHT / 2 + 80);
    }
    drawMenu() {
        this.clear();
        // Title
        this.ctx.fillStyle = (0, _configJs.CONFIG).COLORS.UI_TEXT;
        this.ctx.font = '48px monospace';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('ULTIMATE', (0, _configJs.CONFIG).CANVAS_WIDTH / 2, 80);
        this.ctx.fillText('FRISBEE', (0, _configJs.CONFIG).CANVAS_WIDTH / 2, 130);
        // Welcome message
        this.ctx.font = '16px monospace';
        this.ctx.fillStyle = '#88ff88';
        this.ctx.fillText('Welcome to the ultimate arcade frisbee experience!', (0, _configJs.CONFIG).CANVAS_WIDTH / 2, 165);
        this.ctx.fillStyle = (0, _configJs.CONFIG).COLORS.UI_TEXT;
        // Controls section
        this.ctx.font = '20px monospace';
        this.ctx.fillText('CONTROLS', (0, _configJs.CONFIG).CANVAS_WIDTH / 2, 200);
        this.ctx.font = '14px monospace';
        this.ctx.textAlign = 'left';
        const leftCol = 200;
        const rightCol = 500;
        let y = 240;
        // Movement controls
        this.ctx.fillText('MOVEMENT:', leftCol, y);
        this.ctx.fillText('WASD or Arrow Keys', rightCol, y);
        y += 25;
        // Throwing
        this.ctx.fillText('THROW FRISBEE:', leftCol, y);
        this.ctx.fillText('Click target location', rightCol, y);
        y += 25;
        // Game controls
        this.ctx.fillText('START GAME:', leftCol, y);
        this.ctx.fillText('SPACE', rightCol, y);
        y += 25;
        this.ctx.fillText('PAUSE/RESUME:', leftCol, y);
        this.ctx.fillText('SPACE or ESC', rightCol, y);
        y += 25;
        this.ctx.fillText('RESTART GAME:', leftCol, y);
        this.ctx.fillText('R', rightCol, y);
        y += 25;
        this.ctx.fillText('MAIN MENU:', leftCol, y);
        this.ctx.fillText('M', rightCol, y);
        y += 25;
        this.ctx.fillText('SELECT PLAYER:', leftCol, y);
        this.ctx.fillText('1, 2, 3', rightCol, y);
        y += 40;
        // Game rules
        this.ctx.font = '16px monospace';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('OBJECTIVE: Score by reaching opponent\'s end zone with frisbee', (0, _configJs.CONFIG).CANVAS_WIDTH / 2, y);
        y += 25;
        this.ctx.fillText("3 minutes \u2022 First to 7 points wins", (0, _configJs.CONFIG).CANVAS_WIDTH / 2, y);
        y += 40;
        // Start instruction
        this.ctx.font = '18px monospace';
        this.ctx.fillStyle = '#ffff44';
        this.ctx.fillText('Press SPACE to start!', (0, _configJs.CONFIG).CANVAS_WIDTH / 2, y);
    }
}

},{"../config.js":"8oaOz","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"j1rTw":[function(require,module,exports,__globalThis) {
/**
 * Input Handler for keyboard and mouse input
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "InputHandler", ()=>InputHandler);
class InputHandler {
    constructor(canvas){
        this.canvas = canvas;
        this.keys = new Set();
        this.mouse = {
            x: 0,
            y: 0,
            clicked: false
        };
        this.callbacks = new Map();
        this.setupEventListeners();
    }
    setupEventListeners() {
        // Keyboard events
        document.addEventListener('keydown', (e)=>this.handleKeyDown(e));
        document.addEventListener('keyup', (e)=>this.handleKeyUp(e));
        // Mouse events
        this.canvas.addEventListener('mousemove', (e)=>this.handleMouseMove(e));
        this.canvas.addEventListener('mousedown', (e)=>this.handleMouseDown(e));
        this.canvas.addEventListener('mouseup', (e)=>this.handleMouseUp(e));
        // Prevent context menu on right click
        this.canvas.addEventListener('contextmenu', (e)=>e.preventDefault());
    }
    handleKeyDown(event) {
        this.keys.add(event.code);
        this.triggerCallback('keydown', event.code);
    }
    handleKeyUp(event) {
        this.keys.delete(event.code);
        this.triggerCallback('keyup', event.code);
    }
    handleMouseMove(event) {
        const rect = this.canvas.getBoundingClientRect();
        this.mouse.x = event.clientX - rect.left;
        this.mouse.y = event.clientY - rect.top;
        this.triggerCallback('mousemove', this.mouse);
    }
    handleMouseDown(event) {
        this.mouse.clicked = true;
        this.triggerCallback('mousedown', this.mouse);
    }
    handleMouseUp(event) {
        this.mouse.clicked = false;
        this.triggerCallback('mouseup', this.mouse);
    }
    isKeyPressed(keyCode) {
        return this.keys.has(keyCode);
    }
    getMovementVector() {
        let x = 0;
        let y = 0;
        if (this.isKeyPressed('KeyA') || this.isKeyPressed('ArrowLeft')) x -= 1;
        if (this.isKeyPressed('KeyD') || this.isKeyPressed('ArrowRight')) x += 1;
        if (this.isKeyPressed('KeyW') || this.isKeyPressed('ArrowUp')) y -= 1;
        if (this.isKeyPressed('KeyS') || this.isKeyPressed('ArrowDown')) y += 1;
        // Normalize diagonal movement
        if (x !== 0 && y !== 0) {
            const length = Math.sqrt(x * x + y * y);
            x /= length;
            y /= length;
        }
        return {
            x,
            y
        };
    }
    isActionPressed(action) {
        switch(action){
            case 'pause':
                return this.isKeyPressed('Space') || this.isKeyPressed('Escape');
            case 'restart':
                return this.isKeyPressed('KeyR');
            case 'throw':
                return this.mouse.clicked;
            default:
                return false;
        }
    }
    getMousePosition() {
        return {
            x: this.mouse.x,
            y: this.mouse.y
        };
    }
    on(event, callback) {
        if (!this.callbacks.has(event)) this.callbacks.set(event, []);
        this.callbacks.get(event).push(callback);
    }
    off(event, callback) {
        const callbacks = this.callbacks.get(event);
        if (callbacks) {
            const index = callbacks.indexOf(callback);
            if (index > -1) callbacks.splice(index, 1);
        }
    }
    triggerCallback(event, data) {
        const callbacks = this.callbacks.get(event);
        if (callbacks) callbacks.forEach((callback)=>{
            try {
                callback(data);
            } catch (error) {
                console.error('Error in input callback:', error);
            }
        });
    }
    destroy() {
        document.removeEventListener('keydown', this.handleKeyDown);
        document.removeEventListener('keyup', this.handleKeyUp);
        this.canvas.removeEventListener('mousemove', this.handleMouseMove);
        this.canvas.removeEventListener('mousedown', this.handleMouseDown);
        this.canvas.removeEventListener('mouseup', this.handleMouseUp);
        this.canvas.removeEventListener('contextmenu', (e)=>e.preventDefault());
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"1IrqE":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Game Controller - Central game orchestration
 */ parcelHelpers.export(exports, "GameController", ()=>GameController);
var _configJs = require("../config.js");
class GameController {
    constructor(gameState, physicsEngine, aiController, audioManager, renderer, inputHandler){
        this.gameState = gameState;
        this.physics = physicsEngine;
        this.ai = aiController;
        this.audio = audioManager;
        this.renderer = renderer;
        this.input = inputHandler;
        this.players = [];
        this.frisbee = null;
        this.lastTime = 0;
        this.gameLoop = null;
        this.initializeGame();
        this.setupInputHandlers();
    }
    initializeGame() {
        this.createPlayers();
        this.createFrisbee();
        this.gameState.setState('currentScreen', 'menu');
        this.startMenuLoop();
    }
    createPlayers() {
        this.players = [];
        // Team 1 (Red) - Human controlled
        for(let i = 0; i < (0, _configJs.CONFIG).TEAM_SIZE; i++)this.players.push({
            id: `team1_${i}`,
            team: 1,
            number: i + 1,
            x: 150 + i * 50,
            y: 200 + i * 100,
            velocityX: 0,
            velocityY: 0,
            size: (0, _configJs.CONFIG).PLAYER_SIZE,
            hasFrisbee: i === 0,
            isAI: false,
            isSelected: i === 0
        });
        // Team 2 (Blue) - AI controlled
        for(let i = 0; i < (0, _configJs.CONFIG).TEAM_SIZE; i++)this.players.push({
            id: `team2_${i}`,
            team: 2,
            number: i + 1,
            x: 650 - i * 50,
            y: 200 + i * 100,
            velocityX: 0,
            velocityY: 0,
            size: (0, _configJs.CONFIG).PLAYER_SIZE,
            hasFrisbee: false,
            isAI: true,
            isSelected: false
        });
    }
    createFrisbee() {
        this.frisbee = {
            x: this.players[0].x,
            y: this.players[0].y,
            velocityX: 0,
            velocityY: 0,
            size: (0, _configJs.CONFIG).FRISBEE_SIZE,
            isFlying: false,
            isVisible: false,
            startX: 0,
            startY: 0,
            owner: this.players[0]
        };
    }
    setupInputHandlers() {
        this.input.on('keydown', (key)=>{
            const state = this.gameState.getState('currentScreen');
            if (key === 'Space') {
                // Enable audio on first interaction
                this.audio.enableAudioContext();
                if (state === 'menu') this.startGame();
                else if (state === 'game') this.pauseGame();
                else if (state === 'pause') this.resumeGame();
            }
            if (key === 'KeyR') this.restartGame();
            if (key === 'KeyM') this.goToMenu();
            // Player selection with number keys (1, 2, 3)
            if (key === 'Digit1') this.selectPlayer(1);
            if (key === 'Digit2') this.selectPlayer(2);
            if (key === 'Digit3') this.selectPlayer(3);
        });
        this.input.on('mousedown', (mouse)=>{
            // Enable audio on first interaction
            this.audio.enableAudioContext();
            if (this.gameState.getState('currentScreen') === 'game') this.handleThrow(mouse.x, mouse.y);
        });
    }
    startGame() {
        this.stopGameLoop();
        this.gameState.setState('currentScreen', 'game');
        this.gameState.setState('gameTime', (0, _configJs.CONFIG).GAME_DURATION);
        try {
            this.audio.onGameStart();
        } catch (e) {
            console.warn('Audio failed to start:', e);
        }
        this.startGameLoop();
    }
    pauseGame() {
        this.gameState.setState('currentScreen', 'pause');
        this.audio.onGamePause();
        this.stopGameLoop();
    }
    resumeGame() {
        this.gameState.setState('currentScreen', 'game');
        this.audio.onGameResume();
        this.startGameLoop();
    }
    restartGame() {
        this.gameState.reset();
        this.initializeGame();
        this.startGame();
    }
    goToMenu() {
        this.stopGameLoop();
        this.gameState.reset();
        this.initializeGame();
    }
    selectPlayer(playerNumber) {
        // Only allow selecting team 1 (human) players
        const targetPlayer = this.players.find((p)=>p.team === 1 && p.number === playerNumber);
        if (targetPlayer) {
            // Clear all selections
            this.players.forEach((p)=>p.isSelected = false);
            // Select the target player
            targetPlayer.isSelected = true;
            console.log(`Selected player ${playerNumber}`);
        }
    }
    startGameLoop() {
        this.stopGameLoop();
        this.lastTime = performance.now();
        this.gameLoop = requestAnimationFrame((time)=>this.update(time));
    }
    startMenuLoop() {
        if (this.gameLoop) return;
        this.gameLoop = requestAnimationFrame(()=>this.renderMenu());
    }
    renderMenu() {
        this.render();
        if (this.gameState.getState('currentScreen') === 'menu') this.gameLoop = requestAnimationFrame(()=>this.renderMenu());
    }
    stopGameLoop() {
        if (this.gameLoop) {
            cancelAnimationFrame(this.gameLoop);
            this.gameLoop = null;
        }
    }
    update(currentTime) {
        const deltaTime = (currentTime - this.lastTime) / 1000;
        this.lastTime = currentTime;
        if (this.gameState.getState('currentScreen') === 'game') {
            this.updateGame(deltaTime);
            this.updateTimer(deltaTime);
        }
        this.render();
        if (this.gameState.getState('currentScreen') === 'game') this.gameLoop = requestAnimationFrame((time)=>this.update(time));
    }
    updateGame(deltaTime) {
        this.updatePlayerMovement(deltaTime);
        this.updateFrisbee(deltaTime);
        // this.ai.update(deltaTime, this.players, this.frisbee); // Disabled - AI handled in updatePlayerMovement
        this.checkCollisions();
        this.checkScoring();
    }
    updatePlayerMovement(deltaTime) {
        const selectedPlayer = this.players.find((p)=>p.isSelected);
        if (selectedPlayer && !selectedPlayer.isAI && !selectedPlayer.hasFrisbee) {
            const movement = this.input.getMovementVector();
            selectedPlayer.velocityX = movement.x * (0, _configJs.CONFIG).PLAYER_SPEED;
            selectedPlayer.velocityY = movement.y * (0, _configJs.CONFIG).PLAYER_SPEED;
        }
        // Basic AI for inactive red team players
        this.players.forEach((redPlayer)=>{
            if (!redPlayer.isAI && !redPlayer.isSelected && !redPlayer.hasFrisbee) {
                const humanWithFrisbee = this.players.find((p)=>p.team === 1 && p.hasFrisbee);
                const aiWithFrisbee = this.players.find((p)=>p.team === 2 && p.hasFrisbee);
                if (this.frisbee.isVisible && this.frisbee.isFlying) {
                    // Chase flying frisbee
                    const dx = this.frisbee.x - redPlayer.x;
                    const dy = this.frisbee.y - redPlayer.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance > 10) {
                        redPlayer.velocityX = dx / distance * (0, _configJs.CONFIG).PLAYER_SPEED * 0.7;
                        redPlayer.velocityY = dy / distance * (0, _configJs.CONFIG).PLAYER_SPEED * 0.7;
                    }
                } else if (this.frisbee.isVisible && !this.frisbee.isFlying) {
                    // Chase loose frisbee
                    const dx = this.frisbee.x - redPlayer.x;
                    const dy = this.frisbee.y - redPlayer.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance > 10) {
                        redPlayer.velocityX = dx / distance * (0, _configJs.CONFIG).PLAYER_SPEED * 0.8;
                        redPlayer.velocityY = dy / distance * (0, _configJs.CONFIG).PLAYER_SPEED * 0.8;
                    }
                } else if (aiWithFrisbee) {
                    // Defensive: pressure ball carrier while maintaining spacing
                    const teammates = this.players.filter((p)=>p.team === 1 && p !== redPlayer);
                    let targetX = aiWithFrisbee.x;
                    let targetY = aiWithFrisbee.y;
                    // Avoid clustering with teammates on defense
                    teammates.forEach((teammate)=>{
                        const dx = redPlayer.x - teammate.x;
                        const dy = redPlayer.y - teammate.y;
                        const distance = Math.sqrt(dx * dx + dy * dy);
                        if (distance < 60) {
                            targetX += dx * 0.3;
                            targetY += dy * 0.3;
                        }
                    });
                    const dx = targetX - redPlayer.x;
                    const dy = targetY - redPlayer.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance > 30) {
                        redPlayer.velocityX = dx / distance * (0, _configJs.CONFIG).PLAYER_SPEED * 0.7;
                        redPlayer.velocityY = dy / distance * (0, _configJs.CONFIG).PLAYER_SPEED * 0.7;
                    } else {
                        // Keep moving around the ball carrier
                        redPlayer.velocityX = (Math.random() - 0.5) * (0, _configJs.CONFIG).PLAYER_SPEED * 0.4;
                        redPlayer.velocityY = (Math.random() - 0.5) * (0, _configJs.CONFIG).PLAYER_SPEED * 0.4;
                    }
                } else if (humanWithFrisbee) {
                    // Offensive: spread out and get open for passes
                    const teammates = this.players.filter((p)=>p.team === 1 && p !== redPlayer);
                    const opponents = this.players.filter((p)=>p.team === 2);
                    let targetX = (0, _configJs.CONFIG).CANVAS_WIDTH - 50; // Toward goal
                    let targetY = (0, _configJs.CONFIG).CANVAS_HEIGHT / 2 + (Math.random() - 0.5) * 120;
                    // Spread out from teammates
                    teammates.forEach((teammate)=>{
                        const dx = redPlayer.x - teammate.x;
                        const dy = redPlayer.y - teammate.y;
                        const distance = Math.sqrt(dx * dx + dy * dy);
                        if (distance < 70) {
                            targetX += dx * 0.4;
                            targetY += dy * 0.4;
                        }
                    });
                    // Check if passing lane to frisbee holder is blocked
                    const passingLaneBlocked = opponents.some((opponent)=>{
                        const distToLine = this.distanceToLine(humanWithFrisbee.x, humanWithFrisbee.y, redPlayer.x, redPlayer.y, opponent.x, opponent.y);
                        return distToLine < 25; // 25 pixel buffer for passing lane
                    });
                    if (passingLaneBlocked) {
                        // Move perpendicular to the passing lane to get open
                        const dx = redPlayer.x - humanWithFrisbee.x;
                        const dy = redPlayer.y - humanWithFrisbee.y;
                        const perpX = -dy; // Perpendicular direction
                        const perpY = dx;
                        const perpLength = Math.sqrt(perpX * perpX + perpY * perpY);
                        if (perpLength > 0) {
                            targetX += perpX / perpLength * 60;
                            targetY += perpY / perpLength * 60;
                        }
                    }
                    // Also avoid being too close to defenders
                    const nearestDefender = opponents.reduce((nearest, opponent)=>{
                        const distance = Math.sqrt((opponent.x - redPlayer.x) ** 2 + (opponent.y - redPlayer.y) ** 2);
                        return !nearest || distance < nearest.distance ? {
                            player: opponent,
                            distance
                        } : nearest;
                    }, null);
                    if (nearestDefender && nearestDefender.distance < 40) {
                        const dx = redPlayer.x - nearestDefender.player.x;
                        const dy = redPlayer.y - nearestDefender.player.y;
                        targetX += dx * 0.6;
                        targetY += dy * 0.6;
                    }
                    const dx = targetX - redPlayer.x;
                    const dy = targetY - redPlayer.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance > 15) {
                        redPlayer.velocityX = dx / distance * (0, _configJs.CONFIG).PLAYER_SPEED * 0.6;
                        redPlayer.velocityY = dy / distance * (0, _configJs.CONFIG).PLAYER_SPEED * 0.6;
                    } else {
                        // Keep moving to stay open
                        redPlayer.velocityX = (Math.random() - 0.5) * (0, _configJs.CONFIG).PLAYER_SPEED * 0.3;
                        redPlayer.velocityY = (Math.random() - 0.5) * (0, _configJs.CONFIG).PLAYER_SPEED * 0.3;
                    }
                } else {
                    redPlayer.velocityX = 0;
                    redPlayer.velocityY = 0;
                }
            }
        });
        // Blue team AI behavior
        this.players.forEach((player)=>{
            if (player.isAI) {
                if (player.hasFrisbee) {
                    // AI with frisbee: throw to teammate or toward goal
                    if (!player.aiThrowTimer) player.aiThrowTimer = 0;
                    player.aiThrowTimer += deltaTime;
                    if (player.aiThrowTimer > 1) {
                        const teammates = this.players.filter((p)=>p.team === player.team && p !== player);
                        const opponents = this.players.filter((p)=>p.team !== player.team);
                        // Find best teammate with clear passing lane
                        const bestTeammate = teammates.reduce((best, teammate)=>{
                            const distance = Math.sqrt((teammate.x - player.x) ** 2 + (teammate.y - player.y) ** 2);
                            // Check if passing lane is clear (no opponent too close to the line)
                            const passingLaneClear = !opponents.some((opponent)=>{
                                const distToLine = this.distanceToLine(player.x, player.y, teammate.x, teammate.y, opponent.x, opponent.y);
                                return distToLine < 30; // 30 pixel buffer
                            });
                            if (!passingLaneClear) return best;
                            return !best || distance < best.distance ? {
                                player: teammate,
                                distance
                            } : best;
                        }, null);
                        if (bestTeammate && bestTeammate.distance < 200) {
                            // Throw to teammate with clear lane
                            this.throwFrisbee(player, bestTeammate.player.x, bestTeammate.player.y);
                            player.aiThrowTimer = 0;
                        } else // No clear pass, check if teammate is near goal before throwing
                        if (player.aiThrowTimer > 3) {
                            const goalX = player.team === 2 ? 50 : (0, _configJs.CONFIG).CANVAS_WIDTH - 50;
                            const goalY = (0, _configJs.CONFIG).CANVAS_HEIGHT / 2;
                            // Only throw toward goal if teammate is reasonably close to catch it
                            const teammateNearGoal = teammates.some((teammate)=>{
                                const distToGoal = Math.sqrt((teammate.x - goalX) ** 2 + (teammate.y - goalY) ** 2);
                                return distToGoal < 80; // Teammate within 80 pixels of goal area
                            });
                            if (teammateNearGoal) {
                                this.throwFrisbee(player, goalX, goalY);
                                player.aiThrowTimer = 0;
                            } else // No good option, reset timer and wait for better opportunity
                            player.aiThrowTimer = 2; // Reset to 2 seconds to try again soon
                        }
                    }
                } else {
                    // AI without frisbee behavior
                    const humanWithFrisbee = this.players.find((p)=>p.team === 1 && p.hasFrisbee);
                    const aiWithFrisbee = this.players.find((p)=>p.team === 2 && p.hasFrisbee);
                    if (this.frisbee.isVisible && this.frisbee.isFlying) {
                        // Chase flying frisbee for interception
                        const dx = this.frisbee.x - player.x;
                        const dy = this.frisbee.y - player.y;
                        const distance = Math.sqrt(dx * dx + dy * dy);
                        if (distance > 10) {
                            player.velocityX = dx / distance * (0, _configJs.CONFIG).PLAYER_SPEED;
                            player.velocityY = dy / distance * (0, _configJs.CONFIG).PLAYER_SPEED;
                        } else {
                            player.velocityX = 0;
                            player.velocityY = 0;
                        }
                    } else if (this.frisbee.isVisible && !this.frisbee.isFlying) {
                        // Chase loose frisbee
                        const dx = this.frisbee.x - player.x;
                        const dy = this.frisbee.y - player.y;
                        const distance = Math.sqrt(dx * dx + dy * dy);
                        if (distance > 5) {
                            player.velocityX = dx / distance * (0, _configJs.CONFIG).PLAYER_SPEED;
                            player.velocityY = dy / distance * (0, _configJs.CONFIG).PLAYER_SPEED;
                        } else {
                            player.velocityX = 0;
                            player.velocityY = 0;
                        }
                    } else if (humanWithFrisbee) {
                        // Defensive: position between assigned player and frisbee holder to block passes
                        const humanPlayers = this.players.filter((p)=>p.team === 1);
                        const aiPlayers = this.players.filter((p)=>p.team === 2);
                        const aiIndex = aiPlayers.indexOf(player);
                        const targetHuman = humanPlayers[aiIndex % humanPlayers.length];
                        if (targetHuman && targetHuman !== humanWithFrisbee) {
                            // Position between frisbee holder and assigned player
                            const midX = (humanWithFrisbee.x + targetHuman.x) / 2;
                            const midY = (humanWithFrisbee.y + targetHuman.y) / 2;
                            const dx = midX - player.x;
                            const dy = midY - player.y;
                            const distance = Math.sqrt(dx * dx + dy * dy);
                            if (distance > 20) {
                                player.velocityX = dx / distance * (0, _configJs.CONFIG).PLAYER_SPEED * 0.8;
                                player.velocityY = dy / distance * (0, _configJs.CONFIG).PLAYER_SPEED * 0.8;
                            } else {
                                player.velocityX = 0;
                                player.velocityY = 0;
                            }
                        } else if (targetHuman === humanWithFrisbee) {
                            // If assigned to player with frisbee, pressure them directly
                            const dx = targetHuman.x - player.x;
                            const dy = targetHuman.y - player.y;
                            const distance = Math.sqrt(dx * dx + dy * dy);
                            if (distance > 30) {
                                player.velocityX = dx / distance * (0, _configJs.CONFIG).PLAYER_SPEED * 0.9;
                                player.velocityY = dy / distance * (0, _configJs.CONFIG).PLAYER_SPEED * 0.9;
                            } else {
                                player.velocityX = 0;
                                player.velocityY = 0;
                            }
                        }
                    } else if (aiWithFrisbee) {
                        // Offensive: spread out and avoid both defenders and teammates
                        const opponents = this.players.filter((p)=>p.team !== player.team);
                        const teammates = this.players.filter((p)=>p.team === player.team && p !== player);
                        let targetX = 50; // Default toward goal
                        let targetY = (0, _configJs.CONFIG).CANVAS_HEIGHT / 2 + (Math.random() - 0.5) * 150; // Add some randomness
                        // Avoid clustering with teammates
                        teammates.forEach((teammate)=>{
                            const dx = player.x - teammate.x;
                            const dy = player.y - teammate.y;
                            const distance = Math.sqrt(dx * dx + dy * dy);
                            if (distance < 80) {
                                targetX += dx * 0.5;
                                targetY += dy * 0.5;
                            }
                        });
                        // Check if passing lane to teammate with frisbee is blocked
                        const passingLaneBlocked = opponents.some((opponent)=>{
                            const distToLine = this.distanceToLine(aiWithFrisbee.x, aiWithFrisbee.y, player.x, player.y, opponent.x, opponent.y);
                            return distToLine < 25; // 25 pixel buffer for passing lane
                        });
                        if (passingLaneBlocked) {
                            // Move perpendicular to the passing lane to get open
                            const dx = player.x - aiWithFrisbee.x;
                            const dy = player.y - aiWithFrisbee.y;
                            const perpX = -dy; // Perpendicular direction
                            const perpY = dx;
                            const perpLength = Math.sqrt(perpX * perpX + perpY * perpY);
                            if (perpLength > 0) {
                                targetX += perpX / perpLength * 50;
                                targetY += perpY / perpLength * 50;
                            }
                        }
                        // Avoid defenders
                        opponents.forEach((opponent)=>{
                            const dx = player.x - opponent.x;
                            const dy = player.y - opponent.y;
                            const distance = Math.sqrt(dx * dx + dy * dy);
                            if (distance < 60) {
                                targetX += dx * 0.4;
                                targetY += dy * 0.4;
                            }
                        });
                        const dx = targetX - player.x;
                        const dy = targetY - player.y;
                        const distance = Math.sqrt(dx * dx + dy * dy);
                        if (distance > 15) {
                            player.velocityX = dx / distance * (0, _configJs.CONFIG).PLAYER_SPEED * 0.7;
                            player.velocityY = dy / distance * (0, _configJs.CONFIG).PLAYER_SPEED * 0.7;
                        } else {
                            // Keep moving even when close to target
                            player.velocityX = (Math.random() - 0.5) * (0, _configJs.CONFIG).PLAYER_SPEED * 0.3;
                            player.velocityY = (Math.random() - 0.5) * (0, _configJs.CONFIG).PLAYER_SPEED * 0.3;
                        }
                    } else {
                        // No specific target, stay relatively still
                        player.velocityX = 0;
                        player.velocityY = 0;
                    }
                }
            }
            // Update throw timer for players with frisbee
            if (player.hasFrisbee) {
                if (!player.throwTimer) player.throwTimer = 0;
                player.throwTimer += deltaTime;
                // Force drop after 5 seconds
                if (player.throwTimer > 5) this.dropFrisbee(player);
            }
            this.physics.updatePosition(player, deltaTime);
        });
    }
    updateFrisbee(deltaTime) {
        if (this.frisbee.isFlying) {
            const distance = Math.sqrt((this.frisbee.targetX - this.frisbee.startX) ** 2 + (this.frisbee.targetY - this.frisbee.startY) ** 2);
            const speed = 400; // pixels per second
            const progressIncrement = deltaTime * speed / distance;
            this.frisbee.flightProgress += progressIncrement;
            if (this.frisbee.flightProgress >= 1) {
                // Reached destination
                this.frisbee.x = this.frisbee.targetX;
                this.frisbee.y = this.frisbee.targetY;
                this.frisbee.isFlying = false;
                this.frisbee.flightProgress = 1;
            } else {
                // Interpolate position
                const t = this.frisbee.flightProgress;
                this.frisbee.x = this.frisbee.startX + (this.frisbee.targetX - this.frisbee.startX) * t;
                this.frisbee.y = this.frisbee.startY + (this.frisbee.targetY - this.frisbee.startY) * t;
            }
        }
    }
    updateTimer(deltaTime) {
        const currentTime = this.gameState.getState('gameTime');
        const newTime = Math.max(0, currentTime - deltaTime);
        this.gameState.setState('gameTime', newTime);
        if (newTime <= 0) this.endGame();
    }
    handleThrow(targetX, targetY) {
        const thrower = this.players.find((p)=>p.hasFrisbee);
        console.log('Throw attempt - thrower:', !!thrower, 'flying:', this.frisbee.isFlying);
        if (!thrower) return;
        // Check if clicking on a team 1 player (teammate)
        const clickedPlayer = this.players.find((p)=>p.team === 1 && p !== thrower && Math.abs(p.x - targetX) < (0, _configJs.CONFIG).PLAYER_SIZE && Math.abs(p.y - targetY) < (0, _configJs.CONFIG).PLAYER_SIZE);
        if (clickedPlayer) this.throwFrisbee(thrower, clickedPlayer.x, clickedPlayer.y);
        else this.throwFrisbee(thrower, targetX, targetY);
    }
    throwFrisbee(thrower, targetX, targetY) {
        console.log('THROWING - from:', thrower.x, thrower.y, 'to:', targetX, targetY);
        this.frisbee.x = thrower.x;
        this.frisbee.y = thrower.y;
        this.frisbee.targetX = targetX;
        this.frisbee.targetY = targetY;
        this.frisbee.startX = thrower.x;
        this.frisbee.startY = thrower.y;
        this.frisbee.flightProgress = 0;
        this.frisbee.isFlying = true;
        this.frisbee.isVisible = true;
        this.frisbee.throwTime = performance.now();
        this.frisbee.throwerTeam = thrower.team; // Track who threw it
        thrower.hasFrisbee = false;
        thrower.throwTimer = 0; // Reset throw timer
        console.log('Frisbee state after throw:', {
            x: this.frisbee.x,
            y: this.frisbee.y,
            isFlying: this.frisbee.isFlying,
            isVisible: this.frisbee.isVisible,
            throwerTeam: this.frisbee.throwerTeam
        });
        try {
            this.audio.onThrow();
        } catch (e) {}
    }
    dropFrisbee(player) {
        // Player drops frisbee at their location
        this.frisbee.x = player.x;
        this.frisbee.y = player.y;
        this.frisbee.isFlying = false;
        this.frisbee.isVisible = true;
        this.frisbee.throwerTeam = player.team; // Mark as dropped by this team
        player.hasFrisbee = false;
        player.throwTimer = 0;
        console.log('Player', player.team, 'dropped frisbee due to 5-second rule');
    }
    checkCollisions() {
        // Check collisions for both flying and grounded frisbee
        if (!this.frisbee.isVisible) return;
        // If flying, only check collisions after minimum time delay (100ms) to avoid immediate catching
        if (this.frisbee.isFlying && performance.now() - this.frisbee.throwTime < 100) return;
        this.players.forEach((player)=>{
            // Use larger catch radius for teammates, smaller for opponents
            const isTeammate = this.frisbee.throwerTeam === player.team;
            const catchRadius = isTeammate ? (0, _configJs.CONFIG).PLAYER_SIZE * 0.8 : (0, _configJs.CONFIG).PLAYER_SIZE * 0.5;
            const dx = player.x - this.frisbee.x;
            const dy = player.y - this.frisbee.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < catchRadius) {
                // If frisbee is on ground, only opposing team can pick it up
                if (!this.frisbee.isFlying && this.frisbee.throwerTeam === player.team) return; // Same team can't pick up their own grounded throw
                this.catchFrisbee(player);
            }
        });
    }
    catchFrisbee(player) {
        // Clear any existing frisbee holder
        this.players.forEach((p)=>p.hasFrisbee = false);
        this.frisbee.isFlying = false;
        this.frisbee.isVisible = false;
        this.frisbee.x = player.x;
        this.frisbee.y = player.y;
        this.frisbee.velocityX = 0;
        this.frisbee.velocityY = 0;
        player.hasFrisbee = true;
        this.audio.onCatch();
        // Switch selected player if caught by human team
        if (player.team === 1) {
            this.players.forEach((p)=>p.isSelected = false);
            player.isSelected = true;
        }
    }
    checkScoring() {
        const playerWithFrisbee = this.players.find((p)=>p.hasFrisbee);
        if (!playerWithFrisbee) return;
        const inEndZone = playerWithFrisbee.team === 1 && playerWithFrisbee.x > (0, _configJs.CONFIG).CANVAS_WIDTH - (0, _configJs.CONFIG).END_ZONE_WIDTH || playerWithFrisbee.team === 2 && playerWithFrisbee.x < (0, _configJs.CONFIG).END_ZONE_WIDTH;
        if (inEndZone) this.score(playerWithFrisbee.team);
    }
    score(team) {
        const currentScore = this.gameState.getState('score');
        if (team === 1) currentScore.team1++;
        else currentScore.team2++;
        this.gameState.setState('score', currentScore);
        this.audio.onScore();
        // Reset positions
        this.resetPositions();
        // Check for game end
        if (currentScore.team1 >= (0, _configJs.CONFIG).SCORE_TO_WIN || currentScore.team2 >= (0, _configJs.CONFIG).SCORE_TO_WIN) this.endGame();
    }
    resetPositions() {
        this.createPlayers();
        this.createFrisbee();
    }
    endGame() {
        this.gameState.setState('currentScreen', 'gameOver');
        this.audio.onGameEnd();
        this.stopGameLoop();
    }
    distanceToLine(x1, y1, x2, y2, px, py) {
        // Calculate distance from point (px, py) to line segment (x1,y1)-(x2,y2)
        const A = px - x1;
        const B = py - y1;
        const C = x2 - x1;
        const D = y2 - y1;
        const dot = A * C + B * D;
        const lenSq = C * C + D * D;
        if (lenSq === 0) return Math.sqrt(A * A + B * B);
        const param = dot / lenSq;
        let xx, yy;
        if (param < 0) {
            xx = x1;
            yy = y1;
        } else if (param > 1) {
            xx = x2;
            yy = y2;
        } else {
            xx = x1 + param * C;
            yy = y1 + param * D;
        }
        const dx = px - xx;
        const dy = py - yy;
        return Math.sqrt(dx * dx + dy * dy);
    }
    render() {
        const currentScreen = this.gameState.getState('currentScreen');
        // console.log('Rendering screen:', currentScreen);
        if (currentScreen === 'menu') this.renderer.drawMenu();
        else {
            this.renderer.clear();
            this.renderer.drawField();
            // console.log('Drawing', this.players.length, 'players');
            this.players.forEach((player, index)=>{
                // console.log(`Drawing player ${index}, team ${player.team}, position (${player.x}, ${player.y})`);
                this.renderer.drawPlayer(player);
            });
            this.renderer.drawFrisbee(this.frisbee);
            this.renderer.drawUI(this.gameState);
        }
    }
}

},{"../config.js":"8oaOz","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}]},["iUuJv","fILKw"], "fILKw", "parcelRequireb063", {})

//# sourceMappingURL=UltimateFrisbeeArcadeGame.1fcc916e.js.map
