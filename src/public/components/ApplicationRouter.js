import React from 'react'
import { Route, Switch } from 'react-router-dom'

import AggregationPage from './AggregationPage'
import ArticlePage from './ArticlePage'
const routes = [
    {
      path: '/',
      name: 'home',
      exact: true,
      component: AggregationPage,
    },
    {
      path: '/article/:entityId',
      name: 'article',
      exact: true,
      component: ArticlePage,
    }
  ];

  
const ApplicationRouter = () => (
  <Switch>
    {routes.map(route => <Route key={route.name} {...route} />)}
  </Switch>
)

export default ApplicationRouter
