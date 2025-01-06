const express = require('express')
const router = express()
const isAuth = require('./isAuth')


router.get('/', (req,res) =>{

    req.session.destroy((err) =>{
        if (err) {
            console.log(err)
        }
        res.clearCookie('connect.sid')
    res.render('home.ejs')

    })
})

router.get('/privacy', (req,res) =>{
    res.render('privacy.ejs')
    
})
router.get('/terms', (req,res) =>{
    res.render('terms.ejs')
    
})

router.get('/logout', (req,res) =>{
    req.session.destroy((err) =>{
        if (err) {
            return err
        }
        res.clearCookie('connect.sid')

        res.redirect('/')
    })
})
// no authentication needed

router.get('/login_signup', (req,res) =>{
    res.render('signup.ejs',{errormsg : null})
})
router.get('/reviews', (req,res) =>{
    res.render('reviews.ejs',)
})
router.get('/login', (req,res) =>{
    res.render('login.ejs',{errormsg : null})
})

// authentication needed
 
router.get('/userprofile',isAuth ,(req,res) =>{
    const {id,name,email,phone,password,department,faculty,gender,level,pic} = req.session.user

    res.render('userprofile.ejs',{name,email,phone,password,department,faculty,gender,level,pic})
})
router.get('/contributions',isAuth, (req,res) =>{
    const{name} = req.session.user
    res.render('contributions.ejs',{errormsg: '',name})
})
router.get('/community',isAuth, (req,res) =>{
    const{name} = req.session.user

    res.render('community.ejs',{name})
})
router.get('/quiz',isAuth, (req, res)=>{
    const {name} = req.session.user
    res.render('quiz.ejs',{name})
})
router.get('/firstsemester',isAuth,(req, res)=>{
    const {name} = req.session.user
    res.render('firstsemester.ejs',{name})
})
router.get('/secondsemester', isAuth, (req, res)=>{
    const {name} = req.session.user
    res.render('secondsemester.ejs',{name})
})
router.get('/edit', isAuth,  (req, res)=>{
    const {name,faculty,department,level,gender,pic,email} = req.session.user
    res.render('editinfo.ejs',{errormsg: '',name,faculty,department,level,gender,pic,email})
})
router.get('/profile_pic_view', isAuth,  (req, res)=>{
    const {name,email,pic} = req.session.user
    res.render('profilepicview.ejs',{errormsg: '',name,email,pic})
})
router.get('/profile_pic_edit', isAuth,  (req, res)=>{
    const {name,email} = req.session.user
    res.render('profilepicedit.ejs',{errormsg: '',name,email})
})

router.get('/chm101', isAuth,(req, res)=>{
    const {name} = req.session.user
    res.render('chm101.ejs',{name})
})
router.get('/bio101', isAuth, (req, res)=>{
    const {name} = req.session.user
    res.render('bio101.ejs',{name})
})
router.get('/phy101', isAuth, (req, res)=>{
    const {name} = req.session.user
    res.render('phy101.ejs',{name})
})
router.get('/mth101', isAuth, (req, res)=>{
    const {name} = req.session.user
    res.render('mth101.ejs',{name})
})
router.get('/mainpdfs', isAuth,  (req, res) =>{
    const {name} = req.session.user
    // console.log(id, name)
    res.render('mainpdf.ejs',{name})
})
router.get('/mth102', isAuth,  (req, res) =>{
    const {name} = req.session.user
    res.render('mth102.ejs',{name})
})
router.get('/bio102', isAuth,  (req, res) =>{
    const {name} = req.session.user
    res.render('bio102.ejs',{name})
})
router.get('/chm102', isAuth,  (req, res) =>{
    const {name} = req.session.user
    res.render('chm102.ejs',{name})
})
router.get('/phy102', isAuth,  (req, res) =>{
    const {name} = req.session.user
    res.render('phy102.ejs',{name})
})
router.get('/phy102', isAuth,  (req, res) =>{
    const {name} = req.session.user
    res.render('phy102.ejs',{name})
})
router.get('/dev',  (req, res) =>{
    // const {id,name,phone,password,department} = req.session.user
    res.render('dev.ejs',{username: 'Royal'})
})
router.get('/redirect', (req, res) =>{
    res.render('redirect.ejs')

})
router.get('/redirect2', (req, res) =>{
    res.render('redirect2.ejs')

})

module.exports = router