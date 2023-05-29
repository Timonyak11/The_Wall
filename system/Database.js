import { database } from "../config/databaseConfig.js";

class Database {

    execQuery(query, values = null) {
        let index = 0;
        let queryArray = query.split('');

        for(let i = 0; i < queryArray.length; i++) {
            if(queryArray[i] == '?') {
                queryArray[i] = "'" + values[index] + "'";
                index++;
            }
        }
        let newQuery = queryArray.join('');

        return new Promise((resolve, reject) => database.query(newQuery, function(err, rows) {
            if(err) {
                reject(err);
            } 
            else {
                resolve(rows);
            }
        }) );
    }
}

export default Database;
