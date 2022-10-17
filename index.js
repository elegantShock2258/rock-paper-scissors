let randomNumber = Math.floor(100 * Math.random()) //any power of 10 is fine
let computerSelection = -1;
let options = ["Rock 🪨", "Paper 📝", "Scissors ✂️"]
let textarea = document.getElementById('selection')
let statusElement = document.getElementById("status")
let isDrawer = false;
let isMouseIn = false;
const typingThreshold = 10000


let typingTimer = setTimeout(removeSelectionDrawer, typingThreshold);
// update the status bar during startup
// update status bar when left idle
let statuses = ["Dont Be shy!!!", "Oh come on, you didn't start this to stare at the screen did you?"]


let parent = document.getElementById("selectionContainer");
let dropdownContainer = document.createElement("div");

function addSelectionDrawer() {
    parent = document.getElementById("selectionContainer");
    dropdownContainer = document.createElement("div");
    dropdownContainer.classList.add("dropdownContainer");
    dropdownContainer.id = "dropdownContainer";

    for (let i = 0; i < 3; i++) {
        let dropdownElement = document.createElement("span");
        dropdownElement.classList.add("dropdownElement");
        dropdownElement.textContent = options[i];
        dropdownElement.id = options[i].substring(0, options[i].indexOf(" ")).toLocaleLowerCase();

        dropdownElement.addEventListener("click", (event) => {
             textarea.value = dropdownElement.textContent
             // for the drawer 
            clearTimeout(typingTimer);
            typingTimer = setTimeout(removeSelectionDrawer, typingThreshold);
        })

        dropdownContainer.appendChild(dropdownElement);
    }

    dropdownContainer.addEventListener("mouseenter", (event) => {
        console.log("mouseenter")
        isMouseIn = true
        clearTimeout(typingTimer);
    })
    dropdownContainer.addEventListener("mouseout", (event) => {
        console.log("mouseout")    
        isMouseIn = false
        typingTimer = setTimeout(removeSelectionDrawer, typingThreshold);

    })  
    dropdownContainer.style.animation = "fadeIn ease 1.4s"
    parent.appendChild(dropdownContainer);
    isDrawer = true;
}

function startUp() {
    statusElement.textContent = statuses[randomNumber % statuses.length]


    //handle user input
    textarea.addEventListener("keydown", (event) => {
        if (event.keyCode >= 65 && event.keyCode <= 90) {  // check if it is alphanumeric, without the numeric
            let str = textarea.value.trim();
            //add css class to indicate we're typing ?? like a smooth underline animation??
            // let elementToHighlight = resolveElement(str);
            // console.log(elementToHighlight.textContent);
            // open/add the selection drawer (if it is already then dont!!)
            if (!isDrawer) addSelectionDrawer()
            else console.log("drawer already exists");
            // highlight the selection
            // elementToHighlight.classList.add("highlighted")
            // elementToHighlight.addEventListener("onlcik", (e) => {
                // textarea.textContent = elementToHighlight.textContent
                // runGame()
            // })
        } else if(event.keyCode=== 13){
            event.preventDefault()
            runGame()
        }
    })
    textarea.addEventListener("keyup", (event) => {
        if(isMouseIn) clearTimeout(typingTimer) 
        else{
            clearTimeout(typingTimer);
            typingTimer = setTimeout(removeSelectionDrawer, typingThreshold)
        }
    })

}
function removeSelectionDrawer() {
    setTimeout(() => {
        dropdownContainer.style.animation = "fadeOut ease 1.4s"
        dropdownContainer.classList.add("update")
    }, 1400)
    parent.addEventListener("animationend", () => {
        parent.removeChild(dropdownContainer);
        isDrawer = false;
        // possibly triggering an up aniation for status <P>???
    })
}

function resolveElement(str) {
    let rock = document.getElementById("rock");
    let scissors = document.getElementById("scissors");
    let paper = document.getElementById("paper");
    str = str.toLocaleLowerCase()
    console.log(str)
    // match the text from the text area to the drop dropdown
    //     starting letter
    //     consecutive characters
    //     lenght of chars
    //     similarity with letters
    //     the actual word but in diffrent case
    if (str.length === 1) {
        switch (str.charAt(0)) {
            case 'r':
                return rock;
            case 's':
                return scissors;
            case 'p':
                return paper;
        }
    } else if (str.length === 2) {
        switch (str.charAt(1)) {
            case 'o':
                return rock;
            case 'c':
                return scissors;
            case 'a':
                return paper;
        }
    }
}



function runGame() {
    // get a random selection from rock,paper,scissors
    computerSelection = randomNumber % 3
    // update the status bar
    let userSelection = options.indexOf(textarea.value.trim())

    let winScenarios = [ "0,2" , "1,0" , "2,1"] // (userSelection,computerSelection)
    // rock = 0
    // paper = 1
    // scissors = 2
    if(winScenarios.includes(userSelection+","+computerSelection))
        winGame();
    else if(userSelection === computerSelection)
        tieGame();
    else 
        loseGame();
        // setup winGame and loseGame
        // play an animation for the status bar
}

function winGame() {
    console.log("YOU WIN!")
}

function loseGame() {
    console.log("You LOSE!", textarea.value , options[computerSelection])
}
function tieGame() {
    console.log("You tie!")
}

startUp();