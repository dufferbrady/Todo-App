//Create a function that will add user input to list of todo items
let addItem = () => {
    //Store the html ul tage in a variable
    let container = document.getElementById("list-container");
    //Create a list item for each input
    let li = document.createElement('li');
    //Store the input value from user in a variable
    let item = document.getElementById("list-value").value;
    //Give that list item a class tage for style purposes
    li.setAttribute('class', 'list-item');
    //Assign the user input value to the created li tag
    li.textContent = item;
    //Append the list item to the ul tag and return the value
    return container.appendChild(li);
}