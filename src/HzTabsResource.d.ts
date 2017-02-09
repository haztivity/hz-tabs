/// <reference types="@haztivity" />
/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
import { ResourceController, DataOptions } from "@haztivity/core/index";
export declare class HzTabsResource extends ResourceController {
    static readonly _DEFAULT_TABS_OPTIONS: {};
    protected _DataOptions: DataOptions;
    protected _tabsInstance: any;
    protected _tabsState: any;
    protected _tabsStateMap: any;
    protected _visitedCount: any;
    constructor(_$: any, _EventEmitterFactory: any, _DataOptions: any);
    init(options: any, config?: any): any;
    /**
     * Actualiza el estado de una pestaña. Si todas las pestañas han sido visitadas se marca el recurso como completado
     * @param tabIndex
     * @private
     */
    protected _updateTabsState(tabIndex: any): void;
    protected _assignEvents(): void;
    /**
     * Invocado al activarse una pestaña, se actualiza el estado de la misma
     * @param e
     * @param ui
     * @private
     */
    protected _onActivateTab(e: any, ui: any): void;
    /**
     * Crea los estados de las pestañas para el control de visualización
     * @private
     */
    protected _createState(): void;
    getInstance(): any;
    disable(): void;
    enable(): void;
    /**
     * Re inicializa el componente
     */
    refresh(): void;
}
