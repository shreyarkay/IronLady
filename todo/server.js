// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

let tasks = []; // In-memory storage for tasks
let idCounter = 1; // To generate unique IDs for tasks

// Create a new task
app.post('/tasks', (req, res) => {
    const task = { id: idCounter++, ...req.body };
    tasks.push(task);
    res.status(201).json(task);
});

// Read all tasks
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// Update a task
app.put('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const index = tasks.findIndex(task => task.id === parseInt(id));
    if (index !== -1) {
        tasks[index] = { id: parseInt(id), ...req.body };
        res.json(tasks[index]);
    } else {
        res.status(404).send('Task not found');
    }
});

// Delete a task
app.delete('/tasks/:id', (req, res) => {
    const { id } = req.params;
    tasks = tasks.filter(task => task.id !== parseInt(id));
    res.status(204).send();
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
