const Postgres = require('pg-promise')();
const Database = Postgres('postgres://postgres:0f0e@localhost:5432/axpen')

module.exports = Database;