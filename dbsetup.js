const dotenv = require("dotenv");
dotenv.config({path: './.env'});

const mysql = require('mysql2');
const conn = mysql.createConnection({
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
}).promise();


const fs = require('fs').promises;
(async function () {
    let content = await fs.readFile('./dbs.sql', { encoding: 'utf8' });
    let lines = content.split('\r\n'); 
    let tmp = '';
    for (let line of lines) {
        line = line.trim();
        tmp += line + '\r\n';
        if (line.endsWith(';')) { 
            await conn.execute(tmp);
            tmp = '';
        }
    }
    await conn.end();
})();