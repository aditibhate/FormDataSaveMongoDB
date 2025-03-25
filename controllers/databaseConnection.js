require('dotenv').config(); // Optional for local dev
module.exports = {
    uri: process.env.MONGO_URI
};
