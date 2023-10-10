var puzzle = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 0]
];

function shufflePuzzle() {
    // Code to shuffle the puzzle will go here
}

function movePiece(piece) {
    // Code to move a piece will go here
}

document.addEventListener('DOMContentLoaded', function() {
    var container = document.getElementById('puzzle-container');
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            var piece = document.createElement('div');
            piece.classList.add('puzzle-piece');
            piece.textContent = puzzle[i][j] === 0 ? '' : puzzle[i][j];
            piece.style.left = (j * 100) + 'px';
            piece.style.top = (i * 100) + 'px';
            piece.addEventListener('click', function() {
                movePiece(this);
            });
            container.appendChild(piece);
        }
    }
});

document.getElementById('shuffle-button').addEventListener('click', shufflePuzzle);
