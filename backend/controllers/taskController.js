import Task from '../models/Task.js';

export const createTask = async (req, res) => {
  const { title, description, dueDate, priority, status, assignedTo } = req.body;
  const task = await Task.create({
    title, description, dueDate, priority, status, assignedTo, createdBy: req.user._id
  });
  res.json(task);
};

export const getTasks = async (req, res) => {
  const tasks = await Task.find({
    $or: [{ assignedTo: req.user._id }, { createdBy: req.user._id }]
  }).populate('assignedTo', 'name email');
  res.json(tasks);
};

export const getTaskById = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: 'Task not found' });
  res.json(task);
};

export const updateTask = async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(task);
};

export const deleteTask = async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: 'Task deleted' });
};
