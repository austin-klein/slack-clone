import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import PrivateRoute from './components/routing/PrivateRoute';

import Messages from './components/screens/Messages/Messages';
import Login from './components/screens/Login/Login';
import Register from './components/screens/Register/Register';

import './index.css';

function App() {
  return (
    <Router>
      <div className='app'>
        <Switch>
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
          <PrivateRoute exact path='/:id' component={Messages} />
        </Switch>
      </div></Router>

  );
}

export default App;
