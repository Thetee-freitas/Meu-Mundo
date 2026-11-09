
/* =========================================
   MEU MUNDO! - FUNCIONALIDADES
   HTML + CSS + JAVASCRIPT
   Sem banco de dados
========================================= */

// =========================================
// 1. ARMAZENAMENTO LOCAL
// =========================================

const STORAGE_KEY = 'meuMundoDados';

function carregarDados() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {
            rotina: [],
            atividades: [],
            emocao: ''
        };
    } catch {
        return {
            rotina: [],
            atividades: [],
            emocao: ''
        };
    }
}

let dados = carregarDados();

function salvarDados() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dados));
}

// =========================================
// 2. ELEMENTOS PRINCIPAIS
// =========================================

const botaoComecar = document.getElementById('botaoComecar');
const botaoPerfil = document.querySelector('.botao-perfil');

// =========================================
// 3. CRIAR JANELA DE INTERAÇÃO
// =========================================

const modal = document.createElement('div');

modal.id = 'modalMeuMundo';
modal.className = 'modal';

modal.innerHTML = `
    <div class="modal-conteudo" role="dialog"
         aria-modal="true" aria-labelledby="modalTitulo">

        <button class="fechar-modal"
                id="fecharModal"
                aria-label="Fechar janela">
            &times;
        </button>

        <div id="conteudoModal"></div>

    </div>
`;

document.body.appendChild(modal);

const conteudoModal = document.getElementById('conteudoModal');

function abrirModal(conteudo) {
    conteudoModal.innerHTML = conteudo;
    modal.classList.add('ativo');
    document.body.style.overflow = 'hidden';
}

function fecharModal() {
   pararTimer();
    modal.classList.remove('ativo');
    document.body.style.overflow = '';
}

document.getElementById('fecharModal').addEventListener('click', fecharModal);

modal.addEventListener('click', (evento) => {
    if (evento.target === modal) {
        fecharModal();
    }
});

document.addEventListener('keydown', (evento) => {
    if (evento.key === 'Escape') {
        fecharModal();
    }
});

// =========================================
// 4. BOTÃO VAMOS COMEÇAR
// =========================================

if (botaoComecar) {
    botaoComecar.addEventListener('click', () => {
        document.querySelector('.secao-funcionalidades')
            .scrollIntoView({ behavior: 'smooth' });
    });
}

// =========================================
// 5. MINHA ROTINA
// =========================================

const tarefasRotina = [
    '🌞 Acordar e arrumar a cama',
    '🪥 Escovar os dentes',
    '🥛 Tomar café da manhã',
    '🎒 Preparar o material',
    '📚 Estudar e aprender',
    '🍎 Fazer uma pausa para lanchar',
    '🧸 Brincar e se divertir',
    '🌙 Preparar-se para dormir'
];

function abrirRotina() {
    const lista = tarefasRotina.map((tarefa, indice) => {
        const concluida = dados.rotina.includes(indice);

        return `
            <label class="item-interativo ${concluida ? 'concluido' : ''}">
                <input type="checkbox"
                       class="check-rotina"
                       data-indice="${indice}"
                       ${concluida ? 'checked' : ''}>
                <span>${tarefa}</span>
            </label>
        `;
    }).join('');

    abrirModal(`
        <span class="modal-icone">📅</span>
        <h2 id="modalTitulo">Minha rotina</h2>
        <p>Vamos organizar o nosso dia? Marque o que você já realizou!</p>

        <div class="lista-interativa">${lista}</div>

        <div class="mensagem-progresso" id="progressoRotina">
            Você já concluiu ${dados.rotina.length} de ${tarefasRotina.length} tarefas!
        </div>
    `);
}

/* =========================================
   6. MINHAS ATIVIDADES - JOGOS EDUCATIVOS
========================================= */

