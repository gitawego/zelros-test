import * as app from './app';
const mode = process.env.NODE_ENV || 'development';

app.init(mode);