import React, { Component } from 'react';
import { Provider } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
import Navigator from './components/Navigator.js';
import TitleBar from './components/TitleBar';
import { BrowserRouter as Router, Route} from "react-router-dom";
import About from './components/About.js'
import Home from './components/Home.js'
import './App.css';
import Weightlifting from './components/Weightlifting.js';
import AddWeightlifting from './components/AddWeightlifting.js';
import Nutrition from './components/Nutrition.js';
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
              <Route path="/about" component={About} />
              <Route path="/weightlifting" render={props => <Weightlifting {...props} id={this.state.id} />} />
              <Route path="/nutrition" component={Nutrition} />
              <Route path="/weightMeasurement" render={props => <WeightMeasurement {...props} id={this.state.id} />} />
              <Route path="/addWeightlifting" component={AddWeightlifting} />
              </main>
            </div>
          </div>
        </Router>
    );
  }
}

export default withStyles(styles)(App);
