//Store the active button in a variable
let activeBtn = document.querySelector('#active-button')

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

//Create a function that will filter out all completed todo items
const activeFunction = () => {
    let listElements = Array.from(document.querySelectorAll('.list-item'));
    for (let i=0; i<listElements.length; i++) {
        let el = listElements[i];
        if (el.classList.contains('strike-item')) {
            el.classList.toggle('removed-item');
        }
    }
}

//Add event listener to active button to run active function
activeBtn.addEventListener('click', activeFunction);

//Create a function that will filter out all active tasks