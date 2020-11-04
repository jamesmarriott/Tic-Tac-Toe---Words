const gameBoard = document.getElementById('gameBoard')
const message = document.getElementById('message')
const newWordConf = document.getElementById('newWordConfirm')
const resetButton = document.getElementById('resetBtn')
const changeWordsButton = document.getElementById('changeWords')
const changeWordsModal = document.getElementById('changeWordModal')
const addWordButton = document.getElementById('addWordButton')
const closeChangeWordModal = document.getElementById('closeModal')
const theAddWordModal = document.getElementById('overlay')
const newWord = document.getElementById('newWord')
const aboutButton = document.getElementById('aboutBtn')
const aboutModal = document.getElementById('aboutModal')
const closeAboutModal = document.getElementById('closeAbout')

let squares = []
let words = ["dream","education","opportunity","result","success","support","project","respectful","provide"]
const boardWidth = 3
let playerOne = 'X'
let playerTwo = '0'
let playerTurn = 'X'
let winState = false
let drawState = false

function createGrid() {
    // create board squares using a loop. Push the squares into an array.
    for (let i =0; i < boardWidth*boardWidth; i++) {
        const square = document.createElement('div')
        square.classList.add('gameSq')
        square.textContent = words[i]
        square.classList.add('text')
        square.classList.add('box')
        gameBoard.appendChild(square)
        squares.push(square)
    }
}

function changeWords() {
    if (newWord.value !== "") {
    words.unshift(newWord.value)
    newWordConf.textContent = (newWord.value + " added")
    newWord.value = ""
    }
} 

function checkifDraw() {
    drawState = squares.every(checkDraw)
    if (drawState) {
        message.classList.add("winDrawText")
        message.textContent = "No winner. Its a draw!"
    }
}

function checkDraw(square) {
    //callback function that checks if the iterated squares does not contain text class. The square has been played.
    return !square.classList.contains('text')
}

function checkWin() {
        // checks if one of 7 winning conditions are fufilled.
        for (let i = 0; i <squares.length; i++) {
            if (squares[0].textContent === playerTurn && squares[1].textContent === playerTurn && squares[2].textContent === playerTurn) {
                declareWinner()
            } else if (squares[3].textContent === playerTurn && squares[4].textContent === playerTurn && squares[5].textContent === playerTurn) {
                declareWinner()
            } else if (squares[6].textContent === playerTurn && squares[7].textContent === playerTurn && squares[8].textContent === playerTurn) {
                declareWinner()
            } else if (squares[6].textContent === playerTurn && squares[7].textContent === playerTurn && squares[8].textContent === playerTurn) {
                declareWinner()
            } else if (squares[0].textContent === playerTurn && squares[3].textContent === playerTurn && squares[6].textContent === playerTurn) {
                declareWinner()
            } else if (squares[1].textContent === playerTurn && squares[4].textContent === playerTurn && squares[7].textContent === playerTurn) {
                declareWinner()
            } else if (squares[2].textContent === playerTurn && squares[5].textContent === playerTurn && squares[8].textContent === playerTurn) {
                declareWinner()
            } else if (squares[0].textContent === playerTurn && squares[4].textContent === playerTurn && squares[8].textContent === playerTurn) {
                declareWinner()
            } else if (squares[2].textContent === playerTurn && squares[4].textContent === playerTurn && squares[6].textContent === playerTurn) {
                declareWinner()
            }
        }
}

function declareWinner () {
    message.classList.add("winDrawText")
    message.textContent = playerTurn + " is the winner!"
    winState = true
}

function changePlayer() {
       if (playerTurn === "X") {
            playerTurn = "0"
            message.textContent = playerTurn + "'s turn"
        } else {
            playerTurn = "X"
            message.textContent = playerTurn + "'s turn"
    } 
} 

function playSquare(event) {
// adds the current players token (X/ 0) to the played square.
    event.target.textContent = playerTurn
        if (playerTurn === "X") {
            event.target.classList.add('player1Filled')
            } else {
            event.target.classList.add('player2Filled')
            }
        event.target.classList.remove('text')
    // passes the click event to the playSquare function
    checkWin()
    // checks if there is a winner
    checkifDraw()
    // checks if there is a draw
    if (!winState && !drawState) {
    // if the current player has not won or there isn't a draw, change player
        changePlayer()
        // changes player   
    }
}

function gameReset() {
        //Resets the game. Removes game play classes.
        playerTurn = 'X'
        winState = false
        drawState = false
        resetButton.classList.remove("resetNow")
        message.classList.remove("winDrawText")
        let currentSquare = document.getElementsByClassName('box')
        for (let i =0; i < boardWidth*boardWidth; i++) {
        currentSquare[i].classList.remove('player1Filled', 'player2Filled')
        currentSquare[i].classList.add('text')
        currentSquare[i].textContent = words[i]
        message.textContent = playerTurn + "'s turn"
    }
}

function boxClicked(event) {
    // checks if clicked event was in a box and not already clicked. If so, adds a X or O and players' name and emoji. Alternates to the next player.
    if (event.target === resetButton) {
    // reset the game if the reset Button is clicked
        gameReset()
    }
    else if (event.target === changeWordsButton) {
        newWordConf.textContent = "Add a word"
        changeWordsModal.style.display = "flex"
        changeWords(event)
        return;
    }
    else if (event.target === addWordButton){
        changeWords()
        return;
    }
    else if (event.target === closeChangeWordModal) {
        gameReset()
        changeWordsModal.style.display = "none"
        newWordConf.textContent = "Add a word"
        return;
    }
    else if (event.target === aboutBtn) {
        aboutModal.style.display = "flex"
    }
    else if (event.target === closeAboutModal) {
        aboutModal.style.display = "none"
        return;
    }
    else if (winState || drawState) {
    // if the game has been won or drawn, do nothing until reset 
        return;
    }
    else if (!event.target.classList.contains('text') || event.target.classList.contains('player1Filled') || event.target.classList.contains('player2Filled')) return
    // if the clicked event is not a playable square of has already been played, do nothing
    else if (winState || drawState) {
    // if the game has been won or drawn don't continue playing.
        resetButton.classList.add("resetNow")
        return;
    }
    else playSquare(event)
}

createGrid()
document.addEventListener("click", boxClicked)


/// problems - I need to us get ID why?
/// reset button
/// Add a modal with how to play and take in 9 words
