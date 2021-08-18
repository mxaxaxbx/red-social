const express   = require('express');
const router    = express.Router();
// controllers
const { getPostsByUserId } = require('../controllers/posts.controller');
// Middleware (MW)
const auth = require('../middleware/auth');
const validateUser = require('../middleware/validateUser');

console.log('\x1b[33m%s\x1b[0m', 'Registring users routing /api/users');

console.log('[GET] MW /:id/posts');
router.get('/:id/posts', auth, validateUser, getPostsByUserId);

module.exports = router;
