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

//Create a function that will give the user a value of item that still have to be done.
const itemTracker = () => {
    let button = document.getElementById('itemTracker');
    let listLength = document.getElementById('dynamic-list').getElementsByClassName('todo-item').length;

    if(listLength !== 1) {
        button.textContent = (listLength + " Items Left");
    } else {
        button.textContent = (listLength + " Item Left");
    }
}

//Create a function that will add user input to list of todo items
const addItem = () => {
    //Create a container for all todo items
    const container = document.getElementById("dynamic-list");  

    //Create an li to hold all todo item info
    const li = document.createElement('li');
    const item = document.getElementById("list-value").value;         //Store the input value from user in a variable
    let itemId = item + 'Id';
    li.setAttribute('class', 'todo-item available-item');
    li.setAttribute('id', itemId);
    //Create a div in the li to hold the checkbox icons and the text
    const div1 = document.createElement('div');
    div1.setAttribute('class', 'liLeftTab')

    //Create an icon in the li for the clear function
    const icon1 = document.createElement('i');
    icon1.setAttribute('class', 'fas fa-times')

    //Create another div in the first div that will hold the two checkbox icons
    const div2 = document.createElement('div');
    div2.setAttribute('class', 'fa-stack');

    //In the second div create two icons that will show the checkboxs when user clicks each text
    const icon2 = document.createElement('i');
    const icon3 = document.createElement('i');
    icon2.setAttribute('class', 'far fa-circle fa-stack-1x');
    icon3.setAttribute('class', 'fas fa-check fa-stack-1x');

    //create a span  in the first div that will hold the users text
    const text = document.createElement('span');
    text.setAttribute('class', 'todo-label');
    text.textContent = item;

    //Add strikethough label on click
    text.addEventListener('click', function() {
        li.classList.toggle('available-item');
        icon3.classList.toggle('checked')
        text.classList.toggle('strike-label');
        let button = document.getElementById('itemTracker');
        let listLength = document.getElementById('dynamic-list').getElementsByClassName('available-item').length;
        if(listLength !== 1) {
            button.textContent = (listLength + " Items Left");
        } else {
            button.textContent = (listLength + " Item Left");
        }
    });
    //Remove li from list on click of icon
    icon1.addEventListener('click', function() {
        let removed = document.getElementById(itemId);
        container.removeChild(removed);
        //If ul list is empty rempve buttons
        if(container.getElementsByTagName('li').length === 0) {
            let buttons = document.getElementById('targetBtn')
            buttons.classList.remove('show-item');
            buttons.classList.add('removed-item');
        }
    });
    //Update item tracker when item is removed
    icon1.addEventListener('click', function() {
        let button = document.getElementById('itemTracker');
        let listLength = document.getElementById('dynamic-list').getElementsByClassName('todo-item').length;

        button.textContent = (listLength + " Items Left");
    });
    container.appendChild(li);
    li.appendChild(div1);
    li.appendChild(icon1);
    div1.appendChild(div2);                               //Append the list item to the ul tag and return the value
    div2.appendChild(icon2);
    div2.appendChild(icon3);
    div1.appendChild(text);
}

//Create function to show buttons once todo item has been added
const showBtns = (e) => {
    let btn = document.getElementById("targetBtn");
        btn.classList.remove('removed-item');
        btn.classList.add('buttons');
}

//Create a function that will show all list items
const allFunction = () => {
    const listElements = Array.from(document.getElementsByTagName('li'));
    for (let i=0; i<listElements.length; i++) {
        let el = listElements[i];
        if(!el.classList.contains('show-item'))
        el.classList.add('show-item');
        el.classList.remove('removed-item');
    }
    console.log(listElements);
}

//Create a function that will filter out all completed todo items
const activeFunction = () => {
    const listElements = Array.from(document.querySelectorAll('.todo-label'));
    const liTags = Array.from(document.getElementsByTagName('li'));
    for (let i=0; i<listElements.length; i++) {
        let el = listElements[i];
        let tag = liTags[i];
        if (el.classList.contains('strike-label')) {
            tag.classList.add('removed-item');
            tag.classList.remove('show-item');
        } else if (!el.classList.contains('strike-label')) {
            tag.classList.add('show-item');
            tag.classList.remove('removed-item');
        }
    }
    console.log(listElements);
    console.log(liTags);
}

//Create a function that will filter out all active tasks
const completeFunction = () => {
    const listElements = Array.from(document.querySelectorAll('.todo-label'));
    const liTags = Array.from(document.getElementsByTagName('li'));
    for (let i=0; i<listElements.length; i++) {
        let el = listElements[i];
        let tag = liTags[i]
        if (!el.classList.contains('strike-label')) {
            tag.classList.remove('show-item');
            tag.classList.add('removed-item');
        } else if (el.classList.contains('strike-label')) {
            tag.classList.add('show-item');
            tag.classList.remove('removed-item');
        }
    }
    console.log(listElements);
    console.log(liTags);
}

//Create a clear completed function
const clearCompleted = () => {
    let listElements = Array.from(dynamicList.querySelectorAll('.todo-label'));
    let liTags = Array.from(dynamicList.querySelectorAll('li'));
    let container = document.getElementById("dynamic-list");
    let itemsLength = document.getElementById("dynamic-list").getElementsByClassName('todo-item').length;
    for (let i=0; i<liTags.length; i++) {
        let el = listElements[i];
        let tag = liTags[i];
        if(el.classList.contains('strike-label')) {
            container.removeChild(tag);
        }
    }
    //If ul list is empty rempve buttons
    if(itemsLength === 0) {
        let buttons = document.getElementById('targetBtn')
        buttons.classList.remove('show-item');
        buttons.classList.add('removed-item');
    }
    console.log(listElements);
    console.log(liTags);
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
        addItem();
        itemTracker();
        showBtns();
        todoInput.value = "";
        e.preventDefault();
    }
});