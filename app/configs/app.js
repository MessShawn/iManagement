var path = require("path");

module.exports = {
    development: {
        db: "mongodb://localhost/iManagement"
    },
    production: {
        db: process.env.MONGODB_URI || process.env.MONGOHQ_URL
    }
};
