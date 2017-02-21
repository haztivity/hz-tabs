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
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@haztivity/core/index", "jquery-ui/ui/widgets/tabs"], factory);
    }
})(function (require, exports) {
    "use strict";
    /**
     * @license
     * Copyright Davinchi. All Rights Reserved.
     */
    var index_1 = require("@haztivity/core/index");
    var tabs = require("jquery-ui/ui/widgets/tabs");
    tabs;
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
                var $currentPanel = index_1.$($panels[tabIndex]), id = $currentPanel.attr("id");
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
    }(index_1.ResourceController));
    HzTabsResource._DEFAULT_TABS_OPTIONS = {};
    HzTabsResource = HzTabsResource_1 = __decorate([
        index_1.Resource({
            name: "HzTabs",
            dependencies: [
                index_1.$,
                index_1.EventEmitterFactory,
                index_1.DataOptions
            ]
        })
    ], HzTabsResource);
    exports.HzTabsResource = HzTabsResource;
    var HzTabsResource_1;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJIelRhYnNSZXNvdXJjZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07XG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xufTtcbnZhciBfX2RlY29yYXRlID0gKHRoaXMgJiYgdGhpcy5fX2RlY29yYXRlKSB8fCBmdW5jdGlvbiAoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xufTtcbihmdW5jdGlvbiAoZmFjdG9yeSkge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBtb2R1bGUuZXhwb3J0cyA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICB2YXIgdiA9IGZhY3RvcnkocmVxdWlyZSwgZXhwb3J0cyk7XG4gICAgICAgIGlmICh2ICE9PSB1bmRlZmluZWQpIG1vZHVsZS5leHBvcnRzID0gdjtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gXCJmdW5jdGlvblwiICYmIGRlZmluZS5hbWQpIHtcbiAgICAgICAgZGVmaW5lKFtcInJlcXVpcmVcIiwgXCJleHBvcnRzXCIsIFwiQGhhenRpdml0eS9jb3JlL2luZGV4XCIsIFwianF1ZXJ5LXVpL3VpL3dpZGdldHMvdGFic1wiXSwgZmFjdG9yeSk7XG4gICAgfVxufSkoZnVuY3Rpb24gKHJlcXVpcmUsIGV4cG9ydHMpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICAvKipcbiAgICAgKiBAbGljZW5zZVxuICAgICAqIENvcHlyaWdodCBEYXZpbmNoaS4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAgICAgKi9cbiAgICB2YXIgaW5kZXhfMSA9IHJlcXVpcmUoXCJAaGF6dGl2aXR5L2NvcmUvaW5kZXhcIik7XG4gICAgdmFyIHRhYnMgPSByZXF1aXJlKFwianF1ZXJ5LXVpL3VpL3dpZGdldHMvdGFic1wiKTtcbiAgICB0YWJzO1xuICAgIHZhciBIelRhYnNSZXNvdXJjZSA9IEh6VGFic1Jlc291cmNlXzEgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgICAgICBfX2V4dGVuZHMoSHpUYWJzUmVzb3VyY2UsIF9zdXBlcik7XG4gICAgICAgIGZ1bmN0aW9uIEh6VGFic1Jlc291cmNlKF8kLCBfRXZlbnRFbWl0dGVyRmFjdG9yeSwgX0RhdGFPcHRpb25zKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBfJCwgX0V2ZW50RW1pdHRlckZhY3RvcnkpIHx8IHRoaXM7XG4gICAgICAgICAgICBfdGhpcy5fRGF0YU9wdGlvbnMgPSBfRGF0YU9wdGlvbnM7XG4gICAgICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgICAgIH1cbiAgICAgICAgSHpUYWJzUmVzb3VyY2UucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAob3B0aW9ucywgY29uZmlnKSB7XG4gICAgICAgICAgICB0aGlzLl9jb25maWcgPSBjb25maWc7XG4gICAgICAgICAgICB0aGlzLnJlZnJlc2goKTtcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEFjdHVhbGl6YSBlbCBlc3RhZG8gZGUgdW5hIHBlc3Rhw7FhLiBTaSB0b2RhcyBsYXMgcGVzdGHDsWFzIGhhbiBzaWRvIHZpc2l0YWRhcyBzZSBtYXJjYSBlbCByZWN1cnNvIGNvbW8gY29tcGxldGFkb1xuICAgICAgICAgKiBAcGFyYW0gdGFiSW5kZXhcbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIEh6VGFic1Jlc291cmNlLnByb3RvdHlwZS5fdXBkYXRlVGFic1N0YXRlID0gZnVuY3Rpb24gKHRhYkluZGV4KSB7XG4gICAgICAgICAgICB2YXIgdGFiU3RhdGUgPSB0aGlzLl90YWJzU3RhdGVbdGFiSW5kZXhdO1xuICAgICAgICAgICAgaWYgKHRhYlN0YXRlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRhYlN0YXRlLnZpc2l0ZWQgIT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGFiU3RhdGUudmlzaXRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3Zpc2l0ZWRDb3VudCsrO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fdmlzaXRlZENvdW50ID09PSB0aGlzLl90YWJzU3RhdGUubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9tYXJrQXNDb21wbGV0ZWQoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgSHpUYWJzUmVzb3VyY2UucHJvdG90eXBlLl9hc3NpZ25FdmVudHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLl8kZWxlbWVudC5vZmYoSHpUYWJzUmVzb3VyY2VfMS5OQU1FU1BBQ0UpLm9uKFwidGFic2FjdGl2YXRlLlwiICsgSHpUYWJzUmVzb3VyY2VfMS5OQU1FU1BBQ0UsIHsgaW5zdGFuY2U6IHRoaXMgfSwgdGhpcy5fb25BY3RpdmF0ZVRhYik7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJbnZvY2FkbyBhbCBhY3RpdmFyc2UgdW5hIHBlc3Rhw7FhLCBzZSBhY3R1YWxpemEgZWwgZXN0YWRvIGRlIGxhIG1pc21hXG4gICAgICAgICAqIEBwYXJhbSBlXG4gICAgICAgICAqIEBwYXJhbSB1aVxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgSHpUYWJzUmVzb3VyY2UucHJvdG90eXBlLl9vbkFjdGl2YXRlVGFiID0gZnVuY3Rpb24gKGUsIHVpKSB7XG4gICAgICAgICAgICB2YXIgaW5zdGFuY2UgPSBlLmRhdGEuaW5zdGFuY2UsIGFjdGl2YXRlZFRhYklkID0gdWkubmV3UGFuZWwuYXR0cihcImlkXCIpLCB0YWJJbmRleCA9IGluc3RhbmNlLl90YWJzU3RhdGVNYXBbYWN0aXZhdGVkVGFiSWRdO1xuICAgICAgICAgICAgaW5zdGFuY2UuX3VwZGF0ZVRhYnNTdGF0ZSh0YWJJbmRleCk7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDcmVhIGxvcyBlc3RhZG9zIGRlIGxhcyBwZXN0YcOxYXMgcGFyYSBlbCBjb250cm9sIGRlIHZpc3VhbGl6YWNpw7NuXG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICBIelRhYnNSZXNvdXJjZS5wcm90b3R5cGUuX2NyZWF0ZVN0YXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5fdGFic1N0YXRlID0gW107XG4gICAgICAgICAgICB0aGlzLl90YWJzU3RhdGVNYXAgPSB7fTtcbiAgICAgICAgICAgIC8vaWYgYW55IHRhYiBpcyBhY3RpdmUgYnkgZGVmYXVsdCwgc2V0IHZpc2l0ZWQgdG8gMFxuICAgICAgICAgICAgdmFyICRwYW5lbHMgPSB0aGlzLmdldEluc3RhbmNlKCkucGFuZWxzO1xuICAgICAgICAgICAgZm9yICh2YXIgdGFiSW5kZXggPSAwLCAkcGFuZWxzTGVuZ3RoID0gJHBhbmVscy5sZW5ndGg7IHRhYkluZGV4IDwgJHBhbmVsc0xlbmd0aDsgdGFiSW5kZXgrKykge1xuICAgICAgICAgICAgICAgIHZhciAkY3VycmVudFBhbmVsID0gaW5kZXhfMS4kKCRwYW5lbHNbdGFiSW5kZXhdKSwgaWQgPSAkY3VycmVudFBhbmVsLmF0dHIoXCJpZFwiKTtcbiAgICAgICAgICAgICAgICB0aGlzLl90YWJzU3RhdGUucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIHZpc2l0ZWQ6IGZhbHNlXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgdGhpcy5fdGFic1N0YXRlTWFwW2lkXSA9IHRhYkluZGV4O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fdmlzaXRlZENvdW50ID0gMDtcbiAgICAgICAgICAgIGlmICh0aGlzLl9vcHRpb25zLnRhYnMuYWN0aXZlICE9PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZVRhYnNTdGF0ZSh0aGlzLl9vcHRpb25zLnRhYnMuYWN0aXZlIHx8IDApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBIelRhYnNSZXNvdXJjZS5wcm90b3R5cGUuZ2V0SW5zdGFuY2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdGFic0luc3RhbmNlO1xuICAgICAgICB9O1xuICAgICAgICBIelRhYnNSZXNvdXJjZS5wcm90b3R5cGUuZGlzYWJsZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChfc3VwZXIucHJvdG90eXBlLmRpc2FibGUuY2FsbCh0aGlzKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3RhYnNJbnN0YW5jZS5kaXNhYmxlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIEh6VGFic1Jlc291cmNlLnByb3RvdHlwZS5lbmFibGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoX3N1cGVyLnByb3RvdHlwZS5lbmFibGUuY2FsbCh0aGlzKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3RhYnNJbnN0YW5jZS5lbmFibGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJlIGluaWNpYWxpemEgZWwgY29tcG9uZW50ZVxuICAgICAgICAgKi9cbiAgICAgICAgSHpUYWJzUmVzb3VyY2UucHJvdG90eXBlLnJlZnJlc2ggPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fdGFic0luc3RhbmNlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fdGFic1N0YXRlLmRlc3Ryb3koKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciB0YWJzT3B0aW9ucyA9IHRoaXMuX0RhdGFPcHRpb25zLmdldERhdGFPcHRpb25zKHRoaXMuXyRlbGVtZW50LCBcInRhYnNcIik7XG4gICAgICAgICAgICB0aGlzLl9vcHRpb25zLnRhYnMgPSB0aGlzLl8kLmV4dGVuZCh0cnVlLCBIelRhYnNSZXNvdXJjZV8xLl9ERUZBVUxUX1RBQlNfT1BUSU9OUywgdGFic09wdGlvbnMpO1xuICAgICAgICAgICAgdGhpcy5fJGVsZW1lbnQudGFicyh0aGlzLl9vcHRpb25zLnRhYnMpO1xuICAgICAgICAgICAgdGhpcy5fdGFic0luc3RhbmNlID0gdGhpcy5fJGVsZW1lbnQuZGF0YShcInVpVGFic1wiKTtcbiAgICAgICAgICAgIHRoaXMuX2NyZWF0ZVN0YXRlKCk7XG4gICAgICAgICAgICB0aGlzLl9hc3NpZ25FdmVudHMoKTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIEh6VGFic1Jlc291cmNlO1xuICAgIH0oaW5kZXhfMS5SZXNvdXJjZUNvbnRyb2xsZXIpKTtcbiAgICBIelRhYnNSZXNvdXJjZS5fREVGQVVMVF9UQUJTX09QVElPTlMgPSB7fTtcbiAgICBIelRhYnNSZXNvdXJjZSA9IEh6VGFic1Jlc291cmNlXzEgPSBfX2RlY29yYXRlKFtcbiAgICAgICAgaW5kZXhfMS5SZXNvdXJjZSh7XG4gICAgICAgICAgICBuYW1lOiBcIkh6VGFic1wiLFxuICAgICAgICAgICAgZGVwZW5kZW5jaWVzOiBbXG4gICAgICAgICAgICAgICAgaW5kZXhfMS4kLFxuICAgICAgICAgICAgICAgIGluZGV4XzEuRXZlbnRFbWl0dGVyRmFjdG9yeSxcbiAgICAgICAgICAgICAgICBpbmRleF8xLkRhdGFPcHRpb25zXG4gICAgICAgICAgICBdXG4gICAgICAgIH0pXG4gICAgXSwgSHpUYWJzUmVzb3VyY2UpO1xuICAgIGV4cG9ydHMuSHpUYWJzUmVzb3VyY2UgPSBIelRhYnNSZXNvdXJjZTtcbiAgICB2YXIgSHpUYWJzUmVzb3VyY2VfMTtcbn0pO1xuIl0sImZpbGUiOiJIelRhYnNSZXNvdXJjZS5qcyJ9
