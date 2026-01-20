const btnRock = document.querySelector('#btn-rock')
const btnPaper = document.querySelector('#btn-paper')
const btnScissors = document.querySelector('#btn-scissors')
btnRock.onclick = () => playRound('ROCK')
btnPaper.onclick = () => playRound('PAPER')
btnScissors.onclick = () => playRound('SCISSORS')

let getComputerChoice = function () {
    // Generate a random number: 1, 2, or 3
    let computerChoice = Math.floor(Math.random() * 3 + 1)

    // Convert the random number into a game choice
    if (computerChoice == 1) return 'ROCK'
    if (computerChoice == 2) return 'PAPER'
    if (computerChoice == 3) return 'SCISSORS'
}

let humanScore = 0
let computerScore = 0
// Create a function to play a single round
let playRound = function (humanChoice) {
    const computerChoice = getComputerChoice()

    // Decide the round winner
    const notification = document.querySelector('#notification')
    notification.textContent = `Computer chooses ${computerChoice}`
    if (humanChoice == computerChoice) {
        notification.textContent += `\nDraw!`
    } else if (
        (humanChoice == 'ROCK' && computerChoice == 'SCISSORS') ||
        (humanChoice == 'PAPER' && computerChoice == 'ROCK') ||
        (humanChoice == 'SCISSORS' && computerChoice == 'PAPER')
    ) {
        humanScore++
        notification.textContent += `\nYou win! ${humanChoice} beats ${computerChoice}`
    } else {
        computerScore++
        notification.textContent += `\nYou lose! ${computerChoice} beats ${humanChoice}`
    }

    // Decide the game winner
    const scoreboard = document.querySelector('#scoreboard')
    scoreboard.textContent = `Final score for human: ${humanScore}, computer: ${computerScore}`
    if (humanScore == 5 || computerScore == 5) {
        humanScore > computerScore
            ? (notification.textContent += `\nHuman win!`)
            : (notification.textContent += `\nComputer win!`)
        humanScore = 0
        computerScore = 0
    }
}
