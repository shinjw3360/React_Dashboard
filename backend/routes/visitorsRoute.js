const router = require('express').Router();
const visitorsRoute = require('../controllers/visitorsController');

router.get('/visitors', visitorsRoute.getVisitors);

module.exports = router;
