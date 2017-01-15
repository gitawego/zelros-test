import * as debugModule from 'debug';
export class Log {
	constructor(private appName: string) {

	}
	ns(namespace: string): Logger {
		return new Logger(namespace, this.appName);
	}
}

export class Logger {
	prefix: string;
	constructor(private namespace: string, private appName: string) {
		this.prefix = `${appName}:${namespace}`;
	}
	debug(formatter: any, ...args) {
		const log = debugModule(`${this.prefix}:debug`);
		return log(formatter, ...args);
	}
	info(formatter: any, ...args) {
		const log = debugModule(`${this.prefix}:info`);
		return log(formatter, ...args);
	}
	warn(formatter: any, ...args) {
		const log = debugModule(`${this.prefix}:warn`);
		return log(formatter, ...args);
	}
	error(formatter: any, ...args) {
		const log = debugModule(`${this.prefix}:error`);
		return log(formatter, ...args);
	}
}
