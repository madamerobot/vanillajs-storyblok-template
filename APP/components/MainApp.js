import { getAllEntries } from '../lib/helpers.js';

/** Register the Main App element */

export class MainApp extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		this.data = null;
		this.isLoading = true;
		this._button = null;
	}

	async fetchData() {
		this.loading = true;
		const response = await getAllEntries();
		this.data = response;
		this.isLoading = false;
	}

	appendStyles() {
		const style = document.createElement('style');
		style.textContent = `
			button {
				background: blue;
				color: white;
			}
		`;
		this.shadowRoot.appendChild(style);
	}

	appendEventListeners() {
		this._button = this.shadowRoot.querySelector('button');
		this._button.addEventListener('click', function() {
			console.log('click');
		});
	}

	render() {
		if (this.isLoading) {
			this.shadowRoot.innerHTML = `<div>Loading...</div>`;
		} else {
			this.shadowRoot.innerHTML = `
				<h2>Storyblok Entries</h2>
				<p>
					This is a very basic example to show how to use Storyblok
					with Custom Elements (Web Components). Below I am rendering
					out the names of Storyblok entries coming from a Test Space.
				</p>
				<ul>
					${this.data
						.map((entry) => {
							return `<li>${entry.name}</li>`;
						})
						.join('')}
				</ul>
				<button>Toggle data</button>
			`;
		}
	}

	async connectedCallback() {
		await this.fetchData();
		this.render();
		this.appendStyles();
		this.appendEventListeners();
	}
}

export const registerMainApp = () => customElements.define('main-app', MainApp);
