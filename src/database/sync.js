const sequelize = require('./config/database');
const User = require('./models/User');

async function syncDatabase() {
    let connection;
    try {
        connection = await sequelize.authenticate();
        console.log('Connection to the database has been established successfully.');

        await sequelize.sync({ force: true });
        console.log('All models were synchronized successfully.');
        
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    } finally {
        if (connection) {
            try {
                await connection.close();
                console.log('Connection to the database has been closed.');
            } catch (error) {
                console.error('Error closing the database connection:', error);
            }
        }
    }
}

syncDatabase();
