let title;
let url;
let nQuestions;
let nLevels;

function infoValidation() {
    let testTitle;
    let testUrl;
    let testLevels;
    let testQuestions;

    title = document.getElementById(`quiz-title`).value;
    url = document.getElementById(`quiz-image-URL`).value;
    nQuestions = document.getElementById(`number-of-questions`).value;
    nLevels = document.getElementById(`number-of-levels`).value;

    testTitle = titleValidation(title);
    testUrl = urlValidation(url);
    testQuestions = parseInt(nQuestions) >= 3;
    testLevels = parseInt(nLevels) >= 2;

    if (testTitle && testUrl && testQuestions && testLevels) {
        document.querySelector(`.quiz-beginning`).classList.add(`hide`);
        document.querySelector(`.questions-creation`).classList.remove(`hide`);

        document.getElementById(`quiz-title`).value = ``;
        document.getElementById(`quiz-image-URL`).value = ``;
        document.getElementById(`number-of-questions`).value = ``;
        document.getElementById(`number-of-levels`).value = ``;
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