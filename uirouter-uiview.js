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
/**
`uirouter-uiview`

A UI-Router viewport component, which is filled in by a view components based on active state.
Components stomped with this element will have `uiRouterTransition`, `uiRouterResolvedData`, `uiRouterParams`
properties set on them for easy access to router object.

`uiRouterResolvedData` keys will also be resolved onto components as separate properties.

@demo demo/demo-uiview.html uirouter-uiview element demo

*/

import UiRouterMixin from './uirouter-mixin.js';
import * as routerCore from '@uirouter/core';

import { PolymerElement } from '@polymer/polymer/polymer-element.js';
class UiRouterUiView extends UiRouterMixin(PolymerElement) {
    static get is() { return "uirouter-uiview"; }
    static get properties() {
        return {
            /** default component type to use */
            component: String,
            /** Name of ui-view partial */
            name: String,
            /** Do not attach router info onto element: `uiRouter...` */
            doNotAttachRouterInfo: {
                type: Boolean,
                value: false
            },
            /**
             * Explicit names of properties to pass down to stomped elements
             */
            passDownwards: {
                type: Array,
                value: function() {
                    return []
                }
            }
        }
    }

    _getParentEl(el) {
        return el.parentNode || el.host;
    }

    _findParentUIView(el) {
        while ((el = this._getParentEl(el)) && el.tagName !== 'UIROUTER-UIVIEW') ;
        return el;
    }

    _setActiveUIView() {
        let name = this.name || '$default';

        let rootContext = this.uiRouter.stateRegistry.root();
        let parentUIView = this._findParentUIView(this);
        let parentContext = parentUIView &&
            parentUIView.viewConfig &&
            parentUIView.viewConfig.viewDecl &&
            parentUIView.viewConfig.viewDecl.$context;

        let parentFqn = parentUIView &&
            parentUIView.activeUIView &&
            parentUIView.activeUIView.fqn;
        this.activeUIView = {
            $type: 'polymer',
            id: this.uiRouter.viewService.uiviewcount++,
            name: name,

            // This should walk up the elements and find parent
            // ui-view. It should figure out what its own fqn is
            // by appending its name to the parent ui-view's fqn.
            fqn: parentFqn ? parentFqn + "." + name : name,

            // What state the ui-view was created by
            // When a state fills some ui-view with a component
            // and that component itself has a ui-view, then
            // creationContext for the nested ui-view should
            // be set to that state.
            creationContext: parentContext || rootContext,

            // When a ui-view should be filled by a component
            // because a state is activated, this will be called
            // with the configuration details.
            configUpdated: this._configUpdated.bind(this)
        }
    }

    connectedCallback() {
        super.connectedCallback();
        this._setActiveUIView();
        // should call this callback when the polymer-ui-view element is destroyed
        this.deregister = this.uiRouter.viewService.registerUIView(this.activeUIView);
        // registers observers that will pass down props to child elements
        this.passDownwards.forEach(p => {
            if (!Object.hasOwnProperty('__passdownProp-' + p)) {
                this['__passdownProp-' + p] = newVal => {
                    let child = this.firstChild;
                    if (child !== null) {
                        child[p] = this[p];
                    }
                };
                this._createPropertyObserver(p, '__passdownProp-' + p, true);
            }
        });
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this.deregister();
    }

    _configUpdated(newConfig) {
        if (this.viewConfig === newConfig) return;
        this.viewConfig = newConfig;

        // a state is targeting this uiview
        // Now we need to use the `newConfig` data to
        // update which component is inside this ui-view
        let componentType = (newConfig && newConfig.viewDecl.component) || this.component || "";
        let isAbstract = (newConfig && newConfig.viewDecl['$context'].self.abstract === true);
        if (isAbstract){
            componentType = 'uirouter-uiview'
        }
        let child = this.firstChild;
        if (child !== null) {
            this.removeChild(child)
        }
        if (componentType.length > 0) {
            let elem = document.createElement(componentType);
            if (!this.doNotAttachRouterInfo) {
                let Transition = routerCore.Transition;
                let ResolveContext = routerCore.ResolveContext;
                let resolveContext = new ResolveContext(newConfig.path);
                let transition = resolveContext.getResolvable(Transition).data;
                let tokens = [];
                let resolvedData = {};
                if (transition) {
                    tokens = transition.getResolveTokens().filter(
                        function (token) {
                            return typeof token === 'string';
                        });
                    tokens.forEach(function (token) {
                        resolvedData[token] = transition.injector().get(token);
                    });
                }
                Object.keys(resolvedData).filter(function (key) {
                    return ["$transition$", "$stateParams", "$state$"].indexOf(key) === -1
                }).forEach(function (key) {
                    elem[key] = resolvedData[key];
                });
                if (isAbstract){
                    elem.component = this.components;
                    elem.name = this.name;
                    elem.passDownwards = this.passDownwards;
                    elem.doNotAttachRouterInfo = this.doNotAttachRouterInfo;
                }
                elem.uiRouterTransition = transition;
                elem.uiRouterResolvedData = resolvedData;
                elem.uiRouterParams = transition.params();
                this.passDownwards.forEach(p => {
                    elem[p] = this[p];
                });
            }
            this.appendChild(elem);
        }
    }
}
// Register the new element with the browser
customElements.define(UiRouterUiView.is, UiRouterUiView);
