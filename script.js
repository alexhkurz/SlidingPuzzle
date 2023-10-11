var puzzle = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 0]
];

function shufflePuzzle() {
    // Code to shuffle the puzzle will go here
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
        return true;
    }

    return false;
}

function updatePuzzlePieces() {
    var pieces = document.getElementsByClassName('puzzle-piece');
    for (var i = 0; i < pieces.length; i++) {
        var piece = pieces[i];
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

    container.addEventListener('mousemove', function(e) {
        if (dragging) {
            draggedPiece.style.left = e.pageX - container.offsetLeft - 50 + 'px';
            draggedPiece.style.top = e.pageY - container.offsetTop - 50 + 'px';
        }
    });

    container.addEventListener('mouseup', function() {
        if (dragging) {
            movePiece(draggedPiece);
            dragging = false;
            draggedPiece = null;
        }
    });
});

document.getElementById('shuffle-button').addEventListener('click', shufflePuzzle);
