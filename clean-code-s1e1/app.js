//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.


// Event handling, user interaction is what starts the code execution.

//var taskInput=document.getElementById("new-task");//Add a new task.
var taskInput=document.querySelector('.wrapper-add__input');
//var addButton=document.getElementsByTagName("button")[0];//first button
var addButton=document.querySelectorAll('.btn')[0];
//var incompleteTaskHolder=document.getElementById("incomplete-tasks");//ul of #incompleteTasks
var incompleteTaskHolder=document.querySelectorAll('.todo')[0];
//var completedTasksHolder=document.getElementById("completed-tasks");//completed-tasks
var completedTasksHolder=document.querySelectorAll('.todo')[1];

//New task list item
var createNewTaskElement=function(taskString){
    /**
     *      <li class="todo__item">
        <input class="todo__item-check" type="checkbox">
        <label class="todo__item-text">Pay Bills</label>
        <input class="todo__item-input todo__item-input_none" type="text">
        <button class="btn">Edit</button>
        <button class="btn">
          <img class="btn__img" src="./remove.svg" alt="Img delete">
        </button>
      </li>
     */

    var listItem=document.createElement("li");
    listItem.classList.add("todo__item")

    var checkBox=document.createElement("input");//checkbx
    checkBox.classList.add("todo__item-check");
    checkBox.type="checkbox";

    var label=document.createElement("label");//label
    label.classList.add("todo__item-text");
    label.innerText=taskString;

    //input (text)
    var editInput=document.createElement("input");//text
    editInput.classList.add("todo__item-input",  "todo__item-input_none");
    editInput.type="text";

    //button.edit
    var editButton=document.createElement("button");//edit button
    editButton.classList.add("btn");
    editButton.innerText="Edit";

    //button.delete
    var deleteButton=document.createElement("button");//delete button
    deleteButton.classList.add("btn");

    var deleteButtonImg=document.createElement("img");//delete button image
    deleteButtonImg.classList.add("btn__img");
    deleteButtonImg.src='./remove.svg';
    deleteButton.appendChild(deleteButtonImg);

    //and appending.
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    return listItem;
}

var addTask=function(){
    console.log("Add Task...");
    //Create a new list item with the text from the #new-task:
    if (!taskInput.value) return;

    var listItem=createNewTaskElement(taskInput.value); //создаём новую задачу

    //Append listItem to incompleteTaskHolder
    incompleteTaskHolder.appendChild(listItem);
    
    bindTaskEvents(listItem, taskCompleted); /// taskCompleted - ?

    taskInput.value="";

}

//Edit an existing task.

var editTask=function(){
    console.log("Edit Task...");
    console.log("Change 'edit' to 'save'");


    console.log(this);

    var listItem=this.parentNode;

    var label=listItem.querySelector(".todo__item-text");
    var editInput=listItem.querySelector(".todo__item-input");
    var editBtn=listItem.querySelector(".btn");

    if (editInput.classList.contains("todo__item-input_none")) {
        editInput.value=label.innerText;
        editBtn.innerText="Save";
    } else {
        label.innerText=editInput.value;
        editBtn.innerText="Edit";
    }

    editInput.classList.toggle("todo__item-input_none");


    //var editInput=listItem.querySelector('input[type=text]');
    //var label=listItem.querySelector("label");
    //var editBtn=listItem.querySelector(".edit");
   // var containsClass=listItem.classList.contains("edit-mode");
    //If class of the parent is .editmode
   /* if(containsClass){

        //switch to .editmode
        //label becomes the inputs value.
        label.innerText=editInput.value;
        editBtn.innerText="Edit";
    }else{
        editInput.value=label.innerText;
        editBtn.innerText="Save";
    }*/

    //toggle .editmode on the parent.
    //listItem.classList.toggle("edit-mode");
};


//Delete task.
var deleteTask=function(){
    console.log("Delete Task...");

    var listItem=this.parentNode.parentNode;
    var ul=listItem.parentNode;
    //Remove the parent list item from the ul.
    ul.removeChild(listItem);

}


//Mark task completed
var taskCompleted=function(){
    console.log("Complete Task...");

    //Append the task list item to the #completed-tasks
    var listItem=this.parentNode;

    listItem.querySelector('.todo__item-text').classList.toggle('todo__item-text_complit');

    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);

}


var taskIncomplete=function(){
    console.log("Incomplete Task...");
//Mark task as incomplete.
    //When the checkbox is unchecked
    //Append the task list item to the #incompleteTasks.
    var listItem=this.parentNode;

    listItem.querySelector('.todo__item-text').classList.toggle('todo__item-text_complit');

    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem,taskCompleted);
}



var ajaxRequest=function(){
    console.log("AJAX Request");
}

//The glue to hold it all together.


//Set the click handler to the addTask function.
addButton.onclick=addTask;
addButton.addEventListener("click",addTask);
addButton.addEventListener("click",ajaxRequest);


var bindTaskEvents=function(taskListItem,checkBoxEventHandler){
    console.log("bind list item events");
//select ListItems children

    var checkBox=taskListItem.querySelector("input[type=checkbox]");
    var editButton=taskListItem.querySelector(".btn");
    var deleteButton=taskListItem.querySelector(".btn__img");


    //Bind editTask to edit button.
    editButton.onclick=editTask;
    //Bind deleteTask to delete button.
    deleteButton.onclick=deleteTask;
    //Bind taskCompleted to checkBoxEventHandler.
    checkBox.onchange=checkBoxEventHandler;
}

//cycle over incompleteTaskHolder ul list items
//for each list item
for (var i=0; i<incompleteTaskHolder.children.length;i++){

    //bind events to list items chldren(tasksCompleted)
    bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
}




//cycle over completedTasksHolder ul list items
for (var i=0; i<completedTasksHolder.children.length;i++){
    //bind events to list items chldren(tasksIncompleted)
    bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}




// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.