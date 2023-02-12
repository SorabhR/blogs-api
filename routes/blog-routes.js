const express = require('express');
const {addUser,
    addblog,
    getAllblogs,
    getspecificblogidblog,
    getspecificuseridblog,
    updateBlog,
    deleteblog
      } = require('../controllers/blogController');

const authMiddleware = require('../middleware/auth')

const router = express.Router();

router.post('/register',addUser)
router.post('/blog', authMiddleware, addblog);
router.get('/blog', getAllblogs);
router.get('/blog/:id', getspecificblogidblog);
router.get('/blog/user/:id', getspecificuseridblog);
router.put('/blog/:id', authMiddleware, updateBlog);
router.delete('/blog/:id', authMiddleware, deleteblog);


module.exports = {
    routes: router
}