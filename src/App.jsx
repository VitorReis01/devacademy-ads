import React, { useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'devacademy_ads_state_v4';

const LEVELS = [
  {
    id: 1,
    name: 'Estagiário',
    summary: 'Base de lógica, web, banco, análise e segurança.',
  },
  {
    id: 2,
    name: 'Júnior',
    summary: 'Organização de código, debug, CRUD, componentes e testes básicos.',
  },
  {
    id: 3,
    name: 'Pleno',
    summary: 'Integração, refatoração, modelagem madura, arquitetura em camadas e manutenção.',
  },
  {
    id: 4,
    name: 'Sênior',
    summary: 'Escalabilidade, revisão técnica, confiabilidade, observabilidade e decisões de sistema.',
  },
  {
    id: 5,
    name: 'Diretor / Visão executiva',
    summary: 'Produto, risco, custo, priorização e direção técnica com impacto no negócio.',
  },
];

const LESSONS = [
  {
    id: 'l1', order: 1, level: 1, module: 'Base lógica',
    title: 'Algoritmo e pensamento passo a passo',
    objective: 'Entender como transformar problema em sequência lógica de solução.',
    explanation: [
      'Antes de programar, você precisa organizar o raciocínio. Algoritmo é a ordem dos passos que leva de um problema até uma resposta.',
      'Quem tenta codar sem fluxo costuma esquecer entrada, saída, exceções e validações. O algoritmo reduz chute e melhora clareza.',
      'Pensar como programador começa aqui: identificar o que entra, o que acontece no meio e o que deve sair no final.'
    ],
    examples: [
      'No dia a dia: fazer café. Entrada: água e pó. Processo: ferver, passar, servir. Saída: café pronto.',
      'No sistema: login. Entrada: e-mail e senha. Processo: validar formato, comparar credencial, liberar ou negar acesso.'
    ],
    steps: [
      'Defina o problema em uma frase simples.',
      'Liste entradas.',
      'Liste etapas do processamento.',
      'Defina a saída esperada.',
      'Pense em erro, falha ou exceção.'
    ],
    exercise: 'Descreva, em passos, como funcionaria um sistema simples para registrar entrada de funcionários.',
    miniProject: 'Montar o algoritmo de um mini cadastro de clientes com nome, telefone e confirmação de salvamento.',
    openQuestion: 'Explique com suas palavras por que o algoritmo vem antes do código.',
    answerKeywords: ['passos', 'sequência', 'problema', 'solução', 'organizar'],
    answerCoach: 'Uma resposta boa fala de sequência lógica, organização mental e redução de erro antes da implementação.',
    reviewBase: {
      content: 'Algoritmo é uma sequência organizada de passos. Ele não é só código. Primeiro você pensa o fluxo. Depois implementa.',
      deeper: [
        'Quando você pensa em algoritmo, deve imaginar entrada, processamento, saída e exceções. Isso evita que o código nasça confuso.',
        'Em projetos reais, algoritmo também ajuda a conversar com outras pessoas. Você explica a solução sem depender da linguagem.'
      ],
      quiz: {
        question: 'Qual opção melhor define algoritmo?',
        options: ['Uma tela bonita', 'Uma sequência lógica de passos', 'Um banco de dados'],
        answer: 1,
      },
    },
    quiz: [
      { question: 'Pensar em entrada, processamento e saída ajuda a:', options: ['decorar sintaxe', 'organizar o fluxo', 'mudar de framework'], answer: 1 },
      { question: 'Algoritmo aparece:', options: ['só depois do deploy', 'antes da implementação', 'somente em matemática'], answer: 1 },
    ],
    professionalThinking: 'Profissional maduro tenta reduzir ambiguidade antes de codar. Ele quer fluxo claro, casos de erro e objetivo de negócio.',
    codePrompt: 'Escreva um pseudocódigo ou JavaScript simples descrevendo os passos de um cadastro de cliente.',
    codeChecklist: ['usar passos em ordem', 'mostrar entrada', 'mostrar saída'],
  },
  {
    id: 'l2', order: 2, level: 1, module: 'Base lógica',
    title: 'Variáveis, tipos e operadores',
    objective: 'Aprender a guardar valores e comparar dados com mais segurança.',
    explanation: [
      'Variável é um espaço com nome para guardar valor. Em sistemas reais isso representa nome, saldo, status, data ou quantidade.',
      'Tipo de dado importa porque texto, número e verdadeiro/falso se comportam de formas diferentes.',
      'Operadores ajudam a somar, comparar, validar e combinar informações para produzir decisões corretas.'
    ],
    examples: [
      'nomeCliente = "Ana" guarda texto.',
      'saldo = 1500 guarda número.',
      'ativo = true guarda condição lógica.'
    ],
    steps: [
      'Identifique quais informações precisam ser guardadas.',
      'Escolha nomes claros.',
      'Defina o tipo correto.',
      'Só então use operadores para validar ou comparar.'
    ],
    exercise: 'Liste 8 variáveis de um sistema de loja e diga o tipo de cada uma.',
    miniProject: 'Montar a estrutura básica de um carrinho de compras com preço, quantidade, total e status.',
    openQuestion: 'Por que nome ruim e tipo errado geram problema futuro?',
    answerKeywords: ['clareza', 'erro', 'tipo', 'leitura', 'manutenção'],
    answerCoach: 'A resposta ideal conecta nome claro com manutenção e tipo correto com segurança de comparação e operação.',
    reviewBase: {
      content: 'Nome de variável ruim dificulta leitura. Tipo errado gera comparação errada, soma errada e bug silencioso.',
      deeper: [
        'Quem pensa profissionalmente escolhe nomes que mostram intenção. Nome ruim aumenta custo de manutenção.',
        'Quando o tipo é inadequado, o sistema pode aceitar coisa errada e quebrar longe de onde o problema começou.'
      ],
      quiz: { question: 'Escolher tipo correto ajuda a:', options: ['evitar comportamento inesperado', 'deixar o app mais pesado', 'trocar HTML por SQL'], answer: 0 }
    },
    quiz: [
      { question: 'Uma variável serve para:', options: ['guardar informação', 'substituir banco', 'criar rota'], answer: 0 },
      { question: 'Misturar tipos sem cuidado pode:', options: ['causar bug', 'melhorar tudo sozinho', 'deixar o código premium'], answer: 0 },
    ],
    professionalThinking: 'Quem pensa profissionalmente não usa nome genérico demais. Nome ruim atrapalha leitura, manutenção e revisão.',
    codePrompt: 'Crie um exemplo em JavaScript com variáveis de um produto: nome, preço, estoque e ativo.',
    codeChecklist: ['declarar 4 variáveis', 'usar texto e número', 'mostrar comparação simples'],
  },
  {
    id: 'l3', order: 3, level: 1, module: 'Base lógica',
    title: 'Condições, repetição e funções',
    objective: 'Entender como o sistema decide, repete e reutiliza lógica.',
    explanation: [
      'Condição é escolha. Repetição é execução várias vezes. Função é uma parte reutilizável com objetivo específico.',
      'Sem essas três bases, quase todo sistema vira duplicação, código espalhado e fluxo difícil de manter.',
      'A visão madura é: o que é decisão, o que é repetição e o que merece virar função?' 
    ],
    examples: [
      'Se a senha estiver errada, negar acesso.',
      'Para cada produto do pedido, somar ao total.',
      'Função calcularDesconto reaproveita a mesma regra em vários pontos.'
    ],
    steps: ['Encontre regra de decisão.', 'Encontre tarefas repetidas.', 'Veja o que está sendo copiado.', 'Transforme em função clara.'],
    exercise: 'Explique como um sistema de estoque usaria condição, laço e função no mesmo fluxo.',
    miniProject: 'Descrever um sistema que percorre produtos e marca os que estão abaixo do estoque mínimo.',
    openQuestion: 'Como saber que algo merece virar função?',
    answerKeywords: ['reutilizar', 'repetição', 'organizar', 'duplicação', 'clareza'],
    answerCoach: 'Uma boa resposta liga função com reaproveitamento, redução de duplicação e organização da lógica.',
    reviewBase: {
      content: 'Função faz sentido quando uma lógica reaparece ou quando um bloco está ficando grande demais e sem foco.',
      deeper: [
        'Criar função também ajuda a nomear a intenção do trecho. Isso melhora leitura e revisão técnica.',
        'Condição, laço e função quase sempre aparecem juntos em sistemas reais: decidir, percorrer e encapsular.'
      ],
      quiz: { question: 'If/else é usado para:', options: ['decisão', 'estilo visual', 'instalação PWA'], answer: 0 }
    },
    quiz: [
      { question: 'Laço serve para:', options: ['executar repetidamente', 'trocar banco por API', 'gerar ícone'], answer: 0 },
      { question: 'Função bem criada ajuda a:', options: ['reutilizar lógica', 'apagar requisitos', 'remover usuário'], answer: 0 },
    ],
    professionalThinking: 'Profissional maduro reduz duplicação. Se a lógica aparece em vários pontos, ele centraliza antes que o sistema fique inconsistente.',
    codePrompt: 'Escreva uma função que receba o estoque atual e retorne se o produto está em nível crítico.',
    codeChecklist: ['usar function ou arrow', 'usar if', 'retornar resultado'],
  },
  {
    id: 'l4', order: 4, level: 1, module: 'Web',
    title: 'HTML, CSS e JavaScript na web',
    objective: 'Entender estrutura, apresentação e comportamento de interfaces web.',
    explanation: [
      'HTML define estrutura. CSS define apresentação. JavaScript define comportamento.',
      'Interface boa não é só beleza. Ela precisa ser clara, legível, previsível e conectada com o objetivo do sistema.',
      'Quem aprende web de forma madura entende que tela é só uma parte do fluxo completo do produto.'
    ],
    examples: [
      'HTML cria formulário de login.',
      'CSS melhora hierarquia visual e contraste.',
      'JavaScript valida dados e reage ao clique do usuário.'
    ],
    steps: ['Defina estrutura.', 'Organize a hierarquia visual.', 'Adicione comportamento com intenção.'],
    exercise: 'Explique o papel de HTML, CSS e JavaScript em um painel administrativo simples.',
    miniProject: 'Planejar uma tela de login com campos, botão, mensagem de erro e feedback visual.',
    openQuestion: 'Por que sistema não é só tela bonita?',
    answerKeywords: ['fluxo', 'dados', 'regra', 'interação', 'objetivo'],
    answerCoach: 'A resposta forte conecta tela com regra, validação, fluxo e experiência real do usuário.',
    reviewBase: {
      content: 'Tela bonita sem regra, validação e fluxo continua sendo um sistema fraco. Interface precisa servir ao objetivo.',
      deeper: [
        'No mundo real, formulário ruim gera erro operacional, cadastro errado e retrabalho.',
        'Por isso interface deve conversar com regra de negócio, não só com estética.'
      ],
      quiz: { question: 'JavaScript na web é muito usado para:', options: ['comportamento e interação', 'fabricar hardware', 'substituir internet'], answer: 0 }
    },
    quiz: [
      { question: 'HTML é mais ligado a:', options: ['estrutura', 'banco de dados', 'servidor físico'], answer: 0 },
      { question: 'CSS é mais ligado a:', options: ['apresentação', 'consulta SQL', 'deploy'], answer: 0 },
    ],
    professionalThinking: 'Profissional maduro liga interface com clareza, acessibilidade, fluxo e manutenção.',
    codePrompt: 'Descreva uma estrutura HTML simples de login e como o JavaScript validaria os campos.',
    codeChecklist: ['citar formulário', 'citar botão', 'citar validação'],
  },
  {
    id: 'l5', order: 5, level: 1, module: 'Banco de dados',
    title: 'Entidades, relacionamentos e SQL conceitual',
    objective: 'Entender a base da modelagem de dados em sistemas reais.',
    explanation: [
      'Banco de dados organiza a informação do sistema. Se a modelagem nasce mal, tudo fica mais frágil.',
      'Entidade representa algo importante do negócio. Relacionamento mostra como essas entidades se conectam.',
      'SQL aparece como forma de consultar, inserir, atualizar e remover dados com intenção.'
    ],
    examples: [
      'Cliente, pedido e produto são entidades.',
      'Um cliente pode ter vários pedidos.',
      'Um pedido possui vários produtos.'
    ],
    steps: ['Descubra os objetos principais do negócio.', 'Defina atributos.', 'Relacione entidades.', 'Só depois pense na consulta.'],
    exercise: 'Liste as entidades de uma pequena loja e explique como elas se relacionam.',
    miniProject: 'Planejar a base de um sistema de vendas com cliente, produto e pedido.',
    openQuestion: 'Por que modelagem ruim causa retrabalho mesmo quando o sistema parece funcionar?',
    answerKeywords: ['duplicação', 'inconsistência', 'retrabalho', 'dados', 'manutenção'],
    answerCoach: 'A resposta boa fala de inconsistência, duplicação de dado e custo de manutenção.',
    reviewBase: {
      content: 'Modelagem ruim pode até passar no começo, mas depois gera duplicação, erro de consulta e dificuldade de manter.',
      deeper: [
        'Quando o dado é mal organizado, relatórios saem errados e a confiança no sistema diminui.',
        'Banco bem modelado reduz gambiarra no código e melhora a vida útil do projeto.'
      ],
      quiz: { question: 'Entidade representa:', options: ['algo importante do negócio', 'só uma cor da tela', 'um firewall'], answer: 0 }
    },
    quiz: [
      { question: 'SQL conceitualmente é muito usado para:', options: ['consultar e manipular dados', 'desenhar ícone', 'instalar servidor'], answer: 0 },
      { question: 'Relacionamento em banco ajuda a:', options: ['ligar dados com sentido', 'deixar texto maior', 'evitar HTML'], answer: 0 },
    ],
    professionalThinking: 'Profissional maduro não pensa só na tela. Ele pensa em integridade, consistência e impacto da modelagem no tempo.',
    codePrompt: 'Descreva como seria uma tabela de clientes e outra de pedidos, e como elas se conectariam.',
    codeChecklist: ['citar entidade', 'citar relacionamento', 'citar id'],
  },
  {
    id: 'l6', order: 6, level: 1, module: 'Engenharia e análise',
    title: 'Requisitos, análise e regra de negócio',
    objective: 'Entender por que o sistema precisa nascer da necessidade real do negócio.',
    explanation: [
      'Sistema bom resolve um problema real. Requisito é aquilo que o sistema precisa fazer ou respeitar.',
      'Análise de sistemas é ouvir, mapear, validar fluxo e transformar necessidade em solução útil.',
      'Regra de negócio evita que o software vire apenas tela bonita sem utilidade prática.'
    ],
    examples: [
      'Uma loja pode exigir que pedido acima de certo valor precise de aprovação.',
      'Um sistema pode obrigar senha forte e registro de auditoria.'
    ],
    steps: ['Ouça a dor real.', 'Mapeie o fluxo.', 'Defina requisito funcional e não funcional.', 'Valide se a solução atende ao objetivo.'],
    exercise: 'Explique a diferença entre fazer uma tela e resolver a necessidade do negócio.',
    miniProject: 'Descrever requisitos de um sistema simples de chamados internos.',
    openQuestion: 'Por que implementar sem analisar antes costuma gerar retrabalho?',
    answerKeywords: ['necessidade', 'fluxo', 'regra', 'requisito', 'retrabalho'],
    answerCoach: 'Resposta boa conecta análise com entendimento real antes da implementação.',
    reviewBase: {
      content: 'Quando você implementa sem analisar, corre o risco de resolver a coisa errada ou esquecer regra importante.',
      deeper: [
        'Boa análise reduz retrabalho porque alinha expectativa, processo e regra de negócio antes do código.',
        'Profissional maduro não sai codando sem entender dor, fluxo e impacto.'
      ],
      quiz: { question: 'Regra de negócio é:', options: ['uma exigência real do processo', 'um efeito visual', 'um tipo de fonte'], answer: 0 }
    },
    quiz: [
      { question: 'Requisito funcional está ligado a:', options: ['o que o sistema faz', 'a cor do cabo de rede', 'a marca do notebook'], answer: 0 },
      { question: 'Análise antes da implementação ajuda a:', options: ['reduzir retrabalho', 'deixar tudo mais aleatório', 'remover segurança'], answer: 0 },
    ],
    professionalThinking: 'Quem pensa como analista quer entender processo, regra e objetivo antes de escolher tecnologia.',
    codePrompt: 'Descreva 5 requisitos de um sistema simples de controle de chamados internos.',
    codeChecklist: ['citar ação do sistema', 'citar regra', 'citar restrição'],
  },

  {
    id: 'l7', order: 7, level: 2, module: 'Júnior',
    title: 'Modularização e organização de código',
    objective: 'Aprender a dividir responsabilidades e reduzir bagunça no projeto.',
    explanation: [
      'À medida que o sistema cresce, tudo em um arquivo só vira problema. Modularizar é dividir responsabilidades com critério.',
      'Organização de código melhora leitura, revisão, teste e manutenção.',
      'O objetivo não é criar estrutura chique. É facilitar entendimento e evolução.'
    ],
    examples: [
      'Separar tela, utilitários, regras e chamadas de API.',
      'Criar componente específico para botão ou formulário quando há reaproveitamento real.'
    ],
    steps: ['Encontre responsabilidades diferentes.', 'Separe o que muda por motivos diferentes.', 'Reduza arquivos gigantes.'],
    exercise: 'Explique por que colocar tudo em um único arquivo complica manutenção.',
    miniProject: 'Propor uma divisão simples de pastas para um app web pequeno.',
    openQuestion: 'O que uma boa modularização melhora no dia a dia do dev?',
    answerKeywords: ['leitura', 'manutenção', 'responsabilidade', 'reutilização', 'organização'],
    answerCoach: 'Uma boa resposta liga modularização com clareza, manutenção e responsabilidade bem dividida.',
    reviewBase: {
      content: 'Modularizar não é fragmentar sem motivo. É separar o que tem responsabilidade diferente.',
      deeper: [
        'Arquivos gigantes escondem bug, dificultam revisão e tornam alteração simples em risco desnecessário.',
        'Boa organização também ajuda onboarding de outras pessoas no projeto.'
      ],
      quiz: { question: 'Modularização ajuda a:', options: ['organizar responsabilidades', 'remover toda lógica', 'substituir testes'], answer: 0 }
    },
    quiz: [
      { question: 'Separar responsabilidades melhora:', options: ['manutenção', 'confusão', 'duplicação'], answer: 0 },
      { question: 'Arquivos gigantes costumam:', options: ['ficar mais difíceis de revisar', 'ser sempre melhores', 'eliminar bugs'], answer: 0 },
    ],
    professionalThinking: 'Dev júnior em amadurecimento aprende a separar intenção, estado, utilidade e interface.',
    codePrompt: 'Descreva como você dividiria um app simples em componentes e utilidades.',
    codeChecklist: ['citar componente', 'citar utilitário', 'citar separação'],
  },
  {
    id: 'l8', order: 8, level: 2, module: 'Júnior',
    title: 'Debug, logs e investigação de erro',
    objective: 'Aprender a investigar bug de forma mais profissional.',
    explanation: [
      'Bug não se resolve no chute. Você precisa observar sintoma, reproduzir, isolar causa e validar correção.',
      'Log útil ajuda a entender contexto. Log ruim só faz barulho.',
      'Debug profissional é investigação, não desespero.'
    ],
    examples: [
      'Verificar o valor antes e depois de uma transformação.',
      'Confirmar se o erro nasce na interface, na regra ou no dado.'
    ],
    steps: ['Reproduza o erro.', 'Colete evidência.', 'Isole a causa.', 'Corrija pequeno.', 'Teste o impacto.'],
    exercise: 'Explique por que mudar várias coisas ao mesmo tempo atrapalha o debug.',
    miniProject: 'Descrever um plano de investigação para um formulário que não salva corretamente.',
    openQuestion: 'Como um profissional investiga erro sem agir no desespero?',
    answerKeywords: ['reproduzir', 'isolar', 'evidência', 'causa', 'teste'],
    answerCoach: 'A resposta forte mostra método: reproduzir, observar, isolar e validar.',
    reviewBase: {
      content: 'Mudar várias coisas de uma vez destrói a capacidade de saber o que realmente resolveu o problema.',
      deeper: [
        'Bug exige evidência. Se você não reproduz nem isola, sua correção pode ser só sorte temporária.',
        'Log deve ajudar a responder pergunta técnica, não apenas encher terminal.'
      ],
      quiz: { question: 'Debug profissional começa com:', options: ['reprodução do erro', 'troca de framework', 'reiniciar sem pensar'], answer: 0 }
    },
    quiz: [
      { question: 'Log bom é o que:', options: ['ajuda no contexto', 'gera barulho', 'esconde o erro'], answer: 0 },
      { question: 'Alterar várias coisas de uma vez:', options: ['piora a investigação', 'sempre acelera', 'elimina testes'], answer: 0 },
    ],
    professionalThinking: 'Quem amadurece tecnicamente trata bug como investigação controlada.',
    codePrompt: 'Escreva como você registraria logs úteis em um fluxo de login.',
    codeChecklist: ['citar contexto', 'citar etapa', 'citar validação'],
  },
  {
    id: 'l9', order: 9, level: 2, module: 'Júnior',
    title: 'CRUD, formulários e validação de entrada',
    objective: 'Entender cadastro, leitura, atualização e remoção com foco em integridade.',
    explanation: [
      'CRUD é base de muitos sistemas. Mas não basta criar tela. É preciso validar entrada, evitar inconsistência e mostrar feedback claro.',
      'Formulário ruim gera dado ruim. Dado ruim contamina o sistema inteiro.',
      'Validação não é frescura. É proteção do fluxo e da qualidade da informação.'
    ],
    examples: [
      'Cadastro de cliente com nome obrigatório.',
      'Atualização de produto com preço numérico e estoque não negativo.'
    ],
    steps: ['Defina campos.', 'Valide entradas.', 'Salve com integridade.', 'Exiba retorno claro ao usuário.'],
    exercise: 'Explique por que um CRUD sem validação vira problema de negócio.',
    miniProject: 'Planejar um cadastro de produtos com regras mínimas de validação.',
    openQuestion: 'Por que formulário e banco precisam conversar bem?',
    answerKeywords: ['validação', 'integridade', 'dado', 'erro', 'consistência'],
    answerCoach: 'A resposta boa fala que dado ruim entra pela interface e vira problema no banco e no negócio.',
    reviewBase: {
      content: 'Validação impede que o sistema aceite entrada inconsistente e espalhe erro para outras partes.',
      deeper: [
        'Quando formulário e banco não conversam, o usuário acha que salvou certo, mas o dado chega incompleto ou quebrado.',
        'A boa prática é validar no ponto de entrada e também proteger a camada de dados.'
      ],
      quiz: { question: 'Validação serve para:', options: ['proteger a qualidade do dado', 'deixar a página mais pesada', 'substituir a análise'], answer: 0 }
    },
    quiz: [
      { question: 'CRUD envolve:', options: ['criar, ler, atualizar e remover', 'apenas desenhar tela', 'somente deploy'], answer: 0 },
      { question: 'Sem validação, um formulário pode:', options: ['gerar dado inconsistente', 'resolver sozinho', 'bloquear banco mágico'], answer: 0 },
    ],
    professionalThinking: 'Profissional maduro trata entrada como ponto crítico de confiabilidade do sistema.',
    codePrompt: 'Descreva regras mínimas de validação para cadastro de produto.',
    codeChecklist: ['citar obrigatório', 'citar tipo', 'citar feedback'],
  },
  {
    id: 'l10', order: 10, level: 2, module: 'Júnior',
    title: 'Componentização, estado e reutilização',
    objective: 'Entender como interfaces crescem com componentes e estados bem organizados.',
    explanation: [
      'Componente é um pedaço reutilizável de interface. Estado é a informação que muda e afeta o que a tela mostra.',
      'Sem clareza de estado, a interface fica imprevisível. Sem critério de componente, tudo vira repetição.',
      'O segredo é separar o que é visual, o que é dado e o que é ação.'
    ],
    examples: [
      'Botão, card de aula e campo de busca como componentes reutilizáveis.',
      'Estado guardando aula atual, progresso e modo de estudo.'
    ],
    steps: ['Descubra o que se repete.', 'Separe o que muda.', 'Evite componente sem propósito.'],
    exercise: 'Explique como estado mal organizado confunde a interface.',
    miniProject: 'Planejar os componentes de uma tela de lista de aulas com progresso.',
    openQuestion: 'Quando vale transformar algo em componente?',
    answerKeywords: ['repetição', 'reutilização', 'estado', 'clareza', 'responsabilidade'],
    answerCoach: 'A resposta ideal liga componente com repetição útil e estado com previsibilidade da interface.',
    reviewBase: {
      content: 'Vale criar componente quando existe padrão reaproveitável e responsabilidade clara.',
      deeper: [
        'Estado bem definido evita efeito colateral estranho e facilita saber por que a interface mudou.',
        'Componente sem propósito vira abstração ruim. O foco é clareza e reaproveitamento real.'
      ],
      quiz: { question: 'Estado em interface está ligado a:', options: ['dados que mudam e afetam a tela', 'cabo de rede', 'licença do Windows'], answer: 0 }
    },
    quiz: [
      { question: 'Componentização ajuda a:', options: ['reutilizar interface', 'eliminar toda lógica', 'trocar banco por CSS'], answer: 0 },
      { question: 'Estado mal organizado deixa a interface:', options: ['confusa e imprevisível', 'sempre correta', 'imutável para sempre'], answer: 0 },
    ],
    professionalThinking: 'Quem amadurece em front-end separa visual, dado e ação com mais disciplina.',
    codePrompt: 'Descreva como você separaria componente de lista, item de aula e barra de progresso.',
    codeChecklist: ['citar componente', 'citar estado', 'citar reutilização'],
  },

  {
    id: 'l11', order: 11, level: 3, module: 'Pleno',
    title: 'Refatoração e leitura de impacto',
    objective: 'Aprender a melhorar código sem quebrar comportamento esperado.',
    explanation: [
      'Refatorar é melhorar estrutura sem mudar a intenção funcional do sistema.',
      'Toda mudança tem impacto. Quem sobe de nível aprende a avaliar efeito colateral antes de alterar.',
      'Código que funciona nem sempre está saudável. A saúde da base influencia velocidade futura.'
    ],
    examples: [
      'Extrair função grande em partes menores.',
      'Renomear variável ruim e ajustar dependências com cuidado.'
    ],
    steps: ['Entenda o comportamento atual.', 'Mude pouco por vez.', 'Valide impacto.', 'Compare antes e depois.'],
    exercise: 'Explique por que refatorar sem entender o comportamento atual é perigoso.',
    miniProject: 'Planejar a refatoração de um arquivo grande em partes menores.',
    openQuestion: 'Como um dev pleno lê impacto antes de alterar?',
    answerKeywords: ['comportamento', 'impacto', 'teste', 'cuidado', 'efeito'],
    answerCoach: 'A resposta forte fala de comportamento atual, risco, efeito colateral e validação.',
    reviewBase: {
      content: 'Refatorar sem entender o comportamento atual é trocar estrutura às cegas.',
      deeper: [
        'Leitura de impacto exige olhar dependências, estados, regras e quem consome aquela parte do código.',
        'Dev pleno amadurece quando deixa de pensar só no trecho e passa a pensar no efeito da mudança no sistema.'
      ],
      quiz: { question: 'Refatoração saudável busca:', options: ['melhorar estrutura sem quebrar comportamento', 'mudar tudo sem validar', 'reduzir segurança'], answer: 0 }
    },
    quiz: [
      { question: 'Leitura de impacto serve para:', options: ['prever efeito colateral', 'deixar o código aleatório', 'apagar histórico'], answer: 0 },
      { question: 'Mudar pouco por vez ajuda a:', options: ['isolar risco', 'esconder erro', 'eliminar dependências mágicas'], answer: 0 },
    ],
    professionalThinking: 'Nível pleno começa a enxergar manutenção como disciplina, não como remendo.',
    codePrompt: 'Descreva uma estratégia para refatorar um arquivo grande sem gerar caos.',
    codeChecklist: ['citar passo pequeno', 'citar validação', 'citar impacto'],
  },
  {
    id: 'l12', order: 12, level: 3, module: 'Pleno',
    title: 'Arquitetura em camadas e contratos',
    objective: 'Entender separação entre interface, regra e dados.',
    explanation: [
      'Arquitetura em camadas separa interface, regra de negócio e acesso a dados para reduzir acoplamento.',
      'Contrato é o combinado entre partes do sistema: o que entra, o que sai e o que se espera.',
      'Quanto melhor o contrato, menor a chance de integração quebrar no silêncio.'
    ],
    examples: [
      'Tela chama serviço. Serviço aplica regra. Repositório acessa dado.',
      'API que promete retornar status e mensagem precisa ser consumida com esse contrato.'
    ],
    steps: ['Separe visual de regra.', 'Separe regra de dado.', 'Defina o contrato entre partes.'],
    exercise: 'Explique por que misturar interface, regra e dado dificulta evolução.',
    miniProject: 'Desenhar em texto uma arquitetura simples para cadastro e listagem de produtos.',
    openQuestion: 'O que um contrato bem definido evita na prática?',
    answerKeywords: ['acoplamento', 'integração', 'entrada', 'saída', 'clareza'],
    answerCoach: 'A resposta ideal liga contrato com previsibilidade e camadas com redução de acoplamento.',
    reviewBase: {
      content: 'Quando tudo fica misturado, alterar uma regra pequena pode quebrar interface e dado ao mesmo tempo.',
      deeper: [
        'Contrato bem definido ajuda outras partes do sistema a consumirem dados sem adivinhação.',
        'Arquitetura em camadas não é luxo. É proteção contra crescimento desorganizado.'
      ],
      quiz: { question: 'Contrato entre partes do sistema ajuda a:', options: ['dar previsibilidade', 'deixar tudo implícito', 'remover regra'], answer: 0 }
    },
    quiz: [
      { question: 'Arquitetura em camadas reduz:', options: ['acoplamento', 'clareza', 'organização'], answer: 0 },
      { question: 'Misturar visual, regra e dado tende a:', options: ['dificultar evolução', 'resolver tudo', 'eliminar bugs'], answer: 0 },
    ],
    professionalThinking: 'Nível pleno começa a decidir melhor onde cada responsabilidade deve morar.',
    codePrompt: 'Descreva em texto uma separação de camadas para um cadastro de produtos.',
    codeChecklist: ['citar interface', 'citar regra', 'citar dados'],
  },
  {
    id: 'l13', order: 13, level: 3, module: 'Pleno',
    title: 'Testes, cenários e prevenção de regressão',
    objective: 'Entender o valor de validar comportamento e evitar quebrar o que já funcionava.',
    explanation: [
      'Teste não é só ferramenta. É a prática de validar cenários importantes antes e depois de mudar o sistema.',
      'Regressão é quando algo que já funcionava para de funcionar após alteração.',
      'Quanto mais o sistema cresce, mais caro fica depender só de memória humana.'
    ],
    examples: [
      'Testar login válido e inválido.',
      'Testar cadastro com campos obrigatórios faltando.',
      'Testar cálculo de total após alteração de desconto.'
    ],
    steps: ['Defina cenário crítico.', 'Defina resultado esperado.', 'Valide após mudança.', 'Proteja comportamento importante.'],
    exercise: 'Explique por que regressão é perigosa em sistemas que já estão em uso.',
    miniProject: 'Listar casos de teste de um fluxo de login e cadastro.',
    openQuestion: 'Como teste ajuda uma equipe a crescer com mais segurança?',
    answerKeywords: ['cenário', 'regressão', 'segurança', 'validação', 'mudança'],
    answerCoach: 'Uma resposta forte liga teste com confiança ao alterar e com proteção de comportamento crítico.',
    reviewBase: {
      content: 'Sem validação de cenário, você muda uma parte e pode quebrar outra sem perceber.',
      deeper: [
        'Teste ajuda equipe a confiar mais em mudança porque existe verificação do comportamento importante.',
        'Nível pleno começa a pensar em prevenção, não só em correção depois do problema.'
      ],
      quiz: { question: 'Regressão significa:', options: ['quebra de algo que já funcionava', 'upgrade automático', 'mudança de cor'], answer: 0 }
    },
    quiz: [
      { question: 'Teste saudável ajuda a:', options: ['validar comportamento importante', 'remover a necessidade de pensar', 'substituir análise'], answer: 0 },
      { question: 'Depender só de memória humana em sistema grande é:', options: ['arriscado', 'ideal', 'suficiente para sempre'], answer: 0 },
    ],
    professionalThinking: 'Profissional maduro protege o que é crítico antes de sair alterando base viva.',
    codePrompt: 'Descreva 5 cenários essenciais para testar um fluxo de login.',
    codeChecklist: ['citar sucesso', 'citar falha', 'citar esperado'],
  },
  {
    id: 'l14', order: 14, level: 3, module: 'Pleno',
    title: 'Modelagem madura e consistência de dados',
    objective: 'Aprofundar visão sobre integridade, duplicação e evolução de banco.',
    explanation: [
      'Modelagem madura pensa não só no agora, mas na evolução e na consistência do dado ao longo do tempo.',
      'À medida que o sistema cresce, inconsistência de dado vira erro operacional, relatório ruim e perda de confiança.',
      'Integridade é um pilar de sistema sério.'
    ],
    examples: [
      'Evitar salvar o mesmo dado em vários lugares sem motivo.',
      'Definir relacionamentos e restrições coerentes para proteger a base.'
    ],
    steps: ['Mapeie o ciclo do dado.', 'Reduza duplicação.', 'Proteja integridade.', 'Pense na evolução.'],
    exercise: 'Explique por que duplicar informação em vários lugares complica manutenção.',
    miniProject: 'Planejar ajustes de modelagem para um sistema que cresceu sem muito cuidado inicial.',
    openQuestion: 'Como dados inconsistentes afetam o negócio além do código?',
    answerKeywords: ['relatório', 'confiança', 'erro', 'duplicação', 'integridade'],
    answerCoach: 'A resposta boa conecta banco com impacto real no negócio e confiança da operação.',
    reviewBase: {
      content: 'Dado inconsistente não é só problema técnico. Ele afeta operação, decisão e confiança no sistema.',
      deeper: [
        'Quem amadurece em dados pensa em integridade, origem da informação e efeitos no relatório e no processo.',
        'Duplicação mal pensada quase sempre cobra a conta mais tarde.'
      ],
      quiz: { question: 'Integridade de dados está ligada a:', options: ['consistência e confiança', 'efeito visual', 'velocidade da fonte'], answer: 0 }
    },
    quiz: [
      { question: 'Duplicação de dado sem critério tende a:', options: ['complicar manutenção', 'resolver inconsistência', 'eliminar retrabalho'], answer: 0 },
      { question: 'Banco maduro pensa também em:', options: ['evolução futura', 'somente na tela', 'apenas no nome da tabela'], answer: 0 },
    ],
    professionalThinking: 'Nível pleno começa a enxergar dado como ativo central do sistema.',
    codePrompt: 'Descreva como você protegeria a consistência de dados em um sistema de pedidos.',
    codeChecklist: ['citar integridade', 'citar relacionamento', 'citar duplicação'],
  },

  {
    id: 'l15', order: 15, level: 4, module: 'Sênior',
    title: 'Escalabilidade, acoplamento e desenho de sistema',
    objective: 'Entender trade-offs de crescimento e desenho mais robusto.',
    explanation: [
      'Escalabilidade não é só aguentar mais usuário. É crescer sem colapsar manutenção, desempenho e previsibilidade.',
      'Acoplamento alto torna mudança pequena em risco grande. Coesão boa ajuda cada parte a ter foco claro.',
      'Desenho de sistema exige pensar em fluxo, gargalo, contrato, falha e custo.'
    ],
    examples: [
      'Separar responsabilidades para que uma mudança não quebre metade do sistema.',
      'Pensar no que acontece quando aumenta o volume de requisições ou dados.'
    ],
    steps: ['Mapeie gargalo.', 'Reduza acoplamento.', 'Defina contratos claros.', 'Pense em falha e custo.'],
    exercise: 'Explique por que acoplamento alto atrapalha escalabilidade técnica.',
    miniProject: 'Desenhar em texto um sistema simples que precise crescer com mais usuários.',
    openQuestion: 'Como alguém mais sênior pensa antes de decidir arquitetura?',
    answerKeywords: ['trade-off', 'gargalo', 'acoplamento', 'falha', 'custo'],
    answerCoach: 'A resposta forte mostra que arquitetura é decisão com trade-off, e não escolha por moda.',
    reviewBase: {
      content: 'Arquitetura boa não é a mais complexa. É a que responde ao contexto com equilíbrio entre risco, custo e evolução.',
      deeper: [
        'Quem pensa em escalabilidade olha acoplamento, gargalo, manutenção e impacto operacional.',
        'Decisão sênior quase sempre envolve trade-off: ganhar algo e aceitar um custo.'
      ],
      quiz: { question: 'Decisão arquitetural madura considera:', options: ['trade-offs', 'somente estética', 'apenas nome bonito'], answer: 0 }
    },
    quiz: [
      { question: 'Acoplamento alto tende a:', options: ['aumentar risco de mudança', 'facilitar tudo', 'eliminar dependências'], answer: 0 },
      { question: 'Escalabilidade envolve também:', options: ['manutenção e previsibilidade', 'só número de usuários', 'somente layout'], answer: 0 },
    ],
    professionalThinking: 'Nível sênior pensa em decisão técnica como equilíbrio entre benefício, custo e risco.',
    codePrompt: 'Descreva os principais pontos que você avaliaria ao desenhar um sistema que pode crescer.',
    codeChecklist: ['citar gargalo', 'citar risco', 'citar manutenção'],
  },
  {
    id: 'l16', order: 16, level: 4, module: 'Sênior',
    title: 'Confiabilidade, observabilidade e prevenção de falha',
    objective: 'Aprender a pensar em disponibilidade, rastreabilidade e reação a problema.',
    explanation: [
      'Sistema sério precisa ser observável. Você precisa enxergar o que está acontecendo para agir rápido.',
      'Confiabilidade nasce de prevenção, monitoramento e reação planejada.',
      'Quem sobe de nível deixa de pensar só em construir e passa a pensar em sustentar.'
    ],
    examples: [
      'Logs estruturados, métricas, alertas e rastreamento de erro.',
      'Plano de ação quando uma parte crítica falha.'
    ],
    steps: ['Descubra pontos críticos.', 'Defina sinais observáveis.', 'Monitore.', 'Prepare reação.'],
    exercise: 'Explique por que sistema sem observabilidade demora mais para ser corrigido.',
    miniProject: 'Descrever o mínimo de observabilidade para um sistema de login e cadastro.',
    openQuestion: 'Como prevenir falha é melhor do que só reagir depois?',
    answerKeywords: ['monitorar', 'log', 'métrica', 'alerta', 'reação'],
    answerCoach: 'A resposta ideal liga visibilidade operacional com velocidade de correção e prevenção.',
    reviewBase: {
      content: 'Sem observabilidade você pode até saber que algo quebrou, mas não entende rápido onde, quando e por quê.',
      deeper: [
        'Confiabilidade é disciplina de operação: monitorar, alertar e reagir com plano.',
        'Nível sênior pensa em sustentação do sistema e não apenas na entrega inicial.'
      ],
      quiz: { question: 'Observabilidade ajuda a:', options: ['enxergar e investigar o comportamento do sistema', 'trocar CSS por banco', 'eliminar análise'], answer: 0 }
    },
    quiz: [
      { question: 'Alertas servem para:', options: ['avisar comportamento crítico', 'trocar framework', 'substituir log'], answer: 0 },
      { question: 'Confiabilidade está ligada a:', options: ['prevenção e reação planejada', 'sorte', 'layout bonito'], answer: 0 },
    ],
    professionalThinking: 'Nível sênior trata produção como ambiente vivo que precisa de visibilidade e resposta rápida.',
    codePrompt: 'Descreva quais sinais você monitoraria em um fluxo de login em produção.',
    codeChecklist: ['citar log', 'citar métrica', 'citar alerta'],
  },
  {
    id: 'l17', order: 17, level: 4, module: 'Sênior',
    title: 'Segurança prática: autenticação, autorização e risco',
    objective: 'Aprofundar visão de segurança aplicada ao desenho de sistema.',
    explanation: [
      'Autenticação responde quem é a pessoa. Autorização responde o que ela pode fazer.',
      'Segurança ruim não aparece só em invasão. Ela também aparece em permissões frouxas, exposição de dado e arquitetura descuidada.',
      'Pensamento sênior trata risco como parte do desenho e não como adição tardia.'
    ],
    examples: [
      'Usuário autenticado pode existir sem estar autorizado a ver dados financeiros.',
      'Senha fraca e controle de acesso ruim aumentam exposição.'
    ],
    steps: ['Separe autenticação de autorização.', 'Proteja dado sensível.', 'Limite acesso ao necessário.', 'Pense em risco desde o início.'],
    exercise: 'Explique por que autenticar não significa autorizar.',
    miniProject: 'Planejar regras de acesso de um painel administrativo simples.',
    openQuestion: 'Como arquitetura fraca aumenta risco mesmo sem ataque explícito?',
    answerKeywords: ['acesso', 'risco', 'proteção', 'permissão', 'dados'],
    answerCoach: 'Uma resposta forte liga segurança com desenho, controle de acesso e exposição indevida.',
    reviewBase: {
      content: 'Autenticar é provar identidade. Autorizar é decidir o que aquela identidade pode acessar ou executar.',
      deeper: [
        'Quando a arquitetura ignora risco, a exposição pode vir de permissões mal pensadas e fluxos inseguros.',
        'Segurança madura é prevenção com critério, não susto depois do problema.'
      ],
      quiz: { question: 'Autorização está ligada a:', options: ['o que a pessoa pode fazer', 'quem é a pessoa', 'qual navegador usa'], answer: 0 }
    },
    quiz: [
      { question: 'Autenticação responde:', options: ['quem é a pessoa', 'o que ela pode fazer', 'qual o banco usado'], answer: 0 },
      { question: 'Controle de acesso ruim aumenta:', options: ['risco', 'segurança', 'clareza'], answer: 0 },
    ],
    professionalThinking: 'Sênior pensa em segurança no desenho, na operação e na manutenção.',
    codePrompt: 'Descreva regras básicas de acesso para um painel administrativo com perfis diferentes.',
    codeChecklist: ['citar perfil', 'citar permissão', 'citar dado sensível'],
  },
  {
    id: 'l18', order: 18, level: 4, module: 'Sênior',
    title: 'Revisão técnica e orientação de outras pessoas',
    objective: 'Entender como elevar qualidade e ajudar outros a crescer.',
    explanation: [
      'Revisão técnica não é humilhação. É mecanismo de qualidade, consistência e aprendizado coletivo.',
      'Quem orienta bem não só aponta erro. Explica impacto, alternativa e critério.',
      'Nível sênior também envolve elevar o entorno, não apenas seu próprio código.'
    ],
    examples: [
      'Apontar duplicação e explicar por que ela aumenta custo futuro.',
      'Sugerir testes antes de aceitar mudança crítica.'
    ],
    steps: ['Leia intenção da mudança.', 'Aponte risco real.', 'Sugira caminho melhor.', 'Mantenha respeito e clareza.'],
    exercise: 'Explique a diferença entre crítica vazia e revisão técnica madura.',
    miniProject: 'Escrever um exemplo de feedback técnico respeitoso sobre uma mudança arriscada.',
    openQuestion: 'Como orientar sem desmotivar e ainda elevar a qualidade?',
    answerKeywords: ['respeito', 'impacto', 'clareza', 'qualidade', 'alternativa'],
    answerCoach: 'A resposta boa liga revisão com clareza, respeito, impacto e proposta de melhoria.',
    reviewBase: {
      content: 'Revisão madura explica o porquê da sugestão. Não é só dizer “está errado”.',
      deeper: [
        'Orientar bem acelera o crescimento da equipe e reduz repetição de erro.',
        'Quem revisa com maturidade busca qualidade do sistema e desenvolvimento da pessoa.'
      ],
      quiz: { question: 'Boa revisão técnica deve:', options: ['explicar impacto e sugerir melhoria', 'humilhar quem errou', 'ser vaga'], answer: 0 }
    },
    quiz: [
      { question: 'Feedback técnico bom precisa ser:', options: ['respeitoso e claro', 'agressivo', 'sem fundamento'], answer: 0 },
      { question: 'Revisão técnica também serve para:', options: ['aumentar aprendizado coletivo', 'impedir evolução', 'remover comunicação'], answer: 0 },
    ],
    professionalThinking: 'Nível sênior cuida de qualidade do sistema e do crescimento técnico do entorno.',
    codePrompt: 'Escreva um exemplo curto de feedback técnico maduro sobre código duplicado.',
    codeChecklist: ['citar impacto', 'citar melhoria', 'citar respeito'],
  },

  {
    id: 'l19', order: 19, level: 5, module: 'Visão executiva',
    title: 'Produto, prioridade e valor entregue',
    objective: 'Entender como tecnologia se conecta com valor real para o negócio.',
    explanation: [
      'Nem toda ideia deve virar prioridade agora. Produto exige decidir o que entrega valor com risco aceitável.',
      'Tecnologia sem visão de valor pode consumir tempo e orçamento sem mover o negócio.',
      'Quem pensa de forma executiva busca impacto, prioridade e coerência com objetivo.'
    ],
    examples: [
      'Resolver bug que bloqueia operação pode valer mais do que criar recurso vistoso.',
      'Melhoria pequena com alto impacto às vezes supera projeto grande de baixa prioridade.'
    ],
    steps: ['Olhe valor.', 'Olhe risco.', 'Olhe custo.', 'Defina prioridade.'],
    exercise: 'Explique por que nem tudo que é tecnicamente legal deve ser feito agora.',
    miniProject: 'Priorizar 5 melhorias hipotéticas de um sistema com tempo limitado.',
    openQuestion: 'Como você decidiria entre algo bonito e algo que resolve dor real imediata?',
    answerKeywords: ['valor', 'prioridade', 'risco', 'custo', 'impacto'],
    answerCoach: 'A resposta forte fala de valor entregue, dor real, risco e custo de oportunidade.',
    reviewBase: {
      content: 'Prioridade madura não nasce do impulso. Ela nasce da comparação entre valor, risco, custo e urgência.',
      deeper: [
        'Visão executiva não ignora técnica. Ela encaixa técnica dentro do que mais move o resultado do negócio.',
        'Custo de oportunidade importa: ao escolher uma coisa, você deixa de fazer outra.'
      ],
      quiz: { question: 'Prioridade madura considera:', options: ['valor, risco e custo', 'somente gosto pessoal', 'apenas estética'], answer: 0 }
    },
    quiz: [
      { question: 'Entregar valor significa:', options: ['resolver problema relevante', 'só usar tecnologia da moda', 'apenas escrever mais código'], answer: 0 },
      { question: 'Custo de oportunidade quer dizer:', options: ['o que você deixa de fazer ao escolher outra coisa', 'custo da fonte', 'tempo do mouse'], answer: 0 },
    ],
    professionalThinking: 'Visão executiva escolhe direção técnica olhando impacto real e não só preferência.',
    codePrompt: 'Descreva como você priorizaria melhorias em um sistema com pouco tempo e muitos pedidos.',
    codeChecklist: ['citar risco', 'citar valor', 'citar prioridade'],
  },
  {
    id: 'l20', order: 20, level: 5, module: 'Visão executiva',
    title: 'Direção técnica, risco organizacional e encerramento da trilha',
    objective: 'Conectar decisão técnica com impacto organizacional e concluir a jornada.',
    explanation: [
      'Direção técnica define o rumo do sistema e influencia custo, qualidade, risco e velocidade da organização.',
      'Escolha ruim pode gerar dívida técnica, insegurança, falha operacional e retrabalho em escala.',
      'No último nível, o foco é decidir com visão ampla: produto, operação, pessoas e sustentabilidade.'
    ],
    examples: [
      'Escolher solução rápida demais pode gerar custo alto de manutenção depois.',
      'Ignorar segurança ou observabilidade pode comprometer a operação inteira.'
    ],
    steps: ['Pense no longo prazo.', 'Avalie risco organizacional.', 'Alinhe direção com capacidade real.', 'Decida com critério.'],
    exercise: 'Explique como uma decisão técnica pode afetar pessoas, operação e custo ao mesmo tempo.',
    miniProject: 'Escrever uma visão resumida de direção técnica para um sistema que precisa crescer com segurança.',
    openQuestion: 'O que muda quando alguém deixa de pensar só como dev e passa a pensar como direção técnica?',
    answerKeywords: ['longo prazo', 'risco', 'organização', 'custo', 'sustentabilidade'],
    answerCoach: 'A resposta boa conecta técnica com organização, pessoas, custo e longo prazo.',
    reviewBase: {
      content: 'Direção técnica madura pensa no efeito da decisão no sistema, na equipe, na operação e no negócio.',
      deeper: [
        'No último nível da trilha, a lógica é sair do foco só no trecho de código e ampliar a visão para impacto organizacional.',
        'A boa direção técnica protege o futuro sem ignorar a entrega do presente.'
      ],
      quiz: { question: 'Direção técnica madura pensa em:', options: ['impacto amplo e longo prazo', 'somente no trecho de código', 'só em estética'], answer: 0 }
    },
    quiz: [
      { question: 'Decisão técnica ruim pode gerar:', options: ['risco e dívida técnica', 'segurança automática', 'clareza total sem esforço'], answer: 0 },
      { question: 'Visão ampla envolve:', options: ['produto, operação e sustentabilidade', 'apenas sintaxe', 'somente ferramenta'], answer: 0 },
    ],
    professionalThinking: 'No último nível, pensar bem significa unir técnica, negócio, risco e direção.',
    codePrompt: 'Descreva uma visão resumida para guiar um sistema que precisa crescer sem virar caos.',
    codeChecklist: ['citar risco', 'citar longo prazo', 'citar direção'],
  },
];

const DEFAULT_STATE = {
  flowStep: 'intro',
  mode: null,
  currentLessonId: LESSONS[0].id,
  lastVisitedLessonId: LESSONS[0].id,
  lessonSearch: '',
  notesByLesson: {},
  completedLessons: {},
  lessonProgress: {},
};

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? { ...DEFAULT_STATE, ...JSON.parse(saved) } : DEFAULT_STATE;
  } catch {
    return DEFAULT_STATE;
  }
}

