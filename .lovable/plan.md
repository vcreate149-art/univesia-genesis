
# Internacionalizar o posicionamento da UniveSIA

O site atualmente tem referencias locais (Brasil) em textos, moeda (R$) e formato de contato. Vamos atualizar para refletir uma agencia global.

---

## Alteracoes

### 1. Hero (`src/components/Hero.tsx`)
- Atualizar o subtitulo para mencionar atuacao global: "Transformamos complexidade em solucoes digitais inteligentes para empresas de todo o mundo."

### 2. About (`src/components/About.tsx`)
- Atualizar a descricao para refletir alcance global: "Somos uma agencia de tecnologia que atende clientes de todo o mundo..."

### 3. Formulario de Contato (`src/components/Contact.tsx`)
- Trocar faixas de orcamento de R$ para USD (ou manter ambos)
  - "Up to $1,000" / "Ate USD 1.000"
  - "$1,000 - $5,000" etc.
- Trocar label "WhatsApp" para "WhatsApp (com DDI)" ou "Telefone / WhatsApp"
- Ajustar prazos se necessario

### 4. Depoimentos (`src/components/Testimonials.tsx`)
- Diversificar empresas nos depoimentos para incluir clientes internacionais (ex: empresas dos EUA, Europa, etc.)

### 5. Textos gerais
- `Services.tsx`: Garantir que descricoes de servicos nao sejam localizadas demais
- `Footer.tsx`: Sem mudancas (ja esta limpo)
- `config.ts`: Sem mudancas necessarias

### 6. FAQ (`src/pages/FAQPage.tsx`)
- Adicionar pergunta sobre atendimento internacional, fusos horarios e idiomas suportados

---

## Detalhes tecnicos

Arquivos a modificar:
- `src/components/Hero.tsx` - subtitulo global
- `src/components/About.tsx` - descricao global
- `src/components/Contact.tsx` - orcamentos em USD, campo telefone internacional
- `src/components/Testimonials.tsx` - clientes internacionais
- `src/pages/FAQPage.tsx` - perguntas sobre atendimento global

Nenhuma mudanca de banco de dados ou backend necessaria.
