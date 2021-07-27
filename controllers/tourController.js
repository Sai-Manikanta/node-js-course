const fs = require('fs');

const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/tours.json`)
);

exports.checkId = (req, res, next, val) => {
    const tour = tours.find(el => el._id === val);
    if(!tour){
        return res.status(404).json({
            status: 'fail',
            data: null
        })
    }
    next();
}

exports.getTours = (req, res) => {
    res.status(200).json({
        status: 'success',
        requestedAt: req.requestedTime,
        results: tours.length,
        data: {
            tours
        }
    });
}

exports.createTour = (req, res) => {
    const newId = tours[tours.length - 1]._id + 1;
    const newTour = Object.assign({ id: newId }, req.body);

    tours.push(newTour);
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
        res.status(201).json({
            status: 'success',
            data: {
                tour: newTour
            }
        })
    })
}

exports.getTour = (req, res) => {
    const { id } = req.params;

    const tour = tours.find(el => el._id === id);
    
    res.status(200).json({
        status: 'success',
        data: {
            tour
        }
    })
}

exports.updateTour = (req, res) => {
    res.status(200).json({
        status: 'success',
        message: '<Updated tour here...>'
    })
}

exports.deleteTour =  (req, res) => {
    res.status(200).json({
        status: 'success',
        message: null
    })
}