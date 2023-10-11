var puzzle = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 0]
];

var puzzle14 = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 15, 14, 0]
];

function shufflePuzzle() {
    var flatPuzzle = puzzle.flat();
    for (let i = flatPuzzle.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [flatPuzzle[i], flatPuzzle[j]] = [flatPuzzle[j], flatPuzzle[i]];
    }
    puzzle = [];
    while(flatPuzzle.length) puzzle.push(flatPuzzle.splice(0,4));
    updatePuzzlePieces();
    document.getElementById('parity-display').textContent = getParity(puzzle);
}

function getEmptyTilePosition() {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (puzzle[i][j] === 0) {
                return { i: i, j: j };
            }
        }
    }
}

function movePiece(piece) {
    var pieceNumber = parseInt(piece.textContent);
    var piecePosition;
    var emptyTilePosition = getEmptyTilePosition();

    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (puzzle[i][j] === pieceNumber) {
                piecePosition = { i: i, j: j };
                break;
            }
        }
    }

    if (Math.abs(piecePosition.i - emptyTilePosition.i) + Math.abs(piecePosition.j - emptyTilePosition.j) === 1) {
        puzzle[piecePosition.i][piecePosition.j] = 0;
        puzzle[emptyTilePosition.i][emptyTilePosition.j] = pieceNumber;
        updatePuzzlePieces();
        document.getElementById('parity-display').textContent = getParity(puzzle);
        return true;
    }

    return false;
}

// moving each piece to its correct position
function updatePuzzlePieces() {
    var pieces = document.getElementsByClassName('puzzle-piece');
    for (var x = 0; x < pieces.length; x++) {
        var piece = pieces[x];
        var pieceNumber = parseInt(piece.textContent);
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                if (puzzle[i][j] === pieceNumber) {
                    piece.style.left = (j * 100) + 'px';
                    piece.style.top = (i * 100) + 'px';
                    break;
                }
            }
        }
    }
}

var dragging = false;
var draggedPiece = null;

document.addEventListener('DOMContentLoaded', function() {
    var container = document.getElementById('puzzle-container');
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            var piece = document.createElement('div');
            piece.classList.add('puzzle-piece');
            if (puzzle[i][j] === 0) {
                piece.classList.add('blank-tile');
            }
            piece.textContent = puzzle[i][j];
            piece.style.left = (j * 100) + 'px';
            piece.style.top = (i * 100) + 'px';
            piece.addEventListener('mousedown', function(e) {
                movePiece(this);
                e.preventDefault();
            });
            container.appendChild(piece);
        }
    }
    document.getElementById('parity-display').textContent = getParity(puzzle);
});

document.getElementById('shuffle-button').addEventListener('click', shufflePuzzle);

document.getElementById('swap-button').addEventListener('click', function() {
    // Swap "14" and "15" in the puzzle array
    var temp = puzzle[3][1];
    puzzle[3][1] = puzzle[3][2];
    puzzle[3][2] = temp;
    updatePuzzlePieces();
    document.getElementById('parity-display').textContent = getParity(puzzle);
});

/*
function getParity(pieces) {
    var inversions = 0;
    for (var i = 0; i < pieces.length - 1; i++) {
        for (var j = i + 1; j < pieces.length; j++) {
            if (pieces[i] > pieces[j] && pieces[i] != 0 && pieces[j] != 0) {
                inversions++;
            }
        }
    }
    return inversions % 2;
}
*/

function getParity(puzzle) {
    var inversions = 0;
    var flatPuzzle = puzzle.flat();
    for (var i = 0; i < flatPuzzle.length - 1; i++) {
        if (flatPuzzle[i] != 0) {
            for (var j = i + 1; j < flatPuzzle.length; j++) {
                if (flatPuzzle[j] != 0 && flatPuzzle[i] > flatPuzzle[j]) {
                    inversions++;
                }
            }
        }
    }
    return inversions % 2;
}
