function loadTodo() {
    //Get todo-items from local storage 
    let jsonTodo = localStorage.getItem("todos");

    //If there are no todo-items, create an empty list
    if (jsonTodo == null) {
        return [];
    }
    else {
        //Else, parse he json and return it
        return JSON.parse(jsonTodo);
    }
}

function saveTodo(newTodo) {
    //Saves a todo to local storage in JSON-format
    let localTodo = loadTodo();
    localTodo.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(localTodo));
}

$("#todo-form").on("submit", function (e) {
    e.preventDefault();
        //If user do not input a task, alert them
    if ($("#activity").val() == "") {
        alert("Please input a task");
    } else {
        //Add the task to local storage
        const todoAcitvity = $("#activity").val();
        todo = {activity: `${todoAcitvity}`};
        saveTodo(todo);
    }

    //Show the newly added task in the todo-list
    let allTodos = loadTodo()
    printTodos(allTodos);

    //Reset the form
    $("#todo-form").trigger("reset");
});

$("#todo-list").on( "click", "li", function() {
    //Crosses the text of the task
    if ($(this).css("text-decoration") === "line-through solid rgb(0, 0, 0)") {
        $(this).css("text-decoration", "none")
    } else {
        $(this).css("text-decoration", "line-through")
    }
});

$("#todo-list").on("click", ".delete-item", function () {
    /*Removes a task from todo in local storage*/
    let taskIndex = $(this).parent().index()
    let todos = loadTodo();

    todos.splice(taskIndex, 1 );
    window.localStorage.setItem("todos", JSON.stringify(todos));
    $(this).parent().remove();
});

function printTodos(todos) {
    /*Prints todo-tasks in the list*/
    if (todos.length == 0) {
        console.log("Please input a task to display the todo-list");
    } else {
        $("#todo-list").empty()
        for (let i=0; i< todos.length; i++) { 
            $("#todo-list").append(`
            <li>
                <p class="todo-item">${todos[i].activity}</p>
                <img class="delete-item" src="images/close.svg" alt="Close icon">
                <hr>
            </li>`
            );
        }
    }
}

$(document).ready(function () {
    const todos = loadTodo();
    printTodos(todos);
});