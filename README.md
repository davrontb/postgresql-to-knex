# postgresql-to-knex

postgresql-to-knex is a library for converting Postgresql queries into [knex.js](http://knexjs.org).

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install postgresql-to-knex.

```bash
npm i postgresql-to-knex
```

## Example
```javascript
const to_knex = require('postgresql-to-knex')

console.log(to_knex("SELECT * FROM users;"))
// knex.select(`*`, ).from(`users`)

console.log(to_knex("SELECT a, fruit_a, b, fruit_b FROM basket_a JOIN basket_b ON fruit_a = fruit_b;"))
// knex.select(`a`, `fruit_a`, `b`, `fruit_b`, ).from(`basket_a`).innerJoin(`basket_b`, function() { this.on("fruit_a","=","fruit_b")})

console.log(to_knex("SELECT * FROM top_rated_films UNION SELECT * FROM most_popular_films;"))
// knex.select(`*`, ).from(`top_rated_films`).union([knex.select(`*`, ).from(`most_popular_films`)])

console.log(to_knex("select * from users group by count having count > 100 order by name desc"))
// knex.select(`*`, ).from(`users`).groupByRaw(`count`).having("count",">","100").orderByRaw(`name DESC`)

console.log(to_knex("WITH cte AS (SELECT id , name , age , address , salary FROM company ) SELECT * FROM cte;"))
// knex.with(`cte`, (knex) => { (knex.select(`id`, `name`, `age`, `address`, `salary`, ).from(`company`)) }).select(`*`, ).from(`cte`)

console.log(to_knex("WITH RECURSIVE r AS ( SELECT 1 AS i, 1 AS factorial UNION SELECT i+1 AS i, factorial * (i+1) as factorial FROM r WHERE i < 10 ) SELECT * FROM r;"))
// knex.withRecursive(`r`, (knex) => { (knex.select(knex.raw(`1 AS i`),knex.raw(`1 AS factorial`),).union([knex.select(knex.raw(`i + 1 AS i`),knex.raw(`factorial * i + 1 AS factorial`),).from(`r`).where("i","<","10")])) }).select(`*`, ).from(`r`)

```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change. 

Note, this package is in the development process. INSERT, UPDATE, DELETE queries haven't been implemented yet.

## Authors
Tursunov Davronbek
email: davron.tursunov.2014@mail.ru
repository: https://github.com/davrontb/postgresql-to-knex