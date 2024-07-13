const express = require('express')
const controller = require('../controller/task.controller')
const router = express.Router()


// GET : /api/v1/tasks
router.get('', controller.index)
// GET : /api/v1/tasks/detail/:id
router.get('/detail/:id', controller.detail)



module.exports = router;