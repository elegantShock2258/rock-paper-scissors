let randomNumber = Math.floor(100 * Math.random()) //any power of 10 is fine
let computerSelection = -1;
let options = ["Rock 🪨", "Paper 📝", "Scissors ✂️"]
let textarea = document.getElementById('selection')
let statusElement = document.getElementById("status")
let isDrawer = false;
let playerCounter = document.getElementById("playerScore")
let computerCounter = document.getElementById("computerScore")
let elementContainer = document.getElementById("elementContainer")
let header = document.getElementById("main-text")
let menuButton = document.getElementById("menu-button")

let playerStatus = 0;
let computerStatus = 0;
let statusIconsWin = ["😀", "😃", "😄", "😁", "😆", "😊", "😉", "😎"]
let statusIconLose = ["🙂", "🙃", "🫠", "🥲", "🤫", "😐", "😑", "😬", "😶", "🫡", "🤨", "😒", "😔"]
let playerStatusIcon = document.getElementById("playerStatusIcon")
let computerStatusIcon = document.getElementById("computerStatusIcon")

//for streaks
let streakCounter = 0;   // every 3
let afterStreakStatusIcon = ["🤩", "✨", "❤️", "💖", "💕", "💓"]

let playerSelectionHistory = []
let computerSelectionHistory = []


let typingThreshold = 100000;
let typingTimer = setTimeout(removeSelectionDrawer, typingThreshold);
let statuses = ["Dont Be shy!!!", "Oh come on, you didn't start this to stare at the screen did you?"]


let parent = document.getElementById("selectionContainer");
let dropdownContainer = document.createElement("div");

//TODO: 
//      add a sort of history something with a list of the emojis of the past selections



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

    animationInitialise(dropdownContainer, "fadeIn ease 1.4s")
    parent.appendChild(dropdownContainer);
    isDrawer = true;
}

function startUp() {
    textarea.readOnly = true;
    statusElement.textContent = statuses[randomNumber % statuses.length]

    textarea.addEventListener("click", (event) => {
        if (isDrawer) {
            removeSelectionDrawer()
            isDrawer = false
        } else {
            addSelectionDrawer()
            isDrawer = true;
        }
    })

    textarea.addEventListener("keydown", (event) => {
        if (event.keyCode === 13) {
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
    animationInitialise(dropdownContainer, "fadeOut ease 0.3s")
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

    let winScenarios = ["0,2", "1,0", "2,1"] // (userSelection,computerSelection)
    // rock = 0
    // paper = 1
    // scissors = 2
    if (winScenarios.includes(userSelection + "," + computerSelection)) {
        streakCounter++;
        playerStatusIcon.innerHTML = "You " + statusIconsWin[Math.floor(100 * Math.random() % (statusIconsWin.length))] 
        computerStatusIcon.innerHTML = "Computer " + statusIconLose[Math.floor(100 * Math.random() % (statusIconLose.length))]
        if (streakCounter === 3) streakDone()
        concludeGame("you Win!", "win")
    } else if (userSelection === computerSelection) {
        computerStatusIcon.innerHTML = "Computer " + statusIconLose[0] 
        playerStatusIcon.innerHTML = "You " + statusIconLose[0]
        streakCounter = 0;
        if (streakCounter === 3) streakBroke()
        concludeGame("it's a tie", "tie")
    } else {
        computerStatusIcon.innerHTML = "Computer " + statusIconsWin[Math.floor(100 * Math.random() % (statusIconsWin.length))]
        playerStatusIcon.innerHTML = "You " + statusIconLose[Math.floor(100 * Math.random() % (statusIconLose.length))]
        streakCounter = 0;
        if (streakCounter === 3) streakBroke()
        concludeGame("you Lose!", "lose")
    }
    computerSelection = Math.floor(100 * Math.random()) % 3
    console.log("new selection: " + options[computerSelection])
    textarea.value = ""
}
function streakDone() {

    animationInitialise(elementContainer, `fadeInBlack ease-in-out 1.5s 1`)
    elementContainer.style.backgroundColor = "black";

    streakWhiteText(header)
    streakWhiteText(playerStatusIcon);
    streakWhiteText(computerStatusIcon)
    streakWhiteText(statusElement)
    streakWhiteText(statusElement)
    streakWhiteText(textarea)
    streakWhiteText(menuButton)

    computerStatusIcon.innerHTML = "Computer " + afterStreakStatusIcon[Math.floor(100 * Math.random() % (afterStreakStatusIcon.length))]
    playerStatusIcon.innerHTML = "You " + afterStreakStatusIcon[Math.floor(100 * Math.random() % (afterStreakStatusIcon.length))]

    streakCounter = 0
}
function streakBroke() {

    animationInitialise(elementContainer, `fadeInBlack ease-in-out ${animationTime}s reverse`)
    elementContainer.style.backgroundColor = "#303030";
    setTimeout(()=>{  
        streakWhiteReverse(header)
        streakWhiteReverse(playerStatusIcon);
        streakWhiteReverse(computerStatusIcon)
        streakWhiteReverse(statusElement)
        streakWhiteReverse(textarea)
        streakWhiteReverse(menuButton)
    },animationTime)
    streakCounter = 0
}

function streakWhiteText(element) {
    animationInitialise(element, `headerstreakanim ease-in-out ${animationTime}s 1`);
    element.style.color = "azure";
    console.log(element.style)
}
function streakWhiteReverse(element) {
    animationInitialise(element, `headerStreakAnim ease-in-out ${animationTime}s reverse`);
    element.style.color = "bisque"
    console.log(element.style)
}


function buttonOnclick() {
    if (textarea.value != "") {
        removeSelectionDrawer()
        setTimeout(runGame, 500)
    }
}
let animationTime = 0.7
function concludeGame(statusString, animationName) {
    console.log(statusString, textarea.value, options[computerSelection])
    let animationStr = `${animationName} ease-in-out ${animationTime}s 2 alternate`;
    console.log(animationStr)
    let header = document.getElementById("main-text")
    animationInitialise(header, animationStr);

    statusElement.innerText = statusString

    animationInitialise(statusElement, `${animationName}-status ease-in-out ${animationTime}s 2 alternate`);
}
function animationInitialise(status, animationStr) {
    status.style.animation = 'none';
    status.style.animation = null;
    setTimeout(() => { status.style.animation = animationStr });
}
startUp()