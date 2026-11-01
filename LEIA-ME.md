# Banco de Oportunidades de Hotéis · Visual Turismo

App interno (PWA) com as campanhas de hotéis Visual. Os dados ficam criptografados com a senha de acesso.

## Arquivos

| Arquivo | Para que serve |
|---|---|
| `index.html` | O app. Não contém dados nem a senha. |
| `hoteis.dat` | Oportunidades criptografadas. Regravado pela Área do administrador a cada publicação. |
| `acesso.json` | Chave de acesso (sem a senha). Regravado quando o administrador troca a senha. |
| `sw.js`, `manifest.webmanifest`, `icon-*.png`, `apple-touch-icon.png` | Instalação no celular e uso sem internet. |
| `xlsx.mini.min.js` | Leitor de planilhas (SheetJS 0.18.5, licença Apache-2.0). |
| `logo-visual.png` | Copiar do repositório do app de oportunidades aéreas. Sem ele, o app mostra a marca em texto. |
| `.nojekyll` | Faz o GitHub Pages publicar os arquivos como estão. |

## Rotina do administrador

1. Abra o app, entre com a senha e vá em **Menu → Área do administrador** (no primeiro acesso, use o endereço do app terminado em `#admin`).
2. **Atualizar as oportunidades:** escolha a planilha (.xlsx), confira o resumo e toque em **Publicar**. Em 1 a 2 minutos todos recebem. A planilha não vai para o servidor: só as oportunidades, criptografadas.
3. **Trocar a senha:** na mesma área, em **Senha de acesso do app**. Informe a nova senha à equipe por um canal seguro.
4. **Restaurar:** a lista de últimas publicações permite voltar uma versão (só para versões publicadas com a senha atual).

## Regras importantes

- Não envie a planilha .xlsx para este repositório: ela ficaria pública, sem senha.
- O token do GitHub fica só no aparelho do administrador, protegido pelo PIN.
- Só entram campanhas com “VISUAL” no nome (configuração `somenteCampanhasCom` no `index.html`).
