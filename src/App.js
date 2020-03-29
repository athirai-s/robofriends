import React, {Component }from 'react';
import CardList from './CardList';
import SearchBox from './searchbox';
import {robots} from './robots';
import './App.css';
import Scroll from './Scroll';

class App extends Component{
  constructor() {
    super();
    this.state = 
      {
        robots: [],
        searchfield: ''
      }
  }

  componentDidMount() {
    fetch('http://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(users => this.setState({robots : users}));
  }

  onSearchChange = (event) => {
    this.setState({searchfield : event.target.value});
  }

  render(){
    const {robots,searchfield} = this.state;
    const filterRobots = robots.filter(robot => {
      return robot.name.toLowerCase().includes(searchfield.toLowerCase());
        })
    if(robots.length === 0){
      return <h1 className='tc'>LOADING...</h1>
    }
    else
    {
      return (
        <div className='tc'>
        <h1 className = 'f1'>Robofriends</h1>
        <SearchBox searchChange = {this.onSearchChange}/>
        <Scroll>
          <CardList robots={filterRobots} />
        </Scroll>
        </div>
    
        );
    }
    }
}
export default App;