let counter = 75;
let calledNumbers = [];
let timeoutHandle;

function ballNumber() {
    const min = 1;
    const max = 75;

    if (counter === 0) {
        clearTimeout(timeoutHandle);
        if (!checkWin()) {
            alert('הפסדת! לא סיימת שורה, טור או אלכסון. בהצלחה במשחק הבא');
        }
        return;
    }

    let num;
    do {
        num = Math.floor(Math.random() * (max - min + 1)) + min;
    } while (calledNumbers.includes(num));
    calledNumbers.push(num);

    document.getElementById('random-number').innerText = num;
    document.getElementById('remaining-numbers').innerText = `נותרו: ${counter}`;

    if (checkWin()) {
        alert("ניצחת!");
        clearTimeout(timeoutHandle);
        return;
    }

    counter--;
    timeoutHandle = setTimeout(ballNumber, 5000);
}

function generateRandomNumbers(min, max, count) {
    const numbers = [];
    while (numbers.length < count) {
        const num = Math.floor(Math.random() * (max - min + 1)) + min;
        if (!numbers.includes(num)) {
            numbers.push(num);
        }
    }
    return numbers;
}

function createBingoBoard() {
    const board = document.getElementById('bingo-board');
    board.innerHTML = '';
    const numbers = generateRandomNumbers(1, 75, 25);

    numbers.forEach((num) => {
        const cell = document.createElement('div');
        cell.classList.add('bingo-cell');
        cell.innerText = num;

        cell.addEventListener('click', () => {
            if (calledNumbers.includes(num)) {
                cell.classList.toggle('active');
                if (checkWin()) {
                    alert('ניצחת!');
                }
            } else {
                alert('המספר הזה עדיין לא הוגרל!');
            }
        });

        board.appendChild(cell);
    });
}

function checkWin() {
    const cells = Array.from(document.querySelectorAll('.bingo-cell'));
    const size = 5;
    const board = [];

    for (let i = 0; i < size; i++) {
        board.push(cells.slice(i * size, i * size + size));
    }

    for (let row of board) {
        if (row.every(cell => cell.classList.contains('active'))) {
            return true;
        }
    }

    for (let col = 0; col < size; col++) {
        if (board.every(row => row[col].classList.contains('active'))) {
            return true;
        }
    }

    if (board.every((row, index) => row[index].classList.contains('active'))) {
        return true;
    }

    if (board.every((row, index) => row[size - 1 - index].classList.contains('active'))) {
        return true;
    }

    return false;
}

document.getElementById('new-game').addEventListener('click', () => {
    clearTimeout(timeoutHandle);
    counter = 75;
    calledNumbers = [];
    createBingoBoard();
    ballNumber();
});

// הפעלת המשחק הראשוני
createBingoBoard();
ballNumber();
