const newTaskInput = document.querySelector("#new-task input");
const taskDiv = document.querySelector("#task");
let deleteTasks, editTasks, tasks;
let updateNote = "";
let count;

//Function on window load
window.onload = () => {
  updateNote = "";
  count = Object.keys (localStorage).length;
  displayTasks();
}

//Function to Display the Tasks 
const displayTasks = () => {
  if (Object.keys(localStorage).length > 0) {
    tasksDiv.style.display = "inline-block"; 
  } else {
    tasksDiv.style.display = "none";
  }

  //Clear the Tasks
  tasksDiv.innerHTML = "";

  //Fetch all the Keys in Local Storage
  let tasks = Object.keys(localStorage);
  tasks = tasks.sort();

  for (let key of tasks) {
    let classValue = "";

    //Get all value
    let value = localStorage.getItem(key);
    let taskInnerDiv = document.createElement("div");
    taskInnerDiv.classList.add(task);
    taskInnerDiv.setAttribute("id", key);
    taskInnerDiv.innerHTML = `<span id="taskname">${key.split("_")[1]}</span>`;

    //localStorage would store boolean as string so we parse it to boolean back

    let editButton = document.createElement("button");
    editButton.classList.add("edit");
    editButton.innerHTML.add = `<ion-icon name="create"></ion-icon>`;
    if (!JSON.parse(value)) {
      editButton.style.visibility = "visible";
    } else {
      editButton.style.visibility = "hidden";
      taskInnerDiv.classList.add("completed");
    }
    taskInnerDiv.appendChild(editButton);
    taskInnerDiv.innerHTML += `<button class="delete"><ion-icon name=trash></ion-icon></button>`;
    task.appendChild(taskInnerDiv);
  }

  //Completed Tasks
  tasks = document.querySelectorAll(".tasks");
  tasks.forEach((element, index) => {
    element.onclick = () => {
      //localStorage update
      if (element.classList.contains("completed")) {
        updateStorage(element.id.split("_")[0], element.innerText, false);
      } else {
        updateStorage(element.id.split("_")[0], element.innerText, true);
      }
    };
  });

  //Edit Tasks 
  editTasks = document.getElementsByClassName("edit");
  Array.from(editTasks).forEach((element, index) => {
    element.addEventListener("click", (e) => {
      //Stop propagation to outer elements (if removed when we click delete eventually rhw click will move to parent)
      e.stopPropagation();
      // disable other edit buttons when one task is being edited
      disableButtons(true);
      // update input value and remove div
      let parent = element.parentElement;
      newTaskInput.value = parent.querySelector("taskname").innerText;
      //set updateNote to the task that is being edited 
      updateNote = parent.id;
      //remove task
      parent.remove();
    });
  }); 
}
//DELETE TASKS
deleteTasks = document.getElementsBysClassName("delete");
Array.from(deleteTasks).forEach((element, index) => {
  element.addEventListener("click", (e) => {
    e.stopPropagation();
    //Delete from local storage and remove div
    let parent = element.parentElement;
    removeTasks(parent.id);
    count -= 1;
  });
});

//Disable Edit Button 
const disableButtons = (bool) => {
  let editButtons = document.getElementsByClassName("edit");
  Array.from(editButtons).forEach((element) => {
    element.disabled = bool;
  });
}

//Add tasks to local storage 
const updateStorage = (index, taskValue, completed) => {
  localStorage.setItem(`${index}_${taskValue}`, completed);
  displayTasks();
}

//Remove Task from local storage
const removeTask = (taskValue) => {
  localStorage.removeItem(taskValue);
  displayTasks();
}

//Function To Add New Task
document.querySelector("#push").addEventListener("click", () => {
//Enable the edit button
disableButtons(false);
if(newTaskInput.value.length == 0) {
  alert("Please Enter A Task");
} else {
  //Store locally and display from local storage
  if(updateNote == "") {
    //new task
    updateStorage(count, newTaskInput.value, false);
  } else {
    //update task
    let existingCount = updateNote.split("_")[0];
    removeTask(updateNote);
    updateStorage(existingCount, newTaskInput.value, false);
    updateNote = "";
  }
  count += 1;
  newTaskInput.value = "";
}
});