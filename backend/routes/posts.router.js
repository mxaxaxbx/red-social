const express   = require('express');
const router    = express.Router();
// controllers
const { createPost, getAllPosts } = require('../controllers/posts.controller');
// Middleware (MW)
const auth = require('../middleware/auth');
const validateUser = require('../middleware/validateUser');

console.log('\x1b[33m%s\x1b[0m', 'Registring posts routing /api/posts');

console.log('[POST] MW /create ');
router.post('/create', auth, validateUser, createPost);

console.log('[GET] MW /list ');
router.get('/list', auth, validateUser, getAllPosts);

module.exports = router;