const listaAtividades = [
    {
        nome: 'Descobrindo as cores',
        descricao: 'Vamos explorar o mundo das cores!',
        icone: '🎨',
        categoria: 'Percepção visual',
        cor: '#FFF0D9'
    },
    {
        nome: 'Aventura dos números',
        descricao: 'Conte, descubra e aprenda!',
        icone: '🔢',
        categoria: 'Raciocínio lógico',
        cor: '#E8F2FF'
    },
    {
        nome: 'Mundo das letras',
        descricao: 'Uma aventura pelo alfabeto!',
        icone: '🔤',
        categoria: 'Linguagem',
        cor: '#F0EAFE'
    },
    {
        nome: 'Jogo da memória',
        descricao: 'Encontre os pares escondidos!',
        icone: '🧩',
        categoria: 'Memória e atenção',
        cor: '#E5F6E9'
    }
];

let jogoAtual = null;
let respostaSelecionada = null;

let cartasMemoria = [];
let cartasEscolhidas = [];
let paresEncontrados = [];
let memoriaBloqueada = false;

// -----------------------------------------
// ABRIR GALERIA DE ATIVIDADES
// -----------------------------------------

function abrirAtividades() {

    const cartoes = listaAtividades.map((atividade, indice) => {

        const concluida = dados.atividades.includes(indice);

        return `
            <article class="jogo-card"
                     style="--cor-jogo:${atividade.cor}">

                <div class="jogo-ilustracao">
                    <span>${atividade.icone}</span>
                    ${concluida ? '<span class="selo-concluido">✓</span>' : ''}
                </div>

                <div class="jogo-informacoes">
                    <small>${atividade.categoria}</small>
                    <h3>${atividade.nome}</h3>
                    <p>${atividade.descricao}</p>

                    <button class="botao-jogar"
                            data-iniciar-jogo="${indice}">
                        ${concluida ? 'Jogar novamente ↻' : 'Começar aventura →'}
                    </button>
                </div>
            </article>
        `;

    }).join('');

    abrirModal(`
        <div class="cabecalho-jogos">
            <span class="modal-icone">🌈</span>
            <span class="etiqueta-jogos">ESPAÇO DE APRENDIZAGEM</span>
        </div>

        <h2 id="modalTitulo">Minhas atividades</h2>

        <p>Aprender pode ser uma aventura!
        Escolha um jogo e divirta-se no seu ritmo.</p>

        <div class="resumo-jogos">
            <span>⭐ Suas conquistas</span>
            <strong>${dados.atividades.length} de ${listaAtividades.length} atividades realizadas</strong>
        </div>

        <div class="grade-jogos">
            ${cartoes}
        </div>
    `);
}

// -----------------------------------------
// ABRIR UM JOGO
// -----------------------------------------

function abrirJogo(indice) {

    jogoAtual = indice;
    respostaSelecionada = null;

    if (indice === 0) {
        renderizarJogoCores();
    }

    if (indice === 1) {
        renderizarJogoNumeros();
    }

    if (indice === 2) {
        renderizarJogoLetras();
    }

    if (indice === 3) {
        iniciarJogoMemoria();
    }
}

// -----------------------------------------
// ESTRUTURA DOS DESAFIOS
// -----------------------------------------

function renderizarDesafio(titulo, instrucoes, pergunta, opcoes) {

    const botoes = opcoes.map(opcao => `
        <button class="opcao-jogo"
                data-resposta="${opcao.valor}"
                style="--cor-opcao:${opcao.cor}">
            ${opcao.conteudo}
        </button>
    `).join('');

    abrirModal(`
        <button class="voltar-jogos" id="voltarAtividades">
            ← Voltar aos jogos
        </button>

        <div class="jogo-titulo">
            <span class="modal-icone">${listaAtividades[jogoAtual].icone}</span>
            <span class="etiqueta-jogos">DESAFIO EDUCATIVO</span>
        </div>

        <h2 id="modalTitulo">${titulo}</h2>

        <p>${instrucoes}</p>

        <div class="pergunta-jogo">
            ${pergunta}
        </div>

        <div class="opcoes-jogo">
            ${botoes}
        </div>

        <div id="feedbackJogo" class="feedback-jogo" aria-live="polite">
            Escolha sua resposta! 💙
        </div>
    `);
}

