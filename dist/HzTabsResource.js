"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
var core_1 = require("@haztivity/core");
require("jquery-ui-dist/jquery-ui.js");
var HzTabsResource = /** @class */ (function (_super) {
    __extends(HzTabsResource, _super);
    function HzTabsResource(_$, _EventEmitterFactory, _DataOptions) {
        var _this = _super.call(this, _$, _EventEmitterFactory) || this;
        _this._activated = [];
        _this._DataOptions = _DataOptions;
        return _this;
    }
    HzTabsResource_1 = HzTabsResource;
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
        this._$element.off("." + HzTabsResource_1.NAMESPACE);
        this._$element.on("tabsactivate." + HzTabsResource_1.NAMESPACE, { instance: this }, this._onActivateTab);
        this._$element.on("tabsbeforeactivate." + HzTabsResource_1.NAMESPACE, { instance: this }, this._onBeforeActivateTab);
    };
    /**
     * Invocado antes de activarse una pestaña. Comprueba la secuencia y premite o cancela la activación
     * @param e
     * @param ui
     * @private
     */
    HzTabsResource.prototype._onBeforeActivateTab = function (e, ui) {
        var instance = e.data.instance;
        if (instance._options.sequential != false) {
            var newTab = ui.newTab;
            if (newTab && newTab.length > 0) {
                var prevent = true, index = instance._tabsInstance.tabs.index(newTab);
                //if the header is not the first
                if (index != 0) {
                    //get the previous header
                    var sibling = instance._tabsInstance.tabs.get(index - 1), siblingId = instance._$(sibling).attr("aria-labelledby");
                    //check if has been activated
                    if (instance._activated.indexOf(siblingId) != -1) {
                        prevent = false;
                    }
                }
                else {
                    prevent = false;
                }
                if (prevent) {
                    e.preventDefault();
                }
            }
        }
    };
    /**
     * Invocado al activarse una pestaña, se actualiza el estado de la misma
     * @param e
     * @param ui
     * @private
     */
    HzTabsResource.prototype._onActivateTab = function (e, ui) {
        e.data.instance._storeActive();
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
    HzTabsResource.prototype._storeActive = function () {
        if (this._tabsInstance) {
            if (this._tabsInstance.active.length > 0) {
                var id = this._tabsInstance.active.attr("aria-labelledby");
                if (this._activated.indexOf(id) == -1) {
                    this._activated.push(id);
                    this._tabsInstance.active.removeClass(HzTabsResource_1.CLASS_UNCOMPLETED).addClass(HzTabsResource_1.CLASS_COMPLETED);
                    this._tabsInstance.panels.eq(this._tabsInstance.tabs.index(this._tabsInstance.active)).removeClass(HzTabsResource_1.CLASS_UNCOMPLETED).addClass(HzTabsResource_1.CLASS_COMPLETED);
                }
            }
            if (this.isCompleted() != true && this._activated.length == this._tabsInstance.tabs.length) {
                this._markAsCompleted();
            }
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
        this._options.tabs = this._$.extend(true, {}, HzTabsResource_1._DEFAULT_TABS_OPTIONS, tabsOptions);
        this._$element.tabs(this._options.tabs);
        this._tabsInstance = this._$element.data("uiTabs");
        this._tabsInstance.tabs.addClass(HzTabsResource_1.CLASS_UNCOMPLETED);
        this._tabsInstance.panels.addClass(HzTabsResource_1.CLASS_UNCOMPLETED);
        this._storeActive();
        this._assignEvents();
    };
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
    return HzTabsResource;
    var HzTabsResource_1;
}(core_1.ResourceController));
exports.HzTabsResource = HzTabsResource;
//# sourceMappingURL=HzTabsResource.js.map