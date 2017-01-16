import * as http from 'http';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import * as compression from 'compression';
import * as routes from './routes';
import * as modules from './modules';
import { appConfig } from './appConfig';

import './models';
/**
 * Client Dir
 * @note `dev` default.
 */
var app = express();
const config = appConfig.get('config');
export function init(mode: string) {

	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(bodyParser.json());
	app.use(bodyParser.text());
	app.use(compression());
	modules.init();
	routes.init(app);
	const staticPath = path.resolve(`${process.cwd()}/app-dist/`);
	app.use(express.static(staticPath));

	return new Promise<http.Server>((resolve, reject) => {
		let server = app.listen(config.server.port, () => {
			var port = server.address().port;
			console.log('App is listening on port:' + port);
			appConfig.get('Database').init()
				.then(() => resolve(server))
				.catch((err) => reject(err));
		});
	});
};
