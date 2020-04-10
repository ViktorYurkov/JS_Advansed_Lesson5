const Router = require('express').Router;

const tasks = require('./user')

module.exports = () => {
    const routing = Router();
    
    routing.use('/users', tasks());
    
    return routing;
};