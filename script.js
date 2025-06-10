
       
let jogadores = [];
let confrontos = [];
let rodadaAtual = 0;
let torneioComecou = false;
let confrontoAtualId = null;


const eventos = {
    jogadaOriginal: { nome: "Jogada Original", pontos: 5 },
    gafe: { nome: "Gafe", pontos: -3 },
    vantagem: { nome: "Posicionamento vantajoso", pontos: 2 },
    desrespeito: { nome: "Desrespeito", pontos: -5 },
    furia: { nome: "Ataque de fúria", pontos: -7 }
};


const tabs = document.querySelectorAll('.tab');
const tabContents = document.querySelectorAll('.tab-content');


function embaralhar(array) {
    const novoArray = [...array];
    for (let i = novoArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [novoArray[i], novoArray[j]] = [novoArray[j], novoArray[i]];
    }
    return novoArray;
}

function showTab(tabId) {
    tabs.forEach(tab => tab.classList.remove('active'));
    tabContents.forEach(content => content.classList.remove('active'));
    
    document.querySelector(`.tab[data-tab="${tabId}"]`).classList.add('active');
    document.getElementById(tabId).classList.add('active');
    
    atualizarTela();
}


function adicionarJogador() {
    const nome = document.getElementById('playerNome').value.trim();
    const apelido = document.getElementById('playerApelido').value.trim();
    const rating = parseInt(document.getElementById('playerRating').value);
    
    if (!nome || !apelido) {
        alert("O jogador deve possuir um nome e um apelido.");
        return;
    }
    
    if (isNaN(rating) || rating < 1 || rating > 15000) {
        alert("o Rating deve ser entre 1 e 15000.");
        return;
    }
    
    const jogador = {
        id: Date.now(),
        nome,
        apelido,
        rating,
        pontos: 70,
        ativo: true,
        jogadaOriginal: 0,
        gafe: 0,
        vantagem: 0,
        desrespeito: 0,
        furia: 0,
        vitorias: 0,
        derrotas: 0,
        pontosGanhosTorneio: 0
    };
    
    jogadores.push(jogador);
    
    
    document.getElementById('playerNome').value = '';
    document.getElementById('playerApelido').value = '';
    document.getElementById('playerRating').value = '';
    
    atualizarTela();
}


function comecarTorneio() {
    if (jogadores.length !== 4 && jogadores.length !== 8) {
        alert("O torneio precisa ter 4 ou 8 jogadores.");
        return;
    }
    
    torneioComecou = true;
    rodadaAtual = 1;
    novoRound();
    showTab('torneio');
}

function novoRound() {
    
    const jogadoresAtivos = jogadores.filter(p => p.ativo);
    const embaralhados = embaralhar(jogadoresAtivos);
    
    confrontos = [];
    
    
    for (let i = 0; i < embaralhados.length; i += 2) {
        confrontos.push({
            id: Date.now() + i,
            player1: embaralhados[i],
            player2: embaralhados[i + 1],
            completo: false
        });
    }
    
    atualizarTela();
}

function selecionarConfronto(id) {
    const confronto = confrontos.find(c => c.id === id);
    
    confrontoAtualId = id;
    
    const gerenciamentoDiv = document.getElementById('gerenciamentoMatches');
    gerenciamentoDiv.style.display = 'block';
    
    const confrontoDiv = document.getElementById('confrontoAtual');
    confrontoDiv.innerHTML = `
        <div class="match-card">
            <div>
                <h3>${confronto.player1.nome} "${confronto.player1.apelido}"</h3>
                <p>Pontos: ${confronto.player1.pontos}</p>
            </div>
            <div>
                <h3>VS</h3>
            </div>
            <div>
                <h3>${confronto.player2.nome} "${confronto.player2.apelido}"</h3>
                <p>Pontos: ${confronto.player2.pontos}</p>
            </div>
        </div>
    `;
    
    
    document.getElementById('player1Eventos').innerHTML = `
        <h4>Eventos de ${confronto.player1.nome}</h4>
        <div>
            <button class="event-button" onclick="adicionarEvento('player1', 'jogadaOriginal')">Jogada Original (+5)</button>
            <button class="event-button" onclick="adicionarEvento('player1', 'gafe')">Gafe (-3)</button>
            <button class="event-button" onclick="adicionarEvento('player1', 'vantagem')">Vantagem (+2)</button>
            <button class="event-button" onclick="adicionarEvento('player1', 'desrespeito')">Desrespeito (-5)</button>
            <button class="event-button" onclick="adicionarEvento('player1', 'furia')">Ataque de Fúria (-7)</button>
        </div>
        <div id="player1EventosList"></div>
    `;
    
    
    document.getElementById('player2Eventos').innerHTML = `
        <h4>Eventos de ${confronto.player2.nome}</h4>
        <div>
            <button class="event-button" onclick="adicionarEvento('player2', 'jogadaOriginal')">Jogada Original (+5)</button>
            <button class="event-button" onclick="adicionarEvento('player2', 'gafe')">Gafe (-3)</button>
            <button class="event-button" onclick="adicionarEvento('player2', 'vantagem')">Vantagem (+2)</button>
            <button class="event-button" onclick="adicionarEvento('player2', 'desrespeito')">Desrespeito (-5)</button>
            <button class="event-button" onclick="adicionarEvento('player2', 'furia')">Ataque de Furia (-7)</button>
        </div>
        <div id="player2EventosList"></div>
    `;
    
    atualizarListaEventos();
}

