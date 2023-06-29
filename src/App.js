import {Route, Switch} from 'react-router-dom'
import './App.css'
import LoginRoute from './components/LoginRoute'
import Home from './components/Home'
import NotFound from './components/NotFound'

// Replace your code here
const App = () => (
  <Switch>
    <Route exact path="/ebank/login" component={LoginRoute} />
    <Route exact path="/" component={Home} />
    <Route component={NotFound} />
  </Switch>
)

export default App
