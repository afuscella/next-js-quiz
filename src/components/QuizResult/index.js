// src/components/QuizResult/index.js
import React from 'react';
import PropTypes from 'prop-types';

import Button from '../Button';
import Widget from '../Widget';

function QuizResult({
  results,
  questions,
  name,
  handleRetakeTest,
}) {
  const totalCorrectAnwers = results.filter((result) => result === true).length;
  const brewer = {
    MESTRE: 'MESTRE_CERVEJEIRO',
    CERVEJEIRO: 'CERVEJEIRO',
    MIRIM: 'CERVEJEIRO MIRIM',
  };

  function handleScoreCategory(score) {
    if (score === 7) {
      return brewer.MESTRE_CERVEJEIRO;
    }

    if (score > 3 && score < 7) {
      return brewer.CERVEJEIRO;
    }
    return brewer.MIRIM;
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
            <>
              <li key={`result__${result}`}>
                {result === true ? '✔️' : '❌'}
                #
                {index + 1}
                {' '}
                {`${questions[index].title}:`}
                {' '}
                <br />
                {'Resposta: '}
                <b>
                  <i>
                    {`${questions[index].alternatives[questions[index].answer]}`}
                  </i>
                </b>
              </li>
              <br />
            </>
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

QuizResult.defaultProps = {
  name: '',
};

QuizResult.propTypes = {
  results: PropTypes.arrayOf([]).isRequired,
  questions: PropTypes.arrayOf([]).isRequired,
  name: PropTypes.string,
  handleRetakeTest: PropTypes.func.isRequired,
};

export default QuizResult;
