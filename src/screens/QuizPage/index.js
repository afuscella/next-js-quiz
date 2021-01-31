// src/screens/QuizPage/index.js
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import Widget from '../../components/Widget';
import QuizBackground from '../../components/QuizBackground';
import QuizContainer from '../../components/QuizContainer';
import QuizLogo from '../../components/QuizLogo';
import AlternativesForm from '../../components/AlternativesForm';
import Button from '../../components/Button';
import GitHubCorner from '../../components/GitHubCorner';
import BackLinkArrow from '../../components/BackLinkArrow';

function ResultWidget({
  results,
  query,
}) {
  return (
    <Widget>
      <Widget.Header>
        Suas respostas:
      </Widget.Header>
      <Widget.Content>
        <p>
          Você acertou
          {' '}
          {results.filter((result) => result === true).length}
          {' '}
          perguntas.
        </p>
        <ul>
          {results.map((result, index) => (
            <li key={`result__${index}`}>
              #
              {index + 1}
              {' '}
              resultado:
              {' '}
              {result === true ? 'Acertou' : 'Errou'}
            </li>
          ))}
        </ul>
      </Widget.Content>
    </Widget>
  );
}

function LoadingWidget({
  loadingImage,
}) {
  return (
    <Widget>
      <Widget.Header>
        Carregando...
      </Widget.Header>
      <Widget.Content>
        {loadingImage && (
          <img
            alt="Loading"
            style={{
              width: '100%',
              objectFit: 'cover',
            }}
            src={loadingImage}
          />
        )}
      </Widget.Content>
    </Widget>
  );
}

function QuestionWidget({
  question,
  questionIndex,
  totalQuestions,
  onSubmit,
  addResult,
}) {
  const [selectedAlternative, setSelectedAlternative] = useState(undefined);
  const [isQuestionSubmitted, setIsQuestionSubmitted] = useState(false);
  const questionId = `question__${questionIndex}`;
  const isCorrect = selectedAlternative === question.answer;
  const hasAlternativeSelected = selectedAlternative !== undefined;

  return (
    <Widget>
      <Widget.Header>
        <BackLinkArrow href="/" />
        <h3>{`Pergunta ${questionIndex + 1} de ${totalQuestions}`}</h3>
      </Widget.Header>

      <img
        alt="Descrição"
        style={{
          width: '100%',
          height: '150px',
          objectFit: 'cover',
        }}
        src={question.image}
      />

      <Widget.Content>
        <h2>
          {question.title}
        </h2>

        <p style={{ fontStyle: 'italic' }}>
          {question.description}
        </p>

        <AlternativesForm
          onSubmit={(e) => {
            e.preventDefault();
            e.target.reset();

            setIsQuestionSubmitted(true);
            setTimeout(() => {
              addResult(isCorrect);
              onSubmit();
              setIsQuestionSubmitted(false);
              setSelectedAlternative(undefined);
            }, 2 * 1000);
          }}
        >
          {question.alternatives.map((alternative, alternativeIndex) => {
            const alternativeId = `alternative__${alternativeIndex}`;
            const selectedAlternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR';
            const isSelected = selectedAlternative === alternativeIndex;
            return (
              <Widget.Topic
                as="label"
                key={alternativeId}
                htmlFor={alternativeId}
                data-selected={isSelected}
                data-status={isQuestionSubmitted && selectedAlternativeStatus}
              >
                <input
                  style={{ display: 'none' }}
                  id={alternativeId}
                  name={questionId}
                  onChange={() => setSelectedAlternative(alternativeIndex)}
                  type="radio"
                />
                {alternative}
              </Widget.Topic>
            );
          })}

          <Button type="submit" disabled={!hasAlternativeSelected}>
            <span style={{
              textShadowColor: '#000',
              textShadowOffset: { width: 0.185, height: 0 },
              textShadowRadius: 1,
            }}
            >
              Confirmar
            </span>
          </Button>
        </AlternativesForm>

      </Widget.Content>
    </Widget>
  );
}

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
};

export default function QuizPage({
  questions,
  bg,
  loadingImage
}) {
  const router = useRouter();

  const [screenState, setScreenState] = useState(screenStates.LOADING);
  const [results, setResults] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const questionIndex = currentQuestion;
  const question = questions[currentQuestion];
  const totalQuestions = questions.length;

  function addResult(result) {
    setResults([
      ...results,
      result,
    ]);
  }

  useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 4 * 1000);
  }, []);

  function handleSubmitQuestion() {
    const nextQuestion = questionIndex + 1;
    if (nextQuestion < totalQuestions) {
      setCurrentQuestion(questionIndex + 1);
    } else {
      setScreenState(screenStates.RESULT);
    }
  }

  function handleRestartTest(e) {
    e.preventDefault();
    router.push('/');
  }

  return (
    <QuizBackground backgroundImage={bg}>
      <QuizContainer>
        <QuizLogo />

        {screenState === screenStates.QUIZ && (
          <QuestionWidget
            question={question}
            questionIndex={questionIndex}
            totalQuestions={totalQuestions}
            onSubmit={handleSubmitQuestion}
            addResult={addResult}
          />
        )}

        {screenState === screenStates.LOADING
          && <LoadingWidget loadingImage={loadingImage} />}

        {screenState === screenStates.RESULT && (
          <>
            <ResultWidget results={results} query={router.query} />
            <form onSubmit={handleRestartTest}>
              <Button type="submit">
                REFAZER O TESTE
              </Button>
            </form>
          </>
        )}

      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/afuscella/bitter-brewing-quiz" />
    </QuizBackground>
  );
}
