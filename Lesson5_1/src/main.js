'use strict';
//допоміжні пакети
const express = require('express');
const bodyParser = require('body-parser');

// наші дані
const routing = require('./app/routes');
const config = require('./config/app');

const app = express();

app.use(bodyParser.json());
app.use('/api', routing());


function startDB() {
    
    const taskController = require('./app/components/tasks/task_service');

    taskController.createDB(function (err, result_) {
        if (err) {
            console.log('Error DB');
            return;
        } else {
            console.log('OK is DB');
            taskController.useDB(function (err, result_) {
                if (err) {
                    console.log('Error use DB');
                    return;
                } else {
                    console.log('OK use DB');
                    taskController.createTable(function (err, result_) {
                        if (err) {
                            console.log('Error is Table');
                            return;
                        } else {
                            console.log('OK is Table');
                            const appPort = 3000;
                            app.listen(appPort, () => console.log(`listen on port ${appPort}`));
                            console.log('OK start');
                        }
                    });
                }
            });

        }
    });

};

startDB();
