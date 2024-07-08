document.getElementById("add-task-btn").addEventListener("click", addTask);

function addTask() {
  const title = document.getElementById("task-title").value;
  const description = document.getElementById("task-description").value;
  const dueDate = document.getElementById("task-due-date").value;
  const priority = document.getElementById("task-priority").value;

  if (!title || !dueDate) {
    alert("Please provide a title and due date.");
    return;
  }

  const status = "pending"; // Set the default status to 'pending'

  const taskItem = document.createElement("div");
  taskItem.classList.add("task-item", `status-${status}`);

  const taskDetails = document.createElement("div");
  taskDetails.classList.add("task-details");
  taskDetails.innerHTML = `
        <strong>${title}</strong>
        <p>${description}</p>
        <small>Priority: ${priority}</small><br>
        <small>Status: <span class="status-text">${status}</span></small><br>
         <small>Due: ${new Date(dueDate).toLocaleString()}</small><br>
    `;

  const taskActions = document.createElement("div");
  taskActions.classList.add("task-actions");

  const statusBtn = document.createElement("button");
  statusBtn.textContent = "Status";
  statusBtn.classList.add("status");
  statusBtn.addEventListener("click", () => {
    cycleStatus(taskItem, taskDetails, statusBtn, deleteBtn);
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.classList.add("delete");
  deleteBtn.addEventListener("click", () => {
    taskItem.remove();
  });

  taskActions.appendChild(statusBtn);
  taskActions.appendChild(deleteBtn);

  taskItem.appendChild(taskDetails);
  taskItem.appendChild(taskActions);

  document.getElementById("task-list").appendChild(taskItem);

  document.getElementById("task-title").value = "";
  document.getElementById("task-description").value = "";
  document.getElementById("task-due-date").value = "";
  document.getElementById("task-priority").value = "low";
}

function cycleStatus(taskItem, taskDetails, statusBtn, deleteBtn) {
  const statusText = taskDetails.querySelector(".status-text");
  let newStatus;

  if (statusText.textContent === "pending") {
    newStatus = "in-progress";
  } else if (statusText.textContent === "in-progress") {
    newStatus = "completed";
  } else {
    newStatus = "pending";
  }

  statusText.textContent = newStatus;

  taskItem.classList.remove(
    "status-pending",
    "status-in-progress",
    "status-completed"
  );
  taskItem.classList.add(`status-${newStatus}`);

  if (newStatus === "completed") {
    statusBtn.style.backgroundColor = "#4caf50";
    deleteBtn.style.backgroundColor = "#4caf50";
    statusBtn.style.color = "#fff";
    deleteBtn.style.color = "#fff";
  } else if (newStatus === "in-progress") {
    statusBtn.style.backgroundColor = "#ffeb3b";
    statusBtn.style.color = "#333";
    deleteBtn.style.backgroundColor = "#ffeb3b";
    deleteBtn.style.color = "#333";
  } else {
    statusBtn.style.backgroundColor = "#f44336";
    statusBtn.style.color = "#fff";
    deleteBtn.style.backgroundColor = "#f44336";
    deleteBtn.style.color = "#fff";
  }
}
