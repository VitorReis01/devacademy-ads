# DevAcademy ADS

Aplicativo web instalável em React + PWA, focado em estudo real de ADS no celular e no PC.

## O que já está implementado

- React + estrutura mobile-first
- PWA com manifest, ícones e service worker simples
- Progresso salvo localmente com `localStorage`
- Abas principais:
  - Apresentação
  - Matriz ADS completa
  - Estudar sem codar
  - Estudar e codar
  - Níveis
  - Anotações
- Busca por aula
- Progressão por níveis
- Aulas bloqueadas/desbloqueadas
- Revisão obrigatória entre aulas
- Campo de resposta escrita
- Campo de código leve no modo prático
- Avaliação simples por checklist
- Tema escuro legível

## Estrutura principal

- `src/App.jsx`: aplicação principal, dados das aulas, revisão, níveis e persistência local
- `src/main.jsx`: bootstrap do React e registro do service worker
- `src/styles.css`: layout e responsividade
- `public/manifest.webmanifest`: configuração PWA
- `public/sw.js`: cache offline básico
- `public/icon-192.png` e `public/icon-512.png`: ícones do app

## Como rodar localmente

```bash
npm install
npm run dev
```

## Como gerar build

```bash
npm run build
```

## Observação

No ambiente em que o projeto foi gerado aqui, a instalação do npm não pôde ser validada até o fim por restrição de autenticação do próprio ambiente. O código-fonte do app foi entregue completo e pronto para abrir em um projeto Vite React local.
