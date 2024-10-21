document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Exemplo de autenticação básica (Substitua pelos seus usuários e senhas)
        if (username === 'admin' && password === '1234') {
            localStorage.setItem('authenticated', 'true');
            window.location.href = 'inclusion.html'; // Redirecionar para a página de inclusão
        } else {
            alert('Usuário ou senha incorretos.');
        }
    });
});
