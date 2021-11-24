// VARIABLES
let screen = document.querySelector("#screen");

//Value screen
let previous = 0;
let screenDisplay = "";
let operation = null;

/**
 * Function that does the mathematical calculation
 * @param {number} number1
 * @param {number} number2 
 * @param {string} operation 
 * @returns number
 */
 function calculate(number1, number2, operation){
    number1 = parseFloat(number1);
    number2 = parseFloat(number2);
    if (operation === "+"){
        return number1 + number2;
    } 

    if (operation === "-"){
        return number1 - number2;
    } 

    if (operation === "*"){
        return number1 * number2;
    }
    
    if (operation === "/"){
        if(number2 == 0 || number2 == 0){
            alert("Division par 0 impossible");
        }
        return number1 / number2;
    }
}

window.onload = () => {
    let keys = document.querySelectorAll("span");

    for (let key of keys){
        //Event click on button key
        key.addEventListener("click", manageKeys);
    }

    //Event click on keyboard key
    document.addEventListener("keydown", manageKeys);
}

/**
 * This function manages the events on the keys
 */
function manageKeys(event){
    let key;
    //Keyboard key lists
    const keyLists = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "+", "-", "*", "/", ".", "Enter", "Escape"];

    //Check the event 'Keydown'"
    if(event.type === "keydown"){
        //Compare the key pressed with the 'keyLists'
        if(keyLists.includes(event.key)){
            event.preventDefault();
            //Stores the chosen key in the variable
            key = event.key;
        }
    }else{
        key = this.innerText;
    }

    //Check if it's a 'number' or a '.'
    if(parseFloat(key) >= 0 || key === "."){
        //Updates the screen value
        screenDisplay = (screenDisplay === "") ? key.toString() : screenDisplay + key.toString();
        screen.innerText = screenDisplay;
    }else{
        switch(key){
            case "C":
            case "Escape":
                previous = 0;
                screenDisplay = "";
                operation = null
                screen.innerText = 0;
                break;
            // Calculs
            case "+":
            case "-":
            case "*":
            case "/":
                //We calculate the result value of the previous step
                previous = (previous === 0) ? parseFloat(screenDisplay) : calculate(previous, parseFloat(screenDisplay), operation);
                //Update screen
                screen.innerText = previous;
                //Stock operation
                operation = key;
                //Reset the variable
                screenDisplay = "";
                break;
            case "=":
            case "Enter":
                previous = (previous === 0) ? parseFloat(screenDisplay) : calculate(previous, parseFloat(screenDisplay), operation);
                // On met à jour l'écran
                screen.innerText = previous;
                screenDisplay = previous;
                //Reset the variable
                previous = 0;
                break;
            default:
                break;
        }
    }
}