const mongoose = require('mongoose');
const chalk = require('chalk')
const dbPath = "mongodb+srv://admin_riadh:4jYzx5QN2Lfc9Ay1@cluster0-cdqp2.mongodb.net/test?retryWrites=true&w=majority"
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