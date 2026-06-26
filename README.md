# 🏆 Placar Esportivo Dinâmico

Um sistema web interativo, responsivo e moderno desenvolvido para gerenciamento de placares esportivos em tempo real. O projeto conta com suporte inicial para **Futebol** e **Voleibol**, trazendo regras de negócio reais de cada modalidade e alto nível de personalização visual para os usuários.

---

## 📱 Demonstração da Interface

> [!TIP]
> O layout foi construído sob o conceito *Mobile-First*, garantindo que o painel se transforme perfeitamente em um aplicativo de celular ou em uma interface estática estilo "Directv/Placar de TV" para desktops.

### Funcionalidades Principais:
* **Customização Completa:** Escolha e salve os nomes e cores dos times diretamente na tela inicial.
* **Inversão Dinâmica de Lados:** Simulação real de troca de lado de campo/quadra (no intervalo do Futebol e a cada fim de Set no Vôlei) sem quebrar a lógica de pontuação.
* **Persistência de Dados:** Uso de `LocalStorage` para manter as configurações de cores e nomes salvas mesmo após atualizar a página.

---

## 🛠️ Tecnologias Utilizadas

O projeto foi desenvolvido utilizando tecnologias web nativas para garantir máxima performance, leveza e semântica:

* **HTML5:** Estruturação semântica avançada (`<main>`, `<article>`, `<section>`, `<output>`).
* **CSS3 Moderno:** * Arquitetura de variáveis globais (`:root`) para gerenciamento de temas.
    * Layouts flexíveis com **Flexbox** e tipografia fluida usando a função `clamp()`.
    * Efeito *Glassmorphism* (`backdrop-filter`) para uma interface futurista e limpa.
* **JavaScript (ES6+):** Manipulação de DOM baseada em estados lógicos, validação de formulários e controle de regras esportivas.
* **SVG (Scalable Vector Graphics):** Favicon responsivo e de alta resolução renderizado nativamente.

---

## ⚽ Regras de Negócio Implementadas

### 1. Painel de Futebol
* Controle de tempo da partida (1T e 2T).
* **Inversão de Lado:** Ao mudar para o segundo tempo, o layout inverte as posições do Mandante e Visitante na tela usando CSS estrutural (`row-reverse` / `column-reverse`), mantendo os botões de controle amarrados aos seus respectivos times lógicos.

### 2. Painel de Vôlei
* **Melhor de 3 Sets:** Sistema inteligente com 3 caixinhas centrais de histórico que mostram a evolução da partida.
* **Destaque do Set Ativo:** A caixinha do set atual fica iluminada via CSS indicando onde os pontos estão entrando.
* **Regra de Vantagem (Dois Pontos):** O set encerra em 15 pontos, a menos que haja empate em 14x14. A partir daí, o sistema calcula a diferença absoluta (`Math.abs`) e só finaliza o set quando um time abrir 2 pontos de vantagem (Ex: 16x14, 19x17).
* **Fim de Jogo Antecipado:** Se um time vencer os 2 primeiros sets, o sistema encerra a partida por 2x0 automaticamente, bloqueando novas pontuações.
* **Indicadores de Lado por Cor:** As caixinhas dos sets exibem círculos coloridos dinâmicos que se invertem junto com os times na quadra, evitando qualquer bug visual ou confusão sobre quem venceu o set passado.

---

## 📂 Estrutura de Pastas do Projeto

```text
├── index.html                  # Tela inicial de seleção e configuração
├── favicon.svg                 # Ícone da aba em alta resolução
├── css/
│   ├── global.css              # Variáveis, fontes e resets globais
│   ├── index.css               # Estilos da tela de configuração
│   ├── placar-futebol.css      # Layout do placar de futebol
│   └── placar-volei.css        # Layout do placar de vôlei e sets
├── js/
│   ├── config-cores.js         # Validação de nomes e salvamento em LocalStorage
│   ├── placar-futebol.js       # Lógica de tempos e gols do futebol
│   └── placar-volei.js         # Lógica matemática de sets e vantagens do vôlei
├── futebol/
│   └── placar-futebol.html     # Página do placar de futebol
└── volei/
    └── placar-volei.html       # Página do placar de vôlei
