const express = require('express');
const app = express();
const port = 4040;

app.use(express.static('./APP'));

app.get('/', (req, res) => {
	res.render('index.html');
});

app.listen(port, () => console.log(`App is running at localhost:${port}`));
