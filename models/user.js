


const mongoose = require('mongoose')
const passportLocalMongoose = require("passport-local-mongoose")




const userSchema = new mongoose.Schema({
  name: {
    type: String,
    Required:true
  },
  email: {
    type: String,
    Required:true
  },
  password: {
    type: String,
    Required:true
  },
  
});


userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });
module.exports = mongoose.model('User', userSchema);



