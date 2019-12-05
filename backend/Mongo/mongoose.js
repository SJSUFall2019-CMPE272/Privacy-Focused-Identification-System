var mongoose = require('mongoose');

mongoose.connect(
    process.env.MONGO_HOST,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
)


module.exports = { mongoose };