// -----------------------------------------
// JOGO 1 - DESCOBRINDO AS CORES
// -----------------------------------------

function renderizarJogoCores() {

    renderizarDesafio(
        'Descobrindo as cores',
        'Observe com atenção e encontre a cor solicitada!',
        `
            <strong>Onde está a cor AZUL?</strong>
        `,
        [
            {
                valor: 'vermelho',
                conteudo: '<span class="bola-cor" style="background:#F47777"></span>Vermelho',
                cor: '#FFF0F0'
            },
            {
                valor: 'azul',
                conteudo: '<span class="bola-cor" style="background:#6C9FE8"></span>Azul',
                cor: '#EAF3FF'
            },
            {
                valor: 'amarelo',
                conteudo: '<span class="bola-cor" style="background:#FFD66B"></span>Amarelo',
                cor: '#FFF8DF'
            },
            {
                valor: 'verde',
                conteudo: '<span class="bola-cor" style="background:#A9DDBB"></span>Verde',
                cor: '#E5F6E9'
            }
        ]
    );
}

// -----------------------------------------
// JOGO 2 - AVENTURA DOS NÚMEROS
// -----------------------------------------

function renderizarJogoNumeros() {

    renderizarDesafio(
        'Aventura dos números',
        'Conte os desenhos com calma. Você consegue!',
        `
            <div class="objetos-contagem">
                ⭐ ⭐ ⭐ ⭐
            </div>
            <strong>Quantas estrelas aparecem?</strong>
        `,
        [
            { valor: '3', conteudo: '3', cor: '#FFF0D9' },
            { valor: '4', conteudo: '4', cor: '#E8F2FF' },
            { valor: '5', conteudo: '5', cor: '#F0EAFE' }
        ]
    );
}

// -----------------------------------------
// JOGO 3 - MUNDO DAS LETRAS
// -----------------------------------------

function renderizarJogoLetras() {

    renderizarDesafio(
        'Mundo das letras',
        'Vamos descobrir uma letra do nosso alfabeto!',
        `
            <div class="letra-destaque">M</div>
            <strong>Qual é a letra que aparece acima?</strong>
        `,
        [
            { valor: 'A', conteudo: 'A', cor: '#FFF0D9' },
            { valor: 'M', conteudo: 'M', cor: '#E5F6E9' },
            { valor: 'N', conteudo: 'N', cor: '#E8F2FF' }
        ]
    );
}

// -----------------------------------------
// VERIFICAR RESPOSTAS
// -----------------------------------------

function verificarResposta(resposta) {

    const corretas = {
        0: 'azul',
        1: '4',
        2: 'M'
    };

    const feedback = document.getElementById('feedbackJogo');

    if (!feedback) return;

    if (resposta === corretas[jogoAtual]) {

        feedback.className = 'feedback-jogo feedback-correto';

        feedback.innerHTML =
            '🎉 Muito bem! Você conseguiu!';

        document.querySelectorAll('.opcao-jogo').forEach(botao => {
            botao.disabled = true;

            if (botao.dataset.resposta === resposta) {
                botao.classList.add('resposta-correta');
            }
        });

        setTimeout(() => {
            finalizarJogo();
        }, 1200);

    } else {

        feedback.className = 'feedback-jogo feedback-tentar';

        feedback.innerHTML =
            '💛 Quase lá! Vamos tentar novamente?';

    }
}

// -----------------------------------------
// FINALIZAR ATIVIDADE
// -----------------------------------------

function finalizarJogo() {

    if (!dados.atividades.includes(jogoAtual)) {
        dados.atividades.push(jogoAtual);
        salvarDados();
    }

    const atividade = listaAtividades[jogoAtual];

    abrirModal(`
        <div class="tela-vitoria">
            <div class="celebracao">🎉 🌟 🎉</div>

            <span class="vitoria-icone">${atividade.icone}</span>

            <h2 id="modalTitulo">Parabéns!</h2>

            <p>Você concluiu a atividade
            <strong>${atividade.nome}</strong>!</p>

            <div class="mensagem-vitoria">
                Cada descoberta é uma conquista! 💙
            </div>

            <button class="botao-jogar"
                    id="voltarAtividades">
                Escolher outro jogo →
            </button>
        </div>
    `);
}

