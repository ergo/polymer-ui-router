import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { PolymerElement } from '@polymer/polymer/polymer-element.js';
class DefaultComp extends PolymerElement {
  static get template() {
    return html`
        <style>
        </style>

        <h3>"default-comp" component</h3>

        <p>Used when other component was not set</p>
`;
  }

  static get is() { return 'default-comp'; }
}
customElements.define(DefaultComp.is, DefaultComp);
