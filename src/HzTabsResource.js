"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
var core_1 = require("@haztivity/core");
require("jquery-ui-dist/jquery-ui.js");
var HzTabsResource = HzTabsResource_1 = (function (_super) {
    __extends(HzTabsResource, _super);
    function HzTabsResource(_$, _EventEmitterFactory, _DataOptions) {
        var _this = _super.call(this, _$, _EventEmitterFactory) || this;
        _this._DataOptions = _DataOptions;
        return _this;
    }
    HzTabsResource.prototype.init = function (options, config) {
        this._config = config;
        this.refresh();
    };
    /**
     * Actualiza el estado de una pestaña. Si todas las pestañas han sido visitadas se marca el recurso como completado
     * @param tabIndex
     * @private
     */
    HzTabsResource.prototype._updateTabsState = function (tabIndex) {
        var tabState = this._tabsState[tabIndex];
        if (tabState) {
            if (tabState.visited !== true) {
                tabState.visited = true;
                this._visitedCount++;
                if (this._visitedCount === this._tabsState.length) {
                    this._markAsCompleted();
                }
            }
        }
    };
    HzTabsResource.prototype._assignEvents = function () {
        this._$element.off(HzTabsResource_1.NAMESPACE).on("tabsactivate." + HzTabsResource_1.NAMESPACE, { instance: this }, this._onActivateTab);
    };
    /**
     * Invocado al activarse una pestaña, se actualiza el estado de la misma
     * @param e
     * @param ui
     * @private
     */
    HzTabsResource.prototype._onActivateTab = function (e, ui) {
        var instance = e.data.instance, activatedTabId = ui.newPanel.attr("id"), tabIndex = instance._tabsStateMap[activatedTabId];
        instance._updateTabsState(tabIndex);
    };
    /**
     * Crea los estados de las pestañas para el control de visualización
     * @private
     */
    HzTabsResource.prototype._createState = function () {
        this._tabsState = [];
        this._tabsStateMap = {};
        //if any tab is active by default, set visited to 0
        var $panels = this.getInstance().panels;
        for (var tabIndex = 0, $panelsLength = $panels.length; tabIndex < $panelsLength; tabIndex++) {
            var $currentPanel = core_1.$($panels[tabIndex]), id = $currentPanel.attr("id");
            this._tabsState.push({
                visited: false
            });
            this._tabsStateMap[id] = tabIndex;
        }
        this._visitedCount = 0;
        if (this._options.tabs.active !== false) {
            this._updateTabsState(this._options.tabs.active || 0);
        }
    };
    HzTabsResource.prototype.getInstance = function () {
        return this._tabsInstance;
    };
    HzTabsResource.prototype.disable = function () {
        if (_super.prototype.disable.call(this)) {
            this._tabsInstance.disable();
        }
    };
    HzTabsResource.prototype.enable = function () {
        if (_super.prototype.enable.call(this)) {
            this._tabsInstance.enable();
        }
    };
    /**
     * Re inicializa el componente
     */
    HzTabsResource.prototype.refresh = function () {
        if (this._tabsInstance) {
            this._tabsState.destroy();
        }
        var tabsOptions = this._DataOptions.getDataOptions(this._$element, "tabs");
        this._options.tabs = this._$.extend(true, HzTabsResource_1._DEFAULT_TABS_OPTIONS, tabsOptions);
        this._$element.tabs(this._options.tabs);
        this._tabsInstance = this._$element.data("uiTabs");
        this._createState();
        this._assignEvents();
    };
    return HzTabsResource;
}(core_1.ResourceController));
HzTabsResource._DEFAULT_TABS_OPTIONS = {};
HzTabsResource = HzTabsResource_1 = __decorate([
    core_1.Resource({
        name: "HzTabs",
        dependencies: [
            core_1.$,
            core_1.EventEmitterFactory,
            core_1.DataOptions
        ]
    })
], HzTabsResource);
exports.HzTabsResource = HzTabsResource;
var HzTabsResource_1;
//# sourceMappingURL=HzTabsResource.js.map