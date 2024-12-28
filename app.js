require('dotenv').config()

const express = require('express')
const app = express()
const port = process.env.PORT || 4000
const path = require("path")
const mongoose = require('mongoose')
const passport = require('passport')
const LocalStrategy = require('passport-local')
const passportLocalMongoose = require('passport-local-mongoose')
const MongoStore = require('connect-mongo')
const session = require('express-session')
const flash=require('connect-flash')
const cloudinary=require('cloudinary').v2
const User = require('./models/user')
const Job=require('./models/job')
const Student=require('./models/studentDetails')
const axios=require('axios')
const bodyParser = require('body-parser')
const cors = require('cors');
const fs = require('fs');
const marked = require('marked');
const methodOverride = require("method-override");
const multer = require('multer');
const { storage } = require('./cloudinary');
const { log } = require('console')
const PDFDocument = require('pdfkit');
const { GoogleGenerativeAI} = require('@google/generative-ai');
const upload = multer({ storage })
const bcrypt = require('bcrypt');
const uploads = multer({ dest: 'uploads/' }); // Change the 'uploads/' path as needed

app.use(bodyParser.json()); 





let dbUrl=process.env.MONGODB_URL
console.log(dbUrl);

connectDB().then(()=>{
    console.log('db connect succsesfuly')
 })
 .catch(err=>console.log(err));

async function connectDB() {
    try {
        await mongoose.connect(dbUrl,{
            useNewUrlParser: true, useUnifiedTopology: true
        })
            
       
    
        console.log('Connected to MongoDB')
    } catch (error) {
        console.log('Error connecting to MongoDB', error)
    }
}




app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.urlencoded({ extended: true }))


app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use(methodOverride("_method"));
app.use(cors());





const store = MongoStore.create({
    mongoUrl:dbUrl,
    crypto: {
        secret: "epiccoders"
    },
    touchAfter: 24 * 3600
})



const sessionOption = {
    store,
    secret:"epiccoders",
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    },

}
  

   
  store.on('error',()=>{
    console.log('session error', err)
  })
  
  
  passport.use(passport.initialize())
  passport.use(passport.session())
//   passport.use(new LocalStrategy(User.authenticate()))
  passport.use(User.createStrategy());
  
  passport.serializeUser(User.serializeUser())
  passport.deserializeUser(User.deserializeUser())
  
  app.use(flash())
  app.use(session(sessionOption))
  app.use(passport.initialize())
  app.use(passport.session())
  
 

  
 


  

  

  
app.use((req, res, next) => {
    res.locals.success = req.flash('success')
    res.locals.error = req.flash('error')
   res.locals.currUser=req.user
    next()
})

const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
};


app.get('/', (req, res) => {
    const user = req.user || {};;
    console.log(user);
    
    res.render('./profile/home.ejs',{user})

})






app.post('/match/student', async (req, res) => {
    try {
  let user=req.user._id

      let { skills, certificate  } = req.body;
  
   
      skills = skills.split(',').map(skill => skill.trim());
      certificate = certificate.split(',').map(cert => cert.trim());
      if (!skills.length && !certificate.length) {
        return res.status(400).json({ error: "Please provide skills or certificates." });
      }
  
      const query = {
        $or: [
          { skills: { $in: skills.map(skill => new RegExp(skill, 'i')) } },
          { certificates: { $in: certificate.map(cert => new RegExp(cert, 'i')) } }
        ]
      };
   
      const students = await Student.find(query);
  
  
      const rankedStudents = students.map(student => {
   
        const skillMatch = (student.skills || []).filter(skill => skills.includes(skill)).length;
        const certMatch = (student.certificates || []).filter(cert => certificate.includes(cert)).length;
        const matchScore = skillMatch + certMatch;
  
        
        return { ...student._doc, matchScore };
      });
     
      const filteredAndRankedStudents = rankedStudents
        .filter(student => student.matchScore > 0)
        .sort((a, b) => b.matchScore - a.matchScore);
  console.log(rankedStudents);
  
     res.render('./profile/match-student.ejs',{students,user,skills,certificate})
    } catch (err) {
      console.error("Error occurred:", err.message);
      res.status(500).json({ error: err.message });
    }
  });
  

app.get('/student/:id/matching',async(req,res)=>{
    try {
        let user=req.user._id
        const id = req.params.id;
        let student=await Student.findById(id)
        res.render('./profile/match_student_details',{student,user})
        
    } catch (error) {
        console.log(error);
        
    }

})

app.get('/resume/:id',async(req,res)=>{
    const id = req.params.id
let student = await Student.findById(id)



    res.render('./profile/resume.ejs',{student})
})


app.get('/company',(req,res)=>{
    res.render('./profile/job_requirement')
   
    
})
app.get('/jobs/:id',async(req,res)=>{
    const id = req.params.id
    let student =await Student.findById(id)
    console.log(student.skills);
   
    
})

