import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Lightbulb, SkipForward, RotateCcw, Trophy, Upload } from 'lucide-react';

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const QuizGame = () => {
  const defaultQuestions = [
    {
      question: "Qual é a capital do Brasil?",
      options: [
        { text: "São Paulo", hint: "É a maior cidade do país, mas não a capital." },
        { text: "Rio de Janeiro", hint: "Foi a capital até 1960, mas não é mais." },
        { text: "Brasília", hint: "Cidade planejada construída especificamente para ser a capital." },
        { text: "Salvador", hint: "Foi a primeira capital do Brasil colonial." }
      ],
      correct: 2,
      explanation: "",
    },
    {
      question: "Quantos planetas existem no Sistema Solar?",
      options: [
        { text: "7", hint: "Muito pouco, faltam alguns planetas nessa conta." },
        { text: "8", hint: "Número correto após Plutão ser reclassificado." },
        { text: "9", hint: "Era o número antes de Plutão ser reclassificado." },
        { text: "10", hint: "Número excessivo, inclui corpos que não são planetas." }
      ],
      correct: 1,
      explanation: "",
    },
    {
      question: "Qual é o maior oceano do mundo?",
      options: [
        { text: "Atlântico", hint: "É o segundo maior oceano do planeta." },
        { text: "Índico", hint: "É o terceiro maior oceano do mundo." },
        { text: "Ártico", hint: "É o menor dos oceanos." },
        { text: "Pacífico", hint: "Cobre mais de um terço da superfície terrestre." }
      ],
      correct: 3,
      explanation: "",
    },
    {
      question: "Em que ano o homem pisou na Lua pela primeira vez?",
      options: [
        { text: "1967", hint: "Muito cedo, ainda estavam preparando a missão." },
        { text: "1969", hint: "Ano da histórica missão Apollo 11." },
        { text: "1971", hint: "Um pouco tarde, já havia acontecido." },
        { text: "1965", hint: "Muito cedo, a tecnologia ainda estava em desenvolvimento." }
      ],
      correct: 1,
      explanation: "",
    },
    {
      question: "Qual é o elemento químico com símbolo 'Au'?",
      options: [
        { text: "Prata", hint: "Este elemento tem símbolo Ag." },
        { text: "Alumínio", hint: "Este elemento tem símbolo Al." },
        { text: "Ouro", hint: "Vem do latim 'aurum', metal precioso amarelo." },
        { text: "Argônio", hint: "Este é um gás nobre com símbolo Ar." }
      ],
      correct: 2,
      explanation: "",
    },
  ];

  const [questions, setQuestions] = useState(defaultQuestions);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [autoSkip, setAutoSkip] = useState(false);
  const [showHints, setShowHints] = useState({});
  const [hasEvaluated, setHasEvaluated] = useState(false);

  useEffect(() => {
    let timer;
    if (autoSkip && hasEvaluated && showResult && !gameFinished) {
      timer = setTimeout(() => {
        nextQuestion();
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, [autoSkip, hasEvaluated, showResult, gameFinished]);

  const handleAnswerClick = (answerIndex) => {
    if (hasEvaluated) return;
    
    setSelectedAnswer(answerIndex);
  };

  const evaluateAnswer = () => {
    if (selectedAnswer === null || hasEvaluated) return;
    
    setHasEvaluated(true);
    setShowResult(true);
    
    if (selectedAnswer === questions[currentQuestion].correct) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setShowHints({});
      setHasEvaluated(false);
    } else {
      setGameFinished(true);
    }
  };

  const resetGame = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setGameFinished(false);
    setShowHints({});
    setHasEvaluated(false);
  };

  const toggleHint = (optionIndex) => {
    setShowHints(prev => ({
      ...prev,
      [optionIndex]: !prev[optionIndex]
    }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        const parsed = data.map((q) => {
          const options = q.alternativas.map((alt, index) => {
            const letter = LETTERS[index];
            const text = typeof alt === 'string' ? alt.replace(/^[A-Za-z]\)\s*/, '') : alt;
            return { text, hint: q.dicas?.[letter] || '' };
          });
          return {
            question: q.pergunta,
            options,
            correct: LETTERS.indexOf(q.resposta_correta),
            explanation: q.explicacao,
          };
        });
        setQuestions(parsed);
        setCurrentQuestion(0);
        setScore(0);
        setSelectedAnswer(null);
        setShowResult(false);
        setGameFinished(false);
        setShowHints({});
        setHasEvaluated(false);
      } catch (err) {
        console.error('Erro ao ler arquivo:', err);
      }
    };
    reader.readAsText(file);
  };

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage === 100) return "Perfeito! Você acertou todas! 🎉";
    if (percentage >= 80) return "Excelente! Você mandou muito bem! 👏";
    if (percentage >= 60) return "Bom trabalho! Continue assim! 👍";
    if (percentage >= 40) return "Não foi mal, mas pode melhorar! 💪";
    return "Que tal estudar um pouco mais e tentar novamente? 📚";
  };

  if (gameFinished) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl shadow-lg">
        <div className="text-center">
          <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Jogo Finalizado!</h2>
          <div className="bg-white rounded-lg p-6 shadow-md mb-6">
            <p className="text-xl text-gray-600 mb-2">Sua pontuação:</p>
            <p className="text-4xl font-bold text-purple-600 mb-2">{score}/{questions.length}</p>
            <p className="text-lg text-gray-700">{getScoreMessage()}</p>
          </div>
          <button
            onClick={resetGame}
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-200 flex items-center gap-2 mx-auto"
          >
            <RotateCcw className="w-5 h-5" />
            Jogar Novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl shadow-lg">
      {/* Cabeçalho */}
      <div className="flex justify-between items-center mb-6">
        <div className="text-sm text-gray-600">
          Pergunta {currentQuestion + 1} de {questions.length}
        </div>
        <div className="text-sm text-purple-600 font-semibold">
          Pontuação: {score}
        </div>
      </div>

      {/* Barra de Progresso */}
      <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
        <div 
          className="bg-purple-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
        ></div>
      </div>

      {/* Configurações */}
      <div className="mb-6 p-4 bg-white rounded-lg shadow-sm">
        <label className="flex items-center gap-2 text-gray-700">
          <input
            type="checkbox"
            checked={autoSkip}
            onChange={(e) => setAutoSkip(e.target.checked)}
            className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
          />
          <SkipForward className="w-4 h-4" />
          Pular automaticamente para próxima pergunta (2 segundos)
        </label>
        <div className="mt-4">
          <label className="flex items-center gap-2 text-gray-700 cursor-pointer">
            <Upload className="w-4 h-4" />
            <span>Carregar perguntas (JSON)</span>
            <input
              type="file"
              accept="application/json"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Pergunta */}
      <div className="bg-white rounded-lg p-6 shadow-md mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          {questions[currentQuestion].question}
        </h2>

        {/* Opções de Resposta */}
        <div className="space-y-3">
          {questions[currentQuestion].options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrect = index === questions[currentQuestion].correct;
            const isWrong = isSelected && !isCorrect && hasEvaluated;
            
            let buttonClass = "w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ";
            
            if (hasEvaluated) {
              if (isCorrect) {
                buttonClass += "border-green-500 bg-green-50 text-green-800";
              } else if (isWrong) {
                buttonClass += "border-red-500 bg-red-50 text-red-800";
              } else {
                buttonClass += "border-gray-200 bg-gray-50 text-gray-600";
              }
            } else if (isSelected) {
              buttonClass += "border-purple-500 bg-purple-100 text-purple-800";
            } else {
              buttonClass += "border-gray-300 bg-white hover:border-purple-400 hover:bg-purple-50 text-gray-800";
            }

            return (
              <div key={index} className="relative">
                <button
                  onClick={() => handleAnswerClick(index)}
                  className={buttonClass}
                  disabled={hasEvaluated}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{option.text}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleHint(index);
                        }}
                        className="p-1 rounded-full hover:bg-yellow-100 text-yellow-600 transition-colors"
                        title="Ver dica"
                      >
                        <Lightbulb className="w-4 h-4" />
                      </button>
                      {hasEvaluated && (
                        <>
                          {isCorrect && <CheckCircle className="w-6 h-6 text-green-500" />}
                          {isWrong && <XCircle className="w-6 h-6 text-red-500" />}
                        </>
                      )}
                    </div>
                  </div>
                </button>
                
                {/* Dica */}
                {showHints[index] && (
                  <div className="mt-2 p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                    <div className="flex items-start gap-2">
                      <Lightbulb className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-yellow-800">{option.hint}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        {hasEvaluated && questions[currentQuestion].explanation && (
          <div className="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
            <p className="text-sm text-blue-800">{questions[currentQuestion].explanation}</p>
          </div>
        )}
      </div>

      {/* Botão Avaliar */}
      {selectedAnswer !== null && !hasEvaluated && (
        <div className="text-center mb-6">
          <button
            onClick={evaluateAnswer}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-200 flex items-center gap-2 mx-auto"
          >
            <CheckCircle className="w-5 h-5" />
            Avaliar Resposta
          </button>
        </div>
      )}

      {/* Botão Próxima */}
      {hasEvaluated && !autoSkip && (
        <div className="text-center">
          <button
            onClick={nextQuestion}
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-200 flex items-center gap-2 mx-auto"
          >
            {currentQuestion < questions.length - 1 ? (
              <>
                Próxima Pergunta
                <SkipForward className="w-5 h-5" />
              </>
            ) : (
              <>
                Ver Resultado Final
                <Trophy className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
      )}

      {/* Indicador de Pulo Automático */}
      {hasEvaluated && autoSkip && (
        <div className="text-center text-gray-600 text-sm">
          {currentQuestion < questions.length - 1 ? 
            "Próxima pergunta em 2 segundos..." : 
            "Mostrando resultado final em 2 segundos..."
          }
        </div>
      )}
    </div>
  );
};

export default QuizGame;
