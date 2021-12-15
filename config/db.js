const mongoose = require('mongoose');
const config = require('config');
const db =config.get('mongoURI');

const connectDB = async () =>{

    try{
        await mongoose.connect(db,{
            useNewUrlParser: true, // to fix deprecated warning
           // useCreateIndex: true    // to fix deprecated warning
        });
        console.log('MongoDB connected');


    }
    catch(err){
        console.error(err.message);
        process.exit(1);

    }

};

module.exports = connectDB