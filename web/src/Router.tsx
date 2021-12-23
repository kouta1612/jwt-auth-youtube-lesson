import React from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import {Hey} from './pages/Hey';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';

export const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <div>
        <header>
          <div>
              <Link to="/">home</Link>
          </div>
          <div>
              <Link to="/register">register</Link>
          </div>
          <div>
              <Link to="/login">login</Link>
          </div>
          <div>
              <Link to="/hey">hey</Link>
          </div>
        </header>
      </div>
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/register" component={Register}></Route>
        <Route exact path="/login" component={Login}></Route>
        <Route exact path="/hey" component={Hey}></Route>
      </Switch>
    </BrowserRouter>
  )
}
