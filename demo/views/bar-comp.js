import '../../uirouter-uiview.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { PolymerElement } from '@polymer/polymer/polymer-element.js';

class BarComp extends PolymerElement {
  static get template() {
    return html`
        <style>
            em{
                background-color: #dddddd;
            }

            uirouter-uiview {
                padding: 15px;
                border: 2px dashed blue;
                display: block;
            }

        </style>

        <h1>"bar-comp" component</h1>

        <p>[[counter]] [[clock]]</p>

        <div style="padding: 10px">
            <p>Another <em>ui-router-view</em> element lives here that will stomp descendant views of \`bar\`</p>
            <uirouter-uiview class="inner-ui-view" counter="[[counter]]" clock="[[clock]]" pass-downwards="[[passDownwards]]">

            </uirouter-uiview>
        </div>
`;
  }

  static get is() { return 'bar-comp'; }
  static get properties() {
      return {
          passDownwards: {
              type: Array,
              value: function () {
                  return ['counter', 'clock']
              }
          }
      }
  }
}
customElements.define(BarComp.is, BarComp);
