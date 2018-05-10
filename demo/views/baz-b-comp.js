import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { PolymerElement } from '@polymer/polymer/polymer-element.js';
class BazBComp extends PolymerElement {
  static get template() {
    return html`
        <style>
        </style>

        <h3>"baz-b-comp" component</h3>
`;
  }

  static get is() { return 'baz-b-comp'; }
}
customElements.define(BazBComp.is, BazBComp);
