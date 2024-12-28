


const mongoose = require('mongoose')
const passportLocalMongoose = require("passport-local-mongoose")




const userSchema = new mongoose.Schema({
  username: {
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
  role: {
    type: String,
    enum: ['admin', 'company'],

  },
  jobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Job" }],
  
});

//  userSchema.plugin(passportLocalMongoose,)

userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });
module.exports = mongoose.model('User', userSchema);



