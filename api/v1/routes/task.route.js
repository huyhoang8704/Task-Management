const express = require('express')
const controller = require('../controller/task.controller')
const router = express.Router()


// GET : /api/v1/tasks
router.get('', controller.index)
// GET : /api/v1/tasks/detail/:id
router.get('/detail/:id', controller.detail)
// PATCH : http://localhost:3000/api/v1/tasks/change-status/66910d717d95d366bff02103
router.patch('/change-status/:id', controller.changeStatus)


module.exports = router;