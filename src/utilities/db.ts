import Knex from "knex";

const rxjh_account = Knex({
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        port: 3306,
        user: 'root',
        password: 'thisisroot',
        database: 'rxjh_account'
    }
});


export { rxjh_account };