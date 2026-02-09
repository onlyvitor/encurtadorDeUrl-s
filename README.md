# Encurtador de URL com Análise de Cliques

Um encurtador de URLs moderno e completo que permite criar links curtos personalizados e rastrear estatísticas detalhadas de cada clique.

## Funcionalidades

- Encurtamento de URLs: Transforme links longos em URLs curtas e compartilháveis
- Redirecionamento rápido: Acesse o link original através do código único
- Rastreamento de cliques: Monitore cada acesso aos seus links
- Análise detalhada: Veja informações sobre IP, localização, dispositivo e navegador
- Listagem de URLs: Visualize todas as URLs encurtadas e suas estatísticas
- Histórico completo: Acesse o registro de todos os cliques em cada link

## Tecnologias

- Backend: Node.js + Express
- Banco de dados: MongoDB + Mongoose
- Geração de códigos: nanoid

## Pré-requisitos

- Node.js 18+
- MongoDB 6+
- npm ou yarn

## Instalação

```bash
# Clone o repositório
git clone https://github.com/onlyvitor/encurtadorDeUrl-s
cd encurtador-url

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env
```

## Configuração

Edite o arquivo `.env` com suas credenciais:

```env
MONGO_URL=SEU_URL_MONGO_AQUI
```

## Executando o projeto

```bash
# Modo desenvolvimento
npm run dev

# Modo produção
npm start
```

Acesse http://localhost:3000 no navegador.

## Endpoints da API

### 1. Criar URL curta

**POST** `/shorten`

```json
{
  "url": "https://exemplo.com/pagina-muito-longa"
}
```

**Resposta:**

```json
{
  "success": true,
  "data": {
    "originalUrl": "https://exemplo.com/pagina-muito-longa",
    "code": "abc123",
    "createdAt": "2024-02-09T10:30:00.000Z"
  }
}
```

### 2. Redirecionar para URL original

**GET** `/:code`

Exemplo: GET /abc123

- Redireciona para a URL original
- Registra o clique com todas as informações (IP, localização, device, etc)
- Retorna 404 se o código não existir

### 3. Listar todas as URLs

**GET** `/find/urls`

**Resposta:**

```json
{
  "success": true,
  "data": [
    {
      "_id": "65c1234567890abcdef12345",
      "originalUrl": "https://exemplo.com/pagina-muito-longa",
      "shortCode": "abc123",
      "clicks": 42,,
      "createdAt": "2024-02-09T10:30:00.000Z"
    }
  ],
  "total": 1
}
```

## Informações Catalogadas por Clique

Cada vez que alguém acessa um link encurtado, o sistema registra.

## Casos de Uso

### Exemplo de fluxo completo:

```bash
# 1. Criar URL curta
curl -X POST http://localhost:3000/shorten \
  -H "Content-Type: application/json" \
  -d '{"url": "https://meusite.com/artigo-muito-longo"}'

# Resposta: { "shortUrl": "http://localhost:3000/x7k2m" }

# 2. Compartilhar o link curto
# Usuários acessam: http://localhost:3000/x7k2m

# 3. Ver estatísticas
curl http://localhost:3000/urls

# 4. Cada acesso é automaticamente catalogado com todas as informações
```

## Segurança

- Validação de URLs antes do encurtamento
- Sanitização de inputs

## Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para:

1. Fazer um fork do projeto
2. Criar uma branch para sua feature (git checkout -b feature/nova-funcionalidade)
3. Commit suas mudanças (git commit -m 'Adiciona nova funcionalidade')
4. Push para a branch (git push origin feature/nova-funcionalidade)
5. Abrir um Pull Request