document.querySelector('#logar').addEventListener('click', (e) => {
    e.preventDefault();
    entrar()
});

function entrar() {
    //Capturando os dados do login e senha
    let usuario = document.querySelector('#login');
    let senha = document.querySelector('#senha');
    //vetor vazio
    let listaUser = [];

    let usuarioValido = {
            id: '',
            login: '#login',
            senha: '#senha'
        }
        //recebendo o vetor de objetos
    listaUser = JSON.parse(localStorage.getItem('usuarios'));
    //vai varrer todos os itens
    listaUser.forEach(elemento => {
        //capturar o usuario
        if (usuario.value === elemento.login && senha.value === elemento.senha) {
            usuarioValido = {
                id: elemento.id,
                login: elemento.login,
                senha: elemento.senha
            }
        }
    })

    if (usuario.value === usuarioValido.login && senha.value === usuarioValido.senha) {
        alert('deu certo')
        saveSession(usuarioValido.id);
        window.location.href = 'index.html';
    } else if (usuario.value !== usuarioValido.login && senha.value !== usuarioValido.senha) {
        alert('Deu errado')
    } else if (login === '' || senha === '') {
        alert('Deu errado')
    };
}

function saveSession(data) {
    if (saveSession) {
        localStorage.setItem("session", data);
    }
    sessionStorage.setItem("logado", JSON.stringify(data));
}