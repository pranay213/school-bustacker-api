const express = require('express');
const router = express.Router();
const { updateLocation, getBusLocation } = require('../controllers/locationController');

router.post('/update', updateLocation);
router.get('/:busId', getBusLocation);

module.exports = router;
