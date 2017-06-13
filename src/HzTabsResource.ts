/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
import {Resource, ResourceController, EventEmitterFactory, $, DataOptions} from "@haztivity/core";
import "jquery-ui-dist/jquery-ui.js";
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
    protected _activated =[];
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
        this._$element.off("."+HzTabsResource.NAMESPACE);
        this._$element.on( `tabsactivate.${HzTabsResource.NAMESPACE}`, {instance:this}, this._onActivateTab);
        this._$element.on( `tabsbeforeactivate.${HzTabsResource.NAMESPACE}`, {instance:this}, this._onBeforeActivateTab);
    }

    /**
     * Invocado antes de activarse una pestaña. Comprueba la secuencia y premite o cancela la activación
     * @param e
     * @param ui
     * @private
     */
    protected _onBeforeActivateTab(e,ui){
        let instance = e.data.instance;
        if(instance._options.sequential != false){
            let newTab = ui.newTab;
            if(newTab && newTab.length > 0){
                let prevent = true,
                    index = instance._tabsInstance.tabs.index(newTab);
                //if the header is not the first
                if(index != 0){
                    //get the previous header
                    let sibling = instance._tabsInstance.tabs.get(index-1),
                        siblingId = instance._$(sibling).attr("aria-labelledby");
                    //check if has been activated
                    if(instance._activated.indexOf(siblingId) != -1){
                        prevent = false;
                    }
                }else{
                    prevent = false;
                }
                if(prevent){
                    e.preventDefault();
                }
            }
        }
    }
    /**
     * Invocado al activarse una pestaña, se actualiza el estado de la misma
     * @param e
     * @param ui
     * @private
     */
    protected _onActivateTab(e,ui){
        e.data.instance._storeActive();
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
    protected _storeActive(){
        if(this._tabsInstance){
            if(this._tabsInstance.active.length > 0) {
                let id = this._tabsInstance.active.attr("aria-labelledby");
                if(this._activated.indexOf(id) == -1) {
                    this._activated.push(id);
                    this._tabsInstance.active.removeClass(HzTabsResource.CLASS_UNCOMPLETED).addClass(HzTabsResource.CLASS_COMPLETED);
                    this._tabsInstance.panels.eq(this._tabsInstance.tabs.index(this._tabsInstance.active)).removeClass(HzTabsResource.CLASS_UNCOMPLETED).addClass(HzTabsResource.CLASS_COMPLETED);
                }
            }
            if(this.isCompleted() != true && this._activated.length == this._tabsInstance.tabs.length){
                this._markAsCompleted();
            }
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
        this._options.tabs = this._$.extend(true,{}, HzTabsResource._DEFAULT_TABS_OPTIONS, tabsOptions);
        this._$element.tabs(this._options.tabs);
        this._tabsInstance = this._$element.data("uiTabs");
        this._tabsInstance.tabs.addClass(HzTabsResource.CLASS_UNCOMPLETED);
        this._tabsInstance.panels.addClass(HzTabsResource.CLASS_UNCOMPLETED);
        this._storeActive();
        this._assignEvents();
    }
}