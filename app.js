//Store the active button in a variable
const activeBtn = document.querySelector('#active-button')

//Store all button in variable.
const allBtn = document.querySelector('#all-button')

//Store complete button in variable.
const completeBtn = document.querySelector('#complete-button');

//Store input field in a variable
const todoInput = document.getElementById('list-value');

//Store ul tag in a variable
const dynamicList = document.querySelector('#dynamic-list');

//Store clear completed button in a variable
const clearBtn = document.getElementById('clear-button');

//Todo list length
// const todoLength = document.getElementById('dynamic-list');

//Create a query selector function similar to jQuery 
// const $ = (selector) => {
//     return document.querySelector(selector);
// }

//Create a clear completed function
const clearCompleted = () => {
    let labels = Array.from(dynamicList.querySelectorAll('label'));
    let items = Array.from(dynamicList.querySelectorAll('li'));
    for (let i=0; i<items.length; i++) {
        let label = labels[i];
        let item = items[i];
        if(label.classList.contains('strike-item')) {
            item.classList.add('delete-item');
        }
    }
}

//Create a strike-through function
const strikethrough = (e) => e.path[1].children[1].classList.toggle('strike-item');

//Create a function to remove todo item 
const removeItem = (e) => e.path[1].classList.add('delete-item');

//Create a function that will create the todo item tracker
const itemTracker = (e) => {
    e = document.createElement('div');
}
//Create a function that will add user input to list of todo items
const addItem = () => {
    const container = document.getElementById("dynamic-list");        //Store the html ul tage in a variable
    const li = document.createElement('li');
    const checkbox = document.createElement('input');                          //Create a list item for each input
    const label = document.createElement('label');
    const item = document.getElementById("list-value").value;         //Store the input value from user in a variable
    const icon = document.createElement('i');
    const div = document.createElement('div');

    icon.setAttribute('class', 'fas fa-times')
    li.setAttribute('class', 'todo-item')
    checkbox.setAttribute('type', 'checkbox');                          //Give that list item a class tage for style purposes
    checkbox.setAttribute('id', item);
    label.setAttribute('for', item)
    label.setAttribute('class', 'todo-label')
    label.textContent = item;                                          //Assign the user input value to the created li tag
    label.addEventListener('click', strikethrough);
    icon.addEventListener('click', removeItem);
    container.appendChild(li);
    li.appendChild(div);
    li.appendChild(icon);
    div.appendChild(checkbox);                               //Append the list item to the ul tag and return the value
    div.appendChild(label);
}

//Create function to show buttons once todo item has been added
const showBtns = (e) => {
    let btn = document.getElementById("targetBtn");
    if(btn.classList.contains('removed-item')) {
        btn.classList.remove('removed-item');
        btn.classList.add('buttons');
    }
}

//Create a function that will show all list items
const allFunction = () => {
    const listElements = Array.from(document.querySelectorAll('.todo-item'));
    for (let i=0; i<listElements.length; i++) {
        let el = listElements[i];
        console.log(el.classList);
        el.classList.add('show-item');
        el.classList.remove('removed-item');
    }
}

//Create a function that will filter out all completed todo items
const activeFunction = () => {
    console.log('clicked');
    const listElements = Array.from(document.querySelectorAll('.todo-label'));
    const liTags = Array.from(document.querySelectorAll('.todo-item'));
    console.log(liTags, listElements);
    for (let i=0; i<listElements.length; i++) {
        let el = listElements[i];
        if (el.classList.contains('strike-item')) {
            liTags[i].classList.add('removed-item');
            liTags[i].classList.remove('show-item');
            console.log(listElements);
        } else if (!el.classList.contains('strike-item')) {
            liTags[i].classList.add('show-item');
            liTags[i].classList.remove('removed-item');
        }
    }
}

//Create a function that will filter out all active tasks
const completeFunction = () => {
    console.log('clicked');
    const listElements = Array.from(document.querySelectorAll('.todo-label'));
    const liTags = Array.from(document.querySelectorAll('.todo-item'))
    for (let i=0; i<listElements.length; i++) {
        let el = listElements[i];
        if (!el.classList.contains('strike-item')) {
            liTags[i].classList.remove('show-item');
            liTags[i].classList.add('removed-item');
            console.log(listElements);
        } else if (el.classList.contains('strike-item')) {
            liTags[i].classList.add('show-item');
            liTags[i].classList.remove('removed-item');
        }
    }
}

//Add event listener to active button to run activeFunction
activeBtn.addEventListener('click', activeFunction);

//Add event listener to all button to run allFunction
allBtn.addEventListener('click', allFunction);

//Add event listener to complete button to run allFunction
completeBtn.addEventListener('click', completeFunction);

//Add event listener to clear completed button to run function when pressed
clearBtn.addEventListener('click', clearCompleted);

//Add event listener to input field to fire on enter key
todoInput.addEventListener('keydown', function(e) {
    if(e.keyCode === 13) {
        console.log("Pressed")
        addItem();
        showBtns();
        todoInput.value = "";
        e.preventDefault();
    }
});