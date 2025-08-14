const dotenv=require('dotenv');
const app=require('./App')
const ConnectDB=require('./DB/db')

dotenv.config();



ConnectDB();

app.listen(process.env.PORT,()=>{
    console.log(`Port listening on ${process.env.PORT}`)
})

