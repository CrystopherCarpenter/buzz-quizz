let createdQuizz = { title: ``, image: ``, questions: [], levels: [] };
const idString = localStorage.getItem(`userIds`);
let nQuestions;
let nLevels;
let y;

function infoValidation() {
    let testTitle;
    let testUrl;
    let testLevels;
    let testQuestions;

    createdQuizz.title = document.querySelector(`.quiz-title`).value;
    createdQuizz.image = document.querySelector(`.quiz-image-URL`).value;
    nQuestions = document.querySelector(`.number-of-questions`).value;
    nLevels = document.querySelector(`.number-of-levels`).value;

    testTitle = titleValidation(createdQuizz.title);
    testUrl = urlValidation(createdQuizz.image);
    testQuestions = parseInt(nQuestions) >= 3;
    testLevels = parseInt(nLevels) >= 2;

    if (testTitle && testUrl && testQuestions && testLevels) {
        printQuestions();
        changePage(".quiz-beginning", ".questions-creation");

        document.querySelector(`.quiz-title`).value = ``;
        document.querySelector(`.quiz-image-URL`).value = ``;
        document.querySelector(`.number-of-questions`).value = ``;
        document.querySelector(`.number-of-levels`).value = ``;
    } else {
        alert(`Por favor, verifique e preencha os campos corretamente`)
    }
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
        <div class="questions-creation-board" data-identifier="question">
            <h2>Pergunta ${i}</h2><br>
            <ion-icon name="create-outline" onclick="editQuestion(this)" data-identifier="expand"></ion-icon>
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
    <div><input type="text" placeholder="Texto da pergunta" class="question-text">
                </input><br>
                <input type="text" placeholder="Cor de fundo da pergunta" class="question-background-color">
                </input><br>
            </div>
            <h2>Resposta correta</h2><br>
            <div><input type="text" placeholder="Resposta correta" class="correct-answer">
                </input><br>
                <input type="text" placeholder="URL da imagem" class="image-URL">
                </input><br>
            </div>
            <h2>Respostas incorreta</h2><br>
            <div><input type="text" placeholder="Resposta incorreta 1" class="incorrect-answer">
                </input><br>
                <input type="text" placeholder="URL da imagem 1" class="image-URL-incorrect">
                </input><br>
            </div>

            <div><input type="text" placeholder="Resposta incorreta 2" class="incorrect-answer">
                </input><br>
                <input type="text" placeholder="URL da imagem 2" class="image-URL-incorrect">
                </input><br>
            </div>

            <div><input type="text" placeholder="Resposta incorreta 3" class="incorrect-answer">
                </input><br>
                <input type="text" placeholder="URL da imagem 3" class="image-URL-incorrect">
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
                        alert(`Por favor, verifique e preencha os campos corretamente`)
                        return;
                    }
                    break;
                case 1:
                    if (colorValidation(aux1.value)) {
                        question.color = aux1.value;
                    } else {
                        alert(`Por favor, verifique e preencha os campos corretamente`)
                        return;
                    }
                    break;
                case 2:
                    if (aux1.value !== "" && aux1.value !== null && aux1.value !== undefined) {
                        answer.text = aux1.value;
                        answer.isCorrectAnswer = true;
                    } else {
                        alert(`Por favor, verifique e preencha os campos corretamente`)
                        return;
                    }
                    if (urlValidation(aux2.value)) {
                        answer.image = aux2.value
                        question.answers.push(answer);
                    } else {
                        alert(`Por favor, verifique e preencha os campos corretamente`)
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
        createdQuizz.questions.push(question);
    }
    changePage(".questions-creation", ".level-creation");
    printLevels();
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
        <div class="level-creation-board" data-identifier="level">
            <h2>Nível ${i}</h2><br>
            <ion-icon name="create-outline" onclick="editLevel(this)" data-identifier="expand"></ion-icon>
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
    <div><input type="text" placeholder="Título do nível" class="level-title">
                </input><br>
                <input type="text" placeholder="% de acerto mínima" class="%-right-answer">
                </input><br>
                <input type="text" placeholder="URL da imagem do nível" class="level-image-URL">
                </input><br>
                <input type="text" placeholder="Descrição do nível" class="level-description">
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
                        alert(`Por favor, verifique e preencha os campos corretamente pergunta`)
                        return;
                    }
                    break;
                case 1:
                    if (parseInt(aux.value) >= 0 && parseInt(aux.value) <= 100) {
                        level.minValue = aux.value;
                        if ((parseInt(aux.value)) === 0) {
                            minValue0 = true;
                        }
                    } else {
                        alert(`Por favor, verifique e preencha os campos corretamente`)
                        return;
                    }
                    break;
                case 2:
                    if (urlValidation(aux.value)) {
                        level.image = aux.value;
                    } else {
                        alert(`Por favor, verifique e preencha os campos corretamente`)
                        return;
                    }
                    break;
                case 3:
                    if (aux.value.length >= 30) {
                        level.text = aux.value;
                    } else {
                        alert(`Por favor, verifique e preencha os campos corretamente`)
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
        createdQuizz.levels.push(level);
    }
    const promise = axios.post("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes", createdQuizz);
    promise.then(postQuizz);
}

