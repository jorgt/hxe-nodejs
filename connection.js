const hana = require('@sap/hana-client');
const promisify = require('util').promisify;

//fetch the environment variables for the database connection
const { HANA_SERVER, HANA_PORT, HANA_USER, HANA_PASSWORD } = process.env

//create the connection object
const conn = hana.createConnection();

//what we'll be exporting from this module is a promise, so we can use async/await
//when reusing it in other modules. 
module.exports = _ => new Promise((resolve, reject) => {
  conn.connect({
    serverNode  : `${HANA_SERVER}:${HANA_PORT}`,
    uid         : HANA_USER,
    pwd         : HANA_PASSWORD
  }, function(err) {
    if (err) {
      conn.disconnect();
      reject(err);
    } else {
      //in addition to converting the connection to a promise, i'm using 
      //the built-in function `promisify` to turn the `exec` function into a promise
      //so that we can await database operations as well
      conn.exec = promisify(conn.exec)
      resolve(conn)
    }
  });
});