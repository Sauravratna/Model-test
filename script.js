// আপনার Google Apps Script-এর Web App URL
const scriptURL = 'https://script.google.com/macros/s/AKfycbzF1wBZfzdHmVmnPizbPt4njVJK8fZVHVecoXeodCgJ1FD2oP9kiBn8QJz9zwvpKXU_/exec';

// এডমিশন স্ট্যান্ডার্ড ৫০টি Noun-এর প্রশ্ন
const questions = [
    { question: "What kind of noun is 'Cattle'?", options: ["Proper", "Common", "Collective", "Material"], answer: 2, explanation: "'Cattle' একটি Collective Noun (গবাদিপশুর সমষ্টি)।" },
    { question: "The word 'Water' is a — noun.", options: ["Proper", "Common", "Material", "Abstract"], answer: 2, explanation: "'Water' একটি Material Noun কারণ এটি পরিমাপ করা যায় কিন্তু গণনা করা যায় না।" },
    { question: "What is the noun form of the word 'Wise'?", options: ["Wisely", "Wisdom", "Wisen", "Wiser"], answer: 1, explanation: "'Wise' (সচেতন/জ্ঞানী)-এর Noun রূপ হলো 'Wisdom' (জ্ঞান)।" },
    { question: "The jury — divided in their opinions.", options: ["was", "were", "is", "has"], answer: 1, explanation: "Collective noun-এ মতবিরোধ বোঝালে verb প্লুরাল (were) হয়।" },
    { question: "What kind of noun is 'Kindness'?", options: ["Proper", "Common", "Material", "Abstract"], answer: 3, explanation: "'Kindness' একটি গুণ বা ভাববাচক নাম, তাই এটি Abstract Noun।" },
    { question: "A flock of sheep. Here 'Flock' is a — noun.", options: ["Proper", "Common", "Collective", "Material"], answer: 2, explanation: "'Flock' একটি Collective Noun।" },
    { question: "What is the noun form of 'Arrive'?", options: ["Arrival", "Arival", "Arrival", "Arrivement"], answer: 0, explanation: "'Arrive'-এর Noun হলো 'Arrival' (আগমন)।" },
    { question: "The poverty is a curse. (Identify the error or noun type)", options: ["Correct", "Remove 'The'", "Change to poor", "Abstract noun error"], answer: 1, explanation: "Abstract Noun-এর আগে সাধারণত 'The' বসে না।" },
    { question: "What is the noun form of 'Know'?", options: ["Known", "Knowledge", "Knowing", "Knowledgeable"], answer: 1, explanation: "'Know'-এর Noun রূপ হলো 'Knowledge'।" },
    { question: "Poetry is a form of art. Here 'Poetry' is — noun.", options: ["Proper", "Common", "Material", "Mass/Uncountable Common"], answer: 3, explanation: "Poetry একটি Uncountable Noun (মাঝে মাঝে Mass Noun বলা হয়)।" },
    { question: "What is the plural form of 'Tooth'?", options: ["Tooths", "Teeth", "Teeths", "Toothes"], answer: 1, explanation: "'Tooth'-এর প্লুরাল ফর্ম হলো 'Teeth'।" },
    { question: "Which one is a Proper Noun?", options: ["Book", "Student", "Dhaka", "Class"], answer: 2, explanation: "'Dhaka' নির্দিষ্ট একটি শহরের নাম, তাই এটি Proper Noun।" },
    { question: "What is the noun form of 'Broad'?", options: ["Broaden", "Breadth", "Broadly", "Width"], answer: 1, explanation: "'Broad'-এর Noun রূপ হলো 'Breadth' (প্রস্থ)।" },
    { question: "The Arabian Nights — an interesting book.", options: ["is", "are", "were", "have"], answer: 0, explanation: "বইয়ের নাম দেখতে প্লুরাল হলেও এটি একটি সিঙ্গুলার Noun, তাই verb 'is' হবে।" },
    { question: "What kind of noun is 'Iron'?", options: ["Common", "Proper", "Material", "Abstract"], answer: 2, explanation: "'Iron' একটি ধাতু বা Material Noun।" },
    { question: "The scenery of Bangladesh — charming.", options: ["are", "is", "were", "have"], answer: 1, explanation: "'Scenery' একটি Uncountable Noun এবং এটি সবসময় Singular হিসেবে গণ্য হয়।" },
    { question: "What is the feminine gender of 'Bachelor'?", options: ["Spinster", "Maid", "Wife", "Lady"], answer: 0, explanation: "'Bachelor'-এর বিপরীত বা ফেমিনিন হলো 'Spinster' (অবিবাহিত নারী)।" },
    { question: "Identify the noun in the sentence: 'Honesty is the best policy.'", options: ["Honesty", "Best", "Policy", "Both A & C"], answer: 3, explanation: "'Honesty' এবং 'Policy' দুটিই Noun।" },
    { question: "What is the plural of 'Ox'?", options: ["Oxes", "Oxen", "Oxens", "Ox"], answer: 1, explanation: "'Ox'-এর প্লুরাল হলো 'Oxen'।" },
    { question: "A library of books. Here 'Library' is a — noun.", options: ["Proper", "Common", "Collective", "Abstract"], answer: 2, explanation: "'Library' হলো বইয়ের সমষ্টি, তাই এটি Collective Noun।" },
    { question: "What is the noun form of 'Strong'?", options: ["Strongly", "Strength", "Strengthen", "Strongness"], answer: 1, explanation: "'Strong'-এর Noun হলো 'Strength'।" },
    { question: "Mathematics — a difficult subject.", options: ["are", "is", "were", "have"], answer: 1, explanation: "বিষয়ের নাম দেখতে প্লুরাল মনে হলেও এগুলো Singular Noun।" },
    { question: "What is the plural form of 'Formula'?", options: ["Formulas", "Formulae", "Formulas/Formulae", "Formuli"], answer: 2, explanation: "Formula-এর প্লুরাল Formulas বা Formulae উভয়ই হতে পারে।" },
    { question: "The crowd — very big.", options: ["were", "was", "are", "have"], answer: 1, explanation: "'Crowd' একটি Collective Noun যা এখানে একক ইউনিট হিসেবে বোঝানো হয়েছে।" },
    { question: "What kind of noun is 'Family'?", options: ["Proper", "Common", "Collective", "Material"], answer: 2, explanation: "সদস্যদের সমষ্টি হিসেবে 'Family' একটি Collective Noun।" },
    { question: "What is the noun form of 'Free'?", options: ["Freedom", "Freely", "Freeing", "Release"], answer: 0, explanation: "'Free'-এর Noun রূপ হলো 'Freedom'।" },
    { question: "He gave me a good piece of —.", options: ["advices", "advice", "advises", "advicing"], answer: 1, explanation: "'Advice' একটি Uncountable Noun, এর সাথে সরাসরি s/es যুক্ত হয় না।" },
    { question: "What is the masculine gender of 'Duck'?", options: ["Drake", "Ducker", "Gander", "Stag"], answer: 0, explanation: "হাঁসের নর রূপ হলো 'Drake'।" },
    { question: "The cattle — grazing in the field.", options: ["is", "are", "was", "has"], answer: 1, explanation: "'Cattle' দেখতে সিঙ্গুলার হলেও এটি সর্বদা Plural Noun হিসেবে ব্যবহৃত হয়।" },
    { question: "What is the noun form of 'Long'?", options: ["Length", "Longer", "Lengthen", "Longness"], answer: 0, explanation: "'Long'-এর Noun হলো 'Length'।" },
    { question: "Which one is a Material Noun?", options: ["Gold", "Air", "Water", "All of these"], answer: 3, explanation: "গোল্ড, এয়ার, ওয়াটার—সবগুলোই Material Noun-এর অন্তর্ভুক্ত।" },
    { question: "What is the plural of 'Crisis'?", options: ["Crisises", "Crises", "Crisiss", "Crisi"], answer: 1, explanation: "Crisis শব্দের শেষ অক্ষর is পরিবর্তন করে es (Crises) করতে হয়।" },
    { question: "She has done a great —.", options: ["mischiefs", "mischief", "mischieves", "mischiefes"], answer: 1, explanation: "'Mischief' একটি Uncountable Noun।" },
    { question: "What is the noun form of 'Act'?", options: ["Action", "Active", "Actively", "Activate"], answer: 0, explanation: "'Act'-এর Noun হলো 'Action'।" },
    { question: "A — of robbers.", options: ["Pack", "Gang", "Herd", "Flock"], answer: 1, explanation: "ডাকাতের দলকে 'Gang' বলা হয়।" },
    { question: "What is the plural of 'Radius'?", options: ["Radiuses", "Radii", "Radia", "Radius"], answer: 1, explanation: "'Radius'-এর ল্যাটিন প্লুরাল হলো 'Radii'।" },
    { question: "The furniture — made of wood.", options: ["were", "are", "is", "have"], answer: 1, explanation: "'Furniture' একটি Uncountable Noun এবং এটি Singular হিসেবে গণ্য হয়।" },
    { question: "What kind of noun is 'Girl'?", options: ["Proper", "Common", "Collective", "Abstract"], answer: 1, explanation: "'Girl' দ্বারা যেকোনো মেয়েকে বোঝায়, তাই এটি Common Noun।" },
    { question: "What is the noun form of 'Poverty' base adjective?", options: ["Poor", "Poorer", "Poorest", "Impoverished"], answer: 0, explanation: "'Poverty' শব্দটির মূল Adjective রূপ হলো 'Poor'।" },
    { question: "Ten miles — a long distance.", options: ["are", "is", "were", "have"], answer: 1, explanation: "নির্দিষ্ট দূরত্ব, সময় বা পরিমাণ একসাথে বোঝালে Singular Verb বসে।" },
    { question: "What is the feminine gender of 'Author'?", options: ["Authoress", "Author", "Authoress/Author", "Lady-author"], answer: 2, explanation: "আধুনিক ইংরেজিতে Author বা Authoress উভয়ই ব্যবহার করা হয়।" },
    { question: "His hair — black.", options: ["are", "is", "were", "have"], answer: 1, explanation: "সামগ্রিক অর্থে 'Hair' একটি Uncountable Noun এবং Singular হিসেবে ব্যবহৃত হয়।" },
    { question: "What is the noun form of 'Succeed'?", options: ["Success", "Successful", "Successfully", "Succession"], answer: 0, explanation: "'Succeed'-এর Noun হলো 'Success'।" },
    { question: "A — of players.", options: ["Team", "Crowd", "Class", "Panel"], answer: 0, explanation: "খেলোয়াড়দের সমষ্টিকে 'Team' বলা হয়।" },
    { question: "What is the plural of 'Mouse'?", options: ["Mouses", "Mice", "Mices", "Meese"], answer: 1, explanation: "'Mouse'-এর প্লুরাল হলো 'Mice'।" },
    { question: "The committee — reached a decision.", options: ["have", "has", "were", "are"], answer: 1, explanation: "কমিটি একমত হওয়ায় এখানে Singular Verb (has) হবে।" },
    { question: "What is the noun form of 'Young'?", options: ["Youth", "Younger", "Youthen", "Youngness"], answer: 0, explanation: "'Young'-এর Noun রূপ হলো 'Youth'।" },
    { question: "Which of the following is a Common Noun?", options: ["Student", "Army", "Information", "Beauty"], answer: 0, explanation: "'Student' হলো Common Noun।" },
    { question: "What is the plural of 'Phenomenon'?", options: ["Phenomenons", "Phenomena", "Phenomenas", "Phenomeni"], answer: 1, explanation: "'Phenomenon'-এর প্লুরাল হলো 'Phenomena'।" },
    { question: "Bread — my favourite food.", options: ["are", "is", "were", "have"], answer: 1, explanation: "'Bread' একটি Uncountable Noun, তাই এর সাথে 'is' বসবে।" }
];

