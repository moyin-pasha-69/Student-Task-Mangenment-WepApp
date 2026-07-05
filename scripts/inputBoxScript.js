document.addEventListener("DOMContentLoaded", () => {
  const inputTask = document.getElementById("inputTask");
  const highPriority = document.getElementById("red-h");
  const mediumPriority = document.getElementById("orange-m");
  const lowPriority = document.getElementById("green-l");
  const addTaskButton = document.getElementById("addTaskButton");
  const priorityMessage = document.querySelector(".priorityMessage");
  const totalTasks = document.getElementById("totalTasks");
  const pendingTasks = document.getElementById("pendingTasks");
  const completedTasks = document.getElementById("completedTasks");
  const taskContent = document.getElementById("taskContent");

  let selectedPriority = "";
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  renderTasks();
  updateStats();

  //Priority
  highPriority.addEventListener("click", () => {
    mediumPriority.classList.remove("selected");
    lowPriority.classList.remove("selected");
    if (selectedPriority === "High") {
      highPriority.classList.remove("selected");
      selectedPriority = "";
    } else {
      selectedPriority = "High";
      highPriority.classList.add("selected");
    }
  });

  mediumPriority.addEventListener("click", () => {
    highPriority.classList.remove("selected");
    lowPriority.classList.remove("selected");
    if (selectedPriority === "Medium") {
      mediumPriority.classList.remove("selected");
      selectedPriority = "";
    } else {
      selectedPriority = "Medium";
      mediumPriority.classList.add("selected");
    }
  });

  lowPriority.addEventListener("click", () => {
    highPriority.classList.remove("selected");
    mediumPriority.classList.remove("selected");
    if (selectedPriority === "Low") {
      lowPriority.classList.remove("selected");
      selectedPriority = "";
    } else {
      selectedPriority = "Low";
      lowPriority.classList.add("selected");
    }
  });

  addTaskButton.addEventListener("click", () => {
    let taskText = inputTask.value.trim();
    if (taskText == "") return;
    if (selectedPriority == "") {
      priorityMessage.textContent = "Please select a priority";
    } else {
      addTaskButton.classList.add("cursor-pointer");
      addTaskButton.classList.remove("cursor-not-allowed");
      const taskData = {
        id: Date.now(),
        title: taskText,
        priority: selectedPriority,
        completed: false,
      };
      tasks.push(taskData);
      saveTasks();
      renderTasks();

      console.log(tasks);
      inputTask.value = "";
      selectedPriority = "";
      highPriority.classList.remove("selected");
      mediumPriority.classList.remove("selected");
      lowPriority.classList.remove("selected");
      priorityMessage.textContent = "";
    }
  });

  function renderTasks() {
    taskContent.textContent = "";

    tasks.forEach((task, index) => {
      let tr = document.createElement("tr");
      tr.classList.add("addRow");
      console.log(task.priority);

      if (task.completed === false) {
        if (task.priority === "High") {
          tr.innerHTML = `
                <td>${index + 1}</td>
                <td class="tooltip " title="${task.title}">
                ${task.title}
                </td>
                <td class="mx-auto ">
                  <div
                    class="redBall mx-auto inline-block align-middle"
                  ></div>
                  <span class="hidden sm:inline-block">${task.priority}</span>
                </td>
                <td class="hidden sm:inline-block">Pending</td>
                <td><p class="taskAction doneTask">Done</p></td>   
    `;
        } else if (task.priority === "Medium") {
          tr.innerHTML = `
                <td>${index + 1}</td>
                <td class="tooltip" title="${task.title}">
                ${task.title}
                </td>
                <td class="mx-auto">
                  <div
                    class="yellowBall mx-auto inline-block align-middle"
                  ></div>
                  <span class="hidden sm:inline-block">${task.priority}</span>
                </td>
                <td class="hidden sm:inline-block">Pending</td>
                <td><p class="taskAction doneTask">Done</p></td>
              
    `;
        } else {
          tr.innerHTML = `
                <td>${index + 1}</td>
                <td class="tooltip" title="${task.title}">
                ${task.title}
                </td>
                <td class="mx-auto">
                  <div
                    class="greenBall mx-auto inline-block align-middle"
                  ></div>
                  <span class="hidden sm:inline-block">${task.priority}</span>
                </td>
                <td class="hidden sm:inline-block">Pending</td>
                <td><p class="taskAction doneTask">Done</p></td>
              
    `;
        }
      } else {
        if (task.priority === "High") {
          tr.innerHTML = `
                <td class="completeTaskStyle">${index + 1}</td>
                <td class="tooltip completeTaskStyle" title="${task.title}">
                ${task.title}
                </td>
                <td class="mx-auto ">
                  <div
                    class="redBall-c mx-auto inline-block align-middle"
                  ></div>
                  <span class="hidden sm:inline-block completeTaskStyle">${task.priority}</span>
                </td>
                <td class="hidden sm:inline-block">Completed</td>
                <td><p class="taskAction deleteTask">Delete</p></td>   
    `;
        } else if (task.priority === "Medium") {
          tr.innerHTML = `
                <td class="completeTaskStyle">${index + 1}</td>
                <td class="tooltip completeTaskStyle" title="${task.title}">
                ${task.title}
                </td>
                <td class="mx-auto completeTaskStyle">
                  <div
                    class="yellowBall-c mx-auto inline-block align-middle"
                  ></div>
                  <span class="hidden sm:inline-block completeTaskStyle">${task.priority}</span>
                </td>
                <td class="hidden sm:inline-block">Completed</td>
                <td><p class="taskAction deleteTask">Delete</p></td>
              
    `;
        } else {
          tr.innerHTML = `
                <td class="completeTaskStyle">${index + 1}</td>
                <td class="tooltip completeTaskStyle" title="${task.title}">
                ${task.title}
                </td>
                <td class="mx-auto completeTaskStyle">
                  <div
                    class="greenBall-c mx-auto inline-block align-middle"
                  ></div>
                  <span class="hidden sm:inline-block completeTaskStyle">${task.priority}</span>
                </td>
                <td class="hidden sm:inline-block">Completed</td>
                <td><p class="taskAction deleteTask">Delete</p></td>
              
    `;
        }
      }

      taskContent.appendChild(tr);

      const taskAction = tr.querySelector(".taskAction");
      taskAction.addEventListener("click", () => {
        console.log(" index is : " + index);

        if (taskAction.textContent === "Done") {
          task.completed = true;
        } else {
          tasks.splice(index, 1);

          saveTasks();
          renderTasks();
          updateStats();
        }

        console.log(taskAction.textContent);

        saveTasks();
        renderTasks();
        updateStats();
      });
    });
  }

  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
    updateStats();
  }

  function updateStats(task) {
    totalTasks.textContent = tasks.length;
    let completed = 0;
    let pending = 0;
    tasks.forEach((data) => {
      if (data.completed === true) completed++;
      else pending++;
    });
    pendingTasks.textContent = pending;
    completedTasks.textContent = completed;
  }
});
