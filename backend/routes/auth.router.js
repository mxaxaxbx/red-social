const express   = require('express');
const router    = express.Router();
// controllers
const { login, register } = require('../controllers/auth.controller');

console.log('\x1b[33m%s\x1b[0m', 'Registring auth routing /api/auth');

console.log('[POST] /login ');
router.post('/login', login);

console.log('[POST] /register ');
router.post('/register', register);

module.exports = router;
