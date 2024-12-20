const mongoose = require('mongoose');
const Task = require("../model/Task");

const taskController = {};

//todo의 Task를 만들기 위해서 createTask를 만들어요. req는 body에서 옵니다.
taskController.createTask = async(req, res) => {
    try {
        const {task, isCompleted } = req.body;
        const {userId} = req;
        const newTask = new Task({task, isCompleted, author:userId}); //새로운 task를 생성해야 합니다.
        await newTask.save(); //새로운 task를 저장해야 합니다.
        res.status(200).json({status:'ok', data:newTask}); //새로운 task는 data안에 있다
    } catch (err) {        
        res.status(400).json({status:'fail', data:err});
    }
};

taskController.getTasks = async(req, res) => {
    try {
        const taskList = await Task.find({}).populate('author'); //taskList는 task의 array로 저장해야 합니다.

        //_id를 id로 변환
        const formattedTask = taskList.map(task => ({
            id : task._id,
            task : task.task,
            isCompleted : task.isCompleted,
            author : task.author            
        }));

        res.status(200).json({status:'ok', data:taskList});
    } catch(error) {
        res.status(400).json({status:'fail', data:error})
    }
};

taskController.putTask = async(req, res) => {
    try {
        console.log('Request Body:', req.body);  // req.body의 값을 확인
        console.log('Request Params ID:', req.params.id);  // req.params에서 id 확인

        const {id} = req.params;
        const {task, isCompleted} = req.body;
        const updateTask = await Task.findByIdAndUpdate(id, {task, isCompleted}, {new:true});

        //_id를 id로 변환하여 응답
        const formattedTask = {
            id : updateTask._id,
            task : updateTask.task,
            isCompleted : updateTask.isCompleted
        };

        res.status(200).json({status:'ok', data:updateTask});
    } catch(err) {
        res.status(400).json({status:'fail', message:err.message});
    }
};

// Task 삭제
taskController.deleteTask = async (req, res) => {
    try {
      const { id } = req.params;
  
      // 전달된 id가 유효한 ObjectId인지 확인
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ status: 'fail', data: 'Invalid ID format' });
      }
  
      const deleteTask = await Task.findByIdAndDelete(id);
  
      if (!deleteTask) {
        return res.status(404).json({ status: 'fail', data: 'Task not found' });
      }
  
      // _id를 id로 변환하여 응답
      const formattedTask = {
        id: deleteTask._id,
        task: deleteTask.task,
        isCompleted: deleteTask.isCompleted
      };
  
      res.status(200).json({ status: 'ok', data: deleteTask });
    } catch (err) {
      res.status(400).json({ status: 'fail', data: err });
    }
  };
module.exports = taskController;