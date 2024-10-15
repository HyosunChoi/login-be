const Task = require("../model/Task");

const taskController = {};

//todo의 Task를 만들기 위해서 createTask를 만들어요. req는 body에서 옵니다.
taskController.createTask = async(req, res) => {
    try {
        const {task, isCompleted } = req.body;
        const newTask = new Task({task, isCompleted}); //새로운 task를 생성해야 합니다.
        await newTask.save(); //새로운 task를 저장해야 합니다.
        res.status(200).json({status:'ok', data:newTask}); //새로운 task는 data안에 있다
    } catch (err) {        
        res.status(400).json({status:'fail', data:err});
    }
};

taskController.getTasks = async(req, res) => {
    try {
        const taskList = await Task.find({}).select('-__v'); //taskList는 task의 array로 저장해야 합니다.
        res.status(200).json({status:'ok', data:taskList});
    } catch(err) {
        res.status(400).json({status:'fail', data:err})
    }
};

taskController.putTask = async(req, res) => {
    try {
        const {id} = req.params;
        const {task, isCompleted} = req.body;
        const updateTask = await Task.findByIdAndUpdate(id, {task, isCompleted});
        res.status(200).json({status:'ok', data:updateTask});
    } catch(err) {
        res.status(400).json({status:'fail', data:err});
    }
};

taskController.deleteTask = async(req, res) => {
    try {
        const {id} = req.params;
        const deleteTask = await Task.findByIdAndDelete(id);
        res.status(200).json({status:'ok', data:deleteTask});
    } catch(err) {
        res.status(400).json({status:'fail', data:err});    
    }
}
module.exports = taskController;