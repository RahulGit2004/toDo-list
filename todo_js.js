const addTaskButton = document.getElementById('add-task');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

addTaskButton.addEventListener('click', function () {
    const taskText = todoInput.value.trim();

    if (taskText === '') {
        alert('Please enter a task');
        return;
    }

    const taskItem = document.createElement('li');
    taskItem.classList.add('list-group-item', 'd-flex', 'justify-content-between');
    taskItem.innerHTML = `
        <input type="checkbox" class="checkbox-done me-3">
        <span class="task-text">${taskText}</span>
        <div class="del-edit">
            <button class="btn btn-sm btn-outline-dark me-4 edit-task">
                Edit
            </button>
            <i class="fa-solid fa-trash delete"></i>
        </div>
    `;
    
    todoList.appendChild(taskItem);

    todoInput.value = '';

    attachTaskEventListeners(taskItem);

    

    taskItem.querySelector('.task-text').style.whiteSpace = 'normal';  


});

function attachTaskEventListeners(taskItem) {
    const editButton = taskItem.querySelector('.edit-task');
    const deleteButton = taskItem.querySelector('.delete');
    const checkbox = taskItem.querySelector('.checkbox-done');

    editButton.addEventListener('click', function () {
        const newText = prompt('Edit your task:', taskItem.querySelector('.task-text').textContent.trim());
        if (newText !== null && newText.trim() !== '') {
            taskItem.querySelector('.task-text').textContent = newText;
        }
    });

    deleteButton.addEventListener('click', function () {
        taskItem.remove();
    });

    checkbox.addEventListener('change', function () {
        if (checkbox.checked) {
            taskItem.classList.add('done'); 
            editButton.disabled = true; 
        } else {
            taskItem.classList.remove('done'); 
            editButton.disabled = false; 
        }
    });
}

todoInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        addTaskButton.click();
    }
});