// -----------------------------------------
// JOGO 4 - JOGO DA MEMÓRIA
// -----------------------------------------

function iniciarJogoMemoria() {

    const figuras = ['🐶', '🐱', '🦋', '🐸'];

    cartasMemoria = [...figuras, ...figuras]
        .map((figura, indice) => ({
            id: indice,
            figura: figura
        }))
        .sort(() => Math.random() - 0.5);

    cartasEscolhidas = [];
    paresEncontrados = [];
    memoriaBloqueada = false;

    renderizarMemoria();
}

function renderizarMemoria() {

    const cartas = cartasMemoria.map(carta => {

        const encontrada = paresEncontrados.includes(carta.id);

        const escolhida = cartasEscolhidas.includes(carta.id);

        return `
            <button class="carta-memoria
                    ${encontrada ? 'par-encontrado' : ''}"
                    data-carta="${carta.id}"
                    aria-label="${encontrada || escolhida ? carta.figura : 'Carta escondida'}">

                ${encontrada || escolhida ? carta.figura : '❔'}

            </button>
        `;

    }).join('');

    abrirModal(`
        <button class="voltar-jogos" id="voltarAtividades">
            ← Voltar aos jogos
        </button>

        <span class="modal-icone">🧩</span>

        <h2 id="modalTitulo">Jogo da memória</h2>

        <p>Encontre os pares de animais iguais!</p>

        <div class="memoria-grade">
            ${cartas}
        </div>

        <div class="feedback-jogo" aria-live="polite">
            Pares encontrados: ${paresEncontrados.length / 2} de 4 💚
        </div>
    `);
}

function selecionarCarta(indice) {

    if (memoriaBloqueada ||
        cartasEscolhidas.includes(indice) ||
        paresEncontrados.includes(indice)) {
        return;
    }

    cartasEscolhidas.push(indice);
    renderizarMemoria();

    if (cartasEscolhidas.length === 2) {

        const [primeira, segunda] = cartasEscolhidas;

        if (cartasMemoria[primeira].figura ===
            cartasMemoria[segunda].figura) {

            paresEncontrados.push(primeira, segunda);
            cartasEscolhidas = [];

            if (paresEncontrados.length === cartasMemoria.length) {
                setTimeout(finalizarJogo, 600);
            } else {
                renderizarMemoria();
            }

        } else {

            memoriaBloqueada = true;

            setTimeout(() => {
                cartasEscolhidas = [];
                memoriaBloqueada = false;
                renderizarMemoria();
            }, 900);
        }
    }
}

// =========================================
// 7. MEU TEMPO - TEMPORIZADOR
// =========================================

let intervaloTimer = null;
let tempoRestante = 5 * 60;
let tempoInicial = 5 * 60;
let timerAtivo = false;

function formatarTempo(segundos) {
    const minutos = Math.floor(segundos / 60);
    const resto = segundos % 60;

    return `${String(minutos).padStart(2, '0')}:${String(resto).padStart(2, '0')}`;
}

function atualizarTimer() {
    const visor = document.getElementById('visorTimer');

    if (visor) {
        visor.textContent = formatarTempo(tempoRestante);
    }
}

function pararTimer() {
    clearInterval(intervaloTimer);
    intervaloTimer = null;
    timerAtivo = false;
}

