const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config({ path: './../../config.env' });
const mongoose = require('mongoose');
const Tour = require('./../../models/tourModel');

const DB = process.env.DB_LOCAL; //.replace('<PASSWORD>', process.env.DB_PASSWORD);
mongoose
    .connect(DB, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
    }).then(() => console.log('Succesfully Connected to DB'))

const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
);

async function importDataIntoDB(){
    try {
        await Tour.create(tours);
        console.log('Succesfully imported data into Tour collection');
    } catch (err) {
        console.log(err);
    }
    process.exit();
}

async function deletedDataFromDB(){
    try {
        await Tour.deleteMany();
        console.log('Deleted all documents in Tour collection');
    } catch(err) {
        console.log(err);
    }
    console.log('deleted')
    process.exit();
}

if(process.argv[2] == '--import'){
    importDataIntoDB();
} else if(process.argv[2] == '--delete'){
    deletedDataFromDB();
}