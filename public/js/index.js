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
// MODAL APAGAR 
let modalApagar = new bootstrap.Modal('#modal-apagar');
let botaoCancelarExclusao = document.getElementById('botao-nao');
let botaoConfirmaExclusao = document.getElementById('botao-sim');
botaoCancelarExclusao.addEventListener('click', () => {
    modalApagar.hide();
    mostrarAlerta("Exclusão cancelada", "danger");
    setTimeout(() => {
        corpoAlerta.innerHTML = '';
    }, 3000);
});
botaoConfirmaExclusao.addEventListener('click', () => {
    modalApagar.hide();
    mostrarAlerta("Recado excluido com sucesso!", "success");
    setTimeout(() => {
        corpoAlerta.innerHTML = '';
    }, 3000);
});
// MODAL EDITAR
let modalEditar = new bootstrap.Modal('#modal-editar');
let botaoAtualizar = document.getElementById('botao-atualizar');
let botaoCancelaEdicao = document.getElementById('cancelar-editar');
let formEditar = document.getElementById('form-editar');
botaoAtualizar.addEventListener('click', () => {
    let recado = {
        descricao: document.getElementById('input-descricao').value,
        detalhamento: document.getElementById('input-detalhamento').value,
    };
    console.log(recado);
    modalEditar.hide();
    mostrarAlerta('Recado atualizado com sucesso', 'success');
    setTimeout(() => {
        corpoAlerta.innerHTML = '';
    }, 3000);
});
botaoCancelaEdicao.addEventListener('click', () => {
    modalEditar.hide();
    mostrarAlerta('Edição Cancelada', 'danger');
    setTimeout(() => {
        corpoAlerta.innerHTML = '';
    }, 3000);
});
let listaExemploRecado = [];
document.addEventListener('DOMContentLoaded', () => {
    let recado = {
        descricao: 'bla bla bla 1',
        lido: false
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
    mostrarBadge(listaExemploRecado);
});
let btnBadge = document.getElementById('btn-badge');
btnBadge.addEventListener('click', () => {
    for (const recado of listaExemploRecado) {
        recado.lido = true;
    }
    mostrarBadge(listaExemploRecado);
});
function mostrarBadge(listaRecados) {
    let recadosMostrar = listaRecados.filter((recado) => recado.lido === false);
    let quantidadeSpan = document.getElementById('mostrar-qtd-recados');
    quantidadeSpan.innerHTML = `${recadosMostrar.length} 
                            <span class="visually-hidden">unread messages</span>
                            `;
}
