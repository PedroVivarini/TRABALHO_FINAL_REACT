# 🛒 E-Commerce Front-end (Aplicação React)

Este projeto é um desafio de desenvolvimento Front-end construído com React, utilizando TypeScript e Tailwind CSS para uma experiência moderna e eficiente.

A aplicação se conecta a um backend simulado em Spring Boot (via camada de serviço de API) e implementa funcionalidades essenciais como autenticação baseada em JWT, gerenciamento de rotas e operações CRUD (simuladas) de produtos.

## 🌟 Recursos Principais

* **Tecnologias Modernas:** Desenvolvido com **React + Vite** e tipagem estática com **TypeScript**.
* **Estilização Profissional:** Layout e componentes estilizados utilizando **Tailwind CSS**.
* **Roteamento:** Gerenciamento de navegação com **React Router DOM**.
* **Autenticação JWT:** Implementação de login/logout e proteção de rotas usando **React Context API**.
* **Camada de Serviço (API Service Layer):** Estrutura de código limpa para todas as requisições HTTP (GET, POST).
* **Layout Completo:** Inclui Navbar, Footer e componentes reutilizáveis.

## 🛠️ Tecnologias Utilizadas

* **Framework:** React (Vite)
* **Linguagem:** TypeScript
* **Estilização:** Tailwind CSS
* **Rotas:** React Router DOM
* **Gerenciamento de Estado de Auth:** React Context API
* **Comunicação API:** `fetch` nativo (com tokens JWT)

## 🚀 Como Executar o Projeto

### 1. Pré-requisitos

Certifique-se de ter o [Node.js](https://nodejs.org/) (versão 18+) e o npm instalados.

### 2. Instalação das Dependências

Clone o repositório (ou acesse o diretório do projeto) e instale as dependências:

```bash
# Se ainda não estiver no diretório do projeto
# git clone <URL_DO_SEU_REPOSITORIO>
# cd minha-app-react 

npm install
````

### 3\. Configuração do Backend (API)

A aplicação está configurada para se comunicar com uma API Spring Boot.

  * **URL Base:** Configure a URL da sua API no arquivo `.env` na raiz do projeto:

    ```bash
    VITE_API_URL=http://localhost:8081/api
    ```

    > **Nota:** Se você não tiver um backend rodando, as chamadas de API falharão (404/500). Para testes iniciais, você pode usar uma URL de Mock API (como `JSONPlaceholder` ou `Reqres`) para testar o GET, mas o POST de autenticação/criação de produto requer o backend configurado.

### 4\. Rodando a Aplicação

Inicie o servidor de desenvolvimento do Vite:

```bash
npm run dev
```

A aplicação estará acessível em `http://localhost:5173/` (ou outra porta indicada pelo terminal).

## 🗺️ Estrutura de Rotas

| Caminho | Componente | Proteção | Descrição |
| :--- | :--- | :--- | :--- |
| `/` | `Home` | ✅ JWT | Página inicial, pode exibir uma listagem de produtos (requisição GET). |
| `/login` | `LoginPage` | ❌ Pública | Formulário para autenticação do usuário. |
| `/products/new` | `CreateProductPage` | ✅ JWT | Formulário para cadastrar novos produtos (requisição POST). |
| `/cadastro` | `Cadastro` | ✅ JWT | Página de cadastro geral (implementação inicial). |
