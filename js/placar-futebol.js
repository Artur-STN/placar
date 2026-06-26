let scoreFutebol = {
    mandante: 0,
    visitante: 0,
    tempoAtual: '1T'
};

function inicializarPlacar() {
    atualizarDisplayFutebol();
}

function adicionarGol(time) {
    scoreFutebol[time]++;
    atualizarDisplayFutebol();
}

function removerGol(time) {
    if (scoreFutebol[time] > 0) {
        scoreFutebol[time]--;
        atualizarDisplayFutebol();
    }
}

function mudarTempo(tempo) {
    scoreFutebol.tempoAtual = tempo;
    
    // Captura o painel que envelopa os dois times
    const painel = document.querySelector('.painel-confronto');
    
    if (tempo === '2T') {
        // Ativa a inversão visual no segundo tempo
        painel.classList.add('inverter-lados');
    } else {
        // Remove a inversão caso voltem para o primeiro tempo
        painel.classList.remove('inverter-lados');
    }
}

function reiniciarPartida() {
    if (confirm('Deseja zerar o placar de futebol?')) {
        scoreFutebol.mandante = 0;
        scoreFutebol.visitante = 0;
        atualizarDisplayFutebol();
    }
}

function atualizarDisplayFutebol() {
    document.getElementById('pontosMandante').textContent = scoreFutebol.mandante;
    document.getElementById('pontosVisitante').textContent = scoreFutebol.visitante;
}