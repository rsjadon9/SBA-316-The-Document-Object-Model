
var todoForm = document.getElementById('todoForm');
var taskInput = document.getElementById('taskInput');
var taskList = document.getElementById('taskList');
var counterElement = document.getElementById('counter'); // Added counter element

var counter = 0; // Counter for tasks

window.addEventListener('load', loadTasks);

todoForm.addEventListener('submit', addTask);
taskInput.addEventListener('input', validateInput);
taskList.addEventListener('click', handleTaskClick);

function addTask(event) {
    event.preventDefault();

    var taskText = taskInput.value.trim();

    if (taskText !== '') {
        var taskElement = document.createElement('div');
        taskElement.textContent = taskText;
        taskElement.className = 'task';



        taskList.appendChild(taskElement);

        saveTasks();

        taskInput.value = '';

        // Update the counter and display it
        counter++;
        counterElement.textContent = 'Total tasks: ' + counter;
    }

    validateInput();
    window.alert('Task added successfully!');
}

function handleTaskClick(event) {
    var target = event.target;

    if (target.tagName === 'DIV' && target.parentElement === taskList) {
        target.classList.toggle('completed');
        saveTasks();
    }
}

function validateInput() {
    var taskText = taskInput.value.trim();
    var addButton = document.getElementById('addTaskBtn');
    addButton.disabled = taskText === '' || !taskInput.checkValidity();
}

function saveTasks() {
    var tasks = Array.from(taskList.children).map(function (taskElement) {
        return {
            text: taskElement.textContent,
            completed: taskElement.classList.contains('completed')
        };
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    var savedTasks = localStorage.getItem('tasks');

    if (savedTasks) {
        var tasks = JSON.parse(savedTasks);

        tasks.forEach(function (task) {
            var taskElement = document.createElement('div');
            taskElement.textContent = task.text;
            taskElement.className = task.completed ? 'task completed' : 'task';
            taskList.appendChild(taskElement);
        });

        // Update the counter and display it based on the loaded tasks
        counter = tasks.length;
        counterElement.textContent = 'Total tasks: ' + counter;
    }
}

