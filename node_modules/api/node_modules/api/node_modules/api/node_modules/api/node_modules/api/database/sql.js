const mysql = require("mysql");

const connection = mysql.createConnection({
    host: 'bemdnaudgrq8hxr4pakr-mysql.services.clever-cloud.com',
    user: 'uizsy5ak02zozt1a',
    password: 'Y2MSKT2zENHAUrLcqM6r',
    database: 'bemdnaudgrq8hxr4pakr',
    port: '3306',
});

connection.connect((err) => {
    if (err) {
        console.log("DataBase Not Connected:", err.message);
        throw err;
    } else {
        console.log("DataBase Connected");
    }
});

module.exports = { connection };
