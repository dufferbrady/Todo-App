//Store the active button in a variable
let activeBtn = document.querySelector('#active-button')

//Store all button in variable.
let allBtn = document.querySelector('#all-button')

//Store complete button in variable.
let completeBtn = document.querySelector('#complete-button');

//Store add button in variable.
let addBtn = document.querySelector('#add-btn');

//Store input field in a variable
let todoInput = document.getElementById('list-value');

//Create a query selector function similar to jQuery 
const $ = (selector) => {
    return document.querySelector(selector);
}

//Create a function that will add user input to list of todo items
const addItem = () => {
    let container = document.getElementById("dynamic-list");        //Store the html ul tage in a variable
    let li = document.createElement('li');                          //Create a list item for each input
    let item = document.getElementById("list-value").value;         //Store the input value from user in a variable
    li.setAttribute('class', 'list-item');                          //Give that list item a class tage for style purposes
    li.textContent = item;                                          //Assign the user input value to the created li tag
    li.addEventListener('click', () => {                            // Create event listener function to toggle strikethrough class
        li.classList.toggle('strike-item');
    });
    return container.appendChild(li);                               //Append the list item to the ul tag and return the value
}

//Create a function that will show all list items
const allFunction = () => {
    console.log('clicked');
    let listElements = Array.from(document.querySelectorAll('.list-item'));
    for (let i=0; i<listElements.length; i++) {
        let el = listElements[i];
        el.classList.add('show-item');
        el.classList.remove('removed-item');
    }
    console.log(listElements);
}

//Create a function that will filter out all completed todo items
const activeFunction = () => {
    console.log('clicked');
    let listElements = Array.from(document.querySelectorAll('.list-item'));
    for (let i=0; i<listElements.length; i++) {
        let el = listElements[i];
        if (el.classList.contains('strike-item')) {
            el.classList.add('removed-item');
            el.classList.remove('show-item');
            console.log(listElements);
        } else if (!el.classList.contains('strike-item')) {
            el.classList.add('show-item');
            el.classList.remove('removed-item');
        }
    }
}

//Create a function that will filter out all active tasks
const completeFunction = () => {
    console.log('clicked');
    let listElements = Array.from(document.querySelectorAll('.list-item'));
    for (let i=0; i<listElements.length; i++) {
        let el = listElements[i];
        if (!el.classList.contains('strike-item')) {
            el.classList.remove('show-item');
            el.classList.add('removed-item');
            console.log(listElements);
        } else if (el.classList.contains('strike-item')) {
            el.classList.add('show-item');
            el.classList.remove('removed-item');
        }
    }
}

//Add event listener to active button to run activeFunction
activeBtn.addEventListener('click', activeFunction);

//Add event listener to all button to run allFunction
allBtn.addEventListener('click', allFunction);

//Add event listener to complete button to run allFunction
completeBtn.addEventListener('click', completeFunction);

//Add event listener to complete button to run allFunction
// addBtn.addEventListener('click', addItem);

//Add event listener to input field to fire on enter key
todoInput.addEventListener('keydown', function(e) {
    e.preventDefault();
    if(e.keyCode === 13) {
        addItem();
    }
})