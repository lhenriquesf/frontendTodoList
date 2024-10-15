const loginForm = document.getElementById('login-form');
const registerButton = document.getElementById('register-button');

// Evento de envio do formulário de login
loginForm.onsubmit = async (event) => {
    event.preventDefault(); // Impede o envio padrão do formulário

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Chamada para a API de login
    const response = await fetch('http://localhost:8000/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded', // Formato URL encoded
        },
        body: new URLSearchParams({ username, password }) // Converte para URL encoded
    });

    if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.access_token); // Armazena o token no localStorage
        alert('Login bem-sucedido!'); // Mensagem de sucesso
        window.location.href = 'index.html'; // Redireciona para a página inicial
    } else {
        const errorData = await response.json(); // Captura dados de erro
        alert(`Erro ao fazer login: ${errorData.detail || 'Verifique os dados e tente novamente.'}`); // Mensagem de erro
    }
};

// Evento de clique no botão de registrar
registerButton.onclick = () => {
    window.location.href = 'register.html'; // Redireciona para a página de registro
};
