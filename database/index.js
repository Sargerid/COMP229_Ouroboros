const mongoose = require("mongoose");
const repository = require("./repository");
const User = require("./models/user.model");
const Ticket = require("./models/ticket.model");

function startMongoose()
{
    const uri = process.env.MONGO_CONNECTION;
    
    mongoose.set('runValidators', true);
    mongoose.pluralize(null); // disable mongo pluralizing collections
    mongoose.connect(uri);

    // assign all models to the repository
    Object.assign(repository, {
        User,
        Ticket
    });

    return mongoose;
}

module.exports = {
    startMongoose,
    repository
}