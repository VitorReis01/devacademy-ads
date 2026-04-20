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
  mode: 'sem-codar',
  completedLessons: {},
  lessonResponses: {},
  codeResponses: {},
  openResponses: {},
  quizResponses: {},
  reviewStatus: {},
  reviewAnswers: {},
  notes: '',
  search: '',
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
  return hits >= Math.max(1, Math.ceil(keywords.length / 2));
}

function App() {
  const [state, setState] = useState(loadState);
  const [activeTab, setActiveTab] = useState('apresentacao');
  const [selectedLessonId, setSelectedLessonId] = useState(LESSONS[0].id);
  const [reviewDraft, setReviewDraft] = useState({});
  const [installPrompt, setInstallPrompt] = useState(null);

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

  const selectedLesson = LESSONS.find((lesson) => lesson.id === selectedLessonId) || LESSONS[0];

  const levelCompletion = useMemo(() => {
    return LEVELS.map((level) => {
      const lessons = LESSONS.filter((lesson) => lesson.level === level.id);
      const done = lessons.filter((lesson) => state.completedLessons[lesson.id]).length;
      return {
        ...level,
        total: lessons.length,
        done,
        percent: lessons.length ? Math.round((done / lessons.length) * 100) : 0,
      };
    });
  }, [state.completedLessons]);

  const unlockedLevel = useMemo(() => {
    let current = 1;
    for (const level of levelCompletion) {
      if (level.id === current && level.percent === 100) current += 1;
      else break;
    }
    return Math.min(current, 5);
  }, [levelCompletion]);

  const filteredLessons = useMemo(() => {
    const search = state.search.trim().toLowerCase();
    if (!search) return LESSONS;
    return LESSONS.filter((lesson) => {
      return [lesson.title, lesson.block, lesson.objective, lesson.level]
        .join(' ')
        .toLowerCase()
        .includes(search);
    });
  }, [state.search]);

  const pendingReview = getPendingReview(selectedLesson, state);

  function updateState(partial) {
    setState((current) => ({ ...current, ...partial }));
  }

  function saveTextResponse(type, lessonId, value) {
    const key = type === 'code' ? 'codeResponses' : type === 'open' ? 'openResponses' : 'lessonResponses';
    updateState({
      [key]: {
        ...state[key],
        [lessonId]: value,
      },
    });
  }

  function saveQuizAnswer(lessonId, questionIndex, optionIndex) {
    updateState({
      quizResponses: {
        ...state.quizResponses,
        [lessonId]: {
          ...(state.quizResponses[lessonId] || {}),
          [questionIndex]: optionIndex,
        },
      },
    });
  }

  function completeLesson(lesson) {
    updateState({
      completedLessons: {
        ...state.completedLessons,
        [lesson.id]: true,
      },
    });
  }

  function submitReview() {
    if (!pendingReview) return;
    const lesson = LESSONS.find((item) => item.id === pendingReview.id);
    let correct = 0;
    lesson.review.forEach((question, index) => {
      const answer = reviewDraft[index] || '';
      if (evaluateKeywords(answer, question.keywords)) correct += 1;
    });
    const passed = correct >= Math.ceil(lesson.review.length / 2);
    updateState({
      reviewStatus: {
        ...state.reviewStatus,
        [lesson.id]: passed ? 'passed' : 'retry',
      },
      reviewAnswers: {
        ...state.reviewAnswers,
        [lesson.id]: reviewDraft,
      },
    });
    if (passed) setReviewDraft({});
  }

  async function installApp() {
    if (!installPrompt) return;
    await installPrompt.prompt();
    await installPrompt.userChoice;
    setInstallPrompt(null);
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">DevAcademy ADS</p>
          <h1>Ferramenta real de estudo em ADS</h1>
          <p className="subtitle">Leve, instalável, com progresso salvo e foco em estudo sério no celular e no PC.</p>
        </div>
        <div className="topbar-actions">
          <button className="secondary-btn" onClick={() => updateState({ mode: state.mode === 'sem-codar' ? 'com-codar' : 'sem-codar' })}>
            Modo atual: {state.mode === 'sem-codar' ? 'Estudar sem codar' : 'Estudar e codar'}
          </button>
          {installPrompt && (
            <button className="primary-btn" onClick={installApp}>
              Instalar app
            </button>
          )}
        </div>
      </header>

      <nav className="main-tabs">
        {[
          ['apresentacao', 'Apresentação'],
          ['matriz', 'Matriz ADS'],
          ['sem-codar', 'Estudar sem codar'],
          ['com-codar', 'Estudar e codar'],
          ['niveis', 'Níveis'],
          ['anotacoes', 'Anotações'],
        ].map(([id, label]) => (
          <button key={id} className={activeTab === id ? 'tab-btn active' : 'tab-btn'} onClick={() => setActiveTab(id)}>
            {label}
          </button>
        ))}
      </nav>

      <main className="content-grid">
        {activeTab === 'apresentacao' && (
          <section className="page-section">
            <div className="hero-grid">
              <Card title="O que é este app">
                <p>O DevAcademy ADS foi pensado para estudo real de Análise e Desenvolvimento de Sistemas, com uso rápido no celular e apoio prático no PC.</p>
              </Card>
              <Card title="Para que ele serve">
                <p>Serve para formar raciocínio técnico e profissional: entender problema, estruturar solução, revisar conteúdo, praticar quando possível e evoluir por níveis.</p>
              </Card>
              <Card title="Como o estudo está organizado">
                <p>O conteúdo avança por aulas, blocos de ADS e níveis. Cada aula tem objetivo, explicação, exemplos, exercício, mini projeto, pergunta aberta, quiz e pensamento profissional.</p>
              </Card>
              <Card title="Como funciona a progressão">
                <p>Você conclui aulas, faz revisão obrigatória da aula anterior antes de avançar e desbloqueia níveis somente ao completar 100% do nível atual.</p>
              </Card>
              <Card title="Uso no celular">
                <p>O modo sem codar foi feito para fim de semana, deslocamento e momentos sem PC. O foco é entendimento, revisão, reflexão e resposta escrita.</p>
              </Card>
              <Card title="Uso no PC">
                <p>O modo estudar e codar adiciona exemplo de código, espaço para colar solução e guia mais voltado para prática, sem depender de compilador interno pesado.</p>
              </Card>
            </div>

            <div className="two-col-blocks">
              <Card title="Diferença entre os modos">
                <ul className="clean-list">
                  <li><strong>Estudar sem codar:</strong> leitura, analogia, revisão, resposta escrita e raciocínio.</li>
                  <li><strong>Estudar e codar:</strong> mesma base, mas com exemplos de código, exercício prático e espaço para colar solução.</li>
                </ul>
              </Card>
              <Card title="O que este app evita">
                <ul className="clean-list">
                  <li>Sem login obrigatório</li>
                  <li>Sem backend obrigatório</li>
                  <li>Sem IA externa obrigatória</li>
                  <li>Sem poluição visual</li>
                  <li>Sem recursos pesados desnecessários</li>
                </ul>
              </Card>
            </div>
          </section>
        )}

        {activeTab === 'matriz' && (
          <section className="page-section">
            <div className="section-header">
              <h2>Matriz ADS completa</h2>
              <p>Visão organizada do que normalmente aparece em uma formação de ADS e por que isso importa na prática.</p>
            </div>
            <div className="stack-grid">
              {MATRIX_BLOCKS.map((block) => (
                <Card key={block.title} title={block.title}>
                  <p><strong>Conteúdos:</strong> {block.items.join(', ')}.</p>
                  <p><strong>Na prática:</strong> {block.practical}</p>
                </Card>
              ))}
            </div>

            <div className="two-col-blocks">
              <Card title="Outras matérias comuns">
                <p>{EXTRA_SUBJECTS.join(', ')}.</p>
              </Card>
              <Card title="Fases do curso">
                {COURSE_PHASES.map((phase) => (
                  <div key={phase.title} className="phase-block">
                    <strong>{phase.title}</strong>
                    <p>{phase.items.join(', ')}.</p>
                  </div>
                ))}
              </Card>
            </div>
          </section>
        )}

        {(activeTab === 'sem-codar' || activeTab === 'com-codar') && (
          <section className="study-layout">
            <aside className="sidebar">
              <div className="search-box">
                <label htmlFor="search">Buscar aula</label>
                <input
                  id="search"
                  value={state.search}
                  onChange={(e) => updateState({ search: e.target.value })}
                  placeholder="Ex.: banco, lógica, segurança"
                />
              </div>
              <div className="progress-box">
                <strong>Progresso geral</strong>
                <p>{Object.keys(state.completedLessons).length} / {LESSONS.length} aulas concluídas</p>
                <div className="progress-bar"><span style={{ width: `${Math.round((Object.keys(state.completedLessons).length / LESSONS.length) * 100)}%` }} /></div>
              </div>
              <div className="lesson-list">
                {filteredLessons.map((lesson) => {
                  const locked = lesson.level > unlockedLevel;
                  const selected = lesson.id === selectedLessonId;
                  return (
                    <button
                      key={lesson.id}
                      className={selected ? 'lesson-item active' : 'lesson-item'}
                      onClick={() => setSelectedLessonId(lesson.id)}
                    >
                      <span>{lesson.order}. {lesson.title}</span>
                      <small>
                        Nível {lesson.level} · {locked ? 'Bloqueada' : state.completedLessons[lesson.id] ? 'Concluída' : 'Disponível'}
                      </small>
                    </button>
                  );
                })}
              </div>
            </aside>

            <div className="lesson-panel">
              {selectedLesson.level > unlockedLevel ? (
                <Card title="Aula bloqueada">
                  <p>Essa aula pertence a um nível ainda não liberado. Complete 100% do nível atual para avançar.</p>
                </Card>
              ) : (
                <>
                  <div className="lesson-header">
                    <div>
                      <p className="eyebrow">{activeTab === 'sem-codar' ? 'Modo: estudar sem codar' : 'Modo: estudar e codar'}</p>
                      <h2>{selectedLesson.title}</h2>
                      <p>{selectedLesson.objective}</p>
                    </div>
                    <button className="primary-btn" onClick={() => completeLesson(selectedLesson)}>
                      {state.completedLessons[selectedLesson.id] ? 'Aula concluída' : 'Concluir aula'}
                    </button>
                  </div>

                  {pendingReview && state.completedLessons[pendingReview.id] && (
                    <Card title={`Revisão obrigatória antes de avançar: ${pendingReview.title}`} tone={state.reviewStatus[pendingReview.id] === 'retry' ? 'warning' : 'default'}>
                      <p>Para consolidar memória, responda à revisão da aula anterior antes de seguir com tranquilidade.</p>
                      {pendingReview.review.map((question, index) => (
                        <div key={index} className="field-block">
                          <label>{question.question}</label>
                          <textarea
                            value={reviewDraft[index] || ''}
                            onChange={(e) => setReviewDraft((current) => ({ ...current, [index]: e.target.value }))}
                            rows={3}
                            placeholder="Responda com suas palavras"
                          />
                        </div>
                      ))}
                      <div className="inline-actions">
                        <button className="primary-btn" onClick={submitReview}>Enviar revisão</button>
                        {state.reviewStatus[pendingReview.id] === 'retry' && (
                          <p className="feedback warning-text">Ainda faltou firmeza em algumas ideias. Releia os pontos centrais da aula anterior e tente novamente.</p>
                        )}
                        {state.reviewStatus[pendingReview.id] === 'passed' && (
                          <p className="feedback success-text">Revisão aprovada. A memória da aula anterior foi reforçada.</p>
                        )}
                      </div>
                    </Card>
                  )}

                  <Card title="Explicação detalhada">
                    {selectedLesson.explanation.map((item) => <p key={item}>{item}</p>)}
                  </Card>

                  <Card title="Exemplos práticos">
                    <ul className="clean-list">{selectedLesson.examples.map((item) => <li key={item}>{item}</li>)}</ul>
                  </Card>

                  <Card title="Guia passo a passo">
                    <ol className="number-list">{selectedLesson.steps.map((item) => <li key={item}>{item}</li>)}</ol>
                  </Card>

                  <div className="two-col-blocks">
                    <Card title="Exercício">
                      <p>{selectedLesson.exercise}</p>
                    </Card>
                    <Card title="Mini projeto">
                      <p>{selectedLesson.miniProject}</p>
                    </Card>
                  </div>

                  <Card title="Pergunta aberta">
                    <p>{selectedLesson.openQuestion}</p>
                    <textarea
                      rows={4}
                      value={state.openResponses[selectedLesson.id] || ''}
                      onChange={(e) => saveTextResponse('open', selectedLesson.id, e.target.value)}
                      placeholder="Responda com suas palavras"
                    />
                  </Card>

                  <Card title="Quiz rápido">
                    <div className="quiz-stack">
                      {selectedLesson.quiz.map((question, questionIndex) => (
                        <div key={question.question} className="quiz-item">
                          <strong>{question.question}</strong>
                          <div className="option-stack">
                            {question.options.map((option, optionIndex) => {
                              const chosen = state.quizResponses[selectedLesson.id]?.[questionIndex] === optionIndex;
                              const correct = question.answer === optionIndex;
                              return (
                                <button
                                  key={option}
                                  className={chosen ? 'option-btn selected' : 'option-btn'}
                                  onClick={() => saveQuizAnswer(selectedLesson.id, questionIndex, optionIndex)}
                                >
                                  {option}
                                  {chosen && <span>{correct ? ' · correta' : ' · marcada'}</span>}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>

                  <Card title="Pensamento profissional">
                    <p>{selectedLesson.professionalThinking}</p>
                  </Card>

                  <Card title="Campo de resposta">
                    <textarea
                      rows={5}
                      value={state.lessonResponses[selectedLesson.id] || ''}
                      onChange={(e) => saveTextResponse('study', selectedLesson.id, e.target.value)}
                      placeholder="Anote seu entendimento, dúvidas e resumo da aula"
                    />
                  </Card>

                  {activeTab === 'com-codar' && (
                    <>
                      <Card title="Guia prático de código">
                        <p>{selectedLesson.codePrompt}</p>
                        <p><strong>Checklist mínimo:</strong> {selectedLesson.codeChecklist.join(', ')}.</p>
                      </Card>
                      <Card title="Campo de código">
                        <textarea
                          className="code-area"
                          rows={10}
                          value={state.codeResponses[selectedLesson.id] || ''}
                          onChange={(e) => saveTextResponse('code', selectedLesson.id, e.target.value)}
                          placeholder="Cole aqui seu código, pseudocódigo ou estrutura de solução"
                        />
                        <SimpleCodeEvaluation lesson={selectedLesson} code={state.codeResponses[selectedLesson.id] || ''} />
                      </Card>
                    </>
                  )}
                </>
              )}
            </div>
          </section>
        )}

        {activeTab === 'niveis' && (
          <section className="page-section">
            <div className="section-header">
              <h2>Progressão por níveis</h2>
              <p>O próximo nível só é liberado quando o atual estiver 100% concluído.</p>
            </div>
            <div className="stack-grid">
              {levelCompletion.map((level) => {
                const locked = level.id > unlockedLevel;
                return (
                  <Card key={level.id} title={`Nível ${level.id} — ${level.name}`} tone={locked ? 'muted' : 'default'}>
                    <p>{level.focus}</p>
                    <p><strong>Progresso:</strong> {level.done}/{level.total} aulas · {level.percent}%</p>
                    <div className="progress-bar"><span style={{ width: `${level.percent}%` }} /></div>
                    <p><strong>Status:</strong> {locked ? 'Bloqueado' : level.percent === 100 ? 'Concluído' : 'Em andamento'}</p>
                  </Card>
                );
              })}
            </div>
          </section>
        )}

        {activeTab === 'anotacoes' && (
          <section className="page-section">
            <div className="section-header">
              <h2>Anotações</h2>
              <p>Use para registrar dúvidas, erros, resumos e ideias. Tudo salvo localmente.</p>
            </div>
            <Card title="Bloco de notas pessoal">
              <textarea
                rows={16}
                value={state.notes}
                onChange={(e) => updateState({ notes: e.target.value })}
                placeholder="Escreva aqui seus resumos, dúvidas, erros encontrados, ideias de projeto e revisões pessoais."
              />
            </Card>
          </section>
        )}
      </main>
    </div>
  );
}

function getPendingReview(selectedLesson, state) {
  const previousLesson = LESSONS.find((lesson) => lesson.order === selectedLesson.order - 1);
  if (!previousLesson) return null;
  if (!state.completedLessons[previousLesson.id]) return null;
  if (state.reviewStatus[previousLesson.id] === 'passed') return null;
  return previousLesson;
}

function SimpleCodeEvaluation({ lesson, code }) {
  const normalized = code.toLowerCase();
  const matches = lesson.codeChecklist.filter((item) => {
    const itemText = item.toLowerCase();
    if (itemText.includes('if')) return normalized.includes('if');
    if (itemText.includes('função') || itemText.includes('function')) return normalized.includes('function') || normalized.includes('=>');
    if (itemText.includes('retornar')) return normalized.includes('return');
    if (itemText.includes('parâmetro')) return normalized.includes('(') && normalized.includes(')');
    if (itemText.includes('botão')) return normalized.includes('button') || normalized.includes('<button');
    if (itemText.includes('script')) return normalized.includes('script') || normalized.includes('const') || normalized.includes('function');
    if (itemText.includes('perfil')) return normalized.includes('perfil');
    if (itemText.includes('cliente')) return normalized.includes('cliente');
    if (itemText.includes('itens')) return normalized.includes('itens') || normalized.includes('items');
    if (itemText.includes('total')) return normalized.includes('total');
    return normalized.length >= 30;
  }).length;

  const ratio = lesson.codeChecklist.length ? Math.round((matches / lesson.codeChecklist.length) * 100) : 0;
  let message = 'Adicione mais estrutura para aproximar sua resposta do exercício.';
  if (ratio >= 100) message = 'Boa base. Sua resposta atende ao checklist essencial desta aula.';
  else if (ratio >= 67) message = 'Está bem encaminhado. Falta refinar um ou dois pontos do checklist.';

  return (
    <div className="evaluation-box">
      <strong>Avaliação simples</strong>
      <p>Checklist atendido: {matches}/{lesson.codeChecklist.length} · {ratio}%</p>
      <p>{message}</p>
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
