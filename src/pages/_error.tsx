import React from 'react';
import { MainColes } from 'layouts';
import Container from 'components/container';

const ErrorPage = (): JSX.Element => {
  return (
    <MainColes>
      <Container>ServerError</Container>
    </MainColes>
  );
};

export default ErrorPage;
