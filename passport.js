const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const User= require('./models/user.js')

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.CLIENT_ID,
			clientSecret: process.env.CLIENT_SECRET,
			callbackURL: "http://localhost:8000/auth/google/callback",
			scope: ["profile", "email"],
		},
		async function (accessToken, refreshToken, profile, callback) {
			// console.log(profile)
			const email= profile.emails[0].value;
            const u= await User.findOne({email})
            // console.log(u)
			if(!u){
				const u= new User({
					name: profile.displayName,
					email: profile.emails[0].value,
					image: profile.photos[0].value
				})
				await u.save();
                console.log("NEW USER ADDED")
			}else console.log("Already EXISTS!!")
			callback(null, profile);
		}
	)
);

passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser((user, done) => {
	done(null, user);
});