let BazBElemTmpl = document.createElement('template');
BazBElemTmpl.innerHTML = `
        <h3>"baz-b-comp" native component</h3>
`;

class BazBComp extends HTMLElement {
    constructor() {
        super();
        let shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.appendChild(BazBElemTmpl.content.cloneNode(true));
    }
}

customElements.define('baz-b-comp', BazBComp);
