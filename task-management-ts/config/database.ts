import mongoose  from "mongoose";

export const connect = async () : Promise<void> => {
    try {
    // 'mongodb+srv://huyhoang8704:0985769742a@cluster0.r3jnlvf.mongodb.net/ProductManagement'
       await mongoose.connect(process.env.MONGO_URL)
       console.log("Mongodb Connect Successfully")
    } catch (error) {
        console.log(error)
        console.log("Mongodb Connect Failed")
    }
}
