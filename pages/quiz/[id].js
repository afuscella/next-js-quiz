/* eslint-disable react/prop-types */
import React from 'react';
import { ThemeProvider } from 'styled-components';
import QuizPage from '../../src/screens/QuizPage';

export default function QuizDaGalera({ dbExternal }) {
  const {
    theme, questions, bg, loadingImage,
  } = dbExternal;

  return (
    <ThemeProvider theme={theme}>
      <QuizPage
        questions={questions}
        bg={bg}
        loadingImage={loadingImage}
      />
    </ThemeProvider>
  );
}

export async function getServerSideProps(context) {
  const [projectName, gitHubUser] = context.query.id.split('___');
  const dbExternal = await fetch(`https://${projectName}.${gitHubUser}.vercel.app/api/db`)
    .then((data) => {
      if (data.ok) {
        return data.json();
      }
      throw new Error('failed when returing data from server.');
    })
    .then((dataObjectConverted) => dataObjectConverted)
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.error(error);
    });

  return {
    props: {
      dbExternal,
    },
  };
}
