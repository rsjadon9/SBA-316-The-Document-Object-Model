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
        taskElement.className = 'task';

        var taskTextElement = document.createElement('span');
        taskTextElement.textContent = taskText;

        var deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'delete-btn';

        taskElement.appendChild(taskTextElement);
        taskElement.appendChild(deleteBtn);

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

    if (target.classList.contains('delete-btn')) {
        // If the clicked element is the "Delete" button, handle the deletion
        var taskElement = target.closest('.task');
        taskList.removeChild(taskElement);
        counter--;
        counterElement.textContent = 'Total tasks: ' + counter;
        saveTasks();
    } else if (target.tagName === 'DIV' && target.parentElement === taskList) {
        // If the clicked element is a task, toggle the completed status
        target.classList.toggle('completed');
        saveTasks();
    }
}

function validateInput() {
    var taskText = taskInput.value.trim();
    // Adjust validation logic if needed
}

function saveTasks() {
    var tasks = Array.from(taskList.children).map(function (taskElement) {
        return {
            text: taskElement.querySelector('span').textContent,
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
            taskElement.className = task.completed ? 'task completed' : 'task';

            var taskTextElement = document.createElement('span');
            taskTextElement.textContent = task.text;

            var deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.className = 'delete-btn';

            taskElement.appendChild(taskTextElement);
            taskElement.appendChild(deleteBtn);

            taskList.appendChild(taskElement);

            // Add event listener for the delete button
            deleteBtn.addEventListener('click', function () {
                taskList.removeChild(taskElement);
                counter--;
                counterElement.textContent = 'Total tasks: ' + counter;
                saveTasks();
            });
        });

        // Update the counter and display it based on the loaded tasks
        counter = tasks.length;
        counterElement.textContent = 'Total tasks: ' + counter;
    }
}