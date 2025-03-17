const config = require('../config.json'); // Import config file
const mysql = require('mysql2/promise');  // Import MySQL2 library
const { Sequelize } = require('sequelize'); // Import Sequelize ORM

module.exports = db = {}; // Export database object

initialize(); // Run initialization function

async function initialize() {
    // Create database if it doesn't exist
    const { host, port, user, password, database } = config.database;
    const connection = await mysql.createConnection({ host, port, user, password });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

    // Connect to the database using Sequelize
    const sequelize = new Sequelize(database, user, password, { 
        host, 
        dialect: 'mysql' 
    });

    // Initialize models and attach them to the exported db object
    db.User = require('../users/user.model')(sequelize);

    // Sync all models with the database
    await sequelize.sync({ alter: true });

    console.log('Database connected and synced successfully.');
}
