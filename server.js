require('dotenv').config({ path: '.env' });
const express = require('express');
const app = express();
app.use(express.static('static'));
const { engine } = require('express-handlebars');
//const mongoose = require('mongoose');
app.use(express.urlencoded({ extended: true }));
//const Keuken = require('./static/js/schemas');

//connectie
const PORT = process.env.PORT || 4000;
app.listen(PORT, console.log(`Running on port: ${PORT}`));

//handlebars 
app.engine('.hbs', engine({
	defaultLayout: 'main',
	layoutsDir: (__dirname + '/views/layouts'),
	partialsDir: (__dirname + '/views/partials'),
	extname: '.hbs'
}));
app.set('view engine', '.hbs');
app.set('views', './views');

//database
const { MongoClient, ServerApiVersion } = require('mongodb');
//mongoose.connect(process.env.DB_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true });
const uri = process.env.DB_CONNECTION_STRING;

const client = new MongoClient(
	uri,
	{ useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 }
);

client.connect()
	.then((res) => console.log('@@-- connection established', res))
	.catch((err) => console.log('@@-- error', err));

app.get('/database', async (req, res) => {
	const db = client.db('Fooduo').collection('keuken');
	const example = await db.find({}).toArray();
	res.json({
		status: 'success',
		data: example
	});
});





//routes

app.get('/', (req, res) => {
	res.render('main', { layout: 'index', title: 'Homepage' });
});

app.get('/filter', (req, res) => {
	res.render('filter', { layout: 'index', title: 'Filter' });
});

app.get('/resultaten', (req, res) => {
	res.render('resultaten', { layout: 'index', title: 'Resultaten' });
});

app.get('/test', async (req, res) => {
	const db = client.db('Fooduo').collection('keuken');
	const example = await db.find({}).toArray();
	res.json({
		status: 'success',
		data: example
	});
	res.render('test', { layout: 'index' });
});

app.get('/*', (req, res) => {
	res.json({
		status: 'FAILED',
		message: '404 - page not found'
	});
});
