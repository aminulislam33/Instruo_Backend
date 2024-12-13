const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const User = require('./models/user.js');

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: "https://instruo-backend.onrender.com/auth/google/callback",
            scope: ["profile", "email"],
        },
        async function (accessToken, refreshToken, profile, callback) {
            const email = profile.emails[0].value;
            let user = await User.findOne({ email });

            if (!user) {
                user = new User({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    image: profile.photos[0].value
                });
                await user.save();
                console.log("New user added");
            } else {
                console.log("User already exists");
            }
            callback(null, user);
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});
