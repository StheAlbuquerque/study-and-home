const formulario = document.getElementById("form-tarefa");
const campoNome = document.getElementById("nome-tarefa");
const campoCategoria = document.getElementById("categoria-tarefa");
const listaTarefas = document.getElementById("lista-tarefas");

// Esse comando vai recuperar as tarefas salvas no navegador
let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

// Função para salvar as tarefas no localStorage
function salvarTarefas() {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

// Função para mostrar as tarefas na tela
function mostrarTarefas() {
    listaTarefas.innerHTML = "";

    tarefas.forEach(function(tarefa, indice) {
        const item = document.createElement("li");

        if (tarefa.concluida) {
            item.classList.add("concluida");
        }

        const texto = document.createElement("span");
        texto.textContent = tarefa.nome + " - " + tarefa.categoria;

        const botaoConcluir = document.createElement("button");
        botaoConcluir.textContent = tarefa.concluida 
            ? "Desfazer" 
            : "Concluir";

            botaoConcluir.addEventListener("click", function() {
                tarefas[indice].concluida = !tarefas[indice].concluida;
                salvarTarefas();
                mostrarTarefas();
            });

            const botaoExcluir = document.createElement("button");
            botaoExcluir.textContent = "Excluir";

            botaoExcluir.addEventListener("click", function() {
                tarefas.splice(indice, 1);
                salvarTarefas();
                mostrarTarefas();
            });

            item.appendChild(texto);
            item.appendChild(botaoConcluir);
            item.appendChild(botaoExcluir);

            listaTarefas.appendChild(item);
        });
}

// Função para adicionar uma nova tarefa
formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const nome = campoNome.value.trim();

    if (nome === "") {
        return;
    }

    const novaTarefa = {
        nome: nome,
        categoria: campoCategoria.value,
        concluida: false
    };

    tarefas.push(novaTarefa);

    salvarTarefas();
    mostrarTarefas();

    formulario.reset();
});


// Mostrar as tarefas ao carregar a página
mostrarTarefas();

// Elementos do caderno de notas
const formularioNota = document.getElementById("form-nota");
const tituloNota = document.getElementById("titulo-nota");
const materiaNota = document.getElementById("materia-nota");
const textoNota = document.getElementById("texto-nota");
const listaNotas = document.getElementById("lista-notas");

// Recuperar notas salvas no navegador
let notas = JSON.parse(localStorage.getItem("notas")) || [];

function salvarNotas() {
    localStorage.setItem("notas", JSON.stringify(notas));
}

// Função para mostrar as notas na tela
function mostrarNotas() {
    listaNotas.innerHTML = "";

    notas.forEach(function(nota, indice) {

        // criar um elemento para cada nota
        const item = document.createElement("li");
        if (nota.texto.length <= 180) {
        item.classList.add("nota-pequena");
        } else {
        item.classList.add("nota-grande");
        }

        // criar o título da nota
        const titulo = document.createElement("h3");
        titulo.textContent = nota.titulo;

        // mostrar a matéria
        const materia = document.createElement("p");
        materia.textContent = nota.materia;
        materia.classList.add("materia-nota-card");

        // mostrar o conteúdo
        const texto = document.createElement("p");
        texto.textContent = nota.texto;

        const botaoExcluir = document.createElement("button");
            botaoExcluir.textContent = "Excluir";

            botaoExcluir.addEventListener("click", function() {
                notas.splice(indice, 1);
                salvarNotas();
                mostrarNotas();
            });

            item.appendChild(titulo);
            item.appendChild(materia);
            item.appendChild(texto);
            item.appendChild(botaoExcluir);

            listaNotas.appendChild(item);
        });
}

formularioNota.addEventListener("submit", function(event) {
    event.preventDefault();

    const titulo = tituloNota.value.trim();
    const texto = textoNota.value.trim();

    if (titulo === "" || texto === "") {
        return;
    }

    const novaNota = {
        titulo: titulo,
        materia: materiaNota.value,
        texto: texto
    };

    notas.push(novaNota);

    salvarNotas();
    mostrarNotas();

    formularioNota.reset();
});

mostrarNotas();