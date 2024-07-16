const questions = [
  {
    text: "Which of the following activities do you enjoy the most?",
    options: [
      { value: "a", label: "Creating art or design work" },
      { value: "b", label: "Working with numbers and data" },
      { value: "c", label: "Engaging in physical activities or sports" },
      { value: "d", label: "Solving puzzles and logical problems" }
    ]
  },
  {
    text: "What type of books or magazines do you enjoy reading?",
    options: [
      { value: "a", label: "Fiction and literature" },
      { value: "b", label: "Science and technology" },
      { value: "c", label: "Biographies and real-life stories" },
      { value: "d", label: "Art and design publications" }
    ]
  },
  {
    text: "Which school subjects do you excel in?",
    options: [
      { value: "a", label: "Art and design" },
      { value: "b", label: "Mathematics and physics" },
      { value: "c", label: "Physical education" },
      { value: "d", label: "Computer science" }
    ]
  },
  {
    text: "How do you prefer to spend your free time?",
    options: [
      { value: "a", label: "Creating artwork or crafts" },
      { value: "b", label: "Playing team sports or individual sports" },
      { value: "c", label: "Exploring new technology or coding" },
      { value: "d", label: "Reading books or researching online" }
    ]
  },
  {
    text: "What are your favorite hobbies?",
    options: [
      { value: "a", label: "Drawing, painting, or sculpting" },
      { value: "b", label: "Playing musical instruments or singing" },
      { value: "c", label: "Cooking or baking" },
      { value: "d", label: "Playing video games or programming" }
    ]
  },
  {
    text: "Which of these activities do you find most enjoyable?",
    options: [
      { value: "a", label: "Creating visual designs or multimedia projects" },
      { value: "b", label: "Participating in team competitions or games" },
      { value: "c", label: "Solving puzzles, coding challenges, or tinkering with electronics" },
      { value: "d", label: "Experimenting with new recipes or cooking techniques" }
    ]
  },
  {
    text: "What type of events or activities do you look forward to the most?",
    options: [
      { value: "a", label: "Art exhibitions or creative workshops" },
      { value: "b", label: "Music concerts or performances" },
      { value: "c", label: "Sporting events or tournaments" },
      { value: "d", label: "Tech conferences or hackathons" }
    ]
  },
  {
    text: "How do you prefer to express yourself?",
    options: [
      { value: "a", label: "Through visual arts, such as drawing or photography" },
      { value: "b", label: "Through music, dance, or performing arts" },
      { value: "c", label: "Through physical movement and athleticism" },
      { value: "d", label: "Through writing, speaking, or presenting" }
    ]
  },
  {
    text: "What kind of projects do you enjoy working on?",
    options: [
      { value: "a", label: "Designing and illustrating posters, logos, or animations" },
      { value: "b", label: "Building and constructing physical objects or models" },
      { value: "c", label: "Developing software applications or websites" },
      { value: "d", label: "Experimenting with scientific experiments or research" }
    ]
  },
  {
    text: "Which of the following career paths interests you the most?",
    options: [
      { value: "a", label: "Visual artist or graphic designer" },
      { value: "b", label: "Musician, singer, or performer" },
      { value: "c", label: "Athlete, coach, or sports analyst" },
      { value: "d", label: "Scientist, engineer, or researcher" }
    ]
  }
];

const careerOptions = {
  a: ["Graphic Designer", "Art Director", "Illustrator"],
  b: ["Professional Athlete", "Coach", "Sports Scientist"],
  c: ["Software Developer", "IT Technician", "Data Analyst"],
  d: ["Scientist", "Engineer", "Researcher"]
  // Add more career options as needed
};

const form = document.getElementById('quizForm');
const resultDiv = document.getElementById('result');

// Display questions dynamically
questions.forEach((question, index) => {
  const questionDiv = document.createElement('div');
  questionDiv.classList.add('question');
  questionDiv.innerHTML = `
    <p>${index + 1}. ${question.text}</p>
    ${question.options.map(option => `
      <input type="radio" name="q${index}" value="${option.value}">${option.label}<br>
    `).join('')}
  `;
  form.insertBefore(questionDiv, form.lastElementChild);
});

form.addEventListener('submit', function(e) {
  e.preventDefault();
  const formData = new FormData(this);
  const result = calculateResult(formData);
  displayResult(result);
});

function calculateResult(formData) {
  const answers = {};
  formData.forEach((value, key) => {
    answers[key] = value;
  });

  const careerResult = [];
  for (const key in answers) {
    if (careerOptions.hasOwnProperty(answers[key])) {
      careerResult.push(...careerOptions[answers[key]]);
    }
  }

  // Count occurrences of each career option
  const countMap = {};
  careerResult.forEach(option => {
    countMap[option] = (countMap[option] || 0) + 1;
  });

  // Sort options by occurrence count in descending order
  const sortedOptions = Object.keys(countMap).sort((a, b) => countMap[b] - countMap[a]);

  // Return top 3 options
  return sortedOptions.slice(0, 3);
}

function displayResult(result) {
  resultDiv.innerHTML = "<h2>Top 3 Potential Career Options:</h2>";

  if (result.length > 0) {
    const ul = document.createElement('ul');
    result.forEach(option => {
      const li = document.createElement('li');
      li.textContent = option;
      ul.appendChild(li);
    });
    resultDiv.appendChild(ul);
  } else {
    resultDiv.innerHTML = "<p>No matching career options found based on your answers.</p>";
  }
}

form.addEventListener('submit', function(e) {
  e.preventDefault();
  if (checkAllQuestionsAnswered()) {
      const formData = new FormData(this);
      const result = calculateResult(formData);
      displayResult(result);
  } else {
      displayErrorMessage('Please answer all questions before submitting.');
  }
});

function checkAllQuestionsAnswered() {
  const radioGroups = document.querySelectorAll('input[type="radio"]:checked');
  return radioGroups.length === questions.length;
}

function displayErrorMessage(message) {
  resultDiv.innerHTML = `<p class="error">${message}</p>`;
}