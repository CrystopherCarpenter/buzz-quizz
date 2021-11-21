let quizz = { title: ``, image: ``, questions: [], levels: [] };

let nQuestions;
let nLevels;

function infoValidation() {
    let testTitle;
    let testUrl;
    let testLevels;
    let testQuestions;

    quizz.title = document.querySelector(`.quiz-title`).value;
    quizz.image = document.querySelector(`.quiz-image-URL`).value;
    nQuestions = document.querySelector(`.number-of-questions`).value;
    nLevels = document.querySelector(`.number-of-levels`).value;

    testTitle = titleValidation(quizz.title);
    testUrl = urlValidation(quizz.image);
    testQuestions = parseInt(nQuestions) >= 3;
    testLevels = parseInt(nLevels) >= 2;

    if (testTitle && testUrl && testQuestions && testLevels) {
        printQuestions();
        changePage(".quiz-beginning", ".questions-creation");

        document.querySelector(`.quiz-title`).value = ``;
        document.querySelector(`.quiz-image-URL`).value = ``;
        document.querySelector(`.number-of-questions`).value = ``;
        document.querySelector(`.number-of-levels`).value = ``;
    } else (
        alert(`Por favor, verifique e preencha os campos corretamente`)
    )
}

function titleValidation(title) {
    if (title.length >= 20 && title.length <= 65) {
        return true;
    } else {
        return false;
    }
}

function urlValidation(imageUrl) {
    let test;

    try {
        test = new URL(imageUrl).protocol;
    }
    catch {
        return false;
    }
    if (test === `http:` || test === `https:`) {
        return true;
    } else {
        return false;
    }
}

function printQuestions() {
    let questionsCreation = document.querySelector(`.questions-creation`);

    for (let i = 1; i <= nQuestions; i++) {
        questionsCreation.innerHTML += `
        <div class="questions-creation-board">
            <h2>Pergunta ${i}</h2><br>
            <ion-icon name="create-outline" onclick="editQuestion(this)"></ion-icon>
        </div>`;
    }
    questionsCreation.innerHTML += `
    <button type="button" class="red-button" onclick="questionsCreation()">Prosseguir para criar níveis</button>
    `;
    editQuestion(document.querySelector(`.questions-creation-board ion-icon`))
}

function editQuestion(element) {
    let question = element.parentElement;

    element.classList.add(`hide`);
    question.innerHTML += `
    <div><input type="text" placeholder="Texto da pergunta (min 20 letras)" class="question-text">
                </input><br>
                <input type="text" placeholder="Cor de fundo da pergunta (hexadecimal '#000000')" class="question-background-color">
                </input><br>
            </div>
            <h2>Resposta correta</h2><br>
            <div><input type="text" placeholder="Resposta correta (não pode estar em branco)" class="correct-answer">
                </input><br>
                <input type="text" placeholder="URL da imagem ('http:...')" class="image-URL">
                </input><br>
            </div>
            <h2>Respostas incorreta</h2><br>
            <div><input type="text" placeholder="Resposta incorreta 1 (pelo menos 1 incorreta)" class="incorrect-answer">
                </input><br>
                <input type="text" placeholder="URL da imagem 1 ('http:...')" class="image-URL-incorrect">
                </input><br>
            </div>

            <div><input type="text" placeholder="Resposta incorreta 2" class="incorrect-answer">
                </input><br>
                <input type="text" placeholder="URL da imagem 2 ('http:...')" class="image-URL-incorrect">
                </input><br>
            </div>

            <div><input type="text" placeholder="Resposta incorreta 3" class="incorrect-answer">
                </input><br>
                <input type="text" placeholder="URL da imagem 3 ('http:...')" class="image-URL-incorrect">
                </input>
            </div>
    `;
}

