import { Application } from 'express';
import * as jwt from 'express-jwt';
import { appConfig } from './appConfig';
export function init(app: Application) {
	const config = appConfig.get('config');
	Object.keys(config.api).forEach((apiName) => {
		const cfg = config.api[apiName];
		const mod = appConfig.get(cfg.module);
		if (mod && mod[cfg.method]) {
			const keys = Object.keys(cfg.methods);
			keys.forEach((method) => {
				const args: any = [`/api/${apiName}`];
				if (cfg.auth) {
					args.push(jwt({
						secret: config.JWT_SECRET
					}))
				}
				args.push(mod[cfg.method].bind(mod));
				app[method](...args);
			});
		}
	});
}
