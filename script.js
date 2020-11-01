fetch("./json/Apprentice_TandemFor400_Data.json")
.then(data => data.json())
.then(data => {

    const jsonStr = JSON.stringify(data);
    const jsonObj = JSON.parse(jsonStr);

    // Trivia question index
    let triviaIndex = 0;

    // Trivia info
    let triviaObj, question, incorrectAnswer, correctAnswer, choicesArr;

    // This function takes the user choice from the button clicked
    // and compares to the correct answer from that question
    function checkAnswer(choice, correctAnswer, button){
        if(choice === correctAnswer){
            console.log('Correct')
            triviaIndex += 1;

            renderQuestionAndAnswer(triviaIndex);
        } else {
            console.log('Try again')
            button.classList.add('wrong-answer');
        }
    }

    // This function takes an index as parameter, extracts one object
    // from the trivia json, extracts its question and answers, renders
    // the current question and the choices and adds to them an event listener
    function renderQuestionAndAnswer(index){
        triviaObj = jsonObj[Object.keys(jsonObj)[triviaIndex]];
        question = triviaObj["question"];
        incorrectAnswer = triviaObj["incorrect"];
        correctAnswer = triviaObj["correct"];

        choicesArr = [].concat(incorrectAnswer, correctAnswer)
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
        let choicesBtn = document.querySelectorAll('.choice-btn');
        choicesBtn.forEach(button => {
            button.addEventListener('click', function(){
                let userChoice = button.innerText;
                checkAnswer(userChoice, correctAnswer, button);
            });
        });
    }

    renderQuestionAndAnswer(triviaIndex);

    // Reset Button
    let resetBtn = document.getElementById('reset');

    resetBtn.addEventListener('click', function(){
        const resetPrompt = prompt('Type reset to start over')
        if (resetPrompt === "reset" || resetPrompt === "Reset") {
        location.reload()

        }
    })

    // Cheat Button 
    let cheatBtn = document.getElementById('cheat');

    cheatBtn.addEventListener('click', function(){
        // do -10 points animation
        choicesArr.forEach(e => {
            console.log('1')
        });
    }
    


    )
})
