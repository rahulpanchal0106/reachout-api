const app = require("./app");
const mongoose = require("mongoose");
const port = process.env.PORT || 3000;
const mongodb_uri = process.env.MONGODB_URI;


const start_server = async ()=>{
    console.log("Connecting to the database...")
    await mongoose.connect(mongodb_uri).then(() => {
      console.log("Connected to MongoDB");
    }).catch((err) => {
      console.log(err);
    });
    
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
}

start_server()
