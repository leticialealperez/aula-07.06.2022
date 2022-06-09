// ALERTS
let espacoAlerta = document.getElementById('espaco-alerta') as HTMLDivElement;
let corpoAlerta: HTMLDivElement = document.createElement('div');

function mostrarAlerta(mensagem: string, tipo: string) {
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
let codigoRecado = document.querySelector('#input-criar-codigo') as HTMLInputElement;
let descricaoRecado = document.querySelector('#input-criar-descricao') as HTMLInputElement;
let detalhamentoRecado = document.querySelector('#input-criar-detalhamento') as HTMLInputElement;
let botaoCriar = document.querySelector('#botao-criar') as HTMLButtonElement;
let espacoCard = document.querySelector('#espaco-card') as HTMLDivElement;

interface Recado {
    codigo: string,
    descricao: string,
    detalhamento: string
}

// EVENTOS
botaoCriar.addEventListener('click', () => {

    //captura os valores do input e cria o recado
    criarRecado();
});

function criarRecado() {
    let listaRecados: Recado[] = [];

    let novoRecado: Recado = {
        codigo: codigoRecado.value,
        descricao: descricaoRecado.value,
        detalhamento: detalhamentoRecado.value
    }

    listaRecados.push(novoRecado);

    modalCriar.hide(); //faz fechar o modal de criar recado

    mostrarNoHTML(novoRecado); //cria o card e mostra no HTML

    mostrarAlerta('Recado adicionado com sucesso', 'success'); //faz mostrar o alerta

    //faz sumir o alerta depois de 2 segundos
    setTimeout(() => {
        corpoAlerta.innerHTML = '';
    }, 2000);
}

function mostrarNoHTML(novoRecado: Recado) {
    let cardContainer: HTMLDivElement = document.createElement('div');
    cardContainer.setAttribute('class', 'col-3 card me-3 my-3 text-center');
    cardContainer.setAttribute('style', 'width: 18rem;');
    cardContainer.setAttribute('id', novoRecado.codigo);

    let cardBody: HTMLDivElement = document.createElement('div');
    cardBody.setAttribute('class', 'card-body d-flex flex-column justify-content-between');

    let codigoCard: HTMLHeadingElement = document.createElement('h4');
    codigoCard.setAttribute('class', 'card-title');
    codigoCard.innerText = `# ${novoRecado.codigo}`;

    let descricaoCard: HTMLHeadingElement = document.createElement('h5');
    descricaoCard.setAttribute('class', 'card-title');
    descricaoCard.innerHTML = novoRecado.descricao;

    let detalhamentoCard: HTMLParagraphElement = document.createElement('p');
    detalhamentoCard.setAttribute('class', 'card-text');
    detalhamentoCard.innerHTML = novoRecado.detalhamento;

    let containerButtons: HTMLDivElement = document.createElement('div');
    containerButtons.setAttribute('class', 'container mt-5');

    let botaoApagar: HTMLButtonElement = document.createElement('button');
    botaoApagar.setAttribute('class', 'btn btn-danger fs-5 mx-2');
    botaoApagar.setAttribute('data-bs-toggle', 'modal');
    botaoApagar.setAttribute('data-bs-target', '#modal-apagar');
    botaoApagar.addEventListener('click', () => {
        apagarRecado(novoRecado.codigo);
    })
    botaoApagar.innerHTML = `<i class="bi bi-trash"></i>`;

    let botaoEditar: HTMLButtonElement = document.createElement('button');
    botaoEditar.setAttribute('class', 'btn btn-success fs-5');
    botaoEditar.setAttribute('data-bs-toggle', 'modal');
    botaoEditar.setAttribute('data-bs-target', '#modal-editar');
    botaoEditar.addEventListener('click', () => {
        editarRecado(novoRecado.codigo);
    })
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

function apagarRecado(codigo: string) {
    alert(codigo);
}

function editarRecado(codigo: string) {
    alert(codigo);
}












