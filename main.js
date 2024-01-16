const questions = [
  { id: '1° Quantas pessoas irão usar a internet na sua casa?', text: 'Quantas pessoas irão usar a internet na sua casa?', answers: ['De 1 à 3 pessoas', 'De 3 à 5 pessoas', '+ de 5 pessoas'] },
  
  { id: '2° Quais conteúdos são acessados com mais frequência?', text: 'Quais conteúdos são acessados com mais frequência?', answers: ['Redes sociais: facebook, Instagram, whatsapp', 'streaming e vídeo: YouTube, Netflix, prime video, Amazom', 'Todas as respostas'] },
  
  { id: '3° A internet é utilizada para fazer chamadas de vídeo ou trabalhar?', text: 'A internet é utilizada para fazer chamadas de vídeo ou trabalhar?', answers: ['Sim, todos os dias', 'Sim, poucas vezes', 'Não'] },
  
   { id: '4° A internet de casa vai ser usada para jogar online? ', text: 'A internet de casa é usada para jogar online?', answers: ['Sim', 'Não', 'As vezes'] },
   
   
  // Adicione mais perguntas conforme necessário
];

let currentQuestionIndex = 0;
let allAnswers = [];

function renderQuestion() {
  const form = document.getElementById('quiz-form');
  form.innerHTML = ''; // Limpa o conteúdo anterior

  const currentQuestion = questions[currentQuestionIndex];

  const questionLabel = document.createElement('label');
  questionLabel.textContent = currentQuestion.text;
  form.appendChild(questionLabel);

  currentQuestion.answers.forEach((answer, index) => {
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.name = currentQuestion.id;
    input.value = answer;
    const label = document.createElement('label');
    label.appendChild(input);
    label.appendChild(document.createTextNode(` ${answer}`));
    form.appendChild(label);
  });

  // Exibe os botões de próxima pergunta e enviar respostas
  const nextBtn = document.getElementById('next-btn');
  const submitBtn = document.getElementById('submit-btn');
  nextBtn.style.display = 'block';
  submitBtn.style.display = 'block';
}

function nextQuestion() {
  const form = document.getElementById('quiz-form');
  const checkboxes = form.querySelectorAll('input[type="checkbox"]:checked');

  checkboxes.forEach((checkbox) => {
    const question = checkbox.name;
    const answer = checkbox.value;
    allAnswers.push(`${question}: ${answer}`);
  });

  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    renderQuestion();
  } else {
    alert('Acabaram as perguntas. Aperte o botão "Enviar Respostas" para finalizar.');
    // Oculta o botão de próxima pergunta quando todas as perguntas foram respondidas
    document.getElementById('next-btn').style.display = 'none';
  }
}

function submitQuiz() {
  const whatsappLink = generateWhatsappLink();
  window.open(whatsappLink, '_blank');
}

function generateWhatsappLink() {
  const message = 'Respostas do Quiz:\n' + allAnswers.join('\n');

  const phoneNumber = '5581989630005';  // Substitua pelo número desejado
  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
}

// Inicializa o primeiro carregamento da pergunta
renderQuestion();
