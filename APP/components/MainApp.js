import { getAllEntries } from '../lib/helpers.js';

/** Register the Main App element */

export class MainApp extends HTMLElement {
	async connectedCallback() {
		getAllEntries().then((data) => {
			data = data[0];
			this.innerHTML = `<div>
					<h1>Main Cool App</h1>
					<span>My Entry Name is ${data.name} (this is data coming from Storyblok)</span>
				</div>`;
		});
	}
}

export const registerMainApp = () => customElements.define('main-app', MainApp);
