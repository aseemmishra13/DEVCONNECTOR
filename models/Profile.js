const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({

    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    comapny:{
        type: String
    },
    website:{
        type: String
    },
    location:{
        type: String
    },
    status:{
        type: String,
        required:true
    },
    skills:{
        type: [String],
        required:true
    },
    bio:{
        type: String,
        required:true
    },
    githubusername:{
        type: String,
        required:true
    },
    experience: [
        {
            title: {
            type:String,
            required: true
            },
            comapny: {
                type:String,
                required: true
            },
            location: {
                type:String,
                
            },
            from: {
                type:Date,
                required: true
            },
            to: {
                type:Date
                
            },
            current: {
                type:Boolean,
                default: false
            },
            description: {
                type:String,
                required: true
            }
                
        }
        
    ],
    education: [
        {
            school: {
            type:String,
            required: true
            },
            degree: {
                type:String,
                required: true
            },
            fieldofstudy: {
                type:String,
                
            },
            from: {
                type:Date,
                required: true
            },
            to: {
                type:Date
                
            },
            current: {
                type:Boolean,
                required: true
            },
            description: {
                type:String,
                default: false
            }
                
        }
        
    ],
    social:{
        youtube:{
            type:String
        },
        twitter:{
            type:String
        },
        facebook:{
            type:String
        },
        linkedin:{
            type:String
        },
        instagram:{
            type:String
        },
    },
    date:{
        type:Date,
        default:Date.now
    }

});

module.exports = Profile=mongoose.model('profile',ProfileSchema);