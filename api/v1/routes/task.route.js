const express = require('express')
// const controller = require('../../Controllers/admin/dashboard.controller')
const router = express.Router()
const Task = require('../../../models/task.model')

// GET : /api/v1/tasks
router.get('', async(req, res) => {
    const find = {deleted: false}
    if(req.query.status){
        find.status = req.query.status
    }

    const task = await Task.find(find)
    // API
    res.json(task)
})
// GET : /api/v1/tasks/detail/:id
router.get('/detail/:id', async(req, res) => {
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

})



module.exports = router;