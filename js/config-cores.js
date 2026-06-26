// Salva as configurações de nomes e cores, validando campos vazios
function salvarConfiguracoes() {
    const nomeM = document.getElementById('nomeMandante').value.trim();
    const nomeV = document.getElementById('nomeVisitante').value.trim();
    const corM = document.getElementById('colorMandante').value;
    const corV = document.getElementById('colorVisitante').value;

    // Validação individual com alertas específicos
    if (!nomeM) {
        alert("Ops! Você esqueceu de digitar o nome do Time Mandante.");
        document.getElementById('nomeMandante').focus();
        return;
    }
    if (!nomeV) {
        alert("Ops! Você esqueceu de digitar o nome do Time Visitante.");
        document.getElementById('nomeVisitante').focus();
        return;
    }

    // Se passou na validação, grava tudo de forma segura
    localStorage.setItem('nomeMandante', nomeM);
    localStorage.setItem('nomeVisitante', nomeV);
    localStorage.setItem('corMandante', corM);
    localStorage.setItem('corVisitante', corV);

    aplicarCoresEstilo(corM, corV);
    alert('Configurações dos times salvas com sucesso! Pode escolher a modalidade.');
}

// Carrega os dados salvos para os inputs da tela inicial e sincroniza as cores CSS
function carregarCores() {
    const nomeM = localStorage.getItem('nomeMandante') || '';
    const nomeV = localStorage.getItem('nomeVisitante') || '';
    const corM = localStorage.getItem('corMandante') || '#ef4444'; 
    const corV = localStorage.getItem('corVisitante') || '#3b82f6'; 

    aplicarCoresEstilo(corM, corV);

    // Preenche os campos visuais se eles existirem na página atual (Index)
    const inputNomeM = document.getElementById('nomeMandante');
    const inputNomeV = document.getElementById('nomeVisitante');
    const inputCorM = document.getElementById('colorMandante');
    const inputCorV = document.getElementById('colorVisitante');

    if (inputNomeM && inputNomeV && inputCorM && inputCorV) {
        inputNomeM.value = nomeM;
        inputNomeV.value = nomeV;
        inputCorM.value = corM;
        inputCorV.value = corV;
    }
    
    // Atualiza os títulos dinamicamente nos placares de jogo
    atualizarNomesNosPlacares();
}

function aplicarCoresEstilo(mandante,访问者) {
    document.documentElement.style.setProperty('--color-mandante', mandante);
    document.documentElement.style.setProperty('--color-visitante',访问者);
}

// Injeta os nomes customizados salvos direto nas tags h2 das páginas de jogo
function atualizarNomesNosPlacares() {
    const nomeM = localStorage.getItem('nomeMandante');
    const nomeV = localStorage.getItem('nomeVisitante');

    // Captura os h2 dos cards de times (se existirem na página atual)
    const labelMandante = document.querySelector('.time-mandante h2');
    const labelVisitante = document.querySelector('.time-visitante h2');

    if (labelMandante && labelVisitante) {
        labelMandante.textContent = nomeM || 'Mandante';
        labelVisitante.textContent = nomeV || 'Visitante';
    }
}