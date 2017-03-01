var path = require("path");

module.exports = {
    development: {
        db: "mongodb://127.0.0.1:27017/iManagement"
    },
    production: {
        db: process.env.MONGODB_URI || process.env.MONGOHQ_URL
    }
};
