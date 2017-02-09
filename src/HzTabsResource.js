System.register(["@haztivity/core/index", "jquery-ui/ui/widgets/tabs"], function (exports_1, context_1) {
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
    var __moduleName = context_1 && context_1.id;
    var index_1, tabs, HzTabsResource, HzTabsResource_1;
    return {
        setters: [
            function (index_1_1) {
                index_1 = index_1_1;
            },
            function (tabs_1) {
                tabs = tabs_1;
            }
        ],
        execute: function () {
            tabs;
            HzTabsResource = HzTabsResource_1 = (function (_super) {
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
            exports_1("HzTabsResource", HzTabsResource);
        }
    };
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJIelRhYnNSZXNvdXJjZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJTeXN0ZW0ucmVnaXN0ZXIoW1wiQGhhenRpdml0eS9jb3JlL2luZGV4XCIsIFwianF1ZXJ5LXVpL3VpL3dpZGdldHMvdGFic1wiXSwgZnVuY3Rpb24gKGV4cG9ydHNfMSwgY29udGV4dF8xKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgdmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xuICAgIHZhciBfX2RlY29yYXRlID0gKHRoaXMgJiYgdGhpcy5fX2RlY29yYXRlKSB8fCBmdW5jdGlvbiAoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcbiAgICAgICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcbiAgICAgICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcbiAgICAgICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcbiAgICAgICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcbiAgICB9O1xuICAgIHZhciBfX21vZHVsZU5hbWUgPSBjb250ZXh0XzEgJiYgY29udGV4dF8xLmlkO1xuICAgIHZhciBpbmRleF8xLCB0YWJzLCBIelRhYnNSZXNvdXJjZSwgSHpUYWJzUmVzb3VyY2VfMTtcbiAgICByZXR1cm4ge1xuICAgICAgICBzZXR0ZXJzOiBbXG4gICAgICAgICAgICBmdW5jdGlvbiAoaW5kZXhfMV8xKSB7XG4gICAgICAgICAgICAgICAgaW5kZXhfMSA9IGluZGV4XzFfMTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmdW5jdGlvbiAodGFic18xKSB7XG4gICAgICAgICAgICAgICAgdGFicyA9IHRhYnNfMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgZXhlY3V0ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGFicztcbiAgICAgICAgICAgIEh6VGFic1Jlc291cmNlID0gSHpUYWJzUmVzb3VyY2VfMSA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgICAgICAgICAgICAgX19leHRlbmRzKEh6VGFic1Jlc291cmNlLCBfc3VwZXIpO1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIEh6VGFic1Jlc291cmNlKF8kLCBfRXZlbnRFbWl0dGVyRmFjdG9yeSwgX0RhdGFPcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIF8kLCBfRXZlbnRFbWl0dGVyRmFjdG9yeSkgfHwgdGhpcztcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuX0RhdGFPcHRpb25zID0gX0RhdGFPcHRpb25zO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIEh6VGFic1Jlc291cmNlLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKG9wdGlvbnMsIGNvbmZpZykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jb25maWcgPSBjb25maWc7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVmcmVzaCgpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogQWN0dWFsaXphIGVsIGVzdGFkbyBkZSB1bmEgcGVzdGHDsWEuIFNpIHRvZGFzIGxhcyBwZXN0YcOxYXMgaGFuIHNpZG8gdmlzaXRhZGFzIHNlIG1hcmNhIGVsIHJlY3Vyc28gY29tbyBjb21wbGV0YWRvXG4gICAgICAgICAgICAgICAgICogQHBhcmFtIHRhYkluZGV4XG4gICAgICAgICAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBIelRhYnNSZXNvdXJjZS5wcm90b3R5cGUuX3VwZGF0ZVRhYnNTdGF0ZSA9IGZ1bmN0aW9uICh0YWJJbmRleCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdGFiU3RhdGUgPSB0aGlzLl90YWJzU3RhdGVbdGFiSW5kZXhdO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGFiU3RhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0YWJTdGF0ZS52aXNpdGVkICE9PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFiU3RhdGUudmlzaXRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdmlzaXRlZENvdW50Kys7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX3Zpc2l0ZWRDb3VudCA9PT0gdGhpcy5fdGFic1N0YXRlLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9tYXJrQXNDb21wbGV0ZWQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIEh6VGFic1Jlc291cmNlLnByb3RvdHlwZS5fYXNzaWduRXZlbnRzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl8kZWxlbWVudC5vZmYoSHpUYWJzUmVzb3VyY2VfMS5OQU1FU1BBQ0UpLm9uKFwidGFic2FjdGl2YXRlLlwiICsgSHpUYWJzUmVzb3VyY2VfMS5OQU1FU1BBQ0UsIHsgaW5zdGFuY2U6IHRoaXMgfSwgdGhpcy5fb25BY3RpdmF0ZVRhYik7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBJbnZvY2FkbyBhbCBhY3RpdmFyc2UgdW5hIHBlc3Rhw7FhLCBzZSBhY3R1YWxpemEgZWwgZXN0YWRvIGRlIGxhIG1pc21hXG4gICAgICAgICAgICAgICAgICogQHBhcmFtIGVcbiAgICAgICAgICAgICAgICAgKiBAcGFyYW0gdWlcbiAgICAgICAgICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIEh6VGFic1Jlc291cmNlLnByb3RvdHlwZS5fb25BY3RpdmF0ZVRhYiA9IGZ1bmN0aW9uIChlLCB1aSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgaW5zdGFuY2UgPSBlLmRhdGEuaW5zdGFuY2UsIGFjdGl2YXRlZFRhYklkID0gdWkubmV3UGFuZWwuYXR0cihcImlkXCIpLCB0YWJJbmRleCA9IGluc3RhbmNlLl90YWJzU3RhdGVNYXBbYWN0aXZhdGVkVGFiSWRdO1xuICAgICAgICAgICAgICAgICAgICBpbnN0YW5jZS5fdXBkYXRlVGFic1N0YXRlKHRhYkluZGV4KTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIENyZWEgbG9zIGVzdGFkb3MgZGUgbGFzIHBlc3Rhw7FhcyBwYXJhIGVsIGNvbnRyb2wgZGUgdmlzdWFsaXphY2nDs25cbiAgICAgICAgICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIEh6VGFic1Jlc291cmNlLnByb3RvdHlwZS5fY3JlYXRlU3RhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3RhYnNTdGF0ZSA9IFtdO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl90YWJzU3RhdGVNYXAgPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgLy9pZiBhbnkgdGFiIGlzIGFjdGl2ZSBieSBkZWZhdWx0LCBzZXQgdmlzaXRlZCB0byAwXG4gICAgICAgICAgICAgICAgICAgIHZhciAkcGFuZWxzID0gdGhpcy5nZXRJbnN0YW5jZSgpLnBhbmVscztcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgdGFiSW5kZXggPSAwLCAkcGFuZWxzTGVuZ3RoID0gJHBhbmVscy5sZW5ndGg7IHRhYkluZGV4IDwgJHBhbmVsc0xlbmd0aDsgdGFiSW5kZXgrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyICRjdXJyZW50UGFuZWwgPSBpbmRleF8xLiQoJHBhbmVsc1t0YWJJbmRleF0pLCBpZCA9ICRjdXJyZW50UGFuZWwuYXR0cihcImlkXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdGFic1N0YXRlLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpc2l0ZWQ6IGZhbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3RhYnNTdGF0ZU1hcFtpZF0gPSB0YWJJbmRleDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLl92aXNpdGVkQ291bnQgPSAwO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fb3B0aW9ucy50YWJzLmFjdGl2ZSAhPT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZVRhYnNTdGF0ZSh0aGlzLl9vcHRpb25zLnRhYnMuYWN0aXZlIHx8IDApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBIelRhYnNSZXNvdXJjZS5wcm90b3R5cGUuZ2V0SW5zdGFuY2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl90YWJzSW5zdGFuY2U7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBIelRhYnNSZXNvdXJjZS5wcm90b3R5cGUuZGlzYWJsZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKF9zdXBlci5wcm90b3R5cGUuZGlzYWJsZS5jYWxsKHRoaXMpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl90YWJzSW5zdGFuY2UuZGlzYWJsZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBIelRhYnNSZXNvdXJjZS5wcm90b3R5cGUuZW5hYmxlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoX3N1cGVyLnByb3RvdHlwZS5lbmFibGUuY2FsbCh0aGlzKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdGFic0luc3RhbmNlLmVuYWJsZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBSZSBpbmljaWFsaXphIGVsIGNvbXBvbmVudGVcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBIelRhYnNSZXNvdXJjZS5wcm90b3R5cGUucmVmcmVzaCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX3RhYnNJbnN0YW5jZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdGFic1N0YXRlLmRlc3Ryb3koKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB2YXIgdGFic09wdGlvbnMgPSB0aGlzLl9EYXRhT3B0aW9ucy5nZXREYXRhT3B0aW9ucyh0aGlzLl8kZWxlbWVudCwgXCJ0YWJzXCIpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9vcHRpb25zLnRhYnMgPSB0aGlzLl8kLmV4dGVuZCh0cnVlLCBIelRhYnNSZXNvdXJjZV8xLl9ERUZBVUxUX1RBQlNfT1BUSU9OUywgdGFic09wdGlvbnMpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl8kZWxlbWVudC50YWJzKHRoaXMuX29wdGlvbnMudGFicyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3RhYnNJbnN0YW5jZSA9IHRoaXMuXyRlbGVtZW50LmRhdGEoXCJ1aVRhYnNcIik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2NyZWF0ZVN0YXRlKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2Fzc2lnbkV2ZW50cygpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgcmV0dXJuIEh6VGFic1Jlc291cmNlO1xuICAgICAgICAgICAgfShpbmRleF8xLlJlc291cmNlQ29udHJvbGxlcikpO1xuICAgICAgICAgICAgSHpUYWJzUmVzb3VyY2UuX0RFRkFVTFRfVEFCU19PUFRJT05TID0ge307XG4gICAgICAgICAgICBIelRhYnNSZXNvdXJjZSA9IEh6VGFic1Jlc291cmNlXzEgPSBfX2RlY29yYXRlKFtcbiAgICAgICAgICAgICAgICBpbmRleF8xLlJlc291cmNlKHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJIelRhYnNcIixcbiAgICAgICAgICAgICAgICAgICAgZGVwZW5kZW5jaWVzOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmRleF8xLiQsXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmRleF8xLkV2ZW50RW1pdHRlckZhY3RvcnksXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmRleF8xLkRhdGFPcHRpb25zXG4gICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgXSwgSHpUYWJzUmVzb3VyY2UpO1xuICAgICAgICAgICAgZXhwb3J0c18xKFwiSHpUYWJzUmVzb3VyY2VcIiwgSHpUYWJzUmVzb3VyY2UpO1xuICAgICAgICB9XG4gICAgfTtcbn0pO1xuIl0sImZpbGUiOiJIelRhYnNSZXNvdXJjZS5qcyJ9
