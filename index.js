
let randomNumber = Math.floor(100*Math.random()) //any power of 10 is fine
let textarea = document.getElementById('selection')
let statusElement = document.getElementById("status")
let isDrawer = false;
const typingThreshold = 5000
// update the status bar during startup
// update status bar when left idle
let statuses  = [ "Dont Be shy!", "Oh come on you didnt start this to stare at the screen did you?"]
statusElement.textContent = statuses[randomNumber % statuses.length]


// set up the selection drawer
let parent = document.getElementById("selectionContainer");    
let dropdownContainer = document.createElement("div");

function addSelectionDrawer(){
    parent = document.getElementById("selectionContainer");    
    dropdownContainer = document.createElement("div");
    dropdownContainer.classList.add("dropdownContainer");
    dropdownContainer.id = "dropdownContainer";

    let options = ["Rock 🪨","Paper 📝","Scissors ✂️"]
    for(let i = 0; i < 3;i++){
        let dropdownElement = document.createElement("span");
        dropdownElement.classList.add("dropdownElement");
        dropdownElement.textContent = options[i];
        dropdownElement.id = options[i].substring(0,options[i].indexOf(" ")).toLocaleLowerCase();

        dropdownContainer.appendChild(dropdownElement);
    }
    dropdownContainer.style.animation = "fadeIn ease 1.4s"
    parent.appendChild(dropdownContainer);
    isDrawer = true;
}
function removeSelectionDrawer(){
    setTimeout(()=> {
        dropdownContainer.style.animation = "fadeOut ease 1.4s"
        dropdownContainer.classList.add("update")
    },1400)
    parent.addEventListener("animationend",()=>{
        parent.removeChild(dropdownContainer);
        isDrawer = false;
        // possibly triggering up aniation for status <P>???
    })
}


// setTimeout(removeSelectionDrawer,2000)
// get users selection
textarea.addEventListener("keydown",(event)=>{
    if(event.keyCode >= 48 && event.keyCode <=90){
        let str = textarea.value.trim();
        // let elementToHighlight = resolveElement(str);
        // open/add the selection drawer (if it is already then dont!!)
        if(!isDrawer) addSelectionDrawer()
        else console.log("drawer already exists");
        // highlight the selection
        // elementToHighlight.classList.add("highlighted");
    }
})
textarea.addEventListener("keyup",(event)=>{
    clearTimeout(typingThreshold);
    setTimeout(removeSelectionDrawer, typingThreshold);
})
// match the text from the text area to the drop dropdown
//     lenght of chars
//     similarity with letters
//     thw actual word but in diffrent case
// get a random selection from rock,apaper,scissors
// update the status bar
// play an animation for the status bar