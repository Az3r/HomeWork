let pg = require('pg');
let config = {
    /*user: 'tgglwunjjggxth',
    database: 'd7o2it0mfovi3o',
    password: '2befc3fcc78bb78ddd3a18869865a079169054a97b9640fb7f2c91d168f2884b',
    host: 'ec2-107-21-111-24.compute-1.amazonaws.com',*/
    user: process.env.user,
    database: process.env.database,
    password: process.env.password,
    host: process.env.host,

    port: process.env.ServerPort,
    max: '10',
    idleTimeoutMillis: 30000,
  };
let pool = new pg.Pool(config);
module.exports = pool;