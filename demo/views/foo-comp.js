import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { PolymerElement } from '@polymer/polymer/polymer-element.js';

class FooComp extends PolymerElement {
  static get template() {
    return html`
        <style>
        </style>

        <h1>"foo-comp" component</h1>

        <p>If <em>uirouter-uiview</em> component had some bindings passed from
            parent you should see them here:</p>
        <p>[[counter]] [[clock]]</p>
`;
  }

  static get is() {
      return 'foo-comp';
  }

  connectedCallback() {
      super.connectedCallback();
      console.log('foo component is attached');
  }

  disconnectedCallback() {
      super.disconnectedCallback();
      console.log('foo component is detached');
  }
}

customElements.define(FooComp.is, FooComp);
