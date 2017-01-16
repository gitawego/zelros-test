import { ModuleBase } from '../../core/ModuleBase';
import * as mongodbUri from 'mongodb-uri';
import mongoose = require('mongoose');
mongoose.Promise = Promise;

export interface DBConfig {
  hosts: DBHost[];
  database: string;
}
export interface DBHost {
  host: string;
  port: string | number;
}
export class Database extends ModuleBase {
  private initialized = false;
  constructor() {
    super('Database');
  }
  async init(uri: string = this.uriFormat()) {
    await this.initMongoose(uri);
    this.initialized = true;
    this.topic.emit('database/initialized', true);
    this.log.debug('db initialized');
  }
  uriFormat(dbConfig?: DBConfig): string {
    if (process.env['MONGODB_URI']) {
      return process.env['MONGODB_URI'];
    }
    dbConfig = dbConfig || this.config.mongodb;
    return <string>mongodbUri.format(dbConfig);
  }
  initMongoose(uri: string) {
    return new Promise((resolve, reject) => {
      mongoose.connect(uri);
      const db = mongoose.connection;
      this.log.debug('initMmongoose', uri);
      db.on('error', reject);
      db.once('open', resolve);
    });
  }
  objectId(id: string): mongoose.Types.ObjectId {
    return new mongoose.Types.ObjectId(id);
  }
}
