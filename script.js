document.addEventListener("DOMContentLoaded", function () {
  loadTasks();
  //select DOM elements
  const addButton = document.getElementById("add-task-btn");
  const taskInput = document.getElementById("task-input");
  const taskList = document.getElementById("task-list");

  //create the addTask Function
  function addTask(taskText, save = true) {
    let taskText = taskInput.value.trim();
    if (taskText === "") {
      alert("enter a task");
      return;
    }

    //create li element
    const li = document.createElement("li");
    li.textContent = taskText;

    //create remove button
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.classList.add("remove-btn");

    //make the remove button delete the task
    removeBtn.onclick = () => {
      taskList.removeChild(li);
    };

    //add remove button to li and then li to the list
    li.appendChild(removeBtn);
    taskList.appendChild(li);

    //clear task input field
    taskInput.value = "";

    if (save) {
      const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
      storedTasks.push(taskText);
      localStorage.setItem("tasks", JSON.stringify(storedTasks));
    }
  }

  function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    storedTasks.forEach((taskText) => {
      addTask(taskText, false);
    });
  }

  addButton.addEventListener("click", addTask);

  taskInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      addTask();
    }
  });

  addTask();
});
