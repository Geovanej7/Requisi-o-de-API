const http = require('http');
const axios = require('axios');

const port = 3000;
const url = 'https://api.api-futebol.com.br/v1/campeonatos/2/artilharia';
const token = 'test_d78ff7befd0f53a4f625c210098534';

const headers = {
  'Authorization': `Bearer ${token}`,
};

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    axios.get(url, { headers })
      .then((response) => {
        if (response.data && response.data.length > 0) {
          const artilheiros = response.data;

          if (artilheiros.length >= 2) {
            const primeiroArtilheiro = artilheiros[0];
            const segundoArtilheiro = artilheiros[1];

            // Adicione o texto "Artilheiros do Brasileirão Série A" antes de listar os artilheiros
            const responseBody = `Artilheiros do Brasileirao Serie A\n1º Artilheiro: ${primeiroArtilheiro.atleta.nome_popular} - Gols: ${primeiroArtilheiro.gols}\n2º Artilheiro: ${segundoArtilheiro.atleta.nome_popular} - Gols: ${segundoArtilheiro.gols}`;

            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            res.end(responseBody);
          } else {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'text/plain');
            res.end('Menos de 2 artilheiros disponíveis na resposta.');
          }
        } else {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'text/plain');
          res.end('Nenhum dado na resposta.');
        }
      })
      .catch((error) => {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain');
        res.end(`Erro ao fazer a requisição: ${error.message}`);
      });
  } else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Página não encontrada');
  }
});

server.listen(port, () => {
  console.log(`Servidor em execução na porta ${port}`);
});