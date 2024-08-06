const Task = require('../models/task.model')
const paginationHelpers = require('../../../helpers/pagination')
const searchHelpers = require('../../../helpers/search')

const index = async (req, res) => {
    // Find : http://localhost:3000/api/v1/tasks?status=finish
    const find = {
        $or: [
            { createdBy : req.user.id },
            { listUser : req.user.id }
        ],
        deleted: false
    }
    if(req.query.status)  find.status = req.query.status
    
    // Sort : http://localhost:3000/api/v1/tasks?sortKey=title&sortValue=esc
    const sort = {}
    if(req.query.sortKey && req.query.sortValue) sort[req.query.sortKey] = req.query.sortValue

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



    const task = await Task.find(find).sort(sort).limit(objectPagination.limitItem)  // Lấy ra số sản phẩm trên 1 trang
    .skip((objectPagination.currentPage-1)* objectPagination.limitItem) // pagination
    // API
    res.json(task)
}
const detail = async (req, res) => {
    try {
        const id = req.params.id


        const task = await Task.find({
            _id: id,
            deleted: false
        })
    
        // API
        res.json(task)
    } catch (error) {
        console.log("404")
    }

}
const changeStatus = async (req, res) => {
    try {
        const id = req.params.id;
        const status = req.body.status
    
        await Task.updateOne({_id: id}, {$set: {status: status}})
        res.json({
            code : 200,
            message : "Cập nhật trạng thái thành công"
        })
    } catch (error) {
        res.json({
            code : 404,
            message : "Error"
        })
    }

}
const create = async (req, res) => {
    try {
        req.body.createdBy = req.user.id;
        const task = new Task(req.body)
        const data = await task.save();

        res.json({
            code : 200,
            message : "Tạo mới công việc thành công !",
            data : data
        })
    } catch (error) {
        res.json({
            code : 404,
            message : "Error"
        })
    }
}
const edit = async (req, res) => {
    try {
        const id = req.params.id;
        const task = await Task.updateOne({
            _id: id
        },req.body)
        res.json({
            code : 200,
            message : "Success",
        })
    } catch (error) {
        res.json({
            code : 200,
            message : "Error!",
        })
    }
}
const deleteTask = async (req, res) => {
    try {
        const id = req.params.id;


        await Task.updateOne({_id: id}, {
            deleted: true,
            deletedAt: new Date()
        })
        res.json({
            code : 200,
            message : "Success",
        })
    } catch (error) {
        res.json({
            code : 200,
            message : "Error!",
        })
    }
} 

module.exports = {
    index,
    detail,
    changeStatus,
    create,
    edit,
    deleteTask,
}