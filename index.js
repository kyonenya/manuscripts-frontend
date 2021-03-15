const express = require('express');
const path = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const config = require('./webpack.dev.config.js');
const middleware = webpackDevMiddleware(webpack(config));

const port = process.env['WEB_APP_PORT'] || 3000;
const app = express();
app
  .use(middleware)
  .use(express.static(path.resolve(__dirname, 'build')))
  .get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html')); // RewriteEngineOn
  })
  .listen(port, () => {
    console.log(`Launching app... http://localhost:${port}\n`);
  })
  ;

// Register app and middleware. Required for better performance when running from play.js
try { pjs.register(app, middleware); } catch (error) { }
