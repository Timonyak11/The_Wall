import Mysql from "mysql2";

export const database = Mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'R00tP@ss123',
    database: 'the_wall',
});
