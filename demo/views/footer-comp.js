import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { PolymerElement } from '@polymer/polymer/polymer-element.js';

class FooterComp extends PolymerElement {
  static get template() {
    return html`
        <style>
        </style>

        <h1>Footer</h1>
`;
  }

  static get is() { return 'footer-comp'; }
}
customElements.define(FooterComp.is, FooterComp);
