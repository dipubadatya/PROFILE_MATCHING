const mongoose=require('mongoose');
const { type } = require('os');


const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    number: { type: String, required: true },
    email: { type: String, required: true ,},
    address: { type: String, required: true },
    gender: { type: String, required: true},
    department: { type: String, required: true },
    college: { type: String, required: true },
    university: { type: String, default:"bput university"},
    registrationNumber: { type: String, required: true, unique: true },
    country: { type: String, required: true },
    profilePhoto: { type: String, default:"https://i.pinimg.com/736x/76/f3/f3/76f3f3007969fd3b6db21c744e1ef289.jpg"},
    cgpa: { type: Number, required: true, min: 0, max: 10 },
    skills: { type: [], required: true },
    certificate: { type: [], required: true },
   
});



 


   
module.exports = mongoose.model('Student', studentSchema);
