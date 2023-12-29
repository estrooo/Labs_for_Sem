document.addEventListener('DOMContentLoaded', function () {
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');
    const sortDropdown = document.getElementById('sortDropdown');
  
    taskInput.addEventListener('keypress', function (event) {
      if (event.key === 'Enter' && taskInput.value.trim() !== '') {
        addTask(taskInput.value.trim());
        taskInput.value = '';
        saveTasks();
      }
    });
  
    sortDropdown.addEventListener('change', function () {
      sortTasks();
    });
  
    function addTask(taskText, completed = false) {
      const li = document.createElement('li');
      const checkbox = document.createElement('input');
      const span = document.createElement('span');
      const deleteBtn = document.createElement('span');
  
      checkbox.type = 'checkbox';
      checkbox.checked = completed;
      span.textContent = taskText;
      deleteBtn.textContent = '❌';
  
      li.appendChild(checkbox);
      li.appendChild(span);
      li.appendChild(deleteBtn);
  
      taskList.appendChild(li);
  
      checkbox.addEventListener('change', function () {
        li.classList.toggle('completed', checkbox.checked);
        if (checkbox.checked) {
          deleteBtn.style.display = 'none';
        } else {
          deleteBtn.style.display = 'inline';
        }
        saveTasks();
      });
  
      deleteBtn.addEventListener('click', function () {
        li.remove();
        saveTasks();
      });
  
      span.addEventListener('dblclick', function () {
        const input = document.createElement('input');
        input.type = 'text';
        input.value = span.textContent;
  
        li.replaceChild(input, span);
        input.focus();
  
        input.addEventListener('blur', function () {
          span.textContent = input.value;
          li.replaceChild(span, input);
          saveTasks();
        });
  
        input.addEventListener('keypress', function (event) {
          if (event.key === 'Enter') {
            span.textContent = input.value;
            li.replaceChild(span, input);
            saveTasks();
          }
        });
      });
    }
  
    function saveTasks() {
      const tasks = [];
      const taskElements = document.querySelectorAll('#taskList li');
      taskElements.forEach((taskElement) => {
        const taskText = taskElement.querySelector('span').textContent;
        const completed = taskElement.querySelector('input').checked;
        tasks.push({ text: taskText, completed: completed });
      });
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  
    function loadTasks() {
      const tasksString = localStorage.getItem('tasks');
      if (tasksString) {
        const tasks = JSON.parse(tasksString);
        tasks.forEach((task) => {
          addTask(task.text, task.completed);
        });
      }
    }
  
    function sortTasks() {
      const taskElements = document.querySelectorAll('#taskList li');
      const sortedTasks = Array.from(taskElements).sort((a, b) => {
        const aCompleted = a.classList.contains('completed');
        const bCompleted = b.classList.contains('completed');
  
        if (sortDropdown.value === 'completed') {
          return aCompleted === bCompleted ? 0 : aCompleted ? 1 : -1;
        } else {
          return 0;
        }
      });
  
      taskList.innerHTML = '';
      sortedTasks.forEach((taskElement) => {
        taskList.appendChild(taskElement);
      });
    }
  
    // Load tasks on page load
    loadTasks();
  });
  