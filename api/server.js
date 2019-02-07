import express from 'express';
import bodyParser  from 'body-parser';
import config from './config/config';
import cors from 'cors';
import morgan from 'morgan';
import routes from './router';

const app = express();

app.use(morgan('combined'));
app.use(cors({ origin: config.siteUrl }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('static'));
app.use((req, res, next) => {
	res.append('Access-Control-Allow-Origin', ['*']);
	res.append('Content-Type', 'application/json');
	next();
});
// @TODO test
// app.use((req, res, next) => {
// 	console.log('!!!', req)
// 	next();
// });

app.use('/api', routes);


app.listen(config.port, () => {
	console.log(`We are live on ${config.host}:${config.port}`);
});