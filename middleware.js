module.exports.isLoggedIn= (req, res, next)=>{
    if(!req.isAuthenticated())
      {
        return res.redirect('/auth/google');
      }
    next();
}

module.exports.isAdmin= (req, res, next)=>{
    if(req.user.post!='Admin')
      {
        return res.redirect('/');
      }
    next();
}