function postQuizz(response) {
    const quizzSuccess = document.querySelector(`.quiz-success`);
    let userQuizzId = JSON.parse(idString);

    if (idString === null) {
        userQuizzId = [response.data.id];
    } else {
        userQuizzId.push(response.data.id)
    }

    const idStorage = JSON.stringify(userQuizzId);

    localStorage.setItem("userIds", idStorage);

    changePage(".level-creation", ".quiz-success");
    quizzSuccess.innerHTML += `
     <div class="class id${response.data.id}" onclick="selectQuizz(this); changePage('.quiz-success', '.quizz-page');">
            <img src="${createdQuizz.image}" alt=""/>
            <p>${createdQuizz.title}</p>
        </div>
        <button type="button" class="red-button id${response.data.id}" onclick="selectQuizz(this); changePage('.quiz-success', '.quizz-page');">Acessar Quizz</button>
        <button type="button" class="home-button" onclick="home()">Voltar pra home</button>
    `;

    createdQuizz = { title: ``, image: ``, questions: [], levels: [] };
}

function getQuizzes() {
    const promise = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes")
    promise.then(quizzesDisplay);
}

function quizzesDisplay(date) {
    let quizz = date;
    idArray = JSON.parse(idString)

    if (idArray !== null) {
        for (i = 0; i < idArray.length; i++) {
            const promise = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${idArray[i]}`);
            promise.then(getMyQuizz);
        }
    }

    for (let i = 0; i < quizz.data.length; i++) {
        //exibe todos os quizzes
        document.querySelector(".all-quizzes").innerHTML += `
        <div class="quizz id${quizz.data[i].id}" onclick="selectQuizz(this)" data-identifier="quizz-card">
            <img src="${quizz.data[i].image}" alt="">
            <p>${quizz.data[i].title}</p>
        </div>`

    }
}

function getMyQuizz(myQuizz) {
    //exibe os quizzes criados pelo usuário
    document.querySelector(".no-quizz").classList.add("hide");
    document.querySelector(".my-quizzes").classList.remove("hide")
    document.querySelector(".my-quizzes").innerHTML += `
        <div class="quizz id${myQuizz.data.id}" onclick="selectQuizz(this)">
        <img src="${myQuizz.data.image}" alt="">
        <p>${myQuizz.data.title}</p>
        </div>`
}

// hidePage - classe da página que deseja esconder
// showPage - classe da página que deseja mostrar
function changePage(hidePage, showPage) {
    document.querySelector(hidePage).classList.add("hide");
    document.querySelector(showPage).classList.remove("hide");
}

function selectQuizz(id) {
    let x = id.classList.item(1);
    x = x.replace("id", "");
    y = x;

    const promise = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${x}`);
    promise.then(displayQuizz)
}

function displayQuizz(selectedQuizz) {
    changePage(".main-page", ".quizz-page");

    document.querySelector(".quizz-title").innerHTML += `
    <p>${selectedQuizz.data.title}</p>`;
    document.querySelector(".quizz-title").style.backgroundImage = `url('${selectedQuizz.data.image}')`;

    for (let i = 0; i < selectedQuizz.data.questions.length; i++) {

        let randomIndex = [];

        for (let j = 0; j < selectedQuizz.data.questions[i].answers.length; j++) {
            randomIndex.push(j);
        }

        randomIndex.sort(() => Math.random() - 0.5);

        let divAnswers = "";

        for (let j = 0; j < selectedQuizz.data.questions[i].answers.length; j++) {
            divAnswers += `<div class="quizz-answer ${selectedQuizz.data.questions[i].answers[randomIndex[j]].isCorrectAnswer}" onclick="selectAnswer(this); verifyQuizzAnswers();">
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

    if (!itemParent.classList.contains("answered")) {

        item.classList.add("selected");
        itemParent.classList.add("answered");
    }
    const allAnswerOptions = itemParent.querySelectorAll(".quizz-answer");

    for (let i = 0; i < allAnswerOptions.length; i++) {
        if (!allAnswerOptions[i].classList.contains("selected")) {
            allAnswerOptions[i].classList.add("unselected");
        }


        if (allAnswerOptions[i].classList.item(1) == "true") {
            allAnswerOptions[i].classList.add("correct")
        } else {
            allAnswerOptions[i].classList.add("wrong")
        }

    }

    nextQuestion();
}

function nextQuestion() {
    const allQuestions = document.querySelectorAll(".quizz-question-answers");

    let i = 0;
    while (allQuestions[i].classList.contains("answered") && i < allQuestions.length - 1) {
        i++
    }

    setTimeout(() => { allQuestions[i].parentElement.scrollIntoView(); }, 2000);
}

function home() {
    window.location.reload()
}

function verifyQuizzAnswers() {
    const allQuestions = document.querySelectorAll(".quizz-question-answers")
    const allQuestionsAnswered = document.querySelectorAll(".quizz-question-answers.answered");

    if (allQuestionsAnswered.length === allQuestions.length) {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${y}`);
        promise.then((response) => {
            setTimeout(quizzResults, 2000, response)
        });
    }
}

function quizzResults(response) {
    const correctAnswers = document.querySelectorAll(`.selected.correct`).length;
    const totalQuestions = document.querySelectorAll(`.quizz-question`).length;
    const minLevelValue = response.data.levels;
    const result = Math.round((correctAnswers / totalQuestions) * 100);
    let aux = null;

    for (let i = 0; i < minLevelValue.length; i++) {
        if (result === 0) {
            if (minLevelValue[i].minValue === `0`) {
                aux = i;
            }
        }
        else if (parseInt(minLevelValue[i].minValue) > result) {
            continue;
        } else if (aux === null) {
            aux = i;
        }
        else if (parseInt(minLevelValue[i].minValue) > parseInt(minLevelValue[aux].minValue)) {
            aux = i;
        }
    }
    document.querySelector(`.quizz-page`).innerHTML += `
        <div class="quizz-result" data-identifier="quizz-result">
            <div class="result-title">
                <p>${result}% de acerto: ${response.data.levels[aux].title}</p>
            </div>
            <div class="result"><img src="${response.data.levels[aux].image}" alt="" />
                <p>${response.data.levels[aux].text}</p>
            </div>
        </div>
        <button type="button" class="red-button id${response.data.id}" onclick="restarQuizz(this)">Reiniciar
            Quizz</button>
        <button type="button" class="home-button" onclick="home()">Voltar pra home</button>
    `;

    document.querySelector(`.quizz-page`).scrollIntoView(false);
}

function restarQuizz(button) {
    document.querySelector(`.quizz-page`).innerHTML = `
        <div class="quizz-title">
            <div class="opacity-layer">
            </div>
        </div>
        <div class="questions"></div>
        `;
    selectQuizz(button);
}

getQuizzes();