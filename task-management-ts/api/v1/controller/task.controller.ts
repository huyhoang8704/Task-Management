import { Express, Request, Response , Router } from "express"
import Task from "../models/task.model";
import paginationHelpers from "../../../helpers/pagination";
import searchHelpers from "../../../helpers/search";

const index  = async(req : Request, res : Response) => {
    // Find
    const find = {
        deleted : false,
    }
    if(req.query.status) find["status"] = req.query.status

    // Sort
    const sort = {}
    if(req.query.sortKey && req.query.sortValue) {
        const sortKey = req.query.sortKey.toString();
        sort[sortKey] = req.query.sortValue
    }
    // Pagination : http://localhost:3000/api/v1/tasks?page=1
    const countTasks = await Task.countDocuments(find);
    let objectPagination = paginationHelpers(
        {
            currentPage : 1 ,
            limitItem : 20
        },
        req.query,
        countTasks
    )
    // Search
    const keyword = searchHelpers(req,find);


    const tasks = await Task
            .find(find)
            .sort(sort)
            .limit(objectPagination.limitItem)  // Lấy ra số sản phẩm trên 1 trang
            .skip((objectPagination.currentPage-1)* objectPagination.limitItem) // pagination
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