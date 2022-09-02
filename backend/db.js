const mongoose=require('mongoose');
const mongoURI="mongodb+srv://imessage:imessage@cluster0.z6u4aec.mongodb.net/?retryWrites=true&w=majority"

const connectToMongo=()=>{
    mongoose.connect(mongoURI, ()=>{
        console.log("Connected to MongoDB Successfully");
    })
}

module.exports = connectToMongo;