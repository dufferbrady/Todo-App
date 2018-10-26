//Store the active button in a variable
const activeBtn = $('#active-button')

//Store all button in variable.
const allBtn = $('#all-button')

//Store complete button in variable.
const completeBtn = $('#complete-button');

//Store input field in a variable
const todoInput = document.getElementById('list-value');

//Store ul tag in a variable
const dynamicList = document.getElementById('dynamic-list');

//Store clear completed button in a variable
const clearBtn = $('#clear-button');

//Create a function that will give the user a number of items that still have to be done.
const itemTracker = () => {
    let button = document.getElementById('itemTracker');
    let listLength = document.getElementById('dynamic-list').getElementsByClassName('todo-item').length;
    if(listLength !== 1) {
        button.textContent = (listLength + " Items Left");
    } else {
        button.textContent = (listLength + " Item Left");
    }
}

//Function to strike-through the todo item text and update counter
const strikeText = function(text) {
    text.classList.toggle('strike-label');
    text.parentNode.parentNode.classList.toggle('available-item');
    text.parentNode.firstChild.childNodes[1].classList.toggle('checked')
    let button = document.getElementById('itemTracker');
    let listLength = document.getElementById('dynamic-list').getElementsByClassName('available-item').length;
    if(listLength !== 1) {
        button.textContent = (listLength + " Items Left");
    } else {
        button.textContent = (listLength + " Item Left");
    }
};

//A function to remove the todo item when user clicks remove icon
const removeTodo = function(root, removeIcon) {
    removeIcon.parentNode.parentNode.removeChild(removeIcon.parentNode);    //When remove icon is clicked remove the todo
    if(root.getElementsByTagName('li').length === 0) {                      //If ul list is empty remove buttons
        let buttons = document.getElementById('targetBtn')
        buttons.classList.remove('show-item');
        buttons.classList.add('removed-item');
    }
};

//a function to delete the todo when the user clicks the remove icon
const deleteItem = (container, listItem) => {
    const removeIcon = document.createElement('i');                     //Create an icon in the li for the clear function
    removeIcon.setAttribute('class', 'fas fa-times')
    listItem.appendChild(removeIcon);
    removeIcon.addEventListener('click', function() {                   //Remove li from list on click of icon
        removeTodo(container, this);
    });
    removeIcon.addEventListener('click', function() {                   // Update item tracker when item is removed
        itemTracker();
    });
};

//construct the icons to show when a todo has/hasn't been completed
const iconConstructor = (leftTab) => {
    const checkboxIconsContainer = document.createElement('div');            //Create a div that will hold the two checkbox icons
    const circleIcon = document.createElement('i');                          //Create a circle icon 
    const checkIcon = document.createElement('i');                           //create a tick icon stacked on the circle icon that will only show when a todo has been strike-through

    checkboxIconsContainer.setAttribute('class', 'fa-stack');
    circleIcon.setAttribute('class', 'far fa-circle fa-stack-1x');
    checkIcon.setAttribute('class', 'fas fa-check fa-stack-1x');

    leftTab.appendChild(checkboxIconsContainer);                           //Append the icons container to its parent
    checkboxIconsContainer.appendChild(circleIcon);                        //Append the circle icon to the icons container
    checkboxIconsContainer.appendChild(checkIcon);                         //Append the tick icon to the icons container
}

//create the text box for the todo text
const textBox = (listItem, input) => {
    const leftTab = document.createElement('div');                      //create a div to store the text and check icons 
    const text = document.createElement('span');                        //create a span  in the first div that will hold the users text
    iconConstructor(leftTab);                                           //construct the icons to show when a todo has been completed
    leftTab.setAttribute('class', 'liLeftTab')
    text.setAttribute('class', 'todo-label');
    text.textContent = input;
    text.addEventListener('click', function() {                         //Add strikethough to the todo text when clicked
        strikeText(this);
    });
    listItem.appendChild(leftTab);                                      //append the left tab container to the todo container
    leftTab.appendChild(text);                                          //append the text to the lef tab container
};

//create the todo item from users input
const createTodo = container => {
    const li = document.createElement('li');                            //Create an li to hold all todo item info
    const text = document.getElementById("list-value").value;           //Store the input value from user in a variable
    let itemId = text + 'Id';                                           //Give each todo a unique id based on the users input
    li.setAttribute('class', 'todo-item available-item');
    li.setAttribute('id', itemId);
    container.appendChild(li);                                          //Append the list item to the container
    textBox(li, text);                                                  //create the block to store the users todo text
    deleteItem(container, li);
};

//Create a container for the users todo item
const addItem = () => {
    const container = document.getElementById("dynamic-list");          //Create a container for all todo items
    createTodo(container);                                              //Add todo to the container
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
    let allElements = listElements.filter(el => !el.classList.contains('show-item'));
    allElements.map(item => {
        item.classList.add('show-item');
        item.classList.remove('removed-item');
    });
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
}

//Create a clear completed function
const clearCompleted = () => {
    let listElements = Array.from(dynamicList.querySelectorAll('.todo-label'));
    let liTags = Array.from(dynamicList.querySelectorAll('li'));
    let container = document.getElementById("dynamic-list");
    for (let i=0; i<liTags.length; i++) {
        let el = listElements[i];
        let tag = liTags[i];
        if(el.classList.contains('strike-label')) {
            container.removeChild(tag);
        }
    }
    //If ul list is empty rempve buttons
    let itemsLength = document.getElementById("dynamic-list").getElementsByTagName('li').length;
    if(itemsLength === 0) {
        let buttons = document.getElementById('targetBtn')
        buttons.classList.remove('show-item');
        buttons.classList.add('removed-item');
    }
}

//Add event listener to active button to run activeFunction
activeBtn.on('click', activeFunction);

//Add event listener to all button to run allFunction
allBtn.on('click', allFunction);

//Add event listener to complete button to run allFunction
completeBtn.on('click', completeFunction);

//Add event listener to clear completed button to run function when pressed
clearBtn.on('click', clearCompleted);

//Add event listener to input field to fire on enter key
todoInput.addEventListener('keydown', e => {
    let key = e.which;
    if(key === 13) {
        e.preventDefault()
        console.log("Pressed");
        addItem();
        itemTracker();
        showBtns();
        todoInput.value = "";
    }
});