let currentQuestionIndex = 0;
let score = 0;
let studentAnswers = [];
let studentData = {};
let timer;
let timeLeft = 1800; // ৩০ মিনিট (১৮০০ সেকেন্ড)
let selectedOptionIndex = null;

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
        <p><strong>প্রশ্ন ${currentQuestionIndex + 1} / ${questions.length}: ${q.question}</strong></p>
        ${q.options.map((opt, index) => `
            <button class="option-btn" onclick="selectOption(${index})">${opt}</button>
        `).join('')}
    `;
}

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
    
    let q = questions[currentQuestionIndex];
    let isCorrect = (selectedOptionIndex === q.answer);

    // প্রতিটি উত্তরের তথ্য রেকর্ড রাখা
    studentAnswers.push({
        questionNumber: currentQuestionIndex + 1,
        question: q.question,
        selected: q.options[selectedOptionIndex],
        correctAnswer: q.options[q.answer],
        isCorrect: isCorrect,
        explanation: q.explanation
    });

    if(isCorrect) {
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
    
    document.getElementById('score-text').innerHTML = `
        <h3>আপনার মোট প্রাপ্ত নম্বর: <span style="color: #007bff;">${score}</span> / ${questions.length}</h3>
    `;

    // ভুল ও সঠিক উত্তর রিভিউ করার সেকশন তৈরি
    let reviewHtml = "<h4 style='margin-top:20px; border-bottom: 2px solid #ccc; padding-bottom: 5px;'>উত্তরপত্র ও ব্যাখ্যা:</h4>";
    
    studentAnswers.forEach((ans) => {
        let bgColor = ans.isCorrect ? '#d4edda' : '#f8d7da';
        let borderColor = ans.isCorrect ? '#28a745' : '#dc3545';
        let statusText = ans.isCorrect ? "✅ সঠিক উত্তর" : "❌ ভুল উত্তর";

        reviewHtml += `
            <div style="margin-bottom: 15px; padding: 12px; border-left: 5px solid ${borderColor}; background-color: ${bgColor}; border-radius: 4px; text-align: left;">
                <p style="margin: 0 0 5px 0;"><strong>${ans.questionNumber}. ${ans.question}</strong></p>
                <p style="margin: 3px 0;">স্ট্যাটাস: <strong>${statusText}</strong></p>
                <p style="margin: 3px 0;">আপনার উত্তর: <span style="color: ${ans.isCorrect ? 'green' : 'red'};">${ans.selected}</span></p>
                ${!ans.isCorrect ? `<p style="margin: 3px 0;">সঠিক উত্তর: <strong style="color: green;">${ans.correctAnswer}</strong></p>` : ''}
                <p style="margin: 5px 0 0 0; font-size: 14px; color: #555;">💡 <strong>ব্যাখ্যা:</strong> ${ans.explanation}</p>
            </div>
        `;
    });

    document.getElementById('question-container-review').innerHTML = reviewHtml;

    let payload = {
        name: studentData.name,
        roll: studentData.roll,
        passcode: studentData.passcode,
        score: `${score}/${questions.length}`,
        answers: studentAnswers
    };

    // Google Sheets-এ সেভ করা
    fetch(scriptURL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    }).catch(error => console.error('Error!', error.message));
     }
     
