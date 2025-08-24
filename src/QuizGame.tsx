import { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Lightbulb, Trophy, RotateCcw, Upload } from 'lucide-react';
import './QuizGame.css';

const QuizGame = () => {
  const defaultQuestions = [
    { question: "Qual o objetivo principal da Engenharia de Software?", options: [ { text: "Produzir software sem a necessidade de testes.", hint: "Incorreta: testes são essenciais." }, { text: "Usar práticas de gestão para desenvolver software de baixa qualidade.", hint: "Incorreta." }, { text: "Aplicar princípios e técnicas sistemáticos para produzir software de qualidade.", hint: "Correta." }, { text: "Projetar apenas a interface do usuário de um sistema.", hint: "Incorreta." }, { text: "Focar exclusivamente na codificação de programas.", hint: "Incorreta." } ], correct: 2, explanation: "Disciplina que aplica métodos sistemáticos para garantir qualidade, custo e prazo." },
    { question: "Qual é a principal característica do modelo em cascata (waterfall)?", options: [ { text: "Fases sequenciais sem sobreposição.", hint: "Correta." }, { text: "Iterações curtas contínuas.", hint: "Incorreta." }, { text: "Sem documentação formal.", hint: "Incorreta." }, { text: "Testes antes da implementação.", hint: "Incorreta." }, { text: "Cliente presente em todas as fases por default.", hint: "Incorreta." } ], correct: 0, explanation: "Modelo linear: cada fase termina antes da próxima começar." },
    { question: "Qual é um requisito funcional?", options: [ { text: "Usuário pode fazer login por e-mail e senha.", hint: "Correta." }, { text: "Disponibilidade 99,99%.", hint: "Não funcional (disponibilidade)." }, { text: "Tempo de resposta < 2s.", hint: "Não funcional (performance)." }, { text: "Deve ser escrito em Java.", hint: "Restrição técnica." }, { text: "Compatível com todos navegadores.", hint: "Não funcional (compatibilidade)." } ], correct: 0, explanation: "Requisitos funcionais descrevem comportamentos do sistema." },

    // ===== Qualidade, Processos =====
    { question: "Qualidade de software engloba principalmente?", options: [ { text: "Apenas ausência de bugs.", hint: "Limitado." }, { text: "Manutenibilidade, confiabilidade, usabilidade etc.", hint: "Correta." }, { text: "Somente performance.", hint: "Incompleto." }, { text: "Apenas segurança.", hint: "Incompleto." }, { text: "Somente estética visual.", hint: "Irrelevante isoladamente." } ], correct: 1, explanation: "Qualidade envolve múltiplos atributos (ISO/IEC 25010)." },
    { question: "Qual documento descreve visão geral e limitações iniciais?", options: [ { text: "Plano de Testes.", hint: "Não." }, { text: "Visão (Vision Document).", hint: "Correta." }, { text: "Diagrama de classes.", hint: "Não." }, { text: "Manual do Usuário.", hint: "Não." }, { text: "Registro de mudanças.", hint: "Não." } ], correct: 1, explanation: "Documento de Visão estabelece escopo e stakeholders." },
    { question: "Modelo incremental entrega: ", options: [ { text: "Todo o sistema no fim.", hint: "Não." }, { text: "Blocos funcionais sucessivos.", hint: "Correta." }, { text: "Somente documentação primeiro.", hint: "Não." }, { text: "Somente testes no início.", hint: "Não." }, { text: "Nenhuma funcionalidade até a última iteração.", hint: "Não." } ], correct: 1, explanation: "Incremental agrega funcionalidades a cada entrega." },
    { question: "Iterativo x Incremental: iterativo foca em?", options: [ { text: "Adicionar módulos fixos sem revisão.", hint: "Não." }, { text: "Refinar versões sucessivas de algo existente.", hint: "Correta." }, { text: "Entregar tudo de uma vez.", hint: "Não." }, { text: "Eliminar testes.", hint: "Não." }, { text: "Evitar feedback do usuário.", hint: "Não." } ], correct: 1, explanation: "Iterativo: refino progressivo; incremental: adição de partes." },
    { question: "Manifesto Ágil valoriza mais: ", options: [ { text: "Processos rígidos sobre indivíduos.", hint: "Incorreto." }, { text: "Documentação abrangente sobre software funcionando.", hint: "Incorreto." }, { text: "Responder a mudanças sobre seguir plano.", hint: "Correta." }, { text: "Contratação sobre colaboração.", hint: "Incorreto." }, { text: "Ferramentas sobre pessoas.", hint: "Incorreto." } ], correct: 2, explanation: "Um dos quatro valores do Manifesto Ágil." },
    { question: "Scrum: quem é responsável por maximizar valor?", options: [ { text: "Scrum Master.", hint: "Facilitador." }, { text: "Product Owner.", hint: "Correto." }, { text: "Equipe de Suporte.", hint: "Não." }, { text: "QA Lead.", hint: "Não." }, { text: "Cliente final.", hint: "Não diretamente." } ], correct: 1, explanation: "PO gerencia o Product Backlog visando valor." },
    { question: "Time-box típico de Sprint (Scrum) para time estável?", options: [ { text: "1–4 semanas.", hint: "Correta." }, { text: "6–12 meses.", hint: "Muito longo." }, { text: "1 dia.", hint: "Muito curto." }, { text: "Sem limite.", hint: "Não." }, { text: "10–12 semanas.", hint: "Longo demais." } ], correct: 0, explanation: "Recomendação Scrum Guide." },
    { question: "Artefato que lista itens priorizados de produto?", options: [ { text: "Definition of Done.", hint: "Não." }, { text: "Product Backlog.", hint: "Correto." }, { text: "Sprint Retrospective Doc.", hint: "Não." }, { text: "Task Board.", hint: "Parcial." }, { text: "Release Burnup.", hint: "Métrica." } ], correct: 1, explanation: "Backlog centraliza necessidades priorizadas." },
    { question: "Kanban enfatiza: ", options: [ { text: "Sprints fixas.", hint: "Não." }, { text: "Limites de WIP e fluxo contínuo.", hint: "Correta." }, { text: "Papéis formais rígidos.", hint: "Não." }, { text: "Documentação pesada.", hint: "Não." }, { text: "Planejamento anual fixo.", hint: "Não." } ], correct: 1, explanation: "Fluxo puxado com limites de trabalho em progresso." },

    // ===== Requisitos =====
    { question: "Engenharia de Requisitos NÃO inclui: ", options: [ { text: "Elicitação.", hint: "Inclui." }, { text: "Validação.", hint: "Inclui." }, { text: "Construção de código.", hint: "Correta." }, { text: "Análise.", hint: "Inclui." }, { text: "Gerência de mudanças.", hint: "Inclui." } ], correct: 2, explanation: "Codificação não faz parte direta da engenharia de requisitos." },
    { question: "Técnica de elicitação baseada em observar usuários: ", options: [ { text: "Entrevista estruturada.", hint: "Perguntas." }, { text: "Questionário.", hint: "Instrumento escrito." }, { text: "Observação (shadowing).", hint: "Correta." }, { text: "Brainstorm remoto.", hint: "Geração de ideias." }, { text: "Protótipo descartável.", hint: "Validação." } ], correct: 2, explanation: "Observação revela processos reais e exceções." },
    { question: "Requisito SMART deve ser: ", options: [ { text: "Simples, Mágico, Apreciado...", hint: "Não." }, { text: "Sustentável, Modular...", hint: "Não." }, { text: "Específico, Mensurável, Atingível, Relevante, Temporal.", hint: "Correta." }, { text: "Escalável, Móvel...", hint: "Não." }, { text: "Seguro, Monitorado...", hint: "Não." } ], correct: 2, explanation: "Acrônimo clássico de objetivos claros." },
    { question: "Caso de Uso principal inclui: ", options: [ { text: "Fluxo básico e alternativos.", hint: "Correta." }, { text: "Código fonte.", hint: "Não." }, { text: "Logs de execução.", hint: "Não." }, { text: "Métricas de CPU.", hint: "Não." }, { text: "Script de deploy.", hint: "Não." } ], correct: 0, explanation: "Componentes textuais de uso do sistema." },
    { question: "História de usuário formato comum: ", options: [ { text: "Como <persona> quero <ação> para <benefício>.", hint: "Correta." }, { text: "Se <condição> então <loop>.", hint: "Não." }, { text: "While(true) faça X.", hint: "Não." }, { text: "<Classe>::<Método>().", hint: "Não." }, { text: "Tabela de transição.", hint: "Não." } ], correct: 0, explanation: "Formato garante foco em valor." },
    { question: "Critérios de Aceite servem para: ", options: [ { text: "Medir performance em produção.", hint: "Não." }, { text: "Definir quando história está completa.", hint: "Correto." }, { text: "Permitir deploy automático.", hint: "Não diretamente." }, { text: "Gerar logs.", hint: "Não." }, { text: "Substituir testes.", hint: "Não." } ], correct: 1, explanation: "Aceite objetivo e verificável." },

    // ===== Design / Arquitetura =====
    { question: "Principio SOLID - 'S': ", options: [ { text: "Single Responsibility.", hint: "Correto." }, { text: "Secure Runtime.", hint: "Não." }, { text: "Simple Reuse.", hint: "Não." }, { text: "Static Resource.", hint: "Não." }, { text: "Shared Reference.", hint: "Não." } ], correct: 0, explanation: "Uma classe deve ter um único motivo para mudar." },
    { question: "Padrão que encapsula criação complexa: ", options: [ { text: "Observer.", hint: "Notifica." }, { text: "Builder.", hint: "Correto." }, { text: "Strategy.", hint: "Algoritmos intercambiáveis." }, { text: "Decorator.", hint: "Extensão dinâmica." }, { text: "Adapter.", hint: "Conversão interface." } ], correct: 1, explanation: "Builder separa construção de representação." },
    { question: "REST utiliza principalmente: ", options: [ { text: "Operações HTTP padronizadas.", hint: "Correto." }, { text: "Sockets proprietários.", hint: "Não." }, { text: "FTP.", hint: "Não." }, { text: "SMTP.", hint: "Não." }, { text: "RMI direto.", hint: "Não." } ], correct: 0, explanation: "GET, POST, PUT, DELETE etc." },
    { question: "Camada de serviço em arquitetura em camadas: ", options: [ { text: "Orquestra regras de negócio.", hint: "Correto." }, { text: "Renderiza HTML.", hint: "Não." }, { text: "Gerencia CSS.", hint: "Não." }, { text: "Controla GPU.", hint: "Não." }, { text: "Substitui banco de dados.", hint: "Não." } ], correct: 0, explanation: "Intermedia controlador e repositório." },
    { question: "Hexagonal (Ports & Adapters) visa: ", options: [ { text: "Aumentar acoplamento.", hint: "Não." }, { text: "Isolar domínio de tecnologias externas.", hint: "Correto." }, { text: "Eliminar testes unitários.", hint: "Não." }, { text: "Remover necessidade de interfaces.", hint: "Não." }, { text: "Forçar monólito.", hint: "Não." } ], correct: 1, explanation: "Domínio independente de detalhes de infra." },
    { question: "DDD: Aggregate é: ", options: [ { text: "Conjunto lógico com raiz que controla invariantes.", hint: "Correto." }, { text: "Banco de dados externo.", hint: "Não." }, { text: "Thread pool.", hint: "Não." }, { text: "Script de build.", hint: "Não." }, { text: "Cache global.", hint: "Não." } ], correct: 0, explanation: "Raiz mantém consistência interna." },
    { question: "CQRS separa: ", options: [ { text: "Leitura e escrita de modelo.", hint: "Correto." }, { text: "Front-end e backend.", hint: "Não apenas." }, { text: "Dev e QA.", hint: "Não." }, { text: "Micro e macro serviços.", hint: "Não." }, { text: "Ambiente e produção.", hint: "Não." } ], correct: 0, explanation: "Command Query Responsibility Segregation." },
    { question: "Padrão para comunicação assíncrona desacoplada: ", options: [ { text: "Mediator.", hint: "Coordena." }, { text: "Message Queue / Pub-Sub.", hint: "Correto." }, { text: "Singleton.", hint: "Não." }, { text: "Prototype.", hint: "Não." }, { text: "Iterator.", hint: "Não." } ], correct: 1, explanation: "Filas e tópicos desacoplam emissores e consumidores." },

    // ===== Versionamento / Config =====
    { question: "Git: comando para criar branch local a partir de main:", options: [ { text: "git commit -m 'branch'", hint: "Não." }, { text: "git branch nova && git checkout nova", hint: "Funciona." }, { text: "git checkout -b nova", hint: "Correta." }, { text: "git init nova", hint: "Não." }, { text: "git clone nova", hint: "Não." } ], correct: 2, explanation: "Atalho checkout -b cria e move." },
    { question: "Arquivo para dependências Node: ", options: [ { text: "package.json", hint: "Correto." }, { text: "deps.lock", hint: "Não padrão." }, { text: "modules.map", hint: "Não." }, { text: "settings.gradle", hint: "Gradle." }, { text: "pom.xml", hint: "Maven." } ], correct: 0, explanation: "Define scripts e dependências." },
    { question: "Infra como Código exemplo: ", options: [ { text: "Terraform script.", hint: "Correto." }, { text: "Documento Word.", hint: "Não." }, { text: "Planilha Excel.", hint: "Não." }, { text: "Desenho manual.", hint: "Não." }, { text: "Foto do diagrama.", hint: "Não." } ], correct: 0, explanation: "Terraform descreve recursos declarativamente." },

    // ===== Testes =====
    { question: "Teste unitário foca em: ", options: [ { text: "Módulo isolado.", hint: "Correto." }, { text: "Sistema inteiro.", hint: "Integração." }, { text: "Aceitação cliente.", hint: "Não." }, { text: "Performance global.", hint: "Não." }, { text: "Infraestrutura rede.", hint: "Não." } ], correct: 0, explanation: "Valida pequena unidade lógica." },
    { question: "TDD ciclo: ", options: [ { text: "Red, Green, Refactor.", hint: "Correto." }, { text: "Code, Ship, Profit.", hint: "Não." }, { text: "Design, Deploy, Drop.", hint: "Não." }, { text: "Commit, Merge, Release.", hint: "Não." }, { text: "Build, Benchmark, Burn.", hint: "Não." } ], correct: 0, explanation: "Escreve teste falhando, implementa, refatora." },
    { question: "Teste de regressão visa: ", options: [ { text: "Validar que mudanças não quebraram funções existentes.", hint: "Correta." }, { text: "Encontrar limite de hardware.", hint: "Não." }, { text: "Medir latência de rede.", hint: "Não." }, { text: "Avaliar usabilidade visual.", hint: "Não." }, { text: "Substituir testes unitários.", hint: "Não." } ], correct: 0, explanation: "Confirma preservação de comportamento anterior." },
    { question: "Mocks em testes servem para: ", options: [ { text: "Substituir dependências externas.", hint: "Correto." }, { text: "Melhorar UI.", hint: "Não." }, { text: "Encriptar dados.", hint: "Não." }, { text: "Persistir logs.", hint: "Não." }, { text: "Gerar relatórios de venda.", hint: "Não." } ], correct: 0, explanation: "Isolam unidade sob teste." },
    { question: "Cobertura 100% garante ausência de bugs?", options: [ { text: "Sim, sempre.", hint: "Falso." }, { text: "Não, apenas indica linhas exercitadas.", hint: "Correta." }, { text: "Sim para performance.", hint: "Não." }, { text: "Sim se usar mocks.", hint: "Não." }, { text: "Sim para segurança.", hint: "Não." } ], correct: 1, explanation: "Cobertura não mede qualidade dos asserts." },
    { question: "Teste de stress mede: ", options: [ { text: "Resiliência sob carga extrema.", hint: "Correta." }, { text: "Design de UI.", hint: "Não." }, { text: "Sintaxe de código.", hint: "Não." }, { text: "Latência de DNS isolada.", hint: "Não." }, { text: "Tamanho do build.", hint: "Não." } ], correct: 0, explanation: "Avalia comportamento em condições além do normal." },

    // ===== Métricas / Manutenção =====
    { question: "Complexidade Ciclomática mede: ", options: [ { text: "Número de caminhos independentes.", hint: "Correta." }, { text: "Linhas de comentário.", hint: "Não." }, { text: "Uso de memória.", hint: "Não." }, { text: "Tamanho do binário.", hint: "Não." }, { text: "Tempo de deploy.", hint: "Não." } ], correct: 0, explanation: "Indica pontos de decisão e esforço de teste." },
    { question: "Refactoring visa: ", options: [ { text: "Melhorar design sem alterar comportamento externo.", hint: "Correto." }, { text: "Adicionar novas features.", hint: "Não." }, { text: "Remover testes.", hint: "Não." }, { text: "Aumentar acoplamento.", hint: "Não." }, { text: "Quebrar compatibilidade.", hint: "Não." } ], correct: 0, explanation: "Melhora legibilidade e manutenibilidade." },
    { question: "Code Smell exemplo: ", options: [ { text: "Classe gigante fazendo muitas coisas.", hint: "Correto." }, { text: "Função pequena clara.", hint: "Não." }, { text: "Variáveis bem nomeadas.", hint: "Não." }, { text: "Coesão alta.", hint: "Não." }, { text: "Baixo acoplamento.", hint: "Não." } ], correct: 0, explanation: "God Class é smell clássico." },
    { question: "Acoplamento desejável: ", options: [ { text: "Alto para velocidade.", hint: "Não." }, { text: "Baixo entre módulos.", hint: "Correto." }, { text: "Aleatório.", hint: "Não." }, { text: "Oscilante.", hint: "Não." }, { text: "Máximo possível.", hint: "Não." } ], correct: 1, explanation: "Facilita mudanças isoladas." },
    { question: "Coesão alta significa: ", options: [ { text: "Elementos relacionados com objetivo único.", hint: "Correta." }, { text: "Muitos motivos para mudar.", hint: "Não." }, { text: "Dependências circulares.", hint: "Não." }, { text: "Duplicação ampla.", hint: "Não." }, { text: "Código morto.", hint: "Não." } ], correct: 0, explanation: "Foco claro aumenta compreensibilidade." },
    { question: "Debt técnico é: ", options: [ { text: "Metáfora para custo futuro de decisões rápidas.", hint: "Correta." }, { text: "Imposto legal real.", hint: "Não." }, { text: "Código open source.", hint: "Não." }, { text: "Número de commits.", hint: "Não." }, { text: "Velocidade de rede.", hint: "Não." } ], correct: 0, explanation: "Compromissos que exigem pagamento posterior." },

    // ===== Segurança =====
    { question: "Princípio de menor privilégio: ", options: [ { text: "Conceder apenas permissões necessárias.", hint: "Correto." }, { text: "Dar admin a todos.", hint: "Não." }, { text: "Remover autenticação.", hint: "Não." }, { text: "Expor segredos.", hint: "Não." }, { text: "Ignorar auditoria.", hint: "Não." } ], correct: 0, explanation: "Reduz superfície de ataque." },
    { question: "Prevenir SQL Injection: ", options: [ { text: "Consultas parametrizadas.", hint: "Correto." }, { text: "Concatenar strings.", hint: "Não." }, { text: "Desabilitar logs.", hint: "Não." }, { text: "Usar HTTP puro.", hint: "Não." }, { text: "Remover backups.", hint: "Não." } ], correct: 0, explanation: "Parâmetros evitam execução inesperada." },
    { question: "Hash seguro para senha: ", options: [ { text: "bcrypt / Argon2.", hint: "Correto." }, { text: "MD5 puro.", hint: "Inseguro." }, { text: "SHA1 puro.", hint: "Inseguro." }, { text: "Texto plano.", hint: "Não." }, { text: "ROT13.", hint: "Não." } ], correct: 0, explanation: "Algoritmos adaptativos com salt." },
    { question: "OWASP Top 10 inclui: ", options: [ { text: "Injeção.", hint: "Correto." }, { text: "Falta de UI escura.", hint: "Não." }, { text: "Uso de CSS grid.", hint: "Não." }, { text: "Compilação incremental.", hint: "Não." }, { text: "Formatação de código.", hint: "Não." } ], correct: 0, explanation: "Categoria importante de risco." },
    { question: "Proteção contra XSS: ", options: [ { text: "Escapar/ sanitizar entrada e saída.", hint: "Correto." }, { text: "Usar apenas GET.", hint: "Não." }, { text: "Desligar HTTPS.", hint: "Não." }, { text: "Armazenar senhas em texto.", hint: "Não." }, { text: "Duplicar queries.", hint: "Não." } ], correct: 0, explanation: "Escapando conteúdo não confiável." },

    // ===== DevOps / Entrega =====
    { question: "CI (Integração Contínua) significa: ", options: [ { text: "Mesclar alterações frequentes + build/test automatizado.", hint: "Correto." }, { text: "Deploy manual anual.", hint: "Não." }, { text: "Sem testes.", hint: "Não." }, { text: "Compilar no cliente.", hint: "Não." }, { text: "Proibir branches.", hint: "Não." } ], correct: 0, explanation: "Integração frequente evita grandes merges." },
    { question: "CD (Continuous Delivery) foca em: ", options: [ { text: "Software sempre potencialmente liberável.", hint: "Correto." }, { text: "Sem testes.", hint: "Não." }, { text: "Hardware dedicado.", hint: "Não." }, { text: "Eliminação de versionamento.", hint: "Não." }, { text: "Desligar pipelines.", hint: "Não." } ], correct: 0, explanation: "Pronto para deploy a qualquer momento." },
    { question: "Blue-Green Deployment reduz: ", options: [ { text: "Tempo de inatividade.", hint: "Correto." }, { text: "Segurança.", hint: "Não." }, { text: "Versionamento.", hint: "Não." }, { text: "Rollback controlado.", hint: "Não (melhora)." }, { text: "Observabilidade.", hint: "Não." } ], correct: 0, explanation: "Troca tráfego entre ambientes idênticos." },
    { question: "Feature Toggle permite: ", options: [ { text: "Ativar/desativar funcionalidade em runtime.", hint: "Correto." }, { text: "Remover logs.", hint: "Não." }, { text: "Apagar histórico git.", hint: "Não." }, { text: "Compilar sem código.", hint: "Não." }, { text: "Fixar clock.", hint: "Não." } ], correct: 0, explanation: "Controle progressivo de release." },
    { question: "Infra escalável horizontalmente: ", options: [ { text: "Adicionar mais instâncias.", hint: "Correto." }, { text: "Substituir linguagem.", hint: "Não." }, { text: "Otimizar CSS.", hint: "Não." }, { text: "Remover testes.", hint: "Não." }, { text: "Usar teclado mecânico.", hint: "Não." } ], correct: 0, explanation: "Escala horizontal = replicação de nós." },

    // ===== Bancos / Dados =====
    { question: "Normalização reduz: ", options: [ { text: "Redundância e anomalias.", hint: "Correto." }, { text: "Integridade.", hint: "Não (mantém)." }, { text: "Chaves primárias.", hint: "Não." }, { text: "SQL.", hint: "Não." }, { text: "Indices.", hint: "Não necessariamente." } ], correct: 0, explanation: "Formas normais minimizam duplicação." },
    { question: "Índice melhora: ", options: [ { text: "Velocidade de busca.", hint: "Correta." }, { text: "Tamanho de dados sempre diminui.", hint: "Não." }, { text: "Consumo de CPU sempre reduz.", hint: "Não." }, { text: "Integridade referencial.", hint: "Não." }, { text: "Criptografia.", hint: "Não." } ], correct: 0, explanation: "Estruturas aceleram WHERE/ JOIN." },
    { question: "NoSQL chave-valor típico: ", options: [ { text: "Redis.", hint: "Correto." }, { text: "PostgreSQL.", hint: "Relacional." }, { text: "SQLite.", hint: "Relacional." }, { text: "Oracle.", hint: "Relacional." }, { text: "MariaDB.", hint: "Relacional." } ], correct: 0, explanation: "Redis armazena pares chave-valor em memória." },
    { question: "Sharding faz: ", options: [ { text: "Particiona dados horizontalmente.", hint: "Correto." }, { text: "Criptografa disco.", hint: "Não." }, { text: "Compressão de índice.", hint: "Não." }, { text: "Backup incremental.", hint: "Não." }, { text: "Serialização JSON.", hint: "Não." } ], correct: 0, explanation: "Divide dataset por chave." },
    { question: "CAP Teorema: não é possível simultaneamente garantir: ", options: [ { text: "Consistência, Disponibilidade e Tolerância a Partição.", hint: "Correto: escolha dois (numa partição)." }, { text: "Integridade, Atomicidade, Isolamento.", hint: "ACID." }, { text: "Escalabilidade, Modularidade, Logging.", hint: "Não." }, { text: "Latência, Throughput, UX.", hint: "Não." }, { text: "Cache, CDN, SSL.", hint: "Não." } ], correct: 0, explanation: "Durante partições, trade-off C vs A." },

    // ===== Performance =====
    { question: "Caching reduz: ", options: [ { text: "Latência e carga backend.", hint: "Correto." }, { text: "Consumo de memória sempre.", hint: "Não." }, { text: "Necessidade de escalabilidade.", hint: "Não totalmente." }, { text: "Uso de rede a zero.", hint: "Não." }, { text: "Complexidade lógica.", hint: "Não necessariamente." } ], correct: 0, explanation: "Reutiliza resultados de requisições." },
    { question: "Bottleneck é: ", options: [ { text: "Recurso limitante de throughput.", hint: "Correto." }, { text: "Código morto.", hint: "Não." }, { text: "Testes flutuantes.", hint: "Não." }, { text: "Feature nova.", hint: "Não." }, { text: "Comentário TODO.", hint: "Não." } ], correct: 0, explanation: "Restringe desempenho global." },
    { question: "Escala vertical: ", options: [ { text: "Aumentar capacidade de um nó.", hint: "Correto." }, { text: "Adicionar vários nós.", hint: "Horizontal." }, { text: "Remover logs.", hint: "Não." }, { text: "Separar por sharding.", hint: "Horizontal." }, { text: "Usar CDN.", hint: "Outra estratégia." } ], correct: 0, explanation: "Mais CPU/RAM em mesma máquina." },

    // ===== Padrões de Código =====
    { question: "DRY significa: ", options: [ { text: "Don't Repeat Yourself.", hint: "Correto." }, { text: "Do Repeat YAML.", hint: "Não." }, { text: "Dynamic Runtime Yield.", hint: "Não." }, { text: "Distributed Relative Year.", hint: "Não." }, { text: "Debug Real Yield.", hint: "Não." } ], correct: 0, explanation: "Evitar duplicação de conhecimento." },
    { question: "KISS prega: ", options: [ { text: "Simplicidade.", hint: "Correto." }, { text: "Acréscimo de camadas desnecessárias.", hint: "Não." }, { text: "Complexidade proposital.", hint: "Não." }, { text: "Criptografia manual sempre.", hint: "Não." }, { text: "Inline tudo.", hint: "Não." } ], correct: 0, explanation: "Keep It Simple, Stupid." },
    { question: "YAGNI: ", options: [ { text: "Não implementar antes de precisar.", hint: "Correto." }, { text: "Implementar tudo agora.", hint: "Não." }, { text: "Duplicar código.", hint: "Não." }, { text: "Gerar logs inúteis.", hint: "Não." }, { text: "Remover testes.", hint: "Não." } ], correct: 0, explanation: "You Aren't Gonna Need It." },

    // ===== Gestão de Config / Qualidade =====
    { question: "Linters ajudam em: ", options: [ { text: "Padronizar estilo e detectar erros comuns.", hint: "Correto." }, { text: "Executar deploy.", hint: "Não." }, { text: "Gerir banco.", hint: "Não." }, { text: "Balancear carga.", hint: "Não." }, { text: "Criptografar tráfego.", hint: "Não." } ], correct: 0, explanation: "Automatizam revisão de estilo/erros." },
    { question: "Code Review fornece: ", options: [ { text: "Detecção precoce de problemas e disseminação de conhecimento.", hint: "Correto." }, { text: "Garantia 100% sem bugs.", hint: "Não." }, { text: "Substituição de testes.", hint: "Não." }, { text: "Aumento automático de performance.", hint: "Não." }, { text: "Remoção de logs.", hint: "Não." } ], correct: 0, explanation: "Melhoria colaborativa da qualidade." },

    // ===== Ética / Profissão =====
    { question: "Ética profissional em software envolve: ", options: [ { text: "Privacidade e responsabilidade.", hint: "Correto." }, { text: "Ignorar impacto social.", hint: "Não." }, { text: "Ocultar vulnerabilidades.", hint: "Não." }, { text: "Manipular métricas.", hint: "Não." }, { text: "Quebrar licenças.", hint: "Não." } ], correct: 0, explanation: "Princípios de responsabilidade e transparência." },

    // ===== Extra para completar 100 =====
    { question: "Licença MIT permite: ", options: [ { text: "Uso, modificação e distribuição com aviso de copyright.", hint: "Correto." }, { text: "Proibir uso comercial.", hint: "Não." }, { text: "Fechar código original sem aviso.", hint: "Não." }, { text: "Transferir patente automaticamente.", hint: "Não." }, { text: "Revogar retroativamente sem base.", hint: "Não." } ], correct: 0, explanation: "Licença permissiva mínima." },
    { question: "Continuous Monitoring foca em: ", options: [ { text: "Observabilidade contínua de sistemas.", hint: "Correto." }, { text: "Remover logs.", hint: "Não." }, { text: "Parar deploy.", hint: "Não." }, { text: "Apagar métricas.", hint: "Não." }, { text: "Esconder falhas.", hint: "Não." } ], correct: 0, explanation: "Telemetria para resposta rápida." },
    { question: "Observability envolve: ", options: [ { text: "Logs, métricas e traces.", hint: "Correto." }, { text: "Somente backups.", hint: "Não." }, { text: "Apenas UI tests.", hint: "Não." }, { text: "Somente firewall.", hint: "Não." }, { text: "Apenas diagramas UML.", hint: "Não." } ], correct: 0, explanation: "Pilares clássicos para entender estado interno." },
    { question: "Microserviços desafio comum: ", options: [ { text: "Observabilidade distribuída.", hint: "Correto." }, { text: "Acoplamento monolítico.", hint: "Menor objetivo." }, { text: "Banco único sempre.", hint: "Não necessário." }, { text: "Escalabilidade impossível.", hint: "Falso." }, { text: "Deploy extremamente lento obrigatório.", hint: "Falso." } ], correct: 0, explanation: "Tracing e correlação complexos." },
    { question: "Circuit Breaker evita: ", options: [ { text: "Efeito cascata de falhas.", hint: "Correto." }, { text: "Deploy.", hint: "Não." }, { text: "Logs.", hint: "Não." }, { text: "Compilação.", hint: "Não." }, { text: "Versionamento.", hint: "Não." } ], correct: 0, explanation: "Abre circuito após falhas repetidas." },
    { question: "Retry com backoff: ", options: [ { text: "Espera crescente entre tentativas.", hint: "Correto." }, { text: "Executa simultâneo.", hint: "Não." }, { text: "Remove autenticação.", hint: "Não." }, { text: "Ignora erros.", hint: "Não." }, { text: "Força loop infinito sem pausa.", hint: "Não." } ], correct: 0, explanation: "Evita sobrecarga do serviço alvo." },
    { question: "Idempotência em APIs significa: ", options: [ { text: "Mesma chamada repetida tem mesmo efeito.", hint: "Correto." }, { text: "Sempre cria novo recurso.", hint: "Não." }, { text: "Ignora autenticação.", hint: "Não." }, { text: "Responde sempre erro.", hint: "Não." }, { text: "Depende do número de threads.", hint: "Não." } ], correct: 0, explanation: "PUT/DELETE típicos idempotentes." },
    { question: "Rollback vs Rollforward: ", options: [ { text: "Rollforward aplica nova correção ao invés de reverter.", hint: "Correto." }, { text: "Rollback adiciona feature.", hint: "Não." }, { text: "Rollforward apaga histórico.", hint: "Não." }, { text: "Rollback melhora latência.", hint: "Não necessariamente." }, { text: "Rollforward é backup manual.", hint: "Não." } ], correct: 0, explanation: "Estratégia de correção rápida em produção." },
    { question: "Latency vs Throughput: ", options: [ { text: "Latência = tempo resposta; throughput = volume por tempo.", hint: "Correto." }, { text: "Latência = volume; throughput = tempo.", hint: "Não." }, { text: "Ambos iguais.", hint: "Não." }, { text: "Latência ignora fila.", hint: "Não." }, { text: "Throughput mede jitter.", hint: "Não." } ], correct: 0, explanation: "Métricas distintas de desempenho." },
    { question: "Shadow Deployment: ", options: [ { text: "Envia tráfego duplicado para nova versão sem impactar usuários.", hint: "Correto." }, { text: "Desliga versão antiga.", hint: "Não." }, { text: "Força rollback imediato.", hint: "Não." }, { text: "Remove logs.", hint: "Não." }, { text: "Substitui canary.", hint: "Não (alternativa)." } ], correct: 0, explanation: "Observa comportamento da nova versão." },
    { question: "Canary Release: ", options: [ { text: "Liberação para pequena fatia de usuários.", hint: "Correto." }, { text: "Deploy full instantâneo.", hint: "Não." }, { text: "Sem métricas.", hint: "Não." }, { text: "Remove feature flags.", hint: "Não." }, { text: "Exige monólito.", hint: "Não." } ], correct: 0, explanation: "Mitiga risco liberando gradualmente." },
    { question: "SLO representa: ", options: [ { text: "Objective mensurável de nível de serviço.", hint: "Correto." }, { text: "Operação de logging.", hint: "Não." }, { text: "Script local offline.", hint: "Não." }, { text: "Limite de memória estática.", hint: "Não." }, { text: "Cache obrigatório.", hint: "Não." } ], correct: 0, explanation: "Service Level Objective define alvo confiabilidade." },
    { question: "Erro orçamentário (Error Budget) permite: ", options: [ { text: "Balancear inovação e confiabilidade.", hint: "Correto." }, { text: "Eliminar SLIs.", hint: "Não." }, { text: "Ignorar SLOs.", hint: "Não." }, { text: "Parar monitoração.", hint: "Não." }, { text: "Aumentar dívida sem critério.", hint: "Não." } ], correct: 0, explanation: "Margem para mudanças sem violar SLO." },
    { question: "Logging estruturado ajuda: ", options: [ { text: "Consulta e correlação facilitadas.", hint: "Correto." }, { text: "Reduz latência sempre.", hint: "Não." }, { text: "Garante segurança.", hint: "Não." }, { text: "Elimina tracing.", hint: "Não." }, { text: "Substitui métricas.", hint: "Não." } ], correct: 0, explanation: "Campos chave-value melhoram análise." },
    { question: "Trace distribuído mostra: ", options: [ { text: "Percurso de requisição por serviços.", hint: "Correto." }, { text: "Uso de CPU por máquina apenas.", hint: "Não." }, { text: "Somente métricas agregadas.", hint: "Não." }, { text: "Schema do banco.", hint: "Não." }, { text: "Política de senhas.", hint: "Não." } ], correct: 0, explanation: "Span + contexto mostram fluxo." },
    { question: "Escalabilidade elástica significa: ", options: [ { text: "Ajustar recursos dinamicamente sob demanda.", hint: "Correto." }, { text: "Fixar recursos.", hint: "Não." }, { text: "Remover auto scaling.", hint: "Não." }, { text: "Aumentar custo fixo.", hint: "Não." }, { text: "Desligar monitoramento.", hint: "Não." } ], correct: 0, explanation: "Elasticidade responde a variação de carga." },
    { question: "API Rate Limiting evita: ", options: [ { text: "Abuso e sobrecarga.", hint: "Correto." }, { text: "Logs.", hint: "Não." }, { text: "Caching.", hint: "Não." }, { text: "Rollback.", hint: "Não." }, { text: "Autenticação.", hint: "Não." } ], correct: 0, explanation: "Controla número de requisições por janela." },
    { question: "JWT contém: ", options: [ { text: "Header, Payload, Signature.", hint: "Correto." }, { text: "HTML, CSS, JS.", hint: "Não." }, { text: "Chave privada sempre.", hint: "Não." }, { text: "Arquivo binário.", hint: "Não." }, { text: "Script SQL.", hint: "Não." } ], correct: 0, explanation: "Formato compacto de claims seguro por assinatura." },
    { question: "Id de correlação (Correlation ID) serve para: ", options: [ { text: "Rastrear requisição ponta a ponta.", hint: "Correto." }, { text: "Criptografar payload.", hint: "Não." }, { text: "Compactar JSON.", hint: "Não." }, { text: "Gerar índices.", hint: "Não." }, { text: "Evitar deploy.", hint: "Não." } ], correct: 0, explanation: "Facilita debugging distribuído." },
    { question: "Rollback manual lento pode ser mitigado por: ", options: [ { text: "Deploy imutável + blue-green.", hint: "Correto." }, { text: "Remoção de testes.", hint: "Não." }, { text: "Eliminar versionamento.", hint: "Não." }, { text: "Deploy via FTP manual.", hint: "Não." }, { text: "Sem automação de build.", hint: "Não." } ], correct: 0, explanation: "Estratégias rápidas de troca de versão." },
    { question: "Testes end-to-end verificam: ", options: [ { text: "Fluxo completo de negócio.", hint: "Correto." }, { text: "Apenas uma função isolada.", hint: "Unit." }, { text: "Somente latência da rede.", hint: "Não." }, { text: "Uso de memória do SO.", hint: "Não." }, { text: "Setup de IDE.", hint: "Não." } ], correct: 0, explanation: "Simulam comportamento real do usuário." },
    { question: "Schema Migration controla: ", options: [ { text: "Evolução de estrutura de banco.", hint: "Correto." }, { text: "Layout HTML.", hint: "Não." }, { text: "Tema CSS.", hint: "Não." }, { text: "Cores do logo.", hint: "Não." }, { text: "Licenças.", hint: "Não." } ], correct: 0, explanation: "Scripts versionados de alterações de schema." },
    { question: "DR (Disaster Recovery) plano inclui: ", options: [ { text: "Procedimentos para restaurar serviço após falha grave.", hint: "Correto." }, { text: "Remoção de backups.", hint: "Não." }, { text: "Ignorar incidentes.", hint: "Não." }, { text: "Desligar alertas.", hint: "Não." }, { text: "Centralizar segredo em plaintext.", hint: "Não." } ], correct: 0, explanation: "Recuperação de continuidade de negócio." },
    { question: "TLS fornece: ", options: [ { text: "Confidencialidade e integridade de trânsito.", hint: "Correto." }, { text: "Persistência de sessão backend.", hint: "Não." }, { text: "Armazenamento local.", hint: "Não." }, { text: "Balanceamento interno.", hint: "Não." }, { text: "CI/CD.", hint: "Não." } ], correct: 0, explanation: "Criptografa tráfego cliente-servidor." },
    { question: "Tempo Médio de Recuperação (MTTR) mede: ", options: [ { text: "Tempo para restaurar após incidentes.", hint: "Correto." }, { text: "Tempo entre falhas.", hint: "MTBF." }, { text: "Latência média.", hint: "Não." }, { text: "Throughput máximo.", hint: "Não." }, { text: "Tempo de compilação.", hint: "Não." } ], correct: 0, explanation: "Indicador de rapidez na recuperação." },
    { question: "Shadow IT é: ", options: [ { text: "Uso não autorizado de ferramentas/sistemas.", hint: "Correto." }, { text: "Teste de sombra." }, { text: "Backup incremental." }, { text: "Logs temporários." }, { text: "CDN duplicada." } ], correct: 0, explanation: "Riscos de conformidade e segurança." },
    { question: "Ambiente staging serve para: ", options: [ { text: "Validar release próximo de produção.", hint: "Correto." }, { text: "Substituir produção.", hint: "Não." }, { text: "Treinar modelo ML.", hint: "Não." }, { text: "Backup offline.", hint: "Não." }, { text: "Armazenar assets frios.", hint: "Não." } ], correct: 0, explanation: "Ambiente pré-prod espelhado." },
    { question: "Script de build reproduzível garante: ", options: [ { text: "Mesmos artefatos a partir do mesmo código e deps.", hint: "Correto." }, { text: "Zero bugs.", hint: "Não." }, { text: "Latency zero.", hint: "Não." }, { text: "Memória infinita.", hint: "Não." }, { text: "Escalabilidade automática.", hint: "Não." } ], correct: 0, explanation: "Determinismo na geração de binários." },
    { question: "Gerenciamento de dependências evita: ", options: [ { text: "Divergência de versões incompatíveis.", hint: "Correto." }, { text: "Tests.", hint: "Não." }, { text: "Commits.", hint: "Não." }, { text: "Observabilidade.", hint: "Não." }, { text: "Refatoração.", hint: "Não." } ], correct: 0, explanation: "Controla versões consistentes." },
    { question: "Atomicidade (ACID) garante: ", options: [ { text: "Transação aplica tudo ou nada.", hint: "Correto." }, { text: "Menor latência.", hint: "Não." }, { text: "Escala horizontal.", hint: "Não." }, { text: "Criptografia.", hint: "Não." }, { text: "Compressão.", hint: "Não." } ], correct: 0, explanation: "Estado consistente após commit ou rollback." },
    { question: "Isolamento (ACID) previne: ", options: [ { text: "Interferência visível entre transações concorrentes.", hint: "Correto." }, { text: "Uso de CPU.", hint: "Não." }, { text: "Cache quente.", hint: "Não." }, { text: "Rede lenta.", hint: "Não." }, { text: "Escala vertical.", hint: "Não." } ], correct: 0, explanation: "Cada transação como se executasse sozinha." },
    { question: "Observabilidade PRO ativa implica: ", options: [ { text: "Alertas acionáveis, dashboards e tracing.", hint: "Correto." }, { text: "Somente logs sem contexto.", hint: "Não." }, { text: "Apenas métricas brutas.", hint: "Não." }, { text: "Nenhum alerta.", hint: "Não." }, { text: "Logs suprimidos.", hint: "Não." } ], correct: 0, explanation: "Stack completo para detecção e diagnóstico." },
    { question: "Separação de responsabilidades ajuda: ", options: [ { text: "Reduzir acoplamento e aumentar testabilidade.", hint: "Correto." }, { text: "Duplicar código.", hint: "Não." }, { text: "Aumentar complexidade sem ganho.", hint: "Não." }, { text: "Remover coesão.", hint: "Não." }, { text: "Gerar side-effects ocultos.", hint: "Não." } ], correct: 0, explanation: "Divide sistema em componentes focados." }
  ];

  const [questions, setQuestions] = useState(defaultQuestions);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [autoSkip, setAutoSkip] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isActive, setIsActive] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [openHints, setOpenHints] = useState<Set<number>>(new Set());

  // Timer logic
  useEffect(() => {
    let interval: number | null = null;
    if (isActive && timeLeft > 0 && !showResult && !gameFinished) {
      interval = setInterval(() => {
        setTimeLeft(t => {
          if (t <= 1) {
            if (autoSkip) {
              if (!showResult) submitAnswer(); else handleNext();
            }
            return 30;
          }
          return t - 1;
        });
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
    }
    return () => { if (interval) clearInterval(interval); };
  }, [isActive, timeLeft, showResult, autoSkip, gameFinished]);

  // Start timer when component mounts or question changes
  useEffect(() => { setIsActive(true); setTimeLeft(30); }, [currentQuestion]);

  const handleAnswerSelect = (i: number) => { if (!showResult) setSelectedAnswer(i); };
  const submitAnswer = () => { if (showResult || selectedAnswer === null) return; setShowResult(true); setIsActive(false); if (selectedAnswer === questions[currentQuestion].correct) setScore(s => s + 1); };
  const toggleHint = (i: number) => setOpenHints(prev => { const n = new Set(prev); n.has(i)? n.delete(i): n.add(i); return n; });
  const handleNext = () => { setShowExplanation(false); if (currentQuestion < questions.length -1){ setCurrentQuestion(c=>c+1); setSelectedAnswer(null); setShowResult(false); setTimeLeft(30); setIsActive(true);} else { setGameFinished(true); setIsActive(false);} };
  const handleSkip = () => { if (!showResult){ setShowResult(true); setIsActive(false);} else handleNext(); };
  const resetQuiz = () => { setCurrentQuestion(0); setSelectedAnswer(null); setShowResult(false); setScore(0); setTimeLeft(30); setIsActive(true); setGameFinished(false); setShowExplanation(false); setOpenHints(new Set()); };
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => { const file = e.target.files?.[0]; if (!file) return; const r = new FileReader(); r.onload = ev => { try { const txt = ev.target?.result; if (typeof txt === 'string'){ const data = JSON.parse(txt); const converted = data.map((item: any) => ({ question: item.pergunta, options: item.alternativas.map((alt: any) => ({ text: alt.replace(/^[A-E]\)\s*/, ''), hint: item.dicas[alt.charAt(0)] || 'Sem dica disponível' })), correct: item.alternativas.findIndex((alt: any) => alt.charAt(0) === item.resposta_correta), explanation: item.explicacao })); setQuestions(converted); resetQuiz(); } } catch(err){ console.error(err); alert('Erro ao carregar arquivo'); } }; r.readAsText(file); };

  if (gameFinished) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div className="finish-wrapper">
        <div className="finish-card">
          <div className="trophy-ring">
            <Trophy className="icon" size={60} color="#fff" />
          </div>
          <h2 className="question-title" style={{marginBottom:'1.2rem'}}>Quiz Finalizado</h2>
          <p className="score-text">{score}/{questions.length}</p>
            <p className="percent">{percentage}% de acertos</p>
            <p className={`feedback ${percentage>=80?'good':percentage>=50?'mid':'low'}`}>{percentage>=80?'🔥 Excelente!':percentage>=50?'🚀 Bom desempenho!':'💡 Continue praticando!'}</p>
          <button onClick={resetQuiz} className="restart-btn"><RotateCcw size={18}/> Jogar Novamente</button>
          <div className="small-sep" />
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];
  const progressPercent = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="quiz-app">
      <div className="quiz-card">
        <div className="quiz-header">
          <div style={{flex:1}}>
            <div style={{display:'flex', gap:'.75rem', flexWrap:'wrap', alignItems:'center', marginBottom:'1.1rem'}}>
              <span className="badge">Pergunta {currentQuestion + 1} / {questions.length}</span>
              <div className="file-import">
                <input id="fileInput" type="file" accept="application/json" onChange={handleFileUpload} style={{display:'none'}} />
                <label htmlFor="fileInput" className="file-btn"><Upload size={14}/> JSON</label>
              </div>
            </div>
            <div className="progress-bar"><span style={{width: progressPercent+'%'}} /></div>
          </div>
          <div className="stats">
            <div className="stat-box">
              <h5>PONTUAÇÃO</h5>
              <p>{score}</p>
            </div>
            <div className="stat-box">
              <h5>TEMPO</h5>
              <p className={timeLeft<=10? 'timer-danger': timeLeft<=20? 'timer-warning': ''}>{timeLeft}s</p>
            </div>
          </div>
        </div>

        <h2 className="question-title">{currentQ.question}</h2>
        <div className="options-grid">
          {currentQ.options.map((opt, idx) => {
            const isSelected = selectedAnswer === idx;
            const isCorrect = showResult && currentQ.correct === idx;
            const isWrong = showResult && isSelected && !isCorrect;
            return (
              <div key={idx} className={`option ${isCorrect?'correct': isWrong?'wrong': isSelected?'selected':''} ${showResult? 'locked':''}`} onClick={() => handleAnswerSelect(idx)}>
                <div className="option-content">
                  <div className="option-text">{opt.text}</div>
                  <div style={{display:'flex', gap:'.45rem', alignItems:'center'}}>
                    <button type="button" className={`hint-toggle ${openHints.has(idx)?'open':''}`} onClick={(e)=>{ e.stopPropagation(); toggleHint(idx); }}>
                      <Lightbulb size={14}/> {openHints.has(idx)? 'Fechar':'Dica'}
                    </button>
                    {isCorrect && <CheckCircle size={20} color="#4de9b6" />}
                    {isWrong && <XCircle size={20} color="#ff557d" />}
                  </div>
                </div>
                {openHints.has(idx) && (
                  <div className="hint-box">{opt.hint}</div>
                )}
              </div>
            );
          })}
        </div>

        {showResult && showExplanation && (
          <div className="explanation">
            <h3>EXPLICAÇÃO</h3>
            <p>{currentQ.explanation}</p>
          </div>
        )}

        <div className="controls">
          <label className="autoskip">
            <input type="checkbox" checked={autoSkip} onChange={e=>setAutoSkip(e.target.checked)} /> Auto-skip
          </label>
          <div className="button-row">
            {!showResult && (
              <>
                <button onClick={submitAnswer} disabled={selectedAnswer===null} className="btn primary">Enviar</button>
                <button onClick={handleSkip} className="btn alt">Pular</button>
              </>
            )}
            {showResult && (
              <>
                <button onClick={()=>setShowExplanation(!showExplanation)} className="btn gradient">{showExplanation? 'Ocultar Explicação':'Ver Explicação'}</button>
                <button onClick={handleNext} className="btn next">Próxima</button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizGame;
