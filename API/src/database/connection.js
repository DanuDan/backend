const Sequelize = require ('sequelize')

const db = {}

const sequelize = new Sequelize("b35_dumbmerch", "postgres", "danuganteng", {
    host: 'localhost',
    port: '5432',
    dialect: 'postgres',
})

db.sequelize = sequelize

module.exports = db;
