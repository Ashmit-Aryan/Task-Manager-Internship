const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
app.use(express.json());
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('DB Error:', err.message)); // Graceful error handling[web:38]
const TaskSchema = new mongoose.Schema({
text: { type: String, required: true },
due: Date,
completed: { type: Boolean, default: false }
});
const Task = mongoose.model('Task', TaskSchema);
// APIs with validation
app.get('/tasks', async (req, res) => {
try {
const tasks = await Task.find();
res.json(tasks);
} catch (err){
res.status(500).json({ error: 'Server error: ' + err.message });
}
});
app.post('/tasks', async (req, res) => {
try {
if (!req.body.text) throw new Error('Text required');
const task = new Task(req.body);
await task.save();
res.json(task);
} catch (err) {
res.status(400).json({ error: err.message });
}
});
// Add PUT/DELETE similarly...
app.listen(process.env.PORT, () => console.log('Server on port', process.env.PORT));
