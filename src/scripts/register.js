const registerForm = document.getElementById('register-form');
const loginButton = document.getElementById('login-button');

// Evento de envio do formulário de registro
registerForm.onsubmit = async (event) => {
    event.preventDefault(); // Impede o envio padrão do formulário

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value; // Captura o campo confirm_password

    // Chamada para a API de registro
    const response = await fetch('http://localhost:8000/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, confirm_password: confirmPassword }), // Inclui confirm_password
    });

    if (response.ok) {
        alert('Usuário registrado com sucesso!'); // Mensagem de sucesso
        window.location.href = 'login.html'; // Redireciona para a página de login
    } else {
        const errorData = await response.json(); // Captura dados de erro
        alert(`Erro ao registrar usuário: ${errorData.detail || 'Verifique os dados e tente novamente.'}`); // Mensagem de erro
    }
};

// Evento de clique no botão de login
loginButton.onclick = () => {
    window.location.href = 'login.html'; // Redireciona para a página de login
};
