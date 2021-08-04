const express = require('express');
const tourController = require('../controllers/tourController');

const router = express.Router();

router.route('/top5tours')
    .get(tourController.aliesTop5Tours,tourController.getTours)

router.route('/')
    .get(tourController.getTours)
    .post(tourController.createTour);

//router.param('id', tourController.checkId);

router.route('/:id')
    .get(tourController.getTour)
    .patch(tourController.updateTour)
    .delete(tourController.deleteTour)

module.exports = router