app.post('/jobs/adzuna', async (req, res) => {
    
    const skills = req.body.skills.trim().split(',');
    
 

    try {
        let jobs = [];
        for (let skill of skills) {
            const response = await axios.get(`https://api.adzuna.com/v1/api/jobs/in/search/1`, {
                params: {
                    app_id: process.env.ADZUNA_APP_ID,
                    app_key: process.env.ADZUNA_API_KEY,
                    what: skill.trim(),
                  
                },
            });
            
            if (response.data.results) {
                jobs = jobs.concat(response.data.results);  
            }
        }

console.log(jobs);

res.render('./profile/adzuna',{jobs})
       
    } catch (error) {
        console.error('Error fetching jobs from Adzuna:', error.message);
        res.status(500).json({ success: false, message: 'Error fetching jobs from Adzuna' });
    }
});


  const MODEL_NAME = "gemini-pro";
  const API_KEY = process.env.API_KEY;
  
  async function runChat(userInput) {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
  
    const generationConfig = {
      temperature: 0.9,
      topK: 1,
      topP: 1,
      maxOutputTokens: 1000,
    };
 
  
    const chat = model.startChat({
      generationConfig,
    
    
    });
  
    const result = await chat.sendMessage(userInput);
    const response = result.response;
    return response.text();
  }

  



  app.get('/chatbot', (req, res) => {
    res.render('./profile/index.ejs')
   
  });
 
  app.post('/chat', async (req, res) => {
    try {
      const userInput = req.body?.userInput;
      console.log('incoming /chat req', userInput)
      if (!userInput) {
        return res.status(400).json({ error: 'Invalid request body' });
      }
  
      const response = await runChat(userInput);
      res.json({ response });
    } catch (error) {
      console.error('Error in chat endpoint:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });






app.get('/result',(req,res)=>{
    res.render('./profile/result.ejs')
    console.log(req.user);
})




app.get('/student',(req,res)=>{
    res.render('./user/studentForm')
})

app.post('/student',upload.single('photo'),async(req,res)=>{
    try {

       
        console.log(req.file);
        let url=req.file.path
  
        let newData = new Student(req.body.student)
      
      
   
        newData.profilePhoto=url ;
  
        await newData.save();
 
      
        res.redirect("/admin/dashboard");
    } catch (err) {
        console.error('Save Error:', err.message);
       
        res.redirect("/admin/dashboard");
       
    }


})



app.get('/student/:id',async(req,res)=>{
    let {id}=req.params
   

    let student=await Student.findById(id)

    res.render('./user/studentDetail',{student})
    
})

app.get('/student/:id/edit',async(req,res)=>{
    let {id}=req.params
    let editStudent=await Student.findById(id)
    res.render('./user/studentEdit',{editStudent})
})



app.put('/student/:id', upload.single('student[profilePhoto]'),async (req, res) => {
    let {id}=req.params
    

let update = await Student.findByIdAndUpdate(id, { ...req.body.student })
if(typeof req.file !=='undefined'){
  let url = req.file.path;

  update.profilePhoto=url
  update.save()
  }

  res.redirect(`/student/${id}`)



})



app.delete('/student/:id',async(req,res)=>{
    try {
        const { id } = req.params;
        await Student.findByIdAndDelete(id);

       
        res.redirect('/admin/dashboard');

    } catch (error) {
        console.error('Error deleting story:', error);
        res.status(500).send('Internal Server Error');
    }
})



app.get('/company',(req,res)=>{
    let user=req.user 
    res.render('./profile/job_requirement.ejs',{user})
})



app.get('/admin/dashboard',isAuthenticated,async(req,res)=>{
    let students= await Student.find()
    let user=req.user

    
    res.render('./user/admin_dashboard',{students,user})
})





app.get('/company/dashboard',isAuthenticated,async(req,res)=>{
    
    let jobs = await User.findById(req.user._id).populate('jobs');
    console.log(jobs);
    

  let user=req.user._id

    
    res.render('./user/company_dashboard',{jobs,user})
})
   

  


app.get('/search/:regnumber',async(req,res)=>{
  
    let regex=new RegExp(`^${req.params.regnumber}`, 'i');
    const users=await Student.find({registrationNumber:regex});
   res.json(users)
       
})





app.get('/signup', (req, res) => {
    res.render('./user/signup.ejs')
})

app.post('/register',async (req, res) => {
    try {
        const { username,  email, password,role } = req.body;

       
    
        const user = new User({ username, email ,role});
       
        const registerUser = await User.register(user, password);
     
        req.login(registerUser, (err) => {
            if (err) return next(err);
        
            
            res.redirect('/');
        });

    } catch (error) {
        console.error(error);
     
        res.redirect('/signup');
    }


})


app.post('/student/login', async (req, res) => {
    const { registrationNumber, number } = req.body;

    try {
        // Find student in the database
        const student = await Student.findOne({ registrationNumber, number ,});

        if (!student) {
            return res.status(401).send('Invalid registration number or phone number ');
        }

    console.log(student);
    res.render('./profile/personal_student_details',{student})
    
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});


app.get('/login',(req,res)=>{
    
    res.render('./user/login.ejs')
})


app.post('/login',
    passport.authenticate('local', {
        failureRedirect:'/login',
         failureFlash:true
    }),
   async (req, res) => {
    
    res.redirect('/')


    }
)




app.get('/logout',(req,res)=>{
req.logout((err)=>{
     if (err) {
        return next(err)
        
     }
     req.flash('success', 'loged out')
     res.redirect('/')
})


})



app.use('*', (req, res, next) => {
    res.send("page not found")
    next()
})
app.use((err, req, res, next) => {
    console.log(err)
    next()
})
app.use((err, req, res, next) => {
    console.error(err.stack);
    if (!res.headersSent) {
        res.status(500).send('Something went wrong!');
    }
  
});


app.listen(port, () => {
    console.log(`server listen opn port ${port}`);

})