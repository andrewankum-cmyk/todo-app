let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';
    
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        if (task.completed) li.classList.add('completed');
        
        li.innerHTML = `
            <input type="checkbox" ${task.completed ? 'checked' : ''} 
                   onchange="toggleComplete(${index})">
            <span>${task.text}</span>
            <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
        `;
        
        taskList.appendChild(li);
    });
    
    updateTaskCount();
}

function addTask() {
    const input = document.getElementById('task-input');
    const text = input.value.trim();
    
    if (text === '') return;
    
    tasks.push({
        text: text,
        completed: false
    });
    
    input.value = '';
    saveTasks();
    renderTasks();
}

function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

function clearCompleted() {
    tasks = tasks.filter(task => !task.completed);
    saveTasks();
    renderTasks();
}

function updateTaskCount() {
    const count = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    document.getElementById('task-count').textContent = 
        `${count} tasks (${completed} completed)`;
}

// Allow pressing Enter to add task
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        addTask();
    }
});

// Initial render
renderTasks();