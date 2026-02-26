

# Trocar azul por verde claro em todo o site

Vou alterar a cor primaria do site de azul (`hsl(213 100% 50%)`) para verde claro em todos os lugares relevantes.

## O que muda

- **Variáveis CSS globais** (`src/index.css`): Alterar `--primary`, `--ring`, `--secondary`, `--accent`, gradientes, glows, scrollbar, e selection para tons de verde claro (ex: `hsl(145 65% 42%)` como cor principal)
- **Hero** (`src/components/Hero.tsx`): Atualizar as cores dos orbs de gradiente, grid pattern e formas flutuantes de azul/roxo para tons de verde
- **Scene3D** (`src/components/Scene3D.tsx`): Partículas já usam `primary`, atualizam automaticamente
- **Componentes gerais**: Como a maioria usa `text-primary`, `bg-primary`, etc., mudam automaticamente via variáveis CSS

## Paleta proposta

| Elemento | Antes (azul) | Depois (verde claro) |
|----------|-------------|---------------------|
| Primary | `hsl(213 100% 50%)` | `hsl(145 65% 42%)` |
| Secondary bg | `hsl(213 100% 96%)` | `hsl(145 60% 95%)` |
| Accent | `hsl(213 100% 96%)` | `hsl(145 60% 95%)` |
| Gradiente | azul-roxo | verde claro-esmeralda |
| Ring/focus | azul | verde |

## Arquivos a editar

1. **`src/index.css`** -- variáveis CSS e classes utilitárias (gradientes, glows, botões, scrollbar)
2. **`src/components/Hero.tsx`** -- cores hardcoded nos orbs e formas flutuantes

