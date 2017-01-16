import { appConfig } from './appConfig';
import * as path from 'path';
export function init() {
	const config = appConfig.get('config');
	const cwd = process.cwd();
	Object.keys(config.modules).forEach((moduleName) => {
		const cfg = config.modules[moduleName];
		if (cfg.disabled) {
			return;
		}
		const Module = require(`./modules/${moduleName}`)[moduleName];
		appConfig.set(moduleName, new Module());
	});
}
