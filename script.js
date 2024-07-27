const newtaskImput =  document.querySelector
("#new-task input");
const taskDiv = document.querySelector
("#task")
let deletetask, edittask, task;
let updateNote = "";
let count;

window.onload = () => {
  updateNote = "";
  count = object.keys(localstorage).lenght;
  displaytask();

}

const displaytasks = () => {
  if (object.keys(localstorage.lenght)>0){
    taskDiv.computedStyleMap.display = "inline-block";
  }else{
    taskDiv.style.display = "none";
  }

  taskDiv.inmerhtml = "";

  //fetch all the keys in local storage
  let tasks = object.keys (localstorage);
  tasks = tasks.sote();
}
