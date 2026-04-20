import React, { useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'devacademy_ads_state_v1';

const LEVELS = [
  {
    id: 1,
    name: 'Estagiário',
    focus: 'Base de lógica, programação, web, banco, análise, engenharia, UI/UX, infraestrutura e segurança.',
  },
  {
    id: 2,
    name: 'Júnior',
    focus: 'Organização de código, funções melhores, debug, modularização e autonomia inicial.',
  },
  {
    id: 3,
    name: 'Pleno',
    focus: 'Integração, manutenção, modelagem mais madura, testes e leitura de impacto.',
  },
  {
    id: 4,
    name: 'Sênior',
    focus: 'Arquitetura, prevenção de falha, desenho de sistema, qualidade e revisão técnica.',
  },
  {
    id: 5,
    name: 'Diretor / Visão executiva',
    focus: 'Produto, risco, custo, valor entregue, direção técnica e impacto organizacional.',
  },
];

const MATRIX_BLOCKS = [
  {
    title: '1. Lógica de programação e pensamento computacional',
    items: ['algoritmos', 'raciocínio lógico', 'variáveis', 'operadores', 'condições', 'repetição', 'funções', 'entrada e saída', 'decomposição de problema'],
    practical: 'Serve para parar de programar no chute, quebrar problemas em partes, entender fluxo e encontrar falhas com mais clareza.',
  },
  {
    title: '2. Linguagens de programação',
    items: ['JavaScript', 'Java', 'Python', 'C / C#', 'PHP', 'conceitos universais'],
    practical: 'Ensina sintaxe, estrutura, funções, orientação a objetos, tratamento de erro, reutilização e boas práticas.',
  },
  {
    title: '3. Desenvolvimento web',
    items: ['HTML', 'CSS', 'JavaScript', 'front-end', 'back-end', 'APIs', 'autenticação', 'integração com banco', 'cliente-servidor'],
    practical: 'Mostra que sistema não é só tela bonita: envolve fluxo, dados, regras e integração.',
  },
  {
    title: '4. Banco de dados',
    items: ['modelagem', 'entidades', 'relacionamentos', 'SQL', 'CRUD', 'joins', 'integridade', 'normalização', 'NoSQL básico'],
    practical: 'Mostra por que banco é central em sistemas reais: sem dado bem organizado, o sistema quebra ou perde confiança.',
  },
  {
    title: '5. Engenharia de software',
    items: ['requisitos', 'levantamento de necessidade', 'funcionais e não funcionais', 'arquitetura', 'UML', 'caso de uso', 'documentação', 'testes', 'versionamento', 'manutenção', 'qualidade', 'ciclo de vida'],
    practical: 'Faz a pessoa sair do nível de “fazedor de tela” e pensar em sistema como produto que precisa durar.',
  },
  {
    title: '6. Análise de sistemas',
    items: ['entender a dor real', 'mapear processo', 'descobrir necessidade do negócio', 'desenhar fluxo', 'transformar necessidade em sistema', 'validar solução'],
    practical: 'Ajuda a construir o sistema certo, e não apenas construir algo.',
  },
  {
    title: '7. Redes, sistemas operacionais e infraestrutura',
    items: ['onde o sistema roda', 'hardware e software', 'redes', 'protocolos', 'cliente-servidor', 'deploy', 'servidor', 'cloud básica', 'permissões', 'acesso'],
    practical: 'Ensina que um sistema não vive só no código. Ele depende de ambiente, conexão e configuração.',
  },
  {
    title: '8. Segurança da informação',
    items: ['autenticação', 'autorização', 'proteção de dados', 'vulnerabilidades', 'boas práticas', 'controle de acesso', 'risco de arquitetura ruim'],
    practical: 'Mostra como evitar exposição de dados, acessos indevidos e falhas que viram prejuízo.',
  },
];

const EXTRA_SUBJECTS = [
  'UX/UI',
  'estrutura de dados',
  'matemática aplicada',
  'estatística',
  'testes',
  'cloud',
  'mobile',
  'gestão de projetos',
  'ética',
  'comunicação',
  'metodologia científica',
  'inglês instrumental',
  'empreendedorismo',
];

const COURSE_PHASES = [
  { title: 'Início', items: ['lógica', 'algoritmo', 'programação inicial', 'base computacional'] },
  { title: 'Meio', items: ['POO', 'banco', 'web', 'engenharia', 'análise', 'redes'] },
  { title: 'Final', items: ['projeto completo', 'teste', 'segurança', 'integração', 'deploy', 'manutenção', 'projeto integrador', 'estágio/TCC quando houver'] },
];

const LESSONS = [
  {
    id: 'l1',
    order: 1,
    level: 1,
    block: 'Lógica',
    title: 'Algoritmo e pensamento passo a passo',
    objective: 'Entender o que é um algoritmo e como quebrar um problema em etapas claras.',
    explanation: [
      'Algoritmo é uma sequência organizada de passos para sair de um problema e chegar em uma solução. Ele aparece antes do código. Primeiro você pensa, depois implementa.',
      'Quando alguém tenta programar sem pensar o fluxo, normalmente escreve partes soltas, esquece casos importantes e cria erro sem perceber. O algoritmo reduz isso porque força você a ordenar a lógica.',
      'Pensamento computacional não é decorar linguagem. É treinar a mente para observar entrada, processamento, saída, exceção e repetição.',
    ],
    examples: [
      'Exemplo do dia a dia: fazer café. Entrada: água, pó e filtro. Processo: ferver, passar, servir. Saída: café pronto.',
      'Exemplo em sistema: login. Entrada: e-mail e senha. Processo: validar formato, buscar usuário, comparar senha, devolver acesso ou erro.',
    ],
    steps: [
      'Defina o problema com uma frase simples.',
      'Liste o que entra.',
      'Liste o que precisa acontecer no meio.',
      'Defina o resultado esperado.',
      'Pense no que pode dar errado.',
    ],
    exercise: 'Escreva em passos como funcionaria um sistema simples para registrar a entrada de um funcionário na empresa.',
    miniProject: 'Montar o algoritmo de um mini sistema de cadastro de clientes com nome, telefone e confirmação de salvamento.',
    openQuestion: 'Explique com suas palavras por que um algoritmo vem antes do código.',
    quiz: [
      { question: 'Algoritmo é:', options: ['apenas código', 'uma sequência lógica de passos', 'somente matemática'], answer: 1 },
      { question: 'Pensar em entrada e saída ajuda a:', options: ['decorar sintaxe', 'entender o fluxo do problema', 'deixar a tela mais bonita'], answer: 1 },
    ],
    professionalThinking: 'Um profissional mais maduro tenta reduzir ambiguidade antes de codar. Ele quer clareza de fluxo, casos de erro e objetivo de negócio.',
    review: [
      { question: 'Explique o que é algoritmo com suas palavras.', keywords: ['passos', 'sequência', 'problema', 'solução'] },
      { question: 'Como pensar em entrada, processamento e saída ajuda na prática?', keywords: ['fluxo', 'entender', 'organizar', 'erro'] },
    ],
    codePrompt: 'Escreva um pseudocódigo ou um JavaScript simples que descreva os passos de um cadastro de cliente.',
    codeChecklist: ['usar passos em ordem', 'mostrar entrada', 'mostrar saída'],
  },
  {
    id: 'l2',
    order: 2,
    level: 1,
    block: 'Lógica',
    title: 'Variáveis, tipos e operadores',
    objective: 'Aprender a guardar dados, comparar valores e fazer operações básicas com segurança.',
    explanation: [
      'Variável é um espaço com nome para guardar um valor. Em sistemas reais, isso representa coisas como nome do cliente, saldo, status do pedido ou data.',
      'Tipos importam porque o sistema precisa saber se está lidando com texto, número, verdadeiro/falso ou estrutura maior. Misturar isso sem cuidado causa bug.',
      'Operadores servem para somar, comparar, juntar ou validar valores. Eles parecem simples, mas influenciam decisões do sistema inteiro.',
    ],
    examples: [
      'nomeCliente = "Ana" representa texto.',
      'saldo = 1500 representa número.',
      'ativo = true representa condição lógica.',
    ],
    steps: [
      'Identifique quais informações seu problema precisa guardar.',
      'Escolha nomes claros.',
      'Pense no tipo certo para cada dado.',
      'Use operadores para validar e comparar com intenção.',
    ],
    exercise: 'Liste 8 variáveis que um sistema de loja precisaria ter e diga o tipo de cada uma.',
    miniProject: 'Desenhar a estrutura de dados de um carrinho de compras com quantidade, preço, total e status.',
    openQuestion: 'Por que escolher nomes claros e tipos corretos evita erro futuro?',
    quiz: [
      { question: 'Uma variável serve para:', options: ['decorar a tela', 'guardar informação', 'substituir o banco'], answer: 1 },
      { question: 'Misturar tipos sem cuidado pode:', options: ['melhorar performance automaticamente', 'causar comportamento inesperado', 'deixar o código mais profissional'], answer: 1 },
    ],
    professionalThinking: 'Quem pensa profissionalmente não cria variável genérica demais. Nome ruim dificulta leitura, manutenção e revisão.',
    review: [
      { question: 'O que é uma variável e para que serve?', keywords: ['guardar', 'valor', 'informação', 'nome'] },
      { question: 'Por que o tipo de dado importa?', keywords: ['erro', 'comparar', 'número', 'texto'] },
    ],
    codePrompt: 'Crie um exemplo em JavaScript com variáveis de um produto: nome, preço, estoque e ativo.',
    codeChecklist: ['declarar 4 variáveis', 'usar texto e número', 'mostrar comparação simples'],
  },
  {
    id: 'l3',
    order: 3,
    level: 1,
    block: 'Lógica',
    title: 'Condições, repetição e funções',
    objective: 'Entender como o sistema toma decisão, repete tarefas e organiza blocos reutilizáveis.',
    explanation: [
      'Condição é escolha. O sistema avalia uma regra e segue um caminho. Repetição é quando a mesma ação precisa acontecer várias vezes. Função é uma parte reutilizável com objetivo claro.',
      'Sem essas três bases, quase todo sistema vira repetição manual, código duplicado e lógica espalhada.',
      'A mente profissional tenta enxergar padrão: o que é decisão, o que é repetição, o que merece virar função.',
    ],
    examples: [
      'Se a senha estiver errada, negar acesso.',
      'Para cada produto do pedido, somar ao total.',
      'Função calcularDesconto(preco) reaproveita a mesma regra em vários pontos.',
    ],
    steps: [
      'Encontre regras de decisão.',
      'Encontre tarefas repetidas.',
      'Veja o que está sendo copiado muitas vezes.',
      'Transforme isso em função clara.',
    ],
    exercise: 'Explique como um sistema de estoque usaria condição, laço e função no mesmo fluxo.',
    miniProject: 'Montar o fluxo conceitual de um sistema que percorre produtos e marca os que estão abaixo do estoque mínimo.',
    openQuestion: 'Como saber que algo merece virar função?',
    quiz: [
      { question: 'If/else é usado para:', options: ['decisão', 'estilo visual', 'instalação PWA'], answer: 0 },
      { question: 'Laço serve para:', options: ['executar repetidamente', 'trocar banco por API', 'gerar ícone'], answer: 0 },
    ],
    professionalThinking: 'Profissional maduro reduz duplicação. Se a lógica aparece em vários pontos, ele centraliza antes que o sistema fique inconsistente.',
    review: [
      { question: 'Na prática, para que servem condições?', keywords: ['decisão', 'regra', 'caminho'] },
      { question: 'Quando faz sentido criar uma função?', keywords: ['reutilizar', 'organizar', 'repetição'] },
    ],
    codePrompt: 'Escreva uma função que receba um estoque atual e retorne se o produto está em nível crítico.',
    codeChecklist: ['usar function ou arrow', 'usar if', 'retornar resultado'],
  },
  {
    id: 'l4',
    order: 4,
    level: 1,
    block: 'Programação',
    title: 'JavaScript como linguagem principal e conceitos universais',
    objective: 'Entender JavaScript como linguagem-base do app e perceber o que vale para outras linguagens.',
    explanation: [
      'JavaScript foi escolhido porque permite estudar lógica, web e interação com facilidade. Mas o principal não é decorar JavaScript: é absorver conceitos que também aparecem em Java, Python, C# e outras linguagens.',
      'Conceitos universais incluem variável, condição, laço, função, estrutura de dados, modularização, entrada, saída, tratamento de erro e organização.',
      'Quando você entende conceito, trocar de linguagem fica muito mais fácil.',
    ],
    examples: [
      'Em JavaScript você usa function; em outras linguagens o formato muda, mas a ideia de encapsular regra permanece.',
      'Em todas as linguagens existe alguma forma de decisão, repetição e abstração.',
    ],
    steps: [
      'Aprenda a ideia antes da sintaxe.',
      'Compare o mesmo conceito em contextos diferentes.',
      'Pratique leitura de código, não só escrita.',
    ],
    exercise: 'Liste 5 conceitos que você acredita que existem em quase toda linguagem e explique por quê.',
    miniProject: 'Comparar em texto como seria uma função simples de saudação em JavaScript e em outra linguagem de sua escolha.',
    openQuestion: 'Por que aprender conceito antes da linguagem reduz dependência de tutorial?',
    quiz: [
      { question: 'O foco principal do estudo em linguagem deve ser:', options: ['apenas decorar comandos', 'entender conceitos e aplicação', 'mudar cor do editor'], answer: 1 },
      { question: 'Trocar de linguagem fica mais fácil quando você domina:', options: ['somente atalhos', 'conceitos universais', 'somente frameworks'], answer: 1 },
    ],
    professionalThinking: 'Quem pensa como profissional não fica preso a ferramenta. Ele entende a lógica da solução e escolhe tecnologia com base em contexto.',
    review: [
      { question: 'Por que JavaScript foi usado como base aqui?', keywords: ['web', 'lógica', 'facilidade', 'conceitos'] },
      { question: 'O que são conceitos universais?', keywords: ['linguagens', 'ideias', 'função', 'condição'] },
    ],
    codePrompt: 'Crie uma função em JavaScript que exiba uma mensagem de boas-vindas para um usuário.',
    codeChecklist: ['usar parâmetro', 'retornar ou mostrar mensagem', 'nome claro'],
  },
  {
    id: 'l5',
    order: 5,
    level: 1,
    block: 'Web',
    title: 'HTML, CSS e JavaScript no desenvolvimento web',
    objective: 'Compreender o papel de cada camada na construção de uma interface web.',
    explanation: [
      'HTML define estrutura. CSS define apresentação. JavaScript define comportamento. Em sistemas reais essas três partes trabalham juntas para formar a experiência do usuário.',
      'Quando a base é confusa, a interface pode até parecer funcional, mas fica difícil manter, ajustar, escalar ou corrigir.',
      'Desenvolvimento web profissional exige pensar em clareza visual, interação, dados, estados e responsividade.',
    ],
    examples: [
      'HTML cria formulário de login.',
      'CSS organiza campos, contraste e espaçamento.',
      'JavaScript valida dados, mostra erro e envia ação.',
    ],
    steps: [
      'Defina a estrutura da tela.',
      'Organize a leitura visual.',
      'Adicione comportamento com propósito.',
      'Teste em telas pequenas.',
    ],
    exercise: 'Explique o que acontece do ponto de vista do usuário ao preencher um formulário de cadastro.',
    miniProject: 'Planejar uma tela simples de cadastro com nome, e-mail, botão salvar e mensagem de retorno.',
    openQuestion: 'Por que interface boa não é só “tela bonita”?',
    quiz: [
      { question: 'HTML cuida de:', options: ['estrutura', 'consulta SQL', 'deploy'], answer: 0 },
      { question: 'JavaScript na interface ajuda a:', options: ['adicionar comportamento', 'criar hardware', 'mudar DNS'], answer: 0 },
    ],
    professionalThinking: 'Profissional maduro pensa em legibilidade, fluxo e manutenção da interface. Ele não usa efeito visual sem função.',
    review: [
      { question: 'Qual é o papel do HTML, CSS e JavaScript?', keywords: ['estrutura', 'visual', 'comportamento'] },
      { question: 'Por que a responsividade importa?', keywords: ['celular', 'tela pequena', 'uso real'] },
    ],
    codePrompt: 'Monte um exemplo simples de HTML + CSS + JavaScript para um botão que exibe “Cadastro salvo”.',
    codeChecklist: ['ter botão', 'ter texto ou mensagem', 'ter script simples'],
  },
  {
    id: 'l6',
    order: 6,
    level: 1,
    block: 'Banco de dados',
    title: 'Banco de dados, entidades, relacionamentos e CRUD',
    objective: 'Entender como a informação é organizada, relacionada e manipulada em sistemas reais.',
    explanation: [
      'Banco de dados guarda o que o sistema precisa lembrar. Cliente, pedido, produto, pagamento e histórico são exemplos clássicos.',
      'Entidades representam coisas do domínio. Relacionamentos mostram como essas coisas se conectam. CRUD representa criar, ler, atualizar e deletar.',
      'Se a modelagem nasce mal, o sistema até funciona no começo, mas gera duplicação, inconsistência e retrabalho.',
    ],
    examples: [
      'Entidade Cliente se relaciona com Pedido.',
      'CRUD de produtos: cadastrar, listar, editar e excluir.',
      'Um pedido pode ter vários itens.',
    ],
    steps: [
      'Identifique as coisas principais do negócio.',
      'Defina os dados que cada uma precisa.',
      'Mapeie como elas se relacionam.',
      'Pense nas operações básicas que o sistema vai executar.',
    ],
    exercise: 'Descreva as entidades e relacionamentos básicos de um sistema de oficina ou loja.',
    miniProject: 'Modelar em texto um sistema de pedidos com Cliente, Produto, Pedido e ItemPedido.',
    openQuestion: 'Por que modelagem ruim causa problema mesmo quando o sistema parece funcionar?',
    quiz: [
      { question: 'CRUD significa:', options: ['criar, ler, atualizar e deletar', 'copiar, revisar, unir e depurar', 'cache, rota, upload e deploy'], answer: 0 },
      { question: 'Entidade representa:', options: ['uma coisa importante do domínio', 'somente uma cor de tela', 'apenas um servidor'], answer: 0 },
    ],
    professionalThinking: 'Profissional mais maduro não pensa só na tela. Ele pensa em integridade, consistência e impacto da modelagem ao longo do tempo.',
    review: [
      { question: 'O que é CRUD e por que é importante?', keywords: ['criar', 'ler', 'atualizar', 'deletar'] },
      { question: 'O que é uma entidade em um sistema?', keywords: ['cliente', 'produto', 'domínio', 'dados'] },
    ],
    codePrompt: 'Escreva um objeto JavaScript representando um pedido com cliente, itens e total.',
    codeChecklist: ['ter cliente', 'ter itens', 'ter total'],
  },
  {
    id: 'l7',
    order: 7,
    level: 1,
    block: 'Engenharia de software',
    title: 'Requisitos, arquitetura e documentação',
    objective: 'Entender como transformar necessidade em definição clara antes de implementar.',
    explanation: [
      'Requisito é o que o sistema precisa fazer ou precisa garantir. Requisitos funcionais falam do comportamento. Não funcionais falam de desempenho, segurança, disponibilidade, clareza e outras qualidades.',
      'Arquitetura é a forma como as partes do sistema se organizam. Documentação é o registro que ajuda equipe, manutenção e evolução.',
      'Sem esses três pilares, o projeto cresce na improvisação e cada mudança custa mais.',
    ],
    examples: [
      'Requisito funcional: o usuário deve conseguir cadastrar cliente.',
      'Requisito não funcional: a tela precisa carregar rápido no celular.',
      'Arquitetura simples: front-end separado de serviço de dados.',
    ],
    steps: [
      'Entenda o problema.',
      'Escreva o que o sistema precisa fazer.',
      'Escreva restrições e qualidades esperadas.',
      'Defina como as partes se conversam.',
      'Registre decisões importantes.',
    ],
    exercise: 'Escreva 3 requisitos funcionais e 3 não funcionais para um app de estudo.',
    miniProject: 'Montar uma mini especificação textual de um sistema de chamados internos.',
    openQuestion: 'Por que documentar evita perda de clareza ao longo do projeto?',
    quiz: [
      { question: 'Requisito não funcional trata de:', options: ['qualidade e restrições', 'nome de variável', 'atalho do navegador'], answer: 0 },
      { question: 'Arquitetura ajuda a:', options: ['organizar o sistema', 'trocar a língua do teclado', 'instalar fonte'], answer: 0 },
    ],
    professionalThinking: 'Quem amadurece tecnicamente tenta decidir antes de improvisar. Ele documenta o suficiente para reduzir ruído e dependência de memória.',
    review: [
      { question: 'Qual a diferença entre requisito funcional e não funcional?', keywords: ['fazer', 'qualidade', 'restrição'] },
      { question: 'Por que arquitetura importa?', keywords: ['organizar', 'partes', 'manutenção'] },
    ],
    codePrompt: 'Descreva em comentários ou texto uma arquitetura simples para um app de cadastro com front-end e API.',
    codeChecklist: ['citar front-end', 'citar dados ou API', 'explicar papel das partes'],
  },
  {
    id: 'l8',
    order: 8,
    level: 1,
    block: 'Análise de sistemas',
    title: 'Entender dor real, fluxo e regra de negócio',
    objective: 'Treinar o olhar analítico para construir solução alinhada ao problema real.',
    explanation: [
      'Análise de sistemas começa antes da implementação. É o momento de entender a dor, observar processo atual, detectar gargalos e traduzir isso em regra de negócio.',
      'Muita solução ruim nasce quando a equipe implementa rápido demais sem descobrir a causa real do problema.',
      'O analista tenta separar sintoma de causa. Ele pergunta, observa e valida.',
    ],
    examples: [
      'Uma empresa diz que “quer um painel”. Talvez a dor real seja falta de acompanhamento de tarefas, não a ausência de dashboard em si.',
      'Um cadastro duplicado pode ser sintoma de fluxo ruim, não só de botão mal feito.',
    ],
    steps: [
      'Ouça a dor relatada.',
      'Mapeie o fluxo atual.',
      'Descubra regra de negócio.',
      'Valide com quem usa.',
      'Só depois pense na implementação.',
    ],
    exercise: 'Escolha um problema do dia a dia e descreva a diferença entre sintoma e causa.',
    miniProject: 'Desenhar o fluxo conceitual de atendimento de um pedido interno, do pedido até a conclusão.',
    openQuestion: 'Por que entender a dor real evita retrabalho?',
    quiz: [
      { question: 'Análise de sistemas deve acontecer:', options: ['antes e durante a implementação', 'só depois que tudo quebrou', 'somente na apresentação visual'], answer: 0 },
      { question: 'Regra de negócio é:', options: ['uma exigência do funcionamento do processo', 'um efeito visual', 'um ícone do app'], answer: 0 },
    ],
    professionalThinking: 'Profissional mais maduro valida suposições. Ele sabe que resolver o problema errado custa caro e gera descrença no sistema.',
    review: [
      { question: 'O que significa entender a dor real?', keywords: ['causa', 'problema', 'necessidade'] },
      { question: 'Por que mapear fluxo é útil?', keywords: ['processo', 'gargalo', 'passos'] },
    ],
    codePrompt: 'Escreva em comentários o fluxo de aprovação de uma solicitação interna.',
    codeChecklist: ['mostrar início', 'mostrar decisão', 'mostrar finalização'],
  },
  {
    id: 'l9',
    order: 9,
    level: 1,
    block: 'Infraestrutura',
    title: 'Cliente-servidor, deploy e ambiente',
    objective: 'Compreender onde o sistema roda, como ele é acessado e por que ambiente importa.',
    explanation: [
      'Aplicações reais precisam de ambiente. Cliente é a parte que o usuário usa. Servidor é a parte que processa ou disponibiliza serviço. Deploy é colocar o sistema em ambiente utilizável.',
      'Mesmo um projeto pequeno sofre quando ambiente está mal configurado. Erros podem acontecer por porta errada, permissão, versão incompatível, caminho incorreto ou rede instável.',
      'Entender infraestrutura básica ajuda a sair da visão limitada de “meu código rodou aqui, então está pronto”.',
    ],
    examples: [
      'App web no celular acessa um front-end e conversa com um serviço de dados.',
      'Deploy local, deploy em servidor e deploy em cloud mudam acesso, disponibilidade e manutenção.',
    ],
    steps: [
      'Descubra onde cada parte roda.',
      'Entenda como elas se comunicam.',
      'Verifique configuração e permissões.',
      'Teste em ambiente real.',
    ],
    exercise: 'Explique com suas palavras a diferença entre algo rodando localmente e algo já deployado.',
    miniProject: 'Planejar os ambientes de um sistema simples: desenvolvimento, teste e produção.',
    openQuestion: 'Por que “funciona na minha máquina” não é prova de que o sistema está pronto?',
    quiz: [
      { question: 'Deploy significa:', options: ['colocar o sistema em uso ou ambiente acessível', 'escrever variável', 'criar senha'], answer: 0 },
      { question: 'Cliente-servidor trata de:', options: ['como partes se comunicam', 'como trocar papel de parede', 'como criar ícone'], answer: 0 },
    ],
    professionalThinking: 'Maturidade técnica inclui pensar em ambiente, acesso, configuração e impacto operacional, não só em código.',
    review: [
      { question: 'O que é deploy?', keywords: ['ambiente', 'colocar', 'uso'] },
      { question: 'Por que ambiente importa?', keywords: ['configuração', 'rede', 'permissão'] },
    ],
    codePrompt: 'Escreva um pequeno resumo técnico descrevendo front-end, back-end e banco em um ambiente simples.',
    codeChecklist: ['citar 3 partes', 'explicar comunicação', 'mencionar ambiente'],
  },
  {
    id: 'l10',
    order: 10,
    level: 1,
    block: 'Segurança',
    title: 'Autenticação, autorização e proteção de dados',
    objective: 'Aprender a diferença entre entrar no sistema, ter permissão e proteger informação sensível.',
    explanation: [
      'Autenticação responde quem é a pessoa. Autorização responde o que ela pode fazer. Esses conceitos parecem parecidos, mas confundir os dois gera brecha grave.',
      'Proteção de dados exige cuidado com armazenamento, acesso e exposição. Não basta esconder na interface; a arquitetura também precisa respeitar regras.',
      'Boa prática de segurança começa em decisões simples: validar entrada, limitar acesso, evitar vazamento e pensar em risco.',
    ],
    examples: [
      'Usuário faz login com e-mail e senha: autenticação.',
      'Somente administrador pode excluir registro: autorização.',
      'Dados sensíveis não devem ficar expostos desnecessariamente no front-end.',
    ],
    steps: [
      'Defina quem acessa.',
      'Defina o que cada perfil pode fazer.',
      'Proteja dados sensíveis.',
      'Valide entrada e trate risco.',
    ],
    exercise: 'Explique um cenário em que autenticação existe, mas a autorização está mal feita.',
    miniProject: 'Desenhar os perfis e permissões de um pequeno sistema administrativo.',
    openQuestion: 'Por que esconder botão não é proteção suficiente?',
    quiz: [
      { question: 'Autenticação verifica:', options: ['quem é o usuário', 'a cor do layout', 'o ícone do PWA'], answer: 0 },
      { question: 'Autorização verifica:', options: ['o que o usuário pode fazer', 'se o HTML está bonito', 'qual fonte foi instalada'], answer: 0 },
    ],
    professionalThinking: 'Profissional maduro pensa em risco antes do incidente. Ele não confia só na aparência da interface para proteger ação crítica.',
    review: [
      { question: 'Qual a diferença entre autenticação e autorização?', keywords: ['quem', 'pode', 'acesso', 'permissão'] },
      { question: 'Por que proteger dados importa?', keywords: ['vazamento', 'risco', 'sensível'] },
    ],
    codePrompt: 'Crie um exemplo simples em JavaScript com uma verificação de perfil para liberar ou negar uma ação.',
    codeChecklist: ['ter perfil', 'usar condição', 'retornar permissão'],
  },
  {
    id: 'l11',
    order: 11,
    level: 2,
    block: 'Júnior',
    title: 'Organização de código, modularização e legibilidade',
    objective: 'Aprofundar a organização do código para sair da bagunça inicial e ganhar clareza.',
    explanation: [
      'Na fase júnior, não basta fazer funcionar. É preciso organizar. Modularizar é separar responsabilidades para facilitar leitura, manutenção e teste.',
      'Código legível ajuda tanto quem volta nele depois quanto quem recebe o projeto. Nome claro, função pequena e responsabilidade bem definida reduzem confusão.',
      'Quando tudo fica no mesmo lugar, qualquer mudança pequena pode quebrar o restante.',
    ],
    examples: [
      'Separar regras de cálculo em funções diferentes da interface.',
      'Criar arquivos ou blocos distintos para utilidades, validações e componentes.',
    ],
    steps: [
      'Identifique responsabilidades misturadas.',
      'Separe por função ou módulo.',
      'Renomeie com clareza.',
      'Revise leitura e repetição.',
    ],
    exercise: 'Explique como você organizaria um sistema pequeno que hoje está todo em um único arquivo.',
    miniProject: 'Desenhar os módulos de um mini sistema de cadastro: tela, validação, regra de negócio e persistência.',
    openQuestion: 'Como modularização ajuda manutenção futura?',
    quiz: [
      { question: 'Modularizar ajuda a:', options: ['organizar responsabilidades', 'deixar o app mais pesado por padrão', 'eliminar toda necessidade de teste'], answer: 0 },
      { question: 'Código legível favorece:', options: ['manutenção e revisão', 'apenas efeito visual', 'somente execução offline'], answer: 0 },
    ],
    professionalThinking: 'Profissional mais maduro otimiza clareza antes de sofisticar. Código claro tem valor operacional.',
    review: [
      { question: 'Por que modularização é importante?', keywords: ['organizar', 'responsabilidade', 'manutenção'] },
      { question: 'O que torna um código legível?', keywords: ['nome', 'clareza', 'função'] },
    ],
    codePrompt: 'Mostre como você dividiria uma lógica de cadastro em funções menores.',
    codeChecklist: ['mais de uma função', 'nomes claros', 'separação de responsabilidade'],
  },
  {
    id: 'l12',
    order: 12,
    level: 2,
    block: 'Júnior',
    title: 'Debug, investigação de bug e tratamento de erro',
    objective: 'Aprender a investigar erro com método, sem chute e sem desespero.',
    explanation: [
      'Bug não se resolve só tentando coisas aleatórias. É preciso observar sintoma, reproduzir, isolar causa e validar correção.',
      'Tratamento de erro não é esconder problema. É capturar, informar e evitar que o sistema quebre de forma silenciosa ou confusa.',
      'A maturidade cresce quando você troca reação impulsiva por investigação metódica.',
    ],
    examples: [
      'Erro ao salvar pode vir da validação, da montagem do objeto ou do armazenamento.',
      'Mensagem clara ajuda o usuário e ajuda quem está depurando.',
    ],
    steps: [
      'Reproduza o erro.',
      'Observe onde ele acontece.',
      'Teste hipóteses pequenas.',
      'Confirme a causa real.',
      'Corrija e valide sem quebrar o resto.',
    ],
    exercise: 'Descreva um método de 5 passos para investigar um bug em um formulário.',
    miniProject: 'Criar um fluxo de investigação para um erro em login ou cadastro.',
    openQuestion: 'Por que corrigir sem entender a causa pode gerar regressão?',
    quiz: [
      { question: 'Debug bom depende de:', options: ['método e observação', 'sorte', 'somente velocidade'], answer: 0 },
      { question: 'Tratamento de erro deve:', options: ['ajudar o sistema a falhar melhor', 'esconder tudo sempre', 'substituir teste'], answer: 0 },
    ],
    professionalThinking: 'Profissional maduro cria evidência antes de concluir. Ele procura causa, não só sintoma.',
    review: [
      { question: 'O que é investigar bug com método?', keywords: ['reproduzir', 'causa', 'validar'] },
      { question: 'Por que tratamento de erro importa?', keywords: ['mensagem', 'controle', 'quebra'] },
    ],
    codePrompt: 'Escreva um exemplo usando try/catch ou verificações simples para tratar um erro de entrada.',
    codeChecklist: ['ter validação ou try/catch', 'mostrar mensagem', 'evitar falha silenciosa'],
  },
  {
    id: 'l13',
    order: 13,
    level: 3,
    block: 'Pleno',
    title: 'Integração, testes e leitura de impacto',
    objective: 'Conectar partes do sistema com mais consciência de risco e qualidade.',
    explanation: [
      'No nível pleno, o foco cresce: mudanças impactam várias partes. Integração exige olhar para contrato entre módulos, consistência e fluxo completo.',
      'Teste não é só obrigação. É ferramenta para reduzir medo de mudar. Leitura de impacto é pensar o que uma alteração mexe antes de aplicar.',
      'Quem aprende isso deixa de atuar de forma isolada e passa a perceber o sistema como conjunto.',
    ],
    examples: [
      'Alterar estrutura de dados pode impactar formulário, listagem, relatório e validação.',
      'Teste pode confirmar se regra central continua funcionando após mudança.',
    ],
    steps: [
      'Mapeie o que depende do ponto alterado.',
      'Defina o comportamento esperado.',
      'Teste fluxo crítico.',
      'Valide integração ponta a ponta.',
    ],
    exercise: 'Explique como você avaliaria o impacto de mudar a estrutura de um cadastro.',
    miniProject: 'Planejar cenários de teste para um mini fluxo de compra ou cadastro.',
    openQuestion: 'Por que leitura de impacto evita quebra em cadeia?',
    quiz: [
      { question: 'Teste serve para:', options: ['reduzir risco de mudança', 'somente deixar o projeto bonito', 'trocar linguagem'], answer: 0 },
      { question: 'Integração exige:', options: ['olhar o conjunto', 'ignorar dependências', 'trabalhar sem validar'], answer: 0 },
    ],
    professionalThinking: 'Profissional pleno olha dependências. Ele sabe que mudar um ponto pode afetar vários fluxos.',
    review: [
      { question: 'O que é leitura de impacto?', keywords: ['mudança', 'dependência', 'efeito'] },
      { question: 'Por que testes ajudam integração?', keywords: ['validar', 'risco', 'fluxo'] },
    ],
    codePrompt: 'Descreva em comentários quais testes você faria após alterar uma função de cálculo usada em várias telas.',
    codeChecklist: ['citar impacto', 'citar testes', 'citar fluxos dependentes'],
  },
  {
    id: 'l14',
    order: 14,
    level: 4,
    block: 'Sênior',
    title: 'Arquitetura, escalabilidade e prevenção de falha',
    objective: 'Pensar em estrutura de sistema com foco em crescimento, confiabilidade e qualidade.',
    explanation: [
      'No nível sênior, a discussão sobe. Não basta resolver o presente; é preciso evitar problemas futuros, suportar crescimento e reduzir pontos frágeis.',
      'Arquitetura boa distribui responsabilidades, permite evolução e reduz acoplamento excessivo. Escalabilidade não é só volume grande; é também capacidade de crescer sem virar caos.',
      'Prevenção de falha envolve decisões técnicas, observabilidade, validação e desenho cuidadoso.',
    ],
    examples: [
      'Separar serviços por responsabilidade evita que um problema derrube todo o sistema.',
      'Registrar eventos e estados ajuda a investigar falha sem depender da memória das pessoas.',
    ],
    steps: [
      'Mapeie responsabilidades críticas.',
      'Reduza acoplamento desnecessário.',
      'Pense em observabilidade e monitoramento.',
      'Antecipe gargalos e riscos.',
    ],
    exercise: 'Explique como uma arquitetura ruim pode aumentar risco operacional.',
    miniProject: 'Descrever a arquitetura de um sistema interno com foco em confiabilidade.',
    openQuestion: 'Como prevenção de falha é diferente de corrigir bug depois?',
    quiz: [
      { question: 'Escalabilidade envolve:', options: ['crescer sem perder controle', 'apenas aumentar animação', 'somente trocar banco'], answer: 0 },
      { question: 'Arquitetura boa tende a:', options: ['reduzir acoplamento excessivo', 'misturar tudo', 'eliminar toda documentação'], answer: 0 },
    ],
    professionalThinking: 'Maturidade sênior inclui pensar em impacto operacional, continuidade e qualidade do sistema como um todo.',
    review: [
      { question: 'Por que arquitetura influencia prevenção de falha?', keywords: ['estrutura', 'risco', 'responsabilidade'] },
      { question: 'O que significa escalabilidade de forma prática?', keywords: ['crescer', 'suportar', 'controle'] },
    ],
    codePrompt: 'Escreva um resumo técnico de como você separaria responsabilidades em um sistema maior.',
    codeChecklist: ['citar módulos ou serviços', 'citar risco', 'citar manutenção'],
  },
  {
    id: 'l15',
    order: 15,
    level: 5,
    block: 'Direção',
    title: 'Produto, prioridade, risco, custo e valor entregue',
    objective: 'Conectar visão técnica com visão de negócio e decisão estratégica.',
    explanation: [
      'No topo da trilha, o objetivo é entender que tecnologia serve ao negócio. Nem toda melhoria técnica é prioridade agora. Nem toda urgência aparente gera valor real.',
      'Produto envolve prioridade, custo, prazo, risco, retorno e clareza de objetivo. Direção técnica madura escolhe o que fazer e o que ainda não fazer.',
      'Essa visão executiva não abandona a técnica; ela coloca a técnica a serviço de impacto real.',
    ],
    examples: [
      'Corrigir um risco grave de segurança pode ter prioridade maior do que lançar uma função visual nova.',
      'Uma melhoria pequena no fluxo pode entregar mais valor do que uma refatoração gigante no momento errado.',
    ],
    steps: [
      'Entenda objetivo de negócio.',
      'Liste riscos e custos.',
      'Compare esforço e valor.',
      'Defina prioridade com contexto.',
    ],
    exercise: 'Explique um caso em que fazer menos agora pode ser melhor para o produto.',
    miniProject: 'Priorizar um backlog simples com base em risco, valor e custo.',
    openQuestion: 'Por que direção técnica não deve olhar só para código?',
    quiz: [
      { question: 'Prioridade saudável considera:', options: ['valor, risco e custo', 'somente gosto pessoal', 'somente complexidade visual'], answer: 0 },
      { question: 'Visão executiva busca:', options: ['impacto organizacional e direção', 'apenas mais telas', 'menos clareza'], answer: 0 },
    ],
    professionalThinking: 'Liderança técnica madura equilibra qualidade, prazo, valor entregue e risco organizacional.',
    review: [
      { question: 'O que deve influenciar prioridade em produto?', keywords: ['valor', 'risco', 'custo'] },
      { question: 'Por que visão técnica precisa conversar com negócio?', keywords: ['impacto', 'objetivo', 'produto'] },
    ],
    codePrompt: 'Descreva em texto como você priorizaria melhorias em um sistema com pouco tempo e muitos pedidos.',
    codeChecklist: ['citar risco', 'citar valor', 'citar prioridade'],
  },
];


const DEFAULT_STATE = {
  flowStep: 'intro',
  mode: null,
  currentLessonId: LESSONS[0].id,
  lastVisitedLessonId: null,
  lessonSearch: '',
  notes: '',
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

function evaluateKeywords(text, keywords = []) {
  const normalized = String(text || '').toLowerCase();
  const hits = keywords.filter((keyword) => normalized.includes(keyword.toLowerCase())).length;
  return {
    passed: hits >= Math.max(1, Math.ceil(keywords.length / 2)),
    hits,
    normalized,
  };
}

function getLessonProgress(state, lessonId) {
  return state.lessonProgress[lessonId] || {
    status: 'not-started',
    answerText: '',
    answerLocked: false,
    answerFeedback: '',
    answerPassed: false,
    quiz: {},
    codeText: '',
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

function buildAnswerKeywords(lesson) {
  const reviewKeywords = lesson.review.flatMap((item) => item.keywords);
  const titleKeywords = lesson.title.toLowerCase().split(/[ ,/]+/).filter((item) => item.length > 4);
  return [...new Set([...reviewKeywords, ...titleKeywords])];
}

function analyzeAnswer(lesson, answer) {
  const keywords = buildAnswerKeywords(lesson);
  const result = evaluateKeywords(answer, keywords);
  const missing = keywords.filter((keyword) => !result.normalized.includes(keyword.toLowerCase())).slice(0, 4);

  if (result.passed) {
    return {
      passed: true,
      message: missing.length
        ? `Boa resposta. Você mostrou entendimento suficiente desta aula. Para deixar sua visão ainda mais forte, também vale reforçar: ${missing.join(', ')}.`
        : 'Boa resposta. Você demonstrou entendimento claro dos pontos centrais desta aula.',
    };
  }

  return {
    passed: false,
    message: `Sua resposta ainda não mostrou com clareza os pontos principais. Releia a aula, pesquise se for necessário e volte para responder melhor. Foque em: ${missing.join(', ') || 'fluxo, objetivo e aplicação prática'}.`,
  };
}

function App() {
  const [state, setState] = useState(loadState);
  const [installPrompt, setInstallPrompt] = useState(null);
  const [celebration, setCelebration] = useState(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    const onBeforeInstallPrompt = (event) => {
      event.preventDefault();
      setInstallPrompt(event);
    };
    window.addEventListener('beforeinstallprompt', onBeforeInstallPrompt);
    return () => window.removeEventListener('beforeinstallprompt', onBeforeInstallPrompt);
  }, []);

  const unlockedOrder = useMemo(() => getUnlockedOrder(state), [state]);
  const unlockedLevel = useMemo(() => getUnlockedLevel(state), [state]);
  const currentLesson = LESSONS.find((lesson) => lesson.id === state.currentLessonId) || LESSONS[0];
  const currentLessonProgress = getLessonProgress(state, currentLesson.id);

  const filteredLessons = useMemo(() => {
    const search = state.lessonSearch.trim().toLowerCase();
    const list = search
      ? LESSONS.filter((lesson) => [lesson.title, lesson.block, LEVELS.find((l) => l.id === lesson.level)?.name || '']
          .join(' ')
          .toLowerCase()
          .includes(search))
      : LESSONS;
    return list;
  }, [state.lessonSearch]);

  const levelProgress = useMemo(() => {
    return LEVELS.map((level) => {
      const lessons = LESSONS.filter((lesson) => lesson.level === level.id);
      const done = lessons.filter((lesson) => state.completedLessons[lesson.id]).length;
      return {
        ...level,
        done,
        total: lessons.length,
        percent: lessons.length ? Math.round((done / lessons.length) * 100) : 0,
      };
    });
  }, [state.completedLessons]);

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

  function verifyOpenAnswer() {
    const progress = getLessonProgress(state, currentLesson.id);
    const analysis = analyzeAnswer(currentLesson, progress.answerText);
    patchLessonProgress(currentLesson.id, {
      answerFeedback: analysis.message,
      answerLocked: analysis.passed,
      answerPassed: analysis.passed,
      status: analysis.passed ? progress.status : 'in-progress',
    });
  }

  function answerQuiz(questionIndex, optionIndex) {
    const progress = getLessonProgress(state, currentLesson.id);
    const question = currentLesson.quiz[questionIndex];
    const isCorrect = question.answer === optionIndex;

    patchLessonProgress(currentLesson.id, {
      quiz: {
        ...progress.quiz,
        [questionIndex]: {
          selected: optionIndex,
          locked: isCorrect,
          correct: isCorrect,
          message: isCorrect
            ? 'Resposta correta. Esta pergunta foi concluída.'
            : 'Resposta incorreta. Releia a aula, pesquise se for necessário e tente novamente.',
        },
      },
      status: 'in-progress',
    });
  }

  function saveCode(value) {
    patchLessonProgress(currentLesson.id, { codeText: value, status: 'in-progress' });
  }

  function allQuizCorrect(lessonId) {
    const progress = getLessonProgress(state, lessonId);
    return currentLesson.id === lessonId
      ? currentLesson.quiz.every((_, index) => progress.quiz[index]?.locked)
      : (LESSONS.find((lesson) => lesson.id === lessonId)?.quiz || []).every((_, index) => progress.quiz[index]?.locked);
  }

  function finishLesson() {
    const lesson = currentLesson;
    const nextLesson = LESSONS.find((item) => item.order === lesson.order + 1);
    const justFinishedLevel = LEVELS.find((level) => level.id === lesson.level);
    const levelLessons = LESSONS.filter((item) => item.level === lesson.level);
    const willCompleteLevel = levelLessons.every((item) => item.id === lesson.id || state.completedLessons[item.id]);
    const willFinishAll = LESSONS.every((item) => item.id === lesson.id || state.completedLessons[item.id]);

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
      setCelebration({
        title: 'PARABÉNS! VOCÊ FINALIZOU TODAS AS AULAS',
        text: 'Você concluiu toda a trilha da DevAcademy ADS. Agora sua base está muito mais madura e organizada.',
      });
      return;
    }

    if (willCompleteLevel) {
      const nextLevel = LEVELS.find((level) => level.id === justFinishedLevel.id + 1);
      setCelebration({
        title: 'PARABÉNS, VOCÊ AVANÇOU PARA UM NOVO NÍVEL',
        text: nextLevel
          ? `Você finalizou o nível ${justFinishedLevel.name} e desbloqueou o nível ${nextLevel.name}.`
          : `Você finalizou o nível ${justFinishedLevel.name}.`,
      });
    }
  }

  async function installApp() {
    if (!installPrompt) return;
    await installPrompt.prompt();
    await installPrompt.userChoice;
    setInstallPrompt(null);
  }

  const canFinishLesson = currentLessonProgress.answerLocked && allQuizCorrect(currentLesson.id);

  return (
    <div className="app-shell minimal-shell">
      <header className="topbar compact-topbar">
        <div>
          <p className="eyebrow">DevAcademy ADS</p>
          <h1>Ferramenta real de estudo em ADS</h1>
          <p className="subtitle">Fluxo simples, progresso salvo e foco em estudo sério no celular e no PC.</p>
        </div>
        <div className="topbar-actions">
          {state.mode && <span className="pill-label">Modo atual: {state.mode === 'sem-codar' ? 'Estudar sem codar' : 'Estudar e codar'}</span>}
          {installPrompt && (
            <button className="secondary-btn" onClick={installApp}>Instalar app</button>
          )}
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
              <p>O DevAcademy ADS foi feito para estudo sério de ADS, principalmente no celular, com foco em entendimento real, evolução por níveis e continuidade de progresso.</p>
              <p>Você começa entendendo a base, escolhe o modo de estudo e avança aula por aula sem poluição visual.</p>
              <div className="intro-points">
                <div><strong>Estudar sem codar</strong><span>Para celular, revisão, leitura, raciocínio e resposta escrita.</span></div>
                <div><strong>Estudar e codar</strong><span>Para PC ou prática, com espaço para código e treino mais aplicado.</span></div>
                <div><strong>Progressão clara</strong><span>Aulas concluídas recebem ✅, aula em andamento mostra Continue e as próximas ficam bloqueadas com 🔒.</span></div>
              </div>
              <div className="inline-actions">
                <button className="primary-btn" onClick={() => patchState({ flowStep: 'mode' })}>Próximo</button>
              </div>
            </Card>
          </section>
        )}

        {state.flowStep === 'mode' && (
          <section className="page-section narrow-section">
            <Card title="Escolha como deseja estudar">
              <div className="mode-choice-grid">
                <button className="mode-choice" onClick={() => patchState({ mode: 'sem-codar', flowStep: 'lessons' })}>
                  <strong>Estudar sem codar</strong>
                  <span>Ideal para celular, fim de semana e momentos sem PC.</span>
                </button>
                <button className="mode-choice" onClick={() => patchState({ mode: 'com-codar', flowStep: 'lessons' })}>
                  <strong>Estudar e codar</strong>
                  <span>Ideal para prática no PC, com espaço para código e exercício aplicado.</span>
                </button>
              </div>
              <div className="inline-actions">
                <button className="secondary-btn" onClick={() => patchState({ flowStep: 'intro' })}>Voltar</button>
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
                <p>Conclua em ordem. A próxima aula só libera após a anterior ser concluída.</p>
              </div>
              <div className="toolbar-actions">
                <button className="secondary-btn" onClick={() => patchState({ flowStep: 'mode' })}>Trocar modo</button>
              </div>
            </div>

            <div className="search-box compact-search">
              <label htmlFor="lesson-search">Buscar aula</label>
              <input
                id="lesson-search"
                value={state.lessonSearch}
                onChange={(e) => patchState({ lessonSearch: e.target.value })}
                placeholder="Ex.: banco, lógica, segurança"
              />
            </div>

            <div className="progress-summary-card">
              <div>
                <strong>Progresso geral</strong>
                <p>{Object.keys(state.completedLessons).length} / {LESSONS.length} aulas concluídas</p>
              </div>
              <div className="progress-bar"><span style={{ width: `${Math.round((Object.keys(state.completedLessons).length / LESSONS.length) * 100)}%` }} /></div>
            </div>

            <div className="level-chip-row">
              {levelProgress.map((level) => (
                <span key={level.id} className={level.id <= unlockedLevel ? 'level-chip active' : 'level-chip'}>
                  {level.name} · {level.done}/{level.total}
                </span>
              ))}
            </div>

            <div className="lesson-list clean-lesson-list">
              {filteredLessons.map((lesson) => {
                const progress = getLessonProgress(state, lesson.id);
                const done = !!state.completedLessons[lesson.id];
                const inProgress = !done && state.lastVisitedLessonId === lesson.id;
                const locked = lesson.order > unlockedOrder || lesson.level > unlockedLevel;

                return (
                  <button
                    key={lesson.id}
                    className={`lesson-row ${done ? 'done' : ''} ${locked ? 'locked' : ''} ${inProgress ? 'in-progress' : ''}`}
                    onClick={() => openLesson(lesson)}
                    disabled={locked}
                  >
                    <div className="lesson-row-main">
                      <span className="lesson-row-title">{lesson.order}. {lesson.title}</span>
                      <span className="lesson-row-meta">Nível {lesson.level} · {LEVELS.find((item) => item.id === lesson.level)?.name}</span>
                    </div>
                    <div className="lesson-row-status">
                      {done && <span className="status-badge success">✅ Concluída</span>}
                      {inProgress && <span className="status-badge continue">Continue</span>}
                      {locked && <span className="status-badge locked">🔒 Bloqueada</span>}
                      {!done && !inProgress && !locked && <span className="status-badge available">Disponível</span>}
                    </div>
                  </button>
                );
              })}
            </div>
          </section>
        )}

        {state.flowStep === 'lesson' && (
          <section className="page-section lesson-page">
            <div className="lesson-header-card">
              <button className="back-link" onClick={() => patchState({ flowStep: 'lessons', lastVisitedLessonId: currentLesson.id })}>← Voltar para aulas</button>
              <div className="lesson-header-row">
                <div>
                  <p className="eyebrow">Nível {currentLesson.level} · {currentLesson.block}</p>
                  <h2>{currentLesson.order}. {currentLesson.title}</h2>
                  <p>{currentLesson.objective}</p>
                </div>
                <span className="status-badge continue">{state.mode === 'sem-codar' ? 'Sem codar' : 'Estudar e codar'}</span>
              </div>
            </div>

            <Card title="Explicação da aula">
              {currentLesson.explanation.map((item) => <p key={item}>{item}</p>)}
            </Card>

            <div className="two-col-blocks responsive-two-col">
              <Card title="Exemplos práticos">
                <ul className="clean-list">{currentLesson.examples.map((item) => <li key={item}>{item}</li>)}</ul>
              </Card>
              <Card title="Como pensar nisso">
                <ol className="number-list">{currentLesson.steps.map((item) => <li key={item}>{item}</li>)}</ol>
              </Card>
            </div>

            <div className="two-col-blocks responsive-two-col">
              <Card title="Exercício">
                <p>{currentLesson.exercise}</p>
              </Card>
              <Card title="Mini projeto">
                <p>{currentLesson.miniProject}</p>
              </Card>
            </div>

            <Card title="Pergunta principal da aula">
              <p>{currentLesson.openQuestion}</p>
              <textarea
                rows={6}
                value={currentLessonProgress.answerText}
                disabled={currentLessonProgress.answerLocked}
                onChange={(e) => patchLessonProgress(currentLesson.id, { answerText: e.target.value, status: 'in-progress' })}
                placeholder="Responda com suas palavras. Se for necessário, pesquise sobre o tema e volte aqui para responder."
              />
              <div className="inline-actions wrap-actions">
                <button className="primary-btn" onClick={verifyOpenAnswer} disabled={currentLessonProgress.answerLocked || !currentLessonProgress.answerText.trim()}>
                  Verificar resposta
                </button>
                {currentLessonProgress.answerLocked && <span className="status-badge success">Resposta certa</span>}
              </div>
              {currentLessonProgress.answerFeedback && (
                <p className={`feedback ${currentLessonProgress.answerPassed ? 'success-text' : 'warning-text'}`}>
                  {currentLessonProgress.answerFeedback}
                </p>
              )}
            </Card>

            <Card title="Quiz rápido">
              <div className="quiz-stack">
                {currentLesson.quiz.map((question, questionIndex) => {
                  const quizState = currentLessonProgress.quiz[questionIndex] || {};
                  return (
                    <div key={question.question} className="quiz-item">
                      <strong>{question.question}</strong>
                      <div className="option-stack">
                        {question.options.map((option, optionIndex) => {
                          const isSelected = quizState.selected === optionIndex;
                          const isLocked = quizState.locked;
                          const isCorrectOption = question.answer === optionIndex;
                          const classNames = [
                            'option-btn',
                            isSelected ? 'selected' : '',
                            isLocked && isCorrectOption ? 'correct' : '',
                          ].join(' ').trim();

                          return (
                            <button
                              key={option}
                              className={classNames}
                              onClick={() => answerQuiz(questionIndex, optionIndex)}
                              disabled={isLocked}
                            >
                              {option}
                            </button>
                          );
                        })}
                      </div>
                      {quizState.message && (
                        <p className={`feedback ${quizState.correct ? 'success-text' : 'warning-text'}`}>{quizState.message}</p>
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
                  <textarea
                    className="code-area"
                    rows={10}
                    value={currentLessonProgress.codeText}
                    onChange={(e) => saveCode(e.target.value)}
                    placeholder="Cole aqui seu código, pseudocódigo ou estrutura da solução."
                  />
                  <SimpleCodeEvaluation lesson={currentLesson} code={currentLessonProgress.codeText || ''} />
                </Card>
              </>
            )}

            <Card title="Anotações rápidas desta aula">
              <textarea
                rows={4}
                value={state.notes}
                onChange={(e) => patchState({ notes: e.target.value })}
                placeholder="Anote dúvidas, ideias, erros e observações pessoais."
              />
            </Card>

            <div className="lesson-next-box">
              <button className="primary-btn full-btn" disabled={!canFinishLesson} onClick={finishLesson}>
                Próxima aula
              </button>
              {!canFinishLesson && (
                <p className="hint-text">Para avançar, acerte a resposta principal e todas as perguntas do quiz.</p>
              )}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

function SimpleCodeEvaluation({ lesson, code }) {
  const normalized = code.toLowerCase();
  const matches = lesson.codeChecklist.filter((item) => {
    const itemText = item.toLowerCase();
    if (itemText.includes('if')) return normalized.includes('if');
    if (itemText.includes('função') || itemText.includes('function')) return normalized.includes('function') || normalized.includes('=>');
    if (itemText.includes('retornar')) return normalized.includes('return');
    if (itemText.includes('parâmetro')) return normalized.includes('(') && normalized.includes(')');
    if (itemText.includes('cliente')) return normalized.includes('cliente');
    if (itemText.includes('total')) return normalized.includes('total');
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
