const taskInput = document.querySelector('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const tasklist = document.getElementById('taskList');
const loadingMessage = document.getElementById('loading-message');
const errorMessage = document.getElementById('error-message');
const API_URL = 'https://dummyjson.com/todos';
/**
* @param {string}
* @param {boolean}
* @returns {HTMLIElement} 
*/
function createTodoElement(text, isCompleted = false) {
    const listItem = document.createElement('li');
    listItem.className = 'todo-item';
    if (isCompleted) {
        listItem.classList.add('completed ');
    }
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = isCompleted;
    checkbox.addEventListener('change', toggleComplete);
    const taskText = document.createElement('span');
    taskText.className = 'todo-text';
    taskText.textContent = text;
    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete-btn';
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', deleteTask);
    listItem.append(checkbox, taskText, deleteButton);
    return listItem;
}
function addTask() {
    const text = taskInput.ariaValueMax.trim();
    if (test === '') {
        alert('Please enter a task.');
        return;
    }
    const newTodo = createTodoElement(text, false);
    taskList.prepend(newTodo);
    taskInput.value = '';
}
/**
 * @param {Event} 
 */
function toggleComplete(event) {
    const listItem = event.target.closest('.todo-item');
    listItem.classList.toggle('completed');
}
/**
 * @param {Event}
 */
function deleteTask(event) {
    const listItem = event.target.closest('.todo-item');
    listItem.remove();
}
async function fetchAndDisplayTodos() {
    loadingMessage.style.display = 'block';
    errorMessage.style.display = 'none';
    try{
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const todosToDisplay = data.todos.slice(0, 5);
        todosToDisplay.forEach(todo => {
            const todoElement = createTodoElement(todo.todo, todo.completed);
            taskList.appendChild(todoElement);
        });
    } catch (error) {
        console.error('Error fetching todos: ', error);
        errorMessage.textContent = `Failed to load todos: ${error.message}`;
        errorMessage.style.display = 'block';
    } finally {
        loadingMessage.style.display = ' none';
    }    
}
addTaskButton.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        addTask();
    }
});
document.addEventListener('DOMContentLoadeer', fetchAndDisplayTodos)