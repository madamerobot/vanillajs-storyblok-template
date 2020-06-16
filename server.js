/* Dependencies */
const StoryblokClient = require('storyblok-js-client');
const express = require('express');

/* Setup */
const app = express();
const port = 4040;

/* Defining the path for serving static files */
app.use('/', express.static('APP'));
app.use('/:slug', express.static('APP'));

/* Initiating Storyblok CMS */
const Storyblok = new StoryblokClient({
	accessToken: '',
	cache: {
		clear: 'auto',
		type: 'memory'
	}
});

/* Defining routes */
app.get('/', (req, res) => {
	res.render('index.html');
});

app.get('/:slug', (req, res) => {
	const { query: { slug } } = req;

	// Storyblok.get(`cdn/stories/${slug}`, {})
	// 	.then((response) => {
	// 		const { data: { story: { content } } } = response;
	// 		console.log('Storyblok Data');
	// 		console.log(response);
	// 	})
	// 	.catch((err) => {
	// 		console.log(error);
	// 		// res.setHeader('Content-Type', 'application/json');
	// 		// res.statusCode = 500;
	// 		// res.end(JSON.stringify(`${error.name}: ${error.message}`));
	// 	});

	const data = { text: 'This is a test' };

	res.setHeader('Content-Type', 'application/json');
	res.statusCode = 200;
	res.end(JSON.stringify(data));

	res.render('index.html');
});

/* Listening to connections */
app.listen(port, () => console.log(`App is running at localhost:${port}`));
