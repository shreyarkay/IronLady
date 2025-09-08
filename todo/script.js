const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');

// Fetch and display tasks
function fetchTasks() {
    fetch('http://localhost:3000/tasks')
        .then(response => response.json())
        .then(tasks => {
            taskList.innerHTML = '';
            tasks.forEach(task => {
                const li = document.createElement('li');
                li.innerHTML = `
                    ${task.name}
                    <button onclick="deleteTask(${task.id})">Delete</button>
                    <button onclick="editTask(${task.id}, '${task.name}')">Edit</button>
                `;
                taskList.appendChild(li);
            });
        });
}

// Add a new task
addTaskButton.addEventListener('click', () => {
    const taskName = taskInput.value;
    if (taskName) {
        fetch('http://localhost:3000/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: taskName })
        })
        .then(() => {
            taskInput.value = '';
            fetchTasks();
        });
    }
});

// Delete a task
function deleteTask(id) {
    fetch(`http://localhost:3000/tasks/${id}`, {
        method: 'DELETE'
    })
    .then(() => fetchTasks());
}

// Edit a task
function editTask(id, currentName) {
    const newName = prompt('Edit task name:', currentName);
    if (newName) {
        fetch(`http://localhost:3000/tasks/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: newName })
        })
        .then(() => fetchTasks());
    }
}

// Initial fetch of tasks
fetchTasks();
