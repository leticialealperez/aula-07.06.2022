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

let confirma: boolean = true;

let btnMostraAlerta = document.getElementById('botao-alerta') as HTMLButtonElement;
btnMostraAlerta.addEventListener('click', () => {
    if (confirma) {
        mostrarAlerta('Procedimento realizado com sucesso!', 'success');
    } else {
        mostrarAlerta('Falha na execução do procedimento', 'danger');
    }

    setTimeout(() => {
        corpoAlerta.innerHTML = '';
    }, 3000);
});



// MODAL APAGAR 
let modalApagar = new bootstrap.Modal('#modal-apagar');

let botaoCancelarExclusao = document.getElementById('botao-nao') as HTMLButtonElement;
let botaoConfirmaExclusao = document.getElementById('botao-sim') as HTMLButtonElement;

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
let botaoAtualizar = document.getElementById('botao-atualizar') as HTMLButtonElement;
let botaoCancelaEdicao = document.getElementById('cancelar-editar') as HTMLButtonElement;
let formEditar = document.getElementById('form-editar') as HTMLFormElement;

botaoAtualizar.addEventListener('click', () => {
    let recado = {
        descricao: (document.getElementById('input-descricao') as HTMLInputElement).value,
        detalhamento: (document.getElementById('input-detalhamento') as HTMLInputElement).value,
    }

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
})


// BADGE
interface Recado {
    descricao: string,
    lido: boolean
}

let listaExemploRecado: Recado[] = [];

document.addEventListener('DOMContentLoaded', () => {
    let recado: Recado = {
        descricao: 'bla bla bla 1',
        lido: false
    }

    let NovoRecado: Recado = {
        descricao: 'bla bla bla 2',
        lido: false
    }

    let NovoRecado2: Recado = {
        descricao: 'bla bla bla 3',
        lido: false
    }

    listaExemploRecado.push(recado);
    listaExemploRecado.push(NovoRecado);
    listaExemploRecado.push(NovoRecado2);

    mostrarBadge(listaExemploRecado);
});

let btnBadge = document.getElementById('btn-badge') as HTMLButtonElement;
btnBadge.addEventListener('click', () => {
    listaExemploRecado.forEach((recado) => {
        if (recado.lido) {
            recado.lido = false
        } else {
            recado.lido = true
        }
    });

    mostrarBadge(listaExemploRecado);
});

function mostrarBadge(listaRecados: Recado[]) {
    let recadosMostrar = listaRecados.filter((recado) => recado.lido === false);

    let quantidadeSpan = document.getElementById('mostrar-qtd-recados') as HTMLSpanElement;

    quantidadeSpan.innerHTML = `${recadosMostrar.length} 
                            <span class="visually-hidden">unread messages</span>
                            `
}

