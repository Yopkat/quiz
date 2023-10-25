
const quizData = [
    {
        question: "Which Language runs on a web browser?",
        a: "Java",
        b: "C",
        c: "Python",
        d: "Javascript",
        correct: "d",
    },
    {
        question: "What does CSS stand for?",
        a: "central style sheets",
        b: "cascading style sheet",
        c: "cascading simple sheet",
        d: "cars suvs sailboats",
        correct: "b",
    },
    {
        question: "What does HTML stand for?",
        a: "hyper text markup language",
        b: "hypertext markdown language",
        c: "hyperloop machine language",
        d: "helicopters terminals motorboats lamborghini",
        correct: "a",
    },
    {
        question: "What year was JavaScript launched?",
        a: "1996",
        b: "1995",
        c: "1994",
        d: "none of the above",
        correct: "b",
    },
    {
        question: "who is the owner of facebook?",
        a: "Billgates",
        b: "Markzugaberg",
        c: "Elon musk",
        d: "Apple",
        correct: "b",
    },
    {
        question: "What is the Meaning of POS?",
        a: "power of services",
        b: "prince of sudan",
        c: "point of sale",
        d: "power offerring services",
        correct: "c",
    },
    {
        question: "Who invented Python Programming Language?",
        a: "Microsoft",
        b: "Guido van rossum",
        c: "Michelle Faraday",
        d: "none of the above",
        correct: "b",
    },
    {
        question: "What is ISP ?",
        a: "inspector service of police",
        b: "international school project",
        c: "internet service provider",
        d: "intern service project",
        correct: "c",
    },
];

const quiz = document.getElementById("quiz");
const answerElements = document.querySelectorAll(".answer");
const questionElement = document.getElementById("question");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const submitButton = document.getElementById("submit");
let currentQuiz = 0;
let score = 0;

const deselectAnswers = () => {
    answerElements.forEach((answer) => (answer.checked = false));
};

const getSelected = () => {
    let answer;
    answerElements.forEach((answerElement) => {
        if (answerElement.checked) answer = answerElement.id;
    });
    return answer;
};

const loadQuiz = () => {
    deselectAnswers();
    const currentQuizData = quizData[currentQuiz];
    questionElement.innerText = currentQuizData.question;
    a_text.innerText = currentQuizData.a;
    b_text.innerText = currentQuizData.b;
    c_text.innerText = currentQuizData.c;
    d_text.innerText = currentQuizData.d;
};

loadQuiz();

submitButton.addEventListener("click", () => {
    const answer = getSelected();
    if (answer) {
        if (answer === quizData[currentQuiz].correct) {
            score++;
        }

        if (currentQuiz === quizData.length - 1) {
            quiz.innerHTML = `<h2>You answered ${score}/${quizData.length} questions correctly</h2>
            <button onclick="location.reload()">Play Again</button>`;
        } else {
            currentQuiz++;
            loadQuiz();
        }
    }
});

