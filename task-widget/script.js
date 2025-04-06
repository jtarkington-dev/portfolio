document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("task-form");
    const input = document.getElementById("task-input");
    const taskList = document.getElementById("task-list");

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        const taskText = input.value;
        const newTask = document.createElement("li");
        newTask.textContent = taskText;

        const deleteBtn = document.createElement("span");
        deleteBtn.textContent = "\u274C";
        deleteBtn.classList.add("delete-btn");

        deleteBtn.addEventListener("click", function () {
            newTask.remove();
        });

        newTask.appendChild(deleteBtn);

        newTask.addEventListener("click", function () {
            newTask.classList.toggle("done");
        });

        taskList.appendChild(newTask);
        input.value = "";
    });
});
