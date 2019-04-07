import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Navigator from './components/Navigator.js';
import TitleBar from './components/TitleBar';
import { BrowserRouter as Router, Route} from "react-router-dom";
import Home from './components/Home.js'
import './App.css';
import Cardio from "./components/cardio/Cardio.js"
import Weightlifting from './components/Weightlifting.js';
import NutritionEntry from './components/NutritionEntry.js';
import WeightMeasurement from './components/WeightMeasurement.js';


const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
  toolbar: theme.mixins.toolbar,
});

class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      username: "matt",
      password: "a",
      email: "a@b.com",
      id: 1
    };
  }


  render() {
    const { classes } = this.props;
    return (
        <Router>
          <div>
            <div className={classes.root}>
              <TitleBar/>
              <Navigator/>
              <main className={classes.content}>
              <div className={classes.toolbar} />
              <Route exact path="/" component={Home} />
              <Route path="/cardio" render={props => <Cardio {...props} id={this.state.id} />} />
              <Route path="/weightlifting" render={props => <Weightlifting {...props} id={this.state.id} />} />
              <Route path="/nutrition" render={props => <NutritionEntry {...props} id={this.state.id} />} />
              <Route path="/weightMeasurement" render={props => <WeightMeasurement {...props} id={this.state.id} />} />
              </main>
            </div>
          </div>
        </Router>
    );
  }
}

export default withStyles(styles)(App);
