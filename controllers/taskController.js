const Task  = require('../models/Task')

exports.createTask = async (req, res)=>{
    const { title, description, dueDate, priority} = req.body;

    try{
        const task = new Task({
            user: req.user.id,
            title,description,dueDate,priority,
        });
        await Task.save();
        res.status(200).json({message: "Task Saved"});
    }
    catch(error){
        res.status(500).json({message: "there is a server error defined as:", error});
    }

};

exports.getTask = async(req,res)=>{
    try{
        const tasks = await Task.find({user: req.user.id})
        res.json(tasks)
    } catch(error){
        res.status(500).json({message:"seerber error"});

    }
};

exports.deleteTask = async (req, res) => {
    try {
      const task = await Task.findById(req.params.id);
  
      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }
  
      // Ensure the user owns the task
      if (task.user.toString() !== req.user.id) {
        return res.status(401).json({ message: "Unauthorized" });
      }
  
      await task.remove();
      res.json({ message: "Task deleted" });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  };