// Load todos from Local Storage
let todoList = JSON.parse(localStorage.getItem("todos")) || [];

// Display todos on page load
displayItems();

function addTodo() {
    const inputElement = document.getElementById("todo-input");
    const dateElement = document.getElementById("todo-date");

    const todoText = inputElement.value.trim();
    const todoDate = dateElement.value;

    // Validation
    if (todoText === "" || todoDate === "") {
        alert("Please enter both task and date.");
        return;
    }

    // Add new todo
    todoList.push({
        text: todoText,
        date: todoDate,
        completed: false
    });

    saveTodos();

    // Clear inputs
    inputElement.value = "";
    dateElement.value = "";

    displayItems();
}

function displayItems() {

    const container = document.getElementById("todo-container");
    container.innerHTML = "";

    if (todoList.length === 0) {
        container.innerHTML = "<p>No tasks available.</p>";
        return;
    }

    todoList.forEach((todo, index) => {

        const div = document.createElement("div");
        div.className = "todo-item";

        div.innerHTML = `
            <span class="${todo.completed ? 'completed' : ''}">
                ${todo.text}
            </span>

            <span>${formatDate(todo.date)}</span>

            <button class="btn complete-btn" onclick="toggleComplete(${index})">
                ${todo.completed ? "Undo" : "Complete"}
            </button>

            <button class="btn delete-btn" onclick="deleteTodo(${index})">
                Delete
            </button>
        `;

        container.appendChild(div);

    });

}

function toggleComplete(index) {

    todoList[index].completed = !todoList[index].completed;

    saveTodos();

    displayItems();

}

function deleteTodo(index) {

    if (confirm("Are you sure you want to delete this task?")) {

        todoList.splice(index, 1);

        saveTodos();

        displayItems();

    }

}

function saveTodos() {

    localStorage.setItem("todos", JSON.stringify(todoList));

}

function formatDate(dateString) {

    const date = new Date(dateString);

    return date.toLocaleDateString("en-GB");

}