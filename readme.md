# Chess Brawl 🏆♟️

Sistema de gerenciamento de torneios de xadrez com mecânicas gamificadas e sistema de pontuação especial.

## 📋 Sobre o Projeto

Chess Brawl é uma aplicação web desenvolvida para gerenciar torneios de xadrez com um sistema único de pontuação que vai além do resultado das partidas. O sistema permite registrar eventos especiais durante as partidas (jogadas originais, gafes, vantagens posicionais, etc.) que influenciam na pontuação final dos jogadores.

## ✨ Funcionalidades

### 🎮 Registro de Jogadores
- Cadastro de jogadores com nome, apelido e rating (1-15000)
- Suporte para torneios de 4 ou 8 jogadores
- Validação automática de dados

### 🏁 Gerenciamento de Torneios
- Sistema de eliminação por rodadas
- Emparelhamento aleatório de jogadores
- Confrontos em tempo real
- Sistema de blitz automático em caso de empate

### 📊 Sistema de Pontuação Especial
- **Jogada Original**: +5 pontos
- **Gafe**: -3 pontos
- **Posicionamento Vantajoso**: +2 pontos
- **Desrespeito**: -5 pontos
- **Ataque de Fúria**: -7 pontos
- **Vitória**: +30 pontos (+32 se houver blitz)

### 📈 Estatísticas Detalhadas
- Ranking em tempo real
- Histórico completo de eventos por jogador
- Estatísticas de vitórias e derrotas
- Pontuação acumulada no torneio

## 🚀 Como Usar

### Pré-requisitos
- Navegador web moderno
- Não requer instalação de software adicional

### Execução
1. Clone ou baixe os arquivos do projeto
2. Abra o arquivo `index.html` em qualquer navegador web
3. Comece a usar o sistema!

### Fluxo de Uso
1. **Registro**: Cadastre 4 ou 8 jogadores na aba "Registro do Jogador"
2. **Torneio**: Inicie o torneio e gerencie os confrontos na aba "Gerenciamento do torneio"
3. **Eventos**: Durante cada confronto, registre os eventos especiais que ocorrem
4. **Estatísticas**: Acompanhe o progresso e veja o campeão na aba "Estatísticas"

## 🏗️ Estrutura do Projeto

```
chess-brawl/
│
├── index.html          # Estrutura principal da interface
├── script.js           # Lógica do sistema e gerenciamento do torneio
├── style.css           # Estilos e layout da aplicação
└── README.md           # Documentação do projeto
```

## 🎯 Funcionalidades Técnicas

### Interface
- Design responsivo com sistema de abas
- Interface intuitiva e fácil de usar
- Feedback visual em tempo real

### Lógica do Sistema
- Algoritmo de emparelhamento aleatório
- Sistema de eliminação progressiva
- Cálculo automático de pontuações
- Validação de dados de entrada

### Armazenamento
- Dados mantidos em memória durante a sessão
- Não requer banco de dados

## 🎨 Características Visuais

- **Cores**: Tema verde (#256925) com fundo claro
- **Layout**: Design limpo e organizado
- **Responsividade**: Adaptável a diferentes tamanhos de tela
- **Destaque**: Campeão apresentado com fundo dourado especial

## 🔧 Tecnologias Utilizadas

- **HTML5**: Estrutura semântica
- **CSS3**: Estilização e layout responsivo
- **JavaScript (ES6+)**: Lógica da aplicação e interatividade

## 📝 Regras do Torneio

1. **Participantes**: Apenas torneios de 4 ou 8 jogadores
2. **Eliminação**: Sistema de eliminação simples
3. **Pontuação Inicial**: Todos começam com 70 pontos base
4. **Empates**: Resolvidos automaticamente por blitz (sorteio)
5. **Vitória**: Jogador que vencer todos os confrontos é o campeão


