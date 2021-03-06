import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import Overview from './components/overview';
import PoolList from './components/PoolList';

const RouterComponent = () => {
  return (
    <Router sceneStyle={{ marginBottom: 0 }}>
      <Scene key="auth">
        <Scene key="login" component={LoginForm} title="Upstart" hideNavBar initial />
        <Scene key="overview" component={Overview} title="Overview" hideNavBar />
        <Scene key="PoolList" component={PoolList} title="PoolList" hideNavBar />
      </Scene>
    </Router>
  );
};

export default RouterComponent;