function atualizarListaEventos() {
    if (!confrontoAtualId) return;
    
    const confronto = confrontos.find(c => c.id === confrontoAtualId);
    if (!confronto) return;
    
    
    const player1List = document.getElementById('player1EventosList');
    player1List.innerHTML = '';
    
    if (confronto.player1EventosTemp) {
        player1List.innerHTML += '<h5>eventos:</h5>';
        confronto.player1EventosTemp.forEach(evento => {
            player1List.innerHTML += `
                <p>${eventos[evento].nome} (${eventos[evento].pontos > 0 ? '+' : ''}${eventos[evento].pontos})</p>
            `;
        });
    }
    
    
    const player2List = document.getElementById('player2EventosList');
    player2List.innerHTML = '';
    
    if (confronto.player2EventosTemp) {
        player2List.innerHTML += '<h5>Eventos:</h5>';
        confronto.player2EventosTemp.forEach(evento => {
            player2List.innerHTML += `
                <p>${eventos[evento].nome} (${eventos[evento].pontos > 0 ? '+' : ''}${eventos[evento].pontos})</p>
            `;
        });
    }
}

function adicionarEvento(playerKey, tipoEvento) {
    if (!confrontoAtualId) return;
    
    const confronto = confrontos.find(c => c.id === confrontoAtualId);
    if (confronto.completo) return;
    
    
    if (!confronto.player1EventosTemp) confronto.player1EventosTemp = [];
    if (!confronto.player2EventosTemp) confronto.player2EventosTemp = [];
    
    
    if (playerKey === 'player1') {
        confronto.player1EventosTemp.push(tipoEvento);
    } else {
        confronto.player2EventosTemp.push(tipoEvento);
    }
    
    atualizarListaEventos();
}

function finalizarConfronto() {
    if (!confrontoAtualId) return;
    
    const confronto = confrontos.find(c => c.id === confrontoAtualId);
    if (!confronto || confronto.completo) return;
    
    
    let player1PontosTemp = confronto.player1.pontos;
    let player2PontosTemp = confronto.player2.pontos;
    

    let player1PontosAdicionais = 0;
    let player2PontosAdicionais = 0;
    
    
    if (confronto.player1EventosTemp) {
        confronto.player1EventosTemp.forEach(evento => {
            
            player1PontosTemp += eventos[evento].pontos;
            
            
            player1PontosAdicionais += eventos[evento].pontos;
            
            
            confronto.player1[evento]++;
        });
    }
    
    
    if (confronto.player2EventosTemp) {
        confronto.player2EventosTemp.forEach(evento => {
           
            player2PontosTemp += eventos[evento].pontos;
            
            
            player2PontosAdicionais += eventos[evento].pontos;
            
            
            confronto.player2[evento]++;
        });
    }
    
   
    let blitzRealizado = false;


    if (player1PontosTemp === player2PontosTemp) {
        blitzRealizado = true;
        
        if (Math.random() < 0.5) {
            player1PontosTemp += 2;
        } else {
            player2PontosTemp += 2;
        }
    }
    
    let vencedor, perdedor, vencedorPontosAdicionais, perdedorPontosAdicionais;
    if (player1PontosTemp > player2PontosTemp) {

        vencedor = confronto.player1;
        perdedor = confronto.player2;

        vencedorPontosAdicionais = player1PontosAdicionais;
        perdedorPontosAdicionais = player2PontosAdicionais;
    } else {
        vencedor = confronto.player2;
        perdedor = confronto.player1;

        vencedorPontosAdicionais = player2PontosAdicionais;
        perdedorPontosAdicionais = player1PontosAdicionais;
    }
    
    
    vencedorPontosAdicionais += blitzRealizado ? 32 : 30;
    
   
    vencedor.pontosGanhosTorneio += vencedorPontosAdicionais;
    perdedor.pontosGanhosTorneio += perdedorPontosAdicionais;
    
  
    vencedor.pontos += vencedorPontosAdicionais;
    perdedor.pontos += perdedorPontosAdicionais;
    
    
    vencedor.vitorias++;
    perdedor.derrotas++;
    perdedor.ativo = false;
    
   
    confronto.completo = true;
    confronto.vencedor = vencedor;
    
    
    document.getElementById('gerenciamentoMatches').style.display = 'none';
    confrontoAtualId = null;
    
    
    if (confrontos.every(m => m.completo)) {
        
        const jogadoresAtivos = jogadores.filter(p => p.ativo);
        if (jogadoresAtivos.length === 1) {
            
            terminarTorneio(jogadoresAtivos[0]);
        } else {
            
            rodadaAtual++;
            novoRound();
        }
    }
    
    atualizarTela();
}

