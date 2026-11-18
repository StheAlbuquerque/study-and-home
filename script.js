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
    const secoes = [
        "inicio",
        "tarefas",
        "notas",
        "materias",
        "calendario",
        "pomodoro"
    ];

    secoes.forEach(function(nome) {
        document.getElementById(nome).style.display = "none";
    });

    const paginaSelecionada = document.getElementById(pagina);

    if (paginaSelecionada) {
        paginaSelecionada.style.display = "block";
    }
}

// Elementos do calendário

const mesAno = document.getElementById("mes-ano");
const diasCalendario = document.getElementById("dias-calendario");
const botaoMesAnterior = document.getElementById("mes-anterior");
const botaoProximoMes = document.getElementById("proximo-mes");

const formularioEvento = document.getElementById("form-evento");
const nomeEvento = document.getElementById("nome-evento");
const tipoEvento = document.getElementById("tipo-evento");
const corEvento = document.getElementById("cor-evento");
const listaEventos = document.getElementById("lista-eventos");
const tituloFormularioEvento = document.getElementById("titulo-form-evento");

let eventos = JSON.parse(localStorage.getItem("eventos")) || [];

const hoje = new Date();

let mesAtual = new Date(
    hoje.getFullYear(),
    hoje.getMonth(),
    1
);

let dataSelecionada = 
    hoje.getFullYear() + "-" +
    String(hoje.getMonth() + 1).padStart(2, "0") + "-" +
    String(hoje.getDate()).padStart(2, "0");

function salvarEventos() {
    localStorage.setItem("eventos", JSON.stringify(eventos));
}

// formatar uma data para exibição
function formatarData(data) {
    const partes = data.split("-");

    const dataFormatada = new Date(
        Number(partes[0]),
        Number(partes[1]) - 1,
        Number(partes[2])
    );

    return dataFormatada.toLocaleDateString("pt-BR");
}

// mostrar calendario na tela
function mostrarCalendario() {
    diasCalendario.innerHTML = "";

    const ano = mesAtual.getFullYear();
    const mes = mesAtual.getMonth();

    const primeiroDia = new Date(ano, mes, 1).getDay();
    const quantidadeDias = new Date(ano, mes + 1, 0).getDate();

    mesAno.textContent = mesAtual.toLocaleString("pt-BR", {
        month: "long",
        year: "numeric"
    });

    for (let i = 0; i < primeiroDia; i++) {
        const espaco = document.createElement("div");
        espaco.classList.add("calendar-empty");
        diasCalendario.appendChild(espaco);
    }

    for (let dia = 1; dia <= quantidadeDias; dia++) {
        const botaoDia = document.createElement("button");

        botaoDia.type = "button";
        botaoDia.textContent = dia;
        botaoDia.classList.add("calendar-day");

        const dataDia = ano + "-" +
            String(mes + 1).padStart(2, "0") + "-" +
            String(dia).padStart(2, "0");

        if (dataDia === dataSelecionada) {
            botaoDia.classList.add("dia-selecionado");
        }

        const dataHoje = hoje.getFullYear() + "-" +
            String(hoje.getMonth() + 1).padStart(2, "0") + "-" + 
            String(hoje.getDate()).padStart(2, "0");

        if (dataDia === dataHoje) {
            botaoDia.classList.add("dia-atual");
        }

        // Mostrar bolinhas dos eventos
        const eventosDoDia = eventos.filter(function(evento) {
            return evento.data === dataDia;
        });
        
        if (eventosDoDia.length > 0) {
            const bolinhas = document.createElement("div");
            bolinhas.classList.add("event-dots");

            eventosDoDia.forEach(function(evento) {
                const bolinha = document.createElement("span");
                bolinha.style.backgroundColor = evento.cor;

                bolinhas.appendChild(bolinha);
            });

            botaoDia.appendChild(bolinhas);
        }

        // Selecionar um dia
        botaoDia.addEventListener("click", function() {
            dataSelecionada = dataDia;

            tituloFormularioEvento.textContent = "Adicionar evento em " + formatarData(dataDia) + " ♡";

            mostrarCalendario();    
        });

        diasCalendario.appendChild(botaoDia);
    }
}

