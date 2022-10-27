let randomNumber = Math.floor(100 * Math.random()) //any power of 10 is fine
let computerSelection = -1;
let options = ["Rock 🪨", "Paper 📝", "Scissors ✂️"]
let textarea = document.getElementById('selection')
let statusElement = document.getElementById("status")
let isDrawer = false;
const typingThreshold = 10000


let typingTimer = setTimeout(removeSelectionDrawer, typingThreshold);
let statuses = ["Dont Be shy!!!", "Oh come on, you didn't start this to stare at the screen did you?"]


let parent = document.getElementById("selectionContainer");
let dropdownContainer = document.createElement("div");

//TODO: add a sepereate button
//      also add a section to show the computer's choice
//      what if when u win the screen fades and there's an animation for the two choices coming togeather??????? ( what if u win in a certain streak??)
//      add score mechanism
//      add highscore mechanism


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

    animationInitialise(dropdownContainer,"fadeIn ease 1.4s")
    parent.appendChild(dropdownContainer);
    isDrawer = true;
}

function startUp() {
    textarea.readOnly = true;
    statusElement.textContent = statuses[randomNumber % statuses.length]

    textarea.addEventListener("click", (event) => {
        if(isDrawer) { 
            removeSelectionDrawer()
            isDrawer = false
        } else {
            addSelectionDrawer()
            isDrawer = true;
        }
    })

    textarea.addEventListener("keydown", (event) => {
        if(event.keyCode === 13) {
            event.preventDefault();
            runGame()
        }
    })
}
function removeSelectionDrawer() {
    setTimeout(() => {
        dropdownContainer.style.animation = "fadeOut ease 0.3s"
        dropdownContainer.classList.add("update")
    }, 300)
    animationInitialise(dropdownContainer,"fadeOut ease 0.3s")
    parent.addEventListener("animationend", () => {
        parent.removeChild(dropdownContainer);
        isDrawer = false;
        // possibly triggering an up aniation for status <P>???
    })
}

function runGame() {
    // get a random selection from rock,paper,scissors
    computerSelection = randomNumber % 3
    let userSelection = options.indexOf(textarea.value.trim())

    let winScenarios = [ "0,2" , "1,0" , "2,1"] // (userSelection,computerSelection)
    // rock = 0
    // paper = 1
    // scissors = 2
    if(winScenarios.includes(userSelection+","+computerSelection))
        concludeGame("you Win!","win")
    else if(userSelection === computerSelection)
        concludeGame("it's a tie","tie")
    else 
        concludeGame("you Lose!","lose")
    computerSelection = Math.floor(100* Math.random()) % 3
    console.log("new selection: " + options[computerSelection])
    textarea.value = ""
}
let animationTime = "0.7s"
function concludeGame(statusString,animationName) {
    console.log(statusString, textarea.value , options[computerSelection]) 
    let animationStr = `${animationName} ease-in ${animationTime} 2 alternate`;
    let header = document.getElementById("main-text")
    
    animationInitialise(header,animationStr);
    
    let status = document.getElementById("status")
    status.innerText = statusString 
    
    animationInitialise(status,`${animationName}-status ease-in ${animationTime} 2 alternate`);
}
function animationInitialise(status,animationStr) {
    status.style.animation = 'none';
    status.style.animation = null;
    setTimeout(() => { status.style.animation = animationStr });
}
startUp()

setTimeout(winGame,2000)