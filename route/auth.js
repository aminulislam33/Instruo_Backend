const router= require("express").Router();
const passport= require("passport");
const User= require("../models/user");
const {isLoggedIn, isAdmin}= require("../middleware.js")

router.get('/google', passport.authenticate('google', {scope: ['email', 'profile']}));

router.get('/google/callback',
    passport.authenticate('google', {
        successRedirect: process.env.CLIENT_URL,
        failureRedirect: '/login/failed'
    })
)

router.get('/login/failed', (req, res)=>{
    res.status(401).json({
        error:true,
        message: 'Login Failure'
    })
})

router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            res.send('ERROR!!');
            return next(err);
        }
        res.redirect(process.env.CLIENT_URL);
    });
});

router.get('/status', async(req, res) => {
    if (req.user) {
        const emailId= req.user.email;
        const u= await User.find({email: emailId});
        res.json({ loggedIn: true,  user: u[0] });
    } else {
        res.json({ loggedIn: false });
    }
});

module.exports= router;