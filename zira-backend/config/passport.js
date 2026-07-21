const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID || "dummy",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "dummy",
      callbackURL: process.env.GOOGLE_CALLBACK_URL || "https://zira-0fhn.onrender.com/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value || `${profile.id}@google.com`;
        let user = await User.findOne({ email });
        if (!user) {
          user = await User.create({
            name: profile.displayName,
            email,
            username: `google_${profile.id}`,
            password: require("crypto").randomBytes(16).toString("hex"),
            role: "customer",
            avatar: profile.photos?.[0]?.value || "",
          });
        }
        const jwt = require("jsonwebtoken");
        const token = jwt.sign(
          { id: user._id, role: user.role, username: user.username },
          process.env.JWT_SECRET,
          { expiresIn: "7d" }
        );
        done(null, { user, token });
      } catch (err) {
        done(err, null);
      }
    }
  )
);

module.exports = passport;