function questionsCreation() {
    const questionData = document.querySelectorAll(`.questions-creation-board input`);

    for (let i = 0; i < nQuestions; i++) {
        let question = { title: ``, color: ``, answers: [] };
        for (let j = 0; j < 10; j++) {
            let answer = { text: ``, image: ``, isCorrectAnswer: `` }
            let aux1 = questionData[(10 * i) + j];
            let aux2 = questionData[(10 * i) + j + 1];
            switch (j) {
                case 0:
                    if (aux1.value.length >= 20) {
                        question.title = aux1.value;
                    } else {
                        alert(`Por favor, verifique e preencha os campos corretamente title`)
                        return;
                    }
                    break;
                case 1:
                    if (colorValidation(aux1.value)) {
                        question.color = aux1.value;
                    } else {
                        alert(`Por favor, verifique e preencha os campos corretamente color`)
                        return;
                    }
                    break;
                case 2:
                    if (aux1.value !== "" && aux1.value !== null && aux1.value !== undefined) {
                        answer.text = aux1.value;
                        answer.isCorrectAnswer = true;
                    } else {
                        alert(`Por favor, verifique e preencha os campos corretamente text`)
                        return;
                    }
                    if (urlValidation(aux2.value)) {
                        answer.image = aux2.value
                        question.answers.push(answer);
                    } else {
                        alert(`Por favor, verifique e preencha os campos corretamente img`)
                        return;
                    }
                    break;
                case 4:
                    if (aux1.value !== "" && aux1.value !== null && aux1.value !== undefined) {
                        answer.text = aux1.value;
                        answer.isCorrectAnswer = false;
                    }
                    if (urlValidation(aux2.value)) {
                        answer.image = aux2.value
                        question.answers.push(answer);
                    }
                    break;
                case 6:
                    if (aux1.value !== "" && aux1.value !== null && aux1.value !== undefined) {
                        answer.text = aux1.value;
                        answer.isCorrectAnswer = false;
                    }
                    if (urlValidation(aux2.value)) {
                        answer.image = aux2.value
                        question.answers.push(answer);
                    } break;
                case 8:
                    if (aux1.value !== "" && aux1.value !== null && aux1.value !== undefined) {
                        answer.text = aux1.value;
                        answer.isCorrectAnswer = false;
                    }
                    if (urlValidation(aux2.value)) {
                        answer.image = aux2.value
                        question.answers.push(answer);
                    }
                    break;
                default:
                    break;
            }
        }
        if (question.answers[1] === null || question.answers[1] === undefined || question.answers[1] === ``) {
            alert(`Por favor, verifique e preencha os campos corretamente`)
            return;
        }
        quizz.questions.push(question);
    }
    changePage(".questions-creation", ".level-creation");
    saveQuizz();
    printLevels();
}

function saveQuizz() {
    const promise = axios.post("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes", quizz)
    promise.then(alert(promise));
}

