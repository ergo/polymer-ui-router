import UiRouterMixin from './uirouter-mixin.js';

/**
 `uirouter-sref-active`

 Element that sets CSS class on itself when any route used by `uirouter-sref` element that is its child is active.

 @customElement
 @polymer
 @demo demo/demo-sref-active.html uirouter-sref-active element demo

 */
class UiRouterSrefActive extends UiRouterMixin(HTMLElement) {
    static get is() { return "uirouter-sref-active"; }

    static get observedAttributes() {
        return ['active'];
    }

    constructor(){
        super();
        this.active = this.getAttribute('active') || 'route-active';
        this._registered = [];
    }

    connectedCallback() {
        this._transListener = this.uiRouter.transitionService.onSuccess({}, this._checkTransition.bind(this));
        this.addEventListener('uirouter-sref-attached', this.srefAttached.bind(this));
        this.addEventListener('uirouter-sref-detached', this.srefDetached.bind(this));
    }
    disconnectedCallback() {
        this._transListener();
        this.removeEventListener('uirouter-sref-attached', this.srefAttached.bind(this));
        this.removeEventListener('uirouter-sref-detached', this.srefDetached.bind(this));
    }
    _checkTransition() {
        let isActive = false;
        for (let i = 0; i < this._registered.length; i++) {
            let included = this.uiRouter.stateService.includes(
                this._registered[i].name, this._registered[i].params
            );
            if (included) {
                isActive = true;
                break
            }
        }
        let splitClasses = this.active.split(' ');
        for (let i = 0; i < splitClasses.length; i++) {
            this.classList.toggle(splitClasses[i], isActive);
        }
    }
    srefAttached(event) {
        this._registered.push({
            name: event.detail.state,
            params: event.detail.params,
            hash: event.detail.state + JSON.stringify(event.detail.params)
        });
        this._checkTransition();
    }
    srefDetached(event) {
        let hash = event.detail.state + JSON.stringify(event.detail.params);
        for (let i = 0; i < this._registered.length; i++) {
            if (this._registered[i].hash === hash) {
                this._registered.splice(i, 1);
                break;
            }
        }
        this._checkTransition();
    }
}
// Register the new element with the browser
customElements.define(UiRouterSrefActive.is, UiRouterSrefActive);