// Mostrar os próximos compromissos
function mostrarEventos() {
    listaEventos.innerHTML = "";

    const dataHoje = 
        hoje.getFullYear() + "-" +
        String(hoje.getMonth() + 1).padStart(2, "0") + "-" +
        String(hoje.getDate()).padStart(2, "0");

    const proximosEventos = eventos
        .filter(function(evento) {
            return evento.data >= dataHoje;
        })
        .sort(function(a, b) {
            return a.data.localeCompare(b.data);
        });

    if (proximosEventos.length === 0) {
        listaEventos.textContent = "Nenhum compromisso próximo. ♡";
        return;
    }

    proximosEventos.forEach(function(evento, indice) {
        const item = document.createElement("div");
        item.classList.add("evento-card");
        item.style.borderLeftColor = evento.cor;

        const nome = document.createElement("h4");
        nome.textContent = evento.nome;

        const informacoes = document.createElement("p");
        informacoes.textContent =
            evento.tipo + " • " + formatarData(evento.data);

        
        const botaoExcluir = document.createElement("button");
        botaoExcluir.type = "button";
        botaoExcluir.textContent = "Excluir";

        botaoExcluir.addEventListener("click", function() {
            const indice = eventos.indexOf(evento);

            eventos.splice(indice, 1);

            salvarEventos();
            mostrarCalendario();
            mostrarEventos();
        });
        
        item.appendChild(nome);
        item.appendChild(informacoes);
        item.appendChild(botaoExcluir);

        listaEventos.appendChild(item);
    });
}

// Adicionar um compromisso
formularioEvento.addEventListener("submit", function(event) {
    event.preventDefault();

    const nome = nomeEvento.value.trim();

    if (nome === "") {
        return;
    }

    const novoEvento = {
        nome: nome,
        tipo: tipoEvento.value,
        cor: corEvento.value,
        data: dataSelecionada
    };

    eventos.push(novoEvento);

    salvarEventos();
    mostrarCalendario();
    mostrarEventos();

    formularioEvento.reset();
});

// Ir para o mês anterior
botaoMesAnterior.addEventListener("click", function() {
    mesAtual.setMonth(mesAtual.getMonth() - 1);
    mostrarCalendario();
});

// Ir para o próximo mês
botaoProximoMes.addEventListener("click", function() {
    mesAtual.setMonth(mesAtual.getMonth() + 1);
    mostrarCalendario();
});

// Mostrar calendário e eventos ao carregar a página
tituloFormularioEvento.textContent =
    "Adicionar compromisso em " + formatarData(dataSelecionada) + " ♡";

mostrarCalendario();
mostrarEventos();

// Elementos do Pomodoro
const tempoPomodoro = document.getElementById("tempo-pomodoro");
const modoPomodoro = document.getElementById("modo-pomodoro");
const mensagemPomodoro = document.getElementById("mensagem-pomodoro");

const campoTempoEstudo = document.getElementById("tempo-estudo");
const campoPausaCurta = document.getElementById("tempo-pausa-curta");
const campoPausaLonga = document.getElementById("tempo-pausa-longa");

const botaoSalvarTempos = document.getElementById("salvar-tempos");
const modoFuncionamento = document.getElementById("modo-funcionamento");

const ciclosPomodoro = document.getElementById("ciclos-pomodoro");

// Recuperar os tempos salvos no navegador
let duracaoEstudo = Number(localStorage.getItem("tempoEstudo")) || 25;
let duracaoPausaCurta = Number(localStorage.getItem("pausaCurta")) || 5;
let duracaoPausaLonga = Number(localStorage.getItem("pausaLonga")) || 15;

// Mostrar os tempos salvos nos campos
campoTempoEstudo.value = duracaoEstudo;
campoPausaCurta.value = duracaoPausaCurta;
campoPausaLonga.value = duracaoPausaLonga;

// Configurações iniciais
let tempoRestante = duracaoEstudo * 60;
let intervaloPomodoro = null;
let ciclosConcluidos = 0;
let tipoAtual = "estudo";

// Salvar os tempos personalizados
botaoSalvarTempos.addEventListener("click", function() {
    const estudo = Number(campoTempoEstudo.value);
    const pausaCurta = Number(campoPausaCurta.value);
    const pausaLonga = Number(campoPausaLonga.value);

    if (
        !Number.isInteger(estudo) || estudo <= 0 ||
        !Number.isInteger(pausaCurta) || pausaCurta <= 0 ||
        !Number.isInteger(pausaLonga) || pausaLonga <= 0
    ) {
        alert("Digite tempos válidos, em minutos!");
        return;
    }

    duracaoEstudo = estudo;
    duracaoPausaCurta = pausaCurta;
    duracaoPausaLonga = pausaLonga;

    // Guardar os tempos no navegador
    localStorage.setItem("tempoEstudo", duracaoEstudo);
    localStorage.setItem("pausaCurta", duracaoPausaCurta);
    localStorage.setItem("pausaLonga", duracaoPausaLonga);

    if (intervaloPomodoro === null && tipoAtual === "estudo") {
        tempoRestante = duracaoEstudo * 60;

        tempoPomodoro.textContent =
            String(duracaoEstudo).padStart(2, "0") + ":00";
    }

    alert("Tempos personalizados salvos! ♡");
});

