# CineLeta 🎬

CineLeta (Cinema e Roleta) é um Progressive Web App (PWA) voltado para cinéfilos indecisos e grupos de amigos. A aplicação atua como um tracker de filmes e um motor de recomendação gamificado, utilizando a API do TMDB e um banco de dados próprio para o histórico do Oscar.

## 🚀 Tecnologias Utilizadas

*   **Framework:** React 18 com TypeScript (via Vite)
*   **Estilização:** Tailwind CSS v3 (Identidade Visual customizada: Dourado, Preto, Vinho e Creme)
*   **Tipografia:** Playfair Display e Montserrat
*   **Integrações:** API do TMDB, Web Share API (Mobile)
*   **Autenticação:** Google OAuth2 (via backend)

## ⚙️ Funcionalidades Principais

*   **Dashboard Pessoal:** Gráficos de horas assistidas, gêneros favoritos e top filmes.
*   **Randomizador Geral:** Sorteio de filmes aleatórios do TMDB com filtros de qualidade, permitindo ao usuário "Passar" ou "Assistir".
*   **Randomizador Oscar:** Sorteio baseado em categorias históricas do Oscar (consultando dataset próprio).
*   **Watch Sessions:** Registro de filmes assistidos em conjunto, compartilhando o histórico sem mesclar as avaliações individuais.
*   **Compartilhamento Nativo:** Geração de card do filme avaliado para compartilhamento direto no Instagram Stories ou WhatsApp via Web Share API.

## 🛠️ Como Executar o Projeto

### Pré-requisitos
*   Node.js (v18+)
*   NPM ou Yarn

### Instalação

1. Clone o repositório:
   ```bash
   git clone [https://github.com/williais/frontEndCineLeta.git](https://github.com/williais/frontEndCineLeta.git)

2. Acesse a pasta do projeto:
   ```bash 
   cd cineleta-front

3. Instale as dependências:
   ```bash 
   npm install

4. Crie um arquivo .env
VITE_API_BASE_URL=http://localhost:8080/api
VITE_TMDB_API_KEY=sua_chave_do_tmdb

5. Inicie o servidor de desenvolvimento:
   ```bash 
   npm run dev

👨‍💻 Autor
Desenvolvido por Willian Padilha