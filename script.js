let timeDiv = document.querySelector("#timeDiv");
let sectionHeading = document.querySelector("#section-heading");
let sectionContent = document.querySelector("#section-content");
let buttonDiv = document.querySelector("#button-div");
let pointsDiv = document.querySelector("#points-div");
let interactionDiv = document.querySelector("#interaction-div");
let pageButton = document.createElement("button");
let scoreButton = document.createElement("button");
let initialEntry = document.createElement("input");
let previousScores = document.createElement("span");
let storedUserName = localStorage.getItem("code-quiz-name");
let secondsLeft = 5;
let stopTimer;
let buttonState = ["startButton", "submitButton", "menuButton"];
let pointsEarned = 0;
let initials;

if (storedUserName == null) {
    storedUserName = "Guest";
    localStorage.setItem("code-quiz-name", "Guest");
}

window.addEventListener("load", function (e) {
    e.preventDefault();
    console.log('page is fully loaded');
    sectionHeading.textContent = "Instructions";
    sectionContent.textContent = "Hello, " + storedUserName + ", welcome to the Code Quiz! To begin, please press the 'start' button.";
    pageButton.textContent = "Begin Quiz";
    pageButton.setAttribute("class", "btn btn-primary my-1");
    pageButton.setAttribute("id", "0");
    buttonDiv.appendChild(pageButton);
    stopTimer = false;
    pointsDiv.textContent = "";
});


pageButton.addEventListener("click", function (event) {
    if (event.target.matches("button")) {
        event.preventDefault;

        let quizState = buttonState[event.target.id];
        if (quizState === "startButton") {
            console.log("beginning quiz");
            pageButton.setAttribute("id", "1");
            pageButton.textContent = "submit";
            sectionHeading.textContent = "Question 1";
            sectionContent.textContent = "Lorem question something";
            interactionDiv.textContent = "";
            startTimer();
            stopTimer = false;
            pointsDiv.textContent = "Points: " + pointsEarned;
        }
        else if (quizState === "submitButton") {
            console.log("submitting answer");
            pageButton.setAttribute("id", "2");
            pageButton.textContent = "Menu";
            sectionHeading.textContent = "Game Over";
            sectionContent.textContent = "You earned " + pointsEarned + " points. Submit your score below.";
            stopTimer = true;
            timeDiv.textContent = "";
            pointsDiv.textContent = "";
            scoreButton.textContent = "Submit Score";
            scoreButton.setAttribute("class", "btn btn-primary mx-1 my-1");
            scoreButton.setAttribute("style", "display:inline");
            scoreButton.setAttribute("id", "3");
            buttonDiv.appendChild(scoreButton);
            initialEntry.setAttribute("type", "text");
            initialEntry.setAttribute("placeholder", "enter initials");
            initialEntry.setAttribute("maxlength", "2");
            initialEntry.setAttribute("style", "display:inline");
            initialEntry.setAttribute("class", "form-control");
            initialEntry.setAttribute("id", "textInitials");
            interactionDiv.appendChild(initialEntry);
            scoreButton.addEventListener("click", function (event) {
                if (event.target.id = "scoreButton") {
                    initials = document.querySelector("#textInitials").value;
                    console.log("saved initials are " + initials);
                    localStorage.setItem("code-quiz-name", initials);
                    localStorage.setItem("pointsEarned", pointsEarned);
                }
            });
        }
        else if (quizState === "menuButton") {
            console.log("going to menu");
            pageButton.setAttribute("id", "0");
            pageButton.textContent = "Begin Quiz";
            sectionHeading.textContent = "Instructions";
            sectionContent.textContent = "Hello, " + initials + ", welcome to the Code Quiz! To begin, please press the 'start' button.";
            pointsDiv.textContent = "";
            scoreButton.setAttribute("style", "display:none");
            initialEntry.setAttribute("style", "display:none");
            previousScores.textContent = "Previous Score: " + pointsEarned + ", " + initials;
            interactionDiv.prepend(previousScores);
            stopTimer = true;
        }
    }
})

function startTimer() {
    timeDiv.textContent = secondsLeft + " seconds left";
    secondsLeft--;
    let timerInterval = setInterval(function () {
        if ((stopTimer == false) && (secondsLeft !== 0)) {
            timeDiv.textContent = secondsLeft + " seconds left";
            secondsLeft--;
        } else if (stopTimer == true) {
            clearInterval(timerInterval);
            timeDiv.textContent = "";
            secondsLeft = 5;
            console.log("stop time!");
        }
        else if (secondsLeft <= 0) {
            clearInterval(timerInterval);
            secondsLeft = 5;
            timeDiv.textContent = "";
            console.log("out of time!");
            pageButton.setAttribute("id", "2");
            pageButton.textContent = "Menu";
            sectionHeading.textContent = "Game Over";
            sectionContent.textContent = "You earned " + pointsEarned + " points. Submit your score below.";
            stopTimer = true;
        }
    }, 1000);
}