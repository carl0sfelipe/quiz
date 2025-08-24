# Quiz Game

Aplicação React simples de perguntas e respostas com dicas e explicações.

## Como executar

1. Instale as dependências:
   ```bash
   npm install
   ```
2. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
3. Abra `http://localhost:5173` no navegador.

## Carregando perguntas via JSON

Na área de **Configurações**, use o botão "Carregar perguntas (JSON)" para importar um arquivo com o seguinte formato:

```json
[
  {
    "pergunta": "Qual o objetivo principal da Engenharia de Software?",
    "alternativas": [
      "A) Produzir software sem testes.",
      "B) Documentar o máximo possível.",
      "C) Aplicar métodos sistemáticos para criar software de qualidade.",
      "D) Focar apenas na interface do usuário.",
      "E) Escrever código o mais rápido possível."
    ],
    "resposta_correta": "C",
    "explicacao": "Engenharia de Software usa processos, técnicas e ferramentas para planejar, construir, testar e manter software com qualidade.",
    "dicas": {
      "A": "Incorreta: testes são essenciais para qualidade.",
      "B": "Incorreta: documentação ajuda, mas não é o objetivo final.",
      "C": "Correta: descreve o propósito da área.",
      "D": "Incorreta: UI é só uma parte do sistema.",
      "E": "Incorreta: velocidade sem método não garante qualidade."
    }
  }
]
```

Cada objeto representa uma pergunta e segue a estrutura apresentada.
