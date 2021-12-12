const mongoose = require("mongoose")
const Schema = mongoose.Schema

//initialize data model

const ProfileSchema = new Schema({
    user:{
        type: String,
        ref: "users", //关联表
        required: true
    },
    handle:{
        type: String,
        required: true,
        max: 40
    },
    company:{
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
        required: true,

    },
    skills:{
        type: [String],
        required: true
    },
    experience: [
        {
            current: {
                type: Boolean,
                default: true
            },
            title: {
                type: String,
                required: true
            },
            company: {
                type: String,
                required: true
            },
            location: {
                type: String,
                required: true
            },
            from: {
                type: String,
                required: true
            },
            to: {
                type: String
            }
        }
    ],
    social: {
        'wechat': {type: String},
        'qq': {type: String},
        'tencentkit': {type: String}
    }
})

module.exports = Profile = mongoose.model("profile",ProfileSchema)