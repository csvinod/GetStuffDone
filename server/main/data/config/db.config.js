const pg = require('pg');

module.exports = {
    HOST: "localhost",
    USER: "postgres",
    PASSWORD: "postgres",
    DB: "postgres",
    dialect: "postgres",
    dialectModule: pg, // added for vercel hosting integration, 'pg' is typically installed globally in local-dev
    timezone: "Asia/Kolkata", // If we go global, remember to update this for each regional deployment
    define: {
        schema: 'GetStuffDone', // Specify the default schema here
    },
    PORT: 5432,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,     // connection attempt timeout
        idle: 10000,        // connected but idle timeout before releasing 
    },
};
