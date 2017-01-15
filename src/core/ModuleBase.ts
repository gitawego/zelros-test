import { EventEmitter2 } from 'eventemitter2';
import * as debug from 'debug';
import * as config from 'config';
import { Log, Logger } from './Log';
const crossTopic = new EventEmitter2();
export class ModuleBase extends EventEmitter2 {
	topic = crossTopic;
	log: Logger = new Log(config.appName).ns(this.id);
	constructor(private id: string) {
		super({
			wildcard: true
		});
		this.initTopics();
	}
	get config() {
		return config.modules[this.id];
	}
	initTopics() {
		if (!this.config.topics) {
			return;
		}
		Object.keys(this.config.topics).forEach(topic => {
			const topicConfig = this.config.topics[topic];
			let method = topicConfig;
			let params = null;
			let disabled = false;
			if (typeof (topicConfig) === 'object') {
				method = topicConfig.method;
				params = topicConfig.params;
				disabled = topicConfig.disabled;
			}
			if (disabled) {
				this.log.warn(`${topic} is disabled or not found`);
				return;
			}
			if (this[method]) {
				let mtdFnc = null;
				if (params) {
					mtdFnc = this[method].bind(this, params);
				} else {
					mtdFnc = this[method].bind(this);
				}
				this.topic.on(topic, mtdFnc);
				this.log.info(`subscribed to topic ${topic}`);
			} else {
				this.log.warn(`${topic}: method ${method} is not found`);
			}
		});
	}
}
