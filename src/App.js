import React from "react";
import axios from "axios";
import PlanetsTableView from './components/PlanetsTableView';
import Loader from './components/Loader';
import './App.css';

const planetsBaseUrl = 'https://swapi.dev/api/planets';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      planetsList: []
    }
  }

  componentDidMount() {
    this.setState({loading: true});
    this.getPlanetsPage(1, []);
  };

  getPlanetsPage = async (page, planets) => {
    try {
      const response = await axios.get(`${planetsBaseUrl}/?page=${page}`);
      const updatedPlanets = planets.concat(response.data.results);
      if (response.data.next !== null) {
        this.getPlanetsPage(page + 1, updatedPlanets);
      } else {
        this.setState({planetsList: updatedPlanets});
        this.setState({loading: false});
      }
    } catch(error) {
      console.log('API call failed. Detailed message:', error);
      this.setState({loading: false});
    }
  };
  

  render() {
    const { loading, planetsList } = this.state;

    return (
      <div className="App">
      <header className="App-header">
        Star Wars Planet Directory
      </header>
      { loading 
          ? <Loader /> 
          : <PlanetsTableView planets={planetsList} /> }
    </div>
    )
    
  }
}

export default App;
