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