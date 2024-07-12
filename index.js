const express = require('express');
const database = require('./config/database')
require('dotenv').config()

const app = express()
const port = process.env.PORT;

// Connect DB
database.connect();
// Nhúng model
const Task = require('./models/task.model')


app.get('/tasks', async(req, res) => {
    const task = await Task.find({deleted: false})

    // API
    res.json(task)
})
app.get('/tasks/detail/:id', async(req, res) => {
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


app.listen(port , () =>{
    console.log(`App listening on port ${port}`);
})