import './App.css';
import { Route } from "react-router-dom"
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import RecipeDetails from './components/RecipeDetails';
import RecipeCreation from './components/RecipeCreation';


function App() {



  return (
    <div className="App">
      <Route exact path="/" component={LandingPage}/>
      <Route exact path="/home" component={Home}/>
      <Route exact path="/recipe" component={RecipeCreation}/>
      <Route exact path='/recipes/:recipeId'
             render={({match}) => (<RecipeDetails recipeId={(match.params.recipeId)}/>)}/>
    </div>
  );
}

export default App;
