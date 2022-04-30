/* TODO: inserite il codice JavaScript necessario a completare il MHW! */
const CHECKED_IMAGE_PATH = 'images/checked.png';
const UNCHECKED_IMAGE_PATH = 'images/unchecked.png';

function emptyList(finalChoice) {
    if((finalChoice['one'] !== undefined) && (finalChoice['two'] !== undefined) && (finalChoice['three'] !== undefined )) return false;
    else return true;    
}

function result() {
    const title = document.querySelector('section#result div h3');
    const paragraph = document.querySelector('section#result div p');
    
    if(finalChoice['two'] === finalChoice['three']) {
        title.textContent = RESULTS_MAP[finalChoice['two']].title;
        paragraph.textContent = RESULTS_MAP[finalChoice['two']].contents;
    }

    else {
        title.textContent = RESULTS_MAP[finalChoice['one']].title;
        paragraph.textContent = RESULTS_MAP[finalChoice['one']].contents;
    }
}


function insertChoice(checked) {
    if(checked.dataset.questionId === 'one') finalChoice['one'] = checked.dataset.choiceId;
    if(checked.dataset.questionId === 'two') finalChoice['two'] = checked.dataset.choiceId;
    if(checked.dataset.questionId === 'three') finalChoice['three'] = checked.dataset.choiceId;
    
    console.log(finalChoice);
}

function playAgain(event) {
    delete finalChoice.one;
    delete finalChoice.two;
    delete finalChoice.three;
    
    const newMaskResult = document.querySelector('#result')
    const newChoices = document.querySelectorAll('.choice-grid div');
    
    newMaskResult.classList.add('mask');
    
    for(const newChoice of newChoices) {
        newChoice.classList.add('mask');
        const newCheckbox = newChoice.querySelector('img.checkbox');
        newCheckbox.src = UNCHECKED_IMAGE_PATH;
        newChoice.classList.remove('overlay');
        newChoice.classList.remove('new-background');
        newChoice.addEventListener('click', changeToChecked);
        newChoice.classList.remove('mask'); 
    }
    
    
}

function changeToChecked(event) {
    
    const checked = event.currentTarget;
    let empty = emptyList(finalChoice);
   
    if(empty){
        const imageChecked = checked.querySelector('.checkbox');
        imageChecked.src = CHECKED_IMAGE_PATH;
        checked.classList.add('new-background');
        checked.classList.remove('overlay');
        const indexToRemove = freeChoices.indexOf(checked);
        freeChoices.splice(indexToRemove, 1);
        for(const freeChoice of freeChoices){
            if(freeChoice.dataset.questionId === checked.dataset.questionId && freeChoice.dataset.choiceId !== checked.dataset.choiceID) {
                const imageNotChecked = freeChoice.querySelector('.checkbox');
                imageNotChecked.src = UNCHECKED_IMAGE_PATH;
                freeChoice.classList.add('overlay');
                freeChoice.classList.remove('new-background');
            }
        }
    
    freeChoices.push(checked);
    
    insertChoice(checked);
    empty = emptyList(finalChoice);  
    
    }

    if(!empty) {
        const maskResult = document.querySelector('#result.mask');
        const button = document.querySelector('#result div button')
        checked.removeEventListener('click', changeToChecked);
        button.addEventListener('click', playAgain);
        result();
        maskResult.classList.remove('mask');
    }

}


const freeChoices = [];
const finalChoice = {};
const choices = document.querySelectorAll('.choice-grid div');
for (const choice of choices){
        choice.addEventListener('click', changeToChecked);
        freeChoices.push(choice);
}

    


