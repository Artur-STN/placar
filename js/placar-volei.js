// Estado lógico completo do vôlei
let jogoVolei = {
    pontosM: 0,
    pontosV: 0,
    setAtual: 1,
    setsGanhosM: 0,
    setsGanhosV: 0,
    historico: {
        set1: { mandante: 0, visitante: 0, definido: false },
        set2: { mandante: 0, visitante: 0, definido: false },
        set3: { mandante: 0, visitante: 0, definido: false }
    },
    ladosInvertidos: false
};

function inicializarPlacar() {
    atualizarDisplay();
}

function adicionarPonto(time) {
    if (jogoVolei.setsGanhosM >= 2 || jogoVolei.setsGanhosV >= 2 || jogoVolei.setAtual > 3) {
        alert("A partida já foi encerrada!");
        return;
    }

    if (time === 'mandante') {
        jogoVolei.pontosM++;
    } else {
        jogoVolei.pontosV++;
    }

    verificarFimDeSet();
    atualizarDisplay();
}

function removerPonto(time) {
    if (jogoVolei.setsGanhosM >= 2 || jogoVolei.setsGanhosV >= 2) return;

    if (time === 'mandante' && jogoVolei.pontosM > 0) {
        jogoVolei.pontosM--;
    } else if (time === 'visitante' && jogoVolei.pontosV > 0) {
        jogoVolei.pontosV--;
    }
    atualizarDisplay();
}

function verificarFimDeSet() {
    const pM = jogoVolei.pontosM;
    const pV = jogoVolei.pontosV;

    // Regra oficial: vantagem de 2 pontos a partir de 15 pontos
    if ((pM >= 15 || pV >= 15) && Math.abs(pM - pV) >= 2) {
        
        const setNome = `set${jogoVolei.setAtual}`;
        
        // Armazena no histórico fixado pelo papel do time
        jogoVolei.historico[setNome].mandante = pM;
        jogoVolei.historico[setNome].visitante = pV;
        jogoVolei.historico[setNome].definido = true;

        if (pM > pV) {
            jogoVolei.setsGanhosM++;
            alert(`Fim do ${jogoVolei.setAtual}º Set! Vitória do Mandante (${pM} x ${pV})`);
        } else {
            jogoVolei.setsGanhosV++;
            alert(`Fim do ${jogoVolei.setAtual}º Set! Vitória do Visitante (${pV} x ${pM})`);
        }

        // Condição de fim de jogo
        if (jogoVolei.setsGanhosM === 2) {
            setTimeout(() => { alert("FIM DE JOGO! O time MANDANTE venceu a partida!"); }, 300);
            zerarPlacarPrincipal();
            return;
        } else if (jogoVolei.setsGanhosV === 2) {
            setTimeout(() => { alert("FIM DE JOGO! O time VISITANTE venceu a partida!"); }, 300);
            zerarPlacarPrincipal();
            return;
        }

        jogoVolei.setAtual++;
        zerarPlacarPrincipal();

        // Inverte os lados fisicamente na tela
        jogoVolei.ladosInvertidos = !jogoVolei.ladosInvertidos;
        const painel = document.getElementById('painelVolei');
        if (jogoVolei.ladosInvertidos) {
            painel.classList.add('inverter-lados');
        } else {
            painel.classList.remove('inverter-lados');
        }
    }
}

function zerarPlacarPrincipal() {
    jogoVolei.pontosM = 0;
    jogoVolei.pontosV = 0;
}

function reiniciarPartida() {
    if (confirm('Deseja realmente reiniciar toda a partida de vôlei?')) {
        jogoVolei = {
            pontosM: 0,
            pontosV: 0,
            setAtual: 1,
            setsGanhosM: 0,
            setsGanhosV: 0,
            historico: {
                set1: { mandante: 0, visitante: 0, definido: false },
                set2: { mandante: 0, visitante: 0, definido: false },
                set3: { mandante: 0, visitante: 0, definido: false }
            },
            ladosInvertidos: false
        };
        document.getElementById('painelVolei').classList.remove('inverter-lados');
        atualizarDisplay();
    }
}

function atualizarDisplay() {
    document.getElementById('pontosMandante').textContent = jogoVolei.pontosM.toString().padStart(2, '0');
    document.getElementById('pontosVisitante').textContent = jogoVolei.pontosV.toString().padStart(2, '0');

    const corM = localStorage.getItem('corMandante') || '#3b82f6';
    const corV = localStorage.getItem('corVisitante') || '#ef4444';

    for (let i = 1; i <= 3; i++) {
        const setNome = `set${i}`;
        const dataSet = jogoVolei.historico[setNome];
        
        const txtEsquerdo = document.getElementById(`set${i}-E`);
        const txtDireito = document.getElementById(`set${i}-D`);
        const dotEsquerdo = document.getElementById(`corSet1-E`.replace('1', i));
        const dotDireito = document.getElementById(`corSet1-D`.replace('1', i));

        // Aplica dinamicamente as cores e valores baseados na inversão visual
        if (jogoVolei.ladosInvertidos) {
            // Lado Esquerdo = Visitante | Lado Direito = Mandante
            dotEsquerdo.style.backgroundColor = corV;
            dotDireito.style.backgroundColor = corM;
            
            txtEsquerdo.textContent = dataSet.definido ? dataSet.visitante : 0;
            txtDireito.textContent = dataSet.definido ? dataSet.mandante : 0;
        } else {
            // Lado Esquerdo = Mandante | Lado Direito = Visitante
            dotEsquerdo.style.backgroundColor = corM;
            dotDireito.style.backgroundColor = corV;

            txtEsquerdo.textContent = dataSet.definido ? dataSet.mandante : 0;
            txtDireito.textContent = dataSet.definido ? dataSet.visitante : 0;
        }
        
        document.getElementById(`box-set${i}`).classList.remove('ativo');
    }

    if (jogoVolei.setAtual <= 3 && jogoVolei.setsGanhosM < 2 && jogoVolei.setsGanhosV < 2) {
        document.getElementById(`box-set${jogoVolei.setAtual}`).classList.add('ativo');
    }
}