// Elementos dos botões do Pomodoro

const botaoIniciar = document.getElementById("iniciar-pomodoro");
const botaoPausar = document.getElementById("pausar-pomodoro");
const botaoReiniciar = document.getElementById("reiniciar-pomodoro");

// Cartão do Pomodoro
const cartaoPomodoro = document.querySelector(".pomodoro-card");

// Atualizar o relógio na tela
function atualizarRelogio() {
    const minutos = Math.floor(tempoRestante / 60);
    const segundos = tempoRestante % 60;

    tempoPomodoro.textContent =
        String(minutos).padStart(2, "0") + ":" +
        String(segundos).padStart(2, "0");
}

// Iniciar o cronômetro
botaoIniciar.addEventListener("click", function() {
    if (intervaloPomodoro !== null) {
        return;
    }

    intervaloPomodoro = setInterval(function() {
        if (tempoRestante > 0) {
            tempoRestante--;
            atualizarRelogio();
        } else {
            finalizarPomodoro();
        }
    }, 1000);
});

// Pausar o cronômetro
botaoPausar.addEventListener("click", function() {
    clearInterval(intervaloPomodoro);
    intervaloPomodoro = null;
});

// Reiniciar o cronômetro
botaoReiniciar.addEventListener("click", function() {
    clearInterval(intervaloPomodoro);
    intervaloPomodoro = null;

    if (tipoAtual === "estudo") {
        tempoRestante = duracaoEstudo * 60;
    }

    atualizarRelogio();

    mensagemPomodoro.textContent =
        "Prepare-se para mais uma sessão! ♡";
});

// Trocar o momento do Pomodoro
function selecionarModo(tipo) {
    clearInterval(intervaloPomodoro);
    intervaloPomodoro = null;

    tipoAtual = tipo;

    // Alterar a cor do cartão conforme o momento
    cartaoPomodoro.classList.remove(
        "pomodoro-estudo",
        "pomodoro-pausa-curta",
        "pomodoro-pausa-longa"
    );

    cartaoPomodoro.classList.add("pomodoro-" + tipo);

    if (tipo === "estudo") {
        tempoRestante = duracaoEstudo * 60;
        modoPomodoro.textContent = "Hora de estudar 📚";
        mensagemPomodoro.textContent = "Vamos focar nos estudos!";
    }

    else if (tipo === "pausa-curta") {
        tempoRestante = duracaoPausaCurta * 60;
        modoPomodoro.textContent = "Pausa curta 🌷";
        mensagemPomodoro.textContent = "Hora de respirar um pouquinho!";
    }

    else if (tipo === "pausa-longa") {
        tempoRestante = duracaoPausaLonga * 60;
        modoPomodoro.textContent = "Pausa longa ☁️";
        mensagemPomodoro.textContent = "Você merece um descanso maior!";
    }

    atualizarRelogio();
}

// Botões para escolher o momento
document.getElementById("modo-estudo").addEventListener("click", function() {
    selecionarModo("estudo");
});

document.getElementById("modo-pausa-curta").addEventListener("click", function() {
    selecionarModo("pausa-curta");
});

document.getElementById("modo-pausa-longa").addEventListener("click", function() {
    selecionarModo("pausa-longa");
});

// Finalizar uma sessão do Pomodoro
function finalizarPomodoro() {
    clearInterval(intervaloPomodoro);
    intervaloPomodoro = null;

    if (tipoAtual === "estudo") {
        ciclosConcluidos++;

        ciclosPomodoro.textContent = ciclosConcluidos;

        if (modoFuncionamento.value === "automatico") {

            if (ciclosConcluidos % 4 === 0) {
                selecionarModo("pausa-longa");
            } else {
                selecionarModo("pausa-curta");
            }

            alert("Estudo concluído! Hora de descansar! 🌷");
            botaoIniciar.click();

        } else {

            if (ciclosConcluidos % 4 === 0) {
                mensagemPomodoro.textContent =
                    "Estudo concluído! Que tal uma pausa longa? ☁️";
            } else {
                mensagemPomodoro.textContent =
                    "Estudo concluído! Que tal uma pausa curta? 🌷";
            }

            alert("Sua sessão de estudo terminou! 🍅");
        }

    } else {

        if (modoFuncionamento.value === "automatico") {
            selecionarModo("estudo");

            alert("Descanso concluído! Vamos voltar aos estudos! 📚");
            botaoIniciar.click();

        } else {
            mensagemPomodoro.textContent =
                "Sua pausa terminou! Quando quiser, volte a estudar. ♡";

            alert("Sua pausa terminou! 💗");
        }
    }
}
// Atualizar o relógio ao carregar a página
atualizarRelogio();