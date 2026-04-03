const letters = document.querySelectorAll(".Scoreboard-letter")
const loadingDiv = document.querySelector(".info_bar")
const ANSWER_LENGTH = 5;

async function init() {

    let currentGuess = '';
    let currentRow = '0';

    const res = await fetch("https://words.dev-apis.com/word-of-the-day")
    const resObj = await res.json();
    const word = resObj.word.toUpperCase();
    const wordParts = word.split("")
    setLoading(false)

    console.log(word);

    function addLetter(letter) {
        if (currentGuess.length < ANSWER_LENGTH) {
            currentGuess += letter;

        } else {

            currentGuess = currentGuess.substring(0, currentGuess.length - 1) + letter;
        }
        letters[ANSWER_LENGTH * currentRow + currentGuess.length - 1].innerText = letter;
    }
    async function commit() {
        if (currentGuess.length != ANSWER_LENGTH) {
            //do nothing
            return
        }

        // TODO validate the word
        const guessParts = currentGuess.split("")

        for (let i = 0; i < ANSWER_LENGTH; i++) {
            if (guessParts[i] === wordParts[i]) {
                letters[currentRow * ANSWER_LENGTH + i].classList.add("correct")

            }

        }
        // TODO do all the marking correct , close , wrong
        // TODO did they win or lose
        currentRow++;
        currentGuess = '';
    }

    function backspace() {
        currentGuess = currentGuess.substring(0, currentGuess.length - 1);
        letters[ANSWER_LENGTH * currentRow + currentGuess.length].innerText = "";


    }



    document.addEventListener('keydown', function handleKeypress(event) {



        const action = event.key;
        console.log(action);

        if (action === 'Enter') {
            commit();
        } else if (action === 'Backspace') {
            backspace();
        } else if (isLetter(action)) {
            addLetter(action.toUpperCase());
        } else {
            //do nothing
        }

    });


}

function isLetter(letter) {
    return /^[a-zA-Z]$/.test(letter)

}

function setLoading(isLoading) {
    loadingDiv.classList.toggle("show", isLoading)

}

init();