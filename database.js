const { Pool } = require('pg');
const enviroment = require('./enviroment');

const client  = new Pool(enviroment.development);

module.exports = {
    client
};

