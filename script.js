// Function to handle user's answer selection
function handleAnswer(questionNumber, answer) {
  // Retrieve previously stored answers from sessionStorage
  let userAnswers = JSON.parse(sessionStorage.getItem('userAnswers')) || [];
  // Store the current answer
  userAnswers[questionNumber - 1] = answer;
  // Store the updated answers back to sessionStorage
  sessionStorage.setItem('userAnswers', JSON.stringify(userAnswers));
  // Check if all questions are answered
  if (userAnswers.length === 5) {
    checkQuizCompletion(userAnswers);
  }
}

// Function to check if all questions are answered
function checkQuizCompletion(userAnswers) {
  // Determine if user has won or lost based on their answers
  const correctAnswers = ['C', 'D', 'B', 'A', 'D']; // Example correct answers
  const correctCount = userAnswers.filter((answer, index) => answer === correctAnswers[index]).length;
  if (correctCount >= 3) {
    // Redirect to Won page
    window.location.href = 'won.html';
  } else {
    // Redirect to Lost page
    window.location.href = 'lost.html';
  }
}

// Add event listeners to anchor tags in each question
const answerLinks = document.querySelectorAll('a.A, a.B, a.C, a.D');
answerLinks.forEach(link => {
  link.addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default anchor behavior
    const answer = this.innerText; // Get the selected answer
    const questionNumber = parseInt(this.getAttribute('data-question')); // Get the question number
    handleAnswer(questionNumber, answer); // Store the answer
    // Navigate to the next question or page
    const nextPage = this.getAttribute('href');
    window.location.href = nextPage;
  });
});
