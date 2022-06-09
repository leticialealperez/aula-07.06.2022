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
}
// capturar os elementos para manipulação dos dados
let modalCriar = new bootstrap.Modal('#modal-criar');
let codigoRecado = document.querySelector('#input-criar-codigo');
let descricaoRecado = document.querySelector('#input-criar-descricao');
let detalhamentoRecado = document.querySelector('#input-criar-detalhamento');
let botaoCriar = document.querySelector('#botao-criar');
let espacoCard = document.querySelector('#espaco-card');
// EVENTOS
botaoCriar.addEventListener('click', () => {
    //captura os valores do input e cria o recado
    criarRecado();
    //faz fechar o modal de criar recado
    modalCriar.hide();
    //faz mostrar o alerta
    mostrarAlerta('Recado adicionado com sucesso', 'success');
    //faz sumir o alerta depois de 2 segundos
    setTimeout(() => {
        corpoAlerta.innerHTML = '';
    }, 2000);
});
function criarRecado() {
    let listaRecados = [];
    let novoRecado = {
        codigo: codigoRecado.value,
        descricao: descricaoRecado.value,
        detalhamento: detalhamentoRecado.value
    };
    listaRecados.push(novoRecado);
    mostrarNoHTML(novoRecado);
}
function mostrarNoHTML(novoRecado) {
    let cardContainer = document.createElement('div');
    cardContainer.setAttribute('class', 'card me-3 text-center');
    cardContainer.setAttribute('style', 'width: 18rem;');
    cardContainer.setAttribute('id', novoRecado.codigo);
    let cardBody = document.createElement('div');
    cardBody.setAttribute('class', 'card-body d-flex flex-column');
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
        editarRecado(novoRecado.codigo);
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
function editarRecado(codigo) {
    alert(codigo);
}
