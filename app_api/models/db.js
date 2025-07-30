const mongoose = require('mongoose');
const host = process.env.DB_HOST || 'localhost:27017';
const dbURI = `mongodb://${host}/travlr`;
const readLine = require('readline');

// build the conection string and set the connection timeout (ms)
const connect = () => {
    setTimeout(() => mongoose.connect(dbURI, {
        }), 1000);
}

//monitor connection events
mongoose.connection.on('connected', () => {
    console.log(`connected to ${dbURI}`);
});

mongoose.connection.on('error', err => {
    console.log('mongoose connection error: ', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('mongoose disconnected');
});

//windows listener
if(process.platform === 'win32'){
    const r1 = readLine.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    r1.on('SIGINT', () => {
        process.emit("SIGINT");
    })
}

// shutdown listeners

// nodemon shutdown
process.once('SIGUSR2', () => {
    gracefulShutdown('nodemon restart');
    process.kill(process.pid, 'SIGUSR2');
});

// app termination shutdown
process.on('SIGINT', () => {
    gracefulShutdown('app termination');
    process.exit(0);
});

//container termination shutdown
process.on('SIGTERM', () => {
    gracefulShutdown('container termination');
    process.exit(0);
});

function gracefulShutdown(msg){
    mongoose.connection.close(() => {
        console.log(`Mongoose disconnected through ${msg}`);
    })
}

//make initial connection
connect();

//import Mongoose Schema
require('./travlr');
module.exports = mongoose;