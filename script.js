fetch("./json/Apprentice_TandemFor400_Data.json")
.then(data => data.json())
.then(data => {

    const jsonStr = JSON.stringify(data);
    const jsonObj = JSON.parse(jsonStr);

    // Trivia question index
    let triviaIndex = 0;
    
    // Trivia Score
    let triviaScore = 0;
    let scoreSpan = document.getElementById('score');
    scoreSpan.innerText = triviaScore;

    // Trivia info
    let triviaObj, question, incorrectAnswer, correctAnswer, choicesArr;

    // Trivia elements
    let choicesBtn;

    // This function takes the user choice from the button clicked
    // and compares to the correct answer from that question
    function checkAnswer(choice, correctAnswer, button){
        if(choice === correctAnswer){
            button.classList.add('correct-answer');
        } else {
            button.classList.add('wrong-answer');
        };
        handleButtons(correctAnswer);
        handleScore(choice, correctAnswer);
        triviaIndex += 1;

        setTimeout(() => renderQuestionAndAnswer(triviaIndex), 1000);
    };

    // This function takes the correctAnswer as parameter, and disables all 
    // buttons so user can only select 1. Also adds correct-answer class to
    // the correct answer.
    function handleButtons(correctAnswer){
        choicesBtn.forEach(btn => {
            btn.disabled = true;
            if (btn.innerText == correctAnswer){
                btn.classList.add('correct-answer');
            };
        });
    };

    // This function takes in the choice and correct answer, adds 10 points
    // to score if correct, -5 if incorrect.
    function handleScore(choice, correctAnswer){
        if (choice === correctAnswer){
            triviaScore += 10;
        } else {
            triviaScore -= 5;
        }
        scoreSpan.innerText = triviaScore;
    };

    // This function creates a new array containing correct and incorrect
    // answers in random order every time.
    function shuffleChoices(incorrect, correct){
        let arrLength = incorrect.length;
        let randomIndex = Math.floor(Math.random() * arrLength);
        let newArray = [...incorrect];
        newArray.splice(randomIndex, 0, correct);
        return newArray;
    };

    // This function takes an index as parameter, extracts one object
    // from the trivia json, extracts its question and answers, renders
    // the current question and the choices and adds to them an event listener
    function renderQuestionAndAnswer(index){
        triviaObj = jsonObj[Object.keys(jsonObj)[triviaIndex]];
        question = triviaObj["question"];
        incorrectAnswer = triviaObj["incorrect"];
        correctAnswer = triviaObj["correct"];

        // choicesArr = [].concat(incorrectAnswer, correctAnswer);
        choicesArr = shuffleChoices(incorrectAnswer,correctAnswer);
        let answerDiv = document.querySelector('.answer-btns');

        // Renders question
        document.querySelector('.question').innerHTML = question;

        // Cleans the wrapper
        answerDiv.innerHTML = '';

        // Renders choices buttons
        choicesArr.forEach(choice => {
            let choiceInput = `
                <button class="choice-btn">
                    ${choice}
                </button>
            ` 
            answerDiv.innerHTML += choiceInput;
        });

        // Adds event listener to the buttons
        choicesBtn = document.querySelectorAll('.choice-btn');
        choicesBtn.forEach(button => {
            button.addEventListener('click', function(){
                let userChoice = button.innerText;
                checkAnswer(userChoice, correctAnswer, button);
            });
        });
    };

    renderQuestionAndAnswer(triviaIndex);

    // Reset Button
    let resetBtn = document.getElementById('reset');

    resetBtn.addEventListener('click', function(){
        const resetPrompt = prompt('Type reset to start over');
        if (resetPrompt === "reset" || resetPrompt === "Reset") {
        location.reload();

        };
    });
})
