import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { useHelloQuery } from './generated/graphql';

export const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch></Switch>
    </BrowserRouter>
  )
}
