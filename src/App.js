import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import SignUp from './components/SignUp/';
import Home from './components/Home/'
import { AuthProvider } from './contexts/Auth';
import PrivateRoute from './components/PrivateRoute';
import Login from './components/Login/';
import { ThemeProvider } from './contexts/theme';

function App() {  
  
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <div>
            <PrivateRoute exact path='/' component={Home} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/signup' component={SignUp} />
          </div>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
