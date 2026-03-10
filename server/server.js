const express = require('express');
const app = express();
const passport = require('passport');

const session = require('express-session');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new GoogleStrategy({
  clientID: 'your_client_id',
  clientSecret: 'your_client_secret',
  callbackURL: 'http://localhost:3000/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
  // Handle user authentication logic here
}));

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});