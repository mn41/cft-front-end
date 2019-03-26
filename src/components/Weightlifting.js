import React, { useState, useEffect } from 'react'
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Divider } from '@material-ui/core';
import WeightliftingDate from './WeightliftingDate'
import {NavLink} from "react-router-dom";
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import LoadIcon from '@material-ui/icons/CloudDownload'
import WeightliftingTable from './WeightliftingTable'
import { blue, grey, lightBlue } from '@material-ui/core/colors';
import axios from 'axios';
import moment from 'moment';
import { URL_STRING } from '../config.js'
import WorkoutForm from './WorkoutForm'
import shortid from 'shortid';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3
    },
  });

class Weightlifting extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            currentWorkout: {},
            currentDate: moment(new Date()).format("YYYY-MM-DD"),
            searchDate: moment(new Date()).format("YYYY-MM-DD"),
            isFormOpen: false,
            formDate: moment(new Date()).format("YYYY-MM-DD"),
            exercises: [{
                id: shortid.generate(),
                exerciseName: '',
                weight: '',
                reps:'',
                sets:'',
            }]
        }
    }

    componentDidMount(){

        var queryDate = moment(this.state.currentDate).format("YYYY/MM/DD")
        fetch(URL_STRING + 'workout/dateBetween?startDate=' + queryDate + '&endDate=' + queryDate + '&athleteId=' + this.props.id)
        .then(res => res.json())
        .then(json => this.setState({
            currentWorkout: (json.length > 0 ? json[0] : [])
        }));

    }

    getWorkout = () => {
        var queryDate = moment(this.state.searchDate).format("YYYY/MM/DD")
        fetch(URL_STRING + 'workout/dateBetween?startDate=' + queryDate + '&endDate=' + queryDate + '&athleteId=' + this.props.id)
        .then(res => res.json())
        .then(json => this.setState({
            currentWorkout: (json.length > 0 ? json[0] : []),
            currentDate:  moment(this.state.searchDate).format("YYYY-MM-DD")
        }));
    }

    loadRecentWorkout = () => {
       
        fetch(URL_STRING + 'workout/recent/athlete/' + this.props.id)
        .then(res => res.json())
        .then(json => this.setState({
            currentWorkout: json[0],
            currentDate: moment(json[0].date).format("YYYY-MM-DD")
        }));

    }

    handleFormOpen = () => {
        this.setState({isFormOpen: true})
    }

    handleFormClose = () => {
        this.setState({isFormOpen: false})
    }

    handleFormDateChange = (formDate) => {
        this.setState({formDate: formDate})
    }

    onClearExercises = () => {
        this.setState({ 
            exercises: [{
                id: shortid.generate(),
                exerciseName: '',
                weight: '',
                reps:'',
                sets:'',
            }]
         });
    };

    onAddExercise = () => {
        this.setState(state => {
          const exercises = [...state.exercises,
            {
                id: shortid.generate(),
                exerciseName: '',
                weight: '',
                reps:'',
                sets:'',
            }];
    
          return {
            exercises,
          };
        });
    };

    onUpdateExercise = (id, attribute) => {
        console.log(id)
        var index = this.state.exercises.findIndex(exercise => exercise.id === id);
        console.log(index)
          this.setState(state => {
            const exercises = [
               ...state.exercises.slice(0,index),
               Object.assign({}, state.exercises[index], attribute),
               ...state.exercises.slice(index+1)
            ];

            return {
                exercises,
              };
          });
    }

    onDeleteExercise = id => {
        if(this.state.exercises.length > 1){

        this.setState(state => {
          const exercises = state.exercises.filter(exercise => exercise.id !== id);
    
          return {
            exercises,
          };
        });
      } else {
          this.onClearExercises()
      }
    };


    
    render() {
        const { classes } = this.props;
        return (
            <div >
            <Grid container spacing={24}>
                <Grid item xs>
                    <Typography variant="h4" gutterBottom component="h2" align="center">
                        Weightlifting   
                    </Typography>
                </Grid>
            </Grid>
            <Divider/>
            <br/>
            <Grid container spacing={24} justify="space-around" alignItems="center">
            {!("exercises" in this.state.currentWorkout) || this.state.currentWorkout.exercises.length == 0 ?
            <Grid item>
                <Button variant="contained" size="large" color="primary" className={classes.button} onClick={this.loadRecentWorkout}>  
                    <LoadIcon/>
                    &nbsp; Load Most Recent Workout
                </Button>
                <div className={classes.tableContainer}>
                </div>
            </Grid>

            :
                <Grid item>
                    <Button variant="contained" size="large" color="primary" className={classes.button} component={NavLink} to="/addWeightlifting">  
                        <EditIcon className={classes.editIcon} />
                        &nbsp; Edit Workout
                    </Button>
                    <div className={classes.tableContainer}>
                    </div>
                </Grid>
            }
                <Grid item>
                    <Grid container spacing={24} justify="center" alignItems="center">
                        <Grid item>
                        <TextField
                            id="date"
                            type="date"
                            label="Select Workout Date"
                            style = {{width: 150}}
                            value={this.state.searchDate}
                            className={classes.textField}
                            onChange={e => this.setState({searchDate: e.target.value})}
                            margin="normal"
                        />
                        </Grid>
                        <Grid item>
                            <Button variant="contained" size="large" color="primary" className={classes.margin} onClick={this.getWorkout}>
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                    
                </Grid>
                <Grid item>
                    <Button variant="contained" size="large" color="primary" className={classes.button} onClick={this.handleFormOpen}>  
                        <AddIcon className={classes.addIcon} />
                        &nbsp; New Workout
                    </Button>
                    <div className={classes.tableContainer}>
                    </div>
                </Grid>
                <WeightliftingTable currentDate={this.state.currentDate} currentWorkout={this.state.currentWorkout}/>
            </Grid>
            <WorkoutForm isFormOpen={this.state.isFormOpen} onFormClose={this.handleFormClose} formDate={this.state.formDate} onFormDateChange={this.handleFormDateChange} onAddExercise={this.onAddExercise} onDeleteExercise={this.onDeleteExercise} onUpdateExercise={this.onUpdateExercise} exercises={this.state.exercises} title={"Add Workout"}/>
        </div>
        );
    }
}

export default withStyles(styles)(Weightlifting);