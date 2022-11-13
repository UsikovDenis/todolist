const inp = document.getElementById("inp")
const addTodo = document.getElementById("addTodo")
const todolist = document.querySelector(".todolist")
const delTodo = document.getElementById("delTodo")
const selectlt = document.getElementById('selectLT')
let tasks;


!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem("tasks"));

delTodo.addEventListener("click",() => {
    tasks = [];
    updateLocalS ()
    fillHTMLlist()
})


const filterlist = () => {
    !localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem("tasks"));
    let activelist = tasks.length && tasks.filter (item => item.completed == true);
    let hidelist = tasks.length && tasks.filter (item => item.completed == false);
    const select = selectlt.options[selectlt.selectedIndex].text

if (select == 'В процессе') {
        tasks = [...activelist];
    } else if (select == 'Выполненые') {
        tasks = [...hidelist];
    } else {
        tasks = [...activelist,...hidelist];
    }
}
//////////////////////////////////////////////////////
function Task (taskli) {
    this.taskli = taskli;
    this.completed = true;
}



const updateLocalS = () => {
    localStorage.setItem("tasks",JSON.stringify(tasks))
}

const createList = (task, index) => {
    return `
    <div class="todo ${task.completed ? "" : "hide" } ">
        <div onclick="hide(${index})" class="taskli">${task.taskli}</div>
        <input  onclick="tododel(${index})" type="button" id="del"  size="2" value="x" >
    </div>
    `
}

const fillHTMLlist = () => {
    todolist.innerHTML = "";
    !localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem("tasks"));
    if (tasks.length > 0) {
        filterlist ();
        tasks.forEach((item, index) => {
            todolist.innerHTML += createList(item, index)
        })
    }
}
fillHTMLlist();


const hide = index => {
    !localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem("tasks"));
    let activelist = tasks.length && tasks.filter (item => item.completed == true);
    let hidelist = tasks.length && tasks.filter (item => item.completed == false);
    const select = selectlt.options[selectlt.selectedIndex].text

    if (select == 'В процессе') {
        tasks = [...activelist];
        tasks[index].completed = !tasks[index].completed
        tasks = [...activelist,...hidelist];
    } else if (select == 'Выполненые') {
        tasks = [...hidelist];
        tasks[index].completed = !tasks[index].completed
        tasks = [...activelist,...hidelist];
    } else {
        tasks = [...activelist,...hidelist];
        tasks[index].completed = !tasks[index].completed
    }
    updateLocalS();
    fillHTMLlist();
}

const tododel = index => {
    !localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem("tasks"));
    let activelist = tasks.length && tasks.filter (item => item.completed == true);
    let hidelist = tasks.length && tasks.filter (item => item.completed == false);
    const select = selectlt.options[selectlt.selectedIndex].text
    if (select == 'В процессе') {
        activelist.splice(index, 1)
        tasks = [...activelist,...hidelist];
    } else if (select == 'Выполненые') {
        hidelist.splice(index, 1)
        tasks = [...activelist,...hidelist];
    } else {
        tasks.splice(index, 1)
    }
    updateLocalS();
    fillHTMLlist();
}


selectlt.addEventListener('change', function() {
    fillHTMLlist();
})
addTodo.addEventListener("click",() => {
    dobab ();
})
inp.addEventListener('keydown', function(e) {
    if (e.keyCode === 13) {
        dobab ();
    }
});
function dobab () {
    if (inp.value !== "") {
        !localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem("tasks"));
        tasks.push(new Task(inp.value));
        updateLocalS ()
        fillHTMLlist()
        inp.value = "";
}}
