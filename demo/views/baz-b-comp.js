let tmpl = document.createElement('template');
tmpl.innerHTML = `
        <h3>"baz-b-comp" native component</h3>
`;

class BazBComp extends HTMLElement {
    constructor() {
        super();
        let shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.appendChild(tmpl.content.cloneNode(true));
    }
}

customElements.define('baz-b-comp', BazBComp);