function terminarTorneio(campeao) {
    const campeaoContainer = document.getElementById('campeaoContainer');
    campeaoContainer.style.display = 'block';

    jogadores.forEach(j => {
        j.rating += j.pontos;
    });
    
    campeaoContainer.innerHTML = `
        <div id="campeaoMsg">
            <h2><span class="trofeu"></span> Campeão do torneio <span class="trofeu"></span></h2>
            <h3>${campeao.nome} "${campeao.apelido}"</h3>
            <p>Pontuação Final: ${campeao.pontos} pontos</p>
            <p>Rating Final: ${campeao.rating}</p>
            <p>Jogadas Originais: ${campeao.jogadaOriginal}</p>
            <p>Gafes: ${campeao.gafe}</p>
            <p>Vantagens: ${campeao.vantagem}</p>
            <p>Desrespeitos: ${campeao.desrespeito}</p>
            <p>Ataques de Fúria: ${campeao.furia}</p>
            <p>Vitórias: ${campeao.vitorias}</p>
        </div>
    `;
    
    
    showTab('estatistica');
}


function atualizarTela() {
   
    const playerLista = document.getElementById('playerLista');
    playerLista.innerHTML = '';

    jogadores.forEach(jogador => {
        playerLista.innerHTML += `
            <div class="player-card">
                <h3>${jogador.nome} "${jogador.apelido}"</h3>
                <div class="player-stats">
                    <span>Rating: ${jogador.rating}</span>
                    <span>Pontos: ${jogador.pontos}</span>
                </div>
            </div>
        `;
    });
    
    
    const iniciarBotao = document.getElementById('comecarTorneioBtn');
    iniciarBotao.disabled = (jogadores.length !== 4 && jogadores.length !== 8) || torneioComecou;
    
    
    const infoRound = document.getElementById('infoRound');
    if (torneioComecou) {
        const jogadoresAtivos = jogadores.filter(p => p.ativo);
        infoRound.innerHTML = `
            <h3>Rodada ${rodadaAtual}</h3>
            <p>${jogadoresAtivos.length} jogadores restantes</p>
        `;
    } else {
        infoRound.innerHTML = '';
    }
    
    
    const listaMatches = document.getElementById('listaMatches');
    listaMatches.innerHTML = '';
    
    confrontos.forEach(confronto => {
        let statusTexto = confronto.completo ? 
            `<span class="vencedor">Vencedor: ${confronto.vencedor.nome}</span>` : 
            '<span style="color: red;">Em andamento</span>';
        
        listaMatches.innerHTML += `
            <div class="match-card" onclick="selecionarConfronto(${confronto.id})">
                <div>
                    <h3>${confronto.player1.nome} "${confronto.player1.apelido}"</h3>
                    <p>Pontos: ${confronto.player1.pontos}</p>
                </div>
                <div>
                    <h3>VS</h3>
                    <p>${statusTexto}</p>
                </div>
                <div>
                    <h3>${confronto.player2.nome} "${confronto.player2.apelido}"</h3>
                    <p>Pontos: ${confronto.player2.pontos}</p>
                </div>
            </div>
        `;
    });
    
    
    const tabelaBody = document.getElementById('statusTableBody');
    tabelaBody.innerHTML = '';
    
   
    const ordenados = [...jogadores].sort((a, b) => b.pontos - a.pontos);
    
    ordenados.forEach((jogador, index) => {
        tabelaBody.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${jogador.nome}</td>
                <td>${jogador.apelido}</td>
                <td>${jogador.rating}</td>
                <td>${jogador.pontos}</td>
                <td>${jogador.jogadaOriginal}</td>
                <td>${jogador.gafe}</td>
                <td>${jogador.vantagem}</td>
                <td>${jogador.desrespeito}</td>
                <td>${jogador.furia}</td>
                <td>${jogador.ativo ? 'Ativo' : '<span style="color: red;">Eliminado</span>'}</td>
            </tr>
        `;
    });
}


document.addEventListener('DOMContentLoaded', function() {
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            showTab(tab.getAttribute('data-tab'));
        });
    });
    
    
    document.getElementById('addPlayerBtn').addEventListener('click', adicionarJogador);
    document.getElementById('comecarTorneioBtn').addEventListener('click', comecarTorneio);
    document.getElementById('terminarConfrontoBtn').addEventListener('click', finalizarConfronto);
    
 
    atualizarTela();
});
