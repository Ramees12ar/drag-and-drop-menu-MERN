const mongoose = require('mongoose');
const SubItem = new mongoose.Schema({
    id:{
        type: Number,
        required: true
    },
    Iid:{
        type:Number,
        required:true
    },
    item:{
        type: String,
        required: true
    }
})
const SItem = mongoose.model("subitem",SubItem)
module.exports = SItem;