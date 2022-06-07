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
let confirma = true;
let btnMostraAlerta = document.getElementById('botao-alerta');
btnMostraAlerta.addEventListener('click', () => {
    if (confirma) {
        mostrarAlerta('Procedimento realizado com sucesso!', 'success');
    }
    else {
        mostrarAlerta('Falha na execução do procedimento', 'danger');
    }
    setTimeout(() => {
        corpoAlerta.innerHTML = '';
    }, 3000);
});
// MODAL 
let meuModal = new bootstrap.Modal('#meu-modal');
let botaoNaoConfirma = document.getElementById('botao-nao');
let botaoConfirma = document.getElementById('botao-sim');
botaoNaoConfirma.addEventListener('click', () => {
    meuModal.hide();
    mostrarAlerta("Exclusão cancelada", "danger");
    setTimeout(() => {
        corpoAlerta.innerHTML = '';
    }, 3000);
});
botaoConfirma.addEventListener('click', () => {
    meuModal.hide();
    mostrarAlerta("Recado excluido com sucesso!", "success");
    setTimeout(() => {
        corpoAlerta.innerHTML = '';
    }, 3000);
});
// BADGE
let listaExemploRecado = [];
let recado = {
    descricao: 'bla bla bla 1',
    lido: true
};
let NovoRecado = {
    descricao: 'bla bla bla 2',
    lido: false
};
let NovoRecado2 = {
    descricao: 'bla bla bla 3',
    lido: false
};
listaExemploRecado.push(recado);
listaExemploRecado.push(NovoRecado);
listaExemploRecado.push(NovoRecado2);
let recadosMostrar = listaExemploRecado.filter((recado, indice, array) => recado.lido === false);
let quantidadeSpan = document.getElementById('mostrar-qtd-recados');
quantidadeSpan.innerHTML = `${recadosMostrar.length} 
                            <span class="visually-hidden">unread messages</span>
                            `;
