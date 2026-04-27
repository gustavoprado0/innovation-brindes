# Innovation Brindes – Frontend Challenge

Aplicação Next.js construída como parte do processo seletivo para desenvolvedor Front-end Júnior.

## 🚀 Tecnologias

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Zustand** – estado global (auth + favoritos)
- **React Query** – cache e estados de loading/erro
- **Axios** – cliente HTTP
- **Vitest + React Testing Library** – testes unitários
- **Playwright** – teste E2E

## ▶️ Rodando com Docker

### Pré-requisitos
- Docker instalado

### Passos

```bash
# 1. Clone o repositório
git clone https://github.com/gustavoprado0/innovation-brindes.git
cd innovation-brindes

# 2. Build e start com Docker Compose
docker-compose up --build

# 3. Acesse no navegador
http://localhost:3000
```

## ▶️ Rodando localmente (sem Docker)

```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev

# Rodar testes unitários
npm test

# Rodar teste E2E (precisa do dev rodando)
npm run test:e2e
```

## 🔐 Credenciais de acesso

- **Usuário:** dinamica
- **Senha:** 123

## 📁 Estrutura do projeto
    src/
    app/           # Rotas (login, products)
    components/    # Componentes React
    layout/      # Header, LoginForm, QueryProvider
    products/    # ProductCard, ProductGrid, ProductModal, ProductsToolbar
    hooks/         # useProducts
    lib/           # api.ts, mappers.ts, utils.ts, validations.ts
    stores/        # authStore, favoritesStore (Zustand)
    tests/         # Testes unitários e E2E
    types/         # Tipos TypeScript

## 🏗️ Decisões técnicas

- **App Router** do Next.js 14 para aproveitar Server Components e Middleware nativo
- **Middleware** protege rotas lendo o cookie `auth-token` no servidor
- **Cookie + Zustand persist** para manter sessão — o cookie é lido pelo middleware (servidor) e o Zustand pelo cliente
- **Mapeamento de tipos API → internos** para manter o código em inglês e desacoplar a UI da API
- **Debounce de 400ms** na busca para evitar requisições excessivas
- **Paginação** por "carregar mais" em lotes de 20 produtos
- **localStorage** para persistir favoritos entre sessões

## ⚠️ Pendências e melhorias futuras

- Testes unitários para mais componentes (Modal, Toolbar)
- Animações de transição entre páginas
- PWA / offline support
- Adoção de um design system como **shadcn/ui**, **Material UI** ou **Chakra UI** para padronizar componentes, acelerar o desenvolvimento e garantir maior consistência visual e acessibilidade em escala

## 📊 Lighthouse (Desktop)

| Métrica | Score |
|---|---|
| ⚡ Performance | 96 |
| ♿ Accessibility | 90 |
| ✅ Best Practices | 100 |
| 🔍 SEO | 100 |
