import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import db from '../../db.json';

import QuizBackground from '../../src/components/QuizBackground';
import QuizContainer from '../../src/components/QuizContainer';
import QuizLogo from '../../src/components/QuizLogo';
import Widget from '../../src/components/Widget';
import AlternativesForm from '../../src/components/AlternativesForm';
import GitHubCorner from '../../src/components/GitHubCorner';
import Button from '../../src/components/Button';
import BackLinkArrow from '../../src/components/BackLinkArrow';

function PointsWidget({
  results,
}) {
  return (
    <Widget>
      <Widget.Footer>
        <p>
          Pontuação:
          {' '}
          {results.filter((result) => result === true).length === 0 && '0'}

          {results.map((result, index) => (
            result && (
              <span key={`result__${index}`}>
                &#127866;
              </span>
            )
          ))}
        </p>
      </Widget.Footer>
    </Widget>
  );
}

function ResultWidget({
  results,
  name,
  handleRetakeTest,
}) {
  const totalCorrectAnwers = results.filter((result) => result === true).length;

  function handleScoreCategory(score) {
    if (score === 7) {
      return 'MESTRE CERVEJEIRO';
    }

    if (score > 3 && score < 7) {
      return 'CERVEJEIRO';
    }

    return 'CERVEJEIRO MIRIM';
  }

  return (
    <Widget>
      <Widget.Header>
        {`${name}, você é ...`}
        {' '}
        <b>
          {handleScoreCategory(totalCorrectAnwers)}
        </b>
      </Widget.Header>
      <Widget.Content>
        <p>
          Você acertou
          {' '}
          {totalCorrectAnwers}
          {' '}
          de perguntas
          {' '}
          {results.length}
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
        <form onSubmit={handleRetakeTest}>
          <Button type="submit">
            REFAZER O TESTE
          </Button>
        </form>
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
        <img
          alt="Loading"
          style={{
            width: '100%',
            objectFit: 'cover',
          }}
          src={loadingImage}
        />
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

export default function QuizPage({ name }) {
  const [screenState, setScreenState] = useState(screenStates.LOADING);
  const [results, setResults] = useState([]);
  const totalQuestions = db.questions.length;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const questionIndex = currentQuestion;
  const question = db.questions[currentQuestion];

  const router = useRouter();

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

  function handleRetakeTest(e) {
    e.preventDefault();
    router.push('/');
  }

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />

        {screenState === screenStates.QUIZ && (
          <>
            <PointsWidget results={results} />
            <QuestionWidget
              question={question}
              questionIndex={questionIndex}
              totalQuestions={totalQuestions}
              onSubmit={handleSubmitQuestion}
              addResult={addResult}
            />
          </>
        )}

        {screenState === screenStates.LOADING && <LoadingWidget loadingImage={db.loadingImage} />}

        {screenState === screenStates.RESULT && (
          <>
            <ResultWidget
              results={results}
              name={name}
              handleRetakeTest={handleRetakeTest}
            />
          </>
        )}

      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/afuscella" />
    </QuizBackground>
  );
}

export async function getServerSideProps(context) {
  const { name } = context.query;
  return {
    props: {
      name,
    },
  };
}
