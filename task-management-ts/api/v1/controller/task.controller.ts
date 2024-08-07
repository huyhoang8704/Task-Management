import { Express, Request, Response , Router } from "express"
import Task from "../models/task.model";



const index  = async(req : Request, res : Response) => {
    const tasks = await Task.find({
        deleted: false,
    });
    res.json(tasks)
}
const detail = async(req : Request, res : Response) => {
    const task = await Task.findOne({
        _id: req.params.id,
        deleted: false,
    });
    res.json(task)
}


export  = {
    index,
    detail,
}