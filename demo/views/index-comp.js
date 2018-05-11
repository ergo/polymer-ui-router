let tmpl = document.createElement('template');
tmpl.innerHTML = `
        <h3>"default-comp" native web component</h3>

        <p>Used when other component was not set</p>
`;

class IndexComp extends HTMLElement {
    constructor() {
        super();
        let shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.appendChild(tmpl.content.cloneNode(true));
    }
}

customElements.define('index-comp', IndexComp);
