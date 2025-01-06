const { body } = require('express-validator')
const isAuth = require('./routes/isAuth')
const { fileLoader } = require('ejs')


const express = require('express'),
 app = express(),
 dotenv = require('dotenv'),
 getRequests = require('./routes/getters'),
 multer = require('multer'),
 storage = multer.memoryStorage({}),
 upload = multer({storage}),
 bodyParser = require('body-parser'),
 session = require('express-session'),



 multe = require('multer'),
 parser = bodyParser.urlencoded({extended: false}),
mongoose = require('mongoose'),
schema = mongoose.Schema,
userSchema = new schema({
    name: {type: String,required: true},
    email:{type: String, required: true},
    phone:{type: String, required: true},
    department:{type: String, required: true},
    faculty:{type: String, required: true},
    gender:{type: String, required: true},
    level:{type: String, required: true},
    password:{type: String, required: true},
    profilepic_name:{type: String, required: true},
    mimetype:{type: String, required: true},
    profilepic:{type: Buffer, required: true}
},{timestamps: true})

const postSchema = new schema({
    postText: {type: String,required: true},
    files: [{
        file: {type: Buffer,required: false},
        file_mimetype: {type:String,required: false},
    }],
    usersName: {type:String,required: false},
    userPic: {type:Buffer,required:false},
    userPic_mimetype:{type:String,required:false}
},{timestamps:true})



const examuser = mongoose.model('examuser',userSchema)
const poster = mongoose.model('post',postSchema)

dotenv.config()





// console.log(getRequests)
app.use(session({

    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge : 24 * 60 * 60 * 1000
    }
}))
app.use('/', getRequests)
app.set('view engine', 'ejs')
app.post('/main_pdfs', (req,res) =>{
    res.render('pdfs.ejs')
})

app.get('/users/api', async(req,res) =>{
    const find = examuser.find().then((result) =>{
        res.send(result)
    })


})
app.get('/posts_contribution/api',isAuth, async(req,res) =>{
    const find = poster.find().then((result) =>{
        res.send(result)
    })


})

app.post('/sign_new_user', upload.fields([{name: 'profile', maxCount: 1}, {name: 'document', maxCount: 1}]),async (req,res)=>{
    // console.log(req.body,req.files)
    const {firstname,lastname,email,phone,department,faculty,gender, level, password,confirmpwd,agree} = req.body;

    if (firstname === '' || lastname === '' ||email === ''||phone === '' || confirmpwd === '' || password === '' || department === ' ' || gender === ' ' || level === '' || faculty === '' || Object.keys(req.files).length === 0) {
        return res.render('signup.ejs',{errormsg: 'Please fill in all fields'})
   }else{
    const file = req.files.profile[0]
    const {originalname,mimetype,buffer} = file
    if(agree != 'on'){
        return res.render('signup.ejs',{errormsg: 'Click the check box to agree with our Terms and Conditions'})
    }
    const name = firstname + '_' + lastname

const find = await examuser.findOne({
    $or: [{ email }, { phone }],
  }).then((result) => { 
    if (result) {
        return res.render('signup.ejs',{errormsg: 'Email or phone number has already been used'})
    }
  })

    const user = new examuser({name,email,phone,department,faculty,gender,level,password,
        profilepic_name: originalname,
        mimetype,
        profilepic: buffer
    })

    const submit = await user.save().then((result) => res.redirect('/login'))
   }


   
})
app.post('/user_logged_in', parser, async (req, res) =>{
const {email,password} = req.body
    const find = examuser.find({email,password}).then((result) =>{
        if(result.length === 0){
            return res.render('login.ejs',{errormsg: 'No Match was found check the email or password'})
        }
        else{
            // console.log(result)
            const user = result[0]
            const {id,name,email,phone,department,faculty,gender,level,password,mimetype,profilepic} = user

          
           

            const data = profilepic.toString('base64')
            const dataurl = `data:${mimetype};base64,${data}`
            // console.log(dataurl)

            if (req.session.authenticated) {
                res.redirect('/mainpdfs')
            }else{
                req.session.authenticated = true;
                req.session.user = {
                    id,name,email,phone,password,department,faculty,gender,level,
                    pic: dataurl,
                    mimetype,
                    buffer: profilepic
                }

                res.render('redirect2.ejs' ,{username: name})
            }
        }
    })
})

