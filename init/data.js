require('dotenv').config()
const mongoose=require('mongoose')
const Student=require('../models/studentDetails')
const Job=require('../models/job.js')
const User=require('../models/user.js')



connectDB().then(()=>{
    console.log('db connect succsesfuly')
 })
 .catch(err=>console.log(err));


async function connectDB() {
    try {
        await mongoose.connect("mongodb+srv://dipubadatya113:dipu123@profile-matching.s8dgf.mongodb.net/?retryWrites=true&w=majority&appName=PROFILE-MATCHING", {
            useNewUrlParser: true,
            useNewUrlParser: true
        });
        console.log('Connected to MongoDB')
    } catch (error) {
        console.log('Error connecting to MongoDB', error)
    }
}

const sampleJobs = [
  {
      title: 'Software Engineer',
      company: 'Tech Solutions Inc.',
      location: 'New York, NY',
      salary: 120000,
      description: 'Develop and maintain web applications using JavaScript and Node.js.'
  },
  {
      title: 'Product Manager',
      company: 'Innovatech',
      location: 'San Francisco, CA',
      salary: 140000,
      description: 'Lead product development and manage cross-functional teams.'
  },
  {
      title: 'Data Scientist',
      company: 'Data Insights LLC',
      location: 'Remote',
      salary: 130000,
      description: 'Analyze data and build predictive models to drive business decisions.'
  },
  {
      title: 'UX/UI Designer',
      company: 'Creative Minds',
      location: 'Austin, TX',
      salary: 90000,
      description: 'Design user-friendly interfaces and improve user experience.'
  }
];
let data=[
  {
    "name": "Aarav Singh",
    "number": "9876543210",
    "email": "aarav.singh@example.com",
    "address": "123 Green Avenue, Mumbai, Maharashtra",
    "gender": "Male",
    "department": "Computer Science",
    "registrationNumber": "REG10001",
    "country": "India",
    "profilePhoto": "https://example.com/images/aarav.jpg",
    "cgpa": 8.5,
    "skills": ["JavaScript", "Python", "React", "Leadership", "Team Management"]
  },
  {
    "name": "Ishita Verma",
    "number": "9123456789",
    "email": "ishita.verma@example.com",
    "address": "45 Rosewood Street, Delhi",
    "gender": "Female",
    "department": "Electronics",
    "registrationNumber": "REG10002",
    "country": "India",
    "profilePhoto": "https://example.com/images/ishita.jpg",
    "cgpa": 9.2,
    "skills": ["C++", "Embedded Systems", "VHDL", "Public Speaking", "Problem Solving"]
  },
  {
    "name": "Rajesh Kumar",
    "number": "9876512340",
    "email": "rajesh.kumar@example.com",
    "address": "67 Lakeview Road, Chennai, Tamil Nadu",
    "gender": "Male",
    "department": "Mechanical",
    "registrationNumber": "REG10003",
    "country": "India",
    "profilePhoto": "https://example.com/images/rajesh.jpg",
    "cgpa": 7.8,
    "skills": ["AutoCAD", "SolidWorks", "Matlab", "Project Management", "Analytical Thinking"]
  },
  {
    "name": "Neha Sharma",
    "number": "9988776655",
    "email": "neha.sharma@example.com",
    "address": "12 Sapphire Lane, Kolkata, West Bengal",
    "gender": "Female",
    "department": "Civil",
    "registrationNumber": "REG10004",
    "country": "India",
    "profilePhoto": "https://example.com/images/neha.jpg",
    "cgpa": 8.9,
    "skills": ["STAAD Pro", "Surveying", "Construction Management", "Negotiation", "Time Management"]
  },
  {
    "name": "Aditya Rao",
    "number": "9876548765",
    "email": "aditya.rao@example.com",
    "address": "23 Maple Street, Hyderabad, Telangana",
    "gender": "Male",
    "department": "Electrical",
    "registrationNumber": "REG10005",
    "country": "India",
    "profilePhoto": "https://example.com/images/aditya.jpg",
    "cgpa": 8.3,
    "skills": ["Circuit Design", "Power Systems", "MATLAB", "Creativity", "Critical Thinking"]
  },
  {
    "name": "Priya Nair",
    "number": "9123445678",
    "email": "priya.nair@example.com",
    "address": "56 Tulip Garden, Kochi, Kerala",
    "gender": "Female",
    "department": "Information Technology",
    "registrationNumber": "REG10006",
    "country": "India",
    "profilePhoto": "https://example.com/images/priya.jpg",
    "cgpa": 9.5,
    "skills": ["Java", "SQL", "Cloud Computing", "Decision Making", "Interpersonal Skills"]
  },
  {
    "name": "Kunal Mehta",
    "number": "9812345670",
    "email": "kunal.mehta@example.com",
    "address": "90 Sunrise Park, Pune, Maharashtra",
    "gender": "Male",
    "department": "Aerospace",
    "registrationNumber": "REG10007",
    "country": "India",
    "profilePhoto": "https://example.com/images/kunal.jpg",
    "cgpa": 8.7,
    "skills": ["Aerodynamics", "Propulsion Systems", "ANSYS", "Leadership", "Innovation"]
  },
  {
    "name": "Ananya Gupta",
    "number": "9876543201",
    "email": "ananya.gupta@example.com",
    "address": "33 Lotus Boulevard, Jaipur, Rajasthan",
    "gender": "Female",
    "department": "Biotechnology",
    "registrationNumber": "REG10008",
    "country": "India",
    "profilePhoto": "https://example.com/images/ananya.jpg",
    "cgpa": 9.1,
    "skills": ["Bioinformatics", "Genetic Engineering", "Lab Techniques", "Teamwork", "Adaptability"]
  },
  {
    "name": "Rohan Das",
    "number": "9988771122",
    "email": "rohan.das@example.com",
    "address": "14 Emerald Way, Lucknow, Uttar Pradesh",
    "gender": "Male",
    "department": "Physics",
    "registrationNumber": "REG10009",
    "country": "India",
    "profilePhoto": "https://example.com/images/rohan.jpg",
    "cgpa": 7.9,
    "skills": ["Quantum Mechanics", "Data Analysis", "Simulation", "Strategic Thinking", "Planning"]
  },
  {
    "name": "Simran Kaur",
    "number": "9123445567",
    "email": "simran.kaur@example.com",
    "address": "78 Golden Plaza, Chandigarh",
    "gender": "Female",
    "department": "Chemistry",
    "registrationNumber": "REG10010",
    "country": "India",
    "profilePhoto": "https://example.com/images/simran.jpg",
    "cgpa": 8.4,
    "skills": ["Organic Chemistry", "Analytical Techniques", "Chemical Synthesis", "Collaboration", "Attention to Detail"]
  }
  // ... Additional entries continue in a similar format up to 100
]

   
      
  
  
let user={
  "name": "bput University",
  "email":'bput@gmail.com',
  "password":"bput@123"
}




async function initDb() {
    await User.insertMany(user)
    console.log('data initialized')
}

initDb()