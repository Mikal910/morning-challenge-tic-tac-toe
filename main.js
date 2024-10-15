class TicTacToe {
    constructor() {
        this.board = Array(9).fill(null); // Array to track the board state (9 cells)
        this.currentPlayer = 'X'; // X always starts
        this.scores = { X: 0, O: 0 }; // Object to track scores for X and O
        this.winner = null; // No winner initially

        // Select DOM elements
        this.cells = document.querySelectorAll('.cell');
        this.winnerMessageElement = document.querySelector('.winner-message');
        this.restartButton = document.querySelector('#restartGameButton');
        this.playerXScoreElement = document.querySelector('#playerXScore');
        this.playerOScoreElement = document.querySelector('#playerOScore');

      // Initialize the game  
        this.init();
    }
    init() {
        this.cells.forEach(cell => cell.addEventListener('click', (e) => this.handleCellClick(e)));
        this.restartButton.addEventListener('click', () => this.restartGame());
        this.updateStatusMessage();
    }
    //cell click
    handleCellClick(event) {
        const cell = event.target;
        const index = cell.getAttribute('data-cell-index');

        if (this.board[index] || this.winner) return; // Prevent clicking if cell is taken or game over

        this.board[index] = this.currentPlayer; // Set cell for the current player
        cell.textContent = this.currentPlayer; // Update the UI

        if (this.checkWinner()) {
            this.winner = this.currentPlayer;
            this.updateScore(); // Update the player's score
            this.updateStatusMessage(`${this.winner} wins!`);
        } else if (this.board.every(cell => cell)) {
            this.updateStatusMessage("It's a draw!");
        } else {
            this.switchPlayer();
            this.updateStatusMessage(); // Update turn message
        }
    }

    // Switch the current player
    switchPlayer() {
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
    }

    // Check for a winner
    checkWinner() {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6] // Diagonals
        ];

        return winningCombinations.some(([a, b, c]) => {
            return this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c];
        });
    }

    // Update the score for the winning player
    updateScore() {
        this.scores[this.winner]++;
        this.playerXScoreElement.textContent = this.scores.X;
        this.playerOScoreElement.textContent = this.scores.O;
    }

    // Update the status message (whose turn or winner)
    updateStatusMessage(message = `Player ${this.currentPlayer}'s turn`) {
        this.winnerMessageElement.textContent = message;
        this.winnerMessageElement.style.display = 'block';
    }

    // Restart the game
    restartGame() {
        this.board.fill(null); // Reset the board state
        this.winner = null; // Clear the winner
        this.cells.forEach(cell => {
            cell.textContent = ''; // Clear the UI
            cell.classList.remove('taken');
        });
        this.winnerMessageElement.style.display = 'none'; // Hide winner message
        this.currentPlayer = 'X'; // Reset to player X
        this.updateStatusMessage();
    }
}

// Start the game when the DOM is ready
document.addEventListener('DOMContentLoaded', () => new TicTacToe());