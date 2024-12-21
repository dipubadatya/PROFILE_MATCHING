const mongoose=require('mongoose');
const { type } = require('os');

const studentSchema=new mongoose.Schema({
   name: { type: String, required: true },
   number: { type: String, required: true },
   email: { type: String, required: true, unique: true },
   address: { type: String, required: true },
   gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
   department: { type: String, required: true },
   registrationNumber: { type: String, required: true, unique: true },
   country: { type: String, default: 'India' },
   profilePhoto: { type: String, required: true },
   cgpa: { type: Number, min: 0, max: 10, required: true },
   skills: { type: [String], required: true }
   });
   
 



module.exports = mongoose.model('Student', studentSchema);
