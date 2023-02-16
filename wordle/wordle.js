// remove this line
// it's just here to shows it works
// window.alert("works!");

var col = 0;
var row = 0;

var height = 4; //Number of guesses
var width = 4; //Length of word

var gameOver = false;

let words = [];
let hints = [];

let word;
let hint;

async function loadWords() {
    const res = await fetch("https://api.masoudkf.com/v1/wordle", {
        headers: {
            "x-api-key": "sw0Tr2othT1AyTQtNDUE06LqMckbTiKWaVYhuirv",
        },
    });

    if (res.ok) {
        const data = await res.json();
        words = data.dictionary.map(obj => obj.word);
        hints = data.dictionary.map(obj => obj.hint);
        console.log(words);
        var N = words.length;
        var index = Number.parseInt(Math.random() * N)
        word = words[index].toUpperCase();
        hint = hints[index];
        console.log(word);
        console.log(hint);
    } else {
        console.error(`HTTP error: ${res.status}`);
    }
}

loadWords();


window.onload = function(){
    createSquares();
}

function createSquares(){
    for (let r = 0; r < height; r++){
        for(let c = 0; c < width; c++){
            let tile = document.createElement("span");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            tile.innerText = "";
            document.getElementById("board").appendChild(tile);
        }
    }



    // Listen for Key Press
    document.addEventListener("keyup", (e) => {
        if (gameOver) return;

        if ("KeyA" <= e.code && e.code <= "KeyZ"){
            if (col < width){
                let currTile = document.getElementById(row.toString() + '-' + col.toString())
                if (currTile.innerText == ""){
                    currTile.innerText = e.code[3];
                    col += 1;
                }
            }
        }
        else if (e.code == "Backspace"){
            if (0 < col && col <= width){
                col -= 1;
            }
            let currTile = document.getElementById(row.toString() + '-' + col.toString())
            currTile.innerText = "";
        }
        else if (e.code == "Enter"){
            let wordComplete = true;
            let word = "";
            for (let i = 0; i < width; i++) {
                let currTile = document.getElementById(row.toString() + '-' + i.toString())
                let tileValue = currTile.innerText;
                if (tileValue == "") {
                    wordComplete = false;
                    break;
                }
                word += tileValue;
            }
            if (wordComplete && word.length == 4){
                update();
                row += 1; //start new row
                col = 0; //start at 0 for new row
            }
            else {
                window.alert("You must complete the word first");
            }
        }

        if (!gameOver && row == height){
            gameOver = true;
            document.getElementById("answer").innerText = word;
        }
    })
}

function update(){
    let correct = 0;
    let letterCount = {};
    for(let i = 0; i < word.length; i++){
        letter = word[i];
        if (letterCount[letter]){
            letterCount[letter] += 1;
        }
        else{
            letterCount[letter] = 1;
        }
    }

    // check all correct ones
    for (let c = 0; c < width; c++){
        let currTile = document.getElementById(row.toString() + '-' + c.toString());
        let letter = currTile.innerText;

        // is it in the correct position?
        if (word[c] == letter){
            currTile.classList.add("correct");
            correct += 1;
            letterCount[letter] -= 1;
        }

        if (correct == width){
            gameOver = true;
        }
    }

    // go again and mark which ones are present but in wrong position
    for (let c = 0; c < width; c++){
        let currTile = document.getElementById(row.toString() + '-' + c.toString());
        let letter = currTile.innerText;

        if (!currTile.classList.contains("correct")){
            // is it in the word?
            if (word.includes(letter) && letterCount[letter] > 0){
                currTile.classList.add("present");
                letterCount[letter] -= 1;
            } // not in the word
            else {
                currTile.classList.add("absent");
            }
        }
    }
}

let darkMode = localStorage.getItem("darkmode");
const darkModeToggle = document.querySelector('#darkmode');

const enableDarkMode = () => {
    document.body.classList.add("darkmode");
    localStorage.setItem("darkMode", "enabled");
}

const disableDarkMode = () => {
    document.body.classList.remove("darkmode");
    localStorage.setItem("darkMode", null);
}

darkModeToggle.addEventListener("click", () => {
    darkMode = localStorage.getItem("darkMode");
    if (darkMode !== "enabled"){
        enableDarkMode();
    }
    else {
        disableDarkMode();
    }
})
const mySidebar = document.getElementById("mySidebar")
const sidebar = document.getElementById('sidebar')

let menuOpen = false

function openMenu() {
  menuOpen = true
  overlay.style.display = 'block'
  sidebar.style.width = '250px'
}

function closeMenu() {
  menuOpen = false
  overlay.style.display = 'none'
  sidebar.style.width = '0px'
}

mySidebar.addEventListener('click', function () {
  if (!menuOpen) {
    openMenu()
  }
  else {
    closeMenu();
  }
})

/*function myFunction() {
    document.getElementById("mySidebar").classList.toggle("show");
  }
  
  // Close the dropdown menu if the user clicks outside of it
  window.onclick = function(event) {
    if (!event.target.matches('.instructions')) {
      var dropdowns = document.getElementsByClassName("sidebar-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }*/

// Add an event listener to the button to start the game over when clicked
//document.getElementById("start-over-btn").addEventListener("click", createSquares);
// Define a function to start the game over
/*function startOver() {
    // Clear the board by setting the text content of all tiles to empty strings
    for (let row = 0; row < height; row++) {
      for (let col = 0; col < width; col++) {
        document.getElementById(`${row}-${col}`).textContent = "";
      }
    }
  
    // Pick a new random word from the loaded dictionary
    const index = Math.floor(Math.random() * words.length);
    word = words[index].toUpperCase();
  
    // Reset the game over flag
    gameOver = false;
  
    // Update the hint and answer elements with the new word
    //document.getElementById("hint").textContent = hints[index];
    document.getElementById("answer").textContent = "";
  }*/
