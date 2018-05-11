import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { PolymerElement } from '@polymer/polymer/polymer-element.js';

class ResolveComp extends PolymerElement {
  static get template() {
    return html`
        <style>
        </style>

        <h1>"resolve-comp" component</h1>

        <p>Resolved \`Person\` Data</p>
        <p>[[resolvedData]]</p>
`;
  }

  static get is() {
      return 'resolve-comp';
  }

  connectedCallback() {
      super.connectedCallback();
      // this.person is being set by `ui-view` from the resolve
      // you can also access this via `uiRouterResolvedData` containing all the resolve keys
      this.resolvedData = JSON.stringify(this.person);
  }
}

customElements.define(ResolveComp.is, ResolveComp);
