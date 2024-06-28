import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import NotFound from './components/NotFound';
// import Login from './Login';
// import Register from './Register';
// import Logout from './Logout';
// import Expenses from './Expenses';
// import Dashboard from './Dashboard';
// import Budgets from './Budgets';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
        <div className="App">
          <Routes>
            <Route exact path="/" component={Home} />
            <Route path="/About" component={About} />
            {/* <Route path="/login" component={Login} />
            <Route path="/Register" component={Register} />
            <Route path="/Logout" component={Logout} />
            <Route path="/Expenses" component={Expenses} />
            <Route exact path="/Dashboard" component={Dashboard} />
            <Route path="/Budgets" component={Budgets} /> */}
            <Route path="*" component={NotFound} />
          </Routes>
        </div>
    </ThemeProvider>
  );
}

export default App;
