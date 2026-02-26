
# Plano Estrategico - Melhorias de Credibilidade, Conteudo e UX

Este plano aborda as 4 areas de recomendacao estrategica identificadas, organizadas em tarefas incrementais.

---

## 1. Credibilidade e Prova Social

### 1.1 Depoimentos Aprimorados
- Atualizar o componente `Testimonials.tsx` para incluir fotos (placeholder com iniciais ja existe, manter), logos das empresas e links do LinkedIn
- Adicionar campo `linkedin` e `logo` aos dados dos depoimentos
- Exibir o logo da empresa ao lado do nome
- Link clicavel para o perfil LinkedIn de cada cliente

### 1.2 Corrigir Contadores do Hero
- No `config.ts`, o valor `years: 3` exibe "3 Anos de Experiencia". Alterar para uma metrica mais impactante:
  - Mudar o label para "Tecnologias Dominadas" ou manter "Anos de Experiencia" se o valor for real
  - Se o valor for 0, substituir por outro marco relevante como "+15 Tecnologias"
- Revisar todos os contadores para garantir que refletem dados reais

### 1.3 Secao de Equipe na pagina Sobre
- Criar componente `Team.tsx` com cards dos fundadores/especialistas
- Cada card com: foto (avatar com iniciais como fallback), nome, cargo, bio curta e link LinkedIn
- Adicionar o componente na pagina `SobrePage.tsx`

### 1.4 Selos e Certificacoes
- Criar componente `Certifications.tsx` com selos de certificacoes tecnicas e parcerias
- Exibir badges como: AWS, Google Cloud, Meta, etc.
- Posicionar na pagina Sobre ou na Home apos Testimonials

---

## 2. Conteudo e Autoridade

### 2.1 Blog (estrutura basica)
- Criar tabela `blog_posts` no banco de dados (titulo, slug, conteudo, autor, data, categoria, imagem, publicado)
- Criar pagina `/blog` com listagem de artigos
- Criar pagina `/blog/:slug` para artigo individual
- Adicionar "Blog" no menu de navegacao (`Navbar.tsx`)
- Painel admin para criar/editar posts em `/admin/blog`

### 2.2 Estudos de Caso no Portfolio
- Expandir os dados do `Portfolio.tsx` para incluir campos: `challenge`, `solution`, `results` (com metricas quantitativas)
- Atualizar o modal de detalhes para exibir a narrativa completa: Desafio -> Solucao -> Resultados
- Adicionar metricas visuais (ex: "+40% eficiencia", "-50% custos")

---

## 3. Otimizacao de Conversao e UX

### 3.1 Chatbot com IA
- Criar componente `AIChatbot.tsx` - botao flutuante que abre um chat
- Usar Lovable AI (modelo gemini-2.5-flash) via edge function para responder perguntas sobre servicos, precos e processo de trabalho
- Armazenar conversas no banco de dados para analise
- Posicionar no canto inferior direito (substituir ou complementar o botao de WhatsApp)

### 3.2 Pagina de FAQ
- Criar componente `FAQ.tsx` com accordion (ja temos Radix accordion)
- Perguntas sobre: processo de trabalho, prazos, formas de pagamento, suporte, contratos
- Criar rota `/faq` e adicionar ao menu/footer
- Alternativamente, incluir FAQ na pagina de Contato

---

## 4. Transparencia e Conformidade Legal

### 4.1 Conformidade LGPD
- Criar componente `CookieConsent.tsx` - banner de consentimento de cookies
- Criar pagina `/privacidade` com Politica de Privacidade
- Criar pagina `/termos` com Termos de Uso
- Adicionar links no footer

### 4.2 Informacoes da Empresa no Footer
- Adicionar CNPJ, endereco e informacoes de registro no `Footer.tsx`
- Adicionar links para Politica de Privacidade e Termos de Uso

---

## Detalhes Tecnicos

### Novas rotas no App.tsx
```text
/blog          -> BlogPage
/blog/:slug    -> BlogPostPage
/faq           -> FAQPage
/privacidade   -> PrivacidadePage
/termos        -> TermosPage
```

### Nova tabela no banco de dados
```text
blog_posts
- id (uuid, PK)
- title (text)
- slug (text, unique)
- content (text)
- excerpt (text)
- author (text)
- category (text)
- image_url (text, nullable)
- published (boolean, default false)
- created_at (timestamptz)
- updated_at (timestamptz)
```

### Edge Function
- `ai-chat`: recebe mensagens do usuario e responde usando Lovable AI com contexto sobre os servicos da UniveSIA

### Componentes novos
- `Team.tsx` - Secao da equipe
- `Certifications.tsx` - Selos e certificacoes
- `AIChatbot.tsx` - Chat com IA flutuante
- `FAQ.tsx` - Perguntas frequentes com accordion
- `CookieConsent.tsx` - Banner LGPD
- `BlogCard.tsx` - Card de artigo do blog

### Arquivos modificados
- `config.ts` - Adicionar dados da empresa (CNPJ, endereco)
- `Footer.tsx` - Informacoes legais e links
- `Navbar.tsx` - Novos links (Blog, FAQ)
- `Portfolio.tsx` - Estudos de caso expandidos
- `Testimonials.tsx` - Dados enriquecidos
- `SobrePage.tsx` - Adicionar secao equipe e certificacoes
- `App.tsx` - Novas rotas
- `Index.tsx` - Adicionar certificacoes

---

## Ordem de Implementacao Sugerida

1. Correcoes rapidas: contadores, footer com dados da empresa, depoimentos melhorados
2. Novas paginas estaticas: FAQ, Privacidade, Termos, Cookie Consent
3. Secao de Equipe e Certificacoes
4. Estudos de Caso no Portfolio
5. Blog (tabela + CRUD + paginas)
6. Chatbot com IA

> **Nota:** Devido ao volume de mudancas, recomendo implementar em etapas. Posso comecar por qualquer grupo acima.
