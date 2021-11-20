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

function getQuizzes() {
    const promise = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes")
    promise.then(quizzesDisplay);
}

function quizzesDisplay(date) {
    let quizz = date;
    console.log(quizz);

    if (quizz != null) {
        //exibe os quizzes criados pelo usuário
        for (let i = 0; i < quizz.length; i++) {
            document.querySelector(".created-quizzes").innerHTML += `
            <div class="quizz" onclick="selectQuizz(this)">
            <img src="${quizz[i].image}" alt="">
            <p>${quizz[i].title}</p>
            </div>`
        }
    } else {

    }

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
    x = parseInt(x[2]+x[3]);
    const promise = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${x}`);
    promise.then(displayQuizz)
}

function displayQuizz(selectedQuizz) {
    console.log(selectedQuizz);
    changePage(".main-page", ".quizz-page");

    document.querySelector(".quizz-title").innerHTML += `
    <p>${selectedQuizz.data.title}</p>`;
    document.querySelector(".quizz-title").style.backgroundImage = `url('${selectedQuizz.data.image}')`;


    console.log(selectedQuizz.data.questions[0].answers[0].image)
    

    for (let i = 0; i<selectedQuizz.data.questions.length; i++) {
        let divAnswers = "";
        for (let j=0;j<selectedQuizz.data.questions[i].answers.length;j++){
            divAnswers += `<div class="quizz-answer">
                <img src="${selectedQuizz.data.questions[i].answers[j].image}" alt=""> 
                <p>${selectedQuizz.data.questions[i].answers[j].text}</p>
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

getQuizzes();
