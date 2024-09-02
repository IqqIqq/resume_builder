import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreateResumePage from './pages/CreateResumePage';
import EditResumePage from './pages/EditResumePage';

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={HomePage} />
                <Route path="/create" component={CreateResumePage} />
                <Route path="/edit/:id" component={EditResumePage} />
            </Switch>
        </Router>
    );
}

export default App;
