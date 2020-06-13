/** Register the Main App element */

export class MainApp extends HTMLElement {
	async connectedCallback() {
		this.innerHTML = `<h1>Main App</h1>`;
	}
}

export const registerMainApp = () => customElements.define('main-app', MainApp);