function abrirTemporizador() {
    pararTimer();
    tempoRestante = 5 * 60;
    tempoInicial = 5 * 60;

    abrirModal(`
        <span class="modal-icone">⏰</span>
        <h2 id="modalTitulo">Meu tempo</h2>
        <p>Vamos organizar nosso tempo de maneira divertida!</p>

        <div class="timer-caixa">
            <div class="timer-visor" id="visorTimer">05:00</div>
            <p>Tempo da atividade</p>
        </div>

        <div class="timer-configuracao">
            <button class="botao-tempo" data-minutos="1">1 min</button>
            <button class="botao-tempo selecionado" data-minutos="5">5 min</button>
            <button class="botao-tempo" data-minutos="10">10 min</button>
            <button class="botao-tempo" data-minutos="15">15 min</button>
        </div>

        <div class="timer-botoes">
            <button id="iniciarTimer" class="botao-acao">▶ Iniciar</button>
            <button id="pausarTimer" class="botao-secundario">⏸ Pausar</button>
            <button id="reiniciarTimer" class="botao-secundario">↻ Reiniciar</button>
        </div>

        <div id="mensagemTimer" class="mensagem-progresso">
            Você está pronto para começar!
        </div>
    `);
}

// =========================================
// 8. MINHAS EMOÇÕES
// =========================================

const emocoes = [
    { nome: 'Feliz', emoji: '😄', cor: '#FFF0C9' },
    { nome: 'Triste', emoji: '😢', cor: '#E6F0FF' },
    { nome: 'Bravo', emoji: '😠', cor: '#FFE5E5' },
    { nome: 'Calmo', emoji: '😌', cor: '#E1F5E8' },
    { nome: 'Ansioso', emoji: '😰', cor: '#F0E8FF' },
    { nome: 'Cansado', emoji: '😴', cor: '#F0EDFF' }
];

function abrirEmocoes() {
    const opcoes = emocoes.map((emocao) => {
        const selecionada = dados.emocao === emocao.nome;

        return `
            <button class="emocao-item ${selecionada ? 'emocao-selecionada' : ''}"
                    data-emocao="${emocao.nome}"
                    style="background:${emocao.cor}">
                <span>${emocao.emoji}</span>
                <strong>${emocao.nome}</strong>
            </button>
        `;
    }).join('');

    abrirModal(`
        <span class="modal-icone">💗</span>
        <h2 id="modalTitulo">Como estou me sentindo?</h2>
        <p>Todos os sentimentos são importantes. Escolha aquele que representa você agora.</p>

        <div class="grade-emocoes">${opcoes}</div>

        <div class="mensagem-progresso" id="mensagemEmocao">
            ${dados.emocao
                ? `Hoje você está se sentindo: ${dados.emocao}. 💛`
                : 'Pode escolher uma emoção!'}
        </div>
    `);
}

// =========================================
// 9. ÁREA DOS RESPONSÁVEIS
// =========================================

function abrirPerfil() {
    abrirModal(`
        <span class="modal-icone">👨‍👩‍👧</span>
        <h2 id="modalTitulo">Área dos responsáveis</h2>
        <p>Acompanhe as conquistas e atividades realizadas no aplicativo.</p>

        <div class="resumo-progresso">
            <div class="resumo-item">
                <span>📅</span>
                <strong>${dados.rotina.length}/${tarefasRotina.length}</strong>
                <small>Tarefas realizadas</small>
            </div>

            <div class="resumo-item">
                <span>🧩</span>
                <strong>${dados.atividades.length}/${listaAtividades.length}</strong>
                <small>Atividades concluídas</small>
            </div>

            <div class="resumo-item">
                <span>💗</span>
                <strong>${dados.emocao || 'Não selecionada'}</strong>
                <small>Última emoção escolhida</small>
            </div>
        </div>

        <p class="aviso-responsaveis">
            ℹ️ Esta é uma área demonstrativa. As informações ficam salvas somente neste navegador.
        </p>

        <button class="botao-secundario botao-reset" id="limparDados">
            Limpar dados de demonstração
        </button>
    `);
}

// =========================================
// 10. CLIQUES E INTERAÇÕES
// =========================================

