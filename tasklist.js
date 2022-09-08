const formNewTask = document.querySelector(".form-create-task");
const inputCreate = document.querySelector(".form-create-task__input");
const inputFilter = document.querySelector(".form-filter__input");
const clearBtn = document.querySelector(".card-list__button");
const list = document.querySelector(".card-list__collection");

runEvents();

function runEvents() {
  document.addEventListener("DOMContentLoaded", formStorageToItems);
  formNewTask.addEventListener("submit", createTask);
  list.addEventListener("click", removeTask);
  clearBtn.addEventListener("click", removeAll);
  inputFilter.addEventListener("keyup", filterText);
}

function formStorageToItems() {
  //again create the array
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  // items from array to create li again

  tasks.forEach(function (task) {
    {
      const li = document.createElement("li");
      li.classList.add("collection-item", "left-align");
      li.setAttribute("style", "margin: 0 2rem");
      li.innerText = task;
      const section = document.createElement("div");
      section.classList.add("section");
      const link = document.createElement("a");
      link.classList.add("secondary-content", "delete", "lime-text");
      link.innerHTML = '<i class="material-icons">delete</i>';
      li.appendChild(link);
      section.appendChild(li);
      list.appendChild(section);
    }
  });
}

function createTask(e) {
  if (inputCreate.value === "") {
    alert("fill the input field");
  }
  const li = document.createElement("li");
  li.classList.add("collection-item", "left-align");
  li.setAttribute("style", "margin: 0 2rem");
  li.innerText = inputCreate.value;
  const section = document.createElement("div");
  section.classList.add("section");
  const link = document.createElement("a");
  link.classList.add("secondary-content", "delete", "lime-text");
  link.innerHTML = '<i class="material-icons">delete</i>';
  li.appendChild(link);
  section.appendChild(li);
  list.appendChild(section);

  pushTaskToLocalStorage(inputCreate.value);

  inputCreate.value = "";
  e.preventDefault();
}

function pushTaskToLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete")) {
    if (confirm("Are you sure?")) {
      e.target.parentElement.parentElement.parentElement.remove();
      removeItemFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

function removeItemFromLocalStorage(itemToRemove) {
  console.log(itemToRemove.firstChild.textContent);
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function (task, index) {
    if (itemToRemove.firstChild.textContent === task) {
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function removeAll() {
  if (list.firstChild) {
    if (confirm("Are you sure? You are going to delete all tasks")) {
      list.innerHTML = "";
      removeLocalStorage();
    }
  }
}
function removeLocalStorage() {
  localStorage.clear();
}

function filterText() {
  const text = inputFilter.value.toLowerCase();

  const listItems = document.querySelectorAll(".collection-item");

  listItems.forEach(function (listItem) {
    console.log(listItem);
    if (listItem.innerText.toLowerCase().indexOf(text) !== -1) {
      listItem.style.display = "block";
    } else {
      listItem.style.display = "none";
    }
  });
  console.log(text);
}
