const questions = [
  { id: '1° Quantas pessoas irão usar a internet na sua casa?', text: 'Quantas pessoas irão usar a internet na sua casa?', answers: ['De 1 à 3 pessoas', 'De 3 à 5 pessoas', '+ de 5 pessoas'] },

  { id: '2° Quais conteúdos vão ser acessados com mais frequência?', text: 'Quais conteúdos são acessados com mais frequência?', answers: ['Redes sociais: facebook, Instagram, whatsapp', 'streaming e vídeo: YouTube, Netflix, prime video, Amazom', 'Todas as respostas'] },

  { id: '3° A internet vai ser utilizada para fazer chamadas de vídeo ou trabalhar?', text: 'A internet é utilizada para fazer chamadas de vídeo ou trabalhar?', answers: ['Sim, todos os dias', 'Sim, poucas vezes', 'Não'] },

  { id: '4° A internet de casa vai ser usada para jogar online? ', text: 'A internet de casa é usada para jogar online?', answers: ['Sim', 'Não', 'As vezes'] },
];

let currentQuestionIndex = 0;
let allAnswers = [];
let userName, userPhone;

function renderQuestion() {
  const form = document.getElementById('quiz-form');
  form.innerHTML = ''; // Limpa o conteúdo anterior

  const currentQuestion = questions[currentQuestionIndex];

  const questionLabel = document.createElement('label');
  questionLabel.textContent = currentQuestion.text;
  form.appendChild(questionLabel);

  currentQuestion.answers.forEach((answer, index) => {
    const input = document.createElement('input');
    input.type = 'radio'; // Alterado para radio button
    input.name = currentQuestion.id;
    input.value = answer;
    const label = document.createElement('label');
    label.appendChild(input);
    label.appendChild(document.createTextNode(` ${answer}`));
    form.appendChild(label);
  });

  // Adiciona inputs para nome e telefone no final das perguntas
  if (currentQuestionIndex === questions.length - 1) {
    const nameLabel = document.createElement('label');
    nameLabel.textContent = 'Nome:';
    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.addEventListener('input', (event) => {
      userName = event.target.value;
    });
    form.appendChild(nameLabel);
    form.appendChild(nameInput);

    const phoneLabel = document.createElement('label');
    phoneLabel.textContent = 'Telefone:';
    const phoneInput = document.createElement('input');
    phoneInput.type = 'text';
    phoneInput.addEventListener('input', (event) => {
      userPhone = event.target.value;
    });
    form.appendChild(phoneLabel);
    form.appendChild(phoneInput);
  }

  // Exibe os botões de próxima pergunta e enviar respostas
  const nextBtn = document.getElementById('next-btn');
  const submitBtn = document.getElementById('submit-btn');
  nextBtn.style.display = 'block';
  submitBtn.style.display = 'block';
}

function nextQuestion() {
  const form = document.getElementById('quiz-form');
  const radioButtons = form.querySelectorAll('input[type="radio"]:checked');

  // Verifica se todas as perguntas foram respondidas
  if (currentQuestionIndex < questions.length - 1 && radioButtons.length === 0) {
    alert('Por favor, responda a pergunta antes de avançar.');
    return;
  }

  radioButtons.forEach((radioButton) => {
    const question = radioButton.name;
    const answer = radioButton.value;
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
  // Verifica se nome e telefone foram preenchidos
  if (!userName || !userPhone) {
    alert('Por favor, preencha todos os campos antes de enviar.');
    return;
  }

  const whatsappLink = generateWhatsappLink();
  window.open(whatsappLink, '_blank');
}

function generateWhatsappLink() {
  const message = `Respostas do Quiz de ${userName} - Telefone: ${userPhone}\n` + allAnswers.join('\n');

  const phoneNumber = '5581989630005';  // Substitua pelo número desejado
  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
}

// Inicializa o primeiro carregamento da pergunta
renderQuestion();