app.post('/edit_user_info', parser, async (req,res) =>{
    // console.log(req.body)
    const {name,department,password}= req.body
   
  if (password === '') {
    return res.render('editinfo.ejs',{errormsg: 'Password incorrect',
        name: req.session.user.name ,
        department: req.session.user.department,
       email:req.session.user.email
        })
   }else{
       if (password != req.session.user.password) {
    return res.render('editinfo.ejs',{errormsg: 'Password incorrect',
         name: req.session.user.name ,
         department: req.session.user.department,
        email:req.session.user.email
        })
   }else{
       const condition = {_id: req.session.user.id}

    try {
        const update = await examuser.updateOne(condition,{name:name,department:department}).then((err,result) =>{

            req.session.user.name = name
            
            req.session.user.department = department
            
            res.redirect('/userprofile')
    
        })
    } catch (error) {
        console.log(error)
    }
   }
   } 

  

    
})

app.post('/edit_pic', upload.fields([{name: 'profile',maxCount: 1},{name: 'document', maxCount: 1}]), async(req,res) =>{
    console.log(req.body,req.files)

    // console.log(req.body, req.files)
    const {password} = req.body
    const file = req.files.profile[0]
    
    const profilepic_name = file.originalname,
    mimetype = file.mimetype,
    profilepic = file.buffer
    
   
  if (password === '') {
    res.render('profilepicedit.ejs',{errormsg: 'Fill in password to confirm change',
        name: req.session.user.name ,
        email: req.session.user.email
})
   }else{
       if (password != req.session.user.password) {
        res.render('profilepicedit.ejs',{errormsg: 'Password incorrect',
            name: req.session.user.name ,
            email: req.session.user.email
    })
   }else{
       const condition = {_id: req.session.user.id}

    try {
        const update = await examuser.updateOne(condition,{profilepic_name,mimetype,profilepic}).then((err,result) =>{

            const data = profilepic.toString('base64')
            const pic = `data:${mimetype};base64,${data}`
        
            req.session.user.pic = pic
        
            res.redirect('/userprofile')
        
        
    
        })
    } catch (error) {
        console.log(error)
    }
   }
   } 
})



app.post('/contribute',upload.fields([{name: 'file',maxCount: 3},{name: 'document',}]),async (req,res)=>{
    // console.log(req.body,req.files)
    const {postText,category} = req.body
    if(postText === ''){
        res.render('contributions.ejs',{errormsg: 'Please fill in all fields ',name: 'royal'})
    }else{
      const files = req.files.file
        ? req.files.file.map((file) => ({
            file: file.buffer,
            file_mimetype: file.mimetype,
          }))
        : [];
  
       console.log(files)
       
        const post = new poster({
            postText,
            usersName: req.session.user.name,
            userPic: req.session.user.buffer,
            userPic_mimetype: req.session.user.mimetype,
            ...(files.length > 0 && { files })

        })
        const submit = await post.save().then((result) =>{res.redirect('/userprofile')})

    }
  
})

// ashlocksgrey



app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use(express.static('public'))
app.listen(5000,async()=>{
    const cont = await mongoose.connect('mongodb+srv://abuka:ashlocksgrey@examassistcls.bxvxt.mongodb.net/examusers?retryWrites=true&w=majority&appName=examassistcls').then((result) =>{console.log('database connected')}).catch((err) => {throw err})
    console.log('server is listening...')
})

// app.listen(8080, async (err) =>{
//   try {
// const cont = await mongoose.connect('mongodb://localhost:27017/examusers') .then((result) => {
//     console.log('database connected...')

// })   
//   } catch (error) {
//     throw error
//   }
//     console.log('server is live')
// })



module.exports = app