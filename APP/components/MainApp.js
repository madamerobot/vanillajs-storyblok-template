import { getAllEntries } from '../lib/helpers.js';

/** Register the Main App element */

export class MainApp extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		this.data = null;
		this.isLoading = true;
	}

	async fetchData() {
		this.loading = true;
		const response = await getAllEntries();
		this.data = response;
		this.isLoading = false;
	}

	render() {
		if (this.isLoading) {
			this.shadowRoot.innerHTML = `<div>Loading...</div>`;
		} else {
			this.shadowRoot.innerHTML = `
				<h2>Storyblok Entries</h2>
				<ul>
					${this.data
						.map((entry) => {
							return `<li>${entry.name}</li>`;
						})
						.join('')}
				</ul>
			`;
		}
	}

	async connectedCallback() {
		await this.fetchData();
		this.render();
	}
}

export const registerMainApp = () => customElements.define('main-app', MainApp);
