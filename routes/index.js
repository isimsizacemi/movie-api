const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs'); // "requir" yerine "require" kullanılmalıdır
const jwt = require('jsonwebtoken');
const User = require('../models/User');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/register', async function(req, res, next) {
  try {
    const { username, password } = req.body;

    // Kullanıcı şifresini hashleme işlemi
    const hashedPassword = await bcrypt.hash(password, 10);

    // Kullanıcıyı kaydetme işlemi
    const user = new User({ username, password: hashedPassword });
    const savedUser = await user.save();
    
    res.json(savedUser);
  } catch (err) {
    res.status(500).json({ error: 'Kullanıcı kaydedilemedi.' });
  }
});

router.post('/authenticate', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Kullanıcıyı veritabanından bulma
    const user = await User.findOne({ username });

    // Check if the user exists
    if (!user) {
      return res.status(401).json({ status: false, message: 'Authentication Failed, username or password is incorrect' });
    }

    // Kullanıcı bulundu, şimdi şifreyi kontrol etme
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // Check if the password is correct
    if (!isPasswordValid) {
      return res.status(401).json({ status: false, message: 'Authentication Failed, username or password is incorrect' });
    }

    // Başarılı kimlik doğrulama
    const payload = {
      username,
    }

    // Sign the JWT token with the correct expiresIn option
    const token = jwt.sign(payload, req.app.get('api_secret_key'), { expiresIn: '720s' });

    res.json({ status: true, message: 'Authentication Successful', user, token });
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({ status: false, message: 'Authentication Failed, an error occurred' });
  }
});




module.exports = router;
