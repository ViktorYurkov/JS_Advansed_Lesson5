'use strict';
console.log('controller');
const taskService = require('./task_service');

const createDB = (req, res) => {
   taskService.createDB(function (err, result){
         if (err) {
            console.log('Database available');
        } else {
            console.log('Creation of database');
            //res.status(200).json({message: 'Creation or availability of databases'});
        }  
    });
};

const useDB = (reg, res) => {
    taskService.useDB(function (err, result) {
        if (err) {
            res.status(500).json(error); //////////////////
        } else {
            res.status(200).json(result); //////////////////
            console.log('Use of database');
        }
    });
};

const createTable = (req, res) => {
   taskService.createTable(function (err, result){
         if (err) {
            res.status(404).json({
            message: 'Eror create table'
        });
        } else {
            console.log('Creation or availability of table');
            //res.status(200).json({message: 'Create table'});
            
        }  
    });
};

const getAllData = (reg, res) => {
    taskService.getAllData(function (err, result) {
        if (err) {
            res.status(500).json(error);
        } else {
            console.dir(result);
            res.status(200).json(result);
        }


    });

};

const addData = (req, res) => {
    taskService.addData(req.body, function (err, result){
        if (err) {
            res.status(500).json("Error add data on no data");
        } else {
            console.dir('Add data of database');
            res.status(201).json(req.body);
        }
    });
};
//    if(!req.body) return res.sendStatus(400);
//     return res.status(201).json(result);
//    }, () => {
//        return res.status(400).json({mesage: 'Please, fild all required field'});
//    

const removeData = (req, res) => {
    //console.log('controller   removeTask');
   taskService.removeData(req.params.id, function (err, result){
         if (err) {
            res.status(404).json({
            message: 'There is no such resourse'
        });
        } else {
            console.dir('Remove data id: ' + req.params.id);
            res.status(200).json({success: true});
        }  
    });
};

const updateData = (req, res) => {
    //console.log('controller   updateTask');
    taskService.updateData(req.params.id, req.body, function (err, result){
        if (err) {
            return res.status(404).json({message: "There is no such response"});
        } else {
            console.dir('Update data id: ' + req.params.id);
            return res.status(200).json({message: 'Updated successfully!'});
        }
    });

};


module.exports = {
    createDB,
    useDB,
    createTable,
    getAllData,
    addData,
    removeData,
    updateData 
}
