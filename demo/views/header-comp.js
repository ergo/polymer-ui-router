import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { PolymerElement } from '@polymer/polymer/polymer-element.js';

class HeaderComp extends PolymerElement {
  static get template() {
    return html`
        <style>
        </style>

        <h1>Header</h1>
`;
  }

  static get is() { return 'header-comp'; }
}
customElements.define(HeaderComp.is, HeaderComp);
