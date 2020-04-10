'use strict';
console.log('tasks_route');
const express = require('express');
const route = express.Router();

const tasksController = require('../components/tasks/task_controller');

module.exports = () => {
    route.get('/', tasksController.getAllData);
    route.post('/', tasksController.addData);
    route.delete('/:id', tasksController.removeData);
    route.put('/:id', tasksController.updateData);
    
    return route;
};
