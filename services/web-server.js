const http = require('http');
const express = require('express');
var fs = require('fs')
var morgan = require('morgan')
var path = require('path')
const webServerConfig = require('../config/web-server.js.js');
const database = require('./database.js.js');

let httpServer;

function initialize() {
  return new Promise((resolve, reject) => {
    const app = express();
    httpServer = http.createServer(app);

    // create a write stream (in append mode)
    var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

    // setup the logger
    app.use(morgan('combined', { stream: accessLogStream }))

    app.get('/:id', async (req, res) => {
    const result = await database.simpleExecute('select 1 from dual where 1=:id',[req.params.ID]);
      
    
// with parameter.
      
      // const user = result.rows[0].USER;
      // const date = result.rows[0].SYSTIMESTAMP;
 
      // res.end(`DB user: ${user}\nDate: ${date}`);
      
      // res.end(JSON.stringify(result.rows));
      res.json(result.rows);

      // res.end(result.rows);

    });

    httpServer.listen(webServerConfig.port)
      .on('listening', () => {
        console.log(`Web server listening on localhost:${webServerConfig.port}`);

        resolve();
      })
      .on('error', err => {
        reject(err);
      });
  });
}

module.exports.initialize = initialize;


function close() {
  return new Promise((resolve, reject) => {
    httpServer.close((err) => {
      if (err) {
        reject(err);
        return;
      }

      resolve();
    });
  });
}

module.exports.close = close;