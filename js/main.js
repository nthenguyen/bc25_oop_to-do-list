import Services from "./services.js";

const services = new Services();
const getEle = (id) => document.getElementById(id);

const getTodoList = () => {
  services
    .callApi("todo", "GET", null)
    .then((res) => {
      renderHTML(res.data);
    })
    .catch((err) => console.log(err));
};

getTodoList();

const renderHTML = (data) => {
  const todo = data.map((todo) => {
    return `<li>
        <div class="todo-title">${todo.title}</div>
        <div class="todo-btn">
            <a class="todo-check" onclick="completeTodo(${todo.id})"> <i class="fa-solid fa-check"></i> </a>
            <a class="todo-edit" onclick="editTodo(${todo.id})"> <i class="fa-solid fa-edit"></i> </a>
            <a class="todo-delete" onclick="deleteTodo(${todo.id})"> <i class="fa-solid fa-trash"></i> </a>
        </div>
    </li>`;
  });
  getEle("todo").innerHTML = todo.join("");

  const completedTodo = data.filter((todo) => todo.complete === true);
  const completed = completedTodo.map((todo) => {
    return `<li>
            <div class="todo-title">${todo.title}</div>
            <div class="todo-btn">
                <a class="todo-delete" onclick="deleteTodo(${todo.id})"> <i class="fa-solid fa-trash"></i> </a>
            </div>
        </li>`;
  });
  getEle("completed").innerHTML = completed.join("");
};

//add complete todo
const completeTodo = (id) => {
  services
    .callApi(`todo/${id}`, "PUT", { complete: true })
    .then((res) => {
      getTodoList();
      console.log(res.data.id);
    })
    .catch((err) => console.log(err));
};
window.completeTodo = completeTodo;

//a-z
getEle("two").addEventListener("click", () => {
  services
    .callApi("todo", "GET", null)
    .then((res) => {
      const sort = res.data.sort((a, b) => {
        if (a.title < b.title) return -1;
        if (a.title > b.title) return 1;
        return 0;
      });
      renderHTML(sort);
    })
    .catch((err) => console.log(err));
});

//z-a
getEle("three").addEventListener("click", () => {
  services
    .callApi("todo", "GET", null)
    .then((res) => {
      const sort = res.data.sort((a, b) => {
        if (a.title > b.title) return -1;
        if (a.title < b.title) return 1;
        return 0;
      });
      renderHTML(sort);
    })
    .catch((err) => console.log(err));
});

//delete todo
const deleteTodo = (id) => {
  services
    .callApi(`todo/${id}`, "DELETE", null)
    .then(() => {
      getTodoList();
    })
    .catch((err) => console.log(err));
};
window.deleteTodo = deleteTodo;

//add todo
getEle("addItem").addEventListener("click", () => {
  const newTask = getEle("newTask").value;
  services
    .callApi("todo", "POST", { title: newTask })
    .then(() => {
      getTodoList();
      getEle("newTask").value = "";
    })
    .catch((err) => console.log(err));
});

//edit todo
const editTodo = (id) => {
  services.callApi(`todo/${id}`, "PUT", null).then((res) => {
    getEle("newTask").value = res.data.title;
    getEle("addItem").style.display = "none";
    getEle("updateItem").style.display = "block";
  });
  getEle("updateItem").addEventListener("click", () => {
    updateTodo(id);
  });
};
window.editTodo = editTodo;

//update todo
const updateTodo = (id) => {
  const newTask = getEle("newTask").value;
  services
    .callApi(`todo/${id}`, "PUT", { title: newTask })
    .then(() => {
      getTodoList();
      getEle("updateItem").style.display = "none";
      getEle("addItem").style.display = "block";
    })
    .catch((err) => console.log(err));
};
window.updateTodo = updateTodo;