function getLessonProgress(state, lessonId) {
  return state.lessonProgress[lessonId] || {
    status: 'not-started',
    answerText: '',
    answerPassed: false,
    answerLocked: false,
    answerFeedback: '',
    answerAttempts: 0,
    quiz: {},
    codeText: '',
    review: {
      active: false,
      targetType: null,
      targetIndex: null,
      depth: 0,
      reviewPassed: false,
      reviewSelected: null,
      reviewMessage: '',
    },
  };
}

function getUnlockedOrder(state) {
  let nextOrder = 1;
  for (const lesson of LESSONS) {
    if (state.completedLessons[lesson.id]) nextOrder = lesson.order + 1;
    else break;
  }
  return Math.min(nextOrder, LESSONS.length);
}

function getUnlockedLevel(state) {
  let current = 1;
  for (const level of LEVELS) {
    const lessons = LESSONS.filter((lesson) => lesson.level === level.id);
    const allDone = lessons.every((lesson) => state.completedLessons[lesson.id]);
    if (allDone && current === level.id) current += 1;
    else break;
  }
  return Math.min(current, LEVELS.length);
}

function normalize(text) {
  return String(text || '').toLowerCase();
}

function evaluateOpenAnswer(lesson, answer) {
  const text = normalize(answer);
  const hits = lesson.answerKeywords.filter((keyword) => text.includes(normalize(keyword)));
  const missing = lesson.answerKeywords.filter((keyword) => !text.includes(normalize(keyword)));
  const passed = hits.length >= Math.max(2, Math.ceil(lesson.answerKeywords.length * 0.6));

  return {
    passed,
    hits,
    missing,
    feedback: passed
      ? `Boa resposta. Você mostrou entendimento suficiente desta aula. Complemento importante: ${lesson.answerCoach}`
      : `Sua resposta ainda não mostrou com clareza os pontos principais. Releia, pesquise se for necessário e depois tente novamente. Foque em: ${missing.slice(0, 4).join(', ') || 'objetivo, fluxo e aplicação prática'}.`,
  };
}

