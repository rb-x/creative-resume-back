const mongoose = require('mongoose');
const chalk = require('chalk')
const dbPath = process.env.MONGO_URI;
mongoose.connect(dbPath, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on("error", () => {
    console.log(chalk.red("> error occurred from the database"));
});
db.once("open", () => {
    console.log(chalk.blue("> successfully connected to the database [MongoDB Atlas]"));
});
module.exports = mongoose;