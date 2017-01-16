import { Application } from 'express';
import * as jwt from 'express-jwt';
import { appConfig } from './appConfig';
export function init(app: Application) {
	const config = appConfig.get('config');
	Object.keys(config.api).forEach((apiName) => {
		const cfg = config.api[apiName];
		const mod = appConfig.get(cfg.module);
		if (!mod) {
			return console.warn(`module ${config.module} not found`);
		}
		const keys = Object.keys(cfg.methods);
		keys.forEach((apiMethod) => {
			const api = cfg.methods[apiMethod];
			if (!mod[api.method]) {
				return console.warn(`method ${api.method} not found in module ${cfg.module}`)
			}
			const args: any = [`/api/${apiName}`];
			if (cfg.auth) {
				args.push(jwt({
					secret: config.JWT_SECRET
				}))
			}
			args.push(mod[api.method].bind(mod));
			app[apiMethod](...args);
		});
	});
}
