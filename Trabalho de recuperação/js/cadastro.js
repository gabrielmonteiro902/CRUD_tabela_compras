document.querySelector('#cadastro').addEventListener('click', (event) => {
    event.preventDefault();
    let email = document.querySelector('#loginI').value;
    let senha = document.querySelector('#senhaI').value;



    if (email === '' || senha === '') {
        alert("preencha os campos")
    }
    if (email != '' || senha != '') {
        location.href = 'login.html'
        salvar(email, senha)
    }

});

function salvar(e, s) {
    //verifica se tem dados no localStorage, se nâo tiver cria um vetor vazio '[]'
    let db = JSON.parse(localStorage.getItem('usuarios') || '[]');
    //cria um objeto
    let usuario = {
        id: db.length + 1,
        login: e,
        senha: s
    }

    //Coloco o objeto 'usuario' dentro do vetor
    db.push(usuario);
    //Salvo no localStorage, agora um vetor que permite receber varios objetos
    localStorage.setItem('usuarios', JSON.stringify(db));
    if (email === '' || senha === '') {
        alert("preencha os campos")
    }
    if (email != '' || senha != '') {
        location.href = 'login.html';
    }
}