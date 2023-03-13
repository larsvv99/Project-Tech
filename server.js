require('dotenv').config({ path: '.env' });
const express = require('express');
const app = express();
app.use(express.static('static'));
const { engine } = require('express-handlebars');
app.use(express.urlencoded({ extended: true }));





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

	res.render('test', { layout: 'index', title: 'Test', data: example });
});





//routes

app.get('/', (req, res) => {
	res.render('main', { layout: 'index', title: 'Homepage' });
});

app.post('/datatoevoegen', async (req, res) => {
	const db = client.db('Fooduo').collection('personen');
	const persoonToevoegen = await db.insertOne(req.body);
	res.render('datatoevoegen', { layout: 'index', title: 'Start', data: persoonToevoegen });
});

app.get('/filter', async (req, res) => {
	const db = client.db('Fooduo').collection('keuken');
	const zoekKeukens = await db.find({}).toArray();
	res.render('filter', { layout: 'index', title: 'Filter', data: zoekKeukens });
});

app.post('/resultaten', async (req, res) => {
	const db = client.db('Fooduo').collection('personen');
	const filterPersonen = await db.find({ keuken: req.body.keuken, dieet: req.body.dieet }).toArray();
	res.render('resultaten', { layout: 'index', title: 'Resultaten', data: filterPersonen });
});



app.get('/*', (req, res) => {
	res.json({
		status: 'FAILED',
		message: '404 - page not found'
	});
});

