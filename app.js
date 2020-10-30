const todoinput=document.querySelector('.todo-input');
const todobutton=document.querySelector('.todo-button');
const todolist=document.querySelector('.todo-list');

todobutton.addEventListener('click',addtodo);
todolist.addEventListener('click',deleteCheck);

function addtodo(event)
{
    event.preventDefault();
    const tododiv=document.createElement("div");
    tododiv.classList.add("todo");

    const newtodo=document.createElement("li");
    newtodo.innerText=todoinput.value;
    newtodo.classList.add('todo-item');
    tododiv.appendChild(newtodo);

    const completed=document.createElement("button");
    completed.innerHTML='<i class="fa fa-check"></i>';
    completed.classList.add("complete-btn");
    tododiv.appendChild(completed);

    const trash=document.createElement("button");
    trash.innerHTML='<i class="fa fa-trash"></i>';
    trash.classList.add("trash-btn");
    tododiv.appendChild(trash);

    todolist.appendChild(tododiv);

    todoinput.value=" ";
}
function deleteCheck(e)
{
    const item=e.target;
    alert("CONGRATS!!! YOU COMPLETED A TASK");
    if(item.classList[0] === "trash-btn")
    {
        const todo=item.parentElement;
        todo.classList.add("fall");
        todo.addEventListener('transitioned',function()
        {
            
            todo.remove();
        });
        
    }

    if(item.classList[0] === "complete-btn")
    {
        const todo=item.parentElement;
        todo.classList.toggle('completed');
    }
}