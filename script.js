const formulario = document.getElementById("form-tarefa");
const campoNome = document.getElementById("nome-tarefa");
const campoCategoria = document.getElementById("categoria-tarefa");
const listaTarefas = document.getElementById("lista-tarefas");

// Recuperar tarefas salvas no navegador
let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

// Salvar tarefas no localStorage
function salvarTarefas() {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

// Mostrar as tarefas na tela
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

// Adicionar uma nova tarefa
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

// Mostrar tarefas ao carregar a página
mostrarTarefas();


// Elementos do caderno de notas
const formularioNota = document.getElementById("form-nota");
const tituloNota = document.getElementById("titulo-nota");
const materiaNota = document.getElementById("materia-nota");
const textoNota = document.getElementById("texto-nota");
const listaNotas = document.getElementById("lista-notas");

// Recuperar notas salvas no navegador
let notas = JSON.parse(localStorage.getItem("notas")) || [];

// Salvar notas no localStorage
function salvarNotas() {
    localStorage.setItem("notas", JSON.stringify(notas));
}

// Mostrar as notas na tela
function mostrarNotas() {
    listaNotas.innerHTML = "";

    notas.forEach(function(nota, indice) {
        const item = document.createElement("li");

        if (nota.texto.length <= 180) {
            item.classList.add("nota-pequena");
        } else {
            item.classList.add("nota-grande");
        }

        const titulo = document.createElement("h3");
        titulo.textContent = nota.titulo;

        const materia = document.createElement("p");
        materia.textContent = nota.materia;
        materia.classList.add("materia-nota-card");

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

// Adicionar uma nova nota
formularioNota.addEventListener("submit", function(event) {
    event.preventDefault();

    const titulo = tituloNota.value.trim();
    const texto = textoNota.value.trim();

    if (titulo === "" || texto === "" || materiaNota.value === "") {
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


// Elementos da organização por matérias
const formularioMateria = document.getElementById("form-materia");
const nomeMateria = document.getElementById("nome-materia");
const corMateria = document.getElementById("cor-materia");
const listaMaterias = document.getElementById("lista-materias");

// Recuperar matérias salvas no navegador
let materias = JSON.parse(localStorage.getItem("materias")) || [];

// Converter matérias antigas para o novo formato
materias = materias.map(function(materia) {
    if (typeof materia === "string") {
        return {
            nome: materia,
            cor: "#EBD9F5"
        };
    }

    return materia;
});

// Salvar matérias no localStorage
function salvarMaterias() {
    localStorage.setItem("materias", JSON.stringify(materias));
}

// Atualizar opções de matérias no caderno de notas
function atualizarOpcoesMaterias() {
    materiaNota.innerHTML = "";

    const opcaoPadrao = document.createElement("option");
    opcaoPadrao.value = "";
    opcaoPadrao.textContent = "Selecione uma matéria";
    materiaNota.appendChild(opcaoPadrao);

    const opcaoSemMateria = document.createElement("option");
    opcaoSemMateria.value = "Sem matéria";
    opcaoSemMateria.textContent = "Sem matéria";
    materiaNota.appendChild(opcaoSemMateria);

    materias.forEach(function(materia) {
        const opcao = document.createElement("option");
        opcao.value = materia.nome;
        opcao.textContent = materia.nome;
        materiaNota.appendChild(opcao);
    });
}

// Mostrar as matérias na tela
function mostrarMaterias() {
    listaMaterias.innerHTML = "";

    materias.forEach(function(materia, indice) {
        const item = document.createElement("div");
        item.classList.add("card-materia");
        item.style.backgroundColor = materia.cor;

        const nome = document.createElement("h3");
        nome.textContent = materia.nome;

        const areaCor = document.createElement("div");
        areaCor.classList.add("cor-card-materia");

        const textoCor = document.createElement("span");
        textoCor.textContent = "Alterar cor:";

        const seletorCor = document.createElement("input");
        seletorCor.type = "color";
        seletorCor.value = materia.cor;

        seletorCor.addEventListener("input", function() {
            materias[indice].cor = seletorCor.value;

            item.style.backgroundColor = seletorCor.value;

            salvarMaterias();
        });

        areaCor.appendChild(textoCor);
        areaCor.appendChild(seletorCor);

        const botaoExcluir = document.createElement("button");
        botaoExcluir.textContent = "Excluir";

        botaoExcluir.addEventListener("click", function() {
            materias.splice(indice, 1);
            salvarMaterias();
            mostrarMaterias();
        });

        item.appendChild(nome);
        item.appendChild(areaCor);
        item.appendChild(botaoExcluir);

        listaMaterias.appendChild(item);
    });

    atualizarOpcoesMaterias();
}

// Adicionar uma nova matéria
formularioMateria.addEventListener("submit", function(event) {
    event.preventDefault();

    const nome = nomeMateria.value.trim();

    if (nome === "") {
        return;
    }

    const novaMateria = {
        nome: nome,
        cor: corMateria.value
    };

    materias.push(novaMateria);

    salvarMaterias();
    mostrarMaterias();

    formularioMateria.reset();
});

// Salvar a conversão das matérias antigas
salvarMaterias();

// Mostrar matérias ao carregar a página
mostrarMaterias();


// Função para navegar entre as páginas
function mostrarPagina(pagina) {
    const secoes = ["inicio", "tarefas", "notas", "materias"];

    secoes.forEach(function(nome) {
        document.getElementById(nome).style.display = "none";
    });

    document.getElementById(pagina).style.display = "block";
}