document.addEventListener('click', (evento) => {

    // Abrir rotina
    if (evento.target.closest('#rotina a')) {
        evento.preventDefault();
        abrirRotina();
    }

    // Abrir atividades
    if (evento.target.closest('#atividades a')) {
        evento.preventDefault();
        abrirAtividades();
    }

    // Abrir temporizador
    if (evento.target.closest('#tempo a')) {
        evento.preventDefault();
        abrirTemporizador();
    }

    // Abrir emoções
    if (evento.target.closest('#emocoes a')) {
        evento.preventDefault();
        abrirEmocoes();
    }

    // Abrir perfil
    if (evento.target.closest('.botao-perfil')) {
        abrirPerfil();
    }

    // Marcar tarefas da rotina
    if (evento.target.classList.contains('check-rotina')) {
        const indice = Number(evento.target.dataset.indice);

        if (evento.target.checked) {
            if (!dados.rotina.includes(indice)) {
                dados.rotina.push(indice);
            }
        } else {
            dados.rotina = dados.rotina.filter(item => item !== indice);
        }

        salvarDados();
        abrirRotina();
    }

    // Iniciar um jogo
    if (evento.target.closest('[data-iniciar-jogo]')) {
        const botao = evento.target.closest('[data-iniciar-jogo]');
        abrirJogo(Number(botao.dataset.iniciarJogo));
    }

    // Selecionar resposta
    if (evento.target.closest('.opcao-jogo')) {
        const botao = evento.target.closest('.opcao-jogo');

        if (!botao.disabled) {
            verificarResposta(botao.dataset.resposta);
        }
    }

    // Selecionar carta da memória
    if (evento.target.closest('.carta-memoria')) {
        const botao = evento.target.closest('.carta-memoria');
        selecionarCarta(Number(botao.dataset.carta));
    }

    // Voltar à galeria de jogos
    if (evento.target.closest('#voltarAtividades')) {
        abrirAtividades();
    }

    // Escolher emoção
    if (evento.target.closest('.emocao-item')) {
        const botao = evento.target.closest('.emocao-item');

        dados.emocao = botao.dataset.emocao;
        salvarDados();
        abrirEmocoes();
    }

    // Configurar tempo
    if (evento.target.closest('.botao-tempo')) {
        pararTimer();

        const botao = evento.target.closest('.botao-tempo');
        const minutos = Number(botao.dataset.minutos);

        tempoInicial = minutos * 60;
        tempoRestante = tempoInicial;

        document.querySelectorAll('.botao-tempo').forEach(item => {
            item.classList.remove('selecionado');
        });

        botao.classList.add('selecionado');

        atualizarTimer();

        document.getElementById('mensagemTimer').textContent =
            'Tempo configurado! Vamos começar?';
    }

    // Iniciar temporizador
    if (evento.target.id === 'iniciarTimer') {
        if (!timerAtivo && tempoRestante > 0) {
            timerAtivo = true;

            document.getElementById('mensagemTimer').textContent =
                'Muito bem! Continue no seu ritmo. 💙';

            intervaloTimer = setInterval(() => {
                tempoRestante--;
                atualizarTimer();

                if (tempoRestante <= 0) {
                    pararTimer();

                    document.getElementById('mensagemTimer').textContent =
                        '🎉 Parabéns! Seu tempo terminou!';
                }
            }, 1000);
        }
    }

    // Pausar temporizador
    if (evento.target.id === 'pausarTimer') {
        pararTimer();

        document.getElementById('mensagemTimer').textContent =
            'Tudo bem fazer uma pausa! 💛';
    }

    // Reiniciar temporizador
    if (evento.target.id === 'reiniciarTimer') {
        pararTimer();

        tempoRestante = tempoInicial;
        atualizarTimer();

        document.getElementById('mensagemTimer').textContent =
            'Temporizador reiniciado!';
    }

    // Limpar dados de demonstração
    if (evento.target.id === 'limparDados') {
        if (confirm('Deseja realmente apagar o progresso salvo neste navegador?')) {
            pararTimer();

            dados = {
                rotina: [],
                atividades: [],
                emocao: ''
            };

            salvarDados();
            abrirPerfil();
        }
    }
});

// =========================================
// 11. INICIALIZAÇÃO
// =========================================

console.log('🌈 Meu Mundo! carregado com sucesso!');
console.log('Funcionalidades interativas disponíveis.');
