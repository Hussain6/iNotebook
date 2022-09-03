const mongoose=require('mongoose');
const mongoURI="m"

const connectToMongo=()=>{
    mongoose.connect(mongoURI, ()=>{
        console.log("Connected to MongoDB Successfully");
    })
}

module.exports = connectToMongo;