function colorValidation(color) {
    const regExp = /[#0-9A-F]{7}/gi;
    if (color.length > 7) {
        return false;
    }
    if (color[0] === `#`) {
        for (let i = 1; i < color.length; i++) {
            if (color[i] === `#`) {
                return false;
            }
        }
        return (regExp.test(color))
    } else {
        return false;
    }
}

function printLevels() {
    let levelsCreation = document.querySelector(`.level-creation`);

    for (let i = 1; i <= nLevels; i++) {
        levelsCreation.innerHTML += `
        <div class="level-creation-board">
            <h2>Nível ${i}</h2><br>
            <ion-icon name="create-outline" onclick="editLevel(this)"></ion-icon>
        </div>`;
    }
    levelsCreation.innerHTML += `
    <button type="button" class="red-button" onclick="levelsCreation()">Finalizar Quizz</button>
    `;
    editLevel(document.querySelector(`.level-creation-board ion-icon`))
}

function editLevel(element) {
    let level = element.parentElement;

    element.classList.add(`hide`);
    level.innerHTML += `
    <div><input type="text" placeholder="Título do nível (min. 10 letras)" class="level-title">
                </input><br>
                <input type="text" placeholder="% de acerto mínima (0 a 100, pelo menos um nível deve ser 0%)" class="%-right-answer">
                </input><br>
                <input type="text" placeholder="URL da imagem do nível ('http:...')" class="level-image-URL">
                </input><br>
                <input type="text" placeholder="Descrição do nível (min. 30 letras)" class="level-description">
                </input>
            </div>
    `;
}

function levelsCreation() {
    const levelsData = document.querySelectorAll(`.level-creation-board input`);
    let minValue0 = false;

    for (let i = 0; i < nLevels; i++) {
        let level = { title: ``, image: ``, text: ``, minValue: `` };
        for (let j = 0; j < 4; j++) {
            let aux = levelsData[(4 * i) + j];
            switch (j) {
                case 0:
                    if (aux.value.length >= 10) {
                        level.title = aux.value;
                    } else {
                        alert(`Por favor, verifique e preencha os campos corretamente title`)
                        return;
                    }
                    break;
                case 1:
                    if (parseInt(aux.value) >= 0 && parseInt(aux.value) <= 100) {
                        level.minValue = aux.value;
                        if (parseInt(aux.value) === 0) {
                            minValue0 = true;
                        }
                    } else {
                        alert(`Por favor, verifique e preencha os campos corretamente color`)
                        return;
                    }
                    break;
                case 2:
                    if (urlValidation(aux.value)) {
                        level.image = aux.value;
                    } else {
                        alert(`Por favor, verifique e preencha os campos corretamente color`)
                        return;
                    }
                    break;
                case 3:
                    if (aux.value.length >= 30) {
                        level.text = aux.value;
                    } else {
                        alert(`Por favor, verifique e preencha os campos corretamente color`)
                        return;
                    }
                    break;
                default:
                    break;
            }
        }
        if (!minValue0) {
            alert(`Por favor, verifique e preencha os campos corretamente`)
            return;
        }
        quizz.levels.push(level);
    }

    const promise = axios.post("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes", quizz);
    promise.then(postQuizz());
}

function postQuizz() {
    const quizzSuccess = document.querySelector(`.quiz-success`);

    changePage(".level-creation", ".quiz-success");

    quizzSuccess.innerHTML += `
     <div>
            <img src="${quizz.image}" />
            <p>${quizz.title}</p>
        </div>
        <button type="button" class="red-button" onclick="">Acessar Quizz</button>
        <button type="button" class="home-button" onclick="changePage('.quiz-success', '.main-page')">Voltar pra home</button>
    `;

    quizz = { title: ``, image: ``, questions: [], levels: [] };
}

function getQuizzes() {
    const promise = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes")
    promise.then(quizzesDisplay);
}

function quizzesDisplay(date) {
    let quizz = date;
    console.log(quizz);

    // if (quizz != null) {
    //     //exibe os quizzes criados pelo usuário
    //     for (let i = 0; i < quizz.length; i++) {
    //         document.querySelector(".created-quizzes").innerHTML += `
    //         <div class="quizz" onclick="selectQuizz(this)">
    //         <img src="${quizz[i].image}" alt="">
    //         <p>${quizz[i].title}</p>
    //         </div>`
    //     }
    // } else {

    // }

    //exibe todos os quizzes
    for (let i = 0; i < quizz.data.length; i++) {
        document.querySelector(".all-quizzes").innerHTML += `
        <div class="quizz id${quizz.data[i].id}" onclick="selectQuizz(this)">
            <img src="${quizz.data[i].image}" alt="">
            <p>${quizz.data[i].title}</p>
        </div>`
    }
}

// hidePage - classe da página que deseja esconder
// showPage - classe da página que deseja mostrar
function changePage(hidePage, showPage) {
    document.querySelector(hidePage).classList.add("hide");
    document.querySelector(showPage).classList.remove("hide");
}

function selectQuizz(id) {
    let x = id.classList.item(1);
<<<<<<< HEAD
    x=x.replace("id","");
=======
    x = parseInt(x[2] + x[3]);
>>>>>>> 456fd997036b7774d094521efb355a341af605f3
    const promise = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${x}`);
    promise.then(displayQuizz)
}

function displayQuizz(selectedQuizz) {
    console.log("oi")
    console.log(selectedQuizz);
    changePage(".main-page", ".quizz-page");

    document.querySelector(".quizz-title").innerHTML += `
    <p>${selectedQuizz.data.title}</p>`;
    document.querySelector(".quizz-title").style.backgroundImage = `url('${selectedQuizz.data.image}')`;


    console.log(selectedQuizz.data.questions[0].answers[0].image)


    for (let i = 0; i < selectedQuizz.data.questions.length; i++) {

        let randomIndex = [];

        for (let j = 0; j < selectedQuizz.data.questions[i].answers.length; j++) {
            randomIndex.push(j);
        }

        randomIndex.sort(() => Math.random() - 0.5);
        console.log(randomIndex);

        let divAnswers = "";
<<<<<<< HEAD
        for (let j=0;j<selectedQuizz.data.questions[i].answers.length;j++){
            divAnswers += `<div class="quizz-answer ${selectedQuizz.data.questions[i].answers[randomIndex[j]].isCorrectAnswer}" onclick="selectAnswer(this)">
=======
        for (let j = 0; j < selectedQuizz.data.questions[i].answers.length; j++) {
            divAnswers += `<div class="quizz-answer" onclick="selectAnswer(this, selectedQuizz)">
>>>>>>> 456fd997036b7774d094521efb355a341af605f3
                <img src="${selectedQuizz.data.questions[i].answers[randomIndex[j]].image}" alt=""> 
                <p>${selectedQuizz.data.questions[i].answers[randomIndex[j]].text}</p>
            </div>`
        }
        document.querySelector(".questions").innerHTML += `
            <div class="quizz-question">
                <div class="quizz-question-header">
                    ${selectedQuizz.data.questions[i].title}
                </div>  
                <div class="quizz-question-answers">
                    ${divAnswers} 
                </div>
            </div>`

        document.querySelector(".quizz-question-header").style.backgroundColor = selectedQuizz.data.questions[i].color;
    }
}

function selectAnswer(item) {
    const itemParent = item.parentElement;
<<<<<<< HEAD

    if (!itemParent.classList.contains("answered")){
=======
    if (!itemParent.classList.contains("answered")) {
>>>>>>> 456fd997036b7774d094521efb355a341af605f3
        item.classList.add("selected");
        itemParent.classList.add("answered");
    }
    const allAnswerOptions = itemParent.querySelectorAll(".quizz-answer");

    for (let i = 0; i < allAnswerOptions.length; i++) {
        if (!allAnswerOptions[i].classList.contains("selected")) {
            allAnswerOptions[i].classList.add("unselected");
        }

<<<<<<< HEAD
        if (allAnswerOptions[i].classList.item(1)=="true") {
            allAnswerOptions[i].classList.add("correct")
        }else{
            allAnswerOptions[i].classList.add("wrong")
        }
=======
        if (selectedQuizz) { }
>>>>>>> 456fd997036b7774d094521efb355a341af605f3
    }

    nextQuestion();
}

function nextQuestion() {
    const allQuestions = document.querySelectorAll(".quizz-question-answers");
    console.log(allQuestions);

    let i = 0;
    while (allQuestions[i].classList.contains("answered")) {
        i++
    }

    setTimeout(() => { allQuestions[i].parentElement.scrollIntoView();alert("oi"); }, 2000);
    
}

getQuizzes();
