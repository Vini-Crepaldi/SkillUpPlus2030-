# Documentação — SkillUpPlus 2030+ (Item 9.1)

> **Aluno(a):** `__________________________`  **RA:** `____________`
> **Curso:** DSM — Fatec | **Disciplina:** PDM I
> **Tema:** O Futuro do Trabalho e a Requalificação Digital
> **Repositório:** `https://github.com/_________/skillupplus2030`  *(preencher)*

---

## 1. Identificação do Problema

A transformação digital — impulsionada pela inteligência artificial, pela automação e pela transição para uma economia sustentável — está redesenhando o mercado de trabalho em ritmo acelerado. Profissões inteiras são reconfiguradas e novas competências (técnicas e comportamentais) passam a ser exigidas em curtos intervalos de tempo. Nesse cenário, muitos trabalhadores enfrentam três obstáculos: (1) **falta de clareza** sobre quais competências desenvolver; (2) **escassez de tempo** para cursos longos e tradicionais; e (3) **dificuldade de manter constância**, por falta de acompanhamento e motivação. O resultado é o aumento do risco de obsolescência profissional e o aprofundamento das desigualdades de acesso a boas oportunidades.

O problema central, portanto, é: **como apoiar a requalificação contínua (reskilling/upskilling) de forma acessível, personalizada e motivadora, diretamente do celular?**

## 2. Solução Proposta

O **SkillUpPlus 2030+** é um aplicativo móvel, desenvolvido em **React Native com Expo e TypeScript**, que organiza a requalificação em **trilhas curtas e personalizadas por área de interesse** (IA, Gestão, Sustentabilidade e Soft Skills), com **microcursos gamificados** e **acompanhamento visual de progresso**.

A solução foi estruturada de modo que cada exigência técnica resolva uma parte concreta do problema:

- **Persistência local (AsyncStorage)** — o login, o perfil e o progresso ficam salvos no aparelho. Isso garante continuidade: o usuário retorna ao app e encontra exatamente onde parou, atacando o problema da *falta de constância*. A persistência é isolada em uma camada de serviço (`storageService` e `authService`), de modo que o restante do app não conhece os detalhes do armazenamento.

- **Conceitos de Orientação a Objetos (pasta `models/`)** — o domínio é modelado por **classes**: uma classe base abstrata `Entidade` (abstração) da qual `Usuario`, `Curso` e `Trilha` **herdam**. A senha do usuário é **encapsulada** (atributo privado, acessível apenas por métodos como `validarSenha`). A `Trilha` é uma **composição** de objetos `Curso` e concentra a regra de negócio do cálculo de progresso no método `progresso()`. O método `toJSON()` é **polimórfico** — cada classe define como se converte para armazenamento. Essa modelagem centraliza as regras, reduz duplicação e torna o código mais fácil de manter e explicar.

- **Componentes do React Native** — `View`, `ScrollView`, `Text`, `TextInput`, `Button`, `Image`, `TouchableOpacity`, `StyleSheet`, `Alert` e `Picker` (`@react-native-picker/picker`) compõem uma interface clara e responsiva. Componentes reutilizáveis (`Card`, `InputField`, `ProgressBar`, `Timeline`, `Banner`) padronizam o visual e evitam repetição.

- **Hooks (pasta `hooks/`)** — além de `useState`/`useEffect`, o app usa **custom hooks**: `useAuth` (estado global de autenticação via Context), `useProgresso` (cursos concluídos, persistidos) e `useStorage` (um “useState que se lembra”). Eles compartilham estado entre telas sem acoplamento, mantendo a lógica fora dos componentes visuais.

- **Navegação híbrida (React Navigation)** — combina os **três** tipos: **Stack** (fluxo Login → App e entrada no detalhe do curso), **Tab** (abas Início/Trilhas/Progresso/Perfil) e **Drawer** (menu lateral com Painel e Sobre/ODS). Isso espelha a forma como o usuário realmente navega: fluxos lineares, áreas paralelas e seções institucionais.

- **Organização modular de diretórios** — a separação por responsabilidade (`components`, `screens`, `navigation`, `services`, `models`, `hooks`, `data`, `styles`) facilita a manutenção, a leitura e a evolução do projeto, além de demonstrar boas práticas de arquitetura.

## 3. Resultados Esperados e Impacto (alinhamento com os ODS)

Espera-se que o usuário consiga **identificar competências relevantes, estudar em blocos curtos e visualizar seu avanço**, o que tende a aumentar o engajamento e a probabilidade de concluir a requalificação. O diferencial — a **linha do tempo de progresso** — transforma o aprendizado em uma jornada visível e motivadora.

O impacto pretendido conecta-se diretamente aos Objetivos de Desenvolvimento Sustentável da ONU:

- **ODS 4 — Educação de Qualidade:** democratiza o acesso a aprendizado contínuo e atualizado.
- **ODS 8 — Trabalho Decente e Crescimento Econômico:** aumenta a empregabilidade frente à automação.
- **ODS 9 — Indústria, Inovação e Infraestrutura:** capacita pessoas em tecnologias emergentes como a IA.
- **ODS 10 — Redução das Desigualdades:** leva oportunidades de requalificação a qualquer pessoa com um smartphone, reduzindo barreiras de acesso.

---

## 4. Fluxo de Navegação

1. **Abertura:** o app lê a sessão salva (AsyncStorage). Se houver usuário logado, vai direto ao app; senão, mostra o **Login**.
2. **Stack (não logado):** `Login` ⇄ `Cadastro`. Cadastro com sucesso já autentica e entra no app.
3. **Stack (logado):** `App` (Drawer) e `CursoDetalhe`.
4. **Drawer:** menu lateral com **Painel** (as abas) e **Sobre** (ODS).
5. **Tab:** **Início**, **Trilhas**, **Progresso**, **Perfil**.
6. A partir de um card na **Início**, o Stack abre **Detalhe do curso**, onde o usuário marca a conclusão — atualizando o progresso refletido em Trilhas e Progresso.

```
Stack (raiz)
├── [não logado]  Login ⇄ Cadastro
└── [logado]
    ├── App ─► Drawer
    │           ├── Painel ─► Tabs (Início | Trilhas | Progresso | Perfil)
    │           └── Sobre (ODS)
    └── CursoDetalhe
```

## 5. Justificativas de Design

- **Paleta:** indigo (`#4F46E5`) como cor de marca (tecnologia e confiança), ciano (`#06B6D4`) para energia/futuro e verde (`#10B981`) para sinalizar progresso/conclusão — coerente com um app “2030+”.
- **Cards com sombra e cantos arredondados:** transmitem leveza e modernidade, facilitam o toque.
- **Tema centralizado (`styles/theme.ts`):** todas as cores, espaçamentos e tamanhos de fonte vêm de um único arquivo, garantindo consistência visual e facilitando ajustes.
- **Ícones (Ionicons):** reforçam o reconhecimento rápido de cada aba e item de menu.
- **Linha do tempo de progresso:** escolhida como diferencial por traduzir, de forma intuitiva e motivadora, a ideia de uma “jornada” de aprendizado.
