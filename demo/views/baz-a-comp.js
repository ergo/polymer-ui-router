import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { PolymerElement } from '@polymer/polymer/polymer-element.js';
class BazAComp extends PolymerElement {
  static get template() {
    return html`
        <style>
        </style>

        <h3>"baz-a-comp" component</h3>
`;
  }

  static get is() { return 'baz-a-comp'; }
}
customElements.define(BazAComp.is, BazAComp);
