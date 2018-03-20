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
        name: "6611",
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
