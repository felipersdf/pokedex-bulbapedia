# 📘 Pokédex Bulbapedia

Uma aplicação mobile desenvolvida com **React Native** e **Expo CLI**, consumindo a **PokéAPI** para listar Pokémons. A Pokédex permite **buscar, visualizar detalhes e favoritar** seus Pokémons favoritos.

---

## 📲 Funcionalidades

- 🔎 Listagem paginada dos Pokémons
- 📖 Detalhes de cada Pokémon (imagem HD, tipos, altura, peso, habilidades, stats)
- 🔍 Busca por nome ou número
- ❤️ Favoritar Pokémons com armazenamento local
- 📦 Tela exclusiva de favoritos
- 🧭 Navegação por abas com Expo Router
- 💚 Estilo visual baseado em tons de verde, branco, cinza e vermelho

---

## 🛠️ Tecnologias e Arquitetura

### Tecnologias:
- [Expo CLI](https://docs.expo.dev/)
- [Expo Router](https://expo.github.io/router/docs)
- [React Native](https://reactnative.dev/)
- [Axios](https://axios-http.com/)
- [React Query](https://tanstack.com/query/latest)
- [AsyncStorage](https://docs.expo.dev/versions/latest/sdk/async-storage/)
- [Context API](https://reactjs.org/docs/context.html)
- [@expo/vector-icons](https://icons.expo.fyi/)
- TypeScript

### Arquitetura:
- **MVVM** (Model-View-ViewModel)
- **Clean Code**
- Componentização reutilizável
- Pastas modulares por contexto

---


---

## 🚀 Instalação e Execução

1. **Clone o projeto**
```bash
git clone https://github.com/seu-usuario/pokedex-bulbapedia.git
cd pokedex-bulbapedia
```
2. **Instale as dependências**

```bash
npm install
# ou
yarn install
```

3. **Execute o projeto**

```bash
npx expo start
```


---
🤖 **Comandos úteis**
```bash
# Rodar local
npx expo start

# Limpar cache
npx expo start -c

# Build de produção (EAS)
eas build --platform all

# Atualizar app com EAS Update
eas update

``` 
