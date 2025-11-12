# Integração com API Spring

## Configuração

1. Crie um arquivo `.env` na raiz do projeto (copie o `.env.example`):
```bash
VITE_API_URL=http://localhost:8080/api
```

2. Ajuste a URL conforme a configuração da sua API Spring.

## Endpoints Esperados

A aplicação espera os seguintes endpoints na sua API Spring:

### Produtos

- **GET** `/api/products` - Lista todos os produtos
  - Retorno: Array de produtos
  ```json
  [
    {
      "id": 1,
      "name": "Produto Exemplo",
      "description": "Descrição do produto",
      "price": 99.90,
      "imageUrl": "https://exemplo.com/imagem.jpg",
      "category": "Categoria",
      "stock": 10
    }
  ]
  ```

- **GET** `/api/products/{id}` - Busca um produto específico
  - Retorno: Objeto do produto

- **POST** `/api/products` - Cria um novo produto
  - Body: Dados do produto (sem id)

### Pedidos

- **POST** `/api/orders` - Cria um novo pedido
  - Body:
  ```json
  {
    "items": [
      {
        "product": { "id": 1, ... },
        "quantity": 2
      }
    ],
    "total": 199.80,
    "customerName": "João Silva",
    "customerEmail": "joao@email.com"
  }
  ```

- **GET** `/api/orders` - Lista todos os pedidos

## CORS

Certifique-se de que sua API Spring permite requisições do frontend. Adicione a configuração de CORS:

```java
@Configuration
public class CorsConfig {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                        .allowedOrigins("http://localhost:8080", "http://localhost:5173")
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        .allowCredentials(true);
            }
        };
    }
}
```

## Executando

1. Inicie sua API Spring (normalmente em `http://localhost:8080`)
2. Inicie o frontend: `npm run dev`
3. Acesse `http://localhost:5173`
