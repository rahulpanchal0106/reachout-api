const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    username:{
        type:String
    },
    googleId:{
        type: String
    },
    email:{
        type: String,
        required: String
    },
    refreshToken:{
        type:String,
        required:true
    },
    accessToken:{
        type:String,
        required:true
    }
},{
  timestamps:true  
})

const model = mongoose.model('Users',schema);
module.exports = model;