const express = require('express')
// const controller = require('../../Controllers/admin/dashboard.controller')
const router = express.Router()
const Task = require('../../../models/task.model')


router.get('', async(req, res) => {
    const task = await Task.find({deleted: false})

    // API
    res.json(task)
})
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