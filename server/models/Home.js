const mongoose = require('mongoose');

const homeSchema = new mongoose.Schema(
    {
        title: {type: String, required: true},
        desc: {type: String, required: true},
        img: {type: String},
        lookingFor: {type: String, required: true},
        tenants: {type: Number, required: true},
        cost: {type: Number, required: true},
        ownerName: {type: String, required: true},
        contact: {type: String, required: true},
        location: {type: String, required: true},
        isActive: {type: Boolean, default: true}
    },
);
module.exports =  mongoose.model("Home", homeSchema);