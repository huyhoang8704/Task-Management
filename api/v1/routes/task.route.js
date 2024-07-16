const express = require('express')
const controller = require('../controller/task.controller')
const router = express.Router()


// GET : /api/v1/tasks
router.get('', controller.index)
// GET : /api/v1/tasks/detail/:id
router.get('/detail/:id', controller.detail)
// PATCH : http://localhost:3000/api/v1/tasks/change-status/66910d717d95d366bff02103
router.patch('/change-status/:id', controller.changeStatus)
// POST : /api/v1/tasks/create
router.post('/create', controller.create)
// PATCH : http://localhost:3000/api/v1/tasks/edit/:id
router.patch('/edit/:id', controller.edit)
// DELETE : http://localhost:3000/api/v1/tasks/delete/:id
router.delete('/delete/:id', controller.deleteTask)
module.exports = router;