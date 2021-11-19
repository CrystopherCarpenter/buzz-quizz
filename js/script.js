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

    testTitle = quizTitleValidation(quizz.title);
    testUrl = urlValidation(quizz.image);
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

function quizTitleValidation(title) {
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
    const questions = document.querySelector(`.questions-creation`);

    for (let i = 1; i <= nQuestions; i++) {
        questions.innerHTML += `
        <div class="questions-creation-board">
            <h2>Pergunta ${i}</h2><br>
            <ion-icon name="create-outline" onclick="editQuestion(this)"></ion-icon>
        </div>`;

    }
    questions.innerHTML += `
    <button type="button" class="red-button" onclick="questionsCreation()">Prosseguir para criar níveis</button>
    `;

    editQuestion(document.querySelector(`.questions-creation-board ion-icon`))
}

function editQuestion(element) {
    const question = element.parentElement;

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
    const questionsData = document.querySelectorAll(`.questions-creation-board input`);
    let question = { title: ``, color: ``, answers: [] };
    let answer = { text: ``, image: ``, isCorrectAnswer: `` }
    let aux;

    for (let i = 0; i < nQuestions; i++) {
        for (let j = 0; j < 10; j++) {
            aux = ((questionsData[(10 * i) + j]));

            if (j === 0) {
                if (aux.value.length >= 20) {
                    question.title = aux.value;

                } else {
                    alert(`Por favor, verifique e preencha os campos corretamente`)
                    return;
                }
            } else if (j === 1) {
                if (colorValidation(aux.value)) {
                    question.color = aux.value;
                    console.log(j, question)
                    console.log(j, answer)
                    console.log(j, quizz)
                } else {
                    alert(`Por favor, verifique e preencha os campos corretamente`)
                    return;
                }

            } else if (j === 2) {
                if (aux.value !== "" && aux.value !== null && aux.value !== undefined) {
                    answer.text = aux.value;
                    answer.isCorrectAnswer = true;
                } else {
                    alert(`Por favor, verifique e preencha os campos corretamente`)
                    return;
                }

            } else if (j === 3) {
                if (urlValidation(aux.value)) {
                    answer.image = aux.value
                    question.answers.push(answer);
                    console.log(j, question)
                    console.log(j, answer)
                    console.log(j, quizz)
                } else {
                    alert(`Por favor, verifique e preencha os campos corretamente`)
                    return;
                }

            } else if (j === 4) {
                if (aux.value !== "" && aux.value !== null && aux.value !== undefined) {
                    answer.text = aux.value;
                    answer.isCorrectAnswer = false;
                }

            } else if (j === 5) {
                if (urlValidation(aux.value)) {
                    answer.image = aux.value
                    question.answers.push(answer);
                    console.log(j, question)
                    console.log(j, answer)
                    console.log(j, quizz)
                }

            } else if (j === 6) {
                if (aux.value !== "" && aux.value !== null && aux.value !== undefined) {
                    answer.text = aux.value;
                    answer.isCorrectAnswer = false;
                }
            } else if (j === 7) {
                if (urlValidation(aux.value)) {
                    answer.image = aux.value
                    question.answers.push(answer);
                    console.log(j, question)
                    console.log(j, answer)
                    console.log(j, quizz)
                }
            } else if (j === 8) {
                if (aux.value !== "" && aux.value !== null && aux.value !== undefined) {
                    answer.text = aux.value;
                    answer.isCorrectAnswer = false;
                }
            } else if (j === 9) {
                if (urlValidation(aux.value)) {
                    answer.image = aux.value
                    question.answers.push(answer);
                    console.log(j, question)
                    console.log(j, answer)
                    console.log(j, quizz)
                }
            }
            console.log(`fora dos if`, question)
            console.log(`fora dos if`, answer)
            console.log(`fora dos if`, quizz)

            /* switch (j) {
                 case 0:
                     if (aux.value.length >= 20) {
                         question.title = aux.value;
                     } else {
                         alert(`Por favor, verifique e preencha os campos corretamente`)
                         return;
                     }
                     break;
 
                 case 1:
                     if (colorValidation(aux.value)) {
                         question.color = aux.value;
                     } else {
                         alert(`Por favor, verifique e preencha os campos corretamente`)
                         return;
                     }
                     break;
 
                 case 2:
                     if (aux.value !== "" && aux.value !== null && aux.value !== undefined) {
                         answer.text = aux.value;
                         answer.isCorrectAnswer = true;
                     } else {
                         alert(`Por favor, verifique e preencha os campos corretamente`)
                         return;
                     }
                     break;
 
                 case 3:
                     if (urlValidation(aux.value)) {
                         answer.image = aux.value
                         question.answers.push(answer);
                     } else {
                         alert(`Por favor, verifique e preencha os campos corretamente`)
                         return;
                     }
                     break;
 
                 case 4:
                     if (aux.value !== "" && aux.value !== null && aux.value !== undefined) {
                         answer.text = aux.value;
                         answer.isCorrectAnswer = false;
                     } break;
 
                 case 5:
                     if (urlValidation(aux.value)) {
                         answer.image = aux.value
                         question.answers.push(answer);
                     } break;
 
                 case 6:
                     if (aux.value !== "" && aux.value !== null && aux.value !== undefined) {
                         answer.text = aux.value;
                         answer.isCorrectAnswer = false;
                     } break;
 
                 case 7:
                     if (urlValidation(aux.value)) {
                         answer.image = aux.value
                         question.answers.push(answer);
                     } break;
 
                 case 8:
                     if (aux.value !== "" && aux.value !== null && aux.value !== undefined) {
                         answer.text = aux.value;
                         answer.isCorrectAnswer = false;
                     } break;
 
                 case 9:
                     if (urlValidation(aux.value)) {
                         answer.image = aux.value
                         question.answers.push(answer);
                     }
                     break;
 
                 default:
                     break;
             }*/

        }
        /* if (question.answers[1] === null || question.answers[1] === undefined || question.answers[1] === ``) {
           alert(`Por favor, verifique e preencha os campos corretamente sem incorreta`)
         return;
       }*/
        quizz.questions.push(question);
        console.log(`fora do loop j`, question)
        console.log(`fora do loop j`, answer)
        console.log(`fora do loop j`, quizz)

    }
    console.log(`fora do loop i`, question)
    console.log(`fora do loop i`, answer)
    console.log(`fora do loop i`, quizz)

}

function colorValidation(color) {
    const regExp = /[#0-9A-F]{7}/gi;

    return (regExp.test(color))

    regExp.lastIndex = 0;
}
function getQuizzes() {
    const promise = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes")
    promise.then(quizzesDisplay);
}

function quizzesDisplay(date) {
    let quizz = date;

    if (quizz != null) {
        //axibe os quizzes criados pelo usuário
        for (let i = 0; i < quizz.length; i++) {
            document.querySelector(".created-quizzes").innerHTML += `
            <div class="quizz">
            <img src="${quizz[i].image}" alt="">
            <p>${quizz[i].title}</p>
            </div>`
        }
    } else {

    }

    //exibe todos os quizzes
    for (let i = 0; i < quizz.length; i++) {
        document.querySelector(".all-quizzes").innerHTML += `
        <div class="quizz">
            <img src="${quizz[i].image}" alt="">
            <p>${quizz[i].title}</p>
        </div>`
    }
}

getQuizzes();
