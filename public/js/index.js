"use strict";
// ALERTS
let espacoAlerta = document.getElementById('espaco-alerta');
let corpoAlerta = document.createElement('div');
function mostrarAlerta(mensagem, tipo) {
    corpoAlerta.innerHTML = `
                        <div class="alert alert-${tipo} alert-dismissible" role="alert">
                                <div>${mensagem}</div>
                                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                        `;
    espacoAlerta.appendChild(corpoAlerta);
    setTimeout(() => {
        corpoAlerta.innerHTML = '';
    }, 3000);
}
// capturar os elementos para manipulação dos dados
let modalCriar = new bootstrap.Modal('#modal-criar');
let codigoRecado = document.querySelector('#input-criar-codigo');
let descricaoRecado = document.querySelector('#input-criar-descricao');
let detalhamentoRecado = document.querySelector('#input-criar-detalhamento');
let botaoCriar = document.querySelector('#botao-criar');
let espacoCard = document.querySelector('#espaco-card');
let btnAtualizar = document.getElementById('botao-atualizar');
let modalEditar = new bootstrap.Modal('#modal-editar');
let inputEditDescricao = document.getElementById('input-editar-descricao');
let inputEditDetalhamento = document.getElementById('input-editar-detalhamento');
// EVENTOS
botaoCriar.addEventListener('click', () => {
    //captura os valores do input e cria o recado
    criarRecado();
});
document.addEventListener('DOMContentLoaded', carregarRecados);
function criarRecado() {
    let listaRecados = pegarRecados();
    if (codigoRecado.value === '' || descricaoRecado.value === '' || detalhamentoRecado.value === '') {
        codigoRecado.setAttribute('style', 'border: 1px solid red; box-shadow: none');
        descricaoRecado.setAttribute('style', 'border: 1px solid red; box-shadow: none');
        detalhamentoRecado.setAttribute('style', 'border: 1px solid red');
        codigoRecado.focus();
        return;
    }
    let existeCodigo = listaRecados.some((recado) => recado.codigo === codigoRecado.value);
    if (existeCodigo) {
        codigoRecado.setAttribute('style', 'border: 1px solid red; box-shadow: none');
        codigoRecado.value = '';
        return;
    }
    let novoRecado = {
        codigo: codigoRecado.value,
        descricao: descricaoRecado.value,
        detalhamento: detalhamentoRecado.value
    };
    listaRecados.push(novoRecado);
    modalCriar.hide(); //faz fechar o modal de criar recado
    mostrarNoHTML(novoRecado); //cria o card e mostra no HTML
    salvarListaNoStorage(listaRecados);
    mostrarAlerta('Recado adicionado com sucesso', 'success'); //faz mostrar o alerta
}
function mostrarNoHTML(novoRecado) {
    let cardContainer = document.createElement('div');
    cardContainer.setAttribute('class', 'col-3 card me-3 my-3 text-center');
    cardContainer.setAttribute('style', 'width: 18rem;');
    cardContainer.setAttribute('id', novoRecado.codigo);
    let cardBody = document.createElement('div');
    cardBody.setAttribute('class', 'card-body d-flex flex-column justify-content-between');
    let codigoCard = document.createElement('h4');
    codigoCard.setAttribute('class', 'card-title');
    codigoCard.innerText = `# ${novoRecado.codigo}`;
    let descricaoCard = document.createElement('h5');
    descricaoCard.setAttribute('class', 'card-title');
    descricaoCard.innerHTML = novoRecado.descricao;
    let detalhamentoCard = document.createElement('p');
    detalhamentoCard.setAttribute('class', 'card-text');
    detalhamentoCard.innerHTML = novoRecado.detalhamento;
    let containerButtons = document.createElement('div');
    containerButtons.setAttribute('class', 'container mt-5');
    let botaoApagar = document.createElement('button');
    botaoApagar.setAttribute('class', 'btn btn-danger fs-5 mx-2');
    botaoApagar.setAttribute('data-bs-toggle', 'modal');
    botaoApagar.setAttribute('data-bs-target', '#modal-apagar');
    botaoApagar.addEventListener('click', () => {
        apagarRecado(novoRecado.codigo);
    });
    botaoApagar.innerHTML = `<i class="bi bi-trash"></i>`;
    let botaoEditar = document.createElement('button');
    botaoEditar.setAttribute('class', 'btn btn-success fs-5');
    botaoEditar.setAttribute('data-bs-toggle', 'modal');
    botaoEditar.setAttribute('data-bs-target', '#modal-editar');
    botaoEditar.addEventListener('click', () => {
        editarRecado(novoRecado);
    });
    botaoEditar.innerHTML = `<i class="bi bi-pencil-square"></i>`;
    containerButtons.appendChild(botaoApagar);
    containerButtons.appendChild(botaoEditar);
    cardBody.appendChild(codigoCard);
    cardBody.appendChild(descricaoCard);
    cardBody.appendChild(detalhamentoCard);
    cardBody.appendChild(containerButtons);
    cardContainer.appendChild(cardBody);
    espacoCard.appendChild(cardContainer);
}
function apagarRecado(codigo) {
    alert(codigo);
}
function editarRecado(recado) {
    btnAtualizar.setAttribute('onclick', `atualizarRecado(${recado.codigo})`);
    inputEditDescricao.value = recado.descricao;
    inputEditDetalhamento.value = recado.detalhamento;
}
function atualizarRecado(codigo) {
    let recadoEdit = {
        codigo: `${codigo}`,
        descricao: inputEditDescricao.value,
        detalhamento: inputEditDetalhamento.value
    };
    let listaRecados = pegarRecados();
    let indiceRecado = listaRecados.findIndex((recadoList) => recadoList.codigo == codigo);
    listaRecados[indiceRecado] = recadoEdit;
    let cards = document.querySelectorAll('.card');
    for (let card of cards) {
        if (card.id == codigo) {
            let codigoRegistro = card.children[0].childNodes[0];
            let descricaoRegistro = card.children[0].childNodes[1];
            let detalhamentoRegistro = card.children[0].childNodes[2];
            codigoRegistro.innerHTML = `# ${codigo}`;
            descricaoRegistro.innerHTML = recadoEdit.descricao;
            detalhamentoRegistro.innerHTML = recadoEdit.detalhamento;
        }
    }
    salvarListaNoStorage(listaRecados);
    modalEditar.hide();
    mostrarAlerta('Recado atualizado!', 'success');
}
function salvarListaNoStorage(recados) {
    localStorage.setItem('recados', JSON.stringify(recados));
}
function carregarRecados() {
    let recados = JSON.parse(localStorage.getItem('recados') || '[]');
    for (let recado of recados) {
        mostrarNoHTML(recado);
    }
}
function pegarRecados() {
    return JSON.parse(localStorage.getItem('recados') || '[]');
}
