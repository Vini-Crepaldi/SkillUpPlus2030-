# SkillUpPlus 2030+ 📱

Aplicativo móvel em **React Native (Expo + TypeScript)** de **requalificação profissional (reskilling)** para o futuro do trabalho.

> Trabalho acadêmico — Fatec • DSM • PDM I • Tema: *"O Futuro do Trabalho e a Requalificação Digital"*

## 👥 Integrante(s)

<!-- PREENCHA AQUI -->
- Nome: `____________________________`  — RA: `____________`
<!-- (adicione mais linhas se for em grupo) -->

## 🎯 Sobre

Plataforma fictícia que ajuda profissionais a se requalificarem frente à IA, à automação e à economia sustentável, por meio de **trilhas curtas e personalizadas**, **autoavaliação de competências** e **acompanhamento de progresso gamificado**. Inspirado nos **ODS 4, 8, 9 e 10** da ONU.

## ✨ Funcionalidades

- 🔐 Login e cadastro com validação e **persistência** (AsyncStorage)
- 🏠 **Início** — banner + cursos recomendados (cards)
- 🧭 **Trilhas** — lista filtrável por área (Picker)
- 📈 **Progresso** — **linha do tempo** dos estudos *(diferencial)*
- 👤 **Perfil** — dados persistidos + logout
- 📄 **Detalhe do curso** — marca/desmarca conclusão

## 🧱 Stack

React Native · Expo · TypeScript · React Navigation (**Stack + Tab + Drawer**) · AsyncStorage · `@react-native-picker/picker`

## 🚀 Como rodar

```bash
# 1) instalar dependências
npm install

# 2) (recomendado) alinhar versões nativas com o seu Expo SDK
npx expo install @react-navigation/native @react-navigation/native-stack \
  @react-navigation/bottom-tabs @react-navigation/drawer \
  react-native-screens react-native-safe-area-context \
  react-native-gesture-handler react-native-reanimated \
  @react-native-async-storage/async-storage @react-native-picker/picker \
  @expo/vector-icons expo-status-bar

# 3) iniciar
npx expo start
```

Depois, pressione **`a`** (emulador Android) ou **`i`** (simulador iOS), ou leia o QR Code no app **Expo Go**.

> 💡 As imagens usam URLs públicas (picsum.photos); o emulador precisa de internet para exibi-las.

## 📂 Estrutura

```
src/
  components/   componentes reutilizáveis (Card, ProgressBar, Timeline, InputField, Banner)
  screens/      telas (Login, Cadastro, Home, Trilhas, Progresso, Perfil, CursoDetalhe, Sobre)
  navigation/   AppNavigator (Stack), TabNavigator, DrawerNavigator, types
  services/     storageService (AsyncStorage), authService
  models/       classes O.O. (Entidade, Usuario, Curso, Trilha)
  hooks/        custom hooks (useAuth, useStorage, useProgresso)
  data/         dados fictícios (mockData)
  styles/       theme (paleta, espaçamentos, tipografia)
```

## 🖼️ Capturas de tela

<!-- INSIRA AQUI OS PRINTS DO EMULADOR -->
| Login | Início | Trilhas | Progresso |
|---|---|---|---|
| _print_ | _print_ | _print_ | _print_ |

## 📜 Licença

Uso acadêmico.
