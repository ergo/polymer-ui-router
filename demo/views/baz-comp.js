import '../../uirouter-uiview.js';
import '../../uirouter-sref.js';
import '../../uirouter-sref-active.js';
import './default-comp.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { PolymerElement } from '@polymer/polymer/polymer-element.js';
class BazComp extends PolymerElement {
  static get template() {
    return html`
        <style>
            :host {
                display: block;
            }

            em {
                background-color: #dddddd;
            }

            .active {
                font-weight: bold;
                text-transform: uppercase;
                border-bottom: 2px solid red;
            }

            .route-active {
                font-weight: bold;
                text-transform: uppercase;
                border-bottom: 2px solid blue;
            }

            uirouter-uiview {
                padding: 15px;
                border: 2px dashed green;
                display: block;
            }


        </style>

        <h1>"baz-comp" component</h1>

        <p><em>ui-router-view</em> element lives here that will stomp descendant views of \`baz\`</p>

        <p>[[counter]] [[clock]]</p>

        <uirouter-sref-active>
            <uirouter-sref state="state_a">State A</uirouter-sref>
        </uirouter-sref-active>
        |
        <uirouter-sref-active>
            <uirouter-sref state="state_b">State B</uirouter-sref>
        </uirouter-sref-active>

        <uirouter-uiview component="default-comp" counter="[[counter]]" clock="[[clock]]" pass-downwards="[[passDownwards]]">

        </uirouter-uiview>
`;
  }

  static get is() { return 'baz-comp'; }
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
customElements.define(BazComp.is, BazComp);
