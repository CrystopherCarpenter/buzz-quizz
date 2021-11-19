let title;
let url;
let nQuestions;
let nLevels;

function infoValidation() {
    let testTitle;
    let testUrl;
    let testLevels;
    let testQuestions;

    title = document.querySelector(`.quiz-title`).value;
    url = document.querySelector(`.quiz-image-URL`).value;
    nQuestions = document.querySelector(`.number-of-questions`).value;
    nLevels = document.querySelector(`.number-of-levels`).value;

    testTitle = titleValidation(title);
    testUrl = urlValidation(url);
    testQuestions = parseInt(nQuestions) >= 3;
    testLevels = parseInt(nLevels) >= 2;

    if (testTitle && testUrl && testQuestions && testLevels) {
        printQuestions();
        document.querySelector(`.quiz-beginning`).classList.add(`hide`);
        document.querySelector(`.questions-creation`).classList.remove(`hide`);

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
    <button type="button" class="red-button">Prosseguir para criar níveis</button>
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

function getQuizzes() {
    const promise = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes")
    promise.then(quizzesDisplay);
}

function quizzesDisplay(date) {
    let quizz = date;

    if (quizz != null) {
        //axibe os quizzes criados pelo usuário
        for (let i = 0; i<quizz.length; i++) {
            document.querySelector(".created-quizzes").innerHTML += `
            <div class="quizz">
            <img src="${quizz[i].image}" alt="">
            <p>${quizz[i].title}</p>
            </div>`
        }
    }else{

    }

    //exibe todos os quizzes
    for (let i = 0; i<quizz.length;i++) {
        document.querySelector(".all-quizzes").innerHTML += `
        <div class="quizz">
            <img src="${quizz[i].image}" alt="">
            <p>${quizz[i].title}</p>
        </div>`
    }
}

getQuizzes();