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

import * as routerCore from '@uirouter/core';
import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

let uirouter = new routerCore.UIRouter();
uirouter.viewService.uiviewcount = 0;
uirouter.viewService.viewconfigcount = 0;

// Create an internal ViewConfig representation from a state.views object
function viewConfigFactory(pathnodes, viewDeclaration) {
    let config = {
        $id: uirouter.viewService.viewconfigcount++,
        path: pathnodes,
        viewDecl: viewDeclaration,
        loaded: true,
        load: function () {
            return Promise.resolve()
        }
    };

    return [config];
}

// Register the factory. It will be used when the view type is `polymer`.
uirouter.viewService._pluginapi._viewConfigFactory('polymer', viewConfigFactory);

/** This is a [[StateBuilder.builder]] function for `views`. */
// https://ui-router.github.io/ng1/docs/latest/classes/ng1.stateprovider.html#decorator
function polymerViewsBuilder(state) {
    let views = {}, viewsObject = state.views || {"$default": {component: state.component}};

    let names = Object.keys(viewsObject);
    names.forEach(name => {
        let config = viewsObject[name];
        name = name || "$default"; // Account for views: { "": { component... } }
        if (Object.keys(config).length == 0) return;

        config.$type = "polymer";
        config.$context = state;
        config.$name = name;

        let normalized = routerCore.ViewService.normalizeUIViewTarget(config.$context, config.$name);
        config.$uiViewName = normalized.uiViewName;
        config.$uiViewContextAnchor = normalized.uiViewContextAnchor;

        views[name] = config;
    });
    return views;
}

uirouter.stateRegistry.decorator('views', polymerViewsBuilder);

/*
 * This mixin adds ui uiRouter property with router instance to element
 * @polymer
 * @mixinFunction
 */
let UiRouterMixinInternal = function(superClass) {
    return class extends superClass {
        constructor() {
            super();
        }

        static get properties() {
            return {
                /** Shared UI router global instance */
                uiRouter: {
                    type: Object,
                    value: function () {
                        return uirouter;
                    }
                }
            }
        }
    }
};

const UiRouterMixin = dedupingMixin(UiRouterMixinInternal);
export {uirouter};
export default UiRouterMixin;
