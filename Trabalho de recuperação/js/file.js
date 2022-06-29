const form = document.querySelector('#infos-prod');
const divErro = document.querySelector('#msg-erro');
const tabela = document.querySelector('#tbody');
let idx = form.idx.value;
//capturar a session
let usuarioId = Number(sessionStorage.getItem('logado'));
//LOGCHECKED
const session = localStorage.getItem("session");

logadoOuNao();

function logadoOuNao() {
    //se tiver dado dentro do localstorage session
    if (session) {
        //uma sessao com o log que recebe o valor da localstorage
        sessionStorage.setItem("log", session)
        usuarioId = session
    }
    if (!usuarioId) {
        window.location.href = "login.html"
        return
    }
}
console.log(usuarioId);

//Salvar no localstorage
const atualizarLocalStorage = (produtos) => { localStorage.setItem('produtos', JSON.stringify(produtos)) };

//Recupera os produtos
const recuperarLocalStorage = () => {
    const produtos = JSON.parse(localStorage.getItem('produtos') || '[]');
    return produtos
}

const salvarProduto = (e) => {
    //pegar os dados do formulario
    e.preventDefault()
    console.log("Evento ativado");
    divErro.innerHTML = "";
    const nome = form.name.value
    const price = Number(form.price.value);
    const prime = form.prime.checked;
    const erros = [];

    if (!nome || nome.length < 2) {
        erros.push("<p>Nome inválido</p>")
    }
    if (!price || price < 0) {
        erros.push("<p>Nome inválido</p>")
    }
    if (erros.length > 0) {
        divErro.innerHTML = erros.join(" ")
        return
    }



    if (idx == 'novo') {
        const produtos = recuperarLocalStorage()
        let idp = 0
        for (const pro of produtos) {
            if (pro.usuarioId === usuarioId)
                idp = Number(pro.id)

        }
        //console.log({ id: produtos.length + 1, nome, preco, prime })
        produtos.push({ id: idp += 1, nome, price, prime, usuarioId });
        atualizarLocalStorage(produtos);
        preencherTabela();
        form.reset();


    } else {
        let produto = { id: idx, nome, price, prime, usuarioId }
        atualizarProduto(idx, produto)
        preencherTabela()
        form.reset()
        idx = 'novo'
        console.log('atualizarProduto', idx)
    }



}


const preencherTabela = () => {
    const produtos = recuperarLocalStorage();
    tabela.innerHTML = ''
    for (const produto of produtos) {
        if (produto.usuarioId === usuarioId) {
            tabela.innerHTML += `
        
       <tr class="tr">
        <th scope="row" class="th">${produto.id}</th>
        <td class="td">${produto.nome}</td>
        <td class="td">${produto.price}</td>
        <td class="td">${produto.prime ? "Sim" : "Não"}</td>
        <td class="td">
        <i class="fa-solid fa-trash-can" type="button" onclick="removerProduto(${produto.id})" ></i>
        <i class="fa-solid fa-pen-to-square" type="button" type="button" onclick="editarProduto(${produto.id})" ></i>
        </td>
        </tr>


        `;
        }

    }

}

const removerProduto = (id) => {
    const produtos = recuperarLocalStorage();
    const indexProduto = produtos.findIndex((produto) => produto.id === id && produto.usuarioId === usuarioId);
    if (indexProduto < 0) return;
    produtos.splice(indexProduto, 1);
    atualizarLocalStorage(produtos);
    alert('Produto removido')
    preencherTabela();
}

const editarProduto = (id) => {
    const produtos = recuperarLocalStorage();
    const indexProduto = produtos.findIndex((produto) => produto.id === id && produto.usuarioId === usuarioId);
    form.nome.value = produtos[indexProduto].nome;
    form.price.value = produtos[indexProduto].price;
    form.prime.checked = produtos[indexProduto].prime;
    idx = id;
}

const atualizarProduto = (id, produto) => {
    const produtos = recuperarLocalStorage();
    const indexProduto = produtos.findIndex((produto) => produto.id === id && produto.usuarioId === usuarioId);
    produtos[indexProduto] = produto;
    atualizarLocalStorage(produtos);
}

//EVENTOS
form === null || form === void 0 ? void 0 : form.addEventListener('submit', salvarProduto);
document.addEventListener('DOMContentLoaded', preencherTabela);

//função de sair
document.querySelector('#sair').addEventListener('click', function() {
    saindo()
});

function saindo() {
    sessionStorage.removeItem("logado");
    localStorage.removeItem("session");

    window.location.href = 'cadstro.html';
}