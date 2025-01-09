# Desafio Dashboard de Tarefas INC

Uma aplicação moderna de gerenciamento de tarefas construída com Next.js, com atualizações em tempo real, autenticação e design responsivo.

## 🚀 Funcionalidades

- ✨ Interface moderna e responsiva
- 🔐 Autenticação com Clerk
- 🌓 Suporte a tema claro/escuro
- ⚡ Atualizações em tempo real
- 📱 Design mobile-first
- 🔄 Sistema de filtro de tarefas
- 🎯 Acompanhamento de progresso

## 🛠 Tecnologias Utilizadas

- [Next.js 15](https://nextjs.org/) - Framework React
- [Clerk](https://clerk.com/) - Autenticação
- [TanStack Query](https://tanstack.com/query) - Busca de Dados
- [Zustand](https://zustand-demo.pmnd.rs/) - Gerenciamento de Estado
- [Tailwind CSS](https://tailwindcss.com/) - Estilização
- [Framer Motion](https://www.framer.com/motion/) - Animações
- [Radix UI](https://www.radix-ui.com/) - Componentes de UI
- [TypeScript](https://www.typescriptlang.org/) - Segurança de Tipos

## 🚦 Começando

1. Clone o repositório:

```bash
git clone https://github.com/Mateus8741/desafiotodo.git
```

2. Crie um arquivo `.env.local` na raiz do projeto e adicione as chaves que criel no arquivo `.env.example`:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=sua_chave_publica
CLERK_SECRET_KEY=sua_chave_secreta
```

3. Execute o servidor de desenvolvimento:

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
# ou
bun dev
```

4. Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## 📱 Design Responsivo

A aplicação é totalmente responsiva e otimizada para:
- Dispositivos móveis (< 640px)
- Tablets (640px - 768px)
- Notebooks (768px - 1024px)
- Desktops (> 1024px)

## 🔑 Autenticação

A autenticação é gerenciada pelo Clerk, oferecendo:
- Login/Cadastro seguro
- Gerenciamento de tokens JWT
- Rotas protegidas
- Gerenciamento de perfil de usuário

## 🔑 Contas para teste

1. user: test
- email: teste@t.com
- senha: teste123@

2. user: teste2
- email: Auth sem email
- senha: teste123@

## 🎨 Suporte a Temas

A aplicação suporta temas claro e escuro:
- Alternância manual de tema
- Seleção persistente de tema

