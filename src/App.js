import logo from './logo.svg';
import Navbar from './components/Navbar'
import Home from './components/Home'
import Explore from './components/Explore';
import Discussions from './components/Discussions'
import ShowDiscussions from './components/ShowDiscussions';
import CreateDiscussion from './components/CreateDiscussion';
import Login from './components/Login';
import Signup from './components/Signup';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

function App() {

  return (
    <Router>
      <div className="App"> 
        <Navbar />
        <Switch> 
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route exact path="/discussions">
            <Discussions />
          </Route>
          <Route exact path="/discussions/create">
            <CreateDiscussion />
          </Route>
          <Route path="/discussions/:id">
            <ShowDiscussions />
          </Route>
          <Route path="/categories">
            <Explore />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
