const express = require("express");
const taskController = require("../controller/task.controller");
const authController = require("../controller/auth.controllser");
const router = express.Router()

router.post('/', authController.authenticate,taskController.createTask);

router.get('/',taskController.getTasks);

router.put('/:id', taskController.putTask);

router.delete('/:id', taskController.deleteTask);

module.exports = router;