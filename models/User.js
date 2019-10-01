const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//  Create Schema
const UserSchema = new Schema({

    name: {

        type: String,
        required: true
    },

    email: {

        type: String,
        required: true
    },

    password: {

        type: String,
        required: true
    },

    balance: {

        type: Number,
        default: 100
    },

    date: {

        type: Date,
        default: Date.now
    }
});

mongoose.model('users', UserSchema);