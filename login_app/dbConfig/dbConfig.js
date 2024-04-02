import mongoose from "mongoose";

export async function connect(){
    try {
        mongoose.connect(process.env.MONGO_URL,{dbName:"chai-aur-code-auth"})
        const connection = mongoose.connection //useful to add event listeners after the database is connected
        connection.on('connected',()=>{
            console.log("Connected");
        })
        connection.on('error',(error)=>{
            console.log("MongoDB after connection error"+error);
            process.exit()
        })

    } catch (error) {
        console.log("Something went wrong");
        console.log(error);
    }
}