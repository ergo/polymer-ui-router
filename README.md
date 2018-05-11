# \<polymer-ui-router\>

## UI Router Web Component wrapper (using minimal bits from Polymer 2.x base element)

Use https://ui-router.github.io/core/docs/latest/ and https://ui-router.github.io/ 
For general UI-Router documentation.

**Demo page: https://www.webcomponents.org/element/ergo/polymer-ui-router**

UI-Router is one of most popular routing solutions, 
with ports for angular 1.x, 2.x+ and react - now also available for Web Components.

UI-Router provides state based routing. Each feature of an application is defined as a state. One state is active at any time, and UI-Router manages the transitions between the states.

Each state describes the URL, the UI (a view or views), data prerequisites, and other logical prerequisites (such as authentication) for a feature. Before activating a state, UI-Router first fetches any prerequisites (asynchronously), and then activates the view(s) and updates the URL.

UI-Router states are hierarchical; states can be nested inside other states, forming a tree.
Child states may inherit data and behavior (such as authentication) from their parent states.

Some features of UI Router:

* Hierarchical states both abstract and components based
* States can be resolve *(including async)* and activate based on set prerequisites 
* Multiple views per state
* Views can be nested inside other views
* Transition and lifecycle API's

## Example usage

    let routerStates = [
       {name: "index_route", url: "/index", component: "index-comp"},
       {name: "foo", url: "/foo", component: "foo-comp"},
       {name: "arg", url: "/arg/:argumentId?:test", component: "arguments-comp"},
       {name: "user", url: "/bar", component: "bar-comp"},
       {name: "state_a", parent: 'bar.baz', url: "/a", component: "baz-a-comp"},
       {name: "state_b", parent: 'bar.baz', url: "/b", component: "baz-b-comp"}
       ]
    // top-level
    <uirouter-router id="ui-router" states="[[routerStates]]" auto-start>
    </uirouter-router>
    
    // view level, generates A tags
    <uirouter-sref state="foo" reload>Foo (this restomps every click)</uirouter-sref>
    <uirouter-sref state="arg" param-argument-id="99">
        With arguments directly
    </uirouter-sref>
    
    // this injects new views based on router state, /index path will 
    // result in <index-comp/> being stomped
    <uirouter-uiview></uirouter-uiview>


## Webpack users

To use `polymer-ui-router` with webpack you need to shim the UMD namespace for everything to function correctly.

    let UIRouterCore = require('../bower_components/polymer-ui-router/vendor/ui-router-core.js')
    window['@uirouter/core'] = UIRouterCore;

## Install the Polymer-CLI

First, make sure you have the [Polymer CLI](https://www.npmjs.com/package/polymer-cli) installed. 

Install bower and npm dependencies (quick way is `yarn bower`).

Then run `yarn serve` to serve your application locally.

## TIPS

Set a `<base href="$path">` tag in your index.html to let the router know the static/base part of your URL
