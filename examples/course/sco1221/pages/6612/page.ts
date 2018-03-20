/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
import {PageFactory, PageRegister, PageController} from "@haztivity/core";
import template from "./page.pug";
import * as Prism "prismjs";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-pug";
import {HzTabsResource} from "../../../resources/hz-tabs/HzTabs";
export let page: PageRegister = PageFactory.createPage(
    {
        name: "6612",
        resources: [
            HzTabsResource
        ],
        template: template,
        autoSequence:false
    }
);
page.on(
    PageController.ON_SHOW, null, (eventObject, $page, $oldPage, oldPageRelativePosition, pageController) => {
        Prism.highlightAll(false);
    }
);
page.on(
    PageController.ON_RENDERED, null, (eventObject, $page: JQuery, pageController: PageController) => {
        //Find in the page the element that has tabs
        $page.find('#tabs-events').on('tabsactivate', (event, ui)=>{
            alert(`Tab changed, previous: ${ui.oldPanel.attr("id")}, new tab: ${ui.newPanel.attr("id")}`);
            console.log(`Tab changed, previous: ${ui.oldPanel.attr("id")}, new tab: ${ui.newPanel.attr("id")}`);
        });
        let $tabsMethod = $page.find('#tabs-method');
        $page.find('#toggleDisabled').on('click', (event)=>{
            if($tabsMethod.tabs("option","disabled")){
                $tabsMethod.tabs("enable");
            }else{
                $tabsMethod.tabs("disable");
            }
        });
    }
);