/*
Copyright 2016 Marcin Lulek and contributors

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

import { PolymerElement } from '@polymer/polymer/polymer-element.js';

import UiRouterMixin from './uirouter-mixin.js';
import * as routerCore from '@uirouter/core';

/**
 * Invoked before a transition even begins.
 *
 * @event uirouter-before
 * @param {transition} transition object.
 */

/**
 * Invoked when state is being entered.
 *
 * @event uirouter-enter
 * @param {transition} transition object.
 */

/**
 * Invoked after a transition has been rejected for any reason.
 *
 * @event uirouter-error
 * @param {transition} transition object.
 */

/**
 * Invoked (during a transition) when a specific state is being exited.
 *
 * @event uirouter-exit
 * @param {transition} transition object.
 */

/**
 * Invoked just before a transition finishes. This hook is a last chance to cancel or redirect a transition.
 *
 * @event uirouter-finish
 * @param {transition} transition object.
 */

/**
 * Invoked (during a transition) for a specific state that was previously active will remain active (is not being entered nor exited).
 *
 * @event uirouter-retain
 * @param {transition} transition object.
 */

/**
 * Invoked as a transition starts running. This hook can be useful to perform some asynchronous action before completing a transition.
 *
 * @event uirouter-start
 * @param {transition} transition object.
 */

/**
 * Invoked after a transition successfully completes..
 *
 * @event uirouter-success
 * @param {transition} transition object.
 */

/**
 `polymer-ui-router`
 Polymer element for UI Router Core
 @customElement
 @polymer
 @demo demo/index.html
 */
class UiRouterRouter extends UiRouterMixin(PolymerElement) {
    static get is() {
        return "uirouter-router";
    }

    static get properties() {
        return {
            /** Array of state definitions to create when router gets initialized */
            states: {
                type: Array,
                value: function () {
                    return [];
                },
            },
            /** Start router when element is attached */
            autoStart: {
                type: Boolean,
                value: false
            },
            /** Enable router register itself with visualizer */
            visualizer: {
                type: Boolean,
                value: false
            },
            /** a function executed when router gets started, accepts uiRouter as argument */
            initCallback: {
                type: Object,
                value: null
            },
            /** Enable debug messages */
            debugTracing: {
                type: Boolean,
                value: false
            },
            /** Location plugin used by router */
            locationPlugin: {
                type: Object,
                value: function () {
                    // Provide a html5 pushstate location implementation that uses `location` and `history
                    // uirouter.plugin(routerCore.pushStateLocationPlugin);
                    // Provide a location implementation that uses the hash to manage the url
                    // Provide a in-memory location implementation (for headless/serverside)
                    // uirouter.plugin(routerCore.memoryLocationPlugin); // for headless
                    return routerCore.hashLocationPlugin;
                }
            },
            /** Services plugin used by router */
            servicesPlugin: {
                type: Object,
                value: function () {
                    return routerCore.servicesPlugin;
                }
            }
        }
    }

    /** Registers a new state in the router */
    registerState(state) {
        let views = Object.assign({$default: {component: ''}}, state.views);
        if (state.component && state.component.length > 0) {
            views['$default'] = {component: state.component};
        }
        let stateConf = Object.assign({}, state, {views: views});
        this.uiRouter.stateRegistry.register(stateConf);
    }

    connectedCallback() {
        super.connectedCallback();
        this.uiRouter.plugin(this.locationPlugin);

        // Provide a $q-like and $injector-like API for internal use
        this.uiRouter.plugin(this.servicesPlugin);

        if (this.debugTracing) {
            // Trace whenever a transition starts, succeeds, or errors
            // Trace whenever a ui-view is created or destroyed
            // Trace whenever a view config for a state is activated
            this.uiRouter.trace.enable("TRANSITION", "UIVIEW", "VIEWCONFIG");
        }

        let registry = this.uiRouter.stateRegistry;

        if (this.visualizer) {
            // Enable the transition/state visualizer
            window['ui-router-visualizer'].visualizer(this.uiRouter);
        }

        this.states.forEach(state => {
            this.registerState(state);
        });

        // expose all events by default
        let events = [
            ['onBefore', 'before'],
            ['onEnter', 'enter'],
            ['onError', 'error'],
            ['onExit', 'exit'],
            ['onFinish', 'finish'],
            ['onRetain', 'retain'],
            ['onStart', 'start'],
            ['onSuccess', 'success']
        ];

        events.forEach(currEv => {
            this.uiRouter.transitionService[currEv[0]]({}, this._factoryF(currEv));
        });

        if (this.autoStart) {
            this.start();
        }
    }

    _factoryF(currEv) {
        return transition => {
            this.dispatchEvent(
                new CustomEvent('uirouter-' + currEv[1],
                    {detail: {transition: transition}, bubbles: true, composed: true}));
        };
    }

    /** Starts router object */
    start() {
        if (this.initCallback !== null) {
            this.initCallback(this.uiRouter);
        }
        this.uiRouter.urlService.listen();
        this.uiRouter.urlService.sync();
    }

}

// Register the new element with the browser
customElements.define(UiRouterRouter.is, UiRouterRouter);
