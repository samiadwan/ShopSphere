import {
  META_REDUCERS,
  Store,
  createAction,
  props
} from "./chunk-UEGOUPWF.js";
import {
  BeforeAppInit,
  InitializationStrategy,
  afterAppInitProvider,
  createMergeReducer,
  isEqual
} from "./chunk-JUIV2ANI.js";
import {
  ENVIRONMENT_INITIALIZER,
  Inject,
  Injectable,
  InjectionToken,
  NgModule,
  Optional,
  SkipSelf,
  inject,
  makeEnvironmentProviders,
  setClassMetadata,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵinject
} from "./chunk-ULBGBCPD.js";
import {
  Subject,
  defaultIfEmpty,
  distinctUntilChanged,
  filter,
  from,
  map,
  merge,
  of,
  skip,
  switchMap,
  takeUntil,
  tap
} from "./chunk-FDESMX7I.js";
import {
  __objRest,
  __privateAdd,
  __privateGet,
  __privateSet,
  __spreadProps,
  __spreadValues
} from "./chunk-TUVYXDEF.js";

// node_modules/@ngrx-addons/persist-state/fesm2022/ngrx-addons-persist-state.mjs
var REHYDRATE = "@ngrx-addons/persist-state/rehydrate";
var storeRehydrateAction = createAction(
  REHYDRATE,
  // eslint-disable-next-line @ngrx/prefer-inline-action-props
  props()
);
var rehydrate = storeRehydrateAction;
var PersistStateRootConfig = class {
};
var PersistStateFeatureConfig = class {
};
var PersistStateStrategy = new InjectionToken("persist-state-init-strategy");
var PERSIST_STATE_FEATURE_CONFIGS = new InjectionToken("persist-state-feature-configs");
var ROOT_PERSIST_STORE = new InjectionToken("persist-state-root");
var FEATURE_PERSIST_STATE = new InjectionToken("persist-state-feature");
var rootState = "root";
var _rootConfig, _features, _destroyer;
var _PersistState = class _PersistState {
  constructor(store, strategy, rootConfig) {
    __privateAdd(this, _rootConfig);
    __privateAdd(this, _features, /* @__PURE__ */ new Map());
    __privateAdd(this, _destroyer, new Subject());
    this.store = store;
    this.strategy = strategy;
    const _a = rootConfig, {
      states,
      storageKeyPrefix
    } = _a, restConfig = __objRest(_a, [
      "states",
      "storageKeyPrefix"
    ]);
    const keyPrefix = storageKeyPrefix ? `${storageKeyPrefix}-` : "";
    __privateSet(this, _rootConfig, __spreadProps(__spreadValues({}, restConfig), {
      storageKeyPrefix: keyPrefix,
      states
    }));
  }
  addRoot() {
    const merged = __privateGet(this, _rootConfig).states?.map((state) => __spreadProps(__spreadValues(__spreadValues({}, this.defaultStateConfig(state.key)), state), {
      key: state.key
    })) ?? [];
    this.listenOnStates(merged, rootState).subscribe();
  }
  addFeature(feature) {
    if (__privateGet(this, _features).has(feature.key)) {
      return;
    }
    this.removeFeature(feature.key);
    __privateGet(this, _features).set(feature.key, true);
    const merged = feature.states.map((state) => __spreadProps(__spreadValues(__spreadValues({}, this.defaultStateConfig(feature.key)), state), {
      key: feature.key
    }));
    this.listenOnStates(merged, feature.key).subscribe();
  }
  removeFeature(key) {
    __privateGet(this, _destroyer).next(key);
    __privateGet(this, _features).delete(key);
  }
  ngOnDestroy() {
    __privateGet(this, _features).forEach((_, key) => {
      this.removeFeature(key);
    });
    __privateGet(this, _destroyer).next(rootState);
    __privateGet(this, _destroyer).complete();
  }
  defaultStateConfig(key) {
    return {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      storageKey: `${__privateGet(this, _rootConfig).storageKeyPrefix}${key}@store`,
      source: (state) => state,
      runGuard: () => typeof window !== "undefined",
      migrations: [],
      skip: 1
    };
  }
  listenOnStates(states, feature) {
    if (states.length === 0) {
      return of(void 0);
    }
    return merge(...states.map((state) => {
      if (!state.runGuard()) {
        return of(void 0);
      }
      const storage = typeof state.storage === "function" ? state.storage() : state.storage;
      return merge(
        // Restore state from storage
        this.rehydrateWhen(() => from(storage.getItem(state.storageKey))).pipe(filter((value) => !!value), tap((value) => {
          if (state.migrations.length) {
            value = this.runMigrations(value, state.migrations);
          }
          this.store.dispatch(rehydrate({
            features: {
              [state.key]: value
            }
          }));
        }), defaultIfEmpty(void 0)),
        // Save state to storage
        state.source(this.store.pipe(map((storeState) => storeState[state.key]))).pipe(distinctUntilChanged(isEqual), skip(state.skip), switchMap((value) => storage.setItem(state.storageKey, value)))
      );
    })).pipe(takeUntil(__privateGet(this, _destroyer).pipe(filter((destroyFeature) => destroyFeature === feature))));
  }
  runMigrations(value, migrations) {
    migrations.forEach((migration) => {
      const version = value[migration.versionKey ?? "version"];
      if (migration.version === version) {
        value = migration.migrate(value);
      }
    });
    return value;
  }
  rehydrateWhen(input) {
    return this.strategy.when().pipe(switchMap(() => input()));
  }
};
_rootConfig = new WeakMap();
_features = new WeakMap();
_destroyer = new WeakMap();
_PersistState.ɵfac = function PersistState_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _PersistState)(ɵɵinject(Store), ɵɵinject(PersistStateStrategy), ɵɵinject(PersistStateRootConfig));
};
_PersistState.ɵprov = ɵɵdefineInjectable({
  token: _PersistState,
  factory: _PersistState.ɵfac
});
var PersistState = _PersistState;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PersistState, [{
    type: Injectable
  }], () => [{
    type: Store
  }, {
    type: InitializationStrategy,
    decorators: [{
      type: Inject,
      args: [PersistStateStrategy]
    }]
  }, {
    type: PersistStateRootConfig
  }], null);
})();
var _PersistStateFeature = class _PersistStateFeature {
  constructor(persistState, configs) {
    this.persistState = persistState;
    this.configs = configs;
  }
  addFeatures() {
    this.configs.forEach((config) => {
      this.persistState.addFeature(config);
    });
  }
  ngOnDestroy() {
    this.configs.forEach((config) => {
      this.persistState.removeFeature(config.key);
    });
  }
};
_PersistStateFeature.ɵfac = function PersistStateFeature_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _PersistStateFeature)(ɵɵinject(PersistState), ɵɵinject(PERSIST_STATE_FEATURE_CONFIGS));
};
_PersistStateFeature.ɵprov = ɵɵdefineInjectable({
  token: _PersistStateFeature,
  factory: _PersistStateFeature.ɵfac
});
var PersistStateFeature = _PersistStateFeature;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PersistStateFeature, [{
    type: Injectable
  }], () => [{
    type: PersistState
  }, {
    type: void 0,
    decorators: [{
      type: Inject,
      args: [PERSIST_STATE_FEATURE_CONFIGS]
    }]
  }], null);
})();
var _PersistStateFeatureModule = class _PersistStateFeatureModule {
  constructor(state) {
    state.addFeatures();
  }
};
_PersistStateFeatureModule.ɵfac = function PersistStateFeatureModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _PersistStateFeatureModule)(ɵɵinject(PersistStateFeature));
};
_PersistStateFeatureModule.ɵmod = ɵɵdefineNgModule({
  type: _PersistStateFeatureModule
});
_PersistStateFeatureModule.ɵinj = ɵɵdefineInjector({});
var PersistStateFeatureModule = _PersistStateFeatureModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PersistStateFeatureModule, [{
    type: NgModule
  }], () => [{
    type: PersistStateFeature
  }], null);
})();
var isRehydrateAction = (action) => action.type === REHYDRATE;
var persistStateReducer = createMergeReducer(isRehydrateAction);
var _providePersistStore = (config = {}) => {
  return [PersistState, {
    provide: PersistStateRootConfig,
    useValue: config
  }, {
    provide: META_REDUCERS,
    useValue: persistStateReducer,
    multi: true
  }, afterAppInitProvider, {
    provide: PersistStateStrategy,
    useExisting: config.strategy ?? BeforeAppInit
  }];
};
var _providePersistState = (config) => {
  return [{
    provide: PERSIST_STATE_FEATURE_CONFIGS,
    useValue: config,
    multi: true
  }, PersistStateFeature];
};
var providePersistStore = (config = {}) => {
  return makeEnvironmentProviders([..._providePersistStore(config), {
    provide: ROOT_PERSIST_STORE,
    useFactory: () => {
      inject(PersistState).addRoot();
    }
  }, {
    provide: ENVIRONMENT_INITIALIZER,
    multi: true,
    useFactory: () => () => inject(ROOT_PERSIST_STORE)
  }]);
};
var providePersistState = (config) => {
  return makeEnvironmentProviders([..._providePersistState(config), {
    provide: FEATURE_PERSIST_STATE,
    useFactory: () => {
      inject(PersistStateFeature).addFeatures();
    }
  }, {
    provide: ENVIRONMENT_INITIALIZER,
    multi: true,
    useFactory: () => () => inject(FEATURE_PERSIST_STATE)
  }]);
};
var _PersistStateRootModule = class _PersistStateRootModule {
  constructor(state, parentModule) {
    if (parentModule) {
      throw new Error("PersistStateRootModule is already loaded. Import it only once at AppModule!");
    }
    state.addRoot();
  }
};
_PersistStateRootModule.ɵfac = function PersistStateRootModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _PersistStateRootModule)(ɵɵinject(PersistState), ɵɵinject(_PersistStateRootModule, 12));
};
_PersistStateRootModule.ɵmod = ɵɵdefineNgModule({
  type: _PersistStateRootModule
});
_PersistStateRootModule.ɵinj = ɵɵdefineInjector({});
var PersistStateRootModule = _PersistStateRootModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PersistStateRootModule, [{
    type: NgModule
  }], () => [{
    type: PersistState
  }, {
    type: PersistStateRootModule,
    decorators: [{
      type: Optional
    }, {
      type: SkipSelf
    }]
  }], null);
})();
var _PersistStateModule = class _PersistStateModule {
  static forRoot(config = {}) {
    return {
      ngModule: PersistStateRootModule,
      providers: [..._providePersistStore(config)]
    };
  }
  static forFeature(config) {
    return {
      ngModule: PersistStateFeatureModule,
      providers: [..._providePersistState(config)]
    };
  }
};
_PersistStateModule.ɵfac = function PersistStateModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _PersistStateModule)();
};
_PersistStateModule.ɵmod = ɵɵdefineNgModule({
  type: _PersistStateModule
});
_PersistStateModule.ɵinj = ɵɵdefineInjector({});
var PersistStateModule = _PersistStateModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PersistStateModule, [{
    type: NgModule
  }], null, null);
})();
var noopStorage = {
  getItem: () => of(null),
  setItem: () => of(true),
  removeItem: () => of(true)
};
var createStorage = (storage) => {
  if (!storage) {
    return noopStorage;
  }
  return {
    getItem: (key) => {
      const v = storage.getItem(key);
      return of(v ? JSON.parse(v) : v);
    },
    setItem: (key, value) => {
      storage.setItem(key, JSON.stringify(value));
      return of(true);
    },
    // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
    removeItem: (key) => {
      storage.removeItem(key);
      return of(true);
    }
  };
};
var tryGetLocalStorage = () => {
  try {
    if (typeof localStorage !== "undefined") {
      return localStorage;
    }
  } catch {
  }
  return void 0;
};
var localStorageStrategy = createStorage(tryGetLocalStorage());
var tryGetSessionStorage = () => {
  try {
    if (typeof sessionStorage !== "undefined") {
      return sessionStorage;
    }
  } catch {
  }
  return void 0;
};
var sessionStorageStrategy = createStorage(tryGetSessionStorage());
export {
  PersistState,
  PersistStateFeatureConfig,
  PersistStateFeatureModule,
  PersistStateModule,
  PersistStateRootConfig,
  PersistStateRootModule,
  REHYDRATE,
  createStorage,
  localStorageStrategy,
  providePersistState,
  providePersistStore,
  rehydrate,
  sessionStorageStrategy,
  storeRehydrateAction
};
//# sourceMappingURL=@ngrx-addons_persist-state.js.map
