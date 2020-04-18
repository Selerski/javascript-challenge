const router = require('express').Router();
const { getRampData } = require('./controller');

router.get('/', getRampData);

module.exports = router;
