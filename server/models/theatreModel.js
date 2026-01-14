const mongoose = require('mongoose');

const theatreSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    phone: {
        type: Number,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    isActive: {
        type: Boolean,
        default: false
    }
},
{ timestamps: true });

const Theatre = mongoose.model("theatres", theatreSchema);
module.exports = Theatre;
