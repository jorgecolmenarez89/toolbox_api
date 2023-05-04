const express = require('express');
const router = express.Router();
const fileController =  require('../controllers/files.controller');

router.get('/list', fileController.getFiles)

module.exports = router
