'use strict';

class Task {
    constructor(name) {
        this.id = Date.now();
        this.name = name;
    }
}

class Storage {
    static getTasks() {
        let tasks;

        if (localStorage.getItem('tasks') === null) {
            tasks = [];
        } else {
            tasks = JSON.parse(localStorage.getItem('tasks'));
        }
        return tasks;
    }

    static addTask(task) {
        const tasks = Storage.getTasks();
        
        tasks.push(task)
        
        Storage.updateTasks(tasks);
    }

    static updateTasks(task) {
        localStorage.setItem('tasks', JSON.stringify(task));
    }


    static removeTask(id) {
        let tasks = Storage.getTasks();

        tasks = tasks.filter(task => task.id !== Number(id));

        Storage.updateTasks(tasks);
    }
}

class UserInterface {
    static renderTasks() {
        const tasks = Storage.getTasks();
		tasks.forEach(UserInterface.renderTask);
    }

    static renderTask(task) {
        const list = document.querySelector('.task-list');
        const row = document.createElement('tr');

        row.innerHTML = `
	      <td>${task.name}</td>
	      <td><a href='#' class='btn btn-danger btn-sm task-delete' data-key=${task.id}>X</a></td>
	    `;

        list.appendChild(row);
    }

    static removeTask(task) {
        if (task.target.classList.contains('task-delete')) {
            task.target.parentElement.parentElement.remove();
        }
    }

    static clearTaskField() {
    	document.getElementById('task').value = null;
    }
}

const handleTaskAdd = (task) => {
    const newTask = new Task(task);

    Storage.addTask(newTask);

    UserInterface.renderTask(newTask);

    UserInterface.clearTaskField();
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    handleTaskAdd(document.getElementById('task').value);

})

document.querySelector('.task-list').addEventListener('click', (e) => {

    UserInterface.removeTask(e);

    Storage.removeTask(e.target.getAttribute('data-key'));
});

//window.onload = UserInterface.renderTasks();

window.onload = function() {
  //init();
  UserInterface.renderTasks();
};
