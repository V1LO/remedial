import Task from "../models/TaskModel.js";

export const getTasks = async (req, res) => {
  const tasks = await Task.findAll({ where: { userId: req.user.id } });
  res.json(tasks);
};

export const addTask = async (req, res) => {
  const { title } = req.body;
  await Task.create({ title, userId: req.user.id });
  res.json({ msg: "Task added" });
};

export const updateTask = async (req, res) => {
    try {
      const { title } = req.body;
      await Task.update({ title }, { where: { id: req.params.id } });
      res.json({ message: "Task updated successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to update task" });
    }
  };
  

export const deleteTask = async (req, res) => {
  const { id } = req.params;
  await Task.destroy({ where: { id, userId: req.user.id } });
  res.json({ msg: "Task deleted" });
};
