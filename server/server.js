require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const session = require('express-session');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const pool = require('./database');

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(session({
  secret: 'abc',
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: 'https://evpass.pnglin.byenoob.com/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
  // Lisame vajadusel andmebaasi
  return done(null, profile);
}));

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.post("/auth/create-account", async (req, res) => {
  const { email, password, firstName, lastName, sunniaeg } = req.body;

  try {
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (rows.length > 0) {
      return res.status(400).json({ message: 'Email already in use' });
    }
    await pool.query('INSERT INTO users (email, parool, eesnimi, perenimi, sunniaeg) VALUES (?, ?, ?, ?, ?)', [email, password, firstName, lastName, sunniaeg]);
    res.status(201).json({ message: 'Account created successfully' });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post("/auth/credentials", async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (rows.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const user = rows[0];
    if(user.parool === null) {
      return res.status(401).json({ message: 'This account is registered with Google. Please use Google login.' });
    }
      
    if (user.parool !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
  	}

    const token = jwt.sign(
      {
        id: user.id,
        displayName: `${user.eesnimi} ${user.perenimi}`,
        email: user.email,
        pilt: user.pilt
      },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );
    res.json({ token });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.get('/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/'
  }),
  async (req, res) => {
    // Generate JWT token from authenticated user
    const token = jwt.sign(
      {
        id: req.user.id,
        displayName: req.user.displayName,
        email: req.user.emails?.[0]?.value,
        pilt: req.user.photos?.[0]?.value
      },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );
    
    // create db entry to users if not exists
//     PK ID SERIAL Email VARCHAR(255) Eesnimi VARCHAR(250) Perenimi VARCHAR(250) Parool LONGTEXT Telefon CHAR(11) Sünniaeg DATE Sugu CHAR(1) Riik CHAR(2) Linn VARCHAR(168) Pilt LONGTEXT Enesetutvustus LONGTEXT
    const email = req.user.emails?.[0]?.value;
    const displayName = req.user.displayName || '';
    const [firstName, ...lastNameParts] = displayName.split(' ');
    const lastName = lastNameParts.join(' ');
    const pilt = req.user.photos?.[0]?.value || '';

    try {
      const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
      if (rows.length === 0) {
        await pool.query('INSERT INTO users (email, eesnimi, perenimi, pilt) VALUES (?, ?, ?, ?)', [email, firstName, lastName, pilt]);
      }
    } catch (error) {
      console.error('Database error:', error);
    }

    const deepLink = `http://localhost:5173/home_dark?token=${encodeURIComponent(token)}`;
    res.send(`<!DOCTYPE html><html><head><meta charset="utf-8"><title>Signing in...</title></head><body><script>window.location.href = ${JSON.stringify(deepLink)};</script></body></html>`);
  }
);

app.get('/api/user', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];
  jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key', (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    res.json({ user: decoded });
  });
});

app.listen(process.env.PORT, () => {
  console.log("Server running!");
});
