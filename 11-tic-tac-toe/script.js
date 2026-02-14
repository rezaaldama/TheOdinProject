const Gameboard = (() => {
    let board = ["", "", "", "", "", "", "", "", ""];

    const render = () => {
        let boardHTML = "";
        board.forEach((square, index) => {
            boardHTML += `<div class="square" id="square-${ index }">${ square }</div>`;
        });
        document.querySelector('#gameboard').innerHTML = boardHTML;

        const squares = document.querySelectorAll(".square");
        squares.forEach((square) => {
            square.addEventListener("click", Game.handleClick);
        });
    };

    const update = (index, value) => {
        board[index] = value;
        render();
    };

    const reset = () => {
        for (let i = 0; i < board.length; i++) {
            board[i] = "";
        }
        render();
    };

    const getGameboard = () => [...board];

    return {
        render,
        update,
        reset,
        getGameboard
    };

})();

const createPlayer = (name, mark) => {
    return {
        name,
        mark
    };
};

const Game = (() => {
    let players = [];
    let currentPlayerIndex;
    let gameOver;

    const start = () => {
        players = [
            createPlayer(document.querySelector('#player1').value, "X"),
            createPlayer(document.querySelector('#player2').value, "O")
        ];
        currentPlayerIndex = 0;
        gameOver = false;
        Gameboard.render();
    };

    const handleClick = (event) => {
        if (gameOver) return;

        let index = parseInt(event.target.id.split('-')[1]);
        if (Gameboard.getGameboard()[index] === "") {
            Gameboard.update(index, players[currentPlayerIndex].mark);
            if (checkWin(Gameboard.getGameboard())) {
                gameOver = true;
                document.querySelector('#gameresult').textContent = `${ players[currentPlayerIndex].name } wins!`;
            } else if (checkTie(Gameboard.getGameboard())) {
                gameOver = true;
                document.querySelector('#gameresult').textContent = "It's a tie!";
            } else {
                currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
            }
        }
    };

    function checkWin (board) {
        const wins = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontal
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertical
            [0, 4, 8], [2, 4, 6]             // Diagonal
        ];

        return wins.some(combination => {
            const [a, b, c] = combination;
            return board[a] != '' && board[a] === board[b] && board[a] === board[c];
        });
    }

    const checkTie = (board) => {
        return board.every(square => square !== "");
    };

    return {
        start,
        handleClick,
        restart: () => {
            Gameboard.reset();
            start();
            document.querySelector('#gameresult').textContent = "Welcome back to Tic-Tac-Toe!";
        }
    };

})();

const startButton = document.querySelector('#startButton');
startButton.addEventListener("click", () => {
    Game.start();
});

const restartButton = document.querySelector('#restartButton');
restartButton.addEventListener("click", () => {
    Game.restart();
});