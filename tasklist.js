const formNewTask = document.querySelector(".form-create-task");
const inputCreate = document.querySelector(".form-create-task__input");
const inputFilter = document.querySelector(".form-filter__input");
const clearBtn = document.querySelector(".card-list__button");
const list = document.querySelector(".card-list__collection");

runEvents();

function runEvents() {
  formNewTask.addEventListener("submit", createTask);
  list.addEventListener("click", removeTask);
  clearBtn.addEventListener("click", removeAll);
  inputFilter.addEventListener("keyup", filterText);
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
  inputCreate.value = "";
  e.preventDefault();
}

function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete")) {
    if (confirm("Are you sure?")) {
      e.target.parentElement.parentElement.parentElement.remove();
    }
  }
}

function removeAll() {
  if (list.firstChild) {
    if (confirm("Are you sure? You are going to delete all tasks")) {
      list.innerHTML = "";
    }
  }
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
