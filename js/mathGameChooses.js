let totalScore = 0;
document.getElementById('totalScore').innerHTML = totalScore;

let num1, num2, userAns, operator, correctAns, score = 0;

let displayOperator = '';

function generateQuestion() {
    const operator = document.getElementById('operators').value;
    const range = parseInt(document.getElementById('ranges').value);

    num1 = Math.floor(Math.random() * range) + 1;
    num2 = Math.floor(Math.random() * range) + 1;



    switch (operator) {
        case 'plus':
            correctAns = num1 + num2;
            displayOperator = '+';
            break;
        case 'minus':
            correctAns = num1 - num2;
            displayOperator = '-';
            break;
        case 'multiplication':
            correctAns = num1 * num2;
            displayOperator = '*';
            break;
        case 'division':
            correctAns = (num1 / num2).toFixed(2);
            displayOperator = '/';
            break;
        default:
            alert("Please select a valid operator.");
            return;
    }

    document.getElementById('exercise').innerHTML = `${num1} ${displayOperator} ${num2}`;
}

document.getElementById('operators').addEventListener('change', generateQuestion);
document.getElementById('ranges').addEventListener('change', generateQuestion);


function checkAnswer() {
    userAns = +document.getElementById('solution').value;
    if (!isNaN(userAns)) {
        if (userAns == correctAns) {
            score = 10;
            totalScore += score;
            document.getElementById('totalScore').innerHTML = totalScore;
            document.getElementById('calculations').innerHTML += `
            <tr>
                <td>${num1} ${displayOperator} ${num2}</td>
                <td>${correctAns}</td>
                <td>${userAns}</td>
                <td>${score}</td>
            </tr>`;

            document.getElementById('solution').value = '';

            generateQuestion();
        }
        else {
            score = 0;
            alert('Incorrect. Try again.');
            document.getElementById('calculations').innerHTML += `
            <tr>
                <td>${num1} ${displayOperator} ${num2}</td>
                <td>${correctAns}</td>
                <td>${userAns}</td>
                <td>${score}</td>
            </tr>`;
            document.getElementById('solution').value = '';
        }

    }
};


function clearBoard() {
    document.getElementById('calculations').innerHTML = "";
    document.getElementById('totalScore').innerHTML -= totalScore;
}



