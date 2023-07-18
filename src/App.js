import {BrowserRouter, Route, Switch} from 'react-router-dom'

import './App.css'

import TeamMatches from './components/TeamMatches'

import Home from './components/Home'
import {NOTFOUND} from 'dns'
import NotFound from './components/NotFound'

const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/team-matches/:id" component={TeamMatches} />
    <Route component={NotFound} />
  </Switch>
)

export default App
