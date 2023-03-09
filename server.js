const express = require(`express`);
const app = express();
app.use(express.static(`static`));
const { engine } = require(`express-handlebars`);
const filterdata = require(`./views/data/filters.json`);

//connectie
const PORT = 4000;
app.get(`/`, onHome).listen(PORT, console.log(`Running on port: ${PORT}`));


//handlebars 
app.engine(`.hbs`, engine({
	defaultLayout: `main`,
	layoutsDir: (__dirname + `/views/layouts`),
	partialsDir: (__dirname + `/views/partials`),
	extname: `.hbs`
}));
app.set(`view engine`, `.hbs`);
app.set(`views`, `./views`);



//routes

function onHome(req, res) {
	res.render(`main`, { layout: `index` });
	console.log(filterdata);
}

app.get(`/`, (req, res) => {
	res.render(onHome);
});

app.get(`/filter`, (req, res) => {
	res.render(`filter`, { layout: `index` });
});

app.get(`/resultaten`, (req, res) => {
	res.render(`resultaten`, { layout: `index` });
});


//error
app.use((req, res, next) => {
	res.status(404).send(`Oeps, niet gevonden`);
});

