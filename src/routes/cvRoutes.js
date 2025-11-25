// src/routes/cvRoutes.js
const express = require('express');
const router = express.Router();
const cvController = require('../controllers/cvController');

router.get('/', cvController.getHomePage);
router.post('/generate', cvController.generateOptimizedCV);

module.exports = router;