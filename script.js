// It is used to initialize an app from this location link
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://cart-f71b4-default-rtdb.firebaseio.com/"
}

// This function will connect our project with database link
// Eastablish connection between firebase-database
// And get database
const app = initializeApp(appSettings)
const database = getDatabase(app);

//Created a refrence in which we will add all the movies
const shoppingListinDB = ref(database, "ShoppingList")

// Connect HTML & CSS
const inputField = document.getElementById("input");
const button = document.getElementById("addButton");
const shoppingList = document.getElementById("shopping-list");

// Function
button.addEventListener("click", function () {
    let itemName = inputField.value;
    inputFieldClear();
    //If User doesnot Insert any Values
    if (itemName != "")
        push(shoppingListinDB, itemName);
    // appendInnerHTML(itemName);
})

//Append Data from database

onValue(shoppingListinDB, function (snapshot) {
    if (snapshot.exists()) {
        let listArry = Object.entries(snapshot.val());
        //Clear InnerHtml to avoid Duplication
        clearInnerHTML();

        for (let i = 0; i < listArry.length; i++) {
            let currentEntry = listArry[i];
            let currentID = currentEntry[0];
            let currentValue = currentEntry[1];
            appendInnerHTML(currentEntry);
        }
    } else {
        shoppingList.innerHTML = `<button id="noitem">No Item Is There!!</button>`;
    }
});

//Functions

//Clear Inner HTML
function clearInnerHTML() {
    shoppingList.innerHTML = "";
}

//Clear InputField
function inputFieldClear() {
    inputField.value = "";
}

//Append InnerHTML
function appendInnerHTML(entry) {
    //shoppingList.innerHTML += `<li>${itemName}</li>`

    //Extracting the Data
    let itemID = entry[0]
    let itemvalue = entry[1]

    //Creating Li
    let ElementLi = document.createElement("li");
    ElementLi.textContent = itemvalue;

    //Removing Logic
    ElementLi.addEventListener("click", function () {
        console.log(itemID);
        let position = ref(database, `ShoppingList/${itemID}`);
        remove(position);
    });

    //Appending the Values to It
    shoppingList.append(ElementLi);
}