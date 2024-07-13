const Task = require('../models/task.model')

const index = async (req, res) => {
    // Find : http://localhost:3000/api/v1/tasks?status=finish
    const find = {deleted: false}
    if(req.query.status)  find.status = req.query.status
    
    // Sort : http://localhost:3000/api/v1/tasks?sortKey=title&sortValue=esc
    const sort = {}
    if(req.query.sortKey && req.query.sortValue) sort[req.query.sortKey] = req.query.sortValue
    


    const task = await Task.find(find).sort(sort)
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


module.exports = {
    index,
    detail,
}