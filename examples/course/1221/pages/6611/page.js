System.register(["jquery-ui/themes/base/core.css!", "jquery-ui/themes/base/tabs.css!", "jquery-ui/themes/base/theme.css!", "@haztivity/core/index", "./page.html!text", "../../../../../src/HzTabs"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var index_1, page_html_text_1, HzTabs_1, page;
    return {
        setters: [
            function (_1) {
            },
            function (_2) {
            },
            function (_3) {
            },
            function (index_1_1) {
                index_1 = index_1_1;
            },
            function (page_html_text_1_1) {
                page_html_text_1 = page_html_text_1_1;
            },
            function (HzTabs_1_1) {
                HzTabs_1 = HzTabs_1_1;
            }
        ],
        execute: function () {
            exports_1("page", page = index_1.PageFactory.createPage({
                name: "6611",
                resources: [
                    HzTabs_1.HzTabsResource
                ],
                template: page_html_text_1.default
            }));
            page.on(index_1.PageController.ON_RENDERING, null, function (eventObject, template, pageController) {
                console.log(pageController.options.name + " rendering");
            });
            page.on(index_1.PageController.ON_RENDERED, null, function (eventObject, $page, pageController) {
                console.log(pageController.options.name + " rendered");
            });
            page.on(index_1.PageController.ON_SHOW, null, function (eventObject, $page, $oldPage, oldPageRelativePosition, pageController) {
                console.log(pageController.options.name + " show start");
            });
            page.on(index_1.PageController.ON_SHOWN, null, function (eventObject, $page, $oldPage, oldPageRelativePosition, pageController) {
                console.log(pageController.options.name + " show end");
            });
            page.on(index_1.PageController.ON_COMPLETE_CHANGE, null, function (eventObject, isCompleted, $page, pageController) {
                console.log(pageController.options.name + " complete change");
            });
            page.on(index_1.PageController.ON_DESTROY, null, function (eventObject, $page, pageController) {
                console.log(pageController.options.name + " destroy");
            });
        }
    };
});
//# sourceMappingURL=page.js.map