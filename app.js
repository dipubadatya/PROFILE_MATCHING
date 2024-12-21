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
const cloudinary=require('cloudinary')
const User = require('./models/user')
const Job=require('./models/job')
const Student=require('./models/studentDetails')
const axios=require('axios')
const { log } = require('console')
const { Logger } = require('mongodb')



// app.use(session({
//     secret: 'your-secret-key',
//     resave: false,
//     saveUninitialized: true
// }));
// app.use(passport.initialize());
// app.use(passport.session());
// app.use(flash());

// Cloudinary configuration
// cloudinary.config({
//     cloud_name: 'your-cloud-name',
//     api_key: 'your-api-key',
//     api_secret: 'your-api-secret'
// });

let dbUrl=process.env.MONGODB_URL
connectDB().then(()=>{
    console.log('db connect succsesfuly')
 })
 .catch(err=>console.log(err));

async function connectDB() {
    try {
        await mongoose.connect(dbUrl)
            
       
    
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

app.get('/', (req, res) => {
    res.render('./profile/home.ejs')
   
})



const store = MongoStore.create({
    mongoUrl:dbUrl,
    crypto: {
        secret: process.env.SECRET
    },
    touchAfter: 24 * 3600
})


const sessionOption = {
    store,
    secret: process.env.SECRET,
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
  // passport.use(new LocalStrategy(User.authenticate()))
  passport.use(User.createStrategy());
  
  passport.serializeUser(User.serializeUser())
  passport.deserializeUser(User.deserializeUser())
  
  app.use(flash())
  app.use(session(sessionOption))
  app.use(passport.initialize())
  app.use(passport.session())
  
  
  
  app.use((req,res,next)=>{
    
    // res.locals.success=req.flash('success');
    // res.locals.error=req.flash('error');
    res.locals.currUser=req.user;
   
    
    next()
  })
  



// const HUGGINGFACE_API_URL = 'https://api-inference.huggingface.co/models/facebook/bart-large-mnli';
// const HUGGINGFACE_API_KEY = process.env.HUGGINGFACE_API_KEY;

// app.get('/search',(req,res)=>{
//     res.render('./job_profile/index.ejs')
// })
// // Search route
// app.post('/search', async (req, res) => {
//     // const { prompt } = req.body;
//     let prompt={  premise: "find student who knows react",
//         hypothesis: "This is a statement about a student."}

//     try {
        
//         const hfResponse = await axios.post(HUGGINGFACE_API_URL, {
//             inputs: prompt,
//         }, {
//             headers: {
//                 Authorization: `Bearer ${HUGGINGFACE_API_KEY}`
//             }
//         });

//         const responseText = hfResponse.data;
//         const skills = responseText.inputs
//             .split(',')
//             .map(skill => skill.trim().toLowerCase());

//         // Step 2: Query MongoDB for matching students
//         const matchingStudents = await Student.find({ skills: { $in: skills } });

//         // Step 3: Query MongoDB for matching job profiles
//         const matchingJobs = await Job.find({ requirements: { $in: skills } });

//         // Step 4: Render results
//         res.render('results', { students: matchingStudents, jobs: matchingJobs });
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Error processing the request');
//     }
// });


app.get('/student',(req,res)=>{
    res.render('./user/studentForm')
})


app.get('/student/:id',async(req,res)=>{
    let {id}=req.params
    let student=await Student.findById(id)
    console.log(student);
    res.render('./user/studentDetail',{student})
    
})
app.get('/dashboard',async(req,res)=>{
    let students= await Student.find()

    
    res.render('./user/dashboard',{students})
})    
     
app.get('/search/:regnumber',async(req,res)=>{
  
    let regex=new RegExp(`^${req.params.regnumber}`, 'i');
    const users=await Student.find({registrationNumber:regex});
   res.json(users)
    
    
 
    
})


// axios.post('https://api-inference.huggingface.co/models/facebook/bart-large-mnli',"find student who knows react" , {
//     headers: {
//         'Authorization': `Bearer ${HUGGINGFACE_API_KEY}`,
//         'Content-Type': 'application/json'
//     }
// })
// .then(response => {
//     console.log(response.data);
// })
// .catch(error => {
//     if (error.response) {
//         console.error('Error Data:', error.response.data);
//         console.error('Error Status:', error.response.status);
//         console.error('Error Headers:', error.response.headers);
//     } else {
//         console.error('Error Message:', error.message);
//     }
// });









// const ADZUNA_API_ID = process.env.ADZUNA_API_ID;

// const ADZUNA_API_KEY = process.env.ADZUNA_API_KEY;


// const appId = 'f6293b4c'; // Replace with your actual App ID
// const appKey = '6f317f7ae7602e3bffb08d393f1ee168'; // Replace with your actual App Key
// const location = 'India'; // Specify the location

// axios.get(`https://api.adzuna.com/v1/api/jobs/in/search/1`, {
//     params: {
//         app_id: appId,
//         app_key: appKey,
//         location: location,
//         results_per_page: 10, // Adjust as needed
//         page: 1 // Pagination
//     }
// })
// .then(response => {
//     if (response.data && response.data.results.length > 0) {
//         console.log('Job Listings:', response.data.results);
//     } else {
//         console.log('No job listings found for this location.');
//     }
// })
// .catch(error => {
//     console.error('Error fetching data:', error);
// });

// app.get('/signup', (req, res) => {
//     res.render('./user/signup.ejs')
// })

app.post('/register',async (req, res) => {
    try {
        const { name,  email, password } = req.body;

       
    
        const user = new User({ name, email });
       
        const registerUser = await User.register(user, password);
     
        req.login(registerUser, (err) => {
            if (err) return next(err);
        
            
            // req.flash('success', 'Thanks for signing up!');
            res.redirect('/');
        });

    } catch (error) {
        console.error(error);
        // req.flash('error', 'User already exists or an error occurred');
        res.redirect('/signup');
    }


})


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
     res.redirect('/listings')
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