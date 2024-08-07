import mongoose from "mongoose";


const taskSchema = new mongoose.Schema(
    {
        title : String ,
        status : String,
        content : String,
        timeStart : Date,
        timeFinish : Date,
        createdBy : String,
        listUser : Array,
        deleted: {
            type : Boolean,
            default: false,
        },
        deletedAt: Date,

    },
    {
        timestamps : true
    }
);


const Task = mongoose.model("Task",taskSchema,"tasks") // argu3 là tên connection trong db


export default Task;  
// không cần dùng ngoặc nhọn do default là 1
