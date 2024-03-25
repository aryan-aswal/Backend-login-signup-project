const express = require('express');
const { signUp, login } = require('../controllers/Auth');
const { auth, isStudent, isAdmin } = require('../middlewares/auth'); 
const router = express.Router();

router.post('/signup', signUp);
router.post('/login', login);

router.get("/student", auth, isStudent, (req, res) => {
    res.json({
        success: true,
        message: "Welcome to protected routes"
    })
})

router.get('/admin', auth, isAdmin, (req, res) => {
    res.json({
        success: true,
        message: "Welcome to protected routes",
    })
})
module.exports = { router };