function nextReviewContent(lesson, depth) {
  const extra = lesson.reviewBase.deeper[Math.min(depth, lesson.reviewBase.deeper.length - 1)] || lesson.reviewBase.deeper[lesson.reviewBase.deeper.length - 1] || '';
  return [lesson.reviewBase.content, extra].filter(Boolean);
}

function App() {
  const [state, setState] = useState(loadState);
  const [installPrompt, setInstallPrompt] = useState(null);
  const [celebration, setCelebration] = useState(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    const handler = (event) => {
      event.preventDefault();
      setInstallPrompt(event);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const unlockedOrder = useMemo(() => getUnlockedOrder(state), [state]);
  const unlockedLevel = useMemo(() => getUnlockedLevel(state), [state]);
  const currentLesson = LESSONS.find((lesson) => lesson.id === state.currentLessonId) || LESSONS[0];
  const currentProgress = getLessonProgress(state, currentLesson.id);

  const filteredLessons = useMemo(() => {
    const search = normalize(state.lessonSearch).trim();
    if (!search) return LESSONS;
    return LESSONS.filter((lesson) => `${lesson.title} ${lesson.module} ${LEVELS.find((l) => l.id === lesson.level)?.name || ''}`.toLowerCase().includes(search));
  }, [state.lessonSearch]);

  const totalDone = Object.keys(state.completedLessons).length;
  const totalPercent = Math.round((totalDone / LESSONS.length) * 100);

  function patchState(patch) {
    setState((current) => ({ ...current, ...patch }));
  }

  function patchLessonProgress(lessonId, patch) {
    setState((current) => ({
      ...current,
      lessonProgress: {
        ...current.lessonProgress,
        [lessonId]: {
          ...getLessonProgress(current, lessonId),
          ...patch,
        },
      },
    }));
  }

  function noteForLesson(lessonId, value) {
    patchState({ notesByLesson: { ...state.notesByLesson, [lessonId]: value } });
  }

  function openLesson(lesson) {
    const locked = lesson.order > unlockedOrder || lesson.level > unlockedLevel;
    if (locked) return;
    const progress = getLessonProgress(state, lesson.id);
    patchState({
      flowStep: 'lesson',
      currentLessonId: lesson.id,
      lastVisitedLessonId: lesson.id,
      lessonProgress: {
        ...state.lessonProgress,
        [lesson.id]: {
          ...progress,
          status: state.completedLessons[lesson.id] ? 'done' : 'in-progress',
        },
      },
    });
  }

  function startMode(mode) {
    patchState({ flowStep: 'lessons', mode });
  }

  function triggerReview(targetType, targetIndex) {
    const progress = getLessonProgress(state, currentLesson.id);
    const nextDepth = (progress.review?.depth || 0) + 1;
    patchLessonProgress(currentLesson.id, {
      review: {
        active: true,
        targetType,
        targetIndex,
        depth: nextDepth,
        reviewPassed: false,
        reviewSelected: null,
        reviewMessage: '',
      },
      status: 'in-progress',
    });
    patchState({ flowStep: 'review' });
  }

  function verifyMainAnswer() {
    const progress = getLessonProgress(state, currentLesson.id);
    const result = evaluateOpenAnswer(currentLesson, progress.answerText);
    if (result.passed) {
      patchLessonProgress(currentLesson.id, {
        answerPassed: true,
        answerLocked: true,
        answerFeedback: result.feedback,
        answerAttempts: (progress.answerAttempts || 0) + 1,
        status: 'in-progress',
      });
      return;
    }

    patchLessonProgress(currentLesson.id, {
      answerPassed: false,
      answerLocked: false,
      answerFeedback: `${result.feedback} Use o botão abaixo para revisar e tentar novamente.`,
      answerAttempts: (progress.answerAttempts || 0) + 1,
      status: 'in-progress',
    });
    triggerReview('answer', null);
  }

  function answerQuiz(questionIndex, optionIndex) {
    const lesson = currentLesson;
    const question = lesson.quiz[questionIndex];
    const progress = getLessonProgress(state, lesson.id);
    const currentQuizState = progress.quiz[questionIndex] || {};
    if (currentQuizState.locked) return;

    if (question.answer === optionIndex) {
      patchLessonProgress(lesson.id, {
        quiz: {
          ...progress.quiz,
          [questionIndex]: {
            selected: optionIndex,
            locked: true,
            correct: true,
            attempts: currentQuizState.attempts || 0,
            message: 'Resposta correta. Esta pergunta foi concluída.',
          },
        },
      });
      return;
    }

    patchLessonProgress(lesson.id, {
      quiz: {
        ...progress.quiz,
        [questionIndex]: {
          ...currentQuizState,
          selected: optionIndex,
          locked: false,
          correct: false,
          attempts: (currentQuizState.attempts || 0) + 1,
          waitingReview: true,
          message: 'Resposta incorreta. Agora revise rapidamente e tente outra vez.',
        },
      },
    });
    triggerReview('quiz', questionIndex);
  }

  function answerReview(optionIndex) {
    const lesson = currentLesson;
    const progress = getLessonProgress(state, lesson.id);
    const isCorrect = lesson.reviewBase.quiz.answer === optionIndex;
    if (!isCorrect) {
      patchLessonProgress(lesson.id, {
        review: {
          ...progress.review,
          reviewSelected: optionIndex,
          reviewPassed: false,
          reviewMessage: 'Ainda não foi. Leia a revisão com calma e tente novamente. A ideia é reforçar a memória antes de voltar.',
        },
      });
      return;
    }

    if (progress.review.targetType === 'quiz') {
      const quizState = progress.quiz[progress.review.targetIndex] || {};
      patchLessonProgress(lesson.id, {
        quiz: {
          ...progress.quiz,
          [progress.review.targetIndex]: {
            ...quizState,
            waitingReview: false,
            message: 'Revisão concluída. Agora responda novamente a pergunta original.',
          },
        },
        review: {
          ...progress.review,
          reviewSelected: optionIndex,
          reviewPassed: true,
          reviewMessage: 'Boa. Revisão concluída. Você já pode tentar novamente a pergunta original.',
        },
      });
    } else {
      patchLessonProgress(lesson.id, {
        review: {
          ...progress.review,
          reviewSelected: optionIndex,
          reviewPassed: true,
          reviewMessage: 'Boa. Revisão concluída. Agora volte e responda novamente a questão principal.',
        },
      });
    }
  }

  function backFromReview() {
    const progress = getLessonProgress(state, currentLesson.id);
    if (!progress.review.reviewPassed) return;
    patchLessonProgress(currentLesson.id, {
      review: {
        ...progress.review,
        active: false,
        reviewSelected: null,
        reviewMessage: '',
      },
    });
    patchState({ flowStep: 'lesson' });
  }

  function saveCode(value) {
    patchLessonProgress(currentLesson.id, { codeText: value, status: 'in-progress' });
  }

  function allQuizCorrect(lessonId) {
    const lesson = LESSONS.find((item) => item.id === lessonId);
    const progress = getLessonProgress(state, lessonId);
    return lesson.quiz.every((_, index) => progress.quiz[index]?.locked);
  }

  function finishLesson() {
    const lesson = currentLesson;
    const nextLesson = LESSONS.find((item) => item.order === lesson.order + 1);
    const levelLessons = LESSONS.filter((item) => item.level === lesson.level);
    const willCompleteLevel = levelLessons.every((item) => item.id === lesson.id || state.completedLessons[item.id]);
    const willFinishAll = LESSONS.every((item) => item.id === lesson.id || state.completedLessons[item.id]);
    const currentLevel = LEVELS.find((item) => item.id === lesson.level);
    const nextLevel = LEVELS.find((item) => item.id === lesson.level + 1);

    setState((current) => ({
      ...current,
      completedLessons: {
        ...current.completedLessons,
        [lesson.id]: true,
      },
      lessonProgress: {
        ...current.lessonProgress,
        [lesson.id]: {
          ...getLessonProgress(current, lesson.id),
          status: 'done',
        },
      },
      lastVisitedLessonId: nextLesson ? nextLesson.id : lesson.id,
      currentLessonId: nextLesson ? nextLesson.id : lesson.id,
      flowStep: nextLesson ? 'lesson' : 'lessons',
    }));

    if (willFinishAll) {
      setCelebration({ title: 'PARABÉNS! VOCÊ FINALIZOU TODAS AS AULAS', text: 'Você concluiu toda a trilha da DevAcademy ADS. Sua base está muito mais madura e profissional.' });
      return;
    }

    if (willCompleteLevel) {
      setCelebration({
        title: 'PARABÉNS! VOCÊ AVANÇOU PARA UM NOVO NÍVEL',
        text: nextLevel ? `Você concluiu o nível ${currentLevel.name} e desbloqueou o nível ${nextLevel.name}.` : `Você concluiu o nível ${currentLevel.name}.`,
      });
    }
  }

  async function installApp() {
    if (!installPrompt) return;
    await installPrompt.prompt();
    await installPrompt.userChoice;
    setInstallPrompt(null);
  }

  const canFinishLesson = currentProgress.answerLocked && allQuizCorrect(currentLesson.id);
  const continueLessonId = state.lastVisitedLessonId || state.currentLessonId;
  const reviewParagraphs = nextReviewContent(currentLesson, Math.max(0, (currentProgress.review.depth || 1) - 1));

  return (
    <div className="app-shell minimal-shell">
      <header className="topbar compact-topbar">
        <div>
          <p className="eyebrow">DevAcademy ADS</p>
          <h1>Curso progressivo e ferramenta real de estudo</h1>
          <p className="subtitle">Foco em utilidade real no celular, revisão constante, raciocínio profissional e progressão por níveis.</p>
        </div>
        <div className="topbar-actions">
          {state.mode && <span className="pill-label">Modo atual: {state.mode === 'sem-codar' ? 'Estudar sem codar' : 'Estudar e codar'}</span>}
          <span className="pill-label">Progresso total: {totalPercent}%</span>
          {installPrompt && <button className="secondary-btn" onClick={installApp}>Instalar app</button>}
        </div>
      </header>

      {celebration && (
        <div className="celebration-overlay" onClick={() => setCelebration(null)}>
          <div className="celebration-card" onClick={(e) => e.stopPropagation()}>
            <h2>{celebration.title}</h2>
            <p>{celebration.text}</p>
            <button className="primary-btn" onClick={() => setCelebration(null)}>Continuar</button>
          </div>
        </div>
      )}

      <main className="single-flow">
        {state.flowStep === 'intro' && (
          <section className="page-section narrow-section">
            <Card title="Apresentação">
              <p>O DevAcademy ADS foi pensado para estudo sério no dia a dia, principalmente no celular, com progresso salvo e navegação simples.</p>
              <div className="intro-points">
                <div><strong>Estudar sem codar</strong><span>Para leitura, revisão, reflexão, respostas abertas e treino conceitual.</span></div>
                <div><strong>Estudar e codar</strong><span>Para quem está no PC ou quer praticar com mais liberdade e espaço para código.</span></div>
                <div><strong>Progressão real</strong><span>Você avança por níveis, desbloqueia aulas aos poucos e revisa quando erra para realmente aprender.</span></div>
              </div>
              <div className="inline-actions">
                <button className="primary-btn" onClick={() => patchState({ flowStep: 'mode' })}>Próximo</button>
              </div>
            </Card>
          </section>
        )}

        {state.flowStep === 'mode' && (
          <section className="page-section narrow-section">
            <Card title="Escolha como deseja estudar agora">
              <div className="mode-choice-grid">
                <button className="mode-choice" onClick={() => startMode('sem-codar')}>
                  <strong>Estudar sem codar</strong>
                  <span>Modo mais leve para celular, revisão, reflexão e resposta escrita.</span>
                </button>
                <button className="mode-choice" onClick={() => startMode('com-codar')}>
                  <strong>Estudar e codar</strong>
                  <span>Modo ideal para PC, prática guiada e espaço para estruturar solução.</span>
                </button>
              </div>
            </Card>
          </section>
        )}

        {state.flowStep === 'lessons' && (
          <section className="page-section">
            <div className="lessons-toolbar">
              <div>
                <button className="back-link top-back-link" onClick={() => patchState({ flowStep: 'mode' })}>← Voltar para escolha de modo</button>
                <h2>Aulas</h2>
                <p>Escolha sua aula e continue a trilha com progressão salva localmente.</p>
              </div>
              <div className="toolbar-actions">
                <button className="secondary-btn" onClick={() => openLesson(LESSONS.find((item) => item.id === continueLessonId) || LESSONS[0])}>Continue</button>
                <button className="secondary-btn" onClick={() => patchState({ flowStep: 'mode' })}>Trocar modo</button>
              </div>
            </div>

            <div className="progress-summary-card">
              <strong>Progresso geral</strong>
              <div className="progress-bar"><span style={{ width: `${totalPercent}%` }} /></div>
              <p>{totalDone} de {LESSONS.length} aulas concluídas.</p>
              <div className="level-chip-row">
                {LEVELS.map((level) => {
                  const levelLessons = LESSONS.filter((lesson) => lesson.level === level.id);
                  const done = levelLessons.filter((lesson) => state.completedLessons[lesson.id]).length;
                  const isUnlocked = level.id <= unlockedLevel;
                  return (
                    <span key={level.id} className={`level-chip ${isUnlocked ? 'active' : ''}`}>
                      {level.name} · {done}/{levelLessons.length}
                    </span>
                  );
                })}
              </div>
            </div>

            <div className="search-box compact-search">
              <label htmlFor="lessonSearch">Buscar aula</label>
              <input id="lessonSearch" value={state.lessonSearch} onChange={(e) => patchState({ lessonSearch: e.target.value })} placeholder="Ex.: lógica, banco, segurança" />
            </div>

            <div className="lesson-list">
              {filteredLessons.map((lesson) => {
                const progress = getLessonProgress(state, lesson.id);
                const locked = lesson.order > unlockedOrder || lesson.level > unlockedLevel;
                const done = !!state.completedLessons[lesson.id];
                const isContinue = !done && lesson.id === continueLessonId;
                const statusLabel = done ? '✅ Concluída' : locked ? '🔒 Bloqueada' : isContinue ? 'Continue' : 'Disponível';
                return (
                  <button key={lesson.id} className={`lesson-row ${locked ? 'locked' : ''}`} onClick={() => openLesson(lesson)} disabled={locked}>
                    <div className="lesson-row-main">
                      <strong>{lesson.order}. {lesson.title}</strong>
                      <span>{LEVELS.find((item) => item.id === lesson.level)?.name} · {lesson.module}</span>
                    </div>
                    <span className={`status-badge ${done ? 'done' : locked ? 'locked' : isContinue ? 'continue' : ''}`}>{statusLabel}</span>
                  </button>
                );
              })}
            </div>
          </section>
        )}

        {state.flowStep === 'review' && (
          <section className="page-section narrow-section">
            <Card title="Revisão rápida antes de tentar novamente" tone="warning">
              <p>Você errou a resposta anterior. Agora leia a revisão abaixo com calma, fixe a ideia e responda o mini quiz para poder tentar de novo.</p>
              {reviewParagraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
              <div className="quiz-item">
                <strong>{currentLesson.reviewBase.quiz.question}</strong>
                <div className="option-stack">
                  {currentLesson.reviewBase.quiz.options.map((option, index) => (
                    <button
                      key={option}
                      className={`option-btn ${currentProgress.review.reviewSelected === index ? 'selected' : ''}`}
                      onClick={() => answerReview(index)}
                      disabled={currentProgress.review.reviewPassed}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                {currentProgress.review.reviewMessage && (
                  <p className={`feedback ${currentProgress.review.reviewPassed ? 'success-text' : 'warning-text'}`}>{currentProgress.review.reviewMessage}</p>
                )}
              </div>
              <div className="inline-actions wrap-actions">
                <button className="primary-btn" disabled={!currentProgress.review.reviewPassed} onClick={backFromReview}>Voltar para a questão</button>
              </div>
            </Card>
          </section>
        )}

        {state.flowStep === 'lesson' && (
          <section className="page-section">
            <div className="lesson-header-card">
              <button className="back-link" onClick={() => patchState({ flowStep: 'lessons', lastVisitedLessonId: currentLesson.id })}>← Voltar para aulas</button>
              <h2>{currentLesson.order}. {currentLesson.title}</h2>
              <p><strong>Objetivo:</strong> {currentLesson.objective}</p>
              <p><strong>Nível:</strong> {LEVELS.find((item) => item.id === currentLesson.level)?.name} · {currentLesson.module}</p>
            </div>

            <Card title="Explicação detalhada">
              {currentLesson.explanation.map((item) => <p key={item}>{item}</p>)}
            </Card>

            <Card title="Exemplos práticos">
              <ul>{currentLesson.examples.map((item) => <li key={item}>{item}</li>)}</ul>
            </Card>

            <Card title="Guia passo a passo">
              <ol>{currentLesson.steps.map((item) => <li key={item}>{item}</li>)}</ol>
            </Card>

            <Card title="Exercício e mini projeto">
              <p><strong>Exercício:</strong> {currentLesson.exercise}</p>
              <p><strong>Mini projeto:</strong> {currentLesson.miniProject}</p>
            </Card>

            <Card title="Pergunta aberta principal">
              <p>{currentLesson.openQuestion}</p>
              <textarea
                rows={6}
                value={currentProgress.answerText}
                onChange={(e) => patchLessonProgress(currentLesson.id, { answerText: e.target.value, status: 'in-progress' })}
                disabled={currentProgress.answerLocked}
                placeholder="Responda com suas palavras, explicando a ideia e a aplicação prática."
              />
              <div className="inline-actions wrap-actions">
                <button className="primary-btn" onClick={verifyMainAnswer} disabled={currentProgress.answerLocked || !currentProgress.answerText.trim()}>Verificar resposta</button>
                {!currentProgress.answerLocked && currentProgress.answerAttempts > 0 && (
                  <button className="secondary-btn" onClick={() => triggerReview('answer', null)}>Tentar novamente</button>
                )}
              </div>
              {currentProgress.answerFeedback && <p className={`feedback ${currentProgress.answerLocked ? 'success-text' : 'warning-text'}`}>{currentProgress.answerFeedback}</p>}
            </Card>

            <Card title="Quiz rápido">
              <div className="quiz-stack">
                {currentLesson.quiz.map((question, questionIndex) => {
                  const quizState = currentProgress.quiz[questionIndex] || {};
                  return (
                    <div key={question.question} className="quiz-item">
                      <strong>{question.question}</strong>
                      <div className="option-stack">
                        {question.options.map((option, optionIndex) => {
                          const isSelected = quizState.selected === optionIndex;
                          const isCorrect = quizState.locked && question.answer === optionIndex;
                          return (
                            <button
                              key={option}
                              className={`option-btn ${isSelected ? 'selected' : ''} ${isCorrect ? 'correct' : ''}`}
                              onClick={() => answerQuiz(questionIndex, optionIndex)}
                              disabled={quizState.locked || quizState.waitingReview}
                            >
                              {option}
                            </button>
                          );
                        })}
                      </div>
                      {quizState.message && <p className={`feedback ${quizState.locked ? 'success-text' : 'warning-text'}`}>{quizState.message}</p>}
                      {!quizState.locked && quizState.waitingReview && (
                        <button className="secondary-btn" onClick={() => triggerReview('quiz', questionIndex)}>Tentar novamente</button>
                      )}
                    </div>
                  );
                })}
              </div>
            </Card>

            <Card title="Pensamento profissional">
              <p>{currentLesson.professionalThinking}</p>
            </Card>

            {state.mode === 'com-codar' && (
              <>
                <Card title="Prática de código (opcional)">
                  <p>{currentLesson.codePrompt}</p>
                  <p><strong>Checklist base:</strong> {currentLesson.codeChecklist.join(', ')}.</p>
                </Card>
                <Card title="Campo de código">
                  <textarea rows={10} className="code-area" value={currentProgress.codeText} onChange={(e) => saveCode(e.target.value)} placeholder="Cole aqui seu código, pseudocódigo ou estrutura da solução." />
                  <SimpleCodeEvaluation lesson={currentLesson} code={currentProgress.codeText || ''} />
                </Card>
              </>
            )}

            <Card title="Anotações desta aula">
              <textarea rows={4} value={state.notesByLesson[currentLesson.id] || ''} onChange={(e) => noteForLesson(currentLesson.id, e.target.value)} placeholder="Anote dúvidas, ideias, erros e observações pessoais." />
            </Card>

            <div className="lesson-next-box">
              <button className="primary-btn full-btn" disabled={!canFinishLesson} onClick={finishLesson}>Próxima aula</button>
              {!canFinishLesson && <p className="hint-text">Para avançar, acerte a resposta principal e todas as perguntas do quiz.</p>}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

function SimpleCodeEvaluation({ lesson, code }) {
  const normalized = normalize(code);
  const matches = lesson.codeChecklist.filter((item) => {
    const itemText = normalize(item);
    if (itemText.includes('if')) return normalized.includes('if');
    if (itemText.includes('função') || itemText.includes('function')) return normalized.includes('function') || normalized.includes('=>');
    if (itemText.includes('retornar')) return normalized.includes('return');
    if (itemText.includes('parâmetro')) return normalized.includes('(') && normalized.includes(')');
    if (itemText.includes('relacionamento')) return normalized.includes('relacion');
    if (itemText.includes('estado')) return normalized.includes('state') || normalized.includes('estado');
    if (itemText.includes('risco')) return normalized.includes('risco');
    return normalized.length >= 30;
  }).length;

  const ratio = lesson.codeChecklist.length ? Math.round((matches / lesson.codeChecklist.length) * 100) : 0;
  return (
    <div className="evaluation-box">
      <strong>Avaliação simples do código</strong>
      <p>Checklist atendido: {matches}/{lesson.codeChecklist.length} · {ratio}%</p>
      <p>{ratio >= 100 ? 'Boa base. Seu código atende ao mínimo esperado desta aula.' : 'Use o checklist acima para refinar a prática.'}</p>
    </div>
  );
}

function Card({ title, children, tone = 'default' }) {
  return (
    <article className={`card ${tone}`}>
      <h3>{title}</h3>
      <div className="card-body">{children}</div>
    </article>
  );
}

export default App;
