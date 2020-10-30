fetch("./json/Apprentice_TandemFor400_Data.json")
.then(data => data.json())
.then(data => {

    const jsonStr = JSON.stringify(data);
    const jsonObj = JSON.parse(jsonStr);

    let questionAndAnswer = jsonObj[Object.keys(jsonObj)[0]];
    let question = questionAndAnswer["question"];
    let incorrectAnswer = questionAndAnswer["incorrect"];
    let correctAnswer = questionAndAnswer["correct"];
    let choicesArr = [].concat(incorrectAnswer, correctAnswer)
    let answerDiv = document.querySelector('.answer-btns');


   


    function renderQuestionAndAnswer(){

        //render question
        document.querySelector('.question').innerHTML = question;

        //render choices
        choicesArr.forEach(choice => {
            let choiceInput = `
                <button class="choice-btn">
                    ${choice}
                </button>
            ` 

            // <label>
            //         <input type="radio">
            //         ${choice}
            //     </label>
                answerDiv.innerHTML += choiceInput;

        });
    }

    renderQuestionAndAnswer();

    function checkAnswer(choice){
        if(choice === correctAnswer){
            console.log('Correct')
        } else (
            console.log('Try again')
        )
    }

    let choicesBtn = document.querySelectorAll('.choice-btn');
    choicesBtn.forEach(button => {
        // button.addEventListener('click', checkAnswers);
        button.addEventListener('click', function(){
            checkAnswer(button.innerText);
        });
    });


})
