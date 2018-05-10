import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { PolymerElement } from '@polymer/polymer/polymer-element.js';

class ArgumentsComp extends PolymerElement {
  static get template() {
    return html`
        <style>
            blockquote{
                border: 1px solid #eeeeee;
                padding: 10px;
                background-color: #f5f5f5;
            }
        </style>

        <h1>"arguments-comp" component</h1>

        <p>Current route arguments (taken from attached \`uiRouterTransition\` object)</p>
        <blockquote>[[currentParams]]</blockquote>
`;
  }

  static get is() { return 'arguments-comp'; }
  static get properties() {
      return {
          currentParams: Object,
          uiRouterTransition: Object
      }
  }

  connectedCallback(){
      super.connectedCallback();
      this.currentParams = JSON.stringify(this.uiRouterTransition.params());
  }
}
customElements.define(ArgumentsComp.is, ArgumentsComp);
