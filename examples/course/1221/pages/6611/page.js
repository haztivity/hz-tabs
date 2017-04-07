"use strict";
/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
require("jquery-ui/themes/base/core.css!");
require("jquery-ui/themes/base/tabs.css!");
require("jquery-ui/themes/base/theme.css!");
var index_1 = require("@haztivity/core/index");
var template = require("./page.html!text");
var HzTabs_1 = require("../../../../../src/HzTabs");
exports.page = index_1.PageFactory.createPage({
    name: "6611",
    resources: [
        HzTabs_1.HzTabsResource
    ],
    template: template
});
exports.page.on(index_1.PageController.ON_RENDERING, null, function (eventObject, template, pageController) {
    console.log(pageController.options.name + " rendering");
});
exports.page.on(index_1.PageController.ON_RENDERED, null, function (eventObject, $page, pageController) {
    console.log(pageController.options.name + " rendered");
});
exports.page.on(index_1.PageController.ON_SHOW, null, function (eventObject, $page, $oldPage, oldPageRelativePosition, pageController) {
    console.log(pageController.options.name + " show start");
});
exports.page.on(index_1.PageController.ON_SHOWN, null, function (eventObject, $page, $oldPage, oldPageRelativePosition, pageController) {
    console.log(pageController.options.name + " show end");
});
exports.page.on(index_1.PageController.ON_COMPLETE_CHANGE, null, function (eventObject, isCompleted, $page, pageController) {
    console.log(pageController.options.name + " complete change");
});
exports.page.on(index_1.PageController.ON_DESTROY, null, function (eventObject, $page, pageController) {
    console.log(pageController.options.name + " destroy");
});
//# sourceMappingURL=page.js.map