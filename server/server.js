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

app.post("/api/add-experience", async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }

  let decoded;
  try {
    decoded = jwt.verify(authHeader.split(' ')[1], process.env.JWT_SECRET || 'your-secret-key');
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  const {
    pass_id: rawPassId,
    kogemuse_nimetus,
    organisatsioon,
    kogemuse_tyyp,
    algus_aeg,
    ajakulu,
    roll,
    kirjeldus,
    oskused,
    cert
  } = req.body || {};

  const name = String(kogemuse_nimetus || '').trim();
  const organisation = String(organisatsioon || '').trim();
  const startRaw = String(algus_aeg || '').trim();
  const typeRaw = String(kogemuse_tyyp || '').trim().toLowerCase();
  const durationRaw = String(ajakulu || '').trim();

  if (!name || !organisation || !startRaw || !typeRaw) {
    return res.status(400).json({
      message: 'Missing required fields',
      required: ['kogemuse_nimetus', 'organisatsioon', 'kogemuse_tyyp', 'algus_aeg']
    });
  }

  const typeAlias = {
    kursus: 'kursus',
    tookogemus: 't\u00f6\u00f6kogemus',
    't\u00f6\u00f6kogemus': 't\u00f6\u00f6kogemus',
    praktika: 'praktika',
    projekt: 'projekt',
    vabatahtlik: 'vabatahtlik tegevus',
    'vabatahtlik tegevus': 'vabatahtlik tegevus',
    erasmus: 'erasmus+',
    'erasmus+': 'erasmus+'
  };
  const type = typeAlias[typeRaw];
  if (!type) {
    return res.status(400).json({
      message: 'Invalid kogemuse_tyyp',
      allowed: ['kursus', 't\u00f6\u00f6kogemus', 'praktika', 'projekt', 'vabatahtlik tegevus', 'erasmus+']
    });
  }

  const normalizeDate = (value) => {
    const trimmed = String(value || '').trim();
    if (!trimmed) return null;
    if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) return trimmed;
    if (/^\d{2}\.\d{2}\.\d{4}$/.test(trimmed)) {
      const [dd, mm, yyyy] = trimmed.split('.');
      return `${yyyy}-${mm}-${dd}`;
    }
    const dt = new Date(trimmed);
    if (Number.isNaN(dt.getTime())) return null;
    return dt.toISOString().slice(0, 10);
  };

  const startDate = normalizeDate(startRaw);
  if (!startDate) {
    return res.status(400).json({ message: 'Invalid algus_aeg format. Use YYYY-MM-DD or DD.MM.YYYY' });
  }

  // DB has `end` DATE NOT NULL. If ajakulu is not a date, we keep end=start.
  const parsedDurationAsDate = normalizeDate(durationRaw);
  const endDate = parsedDurationAsDate || startDate;

  let passId = Number(rawPassId);
  if (!Number.isInteger(passId) || passId <= 0) {
    passId = null;
  }

  try {
    if (!passId) {
      const decodedUserId = Number(decoded.id);
      const candidateUserIds = [];
      if (Number.isInteger(decodedUserId) && decodedUserId > 0) {
        candidateUserIds.push(decodedUserId);
      }
      if (decoded.email) {
        const [userRows] = await pool.query('SELECT id FROM users WHERE email = ? LIMIT 1', [decoded.email]);
        if (userRows.length > 0 && Number.isInteger(Number(userRows[0].id))) {
          candidateUserIds.push(Number(userRows[0].id));
        }
      }

      if (candidateUserIds.length > 0 || decoded.email) {
        const [columnRows] = await pool.query(
          `SELECT COLUMN_NAME, DATA_TYPE
           FROM information_schema.COLUMNS
           WHERE TABLE_SCHEMA = DATABASE()
             AND TABLE_NAME = 'passes'
             AND COLUMN_NAME IN ('user_id', 'kasutaja_id', 'owner_id', 'email', 'user_email')`
        );

        for (const row of columnRows) {
          const column = row.COLUMN_NAME;
          const dataType = String(row.DATA_TYPE || '').toLowerCase();
          if (['int', 'bigint', 'smallint', 'mediumint', 'tinyint'].includes(dataType)) {
            for (const userId of candidateUserIds) {
              const [passRows] = await pool.query(
                `SELECT id FROM passes WHERE ${column} = ? ORDER BY id DESC LIMIT 1`,
                [userId]
              );
              if (passRows.length > 0) {
                passId = passRows[0].id;
                break;
              }
            }
          } else if (decoded.email && (dataType.includes('char') || dataType.includes('text') || dataType.includes('varchar'))) {
            const [passRows] = await pool.query(
              `SELECT id FROM passes WHERE ${column} = ? ORDER BY id DESC LIMIT 1`,
              [decoded.email]
            );
            if (passRows.length > 0) {
              passId = passRows[0].id;
            }
          }

          if (passId) {
            break;
          }
        }
      }
    }

    if (!passId) {
      return res.status(400).json({
        message: 'Could not resolve pass_id. Provide pass_id in request body.'
      });
    }

    let skillsJson = '[]';
    if (Array.isArray(oskused)) {
      skillsJson = JSON.stringify(oskused.map((item) => String(item).trim()).filter(Boolean));
    } else if (typeof oskused === 'string' && oskused.trim()) {
      try {
        const parsed = JSON.parse(oskused);
        skillsJson = Array.isArray(parsed) ? JSON.stringify(parsed) : JSON.stringify([oskused.trim()]);
      } catch {
        skillsJson = JSON.stringify([oskused.trim()]);
      }
    }

    let certificateBuffer = Buffer.alloc(0);
    if (cert && typeof cert === 'string') {
      const base64Payload = cert.includes(',') ? cert.split(',').pop() : cert;
      try {
        certificateBuffer = Buffer.from(base64Payload, 'base64');
      } catch {
        certificateBuffer = Buffer.alloc(0);
      }
    }

    const shortDescription = String(kirjeldus || '').trim();
    const roleValue = String(roll || '').trim();
    const reflection = durationRaw && !parsedDurationAsDate ? `Ajakulu: ${durationRaw}` : '';

    const [result] = await pool.query(
      `INSERT INTO experiences
       (pass_id, name, organisatsioon, type, start, end, roll, short_description, certificate, reflection, oskused)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        passId,
        name,
        organisation,
        type,
        startDate,
        endDate,
        roleValue,
        shortDescription,
        certificateBuffer,
        reflection,
        skillsJson
      ]
    );

    return res.status(201).json({
      message: 'Experience added successfully',
      id: result.insertId,
      pass_id: passId
    });
  } catch (error) {
    console.error('Failed to add experience:', error);
    return res.status(500).json({ message: 'Internal server error' });
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
