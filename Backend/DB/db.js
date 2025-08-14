const mongoose =require('mongoose');

const ConnectDB=async()=>{

   await mongoose.connect(process.env.MONGO_URL)
    .then(()=>{
        console.log(`Successfully connected to database ${mongoose.connection.name}`)
    })
    .catch((err)=>{
        console.log('Failed to Connect Database');
        process.exit(1);
    })
}


module.exports=ConnectDB;