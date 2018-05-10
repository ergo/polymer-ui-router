import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { PolymerElement } from '@polymer/polymer/polymer-element.js';

class IndexComp extends PolymerElement {
  static get template() {
    return html`
        <style>
        </style>

        <h1>"index-comp" component</h1>
`;
  }

  static get is() {
      return 'index-comp';
  }
}

customElements.define(IndexComp.is, IndexComp);
