/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
import {Resource, ResourceController, EventEmitterFactory, $, DataOptions} from "@haztivity/core/index";
import "jquery-ui/ui/widgets/tabs";
@Resource(
    {
        name: "HzTabs",
        dependencies: [
            $,
            EventEmitterFactory,
            DataOptions
        ]
    }
)
export class HzTabsResource extends ResourceController {
    public static readonly _DEFAULT_TABS_OPTIONS = {};
    protected _DataOptions: DataOptions;
    protected _tabsInstance;
    protected _tabsState;
    protected _tabsStateMap;
    protected _visitedCount;

    constructor(_$, _EventEmitterFactory, _DataOptions) {
        super(_$, _EventEmitterFactory);
        this._DataOptions = _DataOptions;
    }

    public init(options: any, config?: any): any {
        this._config = config;
        this.refresh();
    }

    /**
     * Actualiza el estado de una pestaña. Si todas las pestañas han sido visitadas se marca el recurso como completado
     * @param tabIndex
     * @private
     */
    protected _updateTabsState(tabIndex) {
        let tabState = this._tabsState[tabIndex];
        if(tabState){
            if(tabState.visited !== true){
                tabState.visited = true;
                this._visitedCount++;
                if(this._visitedCount === this._tabsState.length){
                    this._markAsCompleted();
                }
            }
        }
    }
    protected _assignEvents(){
        this._$element.off(HzTabsResource.NAMESPACE).on( `tabsactivate.${HzTabsResource.NAMESPACE}`, {instance:this}, this._onActivateTab);
    }

    /**
     * Invocado al activarse una pestaña, se actualiza el estado de la misma
     * @param e
     * @param ui
     * @private
     */
    protected _onActivateTab(e,ui){
        let instance = e.data.instance,
            activatedTabId = ui.newPanel.attr("id"),
            tabIndex = instance._tabsStateMap[activatedTabId];
        instance._updateTabsState(tabIndex);
    }
    /**
     * Crea los estados de las pestañas para el control de visualización
     * @private
     */
    protected _createState() {
        this._tabsState = [];
        this._tabsStateMap = {};
        //if any tab is active by default, set visited to 0
        let $panels = this.getInstance().panels;
        for (let tabIndex = 0, $panelsLength = $panels.length; tabIndex < $panelsLength; tabIndex++) {
            let $currentPanel = $($panels[tabIndex]),
                id = $currentPanel.attr("id");
            this._tabsState.push(
                {
                    visited: false
                }
            );
            this._tabsStateMap[id] = tabIndex;
        }

        this._visitedCount = 0;
        if(this._options.tabs.active !== false) {
            this._updateTabsState(this._options.tabs.active || 0);
        }
    }

    public getInstance(): any {
        return this._tabsInstance;
    }
    public disable(){
        if(super.disable()){
            this._tabsInstance.disable();
        }
    }
    public enable(){
        if(super.enable()){
            this._tabsInstance.enable();
        }
    }
    /**
     * Re inicializa el componente
     */
    public refresh(){
        if(this._tabsInstance){
            this._tabsState.destroy();
        }
        let tabsOptions = this._DataOptions.getDataOptions(this._$element, "tabs");
        this._options.tabs = this._$.extend(true, HzTabsResource._DEFAULT_TABS_OPTIONS, tabsOptions);
        this._$element.tabs(this._options.tabs);
        this._tabsInstance = this._$element.data("uiTabs");
        this._createState();
        this._assignEvents();
    }
}