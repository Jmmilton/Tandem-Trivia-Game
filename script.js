fetch("./json/Apprentice_TandemFor400_Data.json")
.then(data => data.json())
.then(data => {

    const jsonStr = JSON.stringify(data);
    const jsonObj = JSON.parse(jsonStr);



    console.log(jsonObj);

    let questionAndAnswer = jsonObj[Object.keys(jsonObj)[0]];
    let question = questionAndAnswer["question"];
    let incorrectAnswer = questionAndAnswer["incorrect"];
    let correctAnswer = questionAndAnswer["correct"];
    let choices = [].concat(incorrectAnswer, correctAnswer)
    let answerDiv = document.querySelector('.answer-btns');


    document.querySelector('.question').innerHTML = question;
    
    choices.forEach(choice => {
        let choiceInput = `
            <label>
                <input type="radio">
                ${choice}
            </label>
        ` 
        answerDiv.innerHTML += choiceInput
    });

    console.log(choices);
})
