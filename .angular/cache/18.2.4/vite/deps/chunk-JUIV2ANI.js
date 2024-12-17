import {
  APP_BOOTSTRAP_LISTENER,
  Injectable,
  inject,
  setClassMetadata,
  ɵɵdefineInjectable
} from "./chunk-ULBGBCPD.js";
import {
  ReplaySubject,
  first,
  map,
  of,
  pipe
} from "./chunk-FDESMX7I.js";
import {
  __privateAdd,
  __privateGet,
  __spreadValues
} from "./chunk-TUVYXDEF.js";

// node_modules/@ngrx-addons/common/fesm2022/ngrx-addons-common.mjs
var createMergeReducer = (actionCheck) => (reducer) => (state, action) => {
  let newState = state;
  if (actionCheck(action)) {
    const {
      features
    } = action;
    newState = state ? __spreadValues({}, state) : {};
    Object.keys(features).forEach((key) => {
      newState[key] = __spreadValues(__spreadValues({}, newState[key]), features[key]);
    });
  }
  return reducer(newState, action);
};
var excludeKeys = (keys) => {
  return pipe(map((state) => Object.keys(state).reduce((toSave, key) => {
    if (!keys.includes(key)) {
      toSave[key] = state[key];
    }
    return toSave;
  }, {})));
};
var includeKeys = (keys) => {
  return pipe(map((state) => Object.keys(state).reduce((toSave, key) => {
    if (keys.includes(key)) {
      toSave[key] = state[key];
    }
    return toSave;
  }, {})));
};
var isEqual = (prev, next) => {
  if (prev === next) {
    return true;
  }
  if (!prev || !next || typeof prev !== "object" || typeof next !== "object") {
    return false;
  }
  const prevSlices = Object.keys(prev);
  const nextSlices = Object.keys(next);
  if (prevSlices.length !== nextSlices.length) {
    return false;
  }
  if (prevSlices.some((slice) => !isEqual(prev[slice], next[slice]))) {
    return false;
  }
  return true;
};
var InitializationStrategy = class {
};
var _initialized;
var _AfterAppInit = class _AfterAppInit {
  constructor() {
    __privateAdd(this, _initialized, new ReplaySubject(1));
  }
  when() {
    return __privateGet(this, _initialized).pipe(first());
  }
  /**
   * Mark strategy as initialized. Meant to be called once whole angular
   * application is initialized.
   */
  markAsInitialized() {
    __privateGet(this, _initialized).next();
  }
  /**
   * Cleanup resources.
   */
  ngOnDestroy() {
    __privateGet(this, _initialized).complete();
  }
};
_initialized = new WeakMap();
_AfterAppInit.ɵfac = function AfterAppInit_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _AfterAppInit)();
};
_AfterAppInit.ɵprov = ɵɵdefineInjectable({
  token: _AfterAppInit,
  factory: _AfterAppInit.ɵfac,
  providedIn: "root"
});
var AfterAppInit = _AfterAppInit;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AfterAppInit, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var afterAppInitProvider = {
  provide: APP_BOOTSTRAP_LISTENER,
  multi: true,
  useFactory: (afterInit = inject(AfterAppInit)) => () => {
    afterInit.markAsInitialized();
  }
};
var _BeforeAppInit = class _BeforeAppInit {
  when() {
    return of(void 0);
  }
};
_BeforeAppInit.ɵfac = function BeforeAppInit_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _BeforeAppInit)();
};
_BeforeAppInit.ɵprov = ɵɵdefineInjectable({
  token: _BeforeAppInit,
  factory: _BeforeAppInit.ɵfac,
  providedIn: "root"
});
var BeforeAppInit = _BeforeAppInit;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BeforeAppInit, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

export {
  createMergeReducer,
  excludeKeys,
  includeKeys,
  isEqual,
  InitializationStrategy,
  AfterAppInit,
  afterAppInitProvider,
  BeforeAppInit
};
//# sourceMappingURL=chunk-JUIV2ANI.js.map
