const express = require("express");


const userController = require("../controllers/user");
const withAuth = require('../middleware/middleware');


const router = express.Router();

//routes to verify token => protect routes authorization.
router.use(withAuth);

router.get("/", userController.rootPath);

router.get('/api/home', userController.home);

router.get('/api/secret', withAuth, userController.secret);

router.post('/api/register', userController.register);

router.post('/api/authenticate', userController.authenticate);

// router.app.get('/checkToken', withAuth, 

module.exports = router;