const mongoose = require('mongoose')

const User = mongoose.model("User", { 
    username: "string",
    password: "string",
    firstName: 'string',
    lastName: 'string'
});



module.exports = User;