const User= require("./models/user")
module.exports.isLoggedIn= (req, res, next)=>{
  const user = req.user || res.locals.loggedUser;
    if (user) {
      return next();
  } else{
    res.status(401).json({ loggedIn: false , message: "You must be logged in!!"});
  }
  next();
}

module.exports.isAdmin= async(req, res, next)=>{
  const emailId= req.user.email;
  const u= await User.find({email: emailId});
  if(u[0].post!='Admin'){
    return res.status(401).json({message: "You are not authorized for this!!"});;
  }
  next();
}