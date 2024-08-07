import { Express, Request, Response , Router } from "express"
import Task from "../models/task.model";



const index  = async(req : Request, res : Response) => {
    const find = {
        deleted : false,
    }
    if(req.query.status) find["status"] = req.query.status
    const sort = {}
    if(req.query.sortKey && req.query.sortValue) {
        const sortKey = req.query.sortKey.toString();
        sort[sortKey] = req.query.sortValue
    }
    
    const tasks = await Task.find(find).sort(sort);
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