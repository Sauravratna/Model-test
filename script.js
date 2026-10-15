// আপনার জেনারেট করা Web App URL এখানে যুক্ত আছে
const scriptURL = 'https://script.google.com/macros/s/AKfycbzF1wBZfzdHmVmnPizbPt4njVJK8fZVHVecoXeodCgJ1FD2oP9kiBn8QJz9zwvpKXU_/exec';

const questions = [
    {
        question: "বাংলাদেশের জাতীয় ফুলের নাম কী?",
        options: ["গোলাপ", "শাপলা", "পদ্ম", "জবা"],
        answer: 1 // সঠিক উত্তরের ইনডেক্স (0 থেকে শুরু)
    },
    {
        question: "সূর্য কোন দিক থেকে ওঠে?",
        options: ["পশ্চিম", "উত্তর", "পূর্ব", "দক্ষিণ"],
        answer: 2
    },
    {
        question: "কোয়ান্টাম মেকানিক্সে প্ল্যাঙ্কের ধ্রুবকের প্রতীক কী?",
        options: ["h", "c", "e", "m"],
        answer: 0
    }
];

let currentQuestionIndex = 0;
let score = 0;
let studentAnswers = [];
let studentData = {};
let timer;
let timeLeft = 120; // ২ মিনিট সময় (সেকেন্ডে)

const loginForm = document.getElementById('login-form');
const loginScreen = document.getElementById('login-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const questionContainer = document.getElementById('question-container');
const timeSpan = document.getElementById('time');

loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    studentData.name = document.getElementById('student-name').value;
    studentData.roll = document.getElementById('student-roll').value;
    studentData.passcode = document.getElementById('student-pass').value;

    // পাসকোড যাচাই
    if(studentData.passcode !== "1234") {
        alert("ভুল পাসকোড! সঠিক পাসকোড দিয়ে প্রবেশ করুন।");
        return;
    }

    loginScreen.style.display = 'none';
    quizScreen.style.display = 'block';
    
    startTimer();
    loadQuestion();
});

function startTimer() {
    timer = setInterval(() => {
        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;
        timeSpan.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            submitQuiz();
        }
        timeLeft--;
    }, 1000);
}

function loadQuestion() {
    let q = questions[currentQuestionIndex];
    questionContainer.innerHTML = `
        <p><strong>প্রশ্ন ${currentQuestionIndex + 1}: ${q.question}</strong></p>
        ${q.options.map((opt, index) => `
            <button class="option-btn" onclick="selectOption(${index})">${opt}</button>
        `).join('')}
    `;
}

let selectedOptionIndex = null;
window.selectOption = function(index) {
    selectedOptionIndex = index;
    let buttons = document.querySelectorAll('.option-btn');
    buttons.forEach((btn, idx) => {
        if(idx === index) {
            btn.classList.add('selected');
        } else {
            btn.classList.remove('selected');
        }
    });
}

window.nextQuestion = function() {
    if(selectedOptionIndex === null) {
        alert("দয়া করে একটি উত্তর সিলেক্ট করুন!");
        return;
    }
    
    // উত্তর সেভ করা
    studentAnswers.push({
        question: questions[currentQuestionIndex].question,
        selected: questions[currentQuestionIndex].options[selectedOptionIndex],
        correct: selectedOptionIndex === questions[currentQuestionIndex].answer
    });

    if(selectedOptionIndex === questions[currentQuestionIndex].answer) {
        score++;
    }

    currentQuestionIndex++;
    selectedOptionIndex = null;

    if(currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        clearInterval(timer);
        submitQuiz();
    }
}

function submitQuiz() {
    quizScreen.style.display = 'none';
    resultScreen.style.display = 'block';
    
    document.getElementById('score-text').textContent = `আপনি ${questions.length}টির মধ্যে ${score} নম্বর পেয়েছেন।`;

    let payload = {
        name: studentData.name,
        roll: studentData.roll,
        passcode: studentData.passcode,
        score: `${score}/${questions.length}`,
        answers: studentAnswers
    };

    // Google Sheets-এ ডেটা পাঠানো
    fetch(scriptURL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    }).then(() => {
        console.log('Success');
    }).catch(error => {
        console.error('Error!', error.message);
    });
}
