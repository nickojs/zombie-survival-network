import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Auth from '../Containers/Auth';
import Profile from '../Containers/Profile';
import Dashboard from '../Containers/Dashboard';

import { useAuth } from '../contexts/authContext';

const routesArray = [
  {
    path: '/',
    name: 'Dashboard',
    Component: Dashboard,
    isPrivate: true
  },
  {
    path: '/user-profile',
    name: 'User Profile',
    Component: Profile,
    isPrivate: true
  },
  {
    path: '/',
    name: 'Auth',
    Component: Auth,
    isPrivate: false
  }
];

const Routes = () => {
  const { token } = useAuth();

  const PrivateRoutes = () => (
    <>
      {routesArray.map(({ path, Component, isPrivate }) => isPrivate && (
        <Route
          exact
          key={path}
          path={path}
          component={Component}
        />
      ))}
    </>
  );

  const RegularRoutes = () => (
    <>
      {routesArray.map(({ path, Component, isPrivate }) => !isPrivate && (
        <Route
          exact
          key={path}
          path={path}
          component={Component}
        />
      ))}
    </>
  );

  return (
    <Switch>
      {token
        ? <PrivateRoutes />
        : <RegularRoutes />}
    </Switch>

  );
};

export default Routes;
