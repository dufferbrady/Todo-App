//Create a query selector function similar to jQuery 
const $ = (selector) => {
    return document.querySelector(selector);
}

const item = $('#dynamic-list').getElementsByTagName('li');


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