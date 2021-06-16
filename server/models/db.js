const mongoose = require('mongoose');
const MainItem = new mongoose.Schema({
    id:{
        type: Number,
        required: true
    },
    pid: {
        type: Number,
        default:8,
        required: true
    },
    Name:{
        type: String,
        required: true
    }
})
const Item = mongoose.model("item",MainItem)
module.exports = Item;