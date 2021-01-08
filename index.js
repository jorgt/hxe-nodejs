require('dotenv').config()
const connect = require('./connection');

const init = async _ => {
  try {
    const connection = await connect().catch(console.error);
    const result = await connection.exec(`SELECT * FROM "DUMMY"`);
  
    console.log(result);
  } catch(error) {
    console.error(error)
  }
}

init();