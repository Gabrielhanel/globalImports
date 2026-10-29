# Global Imports

![Logo do Global Imports](./src/media/logo.png)

Aplicativo mobile de catálogo e compra de veículos, desenvolvido com **React Native e Expo**. O projeto reúne telas para explorar veículos, consultar detalhes técnicos, pesquisar e filtrar o catálogo, gerenciar favoritos e carrinho, além de fluxos de autenticação, perfil e pedidos que dependem de uma API externa.

> **Estado do projeto:** este repositório contém o aplicativo frontend. A API/backend consumida pelo app não está incluída no ZIP. Algumas telas estão implementadas como interface ou demonstração e ainda precisam de integração para persistir dados de verdade.

## Funcionalidades

- **Catálogo de veículos:** exibição de veículos com marca, modelo, ano, preço, imagens e informações técnicas recebidas da API.
- **Detalhes do veículo:** página com descrição, galeria e ficha técnica, incluindo motorização, potência, torque, tração, propulsão, portas, câmbio e aceleração.
- **Pesquisa e filtros:** busca por modelo e telas de filtragem e ordenação dos resultados.
- **Favoritos:** marcação e listagem de veículos favoritos durante o uso do aplicativo. No código atual, a lista é mantida em estado de contexto e não há persistência local implementada para ela.
- **Carrinho e checkout:** telas para visualizar e remover itens, conferir o total, selecionar o método de pagamento e iniciar a criação de um pedido por meio da API.
- **Autenticação:** telas de login e cadastro, com validações de campos e documentos CPF/CNPJ no formulário de cadastro.
- **Perfil e endereço:** telas para visualizar a área do usuário e consultar/atualizar dados de endereço pela API.
- **Pedidos:** telas para confirmação de compra e consulta de pedidos, condicionadas ao funcionamento dos endpoints correspondentes.
- **Área de anunciante:** interface para cadastrar e editar veículos, com seleção e envio de imagens. No estado atual do código, os formulários de cadastro/edição de veículo ainda não persistem o produto no backend.
- **Upload de imagens:** integração com Cloudinary para envio de imagens selecionadas na galeria do dispositivo.
- **Navegação mobile:** navegação por abas inferiores e telas empilhadas usando React Navigation.

## Tecnologias utilizadas

- **JavaScript**
- **React 19**
- **React Native 0.79**
- **Expo SDK 53**
- **React Navigation 7** — navegação por abas e pilha
- **Axios** — requisições HTTP
- **AsyncStorage** — armazenamento local usado pelo fluxo de autenticação
- **Expo Image Picker** — seleção de imagens
- **React Native Calendars / DateTimePicker / Picker** — componentes de interface
- **K2D**, via Expo Google Fonts — tipografia do aplicativo
- **Cloudinary** — upload de imagens

## Como o aplicativo funciona

### Catálogo e pesquisa

As telas de catálogo, pesquisa, favoritos e filtros consultam o endpoint `GET /dados`. A resposta esperada contém coleções de veículos, marcas, lojas e imagens. O frontend combina esses dados para montar os cards e apresentar as informações correspondentes.

### Autenticação e navegação

O contexto `AuthContext` centraliza o estado de usuário, token, login, cadastro e logout. Algumas ações são direcionadas para login/cadastro quando o usuário ainda não está autenticado. A autenticação depende dos endpoints do backend e do formato de resposta esperado pelo aplicativo.

### Carrinho, checkout e pedidos

O carrinho reúne os itens selecionados e oferece ações de remoção e finalização. No checkout, o aplicativo envia os itens, o usuário, o método de pagamento e o total para a API de pedidos. Portanto, a confirmação e a consulta real de pedidos dependem de uma API compatível.

### Cadastro e edição de veículos

Há telas de formulário para inserir e editar dados técnicos e imagens dos veículos. No código atual, esses formulários fazem validações locais e exibem mensagens de resultado, mas não concluem a persistência do cadastro/edição no backend. Essa integração precisa ser implementada antes de considerar o fluxo completo.

## Requisitos

- Node.js e npm compatíveis com a versão instalada do Expo.
- Android Studio/Android SDK para executar em um emulador Android ou dispositivo configurado.
- Para compilar e executar localmente no iOS, é necessário um ambiente macOS com Xcode.
- Uma API/backend acessível e compatível com as rotas utilizadas pelo aplicativo para testar autenticação, catálogo, endereço, carrinho e pedidos.
- Acesso à internet para chamadas à API e upload de imagens.

## Instalação e execução

Clone o repositório e entre na pasta do projeto:

```bash
git clone https://github.com/Gabrielhanel/globalImports
cd globalImports-main
```

Instale as dependências:

```bash
npm install
```

Inicie o Expo:

```bash
npm start
```

Siga as instruções exibidas no terminal para abrir o app em um dispositivo ou emulador. Os scripts adicionais definidos no projeto são:

```bash
npm run android
npm run ios
npm run web
```

`npm run ios` exige macOS com Xcode. A disponibilidade e o funcionamento da versão web podem variar conforme os componentes nativos utilizados.

## Configuração da API

O endereço principal da API está definido diretamente em `src/services/Api.js`. No arquivo enviado, ele está configurado como:

```js
const api = axios.create({
  baseURL: "http://192.168.0.4:8080/",
});
```

Antes de testar o aplicativo, substitua esse endereço pelo host e pela porta do backend que você estiver usando.

**Atenção:** o código também contém uma requisição direta para `http://localhost:3000/orders/cart` em `src/contexts/CartContext.js`. Essa URL precisa ser revisada e alinhada com a configuração do backend. Em um celular físico, `localhost` aponta para o próprio celular, não para o computador que está executando a API. Nesse cenário, use um endereço acessível pela rede local e mantenha o dispositivo e o computador na mesma rede, quando aplicável.

Entre as rotas referenciadas pelo frontend estão:

| Método | Rota | Finalidade no aplicativo |
|---|---|---|
| `GET` | `/dados` | Carregar veículos, marcas, lojas e imagens |
| `POST` | `/auth/signup` | Enviar o cadastro de usuário |
| `POST` | `/auth/signin` | Autenticar o usuário |
| `GET` | `/user/address` | Consultar endereço |
| `PUT` | `/user/address` | Atualizar endereço |
| `GET` | `/orders/cart/:userId` | Carregar carrinho do usuário |
| `POST` | `/orders/cart` | Enviar item ao carrinho |
| `DELETE` | `/orders/cart/:userId/:productId` | Remover item do carrinho |
| `POST` | `/orders` | Criar pedido |
| `GET` | `/orders/:userId/items` | Consultar itens de pedidos |

A implementação do backend deve confirmar esses contratos, parâmetros e formatos de resposta. O frontend não inclui documentação ou código da API nesta entrega.

## Upload de imagens

O serviço `src/services/ImageService.js` envia imagens para o Cloudinary utilizando um `cloud name` e um `upload preset` configurados no próprio código. Revise essa configuração para o ambiente desejado e confirme as permissões do preset antes de publicar ou compartilhar a aplicação. O fluxo de seleção de imagens usa a biblioteca `expo-image-picker`.

## Estrutura do projeto

```text
globalImports-main/
├── App.js                         Entrada principal, fontes e tela de carregamento
├── index.js                       Registro do aplicativo no Expo
├── app.json                       Configuração do Expo e identificadores nativos
├── package.json                   Dependências e comandos de execução
├── assets/                        Ícones e imagens de inicialização do Expo
├── android/                       Projeto nativo Android
└── src/
    ├── components/                Botões e componentes reutilizáveis
    ├── contexts/                  Estado de autenticação, carrinho, favoritos e pedidos
    ├── media/                     Logos, ícones e imagens da interface
    ├── pages/
    │   ├── Home/                  Catálogo e detalhes de veículos
    │   ├── Search/                Pesquisa, filtros e ordenação
    │   ├── Favorite/              Lista de favoritos
    │   ├── Login/                 Autenticação
    │   ├── Register/              Cadastro de usuário
    │   ├── ShoppingCart/          Carrinho, checkout e confirmação
    │   └── Profile/               Perfil, endereço, pedidos e área de anunciante
    ├── routes/                    Configuração da navegação
    └── services/                  Cliente HTTP, autenticação e upload de imagens
```

## Pontos a concluir e limitações conhecidas

- O backend não faz parte deste repositório e precisa estar acessível para validar as funcionalidades que dependem de API.
- Os endereços da API estão definidos em mais de um ponto do código e precisam ser centralizados ou alinhados para cada ambiente.
- Cadastro e edição de veículos ainda não enviam os dados do formulário para persistência no backend.
- A lista de favoritos está em estado de contexto; não há persistência local implementada para mantê-la após reiniciar o aplicativo.
- O fluxo de autenticação armazena credenciais no AsyncStorage. Antes de usar o aplicativo em produção, é importante revisar esse mecanismo e adotar uma estratégia de sessão e armazenamento de credenciais apropriada.
- O projeto deve ser testado com a API real para confirmar contratos, autorização, mensagens de erro, carrinho e pedidos.
