# hz-tabs
hz-tabs allows to create tabs as resources with all the advatages of an haztivity resource.\
hz-tabs uses [jquery ui tabs](https://jqueryui.com/tabs/) under the hood.
## Install
### NPM
```npm i --save @haztivity/hz-tabs```
## Dependencies
- JQuery
- JQuery UI tabs
- @haztivity/core
## Usage
1. Import @haztivity/hz-tabs
2. Add HzTabsResource to the page
3. Create the tabs and set ```data-hz-resource="HzTabs"```
### Ts
```typescript
import {PageFactory, Page, PageController, PageRegister} from "@haztivity/core";
import template from "./page.pug";
import {HzTabsResource} from "@haztivity/hz-tabs";
export let page: PageRegister = PageFactory.createPage(
  {
      name: "myPage",
      resources: [
          HzTabsResource
      ],
      template: template
  }
);
```

##### Pug
```jade
div(data-hz-resource="HzTabs")
  ul
      li
          a(href='#tabs-1') Tab 1
      li
          a(href='#tabs-2') Tab 2
  div#tabs-1
      p Tab 1 content
  div#tabs-2
      p Tab 2 content
```
or
##### HTML
```html
<div data-hz-resource="HzTabs">
  <ul>
      <li>
          <a href="#tabs-1">Tab 1</a>
      </li>
      <li>
          <a href="#tabs-2">Tab 2</a>
      </li>
  </ul>
  <div id="tabs-1">Tab 1 content</div>
  <div id="tabs-2">Tab 2 content</div>
</div>
```
## Sequence
By default, the tabs requires to be activate sequentially, to activate the 3rd tabs the 2nd must have been activated before.\
It's possible to disable this behavior using the attribute `data-opt-hz-tabs-sequential="false"`
### Options
All the options of jquery ui accordion **except** functions could be specified by attributes using:
```jade
    data-opt-tabs-[option]=[value]
```
If the option have multiple words, use dashes, for example ```heightStyle``` have to be provided as ```height-style```
### Examples:
#### Pug
```jade
div(data-hz-resource="HzTabs"
    data-opt-tabs-collapsible="true"
    data-opt-tabs-active="false)
    ul
        li
            a(href='#collapsible-tabs-1') Collapsible  Tab 1
        li
            a(href='#collapsible-tabs-2') Collapsible Tab 2
    div#collapsible-tabs-1
        p Tab 1 content
    div#collapsible-tabs-2
        p Tab 2 content
```
or
#### HTML
```html
<div data-hz-resource="HzTabs data-opt-tabs-collapsible="true" data-opt-tabs-active="false>
    <ul>
        <li>
            <a href="#collapsible-tabs-1">Tab 1</a>
        </li>
        <li>
            <a href="#collapsible-tabs-2">Tab 2</a>
        </li>
    </ul>
    <div id="collapsible-tabs-1">Collapsible Tab 1 content</div>
    <div id="collapsible-tabs-2">Collapsible Tab 2 content</div>
</div>
```
 ### Events
The events are assigned through jquery like usuals
#### page.ts
```typescript
page.on(
    PageController.ON_RENDERED, null, (eventObject, $page: JQuery, pageController: PageController) => {
        //Find in the page the element that has tabs
        $page.find('#tabs-events').on('tabsactivate', (event, ui)=>{
            alert(`Tab changed, previous: ${ui.oldPanel.attr("id")}, new tab: ${ui.newPanel.attr("id")}`);
            console.log(`Tab changed, previous: ${ui.oldPanel.attr("id")}, new tab: ${ui.newPanel.attr("id")}`);
        });
    }
);
```
### Methods
The same with the methods
#### page.ts
```typescript
page.on(
    PageController.ON_RENDERED, null, (eventObject, $page: JQuery, pageController: PageController) => {
        //Find in the page the element that has slick
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
```
