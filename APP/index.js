import { registerMainApp } from './components/MainApp.js';

/**
 * Main application element, simply registers the web components
 * 
 */

const app = async () => {
	registerMainApp();
};

document.addEventListener('DOMContentLoaded', app);
