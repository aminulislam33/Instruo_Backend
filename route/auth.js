const router= require("express").Router();
const passport= require("passport");

router.get('/google', passport.authenticate('google', {scope: ['email', 'profile']}))

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

module.exports= router;