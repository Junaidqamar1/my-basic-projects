document.addEventListener('DOMContentLoaded', function() {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
    const filterAll = document.getElementById('filter-all');
    const filterActive = document.getElementById('filter-active');
    const filterCompleted = document.getElementById('filter-completed');
    let tasks = [];

    loadTasks();

    taskForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const taskText = taskInput.value.trim();
        if (taskText) {
            addTask(taskText);
            taskInput.value = '';
        }
    });

    function addTask(taskText) {
        const task = {
            id: Date.now().toString(),
            text: taskText,
            completed: false
        };
        tasks.push(task);
        saveTasks();
        renderTasks();
    }

    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach(task => {
            const taskElement = document.createElement('div');
            taskElement.classList.add('task');
            if (task.completed) {
                taskElement.classList.add('completed');
            }
            taskElement.innerHTML = `
                <input :="" checked="" task.completed="" type="checkbox"gt;
                <${task.text}>
                <p>${task.text}</p>
                <button class="delete-btn" data-id="${task.id}">Delete</button>

            `;
            
            taskElement.querySelector('input[type="checkbox"]').addEventListener('change', function() {
                toggleTaskCompletion(task.id);
            });
            taskElement.querySelector('.delete-btn').addEventListener('click', function() {
                deleteTask(task.id);
            });
            taskList.appendChild(taskElement);
        });
    }

    function toggleTaskCompletion(id) {
        tasks = tasks.map(task => {
            if (task.id === id) {
                return { ...task, completed: !task.completed };
            }
            return task;
        });
        saveTasks();
        renderTasks();
    }

    function deleteTask(id) {
        tasks = tasks.filter(task => task.id !== id);
        saveTasks();
        renderTasks();
    }

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const savedTasks = localStorage.getItem('tasks');
        if (savedTasks) {
            tasks = JSON.parse(savedTasks);
            renderTasks();
        }
    }

    filterAll.addEventListener('click', function() {
        filterTasks('all');
    });

    filterActive.addEventListener('click', function() {
        filterTasks('active');
    });

    filterCompleted.addEventListener('click', function() {
        filterTasks('completed');
    });

    function filterTasks(type) {
        const filteredTasks = tasks.filter(task => {
            if (type === 'active') {
                return !task.completed;
            } else if (type === 'completed') {
                return task.completed;
            } else {
                return true; // 'all' type
            }
        });
        tasks = filteredTasks;
        renderTasks();
        updateActiveFilter(type);
    }

    function updateActiveFilter(type) {
        document.querySelectorAll('.filter-btn').forEach(button => {
            button.classList.remove('active');
        });
        
        if (type === 'all') {
            filterAll.classList.add('active');
        } else if (type === 'active') {
            filterActive.classList.add('active');
        } else if (type === 'completed') {
            filterCompleted.classList.add('active');
        }
    }
});