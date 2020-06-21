import { getAllEntries } from '../lib/storyblokCalls.js';

/** Main App Element **/

export class MainApp extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		this._data = null;
		this._isLoading = true;
		this._button = null;
	}

	async fetchData() {
		this.loading = true;
		const response = await getAllEntries();
		this._data = response;
		this._isLoading = false;
	}

	appendStyles() {
		const style = document.createElement('style');
		style.textContent = `
			.layout-container {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				width: 100%;
				min-height: 100vh;
				font-family: 'IBM Plex Sans', sans-serif;
			}
			.wrapper {
				width: 60%;
				border: solid 2px blue;
				padding: 40px;
			}
			p {
				width: 60%;
				margin-top: 30px;
				margin-bottom: 30px;
			}
			button {
				border: solid 2px blue;
				background: white;
				color: blue;
				padding: 10px;
				font-size: 18px;
				margin-top: 20px;
				cursor: pointer;
			}
			button:hover {
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
		if (this._isLoading) {
			this.shadowRoot.innerHTML = `<div>Loading...</div>`;
		} else {
			this.shadowRoot.innerHTML = `
				<div class="layout-container">
					<div class="wrapper">
						<h2>Storyblok x Web Components</h2>
						<p>
							This is a very basic example to show how to use Storyblok
							with Custom Elements (Web Components). Below I am rendering
							out the names of Storyblok entries coming from a Test Space.
						</p>
						<ul>
							${this._data
								.map((entry) => {
									return `<li>${entry.name}</li>`;
								})
								.join('')}
						</ul>
						<button>⟶ Toggle data</button>
					</div>
				</div>
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
