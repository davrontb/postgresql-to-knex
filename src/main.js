const parser = require('pg-query-parser');
const toKnex = require("./to_knex");


module.exports = function (query) {
    try {
        const sqlQuery = parser.parse(query).query;
        return toKnex.deparse(sqlQuery);
    } catch (error) {
        return error.message;
    }
}




