const buttons = document.querySelectorAll("button");

const show = document.querySelector(".show");

buttons.forEach(function(button) {
    button.addEventListener('click', calculate);
});

function calculate(event) {
    // console.log(event)
    const clickedButtonValue = event.target.value;
   
    if (clickedButtonValue === '=') {
        if (show.value !== '' ) {
            show.value = eval(show.value);
        }
    } else if (clickedButtonValue == 'C') {
            show.value = '';
    } else {
            show.value += clickedButtonValue;
    }
}

