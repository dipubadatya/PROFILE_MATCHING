const mongoose = require('mongoose');
const { type } = require('os');


const jobSchema=new mongoose.Schema({
 
    title: {
        type: String,
        required: true
    },
   
  cgpa:{
    type: String,

  },
  skills:{
    type: [],
    required: true
  },
certificate:{
    type: [],
    required: true
  },
  company: { type: mongoose.Schema.Types.ObjectId, ref: "User" },


})

module.exports=mongoose.model('Job',jobSchema)